package com.killbug.bounty.api.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.killbug.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * Solution entity representing a solution related to a specific bounty question.
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("solution")
public class Solution extends BaseEntity {

    @TableField(value = "id")
    private Long id;

    @NotNull(message = "bountyId cannot be null")
    private Long bountyId;

    @NotBlank(message = "content of the solution cannot be null")
    private String content;

}
