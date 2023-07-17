package com.killbug.common.core.domain;

import com.killbug.common.core.constant.Constants;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Common Response Body to Frontend
 *
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 11:45
 */
@Data
@NoArgsConstructor
public class R<T> implements Serializable {

    /**
     * code 响应码
     * msg  响应信息
     * data 响应数据
     *
     * JSON
     *
     * {
     *     code: 200,
     *     msg: '请求成功！',
     *     data: {
     *         username: 'lty',
     *         email: 'xxx',
     *         phone: '123456'
     *     }
     *     data: {
     *         accessToken: 'xxxxx'
     *     }
     * }
     */


    private static final long serialVersionUID = 1L;

    public static final int SUCCESS = Constants.SUCCESS;

    public static final int FAIL = Constants.FAIL;

    private int code;

    private String msg;

    private T data;

    public static <T> R<T> ok() {
        return restResult(null, SUCCESS, "operate successfully!");
    }

    public static <T> R<T> ok(T data) {
        return restResult(data, SUCCESS, "operate successfully!");
    }

    public static <T> R<T> ok(String msg) {
        return restResult(null, SUCCESS, msg);
    }

    public static <T> R<T> ok(String msg, T data) {
        return restResult(data, SUCCESS, msg);
    }

    public static <T> R<T> fail() {
        return restResult(null, FAIL, "operate unsuccessfully!");
    }

    public static <T> R<T> fail(String msg) {
        return restResult(null, FAIL, msg);
    }

    public static <T> R<T> fail(T data) {
        return restResult(data, FAIL, "operate unsuccessfully!");
    }

    public static <T> R<T> fail(String msg, T data) {
        return restResult(data, FAIL, msg);
    }

    public static <T> R<T> fail(int code, String msg) {
        return restResult(null, code, msg);
    }

    public static <T> Boolean isSuccess(R<T> ret) {
        return R.SUCCESS == ret.getCode();
    }

    private static <T> R<T> restResult(T data, int code, String msg) {
        R<T> r = new R<>();
        r.setCode(code);
        r.setData(data);
        r.setMsg(msg);
        return r;
    }
}
