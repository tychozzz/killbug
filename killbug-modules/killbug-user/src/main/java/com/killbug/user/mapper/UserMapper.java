package com.killbug.user.mapper;

import com.killbug.common.mybatis.core.mapper.BaseMapperPlus;
import com.killbug.user.api.domain.User;
import org.apache.ibatis.annotations.Param;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 15:41
 */
public interface UserMapper extends BaseMapperPlus<UserMapper, User, User> {

    void incrBalanceById(@Param("userId") Long userId, @Param("reward") Integer reward);

    void decrBalanceById(@Param("userId") Long userId, @Param("reward") Integer reward);
}
