FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-auth.jar
ENV PORT=1101
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-auth.jar"]