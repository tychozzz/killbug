FROM openjdk:8
VOLUME /tmp
COPY target/*.jar killbug-bounty.jar
ENV PORT=1401
EXPOSE $PORT
ENTRYPOINT ["java", \
            "-Dserver.port=${PORT}", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-jar", "/killbug-bounty.jar"]