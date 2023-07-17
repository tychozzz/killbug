package com.killbug.bounty.api.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.killbug.common.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * Transaction entity representing a transaction between the user who set up a bounty question and the user who solved it.
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("transaction")
public class Transaction extends BaseEntity {

    @TableId(value = "id")
    private Long id;

    @NotNull(message = "fromUserId cannot be null")
    private Long fromUserId;

    @NotNull(message = "toUserId cannot be null")
    private Long toUserId;

    @NotNull(message = "reward amount cannot be null")
    private Integer amount;

}
