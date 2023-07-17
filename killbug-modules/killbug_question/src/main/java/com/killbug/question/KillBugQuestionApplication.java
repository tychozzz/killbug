package com.killbug.question;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:36
 */
@EnableDubbo
@SpringBootApplication
public class KillBugQuestionApplication {

    public static void main(String[] args) {
        SpringApplication.run(KillBugQuestionApplication.class, args);
    }
}
