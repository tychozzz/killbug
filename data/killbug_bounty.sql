/*
 Navicat Premium Data Transfer

 Source Server         : sqlTest
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : killbug_bounty

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 25/04/2023 03:06:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bounty
-- ----------------------------
DROP TABLE IF EXISTS `bounty`;
CREATE TABLE `bounty` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary key, uniquely identifies a question.',
  `title` varchar(255) NOT NULL COMMENT 'The title of the question.\n',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'The description of the question.',
  `publisher_id` bigint DEFAULT NULL COMMENT 'Foreign key, references the user_id in the user table (user A).',
  `solver_id` bigint DEFAULT NULL COMMENT '解决问题者id',
  `reward` int DEFAULT NULL COMMENT 'The reward price set by user A * 100. ',
  `status` tinyint(1) DEFAULT '1' COMMENT '1: open 建立需求, 无人接单\n2: in_progress 有人接单\n3 : finished 提问者满意, 已付款\n4 : closed 提问者手动关闭问题',
  `create_time` datetime DEFAULT NULL COMMENT 'The timestamp when the question was posted.',
  `update_time` datetime DEFAULT NULL COMMENT 'The timestamp when the question was updated.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1650567780651319298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores information about posted questions.';

-- ----------------------------
-- Records of bounty
-- ----------------------------
BEGIN;
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650509557625864193, 'Login page not working', '\n# Details of Problem\nWhen I try to log in to my account on the website, I am unable to do so. I have entered my username and password correctly, but the page just refreshes and I am still not logged in. I have tried this on multiple browsers and devices, and the issue persists.\n# My Specific Demands\nI would like the website team to investigate and fix the login issue as soon as possible, as I need to access my account urgently. It would also be helpful to receive a notification or update once the issue has been resolved.', 1, 3, 100, 2, '2023-04-24 22:38:38', '2023-04-24 22:38:54');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650547546607403009, 'Error in C# program', '\n# Details of Problem\nI am trying to run a C# program on my computer, but I keep getting an error message. Here is the code that I am using:\n```csharp\nclass Program\n{\n    static void Main(string[] args)\n    {\n        int x = 10;\n        int y = 0;\n        int result = x / y;\n        Console.WriteLine(result);\n    }\n}\n```\nWhen I try to run this program, I get the following error message:\n```\nSystem.DivideByZeroException: \'Attempted to divide by zero.\'\n```\nI am not sure why this is happening or how to fix it. Can someone please help?\n\n- \n# My Specific Demands\nI would like someone to explain what is causing this error and how I can fix it. Please provide clear and detailed instructions, as I am new to C# programming. Additionally, it would be helpful if you could provide some general tips for avoiding errors like this in the future. Thank you!\n\n- List item 1: Explanation of the error\n- List item 2: Detailed instructions on how to fix it\n- List item 3: General tips for avoiding similar errors in the future', 1, 8, 500, 2, '2023-04-25 01:09:35', '2023-04-25 02:32:33');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650548059969241089, 'Segmentation fault when accessing dynamic array', '\n# Details of Problem\nI am working on a C++ program that involves creating a dynamic array of integers. However, when I try to access the elements of the array using the subscript operator, I get a segmentation fault error. Here is my code:\n\n```c++\nint *arr = new int[10];\nfor (int i = 0; i < 10; i++) {\n    arr[i] = i;\n}\nfor (int i = 0; i < 10; i++) {\n    std::cout << arr[i] << std::endl;\n}\ndelete[] arr;\n```\nWhen I run this code, I get a segmentation fault error on the line where I access arr[i]. I have tried debugging the code, but I can\'t seem to figure out what\'s causing the error.\n# My Specific Demands\n- Can someone help me understand why I\'m getting a segmentation fault error?\n- How can I fix this error so that I can access the elements of the dynamic array without any issues?\n- Is there a better way to create and access dynamic arrays in C++ that I should be using instead? If so, can someone please explain how it works?\n\nThank you for your help!', 1, NULL, 1000, 1, '2023-04-25 01:11:38', '2023-04-25 01:11:38');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650549403585167362, 'Issue with string concatenation in C++', '\n# Details of Problem\nI am trying to concatenate two strings in C++, but the resulting string is not what I expect. Here is my code:\n\n```c++\n#include \n#include \n\nusing namespace std;\n\nint main() {\n   string str1 = \"Hello\";\n   string str2 = \"world\";\n   string result = str1 + str2;\n   cout << \"Result: \" << result << endl;\n   return 0;\n}\n```\nI expect the output to be \"Hello world\", but instead it is \"Helloworld\". What am I doing wrong?\n\n# My Specific Demands\n- Please help me identify the issue in my code.\n- Provide a solution to properly concatenate the two strings to produce the desired output.\n- Provide an explanation of why the original code did not work.', 1, NULL, 800, 1, '2023-04-25 01:16:58', '2023-04-25 01:16:58');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650549719332372482, 'Issue with Segmentation Fault when using pointers', '\n# Details of Problem\nI am trying to write a program in C++ that uses pointers, but I keep getting a segmentation fault error when I run it. Here is my code:\n\n```c++\n#include \n\nint main() {\n  int* ptr;\n  *ptr = 5;\n  std::cout << *ptr << std::endl;\n  return 0;\n}\n```\nWhenever I run this program, I get a segmentation fault error. What am I doing wrong?\n# My Specific Demands\nI would like some guidance on how to fix this issue with pointers and prevent the segmentation fault error. Please provide a clear explanation of what went wrong in my code and how to correct it. Thank you!', 1, NULL, 1000, 4, '2023-04-25 01:18:13', '2023-04-25 01:22:21');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650551827209207809, 'Issue with pattern matching', '\n# Details of Problem\nI am trying to use pattern matching in my Scala code, but I am running into an issue. Here is the code snippet that is causing the problem:\n\n```scala\nval myList = List(1, 2, 3, 4)\n\nmyList match {\n  case head :: tail => println(head)\n  case Nil => println(\"List is empty\")\n}\n```\nWhen I run this code, I get an error message saying \"scala.MatchError: List(1, 2, 3, 4) (of class scala.collection.immutable.$colon$colon)\". I\'m not sure what is causing this error, as I thought my pattern matching syntax was correct. Can someone please help me figure out what I\'m doing wrong?\n# My Specific Demands\n- Can someone please explain what is causing the error in my code?\n- How can I modify my code to fix this error and achieve the desired pattern matching behavior?', 6, NULL, 20, 1, '2023-04-25 01:26:36', '2023-04-25 01:26:36');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650552681295331330, 'Issue with using Akka HTTP', '\n# Details of Problem\nI\'m trying to use Akka HTTP to build a REST API in my Scala project, but I\'m running into some issues. Specifically, when I try to run my code, I\'m getting the following error:\n```\nException in thread \"main\" java.lang.NoSuchMethodError: akka.http.scaladsl.server.Directives$.compressor$extension(Lakka/http/scaladsl/server/RouteResult;)Lakka/http/scaladsl/server/Compression$Support;\n```\n\nI\'m not sure what\'s causing this error, and I\'m not sure how to fix it. Here\'s the relevant code:\n```\nimport akka.actor.ActorSystem\nimport akka.http.scaladsl.Http\nimport akka.http.scaladsl.server.Directives._\nimport akka.stream.ActorMaterializer\n\nobject MyServer extends App {\nimplicit val system = ActorSystem(\"my-system\")\nimplicit val materializer = ActorMaterializer()\n\nval route =\npath(\"hello\") {\nget {\ncomplete(\"Hello, world!\")\n}\n}\n\nval bindingFuture = Http().bindAndHandle(route, \"localhost\", 8080)\n\nprintln(s\"Server online at http://localhost:8080/\")\n}\n\n```\n# My Specific Demands\n- Can someone help me understand what\'s causing this error?\n- How can I fix this error so that I can run my code without any issues? \n- Are there any best practices for using Akka HTTP in Scala that I should be aware of to prevent similar issues in the future? \n- If possible, could someone provide me with some sample code that demonstrates the proper use of Akka HTTP?', 6, 7, 20, 2, '2023-04-25 01:30:00', '2023-04-25 01:36:23');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650553029858770946, 'Issue with using Akka Streams', '\n# Details of Problem\nI\'ve tried searching for a solution, but I haven\'t been able to find anything that works. Here\'s the code that\'s causing the error:\n\n```scala\nimport akka.actor.ActorSystem\nimport akka.stream.ActorMaterializer\nimport akka.stream.scaladsl._\n\nobject MyPipeline {\n  implicit val system = ActorSystem()\n  implicit val materializer = ActorMaterializer()\n\n  def runPipeline(): Unit = {\n    val source = Source(List(\"foo\", \"bar\", \"baz\"))\n    val sink = Sink.foreach[String](println)\n\n    val pipeline = source.via(Flow[String].map(_.toUpperCase)).to(sink)\n\n    pipeline.run()\n  }\n}\n\nMyPipeline.runPipeline()\n```\n# My Specific Demands\n- Can someone help me understand what\'s causing this error?\n- How can I fix this issue and get my data processing pipeline to work properly?\n- If possible, can you provide an explanation for why this error is occurring and how to avoid it in the future?', 6, 7, 432, 2, '2023-04-25 01:31:23', '2023-04-25 01:35:59');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650553938785419265, 'Issue with map function in Scala', '\n# Details of Problem\n```scala\nval myNumbers = List(1, 2, 3, 4, 5)\nval myStrings = myNumbers.map(n => \"Number \" + n)\n```\nI expected this code to create a new list of strings, where each string contains the word \"Number\" followed by the corresponding integer. However, it\'s not working as expected. Can anyone help me figure out what\'s going on?\n\n# My Specific Demands\n- Can someone please explain why I am getting this error message?\n- What changes do I need to make to my code to get it to work as intended?\n- Are there any alternative approaches I should consider?', 6, NULL, 31, 4, '2023-04-25 01:34:59', '2023-04-25 01:35:19');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650555055439167490, 'Issue with Python dictionary not updating', '\n# Details of Problem\nI am trying to update a dictionary in Python, but it doesn\'t seem to be working. Here\'s my code:\n\n```python\nmy_dict = {\"a\": 1, \"b\": 2}\nnew_dict = {\"c\": 3}\n\nmy_dict.update(new_dict)\nprint(my_dict)\n```\nI expect the output to be {\"a\": 1, \"b\": 2, \"c\": 3}, but instead, it only outputs {\"a\": 1, \"b\": 2}. Can anyone help me figure out why this is happening?\n\n# My Specific Demands\n- I would like to understand what is causing the issue with the dictionary not updating.\n- I would appreciate any suggestions for how to fix the issue and make the dictionary update correctly.\n- If possible, I would like an explanation of why the current code is not working as expected, so that I can avoid similar issues in the future.', 7, NULL, 20, 4, '2023-04-25 01:39:26', '2023-04-25 01:39:34');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650555395383312386, 'Issue with reading CSV file in Python', '\n# Details of Problem\nI am trying to read a CSV file in Python using the `csv` module. The file has a header row and multiple columns of data. When I try to read the file using the following code:\n\n```python\nimport csv\n\nwith open(\'data.csv\', \'r\') as file:\n    reader = csv.reader(file)\n    for row in reader:\n        print(row)\n```\nI get an output that looks like this:\n```\n[\'column1,column2,column3\']\n[\'data1,data2,data3\']\n```\nIt seems like the entire row is being treated as a single string, rather than splitting each value into a separate item in the list. What am I doing wrong?\n# My Specific Demands\n- How can I modify the code to correctly read the CSV file?\n- Are there any issues with the file format that could be causing this problem?\n- Is there a better library or method I should be using to read CSV files in Python?', 7, NULL, 23, 1, '2023-04-25 01:40:47', '2023-04-25 01:40:47');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650555691589255169, 'Issue with Python function', '\n# Details of Problem\nI have a Python function that is supposed to return a list of prime numbers up to a given integer, but it\'s not working as expected. Here\'s my code:\n\n```python\ndef get_primes(n):\n    primes = []\n    for num in range(2, n+1):\n        for i in range(2, num):\n            if num % i == 0:\n                break\n        else:\n            primes.append(num)\n    return primes\n```\nWhen I call this function with get_primes(10), I expect it to return [2, 3, 5, 7], but instead it returns [2, 3, 5, 7, 9]. I\'m not sure what\'s causing this issue.\n# My Specific Demands\n- I would like to understand what is causing the function to return an incorrect list of primes.\n- I would appreciate any suggestions for how to modify the function to fix this issue.', 7, 8, 43, 2, '2023-04-25 01:41:57', '2023-04-25 01:46:14');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650556258566881281, 'Trouble with a for loop', '\n# Details of Problem\nI\'m having trouble with a `for` loop in my Python code. I\'m trying to iterate through a list of numbers and perform a calculation on each number. However, the loop seems to be skipping some of the numbers in the list. Here\'s my code:\n\n```python\nmy_list = [1, 2, 3, 4, 5]\nfor num in my_list:\n    result = num * 2\n    print(result)\n```\nThe expected output would be:\n```\n2\n4\n6\n8\n10\n```\nBut what I\'m getting is:\n```\n2\n4\n8\n```\nI\'m not sure why the loop is skipping the numbers 3 and 5. Can someone help me figure out what\'s going on?\n# My Specific Demands\n- Can someone please explain why the for loop is not iterating through all of the numbers in the list?\n- How can I modify my code to get the expected output?\n- Are there any best practices or tips for avoiding similar issues in the future?', 7, 8, 24, 2, '2023-04-25 01:44:13', '2023-04-25 01:46:03');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650557531974352898, 'Vue.js component not rendering properly', '\n# Details of Problem\nI have created a Vue.js component that should display a list of items, but for some reason, it\'s not rendering properly. The component is getting the data from an API, but when I check the console, the data is coming through correctly. However, when I try to display the data in the component, it\'s not showing up.\n\nHere\'s my code:\n```\n\n  \n    List of items\n    \n      {{ item.name }}\n    \n  \n\n\nexport default {\n  data() {\n    return {\n      items: []\n    };\n  },\n  created() {\n    axios.get(\'/api/items\').then(response => {\n      this.items = response.data;\n    });\n  }\n};\n\n```\n# My Specific Demands\nI would like to know what I\'m doing wrong in my code and why the component is not rendering properly. I would also appreciate any suggestions for how to fix the issue so that the component displays the list of items correctly. Thank you in advance for your help.\n\n- Please provide code examples if necessary.\n- Please explain the solution in detail.', 8, NULL, 23, 4, '2023-04-25 01:49:16', '2023-04-25 01:51:22');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650559042741682178, 'Issue with onclick event not firing', '\n# Details of Problem\nI am having trouble with an onclick event in my JavaScript code. Here is my code:\n\n```javascript\nconst button = document.getElementById(\'myButton\');\n\nbutton.onclick = function() {\n  console.log(\'Button clicked!\');\n};\n```\nThe problem is that the onclick event is not firing when I click the button. I have checked the console for errors, but there are none. I have also tried using addEventListener instead of onclick, but it still doesn\'t work. What could be causing this issue?\n\n# My Specific Demands\n- Can someone help me identify the cause of this issue?\n- What steps can I take to fix the onclick event?\n- Can someone provide an example of working code for an onclick event?', 8, NULL, 20, 1, '2023-04-25 01:55:16', '2023-04-25 01:55:16');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650561598830231554, 'Issue with Javascript code not executing properly', '\n# Details of Problem\nI\'m trying to execute a piece of Javascript code on my website, but it doesn\'t seem to be working properly. I have included the code in a script tag in my HTML file, but when I load the page, nothing happens. Here\'s the code I\'m using:\n\n```javascript\nfunction myFunction() {\n  var x = document.getElementById(\"myInput\").value;\n  document.getElementById(\"demo\").innerHTML = \"You entered: \" + x;\n}\n```\nI have also added the necessary HTML elements to the page, including an input field with an id of \"myInput\" and a paragraph element with an id of \"demo\". Can you help me figure out why the code isn\'t executing properly?\n\n# My Specific Demands\nIdentify and fix the issue with the code not executing properly\nProvide an explanation of what was causing the issue and how it was fixed\nEnsure that the code is compatible with all major browsers', 8, 9, 20, 2, '2023-04-25 02:05:26', '2023-04-25 02:12:45');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650565316736794626, 'Segmentation fault error when running C program', '\n# Details of Problem\nI am trying to run a C program on my Linux machine, but I keep getting a segmentation fault error. Here\'s the code:\n\n```c\n#include \n\nint main() {\n    char *string = \"Hello, world!\";\n    string[0] = \'h\';\n    printf(\"%s\\n\", string);\n    return 0;\n}\n\n```\nI\'m not sure why this is happening. Can anyone help?\n\n\n# My Specific Demands\n- Can someone explain why this code is causing a segmentation fault error?\n- How can I fix the code to avoid this error and still change the first character of the string?\n- Are there any best practices for avoiding segmentation fault errors in C programming that I should be aware of? Please provide some resources if possible.', 9, NULL, 20, 4, '2023-04-25 02:20:12', '2023-04-25 02:20:19');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650566015545589761, 'Issue with JavaScript function not returning expected value', '\n# Details of Problem\nI have a JavaScript function that is supposed to return the sum of two numbers, but it is not returning the expected value. Here\'s the code:\n\n```javascript\nfunction addNumbers(num1, num2) {\n  return num1 + num2;\n}\n\nlet result = addNumbers(2, \"3\");\n\nconsole.log(result); // expected output: 5, actual output: \"23\"\n```\nAs you can see, I am passing in two numbers as arguments to the addNumbers function, but the console.log statement is returning a string concatenation instead of the sum. What am I doing wrong?\n# My Specific Demands\nPlease explain why the function is not returning the expected value and how to fix it.\nIt would be helpful to provide additional examples of how to use the addNumbers function correctly.\nIf there are any best practices or common mistakes to avoid when working with JavaScript functions like this one, please include those as well.', 9, NULL, 27, 1, '2023-04-25 02:22:59', '2023-04-25 02:22:59');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650566833132879873, 'Cannot insert data using MyBatis Plus in Spring Boot', '\n# Details of Problem\nI am trying to insert data into a MySQL database using MyBatis Plus in a Spring Boot application. However, I keep getting the following error message:\n```\njava.sql.SQLException: No value specified for parameter 1\n\n```\n\nHere is my code for the mapper and the service:\n\n```java\n// Mapper\n@Mapper\npublic interface UserMapper extends BaseMapper {\n}\n\n// Service\n@Service\npublic class UserServiceImpl implements UserService {\n    @Autowired\n    private UserMapper userMapper;\n\n    @Override\n    public void addUser(User user) {\n        userMapper.insert(user);\n    }\n}\n```\n\nAnd here is how I am calling the addUser method:\n\n```\nUser user = new User(\"John\", \"Doe\");\nuserService.addUser(user);\n\n```\nI have verified that the User object is being created correctly and that the values are being passed to the addUser method. Can anyone help me figure out why I am getting this error?\n# My Specific Demands\n- I would like to know what is causing the error message.\n- I would like suggestions on how to fix the issue.\n- If possible, please provide sample code to demonstrate the solution. Thank you!', 9, 8, 690, 2, '2023-04-25 02:26:14', '2023-04-25 02:31:08');
INSERT INTO `bounty` (`id`, `title`, `content`, `publisher_id`, `solver_id`, `reward`, `status`, `create_time`, `update_time`) VALUES (1650567780651319297, 'Quick Sort algorithm not sorting correctly', '\n# Details of Problem\n```c++\n#include \n\nusing namespace std;\n\nvoid quicksort(int arr[], int low, int high) {\n    if (low < high) {\n        int pivot = arr[low];\n        int i = low + 1;\n        int j = high;\n        while (i <= j) {\n            while (arr[i] <= pivot && i  pivot && j >= low) {\n                j--;\n            }\n            if (i < j) {\n                swap(arr[i], arr[j]);\n            }\n        }\n        swap(arr[low], arr[j]);\n        quicksort(arr, low, j - 1);\n        quicksort(arr, j + 1, high);\n    }\n}\n\nint main() {\n    int arr[] = {5, 3, 8, 4, 2, 7, 1, 10};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    quicksort(arr, 0, n - 1);\n    for (int i = 0; i < n; i++) {\n        cout << arr[i] << \" \";\n    }\n    return 0;\n}\n```\nThe output of this code is: 2 1 3 4 5 7 8 10. As you can see, the array is not sorted correctly. What am I doing wrong?\n# My Specific Demands\n- Can someone help me identify the bug in my code?\n- Can you provide an explanation of why my code is not sorting the array correctly?\n- Can you suggest any modifications to my code to fix the sorting issue?', 9, NULL, 455, 1, '2023-04-25 02:30:00', '2023-04-25 02:30:00');
COMMIT;

-- ----------------------------
-- Table structure for solution
-- ----------------------------
DROP TABLE IF EXISTS `solution`;
CREATE TABLE `solution` (
  `id` bigint NOT NULL COMMENT 'Primary key, uniquely identifies a solution.',
  `bounty_id` bigint DEFAULT NULL COMMENT 'Foreign key, references the id in the challenges table.',
  `content` text COMMENT 'The content of the solution.',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT=' Stores information about provided solutions.\nUser B provide solution to the question posted by A.';

-- ----------------------------
-- Records of solution
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for transaction
-- ----------------------------
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL COMMENT ' Primary key, uniquely identifies a transaction.',
  `from_user_id` bigint DEFAULT NULL COMMENT 'Foreign key, references the id in the users table (user A).',
  `to_user_id` bigint DEFAULT NULL COMMENT 'Foreign key, references the id in the users table (user B).',
  `amount` int DEFAULT NULL COMMENT 'he amount of the transaction (the reward) * 100.',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores information about reward transactions.';

-- ----------------------------
-- Records of transaction
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;