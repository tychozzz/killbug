package com.killbug.question.api.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 22:53
 */
@Data
public class ReplyVO implements Serializable {

    private Long id;

    private Long fromUserId;

    private String avatar;

    private String nickname;

    private String content;

    private Long toUserId;

    private String toUserNickname;

    private Date createTime;

    private Integer likeCount;

    // if liked by current user - 0:no 1:yes
    private Integer isLiked;
}
