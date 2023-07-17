package com.killbug.question.mapper;

import com.killbug.common.mybatis.core.mapper.BaseMapperPlus;
import com.killbug.question.api.domain.Comment;
import org.apache.ibatis.annotations.Param;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:51
 */
public interface CommentMapper extends BaseMapperPlus<CommentMapper, Comment, Comment> {

    void incrReplyCountById(@Param("id") Long id);

    void incrLikeCountById(@Param("id") Long id);

    void decrLikeCountById(@Param("id") Long id);
}
