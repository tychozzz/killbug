FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-index.jar
ENV PORT=1001
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-index.jar"]