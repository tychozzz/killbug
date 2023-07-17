package com.killbug.user.controller;

import com.killbug.common.core.domain.R;
import com.killbug.question.api.RemoteQuestionService;
import com.killbug.user.api.domain.User;
import com.killbug.user.dto.AccountSettingDTO;
import com.killbug.user.dto.UserProfileDTO;
import com.killbug.user.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/5 15:40
 */
@Validated
@RequiredArgsConstructor
@RestController
public class UserController {

    private final IUserService userService;

    @DubboReference
    private RemoteQuestionService remoteQuestionService;

    @GetMapping("/getUserById/{userId}")
    public R<User> getUserById(@PathVariable("userId") String userId) {
        User user = userService.getUserById(Long.valueOf(userId));
        user.setPassword("");
        return R.ok(user);
    }

    @GetMapping("/renderUserSpace/{userId}")
    public R<Map<String, Object>> renderUserSpace(@PathVariable("userId") String userId) throws ExecutionException, InterruptedException {
        Long id = Long.valueOf(userId);
        Map<String, Object> map = userService.renderUserSpace(id);
        return R.ok(map);
    }

    @GetMapping("/getCurrentUser")
    public R<User> getCurrentUser() {
        User user = userService.getCurrentUser();
        return R.ok(user);
    }

    @PostMapping("/updateUserProfile")
    public R<Void> updateUserProfile(@Validated @RequestBody UserProfileDTO userProfileDTO) {
        userService.updateUserProfile(userProfileDTO);
        return R.ok();
    }

    @PostMapping("/recharge/{dollar}")
    public R<Void> recharge(@PathVariable("dollar") Integer dollar) {
        userService.recharge(dollar);
        return R.ok();
    }

    @PostMapping("/changeAccountSetting")
    public R<String> changeAccountSetting(@Validated @RequestBody AccountSettingDTO accountSettingDTO) {
        System.out.println(accountSettingDTO);
        String data = userService.changeAccountSetting(accountSettingDTO);
        return R.ok("Change successfully!", data);
    }

    @GetMapping("/testRemote")
    public R<Void> testRemote() {
        remoteQuestionService.testRemote();
        return R.ok();
    }
}
