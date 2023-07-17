package com.killbug.bounty.api.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/19 17:44
 */
@Data
public class BountyVO implements Serializable {

    private Long id;

    private String title;

    private String content;

    private Long publisherId;

    private String publisherAvatar;

    private String publisherNickname;

    private String publisherPosition;

    private Long solverId;

    private String solverAvatar;

    private String solverNickname;

    private String solverPosition;

    private Integer reward;

    private Integer status;

    private Date createTime;

    private List<String> tags;
}
