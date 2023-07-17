package com.killbug.question.api.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.killbug.common.core.domain.BaseEntity;
import com.killbug.common.core.xss.Xss;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:45
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("question")
public class Question extends BaseEntity {

    @TableId(value = "id")
    private Long id;

    @Xss(message = "script cannot exist in title")
    @NotBlank(message = "title cannot be null")
    private String title;

    @Xss(message = "script cannot exist in content")
    @NotBlank(message = "content cannot be null")
    private String content;

    @NotBlank(message = "userId cannot be null")
    private Long userId;

    private Integer likeCount;

    private Integer commentCount;
}
