/*
 Navicat Premium Data Transfer

 Source Server         : sqlTest
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : killbug_user

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 25/04/2023 03:07:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `username` varchar(30) NOT NULL COMMENT '用户账号',
  `nickname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户昵称',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像地址',
  `password` varchar(100) DEFAULT NULL COMMENT '账号密码',
  `balance` int DEFAULT '0' COMMENT '账户余额',
  `position` varchar(30) DEFAULT NULL COMMENT '职位',
  `company` varchar(30) DEFAULT NULL COMMENT '公司',
  `website` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '网站',
  `introduction` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '自我介绍',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (1, 'ltyzzz', 'ltyzzz', 'ltyzzz@bug.com', '17712345678', '0', 'http://kill-bug.oss-ap-southeast-1.aliyuncs.com/IMG_7494.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 97500, 'Java后端', '字节', 'www.ltyzzz.com', '6666666', '0', '2023-04-20 00:21:13', '2023-04-25 01:22:20');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (2, 'tycho', 'Tycho', 'tycho@bug.com', '61233450', '0', 'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/test-avatar1.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 49980, 'Backend Engineer', 'Apple', NULL, NULL, '0', '2023-04-18 23:43:11', '2023-04-22 21:52:41');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (3, 'zzm', 'zzm', 'test1@bug.com', '52421324', '0', 'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/test-avatar2.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 50000, 'Backend Engineer', 'Google', NULL, NULL, '0', '2023-04-18 23:43:22', '2023-04-24 22:59:30');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (4, 'cyx', 'cyx', 'test2@bug.com', '67891234', '0', 'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/test-avatar3.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 50000, 'BigData Engineer', 'Alibaba', NULL, NULL, '0', '2023-04-18 23:43:50', '2023-04-24 22:59:37');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (5, 'Nakano Hikari', 'Nakano Hikari', 'hikarinakan@gmail.com', '49264519', '0', 'http://kill-bug.oss-ap-southeast-1.aliyuncs.com/bc9b46fd-9324-4753-88d8-e512c9db345b.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 4678, 'BigData Engineer', 'Valerie Consultants Inc.', 'DQMOqmn8Yy', '6861eFQhjK', '0', '2023-04-23 20:53:57', '2023-04-25 00:13:08');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (6, 'Mui Wai Man', 'Mui Wai Man', 'waiman1@yahoo.com', '30822740', '2', 'http://kill-bug.oss-ap-southeast-1.aliyuncs.com/WechatIMG4230.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 27641, 'BigData Engineer', 'Harris Brothers Inc.', 'rcByqkamiI', 'lazzibxRWN', '0', '2023-04-23 22:48:59', '2023-04-25 01:35:18');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (7, 'Ray Bailey', 'Ray Bailey', 'bray@icloud.com', '81269111', '1', 'http://kill-bug.oss-ap-southeast-1.aliyuncs.com/WechatIMG4233.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 14271, 'BigData Engineer', 'Theodore LLC', 'osAODkv5K8', 'bYIk4OspPm', '0', '2023-04-23 00:21:30', '2023-04-25 01:44:12');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (8, 'Otsuka Ayato', 'Otsuka Ayato', 'otsuka5@icloud.com', '48394825', '0', 'http://kill-bug.oss-ap-southeast-1.aliyuncs.com/WechatIMG4234.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 49646, 'BigData Engineer', 'Rose Software LLC', 'bXMXLQh7Nf', '4ISSzW0l2x', '0', '2023-04-23 09:29:58', '2023-04-25 02:05:25');
INSERT INTO `user` (`user_id`, `username`, `nickname`, `email`, `phone`, `sex`, `avatar`, `password`, `balance`, `position`, `company`, `website`, `introduction`, `status`, `create_time`, `update_time`) VALUES (9, 'Arimura Aoshi', 'Arimura Aoshi', 'aoshi1002@gmail.com', '05939951', '0', 'http://kill-bug.oss-ap-southeast-1.aliyuncs.com/WechatIMG4244.jpeg', '$2a$10$PdYandqgc0UK0u7PwWSwRe5tduRsP0T63Ao7jRYvQ6d4nF.Nbqqo6', 27789, 'BigData Engineer', 'Kelley Trading LLC', '5t6c8BcFNA', '6JsaLFW5oj', '0', '2023-04-23 04:32:21', '2023-04-25 02:29:59');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
