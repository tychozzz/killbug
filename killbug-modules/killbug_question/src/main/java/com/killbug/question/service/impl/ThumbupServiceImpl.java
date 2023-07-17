package com.killbug.question.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.killbug.common.core.exception.ServiceException;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.domain.Thumbup;
import com.killbug.question.dto.ThumbupDTO;
import com.killbug.question.mapper.CommentMapper;
import com.killbug.question.mapper.ThumbupMapper;
import com.killbug.question.mapper.QuestionMapper;
import com.killbug.question.mapper.ReplyMapper;
import com.killbug.question.service.IThumbupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/20 19:12
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ThumbupServiceImpl implements IThumbupService {

    private final ThumbupMapper likeMapper;

    private final QuestionMapper questionMapper;

    private final CommentMapper commentMapper;

    private final ReplyMapper replyMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean like(ThumbupDTO thumbupDTO) {
        Long userId = LoginHelper.getUserId();
        System.out.println(thumbupDTO.getLikedId());
        Long uId = Long.valueOf(thumbupDTO.getUserId());
        if (!userId.equals(uId)) {
            throw new ServiceException("no permission operation!", 401);
        }
        Long likedId = Long.valueOf(thumbupDTO.getLikedId());
        Integer type = thumbupDTO.getType();
        Thumbup like = likeMapper.selectOne(new QueryWrapper<Thumbup>()
                .eq("liked_id", likedId)
                .eq("user_id", userId)
                .eq("type", type));
        if (like == null) {
            // like operation
            like = new Thumbup();
            like.setLikedId(likedId);
            like.setUserId(userId);
            like.setType(type);
            likeMapper.insert(like);
            if (type == 0) {
                questionMapper.incrLikeCountById(like.getLikedId());
            } else if (type == 1) {
                commentMapper.incrLikeCountById(like.getLikedId());
            } else {
                replyMapper.incrLikeCountById(like.getLikedId());
            }
            return Boolean.TRUE;
        } else {
            // unlike operation
            likeMapper.deleteById(like.getId());
            if (type == 0) {
                questionMapper.decrLikeCountById(like.getLikedId());
            } else if (type == 1) {
                commentMapper.decrLikeCountById(like.getLikedId());
            } else {
                replyMapper.decrLikeCountById(like.getLikedId());
            }
            return Boolean.FALSE;
        }
    }

    @Override
    public Thumbup selectOne(Long likedId, Long userId, Integer type) {
        return likeMapper.selectOne(new QueryWrapper<Thumbup>()
                .eq("liked_id", likedId)
                .eq("user_id", userId)
                .eq("type", type));
    }
}
