<p align="center">
  <img src="https://github.com/ltyzzzxxx/killbug/assets/73587471/664b3a54-013b-4212-a04c-e862dc76aa2e" width='200'>
</p>

<div align="center">
    
# Kill Bug

<!-- prettier-ignore-start -->
<!-- markdownlint-disable-next-line MD036 -->
_✨ Your Most Reliable Programming Assistant! ✨_
<!-- prettier-ignore-end -->
<p align="center">
  <img src="https://img.shields.io/github/v/release/ltyzzzxxx/killbug?display_name=tag" />
  <img src="https://img.shields.io/github/stars/ltyzzzxxx/killbug" />
  <img src="https://img.shields.io/github/forks/ltyzzzxxx/killbug" />
  <img src="https://img.shields.io/github/issues/ltyzzzxxx/killbug" />
  <img src="https://img.shields.io/badge/license-Apache%20-yellow.svg" />
</p>
</div>

The following is the amount of code for this project.

<img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230424203013147.png" alt="image-20230424203013147" style="zoom:50%;" />

## Display

<img width="750" alt="image-20230425223113959" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/c26db2f6-27de-4db5-ab53-53808f165922">

<img width="750" alt="image-20230425225042834" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/2e8c7e43-25e5-4c75-8dfc-d1825f3d2bb1">

<img width="750" alt="image-20230425225150480" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/f7b94173-744f-4a9d-89af-314441a1cf1f">

<img width="750" alt="image-20230425225131549" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/2cafc09b-afc2-4fba-9057-e476a57da96d">

<img width="750" alt="image-20230425225214302" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/9422a3e2-9be3-4cec-b2c2-fe79f3172c67">

## What does it do

Kill-Bug is an easy-to-use platform designed for programmers to solve problems encountered in daily development. It provides features such as searching questions, posting questions, answering questions, checking questions, etc. However, if that's all, it's no different from a normal programming forum. We provide more innovative features: **Bounty**, **Instant Messaging** and **Collaborative Editing**. This means all users on this platform can encourage other users to answer their questions with bounties. After that, the publisher and grabber can chat and communicate on the Kill-Bug platform to finish this bounty. In my eyes, this is a great way to help users to solve problems and increase website traffic.

Here is a feature list of Kill-Bug.

-   **Question Module**

    Kill-Bug users can freely post questions with different tags about development and programming. They can also answer questions to help other users. Each question has a corresponding number of likes and answers, which means that users can choose questions or answers based on these evaluation metrics.

-   **Bounty Module**

    Kill-Bug users can post bounties by spending a certain amount of money to attract other programming masters and experts. This means you are more likely to get higher-quality solutions. Users can also earn money by grabbing bounties. After a bounty is grabbed, Kill-Bug platform will create a chat for the publisher and grabber. They can go to their own chat room and negotiate to figure out the bounty. Moreover, Kill-Bug platform also provides a rich text **collaborative editor** for them to share their codes or documents.

-   **Chat Module**

    As mentioned before, the bounty poster and grabber can communicate in a chat room. However, this is not the privilege of such users. All users can chat with each other by just clicking the **Message** button, which is also a common feature of other mainstream social networking applications.

-   **Search Module**

    In order to facilitate users to search more efficiently, Kill-Bug provides a full-text search feature.

-   **User Space Module**

    This is a common module for all kinds of websites. Users can login, register, logout, view personal information, and modify personal information. Besides, combining the main features of Kill-Bug, users can also check their published questions, published bounties, and bounties. There is also an interesting feature: **Achievement**. Users can check the numbers of their own posted questions, posted bounties, likes received, etc.

## Software Architecture

