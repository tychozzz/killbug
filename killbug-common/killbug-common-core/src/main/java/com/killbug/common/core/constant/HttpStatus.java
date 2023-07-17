package com.killbug.common.core.constant;

/**
 * Http Response Code
 *
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 11:52
 */
public interface HttpStatus {

    int SUCCESS = 200;

    /**
     * argument list error
     */
    int BAD_REQUEST = 400;

    /**
     * unauthorized
     */
    int UNAUTHORIZED = 401;

    /**
     * restricted access / expired authorization
     */
    int FORBIDDEN = 403;

    /**
     * server error
     */
    int ERROR = 500;

}
