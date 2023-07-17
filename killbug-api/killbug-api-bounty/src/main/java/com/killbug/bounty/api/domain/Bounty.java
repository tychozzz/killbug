package com.killbug.bounty.api.domain;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.killbug.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * Bounty entity representing a bounty question with a reward.
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("bounty")
public class Bounty extends BaseEntity {

    @TableId(value = "id")
    private Long id;

    @NotBlank(message = "title cannot be null")
    private String title;

    @NotBlank(message = "content cannot be null")
    private String content;

    @NotNull(message = "userId cannot be null")
    private Long publisherId;

    @TableField(value = "solver_id", updateStrategy = FieldStrategy.IGNORED)
    private Long solverId;

    @NotNull(message = "reward cannot be null")
    private Integer reward;

    private Integer status;
}
