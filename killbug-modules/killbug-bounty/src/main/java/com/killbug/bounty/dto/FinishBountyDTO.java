package com.killbug.bounty.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/22 14:32
 */
@Data
@NoArgsConstructor
public class FinishBountyDTO {

    @NotBlank(message = "id cannot be null")
    private String id;

    @NotBlank(message = "solverId cannot be null")
    private String solverId;
}
