package com.killbug.chat;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 13:46
 */
@EnableDubbo
@SpringBootApplication
public class KillBugChatApplication {

    public static void main(String[] args) {
        SpringApplication.run(KillBugChatApplication.class, args);
    }

}
