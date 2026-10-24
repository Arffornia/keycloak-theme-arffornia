FROM busybox:1.38.0

WORKDIR /theme

COPY dist_keycloak/*.jar /theme/

CMD ["cp", "-r", "/theme/.", "/providers/"]
