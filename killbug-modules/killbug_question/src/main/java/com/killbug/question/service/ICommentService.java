package com.killbug.question.service;

import com.killbug.question.api.vo.CommentVO;
import com.killbug.question.dto.CommentDTO;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:52
 */
public interface ICommentService {

    List<CommentVO> getComments(Long id);

    CommentVO createComment(CommentDTO commentDTO);

    void incrReplyCountById(Long valueOf);
}
