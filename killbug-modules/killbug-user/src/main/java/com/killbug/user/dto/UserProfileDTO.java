package com.killbug.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/20 16:05
 */
@Data
@NoArgsConstructor
public class UserProfileDTO {

    @NotBlank(message = "userId cannot be null")
    private String userId;

    @NotBlank(message = "nickname cannot be null")
    private String nickname;

    @NotBlank(message = "avatar cannot be null")
    private String avatar;

    private String position;

    private String company;

    private String website;

    private String introduction;
}
