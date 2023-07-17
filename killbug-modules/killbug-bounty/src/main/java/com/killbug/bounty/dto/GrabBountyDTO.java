package com.killbug.bounty.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/19 23:23
 */
@Data
@NoArgsConstructor
public class GrabBountyDTO {

    @NotBlank(message = "id cannot be null")
    private String id;

    //@NotBlank(message = "solverId cannot be null")
    //private String solverId;
}
