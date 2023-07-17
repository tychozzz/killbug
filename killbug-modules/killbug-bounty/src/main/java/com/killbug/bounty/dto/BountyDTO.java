package com.killbug.bounty.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/19 16:56
 */
@Data
@NoArgsConstructor
public class BountyDTO {

    @NotBlank(message = "title cannot be null")
    private String title;

    @NotBlank(message = "content cannot be null")
    private String content;

    @NotNull(message = "reward cannot be null")
    private Integer reward;

    @NotNull(message = "tags cannot be null")
    private List<String> tags;
}
