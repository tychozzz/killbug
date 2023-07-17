package com.killbug.common.core.enums;

import cn.hutool.core.util.DesensitizedUtil;
import cn.hutool.core.util.StrUtil;
import lombok.AllArgsConstructor;

import java.util.function.Function;

/**
 * Desensitization Strategy
 *
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 12:07
 */
@AllArgsConstructor
public enum SensitiveStrategy {

    /**
     * phone number 177****1234
     */
    //PHONE(DesensitizedUtil::mobilePhone),

    /**
     * phone number 8123****
     */
    PHONE((num) -> StrUtil.isBlank(num) ? "" : StrUtil.hide(num, 4, num.length())),

    /**
     * address number
     */
    ADDRESS(s -> DesensitizedUtil.address(s, 8)),

    /**
     * email address
     */
    EMAIL(DesensitizedUtil::email),

    /**
     * bank card
     */
    BANK_CARD(DesensitizedUtil::bankCard);

    private final Function<String, String> desensitizer;

    public Function<String, String> desensitizer() {
        return desensitizer;
    }
}
