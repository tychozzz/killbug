package com.killbug.bounty;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/17 22:22
 */
@EnableDubbo
@SpringBootApplication
public class KillBugBountyApplication {

    public static void main(String[] args) {
        SpringApplication.run(KillBugBountyApplication.class, args);
    }
}
