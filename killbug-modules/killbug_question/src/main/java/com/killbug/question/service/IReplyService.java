package com.killbug.question.service;

import com.killbug.question.api.vo.ReplyVO;
import com.killbug.question.dto.ReplyDTO;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 17:52
 */
public interface IReplyService {
    ReplyVO createReply(ReplyDTO replyDTO);
}
