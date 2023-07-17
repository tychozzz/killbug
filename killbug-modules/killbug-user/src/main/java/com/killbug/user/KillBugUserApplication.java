package com.killbug.user;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 15:36
 */
@EnableDubbo
@SpringBootApplication
public class KillBugUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(KillBugUserApplication.class, args);
    }
}
