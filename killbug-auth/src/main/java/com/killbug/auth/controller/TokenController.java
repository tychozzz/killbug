package com.killbug.auth.controller;

import com.killbug.auth.dto.LoginDTO;
import com.killbug.auth.dto.RegisterDTO;
import com.killbug.auth.service.LoginService;
import com.killbug.common.core.domain.R;
import com.killbug.user.api.model.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 21:21
 */
@Validated
@RequiredArgsConstructor
@RestController
public class TokenController {

    private final LoginService loginService;

    /**
     * 1. 前端输入账号密码，点击按钮进行登陆
     * 2. 请求到达后端
     * 3. 校验用户名密码是否正确
     * 4. 登陆成功，返回token
     * 5. 前端通过JSON响应，获取到token，将其存储到本地LocalStorage：可能需要借助状态管理工具
     *   - 请求统一封装 以及 响应拦截器
     *      - 请求统一封装：每次发送请求，若LocalStorage当中有Token，则携带Token
     *      - 响应拦截器：msg code data
     *          - code:
     *              - 200: success 拿到数据，进行之后的处理
     *              - 500: server error 抛出异常 提示框
     *              - 401/403: Authorization error 抛出异常 提示框/导航到登陆界面
     *                登陆界面：正中间一个登陆框 按钮 输入账号密码
     * 6. 用户请求查看个人中心，查看个人信息，前端发送请求，请求头header key-value Authorization-{token}
     * 7. 后端拦截请求，判断当前请求路径是否需要放行，不可以放行则校验请求头中的token
     * @param form
     * @return
     */
    /**
     * session requestSession
     * session: JVM内存
     * 对于微服务系统，有多个JVM，多个服务之间共享session
     * - JWT JSON Web Token：无状态，不需要在服务端存储Token，存在客户端本地LocalStorage，每次请求携带该Jwt，
     *   通过对称加解密或者非对称加解密、自己设置的secret，只要解密成功，就说明正确，可以放行
     *   只有等到过期时间结束，才会失效
     * - Redis 分布式Session token存储在Redis 将客户端放到header的token与Redis的Token进行对比 相等才可放行
     *   性能要差一些，额外功能：我顶了你的账号使Token失效、用户权限更改，服务端根据不同的情景，对Token进行不同的处理
     *
     *   Sa-Token 权限框架 整合了RBAC、分布式session、Token拦截器、单点登录
     *
     *   SpringBoot单点登录如何实现：Session、Jwt、Redis（分布式Session）
     *
     * @param form
     * @return
     */
    @PostMapping("login")
    public R<LoginUser> login(@Validated @RequestBody LoginDTO form) {
        LoginUser loginUser = loginService.login(form.getUsername(), form.getPassword());
        return R.ok(loginUser);
    }

    @PostMapping("logout")
    public R<Void> logout() {
        loginService.logout();
        return R.ok();
    }

    @PostMapping("register")
    public R<Void> register(@RequestBody RegisterDTO registerDTO) {
        loginService.register(registerDTO);
        return R.ok();
    }
}
