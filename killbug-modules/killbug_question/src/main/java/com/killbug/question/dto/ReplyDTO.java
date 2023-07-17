package com.killbug.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/19 15:42
 */
@Data
@NoArgsConstructor
public class ReplyDTO {

    private Integer replyType;

    private String commentId;

    private String replyId;

    private String fromUserId;

    private String toUserId;

    private String replyContent;
}
