package com.killbug.question.service.impl;

import com.killbug.question.api.domain.Reply;
import com.killbug.question.api.vo.ReplyVO;
import com.killbug.question.dto.ReplyDTO;
import com.killbug.question.mapper.ReplyMapper;
import com.killbug.question.service.IReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:53
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ReplyServiceImpl implements IReplyService {

    private final ReplyMapper replyMapper;

    @Override
    public ReplyVO createReply(ReplyDTO replyDTO) {
        Integer replyType = replyDTO.getReplyType();
        Long commentId = Long.valueOf(replyDTO.getCommentId());
        Long replyId = Long.valueOf(replyDTO.getReplyId());
        Long fromUserId = Long.valueOf(replyDTO.getFromUserId());
        Long toUserId = Long.valueOf(replyDTO.getToUserId());
        String replyContent = replyDTO.getReplyContent();
        Reply reply = new Reply();
        reply.setReplyId(replyId);
        reply.setContent(replyContent);
        reply.setReplyType(replyType);
        reply.setCommentId(commentId);
        reply.setFromUserId(fromUserId);
        reply.setToUserId(toUserId);
        reply.setLikeCount(0);
        replyMapper.insert(reply);
        ReplyVO vo = new ReplyVO();
        BeanUtils.copyProperties(reply, vo);
        return vo;
    }
}
