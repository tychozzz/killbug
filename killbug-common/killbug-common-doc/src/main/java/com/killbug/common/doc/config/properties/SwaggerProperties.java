package com.killbug.common.doc.config.properties;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.tags.Tag;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.util.List;
import java.util.Map;

/**
 * Swagger Properties
 *
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 15:40
 */
@Data
@ConfigurationProperties(prefix = "swagger")
public class SwaggerProperties {

    /**
     * if OpenApi enabled
     */
    private Boolean enabled = true;

    /**
     * doc basic info
     */
    @NestedConfigurationProperty
    private InfoProperties info = new InfoProperties();

    /**
     * external doc
     */
    @NestedConfigurationProperty
    private ExternalDocumentation externalDocs;

    private List<Tag> tags = null;

    @NestedConfigurationProperty
    private Paths paths = null;

    @NestedConfigurationProperty
    private Components components = null;

    private Map<String, String> serviceMapping = null;

    /**
     * @see io.swagger.v3.oas.models.info.Info
     */
    @Data
    public static class InfoProperties {

        private String title = null;

        private String description = null;

        @NestedConfigurationProperty
        private Contact contact = null;

        @NestedConfigurationProperty
        private License license = null;

        private String version = null;
    }
}
