FROM busybox:1.38.0

WORKDIR /theme

# Keycloak 26 only: the 22-to-25 JAR declares the same theme names and must not reach /providers.
COPY dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /theme/

CMD ["cp", "-r", "/theme/.", "/providers/"]
