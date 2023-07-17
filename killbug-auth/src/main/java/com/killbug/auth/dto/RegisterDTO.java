package com.killbug.auth.dto;

import com.killbug.common.core.constant.UserConstants;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 12:54
 */
@Data
@NoArgsConstructor
public class RegisterDTO {

    @NotBlank(message = "Username cannot be null!")
    @Length(min = UserConstants.USERNAME_MIN_LENGTH, max = UserConstants.USERNAME_MAX_LENGTH, message = "input length error")
    private String username;

    @NotBlank(message = "Password cannot be null!")
    @Length(min = UserConstants.PASSWORD_MIN_LENGTH, max = UserConstants.PASSWORD_MAX_LENGTH, message = "input length error")
    private String password;

    @NotBlank(message = "Repassword cannot be null!")
    @Length(min = UserConstants.PASSWORD_MIN_LENGTH, max = UserConstants.PASSWORD_MAX_LENGTH, message = "input length error")
    private String repassword;
}
