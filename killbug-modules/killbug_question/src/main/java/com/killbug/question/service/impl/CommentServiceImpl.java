package com.killbug.question.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.domain.Comment;
import com.killbug.question.api.domain.Question;
import com.killbug.question.api.domain.Reply;
import com.killbug.question.api.domain.Thumbup;
import com.killbug.question.api.vo.CommentVO;
import com.killbug.question.api.vo.ReplyVO;
import com.killbug.question.dto.CommentDTO;
import com.killbug.question.mapper.CommentMapper;
import com.killbug.question.mapper.ReplyMapper;
import com.killbug.question.mapper.ThumbupMapper;
import com.killbug.question.service.ICommentService;
import com.killbug.question.service.IThumbupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:52
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements ICommentService {

    private final CommentMapper commentMapper;

    private final ReplyMapper replyMapper;

    private final IThumbupService thumbupService;

    @Override
    public List<CommentVO> getComments(Long id) {

        Long userId = null;
        if (LoginHelper.isLogin()) {
            userId = LoginHelper.getUserId();
        }

        List<Comment> comments = commentMapper
                .selectList(new QueryWrapper<Comment>().eq("question_id", id).orderByDesc("create_time"));
        Long uId = userId;
        List<CommentVO> result = comments.stream().map(c -> {
            List<Reply> replies = replyMapper
                    .selectList(new QueryWrapper<Reply>().eq("comment_id", c.getId()).orderByAsc("create_time"));
            List<ReplyVO> replyVOList = replies.stream().map(r -> {
                ReplyVO rv = new ReplyVO();
                BeanUtils.copyProperties(r, rv);
                if (uId != null && thumbupService.selectOne(r.getId(), uId, 2) != null) {
                    rv.setIsLiked(1);
                } else {
                    rv.setIsLiked(0);
                }
                return rv;
            }).collect(Collectors.toList());
            CommentVO cv = new CommentVO();
            BeanUtils.copyProperties(c, cv);
            if (uId != null && thumbupService.selectOne(c.getId(), uId, 1) != null) {
                cv.setIsLiked(1);
            } else {
                cv.setIsLiked(0);
            }
            cv.setReplies(replyVOList);
            return cv;
        }).collect(Collectors.toList());
        return result;
    }

    @Override
    public CommentVO createComment(CommentDTO commentDTO) {
        String content = commentDTO.getContent();
        Long userId = Long.valueOf(commentDTO.getUserId());
        Long questionId = Long.valueOf(commentDTO.getQuestionId());
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUserId(userId);
        comment.setQuestionId(questionId);
        comment.setLikeCount(0);
        comment.setReplyCount(0);
        commentMapper.insert(comment);
        CommentVO vo = new CommentVO();
        BeanUtils.copyProperties(comment, vo);
        return vo;
    }

    @Override
    public void incrReplyCountById(Long id) {
        commentMapper.incrReplyCountById(id);
    }
}
