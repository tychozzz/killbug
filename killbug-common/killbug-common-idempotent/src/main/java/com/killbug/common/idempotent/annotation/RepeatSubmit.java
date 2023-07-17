package com.killbug.common.idempotent.annotation;

import java.lang.annotation.*;
import java.util.concurrent.TimeUnit;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 18:40
 */

/**
 * 幂等性 - 用在点赞模块 限制点赞频率 1s最多点赞1次
 *
 * 防止连续点击按钮 出现的不可控事件 发起多次请求
 * 支付接口：由于网络延迟，多点了一次，可能会多付钱
 * 保证多次请求，返回的是相同的响应
 */
@Inherited
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RepeatSubmit {

    int interval() default 5000;

    TimeUnit timeUnit() default TimeUnit.MILLISECONDS;

    String message() default "please try again later!";
}
