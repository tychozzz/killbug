package com.killbug.auth.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 21:22
 */
@Data
@Configuration
@RefreshScope
@ConfigurationProperties(prefix = "user.password")
public class UserPasswordProperties {

    private Integer maxRetryCount;

    private Integer lockTime;
}
