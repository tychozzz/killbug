package com.killbug.user.service;

import com.killbug.user.api.domain.User;
import com.killbug.user.dto.AccountSettingDTO;
import com.killbug.user.dto.UserProfileDTO;

import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 15:40
 */
public interface IUserService {
    User selectUserByUsername(String username);

    void updateUserBalance(Integer userId, int balance, int type);

    User getUserById(Long id);

    void incrBalanceById(Long userId, Integer reward);

    void decrBalanceById(Long userId, Integer reward);

    Map<String, Object> renderUserSpace(Long id) throws ExecutionException, InterruptedException;

    User getCurrentUser();

    void updateUserProfile(UserProfileDTO userProfileDTO);

    void recharge(Integer dollar);

    String changeAccountSetting(AccountSettingDTO accountSettingDTO);

    void createUser(User user);
}
