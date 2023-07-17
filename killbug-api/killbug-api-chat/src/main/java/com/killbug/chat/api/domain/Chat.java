package com.killbug.chat.api.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.killbug.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 22:56
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("chat")
public class Chat extends BaseEntity {

    @TableId(value = "id")
    private Long id;

    @NotNull(message = "senderId cannot be null")
    private Long senderId;

    @NotNull(message = "receiverId cannot be null")
    private Long receiverId;

    @NotNull(message = "type cannot be null")
    private Integer type;
}
