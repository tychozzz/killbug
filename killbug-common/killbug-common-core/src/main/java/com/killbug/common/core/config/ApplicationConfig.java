package com.killbug.common.core.config;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 11:57
 */
@AutoConfiguration
@EnableAspectJAutoProxy(exposeProxy = true)
public class ApplicationConfig {
}
