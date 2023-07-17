package com.killbug.question.service;

import com.killbug.common.core.vo.ListVO;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.question.dto.QuestionDTO;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:39
 */
public interface IQuestionService {
    Long createQuestion(QuestionDTO questionDTO);

    ListVO<QuestionVO> getQuestionList(Integer pageNum, Integer pageSize, Integer type);

    List<QuestionVO> getQuestionList();

    QuestionVO getQuestionById(Long id);

    void incrCommentCountById(Long id);

    List<QuestionVO> getMyQuestions();

    List<QuestionVO> getQuestionsByUserId(Long id);
}
