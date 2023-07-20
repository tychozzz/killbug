<p align="center">
  <img src="https://github.com/ltyzzzxxx/killbug/assets/73587471/664b3a54-013b-4212-a04c-e862dc76aa2e" width='200'>
</p>

<div align="center">
    
# Kill Bug

<!-- prettier-ignore-start -->
<!-- markdownlint-disable-next-line MD036 -->
_✨ 你最值得信赖的编程助手！ ✨_
<!-- prettier-ignore-end -->
<p align="center">
  <img src="https://img.shields.io/github/v/release/ltyzzzxxx/killbug?display_name=tag" />
  <img src="https://img.shields.io/github/stars/ltyzzzxxx/killbug" />
  <img src="https://img.shields.io/github/forks/ltyzzzxxx/killbug" />
  <img src="https://img.shields.io/github/issues/ltyzzzxxx/killbug" />
  <img src="https://img.shields.io/badge/license-Apache%20-yellow.svg" />
</p>
</div>

> 如果 README 文档有翻译腔，请见谅。因为原项目为课程作业，原 README 文档也是英文版本。
> 
> 项目后续会持续完善。有问题请提出 Issue，谢谢！

项目代码量：

<img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230424203013147.png" alt="image-20230424203013147" style="zoom:50%;" />

## 项目展示

Youtube Demo 视频: https://www.youtube.com/watch?v=5ZAwlpqSbPQ

<img width="750" alt="image-20230425223113959" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/c26db2f6-27de-4db5-ab53-53808f165922">

<img width="750" alt="image-20230425225042834" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/2e8c7e43-25e5-4c75-8dfc-d1825f3d2bb1">

<img width="750" alt="image-20230425225150480" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/f7b94173-744f-4a9d-89af-314441a1cf1f">

<img width="750" alt="image-20230425225131549" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/2cafc09b-afc2-4fba-9057-e476a57da96d">

<img width="750" alt="image-20230425225214302" src="https://github.com/ltyzzzxxx/killbug/assets/73587471/9422a3e2-9be3-4cec-b2c2-fe79f3172c67">


## 项目简介

Kill-Bug是一个易于使用的平台，专为程序员解决日常开发中遇到的问题而设计。它提供搜索问题、发布问题、回答问题、发布悬赏任务、即时通信、协同编辑等功能。

-   **问题模块**

    Kill Bug 用户可以自由发布与开发和编程相关的带有不同标签的问题。他们还可以回答问题以帮助其他用户。每个问题都有相应的点赞和回答数量，这意味着用户可以根据这些评估指标选择问题或答案。

-   **悬赏模块**

    Kill Bug 用户可以通过花费一定的金额来发布悬赏，以吸引其他编程高手。这意味着您更有可能获得更高质量的解决方案。用户也可以通过抢单来赚钱。在被抢单后，Kill-Bug平台会为发布者和抢单者创建一个聊天室。他们可以进入自己的聊天室进行协商，解决悬赏任务。此外，Kill Bug 平台还为他们提供了丰富的文本协同编辑器，方便分享代码或文档。

-   **聊天模块**

    如前所述，发布赏金和抢单者可以在聊天室中进行交流。然而，这并不仅限于这些用户。所有用户只需点击“消息”按钮就可以相互聊天，这也是其他主流社交网络应用的常见功能。

-   **用户模块**

    这是各类网站的常见模块。用户可以登录、注册、退出、查看个人信息和修改个人信息。此外，结合 Kill Bug 的主要功能，用户还可以查看他们发布的问题、发布的赏金以及领取的赏金。还有一个有趣的功能：成就。用户可以查看自己发布的问题数量、发布的赏金数量、获得的点赞数等等。

## 技术选型

### 前端技术栈

|  Technology  |                           Feature                            |
| :----------: | :----------------------------------------------------------: |
|    React     |              基本 Web 框架                |
|   Next.js    | SSR 框架 |
|  Ant Design  | UI 组件库 |
|     Mobx     | 全局状态管理库 |
|    Axios     | HTTP 请求库 |
|    Router    | 路由组件 |
|     Mock     | HTTP 请求 mock |
| Quill Editor | 富文本编辑器 |
|    Socket    | 即时通信 / 协同编辑    |
|  Js-Cookie   | Cookie 管理工具 |

