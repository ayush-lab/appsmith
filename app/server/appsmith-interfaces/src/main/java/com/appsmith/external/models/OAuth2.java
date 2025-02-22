package com.appsmith.external.models;

import com.appsmith.external.annotations.documenttype.DocumentType;
import com.appsmith.external.annotations.encryption.Encrypted;
import com.appsmith.external.constants.Authentication;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.annotation.Transient;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@DocumentType(Authentication.OAUTH2)
public class OAuth2 extends AuthenticationDTO {
    public enum Type {
        @JsonProperty(Authentication.CLIENT_CREDENTIALS)
        CLIENT_CREDENTIALS,
        @JsonProperty(Authentication.AUTHORIZATION_CODE)
        AUTHORIZATION_CODE
    }

    Type grantType;

    Boolean isTokenHeader = false;

    Boolean isAuthorizationHeader = false;

    String clientId;

    @Encrypted
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String clientSecret;

    String authorizationUrl;

    String accessTokenUrl;

    @Transient
    String scopeString;

    Set<String> scope;

    String headerPrefix;

    Set<Property> customTokenParameters;

    public String getScopeString() {
        if (scopeString != null && !scopeString.isBlank()) {
            return scopeString;
        } else if (this.scope != null && !this.scope.isEmpty()) {
            return Strings.join(this.scope, ',');
        } else return null;
    }

    public void setScopeString(String scopeString) {
        this.scopeString = scopeString;
        if (scopeString != null && !scopeString.isBlank()) {
            this.scope = Arrays.stream(scopeString.split(","))
                    .filter(x -> !StringUtils.isEmpty(x))
                    .map(String::trim)
                    .collect(Collectors.toSet());
        }
    }
}
