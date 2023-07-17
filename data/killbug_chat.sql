/*
 Navicat Premium Data Transfer

 Source Server         : sqlTest
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : killbug_chat

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 25/04/2023 03:07:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `id` bigint NOT NULL COMMENT '主键ID',
  `receiver_id` bigint NOT NULL COMMENT '接收者ID',
  `sender_id` bigint NOT NULL COMMENT '发送者ID',
  `type` tinyint(1) NOT NULL COMMENT '类型',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of chat
-- ----------------------------
BEGIN;
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650506223149998081, 1, 3, 0, '2023-04-24 22:25:23', '2023-04-24 22:29:28');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650510660006404097, 1, 3, 1, '2023-04-24 22:43:01', '2023-04-24 22:53:06');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650541177766502401, 4, 5, 0, '2023-04-25 00:44:17', '2023-04-25 00:44:17');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650561824269885441, 7, 8, 0, '2023-04-25 02:06:20', '2023-04-25 02:59:51');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650563534488952833, 8, 9, 0, '2023-04-25 02:13:07', '2023-04-25 02:13:07');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650563688394743809, 8, 9, 1, '2023-04-25 02:13:44', '2023-04-25 02:43:46');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650568435034054657, 1, 8, 0, '2023-04-25 02:32:36', '2023-04-25 02:32:36');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650568496296058881, 1, 8, 1, '2023-04-25 02:32:50', '2023-04-25 02:38:03');
INSERT INTO `chat` (`id`, `receiver_id`, `sender_id`, `type`, `create_time`, `update_time`) VALUES (1650571817887031297, 5, 8, 0, '2023-04-25 02:46:02', '2023-04-25 03:02:53');
COMMIT;

-- ----------------------------
-- Table structure for private_message
-- ----------------------------
DROP TABLE IF EXISTS `private_message`;
CREATE TABLE `private_message` (
  `id` bigint NOT NULL COMMENT '主键ID',
  `sender_id` bigint NOT NULL COMMENT '发送者ID',
  `receiver_id` bigint NOT NULL COMMENT '接收者ID',
  `content` longtext NOT NULL COMMENT '内容',
  `type` tinyint(1) NOT NULL COMMENT '0:普通私信 1:订单私信',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of private_message
-- ----------------------------
BEGIN;
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506312924880897, 3, 1, 'Hey, have you checked out this new website?', 0, '2023-04-24 22:25:45', '2023-04-24 22:25:45');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506445854957570, 1, 3, 'No, what is it?', 0, '2023-04-24 22:26:16', '2023-04-24 22:26:16');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506472425873410, 3, 1, 'It\'s a new shopping website. I heard they have some really cool stuff.', 0, '2023-04-24 22:26:23', '2023-04-24 22:26:23');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506491749031937, 1, 3, 'Sounds interesting. What\'s the URL?', 0, '2023-04-24 22:26:27', '2023-04-24 22:26:27');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506516487036929, 3, 1, 'It\'s www.example.com. Let\'s check it out together.', 0, '2023-04-24 22:26:33', '2023-04-24 22:26:33');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506542114234370, 1, 3, 'Okay, let\'s take a look. Hmm, the layout looks nice.', 0, '2023-04-24 22:26:39', '2023-04-24 22:26:39');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506557817708546, 3, 1, 'Yeah, and it\'s really easy to navigate. I\'m looking for a new pair of shoes. Let\'s see if they have anything good.', 0, '2023-04-24 22:26:43', '2023-04-24 22:26:43');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506573600874497, 1, 3, 'Oh, I see they have a section for shoes. Wow, they have a lot of options.', 0, '2023-04-24 22:26:47', '2023-04-24 22:26:47');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506591284060162, 3, 1, 'These look good. I\'m going to add them to my cart.', 0, '2023-04-24 22:26:51', '2023-04-24 22:26:51');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650506613392236546, 1, 3, 'Wait, let me check the reviews first. Hmm, they have good ratings. Okay, I\'m going to add a pair too.', 0, '2023-04-24 22:26:56', '2023-04-24 22:26:56');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650507171024953346, 3, 1, 'Great, let\'s check out together. Do you have a promo code?', 0, '2023-04-24 22:29:09', '2023-04-24 22:29:09');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650507195150589953, 1, 3, 'No, do you?', 0, '2023-04-24 22:29:15', '2023-04-24 22:29:15');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650507214847041538, 3, 1, 'No, but let\'s see if there are any current promotions. Ah, here\'s one for free shipping. Let\'s use that.', 0, '2023-04-24 22:29:20', '2023-04-24 22:29:20');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650507233008377858, 1, 3, 'Perfect, let\'s complete the purchase. Done! That was really easy.', 0, '2023-04-24 22:29:24', '2023-04-24 22:29:24');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650507251060662274, 3, 1, 'Yeah, and the checkout process was really smooth. I\'m definitely going to use this website again.', 0, '2023-04-24 22:29:28', '2023-04-24 22:29:28');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650513129998475266, 3, 1, 'Hi can you help me?', 1, '2023-04-24 22:52:50', '2023-04-24 22:52:50');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650513198046863362, 1, 3, 'Yes', 1, '2023-04-24 22:53:06', '2023-04-24 22:53:06');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650563885250207745, 9, 8, 'Hi man I will be working on your order. If you have any question with the solution I am giving , just ask!', 1, '2023-04-25 02:14:31', '2023-04-25 02:14:31');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650568160307142657, 8, 9, 'Thank you!', 1, '2023-04-25 02:31:30', '2023-04-25 02:31:30');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650568679750721537, 8, 1, 'Hi man, regarding your problem, I think i have a solution. Are you free to chat now?', 1, '2023-04-25 02:33:34', '2023-04-25 02:33:34');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650568868599259137, 1, 8, 'Yes! Thank you man!', 1, '2023-04-25 02:34:19', '2023-04-25 02:34:19');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569270342279170, 8, 1, 'it looks like the error is being caused by the line where you are dividing x by y. Since y is zero, you cannot perform this operation and the program crashes. To fix this, you can change the value of y to a non-zero number.', 1, '2023-04-25 02:35:55', '2023-04-25 02:35:55');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569346032689154, 1, 8, 'Oh, I see. Thank you for explaining that. Can you give me detailed instructions on how to fix this in my code?', 1, '2023-04-25 02:36:13', '2023-04-25 02:36:13');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569375581560833, 8, 1, 'Sure. You can change the line where y is declared to a non-zero value, like this:', 1, '2023-04-25 02:36:20', '2023-04-25 02:36:20');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569406967537665, 8, 1, 'int y = 2;', 1, '2023-04-25 02:36:27', '2023-04-25 02:36:27');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569447308353537, 8, 1, 'This will allow you to perform the division operation without causing a divide-by-zero error. Does that make sense?', 1, '2023-04-25 02:36:37', '2023-04-25 02:36:37');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569510055141378, 1, 8, 'Yes, that makes sense. Thank you for your help. Are there any general tips you can give me for avoiding similar errors in the future?', 1, '2023-04-25 02:36:52', '2023-04-25 02:36:52');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569536248569858, 8, 1, 'Yes, definitely. One thing you can do is to always check your code for potential errors and edge cases before running it. In this case, you could have added an if statement to check if y is zero before performing the division operation. Additionally, it\'s always a good idea to test your code with different inputs and values to make sure it works as intended.', 1, '2023-04-25 02:36:58', '2023-04-25 02:36:58');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650569807045419009, 8, 1, 'Glad I can help! If you like my answer, please consider mark it as finished:) ', 1, '2023-04-25 02:38:03', '2023-04-25 02:38:03');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650570111929376770, 8, 7, 'Hi man. I see you are very active in the Java topic. I\'m a Java developer myself. Do you mind add me on LinkedIn?', 0, '2023-04-25 02:39:15', '2023-04-25 02:39:15');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650571180675784705, 9, 8, 'have you tried debugging the code to see where it\'s failing?', 1, '2023-04-25 02:43:30', '2023-04-25 02:43:30');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650571244890578946, 8, 9, 'No, I\'m not really sure how to do that. Can you walk me through it?', 1, '2023-04-25 02:43:46', '2023-04-25 02:43:46');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650572147420913666, 8, 5, 'Hi Nakano. I am very impressed by your coding and algorithm skill. I\'m currently struggling on leetcode. Can you give me some advice? Thanks!', 0, '2023-04-25 02:47:21', '2023-04-25 02:47:21');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650575236253179905, 7, 8, 'Hi Otsuka, thanks for reaching out. I\'m glad to hear that you\'re a Java developer as well. I\'d be happy to connect with you on LinkedIn. What\'s your name on there so I can find you?', 0, '2023-04-25 02:59:37', '2023-04-25 02:59:37');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650575295971680257, 8, 7, 'Great! My name is Otsuka Ayato. I\'ll send you a connection request now. Thanks for accepting.', 0, '2023-04-25 02:59:51', '2023-04-25 02:59:51');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650575809811668993, 5, 8, 'Hi Otsuka, thank you for the kind words! I\'m happy to offer some advice. What specific problem are you having trouble with on LeetCode?', 0, '2023-04-25 03:01:54', '2023-04-25 03:01:54');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650575930049781761, 8, 5, 'thanks for your quick reply! I\'m currently struggling with the \"Two Sum\" problem. I can\'t seem to figure out how to get the right output. Do you have any tips?\n', 0, '2023-04-25 03:02:23', '2023-04-25 03:02:23');
INSERT INTO `private_message` (`id`, `sender_id`, `receiver_id`, `content`, `type`, `create_time`, `update_time`) VALUES (1650576058668113922, 5, 8, 'Sure thing, Otsuka. For the \"Two Sum\" problem, one approach is to use a hash map to store the elements of the array as keys and their indices as values. Then, for each element, you can check if its complement (the target value minus the element) exists in the hash map. If it does, you\'ve found your solution. Here\'s some example code:\n\nvector twoSum(vector& nums, int target) {\n    unordered_map hash;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (hash.count(complement)) {\n            return {hash[complement], i};\n        }\n        hash[nums[i]] = i;\n    }\n    return {};\n}\nLet me know if you have any questions or if this helps!', 0, '2023-04-25 03:02:53', '2023-04-25 03:02:53');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
