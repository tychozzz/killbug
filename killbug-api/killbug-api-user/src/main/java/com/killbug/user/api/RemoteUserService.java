package com.killbug.user.api;

import com.killbug.user.api.domain.User;
import com.killbug.user.api.model.LoginUser;

/**
 * Remote User Service
 *
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 15:11
 */
public interface RemoteUserService {

    LoginUser getUserInfo(String username);

    void updateUserBalance(Integer fromUserId, Integer toUserId, int balance);

    User getUserById(Long id);

    void incrBalanceById(Long userId, Integer reward);

    void decrBalanceById(Long userId, Integer reward);

    void testRemote();

    void createUser(User user);
}
