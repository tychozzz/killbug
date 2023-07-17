FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-chat.jar
ENV PORT=8087
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-chat.jar"]