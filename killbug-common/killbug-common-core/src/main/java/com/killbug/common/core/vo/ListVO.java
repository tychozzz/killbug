package com.killbug.common.core.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/18 15:30
 */
@Data
public class ListVO<T> implements Serializable {

    private long current;

    private long pages;

    private long size;

    private long total;

    private List<T> records;
}
