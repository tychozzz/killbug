package com.killbug.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/20 19:13
 */
@Data
@NoArgsConstructor
public class ThumbupDTO {

    @NotBlank(message = "likedId cannot be null")
    private String likedId;

    @NotBlank(message = "userId cannot be null")
    private String userId;

    @NotNull(message = "type cannot be null")
    private Integer type;
}
