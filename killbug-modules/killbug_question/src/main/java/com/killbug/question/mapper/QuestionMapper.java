package com.killbug.question.mapper;

import com.killbug.common.mybatis.core.mapper.BaseMapperPlus;
import com.killbug.question.api.domain.Question;
import com.killbug.user.api.domain.User;
import org.apache.ibatis.annotations.Param;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:37
 */
public interface QuestionMapper extends BaseMapperPlus<QuestionMapper, Question, Question> {

    void incrCommentCountById(@Param("id") Long id);

    void incrLikeCountById(@Param("id") Long id);

    void decrLikeCountById(@Param("id") Long id);
}
