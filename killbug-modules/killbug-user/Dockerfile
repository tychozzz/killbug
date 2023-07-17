FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-user.jar
ENV PORT=1201
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-user.jar"]