package com.killbug.chat.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 16:49
 */
@Data
@NoArgsConstructor
public class MessageDTO {

    //@NotBlank(message = "SenderId cannot be null!")
    //private String senderId;

    @NotBlank(message = "ReceiverId cannot be null!")
    private String receiverId;

    @NotBlank(message = "Content cannot be null!")
    private String content;

    @NotNull(message = "Type cannot be null!")
    private Integer type;
}
