package com.killbug.chat.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 23:18
 */
@Data
public class ChatVO {

    private Long chatId;

    private Long userId;

    private String nickname;

    private String avatar;

    private Date updateTime;

    private Integer type;
}