### 后端技术栈

|    Technology     | Feature                                                      |
| :---------------: | :----------------------------------------------------------- |
|    Spring Boot    | 后端主体框架 |
|   Spring Cloud    | 微服务框架 |
|     Sentinel      | 流量控制组件 |
|       Dubbo       | 分布式 RPC 框架 |
|       MySQL       | 表数据存储                                         |
|       Redis       | 缓存数据库 |
|     Sa-Token      | 轻量级登录鉴权框架 |
|      Mybatis      | ORM 框架 |
|     Redisson      | 封装 Redis 操作 |
|     Websocket     | 通信技术        |
|      Hutool       | Java 工具库 |
| Alibaba Cloud OSS | 对象存储 |
    
## 软件架构

![software architecture](https://user-images.githubusercontent.com/73587471/234025199-3fe287c8-bc8d-4c50-b383-afb211364f37.png)

软件架构由前端和后端组成，如图所示。有关这些组件的技术栈和功能的详细信息，请参阅详细部分。在本节中，我们将重点关注系统架构。

当用户与网站进行交互时，前端会向后端发送请求，以获取或修改数据库中的数据。后端处理请求并返回响应，然后前端将其呈现为图形界面。

具体而言，前端使用 Axios 向后端发送 HTTP 的 Get 或 Post 请求，这些请求被网关模块接收。网关使用安全模块过滤、验证和验证请求，然后将其转发到相应的微服务模块。请求的处理由微服务模块完成，该模块依赖于 Nacos、MySQL 和 Redis 等中间件。这就是 Kill Bug 的系统架构。

## 模块树

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

## 快速开始

### 前端初始化

1.   进入 `killbug-frontend` 目录

     ```
     cd killbug-frontend
     ```

2.   安装前端依赖

     ```
     yarn
     npm install
     ```

3.   如果你想要体验协同编程功能，你需要启动 Websocket 服务

     ```
     node server/server.js
     ```

4.   启动前端

     ```
     yarn dev
     npm run dev
     ```

### 后端初始化

两种方式：传统方式运行 & Docker 容器运行

#### 传统方式运行

1.   **配置基础运行环境**

     你需要确保如下环境已配置正确

     -   JDK1.8
     -   Maven 3.6+
     -   Nacos 2.1.2: https://github.com/alibaba/nacos
         -   8848 端口
     -   Redis 7.x
         -   6379 端口
     -   MySQL 8.x
         -   3306 端口
         -   username: root
         -   password: root

2.   **导入数据库数据**

     在Kill-Bug根目录中，您可以看到data文件夹。该文件夹中有4个SQL文件，分别对应着4个数据库。

     首先，您需要在您的MySQL中创建4个数据库：killbug_bounty，killbug_chat，killbug_question 和 killbug_user。字符集和校对规则分别为 utf8mb4 和 utf8mb4_0900_ai_ci。
    
     然后，您需要将这 4 个 SQL 文件导入到您的 MySQL 中。

3.   **运行各个微服务模块**

     运行8个模块：killbug-gateway，killbug-auth，killbug-bounty，killbug-chat，killbug-index，killbug-user，killbug-question，killbug-websocket。

#### Docker 容器运行

Please notice that Kill-Bug runs on `localhost`. If you want to run via a **virtual machine**, please check the end of this part.

注意当前项目运行在 localhost。如果你想要基于虚拟机运行，请自行更改 IP address 与 Port。

1.   **通过 Docker Compose 运行各个中间件**

     <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230425155147619.png" alt="image-20230425155147619" style="zoom:50%;" />

     ```
     docker-compose up -d mysql redis nacos
     ```

2.   **打包微服务镜像**

     <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230425155923062.png" alt="image-20230425155923062" style="zoom:50%;" />

     ```
     docker build -t [microservice name] .
     ```

3.   **通过 Docker Compose 运行各个微服务模块**

     ```
     docker-compose up -d killbug-gateway killbug-auth killbug-bounty killbug-chat killbug-index killbug-user killbug-question killbug-websocket
     ```

不要忘记将前端请求后端的地址更改为您的虚拟机地址！

1.   进入 killbug-frontend/util 目录，并打开 request.ts 文件。

2.   将 BASE_URL 中的 localhost 更改为您的虚拟机的地址。

     <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/image-20230425162444400.png" alt="image-20230425162444400" style="zoom: 33%;" />


## 后端设计与实现方案

- **身份验证和授权**

     - 企业级项目的鉴权认证一般都是通过单点登录的方式来实现，用户登录后的认证信息都保存在Token中，前端也会保留这个Token。 以后用户再次请求后端时，不需要再次登录，而是在Request的Header中携带Token。 后端可以通过验证Token来实现认证。

     - 在Kill-Bug项目中，我们也采用了这个想法。 我们选择将Token存储在Redis中，即服务器而不是客户端。 这是因为虽然**客户端存储**具有更好的性能，但其功能有限。 这意味着当用户的权限发生变化时，比如因为做了非法的事情而被禁止，但是客户端仍然可以通过旧的Token访问服务器，这与我们的初衷相悖。 因此，我们选择**服务器端存储**。 这样的话，我们就可以轻松地在服务器端控制用户的认证和授权。

         此外，我们使用过滤器来验证每个需要验证的请求，例如获取敏感用户信息的请求。 当然，我们可以动态配置需要验证的请求路径。 该功能由**网关**实现。

- **请求和接口**

     -   规格

         在Kill-Bug项目中，我们只使用了两种请求方法：Get和Post。 为什么我们不采用**Restful API**风格，引入Delete、Put等请求呢？ 这是因为我们认为Restful API有点死板，不能灵活定义接口，而是根据其需求来定义。 因此，我们在请求路径中定义请求类型，而不是请求本身，这使得开发更加容易。 例如，如果我们想创建一个问题，我们可以定义一个请求路径，如“/question/createQuestion”。 在 Kill-Bug 项目中，请求路径以微服务名称开头。

     - 重定向

         对于微服务项目来说，每个模块都是一个应用程序，有自己的运行地址和端口。 前端如何确定后端的地址和端口呢？ 无需知道。 前端只需要将请求发送到指定的地址和端口即可。 处理请求的角色是**Gateway**和**Nacos**。

         微服务运行时，告知Nacos其地址和端口信息。 当请求到达Gateway时，Gateway通过请求路径名称获取对应的微服务名称。 然后，Gateway请求Nacos并获取微服务地址。 这就是Kill-Bug项目中发送请求的整个过程。

- **微服务之间的 RPC**

     在Kill-Bug项目中，我们使用Dubbo作为RPC框架。 我们还需要Nacos作为服务发现和注册中心的帮助。 与前端向后端发送请求的过程类似，但源和目的地不同。 而且，Dubbo使用TCP而不是HTTP协议进行通信。

- **全局异常处理程序**

     项目可能会由于代码本身的错误或开发人员在特定情况下抛出的异常而被迫终止。 遇到这样的情况该如何判断呢？ 我们需要实现一个全局的异常处理程序，捕获相应的异常，并向前端返回错误信息，防止没有响应。

     在 Kill-Bug 项目中，我们使用 **Spring MVC** 提供的 **RestControllerAdvice** 注解来实现此功能。

- **流量控制和服务降级**

     在企业级项目中，需要防止高并发场景下的流量高峰。 所以，我们需要通过限流、**服务降级**、**服务熔断**等机制来保护我们的服务，防止服务崩溃。 在Kill-Bug项目中，我们选择阿里巴巴开源的Sentinel框架来实现该功能。

- **网络安全攻击防护**

     常见的网络攻击包括SQL注入、XSS攻击、DDoS攻击等。

     我们通过过滤请求路径和请求正文中的可疑字符串来防止此类攻击。 但对于DDoS攻击，此方法无法生效。 我们只能购买高级防火墙来预防部署到云服务器时的情况。

- **CRUD 实施**

     在Kill-Bug项目中，我们使用MVC三层架构。 同时，我们采用了Mybatis作为ORM框架，简化了SQL语句的编写，极大地提高了开发效率。
