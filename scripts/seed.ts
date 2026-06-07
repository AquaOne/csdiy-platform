import { prisma } from "../src/lib/prisma"

const categories = [
  { name: "编程入门", slug: "programming-intro", description: "从零开始学习编程，掌握多种语言基础", icon: "Code2", color: "#3b82f6", order: 0 },
  { name: "编程语言设计与分析", slug: "pl-design", description: "深入理解编程语言的本质", icon: "Pencil", color: "#8b5cf6", order: 1 },
  { name: "数学基础", slug: "math-basics", description: "计算机科学所需的数学基础", icon: "BookOpen", color: "#a855f7", order: 2 },
  { name: "数学进阶", slug: "math-advanced", description: "高级数学理论与应用", icon: "BookOpen", color: "#d946ef", order: 3 },
  { name: "数据结构与算法", slug: "data-structures-algorithms", description: "核心数据结构与算法设计", icon: "Cpu", color: "#f97316", order: 4 },
  { name: "计算机系统基础", slug: "computer-systems", description: "深入理解计算机系统底层原理", icon: "Database", color: "#ef4444", order: 5 },
  { name: "操作系统", slug: "operating-systems", description: "操作系统核心概念与实现", icon: "Cpu", color: "#dc2626", order: 6 },
  { name: "计算机网络", slug: "computer-networking", description: "网络协议与分布式通信", icon: "Network", color: "#22c55e", order: 7 },
  { name: "体系结构", slug: "computer-architecture", description: "计算机体系结构与组成原理", icon: "Cpu", color: "#e11d48", order: 8 },
  { name: "数据库系统", slug: "database-systems", description: "数据库设计与实现", icon: "Database", color: "#06b6d4", order: 9 },
  { name: "Web开发", slug: "web-development", description: "现代 Web 全栈开发技术", icon: "Palette", color: "#ec4899", order: 10 },
  { name: "编译原理", slug: "compilers", description: "编译器设计与实现", icon: "Code2", color: "#6366f1", order: 11 },
  { name: "并行与分布式系统", slug: "parallel-distributed", description: "并行计算与分布式系统设计", icon: "Network", color: "#14b8a6", order: 12 },
  { name: "系统安全", slug: "security", description: "计算机系统安全与防护", icon: "Shield", color: "#84cc16", order: 13 },
  { name: "人工智能", slug: "ai", description: "人工智能基础与核心方法", icon: "Brain", color: "#8b5cf6", order: 14 },
  { name: "机器学习", slug: "machine-learning", description: "机器学习理论与应用", icon: "Brain", color: "#ec4899", order: 15 },
  { name: "机器学习系统", slug: "ml-systems", description: "机器学习系统的工程实现", icon: "Cpu", color: "#f43f5e", order: 16 },
  { name: "机器学习进阶", slug: "ml-advanced", description: "高级机器学习理论与前沿方向", icon: "Brain", color: "#d946ef", order: 17 },
  { name: "深度学习", slug: "deep-learning", description: "深度学习理论与应用", icon: "Brain", color: "#f43f5e", order: 18 },
  { name: "深度生成模型", slug: "generative-models", description: "生成模型: 从GAN到扩散模型", icon: "Brain", color: "#a855f7", order: 19 },
  { name: "计算机图形学", slug: "computer-graphics", description: "图形渲染与几何处理", icon: "Palette", color: "#06b6d4", order: 20 },
  { name: "软件工程", slug: "software-engineering", description: "软件开发工程化实践", icon: "Code2", color: "#6366f1", order: 21 },
  { name: "电子基础", slug: "electronics", description: "计算机硬件与电子学基础", icon: "Cpu", color: "#f97316", order: 22 },
  { name: "数据科学", slug: "data-science", description: "数据科学分析与可视化", icon: "Database", color: "#0ea5e9", order: 23 },
  { name: "必学工具", slug: "essential-tools", description: "程序员的必备工具箱", icon: "Compass", color: "#6b7280", order: 24 },
]

