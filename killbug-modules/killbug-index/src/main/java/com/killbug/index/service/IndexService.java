package com.killbug.index.service;

import com.killbug.question.api.RemoteQuestionService;
import com.killbug.common.core.vo.ListVO;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 16:10
 */
@Service
public class IndexService {

    @DubboReference
    private RemoteQuestionService remoteQuestionService;

    @DubboReference
    private RemoteUserService remoteUserService;

    public ListVO<QuestionVO> getList(Integer pageNum, Integer pageSize) {
        ListVO<QuestionVO> questionList = remoteQuestionService.getQuestionList(pageNum, pageSize);
        List<QuestionVO> records = questionList.getRecords();
        records.stream().forEach(r -> {
            User user = remoteUserService.getUserById(r.getUserId());
            r.setAvatar(user.getAvatar());
            r.setNickname(user.getNickname());
        });
        return questionList;
    }

    public String test(Integer num) {
        return remoteQuestionService.test(num);
    }
}
