package com.killbug.index.controller;

import com.killbug.bounty.api.RemoteBountyService;
import com.killbug.bounty.api.vo.BountyVO;
import com.killbug.common.core.config.AsyncConfig;
import com.killbug.common.core.domain.R;
import com.killbug.common.core.exception.ServiceException;
import com.killbug.index.service.IndexService;
import com.killbug.common.core.vo.ListVO;
import com.killbug.question.api.RemoteQuestionService;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 14:53
 */
@Validated
@RequiredArgsConstructor
@RestController
public class IndexController {

    private final IndexService indexService;

    @DubboReference
    private RemoteQuestionService remoteQuestionService;

    @DubboReference
    private RemoteBountyService remoteBountyService;

    @DubboReference
    private RemoteUserService remoteUserService;

    private final AsyncConfig asyncConfig;

    //@GetMapping("/getList/{pageNum}/{pageSize}")
    //public R<ListVO<QuestionVO>> getList(@PathVariable("pageNum") Integer pageNum,
    //                                     @PathVariable("pageSize") Integer pageSize) {
    //    ListVO<QuestionVO> result = indexService.getList(pageNum, pageSize);
    //    return R.ok(result);
    //}

    @GetMapping("/getList")
    public R<Map<String, Object>> getList() throws ExecutionException, InterruptedException {
        //Executor executor = asyncConfig.getAsyncExecutor();

        List<QuestionVO> questionList = remoteQuestionService.getQuestionList();
        questionList.forEach(q -> {
            User user = remoteUserService.getUserById(q.getUserId());
            q.setAvatar(user.getAvatar());
            q.setNickname(user.getNickname());
        });


        List<BountyVO> bountyList = remoteBountyService.getBountyList();
        bountyList.forEach(b -> {
            User user = remoteUserService.getUserById(b.getPublisherId());
            b.setPublisherAvatar(user.getAvatar());
            b.setPublisherNickname(user.getNickname());
        });

        Map<String, Object> res = new HashMap<>();
        res.put("questionList", questionList);
        res.put("bountyList", bountyList);
        return R.ok(res);
    }

    @GetMapping("/test/{num}")
    public R<String> test(@PathVariable("num") Integer num) {
        String res = indexService.test(num);
        return R.ok(res);
    }
}
