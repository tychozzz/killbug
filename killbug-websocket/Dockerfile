FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-websocket.jar
ENV PORT=8099
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-websocket.jar"]