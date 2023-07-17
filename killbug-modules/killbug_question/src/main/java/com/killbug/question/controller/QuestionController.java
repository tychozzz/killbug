package com.killbug.question.controller;

import com.killbug.common.core.domain.R;
import com.killbug.common.core.vo.ListVO;
import com.killbug.common.redis.utils.RedisUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.domain.Question;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.question.dto.QuestionDTO;
import com.killbug.question.mapper.QuestionMapper;
import com.killbug.question.service.IQuestionService;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import com.killbug.user.api.model.LoginUser;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:37
 */
@Validated
@RequiredArgsConstructor
@RestController
public class QuestionController {

    private final IQuestionService questionService;

    private final QuestionMapper questionMapper;

    @DubboReference
    private RemoteUserService remoteUserService;

    @PostMapping("createQuestion")
    public R<Long> createQuestion(@Validated @RequestBody QuestionDTO questionDTO) {
        Long questionId = questionService.createQuestion(questionDTO);
        return R.ok(questionId);
    }

    @GetMapping("/getQuestionList/{pageNum}/{pageSize}/{type}")
    public R<ListVO<QuestionVO>> getQuestionList(@PathVariable("pageNum") Integer pageNum,
                                                 @PathVariable("pageSize") Integer pageSize,
                                                 @PathVariable("type") Integer type) {
        ListVO<QuestionVO> result = questionService.getQuestionList(pageNum, pageSize, type);
        List<QuestionVO> records = result.getRecords();
        records.stream().forEach(r -> {
            User user = remoteUserService.getUserById(r.getUserId());
            r.setAvatar(user.getAvatar());
            r.setNickname(user.getNickname());
        });
        return R.ok(result);
    }

    @GetMapping("/getQuestion/{id}")
    public R<QuestionVO> getQuestion(@PathVariable("id") String id) {
        Long idInt = Long.valueOf(id);
        QuestionVO q = questionService.getQuestionById(idInt);
        User user = remoteUserService.getUserById(q.getUserId());
        q.setNickname(user.getNickname());
        q.setAvatar(user.getAvatar());
        return R.ok(q);
    }

    @GetMapping("/getMyQuestions")
    public R<List<QuestionVO>> getMyQuestions() {
        List<QuestionVO> list = questionService.getMyQuestions();
        return R.ok(list);
    }

    @GetMapping("/testRemote")
    public R<Void> testRemote() {
        remoteUserService.testRemote();
        return R.ok();
    }

    @PostMapping("/addTags")
    public R<Void> addTags() {
        List<Question> questions = questionMapper.selectList();
        String[] s = new String[]{"Backend", "Frontend", "AI", "Android", "IOS"};
        Random random = new Random();
        questions.forEach(q -> {
            Set<String> set = new HashSet<>();
            set.add(s[random.nextInt(s.length)]);
            set.add(s[random.nextInt(s.length)]);
            RedisUtils.setCacheSet("tags:" + q.getId(), set);
        });
        return R.ok();
    }

    @PostMapping("/addIdToTag")
    public R<Void> addIdToTag() {
        List<Question> bounties = questionMapper.selectList();
        bounties.forEach(q -> {
            Set<String> set = RedisUtils.getCacheSet("tags:" + q.getId());
            for (String s : set) {
                Set<String> idSet = RedisUtils.getCacheSet("tagName:" + s);
                idSet.add(q.getId().toString());
                RedisUtils.setCacheSet("tagName:" + s, idSet);
            }
        });
        return R.ok();
    }
}
