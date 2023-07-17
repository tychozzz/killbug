package com.killbug.auth.service;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.secure.BCrypt;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjectUtil;
import com.killbug.auth.dto.RegisterDTO;
import com.killbug.auth.properties.UserPasswordProperties;
import com.killbug.common.core.constant.CacheConstants;
import com.killbug.common.core.constant.Constants;
import com.killbug.common.core.exception.ServiceException;
import com.killbug.common.redis.utils.RedisUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import com.killbug.user.api.model.LoginUser;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.function.Supplier;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 21:22
 */
@Service
public class LoginService {

    @DubboReference
    private RemoteUserService remoteUserService;

    @Autowired
    private UserPasswordProperties userPasswordProperties;

    public LoginUser login(String username, String password) {
        LoginUser userInfo = remoteUserService.getUserInfo(username);
        userInfo.setSex("0".equals(userInfo.getSex()) ? "男" : "女");
        checkLogin(username, () -> !BCrypt.checkpw(password, userInfo.getPassword()));
        LoginHelper.login(userInfo);
        userInfo.setToken(StpUtil.getTokenValue());
        return userInfo;
    }

    private void checkLogin(String username, Supplier<Boolean> supplier) {
        String errorKey = CacheConstants.PWD_ERR_CNT_KEY + username;
        String loginFail = Constants.LOGIN_FAIL;
        Integer maxRetryCount = userPasswordProperties.getMaxRetryCount();
        Integer lockTime = userPasswordProperties.getLockTime();
        Integer errorNumber = RedisUtils.getCacheObject(errorKey);
        if (ObjectUtil.isNotNull(errorNumber) && errorNumber.equals(maxRetryCount)) {
            throw new ServiceException("Password input error times exceed maximum, try again later");
        }
        if (supplier.get()) {
            errorNumber = ObjectUtil.isNull(errorNumber) ? 1 : errorNumber + 1;
            if (errorNumber.equals(maxRetryCount)) {
                RedisUtils.setCacheObject(errorKey, errorNumber, Duration.ofMinutes(lockTime));
                throw new ServiceException("Password input error times exceed maximum, try again later");
            } else {
                RedisUtils.setCacheObject(errorKey, errorNumber);
                throw new ServiceException("Password input error");
            }
        }
        RedisUtils.deleteObject(errorKey);
    }

    public void logout() {
        try {
            StpUtil.logout();
        } catch (NotLoginException ignored) {
        }
    }

    public void register(RegisterDTO registerDTO) {
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setNickname(registerDTO.getUsername());
        user.setPassword(BCrypt.hashpw(registerDTO.getRepassword()));
        user.setSex("0");
        user.setAvatar("https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/avatar-boy.png");
        remoteUserService.createUser(user);
    }
}
