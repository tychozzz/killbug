package com.killbug.common.core.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/6 09:18
 */
@Getter
@AllArgsConstructor
public enum UserStatus {

    OK("0", "正常"), DISABLE("1", "停用");

    private final String code;
    private final String info;
}
