package com.killbug.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 11:15
 */
@Data
@NoArgsConstructor
public class AccountSettingDTO {

    @NotNull(message = "type cannot be null")
    private Integer type;

    @Pattern(regexp = "^((\\+65)|(65)|0)?[689]\\d{7}$", message = "Phone number format is incorrect!")
    private String oldPhone;

    @Pattern(regexp = "^((\\+65)|(65)|0)?[689]\\d{7}$", message = "Phone number format is incorrect!")
    private String newPhone;

    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Email format is incorrect!")
    private String oldEmail;

    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Email format is incorrect!")
    private String newEmail;

    private String oldPassword;
    private String newPassword;
}
