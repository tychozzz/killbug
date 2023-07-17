package com.killbug.question.dubbo;

import cn.dev33.satoken.same.SaSameUtil;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.RemoteQuestionService;
import com.killbug.common.core.vo.ListVO;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.question.service.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 15:02
 */
@RequiredArgsConstructor
@Service
@DubboService
public class RemoteQuestionServiceImpl implements RemoteQuestionService {

    private final IQuestionService questionService;

    @Override
    public ListVO<QuestionVO> getQuestionList(Integer pageNum, Integer pageSize) {
        return questionService.getQuestionList(pageNum, pageSize, 0);
    }

    @Override
    public List<QuestionVO> getQuestionList() {
        return questionService.getQuestionList();
    }

    @Override
    public String test(Integer num) {
        System.out.println(num);
        return "test1111";
    }

    @Override
    public List<QuestionVO> getMyQuestions() {
        return questionService.getMyQuestions();
    }

    @Override
    public void testRemote() {
        System.out.println(LoginHelper.getLoginUser());
        System.out.println(LoginHelper.getUserId());
    }

    @Override
    public List<QuestionVO> getQuestionsByUserId(Long id) {
        return questionService.getQuestionsByUserId(id);
    }
}