const courses: Array<{
  title: string; slug: string; description: string; categorySlug: string; difficulty: string; estimatedHours: number; order: number; lessons: Array<{ title: string; slug: string; order: number; estimatedMinutes: number; content: string }>
}> = [
  {
    title: "MIT-Missing-Semester", slug: "missing-semester", description: "MIT 计算机教育中缺失的一课 — 掌握命令行、版本控制、编辑器等必备工具", categorySlug: "programming-intro", difficulty: "beginner", estimatedHours: 10, order: 0,
    lessons: [
      { title: "课程概述与 Shell 基础", slug: "shell-intro", order: 0, estimatedMinutes: 30, content: "计算机教育中缺失的一课旨在教授计算机科学学生那些「本应掌握」却常常被忽视的工具和技巧。我们将探索命令行环境的基础，了解 Shell 是什么、如何导航文件系统、执行基本命令、组合命令以实现强大功能。" },
      { title: "Shell 工具与脚本", slug: "shell-scripting", order: 1, estimatedMinutes: 45, content: "Shell 脚本是自动化重复性任务的有力工具。我们将学习变量、条件语句、循环、函数以及常用命令行工具的组合使用。掌握这些技能将极大提升您的开发效率。" },
      { title: "编辑器 (Vim)", slug: "vim", order: 2, estimatedMinutes: 40, content: "Vim 是一款高效的文本编辑器，学习曲线虽然陡峭但回报丰厚。我们将学习 Vim 的基本模式切换、移动、编辑、搜索替换以及个性化配置，让您的手指不离键盘。" },
      { title: "版本控制 (Git)", slug: "git", order: 3, estimatedMinutes: 50, content: "Git 是现代软件开发的基石。从基本的工作流到高级的分支策略，我们将深入理解 Git 的数据模型、常用命令以及团队协作的最佳实践。" },
      { title: "数据处理与调试", slug: "data-wrangling", order: 4, estimatedMinutes: 40, content: "掌握 awk、sed、grep、jq 等数据处理工具，能够从日志、JSON、CSV 等格式中提取有价值的信息。同时学习如何使用调试器定位和修复程序错误。" },
      { title: "元编程与安全", slug: "metaprogramming", order: 5, estimatedMinutes: 35, content: "元编程——构建系统、测试框架、依赖管理。同时涵盖基本的计算机安全知识，包括哈希、加密、SSH 密钥管理等内容。" },
    ],
  },
  {
    title: "CS61A: 计算机程序的结构与解释", slug: "cs61a", description: "UC Berkeley 的经典入门课程，使用 Python 讲授计算思维的核心概念", categorySlug: "programming-intro", difficulty: "beginner", estimatedHours: 40, order: 1,
    lessons: [
      { title: "引言与表达式", slug: "introduction", order: 0, estimatedMinutes: 30, content: "计算机科学不仅是编程，更是关于如何系统地解决问题的思维方式。本章介绍 Python 中的基本表达式、名称与赋值，以及解释器如何求值表达式。" },
      { title: "函数与控制", slug: "functions-control", order: 1, estimatedMinutes: 45, content: "函数是程序组织的基本单元。学习函数定义、调用、控制流（条件与循环）、以及函数抽象的概念，理解如何将复杂问题分解为可管理的小块。" },
      { title: "高阶函数", slug: "higher-order-functions", order: 2, estimatedMinutes: 50, content: "将函数作为参数传递和作为返回值返回是函数式编程的核心。学习高阶函数、lambda 表达式、以及使用函数抽象简化代码。" },
      { title: "递归", slug: "recursion", order: 3, estimatedMinutes: 45, content: "递归是一种将问题分解为更小的同类子问题的方法。学习递归函数的思维方式、树递归、以及如何将递归应用于实际问题。" },
      { title: "数据抽象", slug: "data-abstraction", order: 4, estimatedMinutes: 40, content: "数据抽象是将数据的表示与其使用分离的技术。学习序列、字典、抽象屏障以及如何设计好的数据抽象。" },
      { title: "对象与类", slug: "objects-classes", order: 5, estimatedMinutes: 50, content: "面向对象编程将数据和操作数据的方法封装在一起。学习类的定义、继承、多态以及 Python 对象模型。" },
      { title: "Scheme 与 Lambda 演算", slug: "scheme", order: 6, estimatedMinutes: 50, content: "Scheme 是一种简洁的函数式编程语言。学习 Scheme 语法、递归、高阶函数以及解释器的基本原理，理解编程语言的本质。" },
      { title: "SQL 与数据持久化", slug: "sql-intro", order: 7, estimatedMinutes: 35, content: "SQL 是最广泛使用的数据库查询语言。学习基本的 SQL 查询、表连接、聚合操作以及如何在程序中管理持久化数据。" },
    ],
  },
  {
    title: "CSAPP: 深入理解计算机系统", slug: "csapp", description: "CMU 经典课程，从程序员视角深入理解计算机系统底层原理", categorySlug: "computer-systems", difficulty: "intermediate", estimatedHours: 60, order: 0,
    lessons: [
      { title: "计算机系统漫游", slug: "system-tour", order: 0, estimatedMinutes: 30, content: "从程序的生命周期开始——源程序如何被编译、链接、加载和执行。我们将跟踪一个简单程序从编写到输出的完整旅程，建立起计算机系统的整体视角。" },
      { title: "信息的表示与处理", slug: "info-representation", order: 1, estimatedMinutes: 50, content: "深入理解数据在计算机中的表示方式：无符号数、补码、浮点数（IEEE 754标准）。学习为什么 0.1 + 0.2 != 0.3，以及如何处理整数溢出和舍入误差。" },
      { title: "程序的机器级表示", slug: "machine-level", order: 2, estimatedMinutes: 60, content: "学习如何阅读 x86-64 汇编代码，理解 C 语言代码如何被翻译成机器指令。包括寄存器使用、栈帧结构、条件码、以及控制流的底层实现。" },
      { title: "处理器体系结构", slug: "processor-architecture", order: 3, estimatedMinutes: 50, content: "从数字逻辑门到流水线处理器。学习 Y86-64 指令集架构，理解单周期处理器和流水线处理器的设计原理，以及数据冒险和控制冒险的处理。" },
      { title: "优化程序性能", slug: "optimization", order: 4, estimatedMinutes: 45, content: "编写高效的 C 代码：理解编译器优化的能力与限制，学习循环展开、消除内存别名、条件传送等优化技术，以及如何利用现代处理器的指令级并行。" },
      { title: "存储器层次结构", slug: "memory-hierarchy", order: 5, estimatedMinutes: 45, content: "从寄存器到磁盘的存储层级：理解局部性原理、缓存的组织方式、缓存命中与缺失、以及如何编写缓存友好的代码。这是性能优化的核心。" },
      { title: "链接", slug: "linking", order: 6, estimatedMinutes: 40, content: "链接器是开发中不可或缺但常被忽视的工具。学习符号解析、重定位、共享库与动态链接、以及常见链接错误（如符号冲突）的解决方法。" },
      { title: "异常控制流", slug: "exception-control", order: 7, estimatedMinutes: 45, content: "从硬件异常到信号处理：理解异常、陷阱、中断、以及 Unix 信号机制。学习如何使用 setjmp/longjmp 实现非本地跳转。" },
      { title: "虚拟内存", slug: "virtual-memory", order: 8, estimatedMinutes: 55, content: "虚拟内存是现代计算机最伟大的抽象之一。学习地址翻译、TLB、页表、mmap、以及内存映射文件。理解为什么虚拟内存让编程更简单、更安全。" },
      { title: "系统级 I/O 与并发", slug: "io-concurrency", order: 9, estimatedMinutes: 50, content: "Unix I/O 模型与并发编程入门。学习文件描述符、重定向、标准 I/O 与系统级 I/O 的区别以及进程和线程的基础并发概念。" },
    ],
  },
  {
    title: "CS61B: 数据结构", slug: "cs61b", description: "UC Berkeley 的数据结构课程，使用 Java 实现各种核心数据结构", categorySlug: "data-structures-algorithms", difficulty: "intermediate", estimatedHours: 50, order: 0,
    lessons: [
      { title: "Java 基础与引用类型", slug: "java-basics", order: 0, estimatedMinutes: 35, content: "从 Java 的基本语法开始，理解引用类型与基本类型的区别、对象在堆内存中的分配方式，以及 Java 的垃圾回收机制。" },
      { title: "链表与动态数组", slug: "linked-lists", order: 1, estimatedMinutes: 45, content: "链表和动态数组是最基础的数据结构。学习单链表、双链表、循环链表的实现，对比 ArrayList 和 LinkedList 的性能特征和适用场景。" },
      { title: "栈与队列", slug: "stacks-queues", order: 2, estimatedMinutes: 30, content: "栈（后进先出）和队列（先进先出）是两种基础的线性数据结构。学习它们的数组和链表实现，以及在实际问题中的应用场景。" },
      { title: "树与二叉树", slug: "trees", order: 3, estimatedMinutes: 50, content: "树是表示层级关系的数据结构。深入理解二叉树、二叉搜索树（BST）、树的遍历（前序/中序/后序/层序）以及树在表达式解析中的应用。" },
      { title: "平衡搜索树", slug: "balanced-trees", order: 4, estimatedMinutes: 55, content: "B 树、红黑树和 AVL 树——保持搜索树平衡的不同策略。学习这些自平衡树的核心思想、旋转操作以及在实际系统中的广泛应用。" },
      { title: "哈希表", slug: "hash-tables", order: 5, estimatedMinutes: 40, content: "哈希表是最高效的查找结构之一。学习哈希函数的设计原则、冲突解决策略（链地址法/开放地址法）、以及 Java 中 HashMap 的实现细节。" },
      { title: "优先队列与堆", slug: "priority-queues", order: 6, estimatedMinutes: 35, content: "优先队列是一种特殊的队列，元素按优先级出队。学习二叉堆的实现、堆排序算法、以及优先队列在图算法中的应用。" },
      { title: "图论基础与遍历", slug: "graph-intro", order: 7, estimatedMinutes: 50, content: "图是最灵活的数据结构之一。学习图的表示（邻接矩阵/邻接表）、深度优先搜索（DFS）、广度优先搜索（BFS）以及最短路径问题。" },
      { title: "排序算法", slug: "sorting", order: 8, estimatedMinutes: 45, content: "全面比较各种排序算法：插入排序、归并排序、快速排序、堆排序、基数排序。学习每一种的时间复杂度、空间复杂度和稳定性。" },
    ],
  },
  {
    title: "MIT 6.006: 算法导论", slug: "6006", description: "MIT 经典算法课程，涵盖核心算法设计与分析方法", categorySlug: "data-structures-algorithms", difficulty: "intermediate", estimatedHours: 45, order: 1,
    lessons: [
      { title: "算法分析基础", slug: "algorithm-analysis", order: 0, estimatedMinutes: 40, content: "算法的效率可以通过时间复杂度来衡量。学习渐近分析（Big O、Θ、Ω）、递归树方法、主定理，以及如何分析算法的上界和下界。" },
      { title: "分治策略", slug: "divide-conquer", order: 1, estimatedMinutes: 45, content: "分治是算法设计的经典策略。深入分析归并排序、快速排序、最大子数组问题以及 Strassen 矩阵乘法。学习如何通过递归分析分治算法。" },
      { title: "动态规划", slug: "dynamic-programming", order: 2, estimatedMinutes: 60, content: "动态规划是解决最优化问题的强大工具。从斐波那契数列开始，学习最长公共子序列、背包问题、矩阵链乘法和编辑距离等经典 DP 问题的解决范式。" },
      { title: "贪心算法", slug: "greedy", order: 3, estimatedMinutes: 35, content: "贪心算法在每一步做出局部最优选择。学习活动选择、哈夫曼编码、最小生成树（Kruskal/Prim）以及分数背包问题的贪心策略。" },
      { title: "图算法", slug: "graph-algorithms", order: 4, estimatedMinutes: 50, content: "深入图的算法：Dijkstra 最短路径、Bellman-Ford 算法（处理负权边）、Floyd-Warshall 全源最短路径、拓扑排序以及强连通分量。" },
      { title: "NP 完全性", slug: "np-complete", order: 5, estimatedMinutes: 45, content: "理解计算复杂性的极限：P 与 NP 问题、归约方法、NP 完全性证明、以及常见的 NP 完全问题（SAT、TSP、背包等）。学习如何在实践中处理难解问题。" },
    ],
  },
  {
    title: "MIT 6.S081: 操作系统", slug: "601s081", description: "MIT 的经典操作系统课程，基于 RISC-V 和 xv6 系统", categorySlug: "operating-systems", difficulty: "advanced", estimatedHours: 60, order: 0,
    lessons: [
      { title: "操作系统的设计与接口", slug: "os-intro", order: 0, estimatedMinutes: 30, content: "操作系统是管理硬件资源并为应用程序提供服务的软件层。学习操作系统的核心功能：进程管理、内存管理、文件系统、I/O 系统，以及 xv6 的整体架构。" },
      { title: "系统调用与 Trap", slug: "syscalls-traps", order: 1, estimatedMinutes: 50, content: "系统调用是用户程序与操作系统之间的接口。深入理解 Trap 机制——用户态到内核态的切换过程，以及在 xv6 中实现系统调用的完整流程。" },
      { title: "进程与调度", slug: "process-scheduling", order: 2, estimatedMinutes: 50, content: "进程是执行中的程序。学习进程的状态模型、上下文切换、调度算法（RR、MLFQ、CFS）、以及 xv6 中进程管理的数据结构和实现。" },
      { title: "虚拟内存", slug: "virtual-memory-os", order: 3, estimatedMinutes: 55, content: "虚拟内存为每个进程提供独立的地址空间。学习 RISC-V 分页机制、页表结构、TLB 管理、COW 写时复制以及 xv6 的虚拟内存实现。" },
      { title: "中断与设备驱动", slug: "interrupts-drivers", order: 4, estimatedMinutes: 45, content: "中断机制允许硬件设备异步通知 CPU。学习中断处理流程、中断控制器的角色、设备驱动架构以及 xv6 中 UART 和磁盘驱动的实现。" },
      { title: "文件系统", slug: "file-system", order: 5, estimatedMinutes: 50, content: "文件系统管理持久化数据。学习 xv6 文件系统的层次设计：缓冲区缓存、日志层、inode 层、目录层，以及崩溃恢复机制。" },
      { title: "进程间通信与同步", slug: "ipc-sync", order: 6, estimatedMinutes: 55, content: "进程间通信（IPC）和同步是多进程协作的基础。学习管道、信号量、锁（自旋锁/睡眠锁）以及 xv6 中通过管道实现的进程通信。" },
      { title: "多线程与并发", slug: "threads-concurrency", order: 7, estimatedMinutes: 50, content: "多线程编程利用多核处理器的并行能力。学习线程模型、互斥锁、条件变量、以及 xv6 中的线程实现和常见的并发编程陷阱。" },
    ],
  },
  {
    title: "CS144: 计算机网络", slug: "cs144", description: "Stanford 的计算机网络课程，从基础到实践", categorySlug: "computer-networking", difficulty: "intermediate", estimatedHours: 40, order: 0,
    lessons: [
      { title: "网络分层架构", slug: "network-layers", order: 0, estimatedMinutes: 30, content: "计算机网络采用分层架构来管理复杂性。学习 OSI 七层模型和 TCP/IP 四层模型，理解各层的职责以及从上到下的数据封装过程。" },
      { title: "应用层协议", slug: "application-layer", order: 1, estimatedMinutes: 40, content: "应用层是用户直接交互的网络层。深入分析 HTTP、DNS、SMTP 等协议的工作机制，理解请求-响应模式、域名解析过程以及邮件传输流程。" },
      { title: "传输层: TCP 与 UDP", slug: "transport-layer", order: 2, estimatedMinutes: 55, content: "传输层提供端到端的通信服务。学习 UDP 的无连接传输、TCP 的可靠传输机制（流量控制、拥塞控制、重传计时器）以及 TCP 三次握手和四次挥手。" },
      { title: "网络层: IP 协议", slug: "network-layer", order: 3, estimatedMinutes: 50, content: "网络层负责数据包的路由和转发。了解 IPv4/IPv6 协议、子网划分、CIDR、路由器的工作原理、以及路由协议（RIP、OSPF、BGP）。" },
      { title: "链路层与局域网", slug: "link-layer", order: 4, estimatedMinutes: 35, content: "链路层负责相邻节点间的可靠通信。学习以太网协议、CSMA/CD、交换机与自学习、ARP 协议以及 VLAN 技术。" },
      { title: "网络安全基础", slug: "network-security", order: 5, estimatedMinutes: 40, content: "网络安全的三个核心目标：机密性、完整性和可用性。学习对称/非对称加密、TLS/SSL、防火墙、NAT 以及常见的网络攻击类型。" },
    ],
  },
  {
    title: "CS144: 数据库系统", slug: "cs144-db", description: "Stanford 数据库课程 — 关系数据库的设计与实现", categorySlug: "database-systems", difficulty: "advanced", estimatedHours: 50, order: 0,
    lessons: [
      { title: "关系模型与 SQL", slug: "relational-model", order: 0, estimatedMinutes: 35, content: "关系模型是数据库领域的基石。学习关系代数、表、键约束、以及 SQL 的基本操作（SELECT、INSERT、UPDATE、DELETE）和数据定义语言。" },
      { title: "数据库存储与索引", slug: "storage-indexing", order: 1, estimatedMinutes: 50, content: "数据在磁盘上的组织方式直接影响查询性能。学习页结构、B+ 树的实现（搜索/插入/删除）、哈希索引、LSM 树以及各种索引策略的适用场景。" },
      { title: "查询处理与优化", slug: "query-optimization", order: 2, estimatedMinutes: 50, content: "SQL 查询从字符串到执行计划经历多个阶段。学习语法分析、查询重写、代价估计、连接算法（Nested Loop / Hash Join / Sort-Merge Join）以及执行计划的选择。" },
      { title: "事务与并发控制", slug: "transactions", order: 3, estimatedMinutes: 55, content: "事务是数据库可靠性的保障。学习 ACID 特性、隔离级别、锁协议（2PL）、MVCC 多版本并发控制、以及死锁检测与预防。" },
      { title: "崩溃恢复", slug: "crash-recovery", order: 4, estimatedMinutes: 40, content: "数据库系统需要保证在崩溃后数据的一致性。学习 WAL（预写式日志）、ARIES 恢复算法、检查点机制以及 REDO/UNDO 日志的恢复过程。" },
      { title: "分布式数据库", slug: "distributed-db", order: 5, estimatedMinutes: 45, content: "分布式数据库将数据存储在多个节点上。学习分片策略、副本一致性、CAP 定理、Paxos/Raft 共识算法以及分布式事务的处理。" },
    ],
  },
]

