package com.killbug.chat.vo;

import lombok.Data;

import java.util.Date;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 23:53
 */
@Data
public class ChatRecordVO {

    private String content;

    private Long senderId;

    private Long receiverId;

    private Date createTime;
}
