package com.killbug.question.api.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 17:12
 */
@Data
public class QuestionVO implements Serializable {

    private Long id;

    private String title;

    private String content;

    private Long userId;

    private Integer likeCount;

    private Integer commentCount;

    private String nickname;

    private String avatar;

    private String position;

    private Date createTime;

    // if liked by current user - 0:no 1:yes
    private Integer isLiked;

    private List<String> tags;
}
