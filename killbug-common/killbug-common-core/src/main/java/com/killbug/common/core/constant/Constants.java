package com.killbug.common.core.constant;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 11:45
 */
public interface Constants {

    /**
     * UTF-8
     */
    String UTF8 = "UTF-8";

    /**
     * GBK
     */
    String GBK = "GBK";

    /**
     * www
     */
    String WWW = "www.";

    /**
     * http
     */
    String HTTP = "http://";

    /**
     * https
     */
    String HTTPS = "https://";

    /**
     * success code
     */
    Integer SUCCESS = 200;

    /**
     * fail code
     */
    Integer FAIL = 500;

    /**
     * login success state
     */
    String LOGIN_SUCCESS_STATUS = "0";

    /**
     * login fail success
     */
    String LOGIN_FAIL_STATUS = "1";

    /**
     * login success
     */
    String LOGIN_SUCCESS = "Success";

    /**
     * logout
     */
    String LOGOUT = "Logout";

    /**
     * register
     */
    String REGISTER = "Register";

    /**
     * login error
     */
    String LOGIN_FAIL = "Error";

    /**
     * captcha valid duration
     */
    long CAPTCHA_EXPIRATION = 2;

    /**
     * repeat submit
     */
    String REPEAT_SUBMIT_KEY = "repeat_submit:";
}