![software architecture](https://user-images.githubusercontent.com/73587471/234025199-3fe287c8-bc8d-4c50-b383-afb211364f37.png)

The software architecture consists of a front-end and back-end, as shown in the diagram. For information on the technology stack and features of these components, please refer to Details part. In this section, we will focus on the system architecture.

When a user interacts with the website, the front-end sends requests to the back-end to obtain or modify data in the database. The back-end processes the request and returns a response, which the front-end then renders into a graphical interface.

Specifically, the front-end uses Axios to send HTTP Get or Post requests to the back-end, which are received by the Gateway module. The Gateway filters, authenticates, and verifies the requests using the security module before forwarding them to the appropriate microservice module. The processing of the request is completed by the microservice module, which relies on middleware such as Nacos, MySQL, and Redis. This is the system architecture of Kill-Bug. 

## Quick Start

In this part, we will tell you how to run this project. More quick start details will be shown in the demo video.

If you have any questions or doubts, please feel free to contact **Li Tianyu** at **e0949086@u.nus.edu**

Firstly, git clone Kill-Bug project into your local repository.

### Front-end Initialization

1.   Enter the `killbug-frontend` folder through the terminal.

     ```
     cd killbug-frontend
     ```

2.   Initialize dependencies through `yarn` or `npm`.

     ```
     yarn
     npm install
     ```

3.   If you want to experience collaborative editing, you need to start the WebSocket server.

     -  notice that you need to make sure the 3000 port is not being used or you can modify `server.js` to change the running port.
     
     ```
     node server/server.js
     ```

4.   Run Front-end through `yarn` or `npm`

     ```
     yarn dev
     npm run dev
     ```

### Back-end Initialization

This part is a little complicated and you need to install some middleware. Please be patient and you will be very pleasantly surprised when you run the whole project!

We will show you two ways to run: Traditional Run and Docker Run.

#### Traditional Run

1.   **Configure the Runtime Environment**

     You need to make sure the following softwares are installed and runned. It is best to install the specified version, otherwise an error may be reported.

     -   JDK1.8: Back-end of Killbug is developed based on JDK1.8 and Nacos also needs a JDK1.8-based operating environment.
     -   Maven 3.6+
     -   Nacos 2.1.2: https://github.com/alibaba/nacos
         -   Running on localhost port 8848
     -   Redis 7.x
         -   Running on localhost port 6379
     -   MySQL 8.x
         -   Running on localhost port 3306
         -   username: root
         -   password: root

     Besides, if you are a Mac user, you can install all of them by Homebrew except nacos.

2.   **Import MySQL Data**

     You can see the `data` folder in the `Kill-Bug` root directory. There are 4 SQL files corresponding to 4 databases in the `data` folder.

     Firstly, you need to create 4 databases in your MySQL: `killbug_bounty`, `killbug_chat`, `killbug_question`, and `killbug_user`. The Character Set and Collation are `utf8mb4` and `utf8mb4_0900_ai_ci` respectively.

     Then, you need to import these 4 sql files into your MySQL.

3.   **Run All Microservice Modules**

     Run 8 modules: `killbug-gateway`, `killbug-auth`, `killbug-bounty`, `killbug-chat`, `killbug-index`, `killbug-user`, `killbug-question`, `killbug-websocket`.

     The back-end of Kill-Bug is developed based on SpringBoot so you need to know how to run SpringBoot Application.

     If you want to modify the running port or configuration of middlewares like Nacos, Redis, and MySQL, you can modify the `application.yml` of each module.

#### Docker Run

Please notice that Kill-Bug runs on `localhost`. If you want to run via a **virtual machine**, please check the end of this part.

1.   **Configure JDK1.8**

     JDK1.8: The back-end of Killbug is developed based on JDK1.8 and Nacos also needs a JDK1.8-based operating environment.

2.   **Run Middlewares through Docker Compose**

     <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230425155147619.png" alt="image-20230425155147619" style="zoom:50%;" />

     As you can see, enter the `docker` folder and execute the following command in the terminal

     ```
     docker-compose up -d mysql redis nacos
     ```

     Please notice that `MySQL`, `Redis`, and `Nacos` run on ports 3306, 6379, and 8848 respectively. You need to make sure that these ports are not in use.

3.   **Make Microservice Docker Image**

     <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230425155923062.png" alt="image-20230425155923062" style="zoom:50%;" />

     As you can see, there is a `Dockerfile` in each microservice module. Enter the directory corresponding to the microservice module, and run the following command to make **Docker Image**.

     ```
     docker build -t [microservice name] .
     ```

4.   **Run All Microservice Modules through Docker Compose**

     Enter `docker` folder and run the following command in the terminal.

     ```
     docker-compose up -d killbug-gateway killbug-auth killbug-bounty killbug-chat killbug-index killbug-user killbug-question killbug-websocket
     ```

-   **Running on a Virtual Machine**

    1.   Firstly, change all the running addresses of this project. This means you need to globally replace (Crtl + Shift + R) `127.0.0.1` with your virtual machine address.

    2.   Secondly, clean all original Jars and generate all new Jars.

    Then, you can proceed to step 3, which is to make microservice images.

    **Don't forget to change the address where the front-end requests the back-end to the address of your virtual machine!**

    1.   Firstly, enter `killbug-frontend/util` and open `request.ts`.

    2.   Secondly, change the `localhost` of  `BASE_URL` to the address of your virtual machine.

         <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230425162444400.png" alt="image-20230425162444400" style="zoom: 33%;" />

Congratulations if you have run the front-end and back-end! Then, if you do not change the running port of the front-end, you can visit `localhost:3000` to enjoy all contents of `Kill-Bug`!

If you have any questions or doubts, please feel free to contact **Li Tianyu** at  **e0949086@u.nus.edu**

## Front-end Details

### Technology Stack and Novel Features

In this part, we will introduce the front-end technology stack and novel features in detail.

In order to build a high-performance front-end, we choose `React` and `Next.js` as major front-end frameworks. Besides, a popular React UI library named `Ant Design` is also used in this project to simplify development and increase aesthetics and user experience.

You can understand front-end features better from the following table.

|  Technology  |                           Feature                            |
| :----------: | :----------------------------------------------------------: |
|    React     |               Basic web development framework                |
|   Next.js    | Server-Side rendering framework, focusing on improving rendering performance and benefiting SEO. |
|  Ant Design  | React UI library, providing out-of-the-box React UI components such as Layout, Button, Tag, and List. |
|     Mobx     | State management library, making global state management simple and scalable. |
|    Axios     | HTTP request library, makes request sending and responding simple and we can define request and response interceptors through it. |
|    Router    | next/link and next/router are used for page jumping and navigation bar routing. |
|     Mock     | HTTP request mock library, helping front-end developers independently develop and test interfaces. |
| Quill Editor | Out-of-the-box rich text editor, making basic usage and secondary expansion more efficient. |
|    Socket    |    Implementing the server side of collaborative editing.    |
|  Js-Cookie   | Cookie management tool, making it easier and more efficient to store and manage user state or token. |

## Back-end Details

### Technology Stack and Novel Features

In this part, we will introduce the back-end technology stack and novel features in detail.

We adopted Spring Boot and Spring Cloud as major back-end development frameworks, which highly improve developing efficiency. The back-end is developed using the **Microservice Model**. According to this, We divide the entire backend into different microservice modules: `killbug-gateway`, `killbug-auth`, `killbug-bounty`, `killbug-chat`, `killbug-index`, `killbug-search`, `killbug-user`, `killbug-question`, `killbug-websocket`. All these modules communicate via RPC. You can get some clues from the Software Architecture diagram.

The back-end File Tree is shown below:

```
├── killbug-common                   -> Common Module
│   ├── killbug-common-alibaba-bom       -> Spring-Cloud-Alibaba Dependency 
│   ├── killbug-common-bom               -> Common Dependency
│   ├── killbug-common-core              -> Core Configuration and Dependency
│   ├── killbug-common-doc               -> Swagger API Doc Configuration and Dependency
│   ├── killbug-common-dubbo             -> Dubbo RPC Configuration and Dependency
│   ├── killbug-common-idempotent        -> Idempotent Configuration
│   ├── killbug-common-elasticsearch     -> Elastic Configuration and Dependency
│   ├── killbug-common-mybatis           -> Mybatis Configuration and Dependency
│   ├── killbug-common-redis             -> Redis Cache Configuration and Dependency
│   ├── killbug-common-satoken           -> Sa-Token Authorization Framework Configuration and Dependency
│   ├── killbug-common-security          -> Security Interceptor Configuration
│   └── killbug-common-sentinel          -> Sentinel Flow Control Configuration and Dependency
├── killbug-api                      -> RPC Interface Module
├── killbug-auth                     -> Authentication and Authorization Service 
├── killbug-gateway                  -> Gateway Service
├── killbug-websocket                    -> Websocket Service
└── killbug-modules                  -> Business Module
    ├── killbug-user                    -> User Service
    ├── killbug-bounty                   -> Bounty Service
    ├── killbug-chat                     -> Chat Service
    ├── killbug-index                    -> Index Service
    ├── killbug-search                   -> Search Service
    └── killbug-question                 -> Question Service
```

You can understand Back-end features better from the following table.

|    Technology     | Feature                                                      |
| :---------------: | :----------------------------------------------------------- |
|    Spring Boot    | Development framework based on the Spring Framework, makes it easy to create stand-alone, production-level Spring applications. |
|   Spring Cloud    | A set of frameworks for building distributed systems, providing functions such as distributed configuration, service discovery, load balancing, and circuit breakers for building microservice architectures. |
|     Sentinel      | A flow control and circuit breaker degradation framework open-sourced by Alibaba, which can help developers solve the problems of flow control and service protection in distributed systems. |
|       Dubbo       | A high-performance, lightweight RPC framework open-sourced by Alibaba for building distributed service applications. |
|       MySQL       | Relational Database                                          |
|       Redis       | Memory-based high-performance key-value Non-Relational Database |
|  Elastic Search   | A full-text search engine based on Lucene                    |
|     Sa-Token      | A lightweight Java authority authentication framework that provides easy-to-use authority control and login authentication functions. |
|      Mybatis      | A Java persistence layer framework that can help developers use simple and flexible SQL statements for database operations in Java applications. |
|     Redisson      | A Redis-based distributed object service framework provides functions such as distributed locks, distributed collections, and distributed objects. |
|      Easy-ES      | A Java full-text search framework based on Elastic Search, which provides an easy-to-use API and query DSL. |
|     Websocket     | Implement real-time communication and push function.         |
|      Lombok       | A Java annotation library that provides a set of easy-to-use annotations that can help developers reduce the amount of boilerplate code written. |
|      Hutool       | A Java tool library that provides a wealth of tool classes and methods to simplify the Java development process. |
|    Spring Doc     | A document generation tool of the Spring framework, which can output API documents in various formats, which is convenient for developers to write and maintain documents. |
| Alibaba Cloud OSS | Object storage service for storing pictures and video resources |

### Design and Implementation

In this part, we will share back-end design and implementation details.

-   **Authentication and Authorization**

    -   The authentication and authentication of enterprise-level projects are generally implemented through the single sign-on mode, and the authentication information after the user logs in is stored in the Token, and the front-end will also retain this Token. Later, when the user requests the backend again, there is no need to log in again, but the Token is carried in the Header of the Request. The backend can realize authentication by verifying the Token.

    -   In Kill-Bug project, we also adopted this idea. We choose to store Token in Redis, that is, the server instead of the client. This is because although **Client-Side Storage** has better performance, its functionality is limited. This means when a user's permissions change, for example, it is banned for doing something illegal, but the client can still access the server through the old Token, which is contrary to our original intention. As a result, we choose **Server-Side Storage**. In this case, we can easily control user authentication and authorization on the server side.

        In addition, we use filters to verify each request that needs to be verified, such as requests to obtain sensitive user information. Of course, we can dynamically configure the request path that needs to be verified. This feature is implemented by **Gateway**.

-   **Request and Interface**

    -   Specification

        In the Kill-Bug project, we only use two request methods: Get and Post. Why don't we adopt the **Restful API** style and introduce Delete, Put, etc. requests? This is because we think Restful API is a bit rigid and we cannot define the interface flexibly but define it according to its requirements. Therefore, we define the request type in the request path, not the request itself, which makes development easier. For example, if we want to create a question, we can define a request path like `/question/createQuestion`. In the Kill-Bug project, the request path starts with the microservice name.

    -   Redirection

        For a microservice project, each module is an application with its own running address and port. How does the front end determine the address and port of the back end? No need to know. The front end only needs to send the request to the specified address and port. The roles of processing the request are **Gateway** and **Nacos**.

        When the microservice is running, inform Nacos of its address and port information. When the request arrives at Gateway, Gateway obtains the corresponding microservice name through the request path name. Then, Gateway requests Nacos and gets the microservice address. This is the whole process of sending the request in Kill-Bug project.

-   **RPC between Microservices**

    In Kill-Bug project, we use Dubbo as the RPC framework. We also need the help of Nacos as a service discovery and registration center. It is similar to the process of sending a request from the front end to the back end, but the source and destination are different. Moreover, Dubbo uses TCP instead of HTTP protocol for communication.

-   **Global Exception Handler**

    A project may be forced to terminate due to errors in the code itself or exceptions thrown by developers in specific situations. How to figure out such a situation? We need to implement a global exception handler, catch the corresponding exception, and return an error message to the front end to prevent no response.

    In Kill-Bug project, We use the **RestControllerAdvice** annotation provided by **Spring MVC** to implement this feature.

-   **Flow Control and Service Downgrade**

    In an enterprise-level project, it is necessary to prevent traffic peaks in high-concurrency scenarios. So, we need to protect our services and prevent them from crashing through mechanisms such as Traffic Restrictions, **Service Downgrade**, and **Service Fusing**. In Kill-Bug project, we choose Alibaba's open source Sentinel framework to implement this function.

-   **Network Security Attack Protection**

    Common network attacks include SQL injection, XSS attack, DDoS attack, etc.

    We prevent such attacks by filtering suspicious strings in the request path and request body. But for DDoS attack, this method cannot take effect. We can only purchase advanced firewalls to prevent when deploying to cloud servers.

-   **CRUD Implementation**

    In Kill-Bug project, we use the MVC three-tier architecture. At the same time, we adopted Mybatis as an ORM framework to simplify the writing of SQL statements, which highly improves developing efficiency.

## Final Summary

Kill-Bug is a project that simulates a real enterprise development scenario, with the frontend based on React and the backend based on microservices. Even so, we still have a lot of details to work out such as mobile device adaptation, more social features, video streaming services, etc.

Thank you for your patience!