async function main() {
  console.log("🌱 开始初始化数据...")

  // Clean existing data
  await prisma.quizAttempt.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.note.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.course.deleteMany()
  await prisma.category.deleteMany()
  await prisma.learningPath.deleteMany()

  // Create categories
  console.log("📁 创建分类...")
  for (const cat of categories) {
    await prisma.category.create({ data: cat })
  }

  // Create courses and lessons
  console.log("📚 创建课程和教程...")
  for (const courseData of courses) {
    const { lessons, categorySlug, ...courseFields } = courseData
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } })
    if (!category) {
      console.warn(`⚠️  分类 ${categorySlug} 不存在，跳过课程 ${courseData.title}`)
      continue
    }
    const course = await prisma.course.create({
      data: {
        ...courseFields,
        categoryId: category.id,
        longDescription: null,
      },
    })
    for (const lesson of lessons) {
      await prisma.lesson.create({
        data: {
          ...lesson,
          courseId: course.id,
        },
      })
    }
    console.log(`  ✅ ${courseData.title} (${lessons.length} 节课)`)
  }

  // Create learning paths
  console.log("🗺️  创建学习路径...")
  await prisma.learningPath.create({
    data: {
      name: "零基础转码",
      slug: "beginner",
      description: "从零开始，系统学习计算机科学基础，适合非科班转行的学习者",
      longDescription: "这条路径适合完全零基础或非计算机专业的学习者。从编程入门开始，逐步建立计算机系统思维，覆盖数据结构、算法、操作系统、网络等核心领域。",
      courses: JSON.stringify(["missing-semester", "cs61a", "cs61b", "6006", "csapp", "cs144"]),
      difficulty: "beginner",
      estimatedDays: 180,
      icon: "🌱",
      color: "#22c55e",
    },
  })
  await prisma.learningPath.create({
    data: {
      name: "在校CS学生",
      slug: "cs-student",
      description: "计算机专业学生的进阶学习路径，深入系统与理论",
      longDescription: "这条路径适合计算机专业学生，在课程基础上进一步深入。涵盖操作系统、数据库、分布式系统等核心高阶课程。",
      courses: JSON.stringify(["cs61a", "cs61b", "csapp", "601s081", "cs144", "cs144-db"]),
      difficulty: "intermediate",
      estimatedDays: 365,
      icon: "🎓",
      color: "#3b82f6",
    },
  })
  await prisma.learningPath.create({
    data: {
      name: "算法面试",
      slug: "interview",
      description: "针对技术面试的系统算法训练",
      longDescription: "专注算法与数据结构深度训练，配合大量习题练习，为技术面试做好充分准备。",
      courses: JSON.stringify(["cs61b", "6006"]),
      difficulty: "intermediate",
      estimatedDays: 90,
      icon: "💡",
      color: "#f59e0b",
    },
  })
  await prisma.learningPath.create({
    data: {
      name: "AI/ML方向",
      slug: "ai-ml",
      description: "从数学基础到深度学习，系统掌握人工智能核心知识",
      longDescription: "为有志于AI/ML方向的学而设计。从数学基础开始，经机器学习核心理论，最终深入深度学习前沿。",
      courses: JSON.stringify(["cs61a", "cs61b", "csapp", "6006", "cs144"]),
      difficulty: "advanced",
      estimatedDays: 365,
      icon: "🤖",
      color: "#8b5cf6",
    },
  })

  console.log("")
  console.log("🎉 数据初始化完成!")
  console.log(`  - ${categories.length} 个分类`)
  console.log(`  - ${courses.length} 门课程`)
  const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0)
  console.log(`  - ${totalLessons} 节教程`)
  console.log(`  - 4 条学习路径`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
