package com.killbug.user.service.impl;

import cn.dev33.satoken.secure.BCrypt;
import cn.hutool.core.util.DesensitizedUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.killbug.bounty.api.RemoteBountyService;
import com.killbug.bounty.api.vo.BountyVO;
import com.killbug.common.core.exception.ServiceException;
import com.killbug.common.core.utils.BeanCopyUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.RemoteQuestionService;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.user.api.domain.User;
import com.killbug.user.dto.AccountSettingDTO;
import com.killbug.user.dto.UserProfileDTO;
import com.killbug.user.mapper.UserMapper;
import com.killbug.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 15:40
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {

    private final UserMapper userMapper;

    @DubboReference
    private RemoteQuestionService remoteQuestionService;

    @DubboReference
    private RemoteBountyService remoteBountyService;

    @Override
    public User selectUserByUsername(String username) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("username", username));
    }

    @Override
    public void updateUserBalance(Integer userId, int balance, int type) {
        User user = userMapper.selectById(userId);
        // tpye 0 -> add
        if (type == 0) {
            user.setBalance(user.getBalance() + balance);
        } else {
            user.setBalance(user.getBalance() - balance);
        }
        userMapper.updateById(user);
    }

    @Override
    public User getUserById(Long id) {
        User user = userMapper.selectById(id);
        System.out.println(user);
        return user;
    }

    @Override
    public void incrBalanceById(Long userId, Integer reward) {
        userMapper.incrBalanceById(userId, reward);
    }

    @Override
    public void decrBalanceById(Long userId, Integer reward) {
        userMapper.decrBalanceById(userId, reward);
    }

    @Override
    public Map<String, Object> renderUserSpace(Long id) throws ExecutionException, InterruptedException {

        List<QuestionVO> questionList = remoteQuestionService.getQuestionsByUserId(id);
        List<BountyVO> bountyList = remoteBountyService.getBountiesByUserId(id);
        List<BountyVO> grabbedBountyList = remoteBountyService.getGrabbedBountiesByUserId(id);
        User user = getUserById(id);
        user.setPassword("");

        Integer questionCount = questionList.size();
        Integer orderCount = bountyList.size();
        Integer likeCount = 0;
        for (QuestionVO questionVO : questionList) {
            likeCount += questionVO.getLikeCount();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("questions", questionList);
        map.put("bounties", bountyList);
        map.put("grabbedBounties", grabbedBountyList);
        map.put("questionCount", questionCount);
        map.put("orderCount", orderCount);
        map.put("likeCount", likeCount);
        map.put("user", user);
        return map;
    }

    @Override
    public User getCurrentUser() {
        Long userId = LoginHelper.getUserId();
        User user = getUserById(userId);
        user.setPassword("");
        return user;
    }

    @Override
    public void updateUserProfile(UserProfileDTO userProfileDTO) {
        Long userId = LoginHelper.getUserId();
        if (!userId.equals(Long.valueOf(userProfileDTO.getUserId()))) {
            throw new ServiceException("No permission to modify other people's profile", 401);
        }
        User user = new User();
        BeanCopyUtils.copy(userProfileDTO, user);
        user.setUserId(userId);
        userMapper.updateById(user);
    }

    @Override
    public void recharge(Integer dollar) {
        Long userId = LoginHelper.getUserId();
        User user = getUserById(userId);
        user.setBalance(user.getBalance() + dollar);
        userMapper.updateById(user);
    }

    @Override
    public String changeAccountSetting(AccountSettingDTO accountSettingDTO) {
        Integer type = accountSettingDTO.getType();
        Long userId = LoginHelper.getUserId();
        User user = getUserById(userId);
        String data = null;
        if (type == 0) {
            String oldPhone = accountSettingDTO.getOldPhone();
            if (user.getPhone() != null && !user.getPhone().equals(oldPhone)) {
                throw new ServiceException("The old and new phone number do not match!");
            }
            String newPhone = accountSettingDTO.getNewPhone();
            user.setPhone(newPhone);
            data = StrUtil.hide(newPhone, 4, newPhone.length());
        } else if (type == 1) {
            String oldEmail = accountSettingDTO.getOldEmail();
            if (user.getEmail() != null && !user.getEmail().equals(oldEmail)) {
                throw new ServiceException("The old and new email do not match!");
            }
            String newEmail = accountSettingDTO.getNewEmail();
            user.setEmail(newEmail);
            data = DesensitizedUtil.email(newEmail);
        } else if (type == 2) {
            String password = accountSettingDTO.getOldPassword();
            if (!BCrypt.checkpw(password, user.getPassword())) {
                throw new ServiceException("The old and new password do not match!");
            }
            String newPassword = accountSettingDTO.getNewPassword();
            user.setPassword(BCrypt.hashpw(newPassword));
        }
        userMapper.updateById(user);
        return data;
    }

    @Override
    public void createUser(User user) {
        userMapper.insert(user);
    }
}
