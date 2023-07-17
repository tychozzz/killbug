package com.killbug.question.api.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 22:52
 */
@Data
public class CommentVO implements Serializable {

    private Long id;

    private Long userId;

    private String avatar;

    private String nickname;

    private String content;

    private Integer likeCount;

    private Integer replyCount;

    private Date createTime;

    private List<ReplyVO> replies;

    // if liked by current user - 0:no 1:yes
    private Integer isLiked;
}
