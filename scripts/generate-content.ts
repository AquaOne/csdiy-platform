/**
 * AI 内容生成管线 — 为所有课程生成完整教程
 * 用法: npx tsx scripts/generate-content.ts
 */
import { prisma } from "../src/lib/prisma"

// Comprehensive tutorial content for every lesson
const LESSON_CONTENTS: Record<string, string> = {
  // ===== MIT-Missing-Semester =====
  "shell-intro": `## 学习目标

完成本节后，你将能够：
- 理解 Shell 的本质及其在开发中的核心地位
- 熟练使用命令行导航文件系统
- 掌握文件操作、进程管理等基本命令
- 理解命令组合与重定向机制

## 1. Shell 是什么？

Shell 是一个**命令行解释器**，它接收你输入的命令并将其转换为操作系统能理解的指令。你可以把它看作是一个文本界面的"操作系统入口"。

> **类比**：就像图形界面（Windows 桌面、macOS Finder）让你通过点击来操作电脑，Shell 让你通过**输入文字命令**来操作电脑。它更高效、更可编程、更强大。

常见的 Shell 有：**Bash** (最流行，Linux/macOS 默认)、**Zsh** (Bash 增强版，macOS 现默认)、**Fish** (用户友好)、**PowerShell** (Windows)。

## 2. 文件系统导航

### pwd — 查看当前位置
\`\`\`bash
pwd   # 输出类似: /home/user/Documents
\`\`\`

### ls — 列出文件
\`\`\`bash
ls        # 列出当前目录
ls -la    # 显示所有文件（含隐藏文件）的详细信息
ls -lh    # 人性化显示文件大小
\`\`\`

### cd — 切换目录
\`\`\`bash
cd /etc       # 绝对路径
cd Documents  # 相对路径
cd ..         # 上级目录
cd ~          # home 目录
cd -          # 上一个目录
\`\`\`

## 3. 文件操作
\`\`\`bash
touch file.txt              # 创建文件
cp file.txt backup.txt      # 复制
mv file.txt ~/Documents/    # 移动
rm file.txt                 # 删除（不回回收站！）
mkdir -p a/b/c              # 创建嵌套目录
\`\`\`

## 4. 查看文件内容
\`\`\`bash
cat file.txt       # 全部显示
less file.txt      # 分页查看
head -n 5 file.txt # 前5行
tail -f log.txt    # 实时追踪日志
\`\`\`

## 5. 管道与重定向 — Shell 最强大的特性

**管道** \`|\` 将一个命令的输出传给另一个命令：
\`\`\`bash
ls -la | grep ".txt"     # 查找所有txt文件
ps aux | grep python     # 查找Python进程
cat log.txt | wc -l      # 统计行数
\`\`\`

**重定向**：
\`\`\`bash
echo "hello" > file.txt   # 覆盖写入
echo "world" >> file.txt  # 追加写入
\`\`\`

## 6. 实用技巧
- \`Tab\` 自动补全
- \`Ctrl+R\` 搜索历史命令
- \`Ctrl+C\` 终止命令
- \`!!\` 重复上一条命令

## 思考练习
1. 创建目录 \`learn-shell\`，创建5个文件并列出
2. 用管道统计 \`/etc\` 下有多少文件
3. 使用重定向将 ls 的结果保存到文件中

## 总结
Shell 是程序员的"超能力"。导航、文件操作、管道重定向是日常开发最常用的技能。
`,

  "shell-scripting": `## 学习目标
- 编写 Shell 脚本自动化任务
- 使用变量、条件、循环
- 理解参数传递和错误处理

## 1. 第一个脚本
\`\`\`bash
#!/bin/bash
echo "Hello, Shell!"
\`\`\`
保存为 \`hello.sh\`，然后 \`chmod +x hello.sh\`，执行 \`./hello.sh\`。

## 2. 变量
\`\`\`bash
name="Alice"
echo "My name is $name"
echo "I am \${age} years old"  # 花括号明确变量边界
\`\`\`

**命令替换**：
\`\`\`bash
current_dir=$(pwd)
files_count=$(ls | wc -l)
\`\`\`

## 3. 条件判断
\`\`\`bash
if [ $score -gt 60 ]; then
    echo "及格"
elif [ $score -gt 90 ]; then
    echo "优秀"
fi

# 数值: -eq -ne -gt -lt -ge -le
# 字符串: = != -z(空) -n(非空)
# 文件: -f(文件) -d(目录) -e(存在)
\`\`\`

## 4. 循环
\`\`\`bash
# for
for file in *.txt; do
    echo "处理: $file"
done

# while
count=1
while [ $count -le 5 ]; do
    echo $count
    ((count++))
done
\`\`\`

## 5. 函数
\`\`\`bash
greet() {
    local name=$1   # $1 是第一个参数
    echo "Hello, $name!"
}
greet "World"
\`\`\`

## 6. 错误处理
\`\`\`bash
set -euo pipefail  # 脚本安全模式

cleanup() { rm -rf /tmp/temp; }
trap cleanup EXIT  # 退出时清理
\`\`\`

## 思考练习
1. 编写脚本批量重命名所有 .txt 文件添加前缀
2. 编写备份脚本压缩 Documents 目录
3. 实现一个简单的计算器脚本

## 总结
Shell 脚本将命令组合成自动化工具。你学会了变量、条件、循环、函数——这些构成了 Shell 编程的完整基础。
`,

  "vim": `## 学习目标
- 理解 Vim 的模式概念
- 掌握核心操作（移动、编辑、保存退出）
- 能在 VS Code 中使用 Vim 快捷键

## 1. Vim 的模式
Vim 是**模态编辑器**，不同模式下按键功能不同：
- **Normal** — 导航操作文本 (按 Esc)
- **Insert** — 输入文字 (按 i)
- **Visual** — 选择文本 (按 v)
- **Command** — 执行命令 (按 :)

**关键思维**：大部分时间在 Normal 模式，只在输入文字时进 Insert 模式。

## 2. 移动 (Normal 模式)
\`\`\`
h ←  j ↓  k ↑  l →      基本移动
w/b  下一个/上一个单词开头
0/$  行首/行尾
gg/G 文件开头/结尾
:42  跳到42行
\`\`\`

## 3. 编辑
\`\`\`
i   光标前插入   I 行首插入
a   光标后追加   A 行尾追加
o   下方新建行   O 上方新建行
dd  删除行       yy 复制行
p   粘贴         u 撤销
x   删除字符     r 替换字符
\`\`\`

**计数组合**：\`3w\` 右移3词，\`5dd\` 删除5行，\`2yy\` 复制2行。

## 4. 搜索替换
\`\`\`
/pattern  向下搜索
?pattern  向上搜索
n/N       下一个/上一个匹配
:%s/old/new/g  全文替换
\`\`\`

## 5. 基础配置 (~/.vimrc)
\`\`\`vim
set number
set relativenumber
set tabstop=4
set shiftwidth=4
set expandtab
syntax on
colorscheme desert
\`\`\`

## 总结
Vim 需要刻意练习形成肌肉记忆。先从 \`hjkl\` 移动、\`i\` 插入、\`:wq\` 保存退出开始，逐步增加新操作。
`,

  "git": `## 学习目标
- 理解 Git 的核心概念（仓库、提交、分支）
- 掌握日常开发的基本操作
- 理解团队协作的工作流

## 1. Git 的核心思想
Git 是一个**分布式版本控制系统**，它记录文件的每一次变更，让你可以回到任何历史版本。

**三个区域**：
- 工作区（Working Directory）— 你编辑的文件
- 暂存区（Staging Area）— 准备提交的更改
- 仓库（Repository）— Git 保存历史的地方

## 2. 基本操作
\`\`\`bash
git init                    # 初始化仓库
git add file.txt            # 添加到暂存区
git add .                   # 添加所有文件
git commit -m "消息"        # 提交
git status                  # 查看状态
git log                     # 查看历史
git diff                    # 查看更改
\`\`\`

## 3. 分支
\`\`\`bash
git branch feature-x        # 创建分支
git checkout feature-x      # 切换分支
git switch feature-x        # 切换分支（新语法）
git checkout -b feature-x   # 创建并切换
git merge feature-x         # 合并分支到当前
git branch -d feature-x     # 删除分支
\`\`\`

## 4. 远程操作
\`\`\`bash
git clone <url>             # 克隆远程仓库
git push origin main        # 推送到远程
git pull origin main        # 拉取远程更新
git fetch origin            # 获取远程信息（不合并）
git remote -v               # 查看远程仓库
\`\`\`

## 5. 撤销操作
\`\`\`bash
git restore file.txt        # 撤销工作区修改
git restore --staged file   # 取消暂存
git reset --soft HEAD~1     # 撤销上次提交（保留更改）
git reset --hard HEAD~1     # 彻底撤销上次提交
\`\`\`

## 6. 团队协作工作流
1. \`git checkout -b my-feature\` 创建功能分支
2. 修改代码，\`git add\` + \`git commit\`
3. \`git push origin my-feature\` 推送
4. 在 GitHub 创建 Pull Request
5. 代码审查后合并

## 思考练习
1. 创建一个仓库，添加文件、提交、创建分支
2. 在不同分支上修改文件，然后合并
3. 模拟冲突并解决

## 总结
Git 是现代软件开发的基石。掌握 **add → commit → push** 循环和**分支管理**即可应对 90% 的日常场景。
`,

  "data-wrangling": `## 学习目标
- 掌握常用数据处理命令
- 学会用管道组合工具处理数据
- 理解正则表达式在数据提取中的应用

## 1. 文本处理三剑客

### grep — 搜索文本
\`\`\`bash
grep "error" log.txt           # 搜索包含 error 的行
grep -i "error" log.txt        # 忽略大小写
grep -r "TODO" src/            # 递归搜索目录
grep -v "debug" log.txt        # 排除匹配行
grep -c "error" log.txt        # 统计匹配行数
grep -n "error" log.txt        # 显示行号
\`\`\`

### sed — 流编辑器
\`\`\`bash
sed 's/old/new/g' file.txt     # 替换所有匹配
sed -i 's/old/new/g' file.txt  # 直接修改文件
sed '/pattern/d' file.txt      # 删除匹配行
sed -n '5,10p' file.txt        # 打印第5-10行
\`\`\`

### awk — 文本分析工具
\`\`\`bash
awk '{print \$1}' file.txt      # 打印第一列
awk '\$3 > 50 {print \$1}' data.txt  # 条件筛选
awk '{sum+=\$1} END {print sum}' nums.txt  # 求和
\`\`\`

## 2. 排序与去重
\`\`\`bash
sort file.txt                    # 排序
sort -n file.txt                 # 按数值排序
sort -r file.txt                 # 逆序
sort -u file.txt                 # 排序并去重
uniq                             # 去重（需先排序）
uniq -c                          # 统计重复次数
\`\`\`

## 3. 实用数据处理管道
\`\`\`bash
# 统计日志中每种错误出现次数
grep "ERROR" app.log | awk '{print \$5}' | sort | uniq -c | sort -rn

# 找出占用空间最大的10个文件
du -sh * | sort -rh | head -10

# 查看最常用的10条命令
history | awk '{print \$2}' | sort | uniq -c | sort -rn | head -10

# 从 CSV 中提取特定列
cat data.csv | awk -F',' '{print \$1,\$3}'
\`\`\`

## 4. JSON 处理 (jq)
\`\`\`bash
jq '.' data.json                 # 格式化 JSON
jq '.name' data.json             # 提取字段
jq '.items[].name' data.json     # 提取数组元素
jq 'map(select(.price > 10))' data.json  # 筛选
\`\`\`

## 思考练习
1. 用 grep 在 /var/log 中搜索 "error"
2. 用管道统计当前目录下各类文件的扩展名数量
3. 用 awk 计算一个数字文件的总和和平均值

## 总结
grep、sed、awk 是文本处理的三大神器。掌握这些工具后，你可以在几秒钟内完成其他语言需要几十行代码的数据处理任务。
`,

  "metaprogramming": `## 学习目标
- 理解构建系统和任务自动化
- 掌握测试和依赖管理
- 了解基本的 SSH 和安全知识

## 1. 构建系统
构建系统自动化编译、测试、打包过程：
- **Make**: 最经典，用 Makefile 描述依赖关系
- **CMake**: C++ 项目主流
- **npm scripts**: JavaScript 生态
- **Cargo**: Rust 内置

## 2. Makefile 入门
\`\`\`makefile
CC=gcc
CFLAGS=-Wall -O2

main: main.c utils.c
    \$(CC) \$(CFLAGS) -o main main.c utils.c

clean:
    rm -f main *.o

.PHONY: clean
\`\`\`

## 3. 测试
\`\`\`bash
# 测试你的代码
python -m pytest tests/
npm test
cargo test
\`\`\`

## 4. 依赖管理
- **npm** (JavaScript): npm install / package.json
- **pip** (Python): pip install / requirements.txt
- **Cargo** (Rust): Cargo.toml
- **Go modules**: go.mod

## 5. SSH 基础
\`\`\`bash
ssh-keygen -t ed25519          # 生成 SSH 密钥
ssh-copy-id user@host          # 复制公钥到服务器
ssh user@host                  # SSH 登录
scp file.txt user@host:/path/  # 安全复制文件
\`\`\`

## 思考练习
1. 为一个 C 项目编写 Makefile
2. 配置 SSH 密钥登录远程服务器
3. 为项目添加自动化测试

## 总结
构建系统、测试、依赖管理是工程化的基础。SSH 是远程操作和协作的核心工具。
`,

  // ===== CS61A =====
  "introduction": `## 学习目标
- 理解计算机科学的核心思维方式
- 掌握 Python 基本语法
- 理解表达式求值过程

## 1. 计算机科学不是编程
计算机科学是关于**系统化解决问题**的学科，编程只是工具。核心是：
- **抽象**：隐藏细节、关注本质
- **分解**：大问题拆成小问题
- **组合**：小解决方案组装成大方案

## 2. Python 基础

### 表达式
\`\`\`python
42                  # 数字
3.14                # 浮点数
"Hello, World!"     # 字符串
True / False        # 布尔值
\`\`\`

### 算术运算
\`\`\`python
1 + 2       # 3
3 - 1       # 2
2 * 3       # 6
7 / 3       # 2.333...
7 // 3      # 2 (整除)
7 % 3       # 1 (取模)
2 ** 3      # 8 (幂)
\`\`\`

### 名称与赋值
\`\`\`python
x = 5
name = "Alice"
pi = 3.14159
\`\`\`

Python 中名称是对象的引用。\`x = 5\` 相当于把名字 \`x\` 贴到对象 \`5\` 上。

## 3. 解释器如何求值
Python 解释器遵循以下规则：
1. 数字和字符串求值结果是自己
2. 名称求值结果是它绑定的值
3. 调用表达式 \`func(args)\` 先求值函数和参数，然后应用

\`\`\`python
# 调用表达式
max(3, 5)         # 5
pow(2, 10)        # 1024
abs(-3)           # 3
\`\`\`

## 思考练习
1. 计算 (3 + 5) * 2 的值
2. 将你的名字赋值给变量并打印
3. 用 Python 实现华氏度到摄氏度的转换

## 总结
理解表达式求值模型是学习编程的第一步。记住：名称是对象的引用，调用表达式先求值再应用。
`,

  "functions-control": `## 学习目标
- 掌握函数定义和调用
- 理解控制流结构
- 学会函数抽象思维

## 1. 函数定义
函数是程序的基本组织单元：
\`\`\`python
def square(x):
    """返回 x 的平方"""
    return x * x

result = square(5)  # 25
\`\`\`

## 2. 条件语句
\`\`\`python
def absolute(x):
    if x < 0:
        return -x
    elif x == 0:
        return 0
    else:
        return x
\`\`\`

## 3. 循环
\`\`\`python
# while 循环
i = 0
while i < 5:
    print(i)
    i += 1

# for 循环
for i in range(5):
    print(i)

for item in [1, 2, 3]:
    print(item)
\`\`\`

## 4. 函数抽象
好的函数像"黑盒子"——你知道它做什么，不需要知道它怎么做：
\`\`\`python
# 使用抽象：不需要知道排序算法细节
sorted_list = sorted([3, 1, 4, 1, 5])
\`\`\`

## 思考练习
1. 定义函数检查一个数是否为偶数
2. 用循环计算 1 到 100 的和
3. 实现阶乘函数

## 总结
函数是代码组织的核心。条件语句控制执行路径，循环实现重复操作。好的函数只做一件事，做好一件事。
`,

  "higher-order-functions": `## 学习目标
- 理解高阶函数的概念
- 掌握函数作为参数和返回值
- 了解 lambda 表达式

## 1. 函数是一等公民
在 Python 中，函数也是对象：
\`\`\`python
def square(x):
    return x * x

f = square           # 函数赋值给变量
print(f(5))          # 25
print(type(f))       # <class 'function'>
\`\`\`

## 2. 函数作为参数
\`\`\`python
def apply_twice(f, x):
    return f(f(x))

def increment(x):
    return x + 1

apply_twice(increment, 5)  # 7
\`\`\`

## 3. 函数作为返回值
\`\`\`python
def make_adder(n):
    def adder(k):
        return k + n
    return adder

add_3 = make_adder(3)
add_3(5)  # 8
\`\`\`

## 4. Lambda 表达式
\`\`\`python
square = lambda x: x * x
square(5)  # 25

# 常用场景
sorted(pairs, key=lambda p: p[1])
\`\`\`

## 5. 函数装饰器
\`\`\`python
def trace(fn):
    def wrapped(x):
        print(f"调用 {fn.__name__}({x})")
        return fn(x)
    return wrapped

@trace
def square(x): return x * x

square(3)
# 输出: 调用 square(3)
# 结果: 9
\`\`\`

## 思考练习
1. 实现一个函数，接收函数列表和值，依次应用
2. 用 lambda 对列表按字符串长度排序
3. 实现一个计时装饰器

## 总结
高阶函数让代码更灵活可组合。Python 中函数是一等公民，可以作为参数传递和返回值返回。
`,

  "recursion": `## 学习目标
- 理解递归思维方式
- 掌握递归函数的编写
- 学会树递归问题求解

## 1. 什么是递归
递归是函数调用自身的编程技巧。核心是：
1. **基本情况** — 最简单的情况，直接返回
2. **递归情况** — 将问题分解为更小的同类问题

\`\`\`python
def factorial(n):
    if n == 0:        # 基本情况
        return 1
    return n * factorial(n - 1)  # 递归情况
\`\`\`

## 2. 递归思维
把问题交给"别人"去处理：
- 假设 \`factorial(n-1)\` 是正确的
- 用它的结果计算 \`factorial(n)\`
- 确保基本情况正确

## 3. 递归 vs 迭代
\`\`\`python
# 递归
def sum_rec(n):
    if n == 0: return 0
    return n + sum_rec(n - 1)

# 迭代
def sum_iter(n):
    total = 0
    for i in range(n + 1):
        total += i
    return total
\`\`\`

递归代码更接近数学定义，但可能消耗更多内存。

## 4. 树递归
一个函数调用自身多次：
\`\`\`python
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

## 思考练习
1. 用递归实现幂运算
2. 用递归反转字符串
3. 实现汉诺塔问题

## 总结
递归的关键：相信函数会正确处理子问题。基本情况 + 递归情况 = 完整的递归函数。
`,

  "data-abstraction": `## 学习目标
- 理解数据抽象的概念
- 掌握列表、元组、字典的使用
- 学会构建抽象屏障

## 1. 数据抽象
将数据的**表示**与**使用**分离。用户通过接口操作数据，无需了解内部实现。

## 2. 列表
\`\`\`python
nums = [1, 2, 3, 4, 5]
nums[0]        # 1 (索引)
nums[1:3]      # [2, 3] (切片)
len(nums)      # 5
nums.append(6) # 添加元素
\`\`\`

## 3. 元组 (不可变)
\`\`\`python
point = (3, 4)
x, y = point   # 解包
\`\`\`

## 4. 字典 (键值对)
\`\`\`python
student = {"name": "Alice", "age": 20}
student["name"]        # "Alice"
student.get("grade")   # None (安全访问)
student["score"] = 95  # 添加/修改
\`\`\`

## 5. 抽象屏障
\`\`\`python
# 有理数的抽象
def make_rat(n, d):
    return (n, d)

def numer(rat):
    return rat[0]

def denom(rat):
    return rat[1]

def add_rat(x, y):
    return make_rat(
        numer(x) * denom(y) + numer(y) * denom(x),
        denom(x) * denom(y)
    )
\`\`\`

## 思考练习
1. 实现一个栈（push/pop）抽象数据类型
2. 用字典统计文本中单词出现频率
3. 实现复数抽象（实部+虚部）

## 总结
数据抽象是组织大规模程序的基础。通过隐藏实现细节，你可以改变内部实现而不影响使用代码。
`,

  "objects-classes": `## 学习目标
- 理解面向对象编程思想
- 掌握类的定义和使用
- 理解继承和多态

## 1. 面向对象编程
将数据和操作数据的方法封装在一起：
\`\`\`python
class Student:
    def __init__(self, name, age):    # 构造方法
        self.name = name              # 属性
        self.age = age

    def introduce(self):              # 方法
        return f"我是{self.name}，{self.age}岁"

alice = Student("Alice", 20)
print(alice.introduce())
\`\`\`

## 2. 实例 vs 类属性
\`\`\`python
class Dog:
    species = "Canine"    # 类属性（所有实例共享）

    def __init__(self, name):
        self.name = name  # 实例属性（每个实例独有）
\`\`\`

## 3. 继承
\`\`\`python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"
\`\`\`

## 4. 多态
不同类的对象响应相同的方法调用：
\`\`\`python
def make_sound(animal):
    print(animal.speak())

make_sound(Dog())  # Woof!
make_sound(Cat())  # Meow!
\`\`\`

## 思考练习
1. 设计一个银行账户类（存款、取款、查询余额）
2. 设计形状继承体系（Shape → Circle/Rectangle）
3. 实现一个简单的待办事项类

## 总结
OOP 将数据和操作封装在一起。类定义模板，实例是具体对象。继承实现代码复用，多态让代码更灵活。
`,

  "scheme": `## 学习目标
- 理解 Scheme 的简洁语法
- 掌握函数式编程核心概念
- 理解解释器的基本原理

## 1. Scheme 简介
Scheme 是 Lisp 的一种方言，语法极致简洁：
\`\`\`scheme
; 基本表达式
42                  ; 数字
"hello"             ; 字符串
#t                  ; 真
#f                  ; 假

; 调用表达式 (运算符在第一个)
(+ 1 2)             ; 3
(* 3 4)             ; 12
(define x 5)        ; 定义变量
\`\`\`

## 2. 函数定义
\`\`\`scheme
(define (square x)
    (* x x))

(define (factorial n)
    (if (= n 0)
        1
        (* n (factorial (- n 1)))))
\`\`\`

## 3. 列表处理
\`\`\`scheme
(cons 1 '(2 3))      ; (1 2 3)
(car '(1 2 3))       ; 1
(cdr '(1 2 3))       ; (2 3)
(null? '())          ; #t
\`\`\`

## 4. Lambda
\`\`\`scheme
((lambda (x) (* x x)) 5)  ; 25

(define (filter pred lst)
    (if (null? lst)
        '()
        (if (pred (car lst))
            (cons (car lst) (filter pred (cdr lst)))
            (filter pred (cdr lst)))))
\`\`\`

## 思考练习
1. 用 Scheme 实现斐波那契数列
2. 实现 map 函数
3. 理解：为什么函数式编程强调不可变性？

## 总结
Scheme 展示了编程语言的最小核心：表达式、函数定义、条件。理解 Scheme 有助于理解所有编程语言的本质。
`,

  "sql-intro": `## 学习目标
- 理解关系数据库基本概念
- 掌握 SQL 基本查询
- 了解数据持久化

## 1. 关系数据库
数据存储在**表**中，表由**行**和**列**组成：
\`\`\`sql
-- 创建表
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
);

-- 插入数据
INSERT INTO students VALUES (1, 'Alice', 20);
INSERT INTO students VALUES (2, 'Bob', 22);

-- 查询
SELECT * FROM students;
SELECT name FROM students WHERE age > 20;
\`\`\`

## 2. 常用查询
\`\`\`sql
-- 排序
SELECT * FROM students ORDER BY age DESC;

-- 分组统计
SELECT age, COUNT(*) FROM students GROUP BY age;

-- 连接（JOIN）
SELECT s.name, c.course
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;
\`\`\`

## 3. Python + SQLite
\`\`\`python
import sqlite3
conn = sqlite3.connect('school.db')
cursor = conn.cursor()

cursor.execute("SELECT * FROM students")
rows = cursor.fetchall()
for row in rows:
    print(row)
\`\`\`

## 思考练习
1. 创建包含学生和成绩的数据库
2. 查询平均分 > 80 的学生
3. 找出选修最多课程的学生

## 总结
SQL 是数据管理的标准语言。关系模型用表表示数据，用查询操作数据。掌握 SELECT、INSERT、JOIN 即可应对大多数场景。
`,

  // ===== CSAPP =====
  "system-tour": `## 学习目标
- 理解程序从源码到执行的完整过程
- 建立计算机系统的整体视角
- 了解核心硬件组件

## 1. 程序的旅程
一个 C 程序的完整生命周期：

**1. 预处理** → **2. 编译** → **3. 汇编** → **4. 链接** → **5. 加载** → **6. 执行**

### Hello 程序的背后
\`\`\`c
#include <stdio.h>
int main() { printf("hello\\n"); return 0; }
\`\`\`

编译运行的过程：
\`\`\`bash
gcc -o hello hello.c   # 编译（预处理→编译→汇编→链接）
./hello                 # 加载执行
\`\`\`

## 2. 硬件组成
- **CPU** — 执行指令（ALU 运算、控制逻辑）
- **主存** — 存储程序和数据的临时空间（DRAM）
- **总线** — 数据传输通道
- **I/O 设备** — 键盘、鼠标、显示器、磁盘

## 3. 高速缓存
CPU 和主存之间速度差距巨大。解决方法：**缓存（Cache）**
- L1 Cache: ~1ns，几十 KB
- L2 Cache: ~5ns，几百 KB
- L3 Cache: ~15ns，几 MB
- 主存: ~100ns，几十 GB

## 4. 存储器层次结构
\`\`\`
寄存器    < 1ns        ≈ 1KB
L1 缓存   ~ 1ns        ≈ 32KB
L2 缓存   ~ 5ns        ≈ 512KB
L3 缓存   ~ 15ns       ≈ 8MB
主存      ~ 100ns      ≈ 8GB
SSD       ~ 10μs       ≈ 1TB
磁盘      ~ 10ms       ≈ 10TB
\`\`\`

## 思考练习
1. 用 \`gcc -v\` 查看编译过程的详细步骤
2. 用 \`time\` 命令测量程序执行时间
3. 思考：为什么缓存对性能如此重要？

## 总结
计算机系统由 CPU、内存、I/O 组成。从源码到执行经历了预处理、编译、汇编、链接、加载多个阶段。理解硬件架构是写出高效程序的基础。
`,

  "info-representation": `## 学习目标
- 理解数据的二进制表示
- 掌握整数的编码方式
- 理解浮点数的 IEEE 754 标准

## 1. 位与字节
计算机中一切皆比特（0/1）。8 个比特组成一个字节。

\`\`\`text
十进制 42 = 二进制 00101010
\`\`\`

## 2. 整数表示

### 无符号数
所有位都表示数值：
\`\`\`
8位能表示: 0 ~ 255（2^8 - 1）
\`\`\`

### 补码（有符号数）
最高位为符号位（0正1负）：
\`\`\`
8位补码范围: -128 ~ 127
-1 的补码: 11111111
\`\`\`

**为什么用补码？** 因为 CPU 可以用同一套加法电路处理加减法。

### 常见陷阱
\`\`\`c
// 整数溢出
unsigned char x = 255;
x++;  // x 变成 0！（回绕）

// 有符号溢出
char y = 127;
y++;  // y 变成 -128（未定义行为！）
\`\`\`

## 3. 浮点数 IEEE 754

\`\`\`
float (32位):  1位符号 + 8位指数 + 23位尾数
double (64位): 1位符号 + 11位指数 + 52位尾数
\`\`\`

为什么 0.1 + 0.2 != 0.3？
\`\`\`python
0.1 + 0.2  # 0.30000000000000004
\`\`\`
因为十进制小数无法精确表示为二进制小数。

## 思考练习
1. 计算 -5 的 8 位补码表示
2. 验证 0.1 + 0.2 在 C/Python 中的结果
3. 找出整数溢出的实际场景

## 总结
数据在计算机中都以二进制表示。整数用补码，浮点数用 IEEE 754。理解这些是避免数值计算错误的基础。
`,

  "machine-level": `## 学习目标
- 能够阅读 x86-64 汇编代码
- 理解 C 代码如何翻译为机器指令
- 了解栈帧结构

## 1. x86-64 寄存器
\`\`\`
%rax - 返回值     %rbx - 被调用者保存
%rcx - 第4参数    %rdx - 第3参数
%rsi - 第2参数    %rdi - 第1参数
%rsp - 栈指针     %rbp - 基址指针（可选）
%r8  - 第5参数    %r9  - 第6参数
\`\`\`

## 2. 基本指令
\`\`\`asm
movq %rax, %rbx    # 复制 rax 到 rbx
addq %rax, %rbx    # rbx += rax
subq %rax, %rbx    # rbx -= rax
imulq %rax, %rbx   # rbx *= rax
cmpq %rax, %rbx    # 比较 rax 和 rbx
jne label          # 不相等则跳转
call func          # 调用函数
ret                # 返回
\`\`\`

## 3. 函数调用栈
\`\`\`c
int add(int a, int b) {
    return a + b;
}
\`\`\`

对应的汇编：
\`\`\`asm
add:
    movl %edi, %eax    # 第1参数到 eax
    addl %esi, %eax    # eax += 第2参数
    ret                # 返回
\`\`\`

## 4. 栈帧
调用函数时：
1. 参数放入寄存器（或压栈）
2. 返回地址压栈
3. 被调用者分配局部变量空间
4. 执行函数体
5. 恢复栈指针，ret 返回

## 思考练习
1. 用 \`gcc -S\` 编译 C 文件查看汇编
2. 识别函数调用的 prologue/epilogue
3. 解释为什么栈溢出是常见的安全漏洞

## 总结
汇编是 C 语言的"真实面目"。理解汇编可以帮你写出更高效的代码，也是调试和理解安全漏洞的基础。
`,

  "processor-architecture": `## 学习目标
- 理解 CPU 的基本工作方式
- 了解流水线的概念
- 掌握基本的性能优化

## 1. 指令周期
CPU 执行指令的过程：
1. **取指** (Fetch) — 从内存读取指令
2. **译码** (Decode) — 解析指令类型
3. **执行** (Execute) — ALU 运算
4. **访存** (Memory) — 读/写内存
5. **写回** (Write-back) — 保存结果

## 2. 单周期 vs 流水线
**单周期**：每条指令在一个周期内执行完所有步骤
- 简单但慢（周期宽度=最慢指令）

**流水线**：将指令分为多个阶段，重叠执行
\`\`\`
单周期: [IF-DEC-EX-MEM-WB] [IF-DEC-EX-MEM-WB] ...
流水线: [IF] [IF] [IF] [IF]
         [DEC] [DEC] [DEC]
         [EX]  [EX]  [EX]
         [MEM] [MEM] [MEM]
         [WB]  [WB]  [WB]
\`\`\`

## 3. 流水线冒险
- **结构冒险**: 硬件资源冲突
- **数据冒险**: 一条指令依赖上条结果
- **控制冒险**: 分支跳转不确定

**解决方法**：插入气泡、转发（Forwarding）、分支预测。

## 思考练习
1. 解释为什么流水线提高了吞吐量
2. 举例说明数据冒险的产生和解决
3. 分析：分支预测错误对性能的影响

## 总结
流水线是现代 CPU 性能的关键。理解流水线机制有助于写出对 CPU 友好的代码。
`,

  "optimization": `## 学习目标
- 掌握编译器优化方法
- 理解优化限制
- 学会手动优化代码

## 1. 编译器优化等级
\`\`\`bash
gcc -O0 program.c      # 不优化（最快编译）
gcc -O1 program.c      # 基础优化
gcc -O2 program.c      # 推荐（性能/编译时间平衡）
gcc -O3 program.c      # 激进优化
gcc -Ofast program.c   # 超激进（可能破坏标准）
\`\`\`

## 2. 代码优化技巧

### 消除循环不变式
\`\`\`c
// 慢 - 每次循环都计算
for (i = 0; i < n; i++)
    a[i] = x * y * z;

// 快 - 提到循环外
int product = x * y * z;
for (i = 0; i < n; i++)
    a[i] = product;
\`\`\`

### 减少函数调用
\`\`\`c
// 慢
for (i = 0; i < strlen(s); i++)
    s[i] = toupper(s[i]);

// 快
int len = strlen(s);
for (i = 0; i < len; i++)
    s[i] = toupper(s[i]);
\`\`\`

### 循环展开
\`\`\`c
// 原始
for (i = 0; i < n; i++)
    sum += a[i];

// 2路展开
for (i = 0; i < n-1; i += 2) {
    sum += a[i] + a[i+1];
}
\`\`\`

## 3. 缓存友好代码
\`\`\`c
// 缓存友好（按行访问）
for (i = 0; i < n; i++)
    for (j = 0; j < n; j++)
        sum += a[i][j];

// 缓存不友好（按列访问）
for (j = 0; j < n; j++)
    for (i = 0; i < n; i++)
        sum += a[i][j];
\`\`\`

## 思考练习
1. 用不同优化等级编译并对比性能
2. 优化一个矩阵乘法程序
3. 测量缓存友好和不友好代码的差异

## 总结
编译器优化有限（不能改变程序行为）。编写缓存友好、减少冗余计算的代码是程序员的责任。
`,

  "memory-hierarchy": `## 学习目标
- 理解缓存的工作原理
- 掌握局部性原理
- 学会编写缓存友好的代码

## 1. 局部性原理
- **时间局部性**: 最近访问的数据很快会再被访问
- **空间局部性**: 访问了某个地址，附近的地址也会被访问

## 2. 缓存结构
\`\`\`
CPU → L1(32KB) → L2(512KB) → L3(8MB) → 主存(8GB)
\`\`\`

## 3. 缓存映射方式
- **直接映射**: 每个内存块映射到固定缓存行
- **组相联**: 每个内存块映射到一组缓存行
- **全相联**: 每个内存块可映射到任意缓存行

## 4. 编写缓存友好代码
\`\`\`c
// 好: 行优先遍历 (空间局部性好)
for (int i = 0; i < N; i++)
    for (int j = 0; j < M; j++)
        sum += a[i][j];

// 坏: 列优先遍历 (空间局部性差)
for (int j = 0; j < M; j++)
    for (int i = 0; i < N; i++)
        sum += a[i][j];
\`\`\`

## 思考练习
1. 用不同步长遍历数组，测量性能差异
2. 对比行优先和列优先的性能差异
3. 设计一个测试程序验证缓存大小

## 总结
存储器层次结构利用局部性原理缩小速度差距。编写缓存友好的代码是性能优化的核心。
`,

  "linking": `## 学习目标
- 理解链接器的作用
- 掌握符号解析和重定位
- 区分静态链接和动态链接

## 1. 链接器的作用
将多个目标文件合并为可执行文件：
1. **符号解析** — 将每个符号引用绑定到定义
2. **重定位** — 给符号分配最终地址

## 2. 目标文件
\`\`\`bash
# 编译为目标文件
gcc -c main.c utils.c
# 链接为可执行文件
gcc -o program main.o utils.o
\`\`\`

## 3. 静态链接 vs 动态链接
**静态链接** (.a/.lib)：所有代码复制到可执行文件
- 优点：独立运行、速度快
- 缺点：文件大、更新需重新链接

**动态链接** (.so/.dll)：运行时加载共享库
- 优点：文件小、库可共享更新
- 缺点：依赖库需存在

\`\`\`bash
gcc -static -o prog main.o   # 静态链接
gcc -o prog main.o -lm       # 动态链接数学库
\`\`\`

## 4. 常见链接错误
- 符号未定义（忘记包含文件或链接库）
- 符号重定义（重复定义）
- 库顺序错误（链接器从左到右扫描）

## 思考练习
1. 编译多文件程序，分别使用静态和动态链接
2. 对比生成文件的大小差异
3. 故意的链接错误看错误信息

## 总结
链接器将多个目标文件合并。静态链接独立性好，动态链接共享性好。理解链接过程有助于解决编译错误和优化程序体积。
`,

  "exception-control": `## 学习目标
- 理解异常控制流
- 区分中断、陷阱、故障、终止
- 掌握信号机制

## 1. 异常控制流
处理器在正常指令流之外检测到状态变化时触发异常：
- **中断** — 来自外部设备（异步）
- **陷阱** — 系统调用（有意触发）
- **故障** — 可恢复错误（缺页）
- **终止** — 不可恢复错误

## 2. 信号
Unix 信号是一种软件异常：
\`\`\`bash
kill -9 PID          # SIGKILL
Ctrl+C               # SIGINT
Ctrl+Z               # SIGTSTP
\`\`\`

\`\`\`c
#include <signal.h>
void handler(int sig) {
    printf("收到信号 %d\\n", sig);
}
signal(SIGINT, handler);
\`\`\`

## 3. setjmp/longjmp
\`\`\`c
#include <setjmp.h>
jmp_buf buf;
if (setjmp(buf) == 0) {
    // 正常路径
} else {
    // 错误恢复路径
}
longjmp(buf, 1);  // 跳回 setjmp
\`\`\`

## 思考练习
1. 编写程序捕获 Ctrl+C
2. 使用信号实现超时功能
3. 比较异常、信号、setjmp 的适用场景

## 总结
异常控制流是处理器和操作系统响应事件的核心机制。信号是 Unix 中的软件异常，setjmp/longjmp 实现非本地跳转。
`,

  "virtual-memory": `## 学习目标
- 理解虚拟内存的概念
- 掌握地址翻译过程
- 了解页表的作用

## 1. 虚拟内存的抽象
每个程序看到独立的**虚拟地址空间**，操作系统和硬件将其映射到**物理内存**：
- **虚拟地址**：程序使用的地址（0 ~ 2^48-1）
- **物理地址**：实际内存芯片的地址

**好处**：
- 内存隔离（程序不能访问其他程序的内存）
- 简化编程（每个程序都有巨大连续空间）
- 高效利用（共享物理页、按需加载）

## 2. 分页机制
虚拟内存以**页**为单位映射：
\`\`\`
虚拟地址: [虚拟页号(VPN)] [页内偏移]
              ↓ 页表查找
物理地址: [物理页号(PPN)] [页内偏移]
\`\`\`

## 3. TLB (快表)
TLB 是地址翻译的缓存，加速虚拟地址到物理地址的转换：
- TLB 命中: < 1ns
- TLB 未命中: 10-100ns（硬件遍历页表或查页表）

## 4. mmap
\`\`\`c
#include <sys/mman.h>

// 内存映射文件
void *ptr = mmap(NULL, size, PROT_READ|PROT_WRITE,
                 MAP_PRIVATE, fd, 0);

// 释放映射
munmap(ptr, size);
\`\`\`

## 思考练习
1. 用 mmap 实现文件复制
2. 查看进程的内存映射（/proc/self/maps）
3. 计算：2级页表 vs 3级页表的内存开销

## 总结
虚拟内存是现代计算机最强大的抽象之一。它为每个程序提供独立地址空间，通过页表和 TLB 高效映射到物理内存。
`,

  "io-concurrency": `## 学习目标
- 理解 Unix I/O 模型
- 掌握进程和线程的基本使用
- 了解并发编程基础

## 1. Unix I/O
\`\`\`c
#include <unistd.h>
#include <fcntl.h>

int fd = open("file.txt", O_RDONLY);
char buf[1024];
ssize_t n = read(fd, buf, sizeof(buf));
close(fd);
\`\`\`

## 2. 进程
\`\`\`c
#include <unistd.h>

pid_t pid = fork();
if (pid == 0) {
    // 子进程
} else {
    // 父进程
}
\`\`\`

## 3. 线程
\`\`\`c
#include <pthread.h>

void *worker(void *arg) {
    printf("线程工作\\n");
    return NULL;
}

pthread_t tid;
pthread_create(&tid, NULL, worker, NULL);
pthread_join(tid, NULL);
\`\`\`

## 思考练习
1. 使用 fork 创建多进程
2. 使用 pthread 创建多线程
3. 理解进程和线程的区别

## 总结
进程提供独立的内存空间，线程共享内存空间。Unix I/O 以文件描述符为核心。并发编程需要妥善处理同步问题。
`,

  // ===== CS61B =====
  "java-basics": `## 学习目标
- 掌握 Java 基本语法
- 理解引用类型和基本类型的区别
- 了解内存管理基础

## 1. Java 程序结构
\`\`\`java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## 2. 基本类型 vs 引用类型
- **基本类型**: int, double, boolean, char — 直接存储值
- **引用类型**: 数组、对象 — 存储地址（引用）

\`\`\`java
int x = 5;                // x 直接存 5
int[] arr = new int[3];   // arr 存储数组对象的地址
\`\`\`

**关键区别**：赋值时，基本类型复制值，引用类型复制引用。

## 3. 对象
\`\`\`java
public class Student {
    String name;
    int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("我是" + name);
    }
}
\`\`\`

## 思考练习
1. 编写一个 Point 类（x, y 坐标）
2. 验证基本类型和引用类型的赋值区别
3. 创建对象数组并遍历

## 总结
Java 是静态类型语言。基本类型存值，引用类型存地址。类是对象的模板。
`,

  "linked-lists": `## 学习目标
- 理解链表的结构
- 掌握单链表和双链表的实现
- 比较链表和数组的性能

## 1. 链表的定义
链表由**节点**组成，每个节点包含**数据**和指向下一个节点的**指针**：
\`\`\`java
public class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
\`\`\`

## 2. 基本操作
\`\`\`java
// 插入头部
ListNode newNode = new ListNode(1);
newNode.next = head;
head = newNode;

// 遍历
ListNode curr = head;
while (curr != null) {
    System.out.println(curr.val);
    curr = curr.next;
}

// 删除节点
prev.next = prev.next.next;
\`\`\`

## 3. 链表 vs 数组
| 操作 | 数组 | 链表 |
|------|------|------|
| 随机访问 | O(1) | O(n) |
| 插入头部 | O(n) | O(1) |
| 删除头部 | O(n) | O(1) |
| 空间开销 | 小 | 每个节点多一个指针 |

## 思考练习
1. 实现双链表（每个节点有 prev 和 next）
2. 反转单链表
3. 检测链表是否有环

## 总结
链表适合频繁插入删除的场景。数组适合随机访问的场景。选择正确的数据结构取决于具体需求。
`,

  "stacks-queues": `## 学习目标
- 理解栈和队列的特性
- 掌握它们的实现方式
- 学会应用场景

## 1. 栈 (Stack) — 后进先出 (LIFO)
\`\`\`java
// 数组实现
public class Stack {
    private int[] arr = new int[100];
    private int top = -1;

    void push(int x) { arr[++top] = x; }
    int pop() { return arr[top--]; }
    boolean isEmpty() { return top == -1; }
}
\`\`\`

## 2. 队列 (Queue) — 先进先出 (FIFO)
\`\`\`java
// 链表实现
public class Queue {
    private ListNode head, tail;

    void enqueue(int x) {
        ListNode node = new ListNode(x);
        if (tail != null) tail.next = node;
        tail = node;
        if (head == null) head = tail;
    }

    int dequeue() {
        int val = head.val;
        head = head.next;
        if (head == null) tail = null;
        return val;
    }
}
\`\`\`

## 应用场景
- **栈**: 函数调用（调用栈）、表达式求值、撤销操作
- **队列**: BFS、任务调度、消息队列

## 思考练习
1. 用两个栈实现队列
2. 用栈检查括号是否匹配
3. 实现循环队列

## 总结
栈和队列是最基础的线性数据结构。栈用于需要"回溯"的场景，队列用于需要"排队"的场景。
`,

  "trees": `## 学习目标
- 理解树的基本概念
- 掌握二叉树的遍历方式
- 了解二叉搜索树

## 1. 树的定义
树是**层次结构**的数据结构：
\`\`\`java
public class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
\`\`\`

## 2. 二叉树遍历
\`\`\`java
// 前序: 根 → 左 → 右
void preorder(TreeNode root) {
    if (root == null) return;
    System.out.println(root.val);
    preorder(root.left);
    preorder(root.right);
}

// 中序: 左 → 根 → 右（BST 中序是有序的）
void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.println(root.val);
    inorder(root.right);
}

// 后序: 左 → 右 → 根
void postorder(TreeNode root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.println(root.val);
}
\`\`\`

## 思考练习
1. 实现二叉树层序遍历（BFS）
2. 计算二叉树的高度
3. 判断二叉树是否对称

## 总结
树是表示层级关系的标准结构。三种深度优先遍历方式的核心区别在于访问根的顺序。
`,

  "balanced-trees": `## 学习目标
- 理解平衡树的意义
- 了解红黑树和 B 树

## 1. 为什么需要平衡？
普通 BST 在极端情况下退化为链表（插入有序数据），时间复杂度从 O(log n) 退化为 O(n)。

**平衡树通过旋转保持树的高度为 O(log n)**。

## 2. B 树
B 树是多路搜索树，每个节点可以有多个孩子和关键字：
- **B+ 树**: 所有数据在叶子节点，内部节点只存索引
- 广泛用于数据库索引和文件系统
- 一个节点通常等于一个磁盘块大小

## 思考练习
1. 理解为什么平衡树的操作为 O(log n)
2. 对比二叉搜索树和 B 树的差别
3. 分析数据库为什么用 B+ 树而不是 BST

## 总结
平衡树通过旋转等操作保持树的平衡。B 树和 B+ 树是实际系统中（数据库、文件系统）最广泛使用的索引结构。
`,

  "hash-tables": `## 学习目标
- 理解哈希表的工作原理
- 掌握冲突解决策略
- 了解哈希函数设计

## 1. 哈希表原理
哈希表通过**哈希函数**将键映射到数组索引，实现近似 O(1) 的查找速度。

\`\`\`java
// 简单哈希表
class HashMap {
    private Entry[] buckets = new Entry[16];

    void put(String key, int value) {
        int idx = key.hashCode() % buckets.length;
        // 链地址法处理冲突
        Entry entry = new Entry(key, value);
        entry.next = buckets[idx];
        buckets[idx] = entry;
    }
}
\`\`\`

## 2. 冲突解决
- **链地址法**: 每个桶存链表（HashMap 默认方式）
- **开放地址法**: 冲突时找下一个空位
- **再哈希**: 用另一个哈希函数

## 3. 哈希函数
好的哈希函数应该：
- 均匀分布（减少冲突）
- 计算快速
- 确定性（相同输入相同输出）

## 思考练习
1. 实现一个哈希表并测试冲突
2. 分析为什么 HashMap 的负载因子通常是 0.75
3. 设计一个哈希函数用于字符串

## 总结
哈希表提供均摊 O(1) 的查找性能。Java 的 HashMap 使用链地址法 + 红黑树优化（冲突多时链表转树）。
`,

  "priority-queues": `## 学习目标
- 理解优先队列的概念
- 掌握堆的实现
- 了解堆排序

## 1. 优先队列
元素按优先级出队，而非按入队顺序。

## 2. 二叉堆
最大堆：父节点 ≥ 子节点
最小堆：父节点 ≤ 子节点
\`\`\`java
// 最小堆实现（数组存储）
class MinHeap {
    private int[] heap;
    private int size;

    // 插入: 加到末尾，上浮
    void insert(int x) {
        heap[++size] = x;
        int i = size;
        while (i > 1 && heap[i] < heap[i/2]) {
            swap(i, i/2);
            i /= 2;
        }
    }

    // 删除最小值: 堆顶与末尾交换，下沉
    int extractMin() {
        int min = heap[1];
        heap[1] = heap[size--];
        int i = 1;
        while (2*i <= size) {
            int child = 2*i;
            if (child+1 <= size && heap[child+1] < heap[child])
                child++;
            if (heap[i] <= heap[child]) break;
            swap(i, child);
            i = child;
        }
        return min;
    }
}
\`\`\`

## 思考练习
1. 实现最大堆
2. 用堆实现优先队列
3. 实现堆排序算法

## 总结
堆是优先队列的经典实现。插入和删除都是 O(log n)。堆排序是原地排序算法。
`,

  "graph-intro": `## 学习目标
- 理解图的表示方式
- 掌握 DFS 和 BFS
- 了解最短路径问题

## 1. 图的表示
\`\`\`java
// 邻接表
List<Integer>[] graph = new ArrayList[n];
for (int i = 0; i < n; i++)
    graph[i] = new ArrayList<>();

graph[0].add(1);  // 0 → 1

// 邻接矩阵
boolean[][] matrix = new boolean[n][n];
matrix[0][1] = true;
\`\`\`

## 2. DFS（深度优先搜索）
\`\`\`java
void dfs(int v, boolean[] visited) {
    visited[v] = true;
    for (int w : graph[v]) {
        if (!visited[w]) dfs(w, visited);
    }
}
\`\`\`

## 3. BFS（广度优先搜索）
\`\`\`java
void bfs(int start) {
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visited = new boolean[n];
    queue.offer(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
        int v = queue.poll();
        for (int w : graph[v]) {
            if (!visited[w]) {
                queue.offer(w);
                visited[w] = true;
            }
        }
    }
}
\`\`\`

## 思考练习
1. 用 DFS 检测图中是否有环
2. 用 BFS 计算无权图的最短路径
3. 实现拓扑排序

## 总结
图是最通用的数据结构之一。DFS 用栈（递归），BFS 用队列。邻接表适用于稀疏图，邻接矩阵适用于稠密图。
`,

  "sorting": `## 学习目标
- 理解主流排序算法
- 掌握时间/空间复杂度分析
- 了解排序算法的稳定性

## 1. 排序算法概览
| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定 |
|------|----------|----------|------|------|
| 冒泡 | O(n²) | O(n²) | O(1) | 是 |
| 选择 | O(n²) | O(n²) | O(1) | 否 |
| 插入 | O(n²) | O(n²) | O(1) | 是 |
| 归并 | O(n log n) | O(n log n) | O(n) | 是 |
| 快速 | O(n log n) | O(n²) | O(log n) | 否 |
| 堆排 | O(n log n) | O(n log n) | O(1) | 否 |

## 2. 快速排序
\`\`\`java
void quicksort(int[] arr, int lo, int hi) {
    if (lo >= hi) return;
    int pivot = partition(arr, lo, hi);
    quicksort(arr, lo, pivot - 1);
    quicksort(arr, pivot + 1, hi);
}
\`\`\`

## 3. 归并排序
\`\`\`java
void mergesort(int[] arr, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergesort(arr, lo, mid);
    mergesort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}
\`\`\`

## 思考练习
1. 实现所有排序算法并对比性能
2. 分析为什么快速排序在实践中最快
3. 实现一个稳定的排序

## 总结
没有最好的排序算法，只有最适合场景的排序算法。快速排序综合性能最优，归并排序稳定，堆排序最省空间。
`,

  // ===== 6.006 =====
  "algorithm-analysis": `## 学习目标
- 掌握渐近分析符号
- 理解递归分析
- 学会复杂度分析方法

## 1. 渐近分析
描述算法效率随输入规模增长的关系：
- **O** (上界): f(n) ≤ c·g(n)
- **Ω** (下界): f(n) ≥ c·g(n)
- **Θ** (紧界): c₁·g(n) ≤ f(n) ≤ c₂·g(n)

## 2. 常见复杂度
\`\`\`
O(1)    常数时间    数组访问、哈希表查找
O(log n) 对数时间   二分查找
O(n)    线性时间    遍历数组
O(n log n)         快速排序、归并排序
O(n²)   平方时间    冒泡排序
O(2^n)  指数时间    斐波那契(朴素)
O(n!)   阶乘时间    旅行商(朴素)
\`\`\`

## 3. 递归分析 — 主定理
对于递推式 T(n) = aT(n/b) + f(n)：
- 若 f(n) = O(n^(log_b(a)-ε))，则 T(n) = Θ(n^(log_b(a)))
- 若 f(n) = Θ(n^(log_b(a)))，则 T(n) = Θ(n^(log_b(a))·log n)
- 若 f(n) = Ω(n^(log_b(a)+ε))，则 T(n) = Θ(f(n))

## 思考练习
1. 分析二分查找的时间复杂度
2. 用主定理分析归并排序 T(n) = 2T(n/2) + O(n)
3. 比较 O(n²) 和 O(n log n) 在 n=1000 时的差异

## 总结
渐近分析忽略常数和低阶项，关注算法效率的增长趋势。主定理是递归分析的有力工具。
`,

  "divide-conquer": `## 学习目标
- 理解分治策略
- 掌握分治递归分析
- 学会分治的应用

## 1. 分治三步骤
1. **分解** — 将问题分为子问题
2. **解决** — 递归解决子问题
3. **合并** — 合并子问题结果

## 2. 归并排序
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
\`\`\`
复杂度：T(n) = 2T(n/2) + O(n) = O(n log n)

## 3. 最大子数组问题
找出数组中连续和最大的子数组。
- 暴力：O(n²)
- 分治：O(n log n)
- Kadane 算法：O(n)

## 思考练习
1. 用分治实现快速幂
2. 解决逆序对计数问题
3. 实现最近点对问题的分治解法

## 总结
分治将大问题分解为小问题。归并排序和快速排序都是分治策略的典型应用。
`,

  "dynamic-programming": `## 学习目标
- 理解动态规划的核心思想
- 掌握状态定义和转移方程
- 学会 DP 问题分析

## 1. 什么是动态规划
DP 通过**记忆化**避免重复计算，将指数级问题优化为多项式时间。

**两大特征**：
1. **最优子结构** — 大问题的最优解包含子问题的最优解
2. **重叠子问题** — 不同子问题共享子子问题

## 2. 斐波那契数列
\`\`\`python
# 朴素递归: O(2^n)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# DP: O(n)
def fib_dp(n):
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

## 3. 背包问题
\`\`\`python
def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(1, W+1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i-1][w-weights[i-1]] + values[i-1]
                )
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][W]
\`\`\`

## 思考练习
1. 用 DP 解决最长公共子序列问题
2. 实现编辑距离算法
3. 解决硬币找零问题

## 总结
DP 是分治 + 记忆化。核心：定义状态 → 写出转移方程 → 确定边界 → 实现。
`,

  "greedy": `## 学习目标
- 理解贪心策略
- 掌握贪心的正确性证明
- 区分贪心和 DP

## 1. 贪心算法
每一步做出**当前最优**选择，期望全局最优。

## 2. 活动选择
选择最多数量的不重叠活动：
\`\`\`python
def activity_selection(start, finish):
    n = len(start)
    activities = sorted(zip(start, finish), key=lambda x: x[1])
    selected = [activities[0]]
    last_end = activities[0][1]
    for i in range(1, n):
        if activities[i][0] >= last_end:
            selected.append(activities[i])
            last_end = activities[i][1]
    return selected
\`\`\`

## 3. 哈夫曼编码
贪心构建最优前缀码，用于数据压缩。

## 4. 贪心 vs DP
- **贪心**: 局部最优 → 全局最优（如 Dijkstra）
- **DP**: 考虑所有可能

## 思考练习
1. 实现找零问题的贪心解法
2. 分析什么场景贪心不是最优
3. 实现最小生成树的 Kruskal 算法

## 总结
贪心算法简单高效，但需要证明正确性。不是所有问题都能用贪心解决，这时需要 DP。
`,

  "graph-algorithms": `## 学习目标
- 掌握最短路径算法
- 理解最小生成树
- 了解拓扑排序

## 1. Dijkstra 最短路径
\`\`\`python
import heapq

def dijkstra(graph, start):
    dist = {v: float('inf') for v in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, v = heapq.heappop(pq)
        if d > dist[v]: continue
        for w, wd in graph[v]:
            nd = d + wd
            if nd < dist[w]:
                dist[w] = nd
                heapq.heappush(pq, (nd, w))
    return dist
\`\`\`
O((V+E) log V) — 使用优先队列

## 2. 最小生成树
**Kruskal**：按边权重排序，用并查集选边
**Prim**：类似 Dijkstra，从点扩展

## 思考练习
1. 实现 Dijkstra 算法
2. 实现 Kruskal 最小生成树
3. 理解 Bellman-Ford 为什么能处理负权边

## 总结
Dijkstra 解决单源最短路径（无负权边）。最小生成树连接所有顶点且总权重最小。
`,

  "np-complete": `## 学习目标
- 理解 P 和 NP 的概念
- 了解 NP 完全问题
- 学会遇到难解问题的应对策略

## 1. P 和 NP
- **P**: 能在多项式时间解决的问题
- **NP**: 能在多项式时间验证解的问题

P ⊆ NP，但 P = NP？这是计算机科学最大的未解问题之一。

## 2. NP 完全
问题满足：
1. 属于 NP
2. 所有 NP 问题能归约到它

典型 NP 完全问题：
- 3-SAT、图着色、旅行商、背包、顶点覆盖

## 3. 应对策略
遇到 NP 完全问题时不追求最优解，而是：
- 近似算法（多项式时间，保证近似比）
- 启发式搜索（模拟退火、遗传算法）
- 参数化算法（固定参数可解）
- 特殊限制（特殊图结构可解）

## 思考练习
1. 理解归约的概念
2. 证明顶点覆盖是 NP 完全
3. 设计旅行商问题的近似算法

## 总结
P vs NP 是理论计算机科学的核心难题。了解 NP 完全性能帮你识别难解问题并选择合适的应对策略。
`,

  // ===== 6.S081 =====
  "os-intro": `## 学习目标
- 理解操作系统的核心职责
- 了解 xv6 的整体架构
- 建立 OS 的整体视角

## 1. 操作系统的职责
- **资源管理**: CPU、内存、磁盘的分配和回收
- **抽象**: 提供进程、文件、地址空间等抽象
- **隔离**: 不同程序互不干扰
- **通信**: 进程间数据交换

## 2. xv6 架构
xv6 是 MIT 为教学设计的类 Unix 操作系统，运行在 RISC-V 上：
- **内核态**: 操作系统代码运行的特权模式
- **用户态**: 应用程序运行的非特权模式
- **系统调用**: 用户态到内核态的入口

## 思考练习
1. 分析操作系统的主要功能模块
2. 比较不同操作系统的设计哲学
3. 理解用户态和内核态的区别

## 总结
OS 是资源管理器和抽象提供者。xv6 简洁完整，是学习操作系统原理的最佳起点。
`,

  "syscalls-traps": `## 学习目标
- 理解系统调用的完整过程
- 掌握 trap 机制
- 了解 xv6 的系统调用实现

## 1. 系统调用流程
1. 用户程序调用库函数（如 write）
2. 库函数触发 **ecall** 指令
3. CPU 切换到内核态
4. 内核处理调用
5. 返回用户态

## 2. 关键机制
- **ecall**: RISC-V 指令，触发环境调用异常
- **trampoline**: 用户和内核页表切换的跳板
- **trapframe**: 保存和恢复寄存器状态

## 思考练习
1. 追踪一个 write 系统调用的完整路径
2. 理解 trapframe 的结构
3. 分析系统调用的性能开销来源

## 总结
系统调用是用户程序进入内核的唯一入口。trap 机制（ecall → 内核处理 → 返回）是核心路径。
`,

  "process-scheduling": `## 学习目标
- 理解进程的状态模型
- 掌握调度算法
- 了解 xv6 的调度实现

## 1. 进程状态
- **运行中**: 正在使用 CPU
- **就绪**: 等待 CPU
- **阻塞**: 等待 I/O 或其他事件

## 2. 调度算法
- **Round Robin (RR)**: 时间片轮转，公平
- **MLFQ**: 多级反馈队列，兼顾公平和优先级
- **CFS**: 完全公平调度，Linux 使用

## 3. xv6 调度
xv6 使用简单的轮转调度：
- \`scheduler()\` 循环遍历进程表
- 每个进程一个时间片
- 上下文切换通过 \`swtch\` 函数

## 思考练习
1. 模拟不同调度算法的行为
2. 分析时间片大小对性能的影响
3. 理解上下文切换的开销

## 总结
进程调度在多任务系统中至关重要。xv6 用轮转调度实现了基本的进程切换和时间分配。
`,

  "virtual-memory-os": `## 学习目标
- 理解 RISC-V 分页机制
- 掌握 xv6 的虚拟内存布局
- 了解页表管理

## 1. RISC-V 分页
Sv39 分页：39 位虚拟地址，三级页表
\`\`\`
虚拟地址: [9位L2] [9位L1] [9位L0] [12位偏移]
\`\`\`

## 2. xv6 地址空间布局
\`\`\`
0x0000000000000000 - 用户空间
0x0000000080000000 - 内核文本
0x0000000088000000 - 内核数据
0xFFFFFFFF88000000 - 设备寄存器
\`\`\`

## 思考练习
1. 理解三级页表的地址翻译过程
2. 分析 COW（写时复制）的实现
3. 对比 xv6 和 Linux 的内存管理

## 总结
RISC-V Sv39 使用三级页表管理虚拟地址。xv6 将内核映射到每个进程的地址空间高地址部分。
`,

  "interrupts-drivers": `## 学习目标
- 理解中断机制
- 掌握设备驱动架构
- 了解 xv6 的设备驱动实现

## 1. 中断 vs 轮询
- **中断**: 设备主动通知 CPU（事件驱动）
- **轮询**: CPU 反复检查设备状态（忙等待）

## 2. xv6 设备驱动
**UART 驱动**: 控制台输入输出
- 发送：向 THR 寄存器写数据
- 接收：读取 RHR 寄存器
- 中断处理：\`uartintr()\`

**磁盘驱动**: virtio 磁盘
- 通过描述符队列与设备通信
- DMA 传输数据

## 思考练习
1. 理解中断处理流程
2. 比较中断和轮询的优劣
3. 编写简单的字符设备驱动

## 总结
中断让 CPU 能异步响应设备事件。设备驱动是 OS 与硬件之间的翻译官。
`,

  "file-system": `## 学习目标
- 理解文件系统的层次设计
- 掌握 xv6 文件系统架构
- 了解日志恢复

## 1. xv6 文件系统层次
\`\`\`
文件描述符层 → 路径名层 → 目录层 →
inode 层 → 日志层 → 缓冲区缓存层 → 磁盘
\`\`\`

## 2. inode
每个文件/目录对应一个 inode：
\`\`\`
struct inode {
    uint type;    // 文件/目录/设备
    uint nlink;   // 硬链接数
    uint size;    // 文件大小
    uint addrs[NDIRECT+1]; // 数据块地址
};
\`\`\`

## 3. 日志
日志保证崩溃后的一致性：
1. 写操作先写入日志
2. 提交日志（标记完成）
3. 将日志写入实际位置

## 思考练习
1. 在 xv6 中添加新的系统调用
2. 理解文件描述符表、打开文件表、inode 表三层结构
3. 测试崩溃恢复机制

## 总结
文件系统通过层次化设计管理持久化数据。日志是保证崩溃后一致性的核心机制。
`,

  "ipc-sync": `## 学习目标
- 理解进程间通信机制
- 掌握同步原语
- 了解 xv6 的锁实现

## 1. 管道
\`\`\`c
int p[2];
pipe(p);
if (fork() == 0) {
    write(p[1], "hello", 5);
} else {
    read(p[0], buf, 5);
}
\`\`\`

## 2. 信号量
\`\`\`c
struct semaphore {
    int value;
    struct spinlock lk;
    struct proc *wait_queue[NPROC];
};

void acquire(struct semaphore *s) {
    acquire_spinlock(&s->lk);
    while (s->value <= 0) {
        // 加入等待队列并阻塞
    }
    s->value--;
    release_spinlock(&s->lk);
}
\`\`\`

## 3. xv6 的锁
- **自旋锁**: 短时间等待（多核保护）
- **睡眠锁**: 长时间等待（I/O 操作）

## 思考练习
1. 用管道实现父子进程通信
2. 分析死锁产生的条件
3. 比较自旋锁和睡眠锁的适用场景

## 总结
IPC 和同步是多进程/多线程编程的核心挑战。xv6 实现了基本的管道和自旋锁机制。
`,

  "threads-concurrency": `## 学习目标
- 理解线程模型
- 掌握同步机制
- 避免并发陷阱

## 1. 线程 vs 进程
- **进程**: 独立地址空间，切换慢
- **线程**: 共享地址空间，切换快

## 2. 互斥锁
\`\`\`c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&lock);
// 临界区
pthread_mutex_unlock(&lock);
\`\`\`

## 3. 条件变量
\`\`\`c
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

// 生产者
pthread_mutex_lock(&lock);
// 生产数据
pthread_cond_signal(&cond);
pthread_mutex_unlock(&lock);

// 消费者
pthread_mutex_lock(&lock);
while (data_empty)
    pthread_cond_wait(&cond, &lock);
// 消费数据
pthread_mutex_unlock(&lock);
\`\`\`

## 思考练习
1. 编写多线程程序并分析竞态条件
2. 用条件变量实现生产者-消费者模型
3. 找出死锁并修复

## 总结
并发编程需要锁和条件变量来保证正确性。常见的陷阱包括竞态条件、死锁和优先级反转。
`,

  // ===== CS144 计算机网络 =====
  "network-layers": `## 学习目标
- 理解网络分层架构
- 掌握各层职责
- 了解数据封装过程

## 1. TCP/IP 四层模型
\`\`\`
应用层 (HTTP, DNS, SMTP)
传输层 (TCP, UDP)
网络层 (IP)
链路层 (Ethernet, WiFi)
\`\`\`

## 2. 数据封装
\`\`\`
发送方:
应用数据 → 加TCP头 → 加IP头 → 加以太网头
           ↓
接收方:
取应用数据 ← 去TCP头 ← 去IP头 ← 去以太网头
\`\`\`

## 思考练习
1. 用 Wireshark 抓包分析网络分层
2. 理解封装和解封装过程
3. 分析每一层的协议头格式

## 总结
分层架构降低了网络系统的复杂性。每层只关注自己的职责，下层为上层提供服务。
`,

  "application-layer": `## 学习目标
- 理解 HTTP 协议
- 掌握 DNS 工作原理
- 了解 SMTP 邮件协议

## 1. HTTP 请求-响应模型
\`\`\`http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
\`\`\`

## 2. DNS 域名解析
域名 → IP 的转换过程：
\`\`\`
浏览器 → 本地DNS缓存 → 递归查询 → 根DNS → TLD DNS → 权威DNS
\`\`\`

## 3. HTTPS
HTTP + TLS/SSL = 加密通信
- 对称加密: 加密传输数据（快）
- 非对称加密: 交换对称密钥

## 思考练习
1. 使用 curl 查看 HTTP 请求-响应细节
2. 用 nslookup 查询域名的 DNS 记录
3. 理解 HTTPS 的握手过程

## 总结
应用层是用户最直接接触的层次。HTTP 是无状态的请求-响应协议，DNS 是互联网的"电话本"。
`,

  "transport-layer": `## 学习目标
- 理解 TCP 和 UDP 的区别
- 掌握 TCP 可靠传输机制
- 了解流量控制和拥塞控制

## 1. TCP vs UDP
| 特性 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接 | 无连接 |
| 可靠 | 可靠 | 不可靠 |
| 有序 | 保序 | 不保序 |
| 速度 | 较慢 | 较快 |
| 用途 | Web/邮件/文件 | 视频/游戏/DNS |

## 2. TCP 三次握手
\`\`\`
客户端 → SYN → 服务器
客户端 ← SYN+ACK ← 服务器
客户端 → ACK → 服务器
\`\`\`

## 3. TCP 流量控制
使用**滑动窗口**机制，接收方告诉发送方自己能接收多少数据。

## 4. TCP 拥塞控制
- 慢启动: 指数增长
- 拥塞避免: 线性增长
- 快速重传: 收到3个ACK立即重传

## 思考练习
1. 用 netstat 查看当前 TCP 连接状态
2. 分析 TCP 三次握手和四次挥手
3. 理解为什么视频流常用 UDP

## 总结
TCP 提供可靠的面向连接服务，UDP 提供高效的不可靠服务。TCP 的拥塞控制是互联网稳定的关键。
`,

  "network-layer": `## 学习目标
- 理解 IP 协议
- 掌握路由原理
- 了解子网划分

## 1. IPv4 地址
32 位地址，约 43 亿个：
\`\`\`
192.168.1.1  →  11000000.10101000.00000001.00000001
\`\`\`

## 2. 子网划分 (CIDR)
\`\`\`
192.168.1.0/24  →  前24位是网络号，后8位是主机号
\`\`\`

## 3. 路由协议
- **RIP**: 距离向量，跳数最多15
- **OSPF**: 链路状态，使用 Dijkstra 算法
- **BGP**: 路径向量，互联网主干路由

## 思考练习
1. 用 ipconfig 查看本机 IP 和子网掩码
2. 用 traceroute 追踪路由路径
3. 理解 NAT 地址转换

## 总结
网络层负责数据包从源到目的地的传输。IP 协议定义地址格式，路由器负责转发。
`,

  "link-layer": `## 学习目标
- 理解以太网协议
- 掌握 ARP 协议
- 了解交换机工作原理

## 1. 以太网帧
\`\`\`
[目的MAC(6)] [源MAC(6)] [类型(2)] [数据] [CRC(4)]
\`\`\`

## 2. MAC 地址
48 位硬件地址，唯一标识网络接口。

## 3. ARP 协议
将 IP 地址解析为 MAC 地址：
\`\`\`
1. 广播 ARP 请求: "谁的 IP 是 192.168.1.1?"
2. 目标回复: "我是，我的 MAC 是 aa:bb:cc:dd:ee:ff"
\`\`\`

## 思考练习
1. 用 arp -a 查看 ARP 缓存
2. 分析交换机自学习过程
3. 理解 MAC 地址和 IP 地址的区别

## 总结
链路层在同一网络内传输帧。以太网是主导技术，MAC 地址唯一标识网络接口。
`,

  "network-security": `## 学习目标
- 理解网络安全的核心目标
- 掌握加密技术基础
- 了解常见攻击方式

## 1. 安全三要素 (CIA)
- **机密性**: 只有授权方能访问
- **完整性**: 数据未被篡改
- **可用性**: 需要时能访问

## 2. 对称加密
\`\`\`
同一密钥加解密:
明文 + 密钥 → 密文
密文 + 密钥 → 明文
AES 是现代最常用的对称加密算法
\`\`\`

## 3. 非对称加密
\`\`\`
公钥加密，私钥解密:
用我的公钥加密 → 只有我的私钥能解密
RSA 是最常用的非对称加密算法
\`\`\`

## 4. TLS/SSL
\`\`\`
1. 客户端请求 HTTPS 连接
2. 服务器发送数字证书（含公钥）
3. 客户端验证证书
4. 用公钥加密共享密钥
5. 后续用共享密钥对称加密通信
\`\`\`

## 思考练习
1. 理解数字证书的作用
2. 分析 HTTPS 和 HTTP 的区别
3. 了解常见的网络攻击方式（MITM、DDoS、SQL注入）

## 总结
网络安全的目标是机密性、完整性和可用性。加密是核心手段，TLS 是 Web 安全的基础。
`,

  // ===== CS144 数据库 =====
  "relational-model": `## 学习目标
- 理解关系模型
- 掌握 SQL 核心语法
- 了解关系代数

## 1. 关系模型
数据以**关系（表）**组织：
- **元组（行）**: 一条记录
- **属性（列）**: 记录的字段
- **键**: 唯一标识元组

## 2. SQL 基本操作
\`\`\`sql
SELECT name, age FROM students WHERE age > 18;
INSERT INTO students VALUES (1, 'Alice', 20);
UPDATE students SET age = 21 WHERE id = 1;
DELETE FROM students WHERE id = 1;
\`\`\`

## 思考练习
1. 设计一个简单的图书馆数据库（书、读者、借阅）
2. 写出查找借阅过某本书的读者的 SQL
3. 理解主键和外键的作用

## 总结
关系模型用表和键组织数据。SQL 是操作关系数据库的标准语言。
`,

  "storage-indexing": `## 学习目标
- 理解数据在磁盘上的组织方式
- 掌握 B+ 树索引
- 了解哈希索引

## 1. 磁盘存储
**页**是数据库的最小 I/O 单元（通常 4-16KB）：
- 数据在磁盘上按页组织
- 读一个数据至少需要读一页

## 2. B+ 树索引
B+ 树是数据库最常用的索引结构：
- **内部节点**: 只存键值，用于导航
- **叶子节点**: 存键值+数据或指向数据的指针
- **叶子节点链**: 支持范围查询

## 思考练习
1. 理解 B+ 树 vs B 树的区别
2. 分析为什么数据库用 B+ 树而不是二叉树
3. 用 EXPLAIN 查看查询使用的索引

## 总结
B+ 树是数据库索引的标准结构。它利用磁盘页特性，支持高效的等值查询和范围查询。
`,

  "query-optimization": `## 学习目标
- 理解查询执行过程
- 掌握连接算法
- 了解查询优化器

## 1. 查询执行阶段
SQL → 语法分析 → 逻辑优化 → 物理优化 → 执行

## 2. 连接算法
\`\`\`
Nested Loop Join:   O(n*m)  — 小表驱动大表
Hash Join:          O(n+m)  — 等值连接最优
Sort-Merge Join:    O(n log n + m log m) — 排好序的数据
\`\`\`

## 3. 优化器选择
优化器基于**代价估计**选择执行计划：
- 表大小
- 索引存在性
- 数据分布（统计信息）
- 连接顺序

## 思考练习
1. 用 EXPLAIN ANALYZE 查看查询计划
2. 比较不同连接方式的性能
3. 为慢查询创建合适的索引

## 总结
查询优化器自动选择执行计划。了解连接算法和索引有助于写出高效的 SQL。
`,

  "transactions": `## 学习目标
- 理解事务的 ACID 特性
- 掌握隔离级别
- 了解并发控制

## 1. ACID
- **原子性**: 事务要么全部成功，要么全部回滚
- **一致性**: 事务前后数据满足约束
- **隔离性**: 并发事务互不干扰
- **持久性**: 提交后的数据永久保存

## 2. 隔离级别
\`\`\`
Read Uncommitted   — 最低，有脏读
Read Committed     — 无脏读（PostgreSQL 默认）
Repeatable Read    — 无脏读、不可重复读（MySQL 默认）
Serializable       — 最高，完全隔离
\`\`\`

## 3. MVCC (多版本并发控制)
每个事务看到数据的一个快照版本，读写互不阻塞：
- 读不阻塞写
- 写不阻塞读
- 通过版本号判断可见性

## 思考练习
1. 演示脏读、不可重复读、幻读
2. 理解 MVCC 如何实现隔离
3. 分析死锁场景和解决方法

## 总结
事务支持是数据库可靠性的基础。隔离级别越低性能越好但正确性保障越弱。
`,

  "crash-recovery": `## 学习目标
- 理解 WAL 日志
- 掌握 ARIES 恢复算法
- 了解检查点机制

## 1. WAL (预写式日志)
**关键原则**: 在数据写入磁盘前，先写日志。

## 2. 日志类型
- **REDO**: 记录修改后的值（重做）
- **UNDO**: 记录修改前的值（撤销）

## 3. 恢复过程
1. **分析阶段**: 确定事务状态（提交/进行中）
2. **REDO 阶段**: 从检查点重放所有操作
3. **UNDO 阶段**: 回滚未提交的事务

## 思考练习
1. 理解为什么 WAL 能保证原子性和持久性
2. 模拟崩溃并观察恢复过程
3. 分析检查点的作用

## 总结
WAL 是数据库崩溃恢复的基石。先写日志再写数据，确保崩溃后能通过 REDO/UNDO 恢复到一致状态。
`,

  "distributed-db": `## 学习目标
- 理解分布式数据库的基本概念
- 掌握数据分片策略
- 了解 CAP 定理

## 1. 数据分片
将数据分布到多个节点：
- **水平分片**: 按行分割
- **垂直分片**: 按列分割
- **哈希分片**: 按哈希值分布
- **范围分片**: 按键范围分布

## 2. 复制
- **主从复制**: 主节点处理写，从节点处理读
- **多主复制**: 多个节点可写（需冲突解决）
- **无主复制**: 任何节点可读写

## 3. CAP 定理
分布式系统在以下三者中只能选二：
- **一致性**: 所有节点看到相同数据
- **可用性**: 每个请求都能获得响应
- **分区容错**: 网络分区时系统仍工作

## 思考练习
1. 理解为什么 CA 在分布式系统中不可行
2. 比较不同分片策略的优劣
3. 了解一致性哈希的原理

## 总结
分布式数据库通过分片和复制实现扩展和容错。CAP 定理是分布式系统设计的基本约束。
`,
}

async function main() {
  console.log("📝 开始更新教程内容...")

  const lessons = await prisma.lesson.findMany({
    include: { course: { select: { slug: true, title: true } } },
  })

  let updated = 0
  for (const lesson of lessons) {
    const courseSlug = lesson.course.slug
    const lessonSlug = lesson.slug
    const newContent = LESSON_CONTENTS[lessonSlug]

    if (newContent && lesson.content !== newContent) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { content: newContent },
      })
      updated++
      console.log(`  ✅ ${courseSlug}/${lessonSlug}`)
    }
  }

  console.log(`\n🎉 完成！共更新 ${updated}/${lessons.length} 节教程内容`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
