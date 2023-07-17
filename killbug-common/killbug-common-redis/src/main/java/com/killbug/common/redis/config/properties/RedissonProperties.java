package com.killbug.common.redis.config.properties;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.redisson.config.ReadMode;
import org.redisson.config.SubscriptionMode;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 19:33
 */
@Data
@ConfigurationProperties(prefix = "redisson")
public class RedissonProperties {

    /**
     * redis cache key prefix
     */
    private String keyPrefix;

    /**
     * thread number: default value = cpu core number * 2
     */
    private int threads;

    /**
     * netty thread number: default value = cpu core number * 2
     */
    private int nettyThread;

    private SingleServerConfig singleServerConfig;

    private ClusterServersConfig clusterServersConfig;

    @Data
    @NoArgsConstructor
    public static class SingleServerConfig {

        private String clientName;

        private int connectionMinimumIdleSize;

        private int connectionPoolSize;

        private int idleConnectionTimeout;

        private int timeout;

        private int subscriptionConnectionPoolSize;
    }

    @Data
    @NoArgsConstructor
    public static class ClusterServersConfig {

        private String clientName;

        private int masterConnectionMinimumIdleSize;

        private int masterConnectionPoolSize;

        private int slaveConnectionMinimumIdleSize;

        private int slaveConnectionPoolSize;

        private int idleConnectionTimeout;

        private int timeout;

        private int subscriptionConnectionPoolSize;

        private ReadMode readMode;

        private SubscriptionMode subscriptionMode;
    }
}
