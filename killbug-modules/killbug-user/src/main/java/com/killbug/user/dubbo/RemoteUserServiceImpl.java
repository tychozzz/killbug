package com.killbug.user.dubbo;

import cn.hutool.core.util.ObjectUtil;
import com.killbug.common.core.enums.UserStatus;
import com.killbug.common.core.exception.ServiceException;
import com.killbug.common.core.utils.BeanCopyUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import com.killbug.user.api.model.LoginUser;
import com.killbug.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.stereotype.Service;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/6 09:07
 */
@RequiredArgsConstructor
@Service
@DubboService
public class RemoteUserServiceImpl implements RemoteUserService {

    private final IUserService userService;

    @Override
    public LoginUser getUserInfo(String username) {
        User user = userService.selectUserByUsername(username);
        if (ObjectUtil.isNull(user)) {
            throw new ServiceException("Sorry, your account does not exist");
        }
        if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
            throw new ServiceException("Sorry, you account has been disabled");
        }
        return BeanCopyUtils.copy(user, LoginUser.class);
    }

    @Override
    public void updateUserBalance(Integer fromUserId, Integer toUserId, int balance) {
        userService.updateUserBalance(fromUserId, toUserId, balance);
    }

    @Override
    public User getUserById(Long id) {
        return userService.getUserById(id);
    }

    @Override
    public void incrBalanceById(Long userId, Integer reward) {
        userService.incrBalanceById(userId, reward);
    }

    @Override
    public void decrBalanceById(Long userId, Integer reward) {
        userService.decrBalanceById(userId, reward);
    }

    @Override
    public void testRemote() {
        Long userId = LoginHelper.getUserId();
        System.out.println(userId);
    }

    @Override
    public void createUser(User user) {
        userService.createUser(user);
    }
}
