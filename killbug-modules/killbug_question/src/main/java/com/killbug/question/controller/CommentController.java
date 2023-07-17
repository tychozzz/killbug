package com.killbug.question.controller;

import com.killbug.common.core.domain.R;
import com.killbug.question.api.vo.CommentVO;
import com.killbug.question.api.vo.ReplyVO;
import com.killbug.question.dto.CommentDTO;
import com.killbug.question.dto.QuestionDTO;
import com.killbug.question.service.ICommentService;
import com.killbug.question.service.IQuestionService;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:50
 */
@Validated
@RequiredArgsConstructor
@RestController
public class CommentController {

    private final ICommentService commentService;

    private final IQuestionService questionService;

    @DubboReference
    private RemoteUserService remoteUserService;

    @GetMapping("getComments/{id}")
    public R<List<CommentVO>> getComments(@PathVariable("id") String id) {
        Long idInt = Long.valueOf(id);
        List<CommentVO> comments = commentService.getComments(idInt);
        comments.forEach(c -> {
            User p = remoteUserService.getUserById(c.getUserId());
            c.setAvatar(p.getAvatar());
            c.setNickname(p.getNickname());
            List<ReplyVO> replies = c.getReplies();
            replies.forEach(r -> {
                User u1 = remoteUserService.getUserById(r.getFromUserId());
                r.setAvatar(u1.getAvatar());
                r.setNickname(u1.getNickname());
                User u2 = remoteUserService.getUserById(r.getToUserId());
                r.setToUserNickname(u2.getNickname());
            });
        });
        return R.ok(comments);
    }

    @PostMapping("/createComment")
    public R<CommentVO> createComment(@Validated @RequestBody CommentDTO commentDTO) {
        CommentVO result = commentService.createComment(commentDTO);
        User u = remoteUserService.getUserById(result.getUserId());
        result.setNickname(u.getNickname());
        result.setAvatar(u.getAvatar());
        questionService.incrCommentCountById(Long.valueOf(commentDTO.getQuestionId()));
        return R.ok(result);
    }
}
