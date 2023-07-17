package com.killbug.question.service;

import com.killbug.question.api.domain.Thumbup;
import com.killbug.question.dto.ThumbupDTO;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/20 19:11
 */
public interface IThumbupService {
    Boolean like(ThumbupDTO thumbupDTO);

    Thumbup selectOne(Long likedId, Long userId, Integer type);
}
