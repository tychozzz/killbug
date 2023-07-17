package com.killbug.question.controller;

import com.killbug.common.core.domain.R;
import com.killbug.question.api.vo.CommentVO;
import com.killbug.question.api.vo.ReplyVO;
import com.killbug.question.dto.CommentDTO;
import com.killbug.question.dto.ReplyDTO;
import com.killbug.question.service.ICommentService;
import com.killbug.question.service.IReplyService;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:50
 */
@Validated
@RequiredArgsConstructor
@RestController
public class ReplyController {

    private final IReplyService replyService;

    private final ICommentService commentService;

    @DubboReference
    private RemoteUserService remoteUserService;

    @PostMapping("/createReply")
    public R<ReplyVO> createReply(@Validated @RequestBody ReplyDTO replyDTO) {
        ReplyVO result = replyService.createReply(replyDTO);
        User u1 = remoteUserService.getUserById(result.getFromUserId());
        result.setNickname(u1.getNickname());
        result.setAvatar(u1.getAvatar());
        User u2 = remoteUserService.getUserById(result.getToUserId());
        result.setToUserNickname(u2.getNickname());
        commentService.incrReplyCountById(Long.valueOf(replyDTO.getCommentId()));
        return R.ok(result);
    }
}
