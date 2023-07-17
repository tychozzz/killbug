package com.killbug.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:41
 */
@Data
@NoArgsConstructor
public class QuestionDTO {

    @NotBlank(message = "title cannot be null")
    private String title;

    @NotBlank(message = "content cannot be null")
    private String content;

    @NotNull(message = "tags cannot be null")
    private List<String> tags;
}
