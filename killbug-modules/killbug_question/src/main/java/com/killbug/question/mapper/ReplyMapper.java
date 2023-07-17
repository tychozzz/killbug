package com.killbug.question.mapper;

import com.killbug.common.mybatis.core.mapper.BaseMapperPlus;
import com.killbug.question.api.domain.Reply;
import org.apache.ibatis.annotations.Param;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:52
 */
public interface ReplyMapper extends BaseMapperPlus<ReplyMapper, Reply, Reply> {

    void incrLikeCountById(@Param("id") Long id);

    void decrLikeCountById(@Param("id") Long id);
}
