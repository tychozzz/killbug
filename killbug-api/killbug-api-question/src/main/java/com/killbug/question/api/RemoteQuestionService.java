package com.killbug.question.api;

import com.killbug.common.core.vo.ListVO;
import com.killbug.question.api.vo.QuestionVO;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 14:56
 */
public interface RemoteQuestionService {

    ListVO<QuestionVO> getQuestionList(Integer pageNum, Integer pageSize);

    List<QuestionVO> getQuestionList();

    String test(Integer num);

    List<QuestionVO> getMyQuestions();

    void testRemote();

    List<QuestionVO> getQuestionsByUserId(Long id);
}
