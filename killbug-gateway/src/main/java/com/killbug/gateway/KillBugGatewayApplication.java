package com.killbug.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 20:21
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class KillBugGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(KillBugGatewayApplication.class, args);
    }
}
