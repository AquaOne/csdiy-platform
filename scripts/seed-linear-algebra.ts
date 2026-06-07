/**
 * MIT 18.06 线性代数完整课程导入脚本
 * 基于 Gilbert Strang《Introduction to Linear Algebra》教材体系
 * 参考 MIT 18.06 课程大纲 + 3Blue1Brown 直观理解
 *
 * 用法: npx tsx scripts/seed-linear-algebra.ts
 */
import { prisma } from "../src/lib/prisma"

const COURSE_DATA = {
  title: "MIT 18.06: 线性代数",
  slug: "mit-linear-algebra",
  description: "Gilbert Strang 经典课程 — 从几何直观到矩阵理论的完整线性代数体系",
  longDescription: `本课程基于 MIT 18.06 与 Gilbert Strang 教授的名著《Introduction to Linear Algebra》。
融合 3Blue1Brown《线性代数的本质》系列视频的几何直观，配合 Python/Numpy 代码实践，
帮助你从直观理解到严格证明全方位掌握线性代数。

课程特色：
• 每节包含：学习目标 → 核心概念 → 严格定义与定理 → 几何直观 → Python 实践 → 习题
• 覆盖 MIT 18.06 全部知识点：向量空间、矩阵运算、特征值、SVD、线性变换
• 结合 numpy 代码实现，将抽象的矩阵运算具体化
• 每节配有思考题和编程练习`,
  difficulty: "intermediate",
  estimatedHours: 80,
  order: 2,
  prerequisites: '["高中数学"]',
}

const LESSONS = [
  {
    title: "向量的几何与代数",
    slug: "vectors-intro",
    order: 0,
    estimatedMinutes: 50,
    content: `## 学习目标

完成本节后，你将能够：
- 从几何和代数两个角度理解向量
- 掌握向量的加法、数乘和线性组合
- 理解向量在二维和三维空间中的几何表示
- 用 Python/Numpy 操作向量

## 1. 向量的两种视角

### 1.1 物理/几何视角

向量是**既有大小又有方向的量**。在二维平面上，一个向量 \\(\\vec{v}\\) 可以看作从原点指向点 \\((v_1, v_2)\\) 的箭头。

\\(\\vec{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}\\)

**关键直觉**：向量就是一个"带箭头的线段"——长度代表大小，箭头指向方向。

### 1.2 代数/数据视角

向量是**一组有序的数字**。在计算机科学中，向量就是数组/列表：

\`\`\`python
import numpy as np
v = np.array([3, 4])  # 二维向量
\`\`\`

这两种视角是统一的——数字 \\([3, 4]\\) 可以理解为 "向右移动3个单位，向上移动4个单位"。

## 2. 向量运算

### 2.1 向量加法

**几何意义**：将两个向量"首尾相接"。

\\(\\vec{v} + \\vec{w} = \\begin{bmatrix} v_1 + w_1 \\\\ v_2 + w_2 \\end{bmatrix}\\)

**平行四边形法则**：两个向量之和是它们构成平行四边形的对角线。

\`\`\`python
v = np.array([1, 2])
w = np.array([3, 1])
sum_vw = v + w  # [4, 3]
\`\`\`

### 2.2 数乘 (Scalar Multiplication)

**几何意义**：拉伸或压缩向量。

\\(c \\cdot \\vec{v} = \\begin{bmatrix} c v_1 \\\\ c v_2 \\end{bmatrix}\\)

- 如果 \\(c > 1\\)：方向不变，长度放大
- 如果 \\(0 < c < 1\\)：方向不变，长度缩小
- 如果 \\(c < 0\\)：方向反转

\`\`\`python
v = np.array([1, 2])
scaled = 3 * v  # [3, 6]
reversed = -1 * v  # [-1, -2]
\`\`\`

### 2.3 线性组合 (Linear Combination)

这是线性代数的**核心概念**——将加法和数乘结合：

\\(c_1\\vec{v}_1 + c_2\\vec{v}_2 + \\cdots + c_n\\vec{v}_n\\)

**一句话定义**：线性组合 = 缩放 + 相加。

\`\`\`python
v1 = np.array([1, 0])
v2 = np.array([0, 1])
result = 3 * v1 + 2 * v2  # [3, 2]
\`\`\`

## 3. 向量的长度和点积

### 3.1 向量的长度 (范数)

勾股定理是计算向量长度的基础：

\\(\\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2 + \\cdots + v_n^2}\\)

\`\`\`python
v = np.array([3, 4])
length = np.linalg.norm(v)  # 5.0
\`\`\`

### 3.2 点积 (Dot Product)

点积是线性代数中最基础也最重要的运算之一：

\\(\\vec{v} \\cdot \\vec{w} = v_1 w_1 + v_2 w_2 + \\cdots + v_n w_n\\)

**几何意义**：\\(\\vec{v} \\cdot \\vec{w} = \\|\\vec{v}\\| \\|\\vec{w}\\| \\cos\\theta\\)，其中 \\(\\theta\\) 是两个向量的夹角。

\`\`\`python
v = np.array([1, 2])
w = np.array([3, 4])
dot = np.dot(v, w)  # 1*3 + 2*4 = 11

# 计算夹角
cos_theta = dot / (np.linalg.norm(v) * np.linalg.norm(w))
theta = np.arccos(cos_theta)  # 弧度
\`\`\`

**点积的关键应用**：
- 判断垂直：\\(\\vec{v} \\cdot \\vec{w} = 0 \\iff \\vec{v} \\perp \\vec{w}\\)
- 计算投影长度：\\(\\vec{v}\\) 在 \\(\\vec{w}\\) 上的投影长度为 \\(\\frac{\\vec{v} \\cdot \\vec{w}}{\\|\\vec{w}\\|}\\)

## 4. Python 综合练习

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# 定义向量
v = np.array([2, 3])
w = np.array([-1, 1])

# 线性组合
result = 2*v + 0.5*w
print(f"2*v + 0.5*w = {result}")

# 验证三角形不等式 ||v+w|| <= ||v|| + ||w||
v_plus_w = v + w
lhs = np.linalg.norm(v_plus_w)
rhs = np.linalg.norm(v) + np.linalg.norm(w)
print(f"||v+w|| = {lhs:.2f} <= ||v|| + ||w|| = {rhs:.2f}")

# 柯西-施瓦茨不等式 |v·w| <= ||v||·||w||
dot_vw = np.dot(v, w)
cs_lhs = abs(dot_vw)
cs_rhs = np.linalg.norm(v) * np.linalg.norm(w)
print(f"|v·w| = {cs_lhs:.2f} <= ||v||·||w|| = {cs_rhs:.2f}")
\`\`\`

## 5. 思考练习

1. \\(\\vec{v} = [1, 2, 3], \\vec{w} = [-1, 0, 1]\\)，计算 \\(2\\vec{v} - 3\\vec{w}\\)
2. 证明：\\(\\|\\vec{v} + \\vec{w}\\|^2 = \\|\\vec{v}\\|^2 + \\|\\vec{w}\\|^2 + 2\\vec{v}\\cdot\\vec{w}\\)
3. 验证：如果 \\(\\vec{v} \\perp \\vec{w}\\)，则 \\(\\|\\vec{v} + \\vec{w}\\|^2 = \\|\\vec{v}\\|^2 + \\|\\vec{w}\\|^2\\)
4. 用 numpy 验证三角不等式和柯西-施瓦茨不等式

## 本章总结

向量是线性代数最基本的构建块。我们学习了：
- 向量的两种表示：几何箭头和数字数组
- 三种基本运算：加法、数乘、线性组合
- 点积及其几何意义：衡量向量之间的夹角
- 用 Python 进行向量计算

**下一步**：我们将看到向量如何组织成矩阵，以及如何用矩阵表示线性方程组。
`,
  },
  {
    title: "矩阵与线性方程组",
    slug: "matrices-linear-systems",
    order: 1,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 理解矩阵是线性方程组的紧凑表示
- 掌握"行视角"和"列视角"两种理解方式
- 理解矩阵乘向量的几何意义
- 用矩阵形式表示和解决线性方程组

## 1. 从线性方程组到矩阵

### 1.1 线性方程组

考虑一个包含 n 个未知数、m 个方程的线性系统：

\`\`\`
2x + 3y - z = 5
 x -  y + z = 2
3x +  y + 2z = 8
\`\`\`

### 1.2 矩阵表示

这个方程组可以紧凑地写作：

\\[\\begin{bmatrix} 2 & 3 & -1 \\\\ 1 & -1 & 1 \\\\ 3 & 1 & 2 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 2 \\\\ 8 \\end{bmatrix}\\]

简写为：\\(A\\mathbf{x} = \\mathbf{b}\\)

其中：
- \\(A\\) — 系数矩阵 (\\(m \\times n\\))
- \\(\\mathbf{x}\\) — 未知数向量
- \\(\\mathbf{b}\\) — 常数向量

## 2. 行视角 vs 列视角

这是理解矩阵乘法的核心——有两种看待 \\(A\\mathbf{x} = \\mathbf{b}\\) 的方式。

### 2.1 行视角（方程视角）

每一行代表一个线性方程，矩阵乘法是对行向量的点积：

\\[\\begin{bmatrix} \\text{row}_1 \\\\ \\text{row}_2 \\\\ \\text{row}_3 \\end{bmatrix} \\mathbf{x} = \\begin{bmatrix} \\text{row}_1 \\cdot \\mathbf{x} \\\\ \\text{row}_2 \\cdot \\mathbf{x} \\\\ \\text{row}_3 \\cdot \\mathbf{x} \\end{bmatrix}\\]

**几何意义**：解 \\(A\\mathbf{x} = \\mathbf{b}\\) 就是找到同时位于所有行方程所代表的超平面上的点。

### 2.2 列视角（向量组合视角）

每一列是一个向量，矩阵乘法是对列的线性组合：

\\[A\\mathbf{x} = x_1 \\begin{bmatrix} a_{11} \\\\ a_{21} \\\\ a_{31} \\end{bmatrix} + x_2 \\begin{bmatrix} a_{12} \\\\ a_{22} \\\\ a_{32} \\end{bmatrix} + x_3 \\begin{bmatrix} a_{13} \\\\ a_{23} \\\\ a_{33} \\end{bmatrix}\\]

**几何意义**：\\(A\\mathbf{x}\\) 是"对矩阵的列向量用 \\(\\mathbf{x}\\) 作为系数进行线性组合"。

> **这是线性代数最关键的思想之一**：\\(A\\mathbf{x}\\) 就是列的线性组合。这意味着 \\(A\\mathbf{x} = \\mathbf{b}\\) 有解当且仅当 \\(\\mathbf{b}\\) 可以表示为 \\(A\\) 的列向量的线性组合。

\`\`\`python
import numpy as np

A = np.array([[2, 3, -1],
              [1, -1, 1],
              [3, 1, 2]])
b = np.array([5, 2, 8])

# 列视角: b 是A的列的线性组合
col0 = A[:, 0]  # [2, 1, 3]
col1 = A[:, 1]  # [3, -1, 1]
col2 = A[:, 2]  # [-1, 1, 2]

# 解 x = [1, 2, 3] 时:
x_solution = np.array([1, 2, 3])
print("Ab =", A @ x_solution)  # [5, 2, 8] = b ✓

# 求解 Ax = b
x = np.linalg.solve(A, b)
print("解 x =", x)  # [1, 2, 3]
\`\`\`

## 3. 矩阵乘向量的几何意义

### 3.1 缩放

\\[\\begin{bmatrix} c & 0 \\\\ 0 & c \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} cx \\\\ cy \\end{bmatrix}\\]

将向量在各个方向均匀缩放 \\(c\\) 倍。

### 3.2 旋转

旋转矩阵将向量旋转角度 \\(\\theta\\)：

\\[\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix}\\]

### 3.3 剪切 (Shear)

\\[\\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} x + ky \\\\ y \\end{bmatrix}\\]

\`\`\`python
import numpy as np

# 旋转90度
R = np.array([[0, -1], [1, 0]])
v = np.array([1, 0])
print("旋转90度:", R @ v)  # [0, 1]

# 缩放
S = np.array([[2, 0], [0, 2]])
print("放大2倍:", S @ v)  # [2, 0]

# 剪切
H = np.array([[1, 1], [0, 1]])
print("剪切:", H @ v)  # [1, 0]
\`\`\`

## 4. 奇异矩阵

当 \\(A\\) 的某些列是其他列的线性组合时，\\(A\\) 是**奇异**的（也称不可逆的）：

\`\`\`python
# 奇异矩阵示例: 两列线性相关
singular = np.array([[1, 2], [2, 4]])
print("秩:", np.linalg.matrix_rank(singular))  # 1 (不是满秩)
# 尝试求解会失败
try:
    np.linalg.solve(singular, np.array([1, 2]))
except np.linalg.LinAlgError as e:
    print("求解失败:", e)  # Singular matrix
\`\`\`

## 5. 思考练习

1. 写出矩阵 \\(A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\) 作用于向量 \\(\\mathbf{v} = [1, 2]\\) 的结果
2. 用列视角解释为什么 \\(A\\mathbf{x} = \\mathbf{b}\\) 可能无解
3. 找到旋转 180 度的 2×2 矩阵
4. 用 numpy 验证：矩阵奇异时，\\(A\\mathbf{x} = \\mathbf{b}\\) 可能无解或有无穷多解

## 本章总结

- 矩阵是线性变换和线性方程组的统一表示
- 行视角：每个方程是一个约束平面
- 列视角：\\(A\\mathbf{x}\\) 是列的线性组合（**最重要**）
- 矩阵的列是否线性相关决定了是否有唯一解
`,
  },
  {
    title: "高斯消元法与 LU 分解",
    slug: "gaussian-elimination",
    order: 2,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 掌握高斯消元法求解线性方程组
- 理解消元矩阵 \\(E\\) 的作用
- 理解 LU 分解及其意义
- 用 Python 实现消元过程

## 1. 消元法：求解线性方程组的核心算法

高斯消元法是求解 \\(A\\mathbf{x} = \\mathbf{b}\\) 的最基本方法。本质上是通过**行操作**将矩阵化简为上三角形式。

### 1.1 基本思想

考虑一个 2×2 系统：

\\[\\begin{cases} x + 2y = 5 \\\\ 3x + 4y = 11 \\end{cases}\\]

矩阵形式：

\\[\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 11 \\end{bmatrix}\\]

消元步骤：
1. 用第一个方程消去第二个方程中的 \\(x\\)：\\(\\text{row}_2 \\leftarrow \\text{row}_2 - 3 \\times \\text{row}_1\\)
2. 得到：\\(\\begin{bmatrix} 1 & 2 \\\\ 0 & -2 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ -4 \\end{bmatrix}\\)
3. 回代：\\(-2y = -4 \\rightarrow y = 2 \\rightarrow x + 4 = 5 \\rightarrow x = 1\\)

### 1.2 什么是"主元" (Pivot)

主元是消元过程中对角线上的非零元素，它们是消元的"锚点"：

\\[A = \\begin{bmatrix} \\boxed{1} & 2 \\\\ 3 & 4 \\end{bmatrix} \\rightarrow \\begin{bmatrix} 1 & 2 \\\\ 0 & \\boxed{-2} \\end{bmatrix}\\]

- 第一个主元是 1，第二个主元是 -2
- 主元的个数 = 矩阵的秩
- 如果某个位置出现零，需要行交换（置换）

## 2. 消元矩阵

每次行操作都可以表示为乘以一个**初等矩阵**：

### 2.1 行减法矩阵

\\(E_{21}\\) 表示"将第1行的倍数加到第2行"：

\\[E_{21} = \\begin{bmatrix} 1 & 0 \\\\ -3 & 1 \\end{bmatrix}, \\quad E_{21}A = \\begin{bmatrix} 1 & 2 \\\\ 0 & -2 \\end{bmatrix}\\]

### 2.2 置换矩阵

如果主元位置是零，需要用置换矩阵交换行：

\\[P = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\]

\\(PA\\) 交换了矩阵的第1行和第2行。

## 3. LU 分解：消元法的本质

LU分解是高斯消元法的矩阵形式：

\\[A = LU\\]

其中 \\(L\\) 是**下三角矩阵**（Lower triangular），\\(U\\) 是**上三角矩阵**（Upper triangular）。

### 3.1 直观理解

消元过程：\\(E_{21}E_{31}E_{32}A = U\\)（左乘一系列消元矩阵得到上三角矩阵）

\\(L\\) 就是这些消元矩阵的逆的乘积：\\(L = (E_{32})^{-1}(E_{31})^{-1}(E_{21})^{-1}\\)

**关键**：\\(L\\) 的对角线下方元素正好是消元过程的乘数（无需额外计算！）。

### 3.2 示例

\\[A = \\begin{bmatrix} 2 & 1 \\\\ 8 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 4 & 1 \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} = LU\\]

验证：消元需要从第二行减去 4 倍第一行，所以 \\(L_{21} = 4\\)。

\`\`\`python
import numpy as np
from scipy.linalg import lu

A = np.array([[2, 1], [8, 7]])
P, L, U = lu(A)  # PA = LU

print("L =\\n", L)
print("U =\\n", U)
print("LU =\\n", L @ U)  # 等于 PA
\`\`\`

### 3.3 为什么 LU 分解重要？

**LU 分解的核心应用**是高效求解多个右侧向量的方程组：

1. 对 \\(A\\) 做一次 LU 分解：\\(O(n^3)\\)
2. 对每个右侧向量 \\(\\mathbf{b}\\)：只需 \\(O(n^2)\\) 的前向/回代求解

相比之下，每次单独做高斯消元需要 \\(O(n^3)\\)。

## 4. 复杂度分析

- 消元过程：約 \\(\\frac{2}{3}n^3\\) 次乘法/加法
- 回代过程：約 \\(n^2\\) 次操作
- 当 \\(n=1000\\) 时，消元约需 6.7 亿次操作——现代计算机约 0.1 秒

## 5. 算法实现

\`\`\`python
import numpy as np

def gaussian_elimination(A, b):
    """高斯消元法求解 Ax = b"""
    n = len(A)
    # 构建增广矩阵
    Aug = np.hstack([A.astype(float), b.reshape(-1, 1)])

    # 前向消元
    for col in range(n-1):
        # 选主元（部分选主元）
        max_row = np.argmax(abs(Aug[col:, col])) + col
        if max_row != col:
            Aug[[col, max_row]] = Aug[[max_row, col]]

        pivot = Aug[col, col]
        if abs(pivot) < 1e-10:
            raise ValueError("矩阵奇异")

        for row in range(col+1, n):
            factor = Aug[row, col] / pivot
            Aug[row, col:] -= factor * Aug[col, col:]

    # 回代
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        x[i] = (Aug[i, -1] - Aug[i, i+1:n] @ x[i+1:n]) / Aug[i, i]
    return x

# 测试
A = np.array([[2, 1, -1],
              [4, 3, -2],
              [-2, -1, 2]])
b = np.array([1, 5, -1])
x = gaussian_elimination(A, b)
print("解 x =", x)
print("验证 Ax - b =", A @ x - b)
\`\`\`

## 6. 思考练习

1. 手工计算 \\(A = \\begin{bmatrix} 2 & 3 \\\\ 4 & 5 \\end{bmatrix}\\) 的 LU 分解
2. 如果消元过程中主元为零，应该怎么处理？
3. 证明：\\(L\\) 的对角线元素都是 1
4. 用 Python 实现一个通用的线性方程求解器，包含选主元

## 本章总结

- 高斯消元通过行操作将 \\(A\\) 化简为 \\(U\\)，然后回代求解
- LU 分解将 \\(A\\) 拆分为 \\(L\\)(下三角) 和 \\(U\\)(上三角) 的乘积
- \\(L\\) 中的非对角线元素就是消元时的乘数
- LU 分解的优势：一次分解，多次求解
`,
  },
  {
    title: "矩阵运算与逆矩阵",
    slug: "matrix-operations-inverses",
    order: 3,
    estimatedMinutes: 50,
    content: `## 学习目标

完成本节后，你将能够：
- 掌握矩阵乘法规则及其几何意义
- 理解矩阵可逆的条件
- 计算 2×2 矩阵的逆矩阵
- 理解逆矩阵的存在性条件

## 1. 矩阵乘法

### 1.1 四种视角

矩阵乘法 \\(C = AB\\) 有四种等价的理解方式：

**方式1：点积定义**（最常用）

\\(C_{ij} = \\text{row}_i(A) \\cdot \\text{col}_j(B)\\)

**方式2：列视角**（最重要！）

\\(C\\) 的第 \\(j\\) 列 = \\(A\\) 乘以 \\(B\\) 的第 \\(j\\) 列

即：\\(C[:,j] = A B[:,j]\\)

**方式3：行视角**

\\(C\\) 的第 \\(i\\) 行 = \\(A\\) 的第 \\(i\\) 行乘以 \\(B\\)

**方式4：外积和**

\\(AB = \\sum_k \\text{col}_k(A) \\times \\text{row}_k(B)\\)（列×行 = 矩阵）

### 1.2 矩阵乘法为什么这样定义？

**根本原因**：矩阵乘法对应**线性变换的复合**。先应用 \\(B\\) 变换，再应用 \\(A\\) 变换，等价于应用 \\(AB\\) 变换。

\`\`\`python
import numpy as np

A = np.array([[1, 1], [0, 1]])  # 剪切
B = np.array([[0, -1], [1, 0]]) # 旋转90度

AB = A @ B  # 先旋转，再剪切
BA = B @ A  # 先剪切，再旋转

print("AB ≠ BA 通常成立:")
print(AB)
print(BA)
# 这证实了：矩阵乘法不可交换
\`\`\`

### 1.3 矩阵乘法的性质

- **结合律**：\\((AB)C = A(BC)\\)
- **分配律**：\\(A(B+C) = AB + AC\\)
- **不满足交换律**：通常 \\(AB \\neq BA\\)
- **转置**：\\((AB)^T = B^T A^T\\)

## 2. 逆矩阵

### 2.1 定义

如果矩阵 \\(A\\) 存在矩阵 \\(B\\) 使得 \\(AB = BA = I\\)，则 \\(B\\) 是 \\(A\\) 的逆矩阵，记作 \\(A^{-1}\\)。

**几何意义**：\\(A^{-1}\\) 是 \\(A\\) 的逆变换——它们互相抵消。

### 2.2 2×2 矩阵的逆公式

对于 \\(A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\)：

\\[A^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}\\]

其中 \\(\\det(A) = ad - bc\\) 称为**行列式**。

**可逆条件**：\\(ad - bc \\neq 0\\)。

\`\`\`python
def inverse_2x2(A):
    """手动计算 2×2 矩阵的逆"""
    a, b, c, d = A[0,0], A[0,1], A[1,0], A[1,1]
    det = a*d - b*c
    if abs(det) < 1e-10:
        raise ValueError("矩阵不可逆")
    return (1/det) * np.array([[d, -b], [-c, a]])

A = np.array([[1, 2], [3, 4]])
A_inv = inverse_2x2(A)
print("A^{-1} =\\n", A_inv)
print("检查 A @ A^{-1} =\\n", A @ A_inv)
\`\`\`

### 2.3 可逆性的等价条件

对于 \\(n \\times n\\) 矩阵 \\(A\\)，以下命题等价：

1. \\(A\\) 可逆
2. \\(\\det(A) \\neq 0\\)
3. \\(A\\) 的列线性无关（满秩）
4. \\(A\\) 的行线性无关
5. \\(A\\mathbf{x} = \\mathbf{0}\\) 只有零解
6. \\(A\\) 的特征值都不为零
7. \\(A\\) 的秩为 \\(n\\)

### 2.4 逆矩阵的应用：解线性方程组

\\[A\\mathbf{x} = \\mathbf{b} \\implies \\mathbf{x} = A^{-1}\\mathbf{b}\\]

但实际计算中很少直接求逆——用 LU 分解效率更高。

\`\`\`python
# 用逆矩阵求解
A = np.array([[1, 2], [3, 4]])
b = np.array([5, 11])
x = np.linalg.inv(A) @ b
print("解:", x)
print("直接求解:", np.linalg.solve(A, b))
\`\`\`

## 3. 思考练习

1. 找出一个 2×2 矩阵使其平方为零矩阵
2. 证明 \\((AB)^{-1} = B^{-1}A^{-1}\\)
3. 什么情况下 \\(AB = BA\\)？
4. 用 Python 验证：\\((AB)^T = B^T A^T\\)

## 本章总结

- 矩阵乘法有四种视角，列视角最重要
- 矩阵乘法不可交换——顺序很重要
- 可逆矩阵对应"可逆"的线性变换
- 行列式为零 ⇔ 矩阵不可逆 ⇔ 奇异
`,
  },
  {
    title: "向量空间与子空间",
    slug: "vector-spaces",
    order: 4,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 理解向量空间的定义和公理
- 识别常见的向量空间
- 理解子空间的概念
- 掌握列空间和零空间的核心思想

## 1. 向量空间的定义

向量空间 \\(V\\) 是一个在加法和数乘下封闭的集合，满足八条公理。

### 1.1 通俗理解

向量空间就是一个"在你进行线性组合时不跑出去"的集合。

**例子**：
- \\(\\mathbb{R}^2\\)（二维平面）是向量空间——任意两个向量的和、任意数乘仍在这个平面上
- \\(\\mathbb{R}^n\\) 是向量空间
- 所有 \\(m \\times n\\) 矩阵的集合是向量空间

**反例**：
- 第一象限（\\(x \\geq 0, y \\geq 0\\)）不是向量空间——数乘负数会跑出去
- 单位圆上的点不是向量空间——加法不封闭

### 1.2 八条公理（简要）

对于 \\(\\mathbf{u}, \\mathbf{v}, \\mathbf{w} \\in V\\) 和标量 \\(c, d\\)：

1. \\(\\mathbf{u} + \\mathbf{v} \\in V\\)（加法封闭）
2. \\(\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}\\)（交换律）
3. \\((\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})\\)（结合律）
4. 存在零向量 \\(\\mathbf{0}\\) 使得 \\(\\mathbf{0} + \\mathbf{v} = \\mathbf{v}\\)
5. 每个向量有加法逆元
6. \\(c\\mathbf{v} \\in V\\)（数乘封闭）
7-8. 数乘的分配律和结合律

## 2. 子空间 (Subspace)

### 2.1 定义

\\(V\\) 的子集 \\(S\\) 称为子空间，如果：
- \\(\\mathbf{0} \\in S\\)
- \\(S\\) 对加法封闭
- \\(S\\) 对数乘封闭

**等价条件**：\\(S\\) 对线性组合封闭。

### 2.2 常见例子

**过原点的直线**：\\(S = \\{t\\mathbf{v} : t \\in \\mathbb{R}\\}\\)
- 包含零点 ✓
- 两个向量的和仍在直线上 ✓
- 数乘仍在直线上 ✓

**过原点的平面**：\\(S = \\{s\\mathbf{v} + t\\mathbf{w} : s,t \\in \\mathbb{R}\\}\\)

**重要**：不过原点的直线**不是**子空间（不包含零点，不封闭）。

\`\`\`python
import numpy as np

# 判断集合是否为子空间的简单检查
def is_subspace(vectors, num_checks=100):
    """随机检查是否对线性组合封闭"""
    for _ in range(num_checks):
        v1 = vectors[np.random.randint(len(vectors))]
        v2 = vectors[np.random.randint(len(vectors))]
        c1, c2 = np.random.randn(2)
        combo = c1 * v1 + c2 * v2
        # 验证组合是否还在集合中（简单起见，检查是否满足某些条件）
        if not np.allclose(combo, combo):  # 检查NaN
            return False
    return True
\`\`\`

## 3. 列空间 \\(C(A)\\)

### 3.1 定义

矩阵 \\(A\\) 的列空间是所有列的线性组合构成的集合：

\\[C(A) = \\{A\\mathbf{x} : \\mathbf{x} \\in \\mathbb{R}^n\\}\\]

**关键思想**：\\(A\\mathbf{x} = \\mathbf{b}\\) 有解当且仅当 \\(\\mathbf{b} \\in C(A)\\)。

### 3.2 几何理解

\\[A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}\\]

的两列是 \\(\\begin{bmatrix}1 \\\\ 2\\end{bmatrix}\\) 和 \\(\\begin{bmatrix}2 \\\\ 4\\end{bmatrix}\\)——它们在同一条直线上！所以 \\(C(A)\\) 是一条过原点的直线。

这意味着 \\(A\\mathbf{x} = \\mathbf{b}\\) 只在 \\(\\mathbf{b}\\) 在这条直线上时有解。

\`\`\`python
import numpy as np

A = np.array([[1, 2], [2, 4]])
print("列空间维度（秩）:", np.linalg.matrix_rank(A))
# 秩为1，说明列空间是一条直线

b1 = np.array([3, 6])   # 在列空间中
b2 = np.array([3, 3])   # 不在列空间中

# 检查解是否存在
def check_solvable(A, b):
    """检查 Ax = b 是否有解"""
    rank_A = np.linalg.matrix_rank(A)
    rank_Ab = np.linalg.matrix_rank(np.hstack([A, b.reshape(-1, 1)]))
    return rank_A == rank_Ab

print("b1 有解?", check_solvable(A, b1))
print("b2 有解?", check_solvable(A, b2))
\`\`\`

## 4. 零空间 \\(N(A)\\)

### 4.1 定义

矩阵 \\(A\\) 的零空间是所有满足 \\(A\\mathbf{x} = \\mathbf{0}\\) 的 \\(\\mathbf{x}\\) 的集合：

\\[N(A) = \\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\}\\]

**关键思想**：零空间告诉我们"解的自由度"。

### 4.2 自由变量

对于 \\(m \\times n\\) 矩阵：
- 如果秩 \\(r < n\\)，则有 \\(n - r\\) 个自由变量
- 零空间的维度 = \\(n - r\\)

\`\`\`python
A = np.array([[1, 2, 3],
              [2, 4, 6]])  # 第二行是第一行的2倍

# 求零空间
u, s, vh = np.linalg.svd(A)
null_space = vh[len(s):].T
print("零空间基向量:")
print(null_space)
# Ax = 0 的解: x = t * null_space[:, 0] + s * null_space[:, 1]

# 验证
t, s = 1, 2
x = t * null_space[:, 0] + s * null_space[:, 1]
print("Ax =", A @ x)  # 应该接近 [0, 0]
\`\`\`

## 5. 列空间 vs 零空间

| 特性 | 列空间 \\(C(A)\\) | 零空间 \\(N(A)\\) |
|------|-------------------|-------------------|
| 在哪个空间 | \\(\\mathbb{R}^m\\) | \\(\\mathbb{R}^n\\) |
| 定义 | \\(A\\) 的列张成的空间 | \\(A\\mathbf{x} = \\mathbf{0}\\) 的解 |
| 维度 | 秩 \\(r\\) | \\(n - r\\) |
| 意义 | \\(\\mathbf{b}\\) 需在其中才能有解 | 自由度的度量 |

## 6. 思考练习

1. 判断 \\(S = \\{ [x, y] : x + y = 0 \\}\\) 是否为子空间
2. 判断 \\(S = \\{ [x, y] : x + y = 1 \\}\\) 是否为子空间
3. 找出 \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 6 \\end{bmatrix}\\) 的列空间和零空间
4. 证明：两个子空间的交集仍然是子空间

## 本章总结

- 向量空间对线性组合封闭
- 子空间是向量空间中的"小平面的空间"
- 列空间 \\(C(A)\\) 回答了"哪些 \\(\\mathbf{b}\\) 有解"
- 零空间 \\(N(A)\\) 回答了"解的自由度有多大"
`,
  },
  {
    title: "基、维度和四个基本子空间",
    slug: "basis-dimension-four-subspaces",
    order: 5,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 理解基的定义和性质
- 计算子空间的维度
- 理解矩阵的四个基本子空间及其关系
- 掌握秩-零化度定理

## 1. 基 (Basis)

### 1.1 定义

向量空间 \\(V\\) 的一组基是一组向量 \\(\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}\\)，满足：
1. **线性无关**：\\(c_1\\mathbf{v}_1 + \\cdots + c_k\\mathbf{v}_k = 0 \\implies c_1 = \\cdots = c_k = 0\\)
2. **张成**：\\(V\\) 中的每个向量都可以表示为这组向量的线性组合

**直观理解**：基是最"经济"的生成集——不多不少，刚好够。

### 1.2 标准基

\\(\\mathbb{R}^2\\) 的标准基：\\(\\mathbf{e}_1 = \\begin{bmatrix}1\\\\0\\end{bmatrix}, \\mathbf{e}_2 = \\begin{bmatrix}0\\\\1\\end{bmatrix}\\)

### 1.3 线性无关的判断

\\(\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}\\) 线性无关 ⇔ 唯一解 \\(c_1 = \\cdots = c_k = 0\\)

\\[\\begin{bmatrix} \\mathbf{v}_1 & \\cdots & \\mathbf{v}_k \\end{bmatrix} \\mathbf{c} = \\mathbf{0}\\]
只有零解。

\`\`\`python
import numpy as np

def is_linearly_independent(vectors):
    """判断向量组是否线性无关"""
    A = np.column_stack(vectors)
    rank = np.linalg.matrix_rank(A)
    return rank == A.shape[1]

v1 = np.array([1, 0, 0])
v2 = np.array([0, 1, 0])
v3 = np.array([0, 0, 1])
print("标准基线性无关?", is_linearly_independent([v1, v2, v3]))

v4 = np.array([1, 2, 3])  # v1+v2+v3的线性组合
print("加入v4后?", is_linearly_independent([v1, v2, v3, v4]))
\`\`\`

## 2. 维度 (Dimension)

### 2.1 定义

向量空间 \\(V\\) 的维度是其任意一组基的向量个数。

**关键性质**：
- 所有基的大小相同
- \\(\\mathbb{R}^n\\) 的维度是 \\(n\\)
- 过原点的直线的维度为 1
- 过原点的平面的维度为 2

### 2.2 秩 (Rank)

矩阵 \\(A\\) 的秩 = \\(C(A)\\) 的维度 = 主元的个数 = 线性无关的列数

\`\`\`python
A = np.array([[1, 2, 3],
              [0, 1, 4],
              [0, 0, 0]])
print("秩:", np.linalg.matrix_rank(A))  # 2

# 秩的几何意义：列空间的维度
# 虽然A有3列，但只有2个独立方向
\`\`\`

### 2.3 秩-零化度定理 (Rank-Nullity Theorem)

\\[\\text{rank}(A) + \\text{nullity}(A) = n\\]

其中：
- \\(\\text{rank}(A) = \\dim C(A)\\)
- \\(\\text{nullity}(A) = \\dim N(A)\\)
- \\(n\\) 是 \\(A\\) 的列数

**直观理解**：输入空间 \\(\\mathbb{R}^n\\) 被分为两部分——一部分映射到列空间（秩），另一部分映射到零（零化度）。

## 3. 四个基本子空间

对于一个 \\(m \\times n\\) 矩阵 \\(A\\)，四个基本子空间是理解线性代数的核心框架：

### 3.1 四个子空间

| 子空间 | 符号 | 所在空间 | 维度 |
|--------|------|----------|------|
| 列空间 | \\(C(A)\\) | \\(\\mathbb{R}^m\\) | \\(r\\) |
| 零空间 | \\(N(A)\\) | \\(\\mathbb{R}^n\\) | \\(n-r\\) |
| 行空间 | \\(C(A^T)\\) | \\(\\mathbb{R}^n\\) | \\(r\\) |
| 左零空间 | \\(N(A^T)\\) | \\(\\mathbb{R}^m\\) | \\(m-r\\) |

其中 \\(r = \\text{rank}(A)\\)。

### 3.2 正交关系（最重要！）

\\(C(A^T) \\perp N(A)\\)：行空间与零空间正交，它们在 \\(\\mathbb{R}^n\\) 中是**正交补**

\\(C(A) \\perp N(A^T)\\)：列空间与左零空间正交，它们在 \\(\\mathbb{R}^m\\) 中是**正交补**

**几何意义**：\\(\\mathbb{R}^n\\) 被划分为行空间和零空间两个正交的部分；\\(\\mathbb{R}^m\\) 被划分为列空间和左零空间。

\\[\\mathbb{R}^n = C(A^T) \\oplus N(A)\\]
\\[\\mathbb{R}^m = C(A) \\oplus N(A^T)\\]

### 3.3 可视化

\`\`\`
                    ℝⁿ                    ℝᵐ
         ┌──────────────────┐      ┌──────────────────┐
         │  行空间 C(Aᵀ)    │      │  列空间 C(A)     │
         │  dim = r         │ A    │  dim = r         │
         │                  │─────→│                  │
         │ ⟂                │      │ ⟂                │
         │  零空间 N(A)     │      │  左零空间 N(Aᵀ)  │
         │  dim = n-r       │      │  dim = m-r       │
         └──────────────────┘      └──────────────────┘
\`\`\`

\`\`\`python
import numpy as np

# 用 Python 求四个基本子空间
A = np.array([[1, 0, 1],
              [2, 1, 3],
              [1, 0, 1]])  # 第三行 = 第一行

m, n = A.shape
r = np.linalg.matrix_rank(A)
print(f"矩阵大小: {m}×{n}, 秩: {r}")

# 列空间 C(A)
u, s, vh = np.linalg.svd(A)
C_A = u[:, :r]  # 前 r 个左奇异向量张成列空间
print("列空间基:")
print(C_A)

# 零空间 N(A)
N_A = vh[r:].T  # 后 n-r 个右奇异向量张成零空间
print("零空间基:")
print(N_A)

# 行空间 C(A^T)
Row_A = vh[:r].T  # 前 r 个右奇异向量张成行空间
print("行空间基:")
print(Row_A)

# 左零空间 N(A^T)
L_N = u[:, r:]  # 后 m-r 个左奇异向量张成左零空间
print("左零空间基:")
print(L_N)

# 验证正交性
print("行空间·零空间:", np.round(Row_A.T @ N_A, 2))
print("列空间·左零空间:", np.round(C_A.T @ L_N, 2))
\`\`\`

## 4. 实际应用

四个基本子空间的理论在实际中无处不在：

- **最小二乘法**：\\(\\mathbf{b}\\) 投影到列空间 \\(C(A)\\)
- **信号处理**：信号分解到行空间和零空间
- **编码理论**：零空间用于错误检测
- **数据压缩**：SVD 利用四个子空间结构

## 5. 思考练习

1. 找出 \\(A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}\\) 的四个基本子空间
2. 证明 \\(\\dim C(A) = \\dim C(A^T)\\)
3. 验证：\\(N(A)\\) 中的任何向量与 \\(C(A^T)\\) 中的任何向量正交
4. 对于 \\(5 \\times 3\\) 的秩为 2 的矩阵，四个子空间的维度分别是多少？

## 本章总结

- 基是最小的生成集，维度是基的大小
- 秩-零化度定理：\\(\\text{rank} + \\text{nullity} = \\text{列数}\\)
- 四个基本子空间完整描述矩阵的作用
- 行空间 ⟂ 零空间，列空间 ⟂ 左零空间
`,
  },
  {
    title: "正交性与投影",
    slug: "orthogonality-projections",
    order: 6,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 理解正交向量和正交子空间
- 计算向量在子空间上的投影
- 理解投影矩阵的性质
- 应用投影解决最小平方问题

## 1. 正交向量

两个向量 \\(\\mathbf{v}, \\mathbf{w}\\) 正交当且仅当它们的点积为零：

\\[\\mathbf{v} \\cdot \\mathbf{w} = 0\\]

**几何意义**：两个向量相互垂直。

## 2. 正交子空间

两个子空间 \\(V\\) 和 \\(W\\) 正交如果 \\(V\\) 中的每个向量都与 \\(W\\) 中的每个向量正交。

### 2.1 重要例子

行空间与零空间正交：

对于 \\(A\\mathbf{x} = \\mathbf{0}\\)，\\(A\\) 的每行与 \\(\\mathbf{x}\\) 的点积为零。所以零空间的向量与每一行正交，因此与整个行空间正交。

同理，列空间与左零空间正交。

## 3. 投影到直线上

### 3.1 标量投影

向量 \\(\\mathbf{b}\\) 投影到 \\(\\mathbf{a}\\) 方向上的标量长度为：

\\[p = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|} = \\frac{a^T b}{\\sqrt{a^T a}}\\]

### 3.2 向量投影

投影向量为：

\\[\\mathbf{p} = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\|^2} \\mathbf{a} = \\frac{a a^T}{a^T a} \\mathbf{b}\\]

### 3.3 投影矩阵（一维）

\\[P = \\frac{a a^T}{a^T a}\\]

**性质**：
- \\(P^T = P\\)（对称）
- \\(P^2 = P\\)（幂等）

\\(\\mathbf{p} = P\\mathbf{b}\\)

\\[\\mathbf{b} \\text{ 在 } \\mathbf{a} \\text{ 上的投影} = P\\mathbf{b}\\]

## 4. 投影到子空间

### 4.1 一般情况

给定矩阵 \\(A\\) 的列空间，向量 \\(\\mathbf{b}\\) 投影到 \\(C(A)\\) 上的投影矩阵为：

\\[P = A(A^T A)^{-1}A^T\\]

投影向量为：\\(\\hat{\\mathbf{b}} = P\\mathbf{b}\\)

### 4.2 误差向量

\\[\\mathbf{e} = \\mathbf{b} - \\hat{\\mathbf{b}} = \\mathbf{b} - A\\hat{\\mathbf{x}}\\]

误差向量垂直于投影平面：\\(\\mathbf{e} \\perp C(A)\\)，即 \\(A^T\\mathbf{e} = \\mathbf{0}\\)。

### 4.3 法方程 (Normal Equations)

\\(A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\)

这是求解 \\(\\hat{\\mathbf{x}}\\) 的标准方程。

\`\`\`python
import numpy as np

def project_onto_subspace(A, b):
    """将 b 投影到 A 的列空间"""
    # 法方程: A^T A x_hat = A^T b
    x_hat = np.linalg.solve(A.T @ A, A.T @ b)
    # 投影
    p = A @ x_hat
    return p, x_hat

# 示例：将 (1, 2, 3) 投影到由 (1,0,0) 和 (0,1,0) 张成的平面（xy平面）
A = np.array([[1, 0],
              [0, 1],
              [0, 0]])
b = np.array([1, 2, 3])

p, x = project_onto_subspace(A, b)
print("原始向量 b:", b)
print("投影 p:", p)
print("误差 e:", b - p)  # (0, 0, 3) —— 只有 z 分量被去掉
print("验证正交: p·e =", np.dot(p, b-p))
\`\`\`

## 5. 投影矩阵的性质

\\[P = A(A^T A)^{-1}A^T\\]

1. \\(P\\) 是对称的：\\(P^T = P\\)
2. \\(P\\) 是幂等的：\\(P^2 = P\\)
3. \\(P\\) 的列空间是 \\(C(A)\\)
4. \\(P\\) 的零空间是 \\(C(A)^\\perp\\)
5. \\(I - P\\) 投影到 \\(C(A)^\\perp\\)

\`\`\`python
A = np.array([[1, 0], [0, 1], [0, 0]])
P = A @ np.linalg.inv(A.T @ A) @ A.T
print("投影矩阵 P:")
print(np.round(P, 2))

print("P 对称?", np.allclose(P, P.T))
print("P^2 = P?", np.allclose(P @ P, P))

# 误差投影矩阵
I = np.eye(3)
E = I - P
print("误差投影矩阵:")
print(np.round(E, 2))
\`\`\`

## 6. 应用：线性拟合

找到最佳拟合直线 \\(y = C + Dt\\)：

\`\`\`python
# 数据点: (1, 1), (2, 2), (3, 3), (4, 5)
t = np.array([1, 2, 3, 4])
y = np.array([1, 2, 3, 5])

# 构造 A: [1 t]
A = np.column_stack([np.ones_like(t), t])
# 求解
x_hat = np.linalg.solve(A.T @ A, A.T @ y)
C, D = x_hat
print(f"最佳拟合直线: y = {C:.2f} + {D:.2f}t")

# 预测
t_new = 5
y_pred = C + D * t_new
print(f"t=5 时的预测值: {y_pred:.2f}")
\`\`\`

## 7. 思考练习

1. 投影矩阵 \\(P\\) 的特征值可能是什么？为什么？
2. 证明：\\(P^2 = P\\) 意味着 \\(I-P\\) 也是投影矩阵
3. 找到将 \\(\\mathbf{b}\\) 投影到 \\(\\mathbf{a} = [1,1,1]\\) 上的投影矩阵
4. 用最小二乘法拟合三个点 \\((0,0), (1,2), (2,3)\\) 的直线

## 本章总结

- 投影是将向量分解为"在子空间中的分量"和"垂直于子空间的分量"
- 投影矩阵满足 \\(P^T = P\\) 和 \\(P^2 = P\\)
- 法方程 \\(A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\) 是投影的核心
- 投影用于最小二乘法（最佳拟合）
`,
  },
  {
    title: "Gram-Schmidt 与 QR 分解",
    slug: "gram-schmidt-qr",
    order: 7,
    estimatedMinutes: 50,
    content: `## 学习目标

完成本节后，你将能够：
- 理解 Gram-Schmidt 正交化过程
- 构造正交基和标准正交基
- 理解 QR 分解及其应用
- 用 Python 实现 Gram-Schmidt 和 QR 分解

## 1. 标准正交基

一组向量 \\(\\{\\mathbf{q}_1, \\ldots, \\mathbf{q}_n\\}\\) 是标准正交的 (orthonormal) 如果：

\\[\\mathbf{q}_i \\cdot \\mathbf{q}_j = \\begin{cases} 1, & i = j \\\\ 0, & i \\neq j \\end{cases}\\]

**性质**：
- 标准正交基的矩阵 \\(Q\\) 满足 \\(Q^T Q = I\\)
- 如果 \\(Q\\) 是方阵，则 \\(Q^T = Q^{-1}\\)

## 2. Gram-Schmidt 正交化

将一组线性无关的向量转换为标准正交基的过程。

### 2.1 算法

输入：线性无关的向量 \\(\\mathbf{a}_1, \\ldots, \\mathbf{a}_n\\)

1. 对第一个向量归一化：\\(\\mathbf{q}_1 = \\mathbf{a}_1 / \\|\\mathbf{a}_1\\|\\)

2. 对第 \\(k\\) 个向量：
   - 减去前面所有方向上的投影：
     \\[\\mathbf{v}_k = \\mathbf{a}_k - (\\mathbf{q}_1\\cdot\\mathbf{a}_k)\\mathbf{q}_1 - \\cdots - (\\mathbf{q}_{k-1}\\cdot\\mathbf{a}_k)\\mathbf{q}_{k-1}\\]
   - 归一化：\\(\\mathbf{q}_k = \\mathbf{v}_k / \\|\\mathbf{v}_k\\|\\)

### 2.2 代码实现

\`\`\`python
import numpy as np

def gram_schmidt(A):
    """Gram-Schmidt 正交化"""
    n, k = A.shape
    Q = np.zeros((n, k))

    for j in range(k):
        # 取第 j 列
        v = A[:, j].copy()
        # 减去在之前方向上的投影
        for i in range(j):
            q = Q[:, i]
            v = v - np.dot(q, A[:, j]) * q
        # 归一化
        Q[:, j] = v / np.linalg.norm(v)
    return Q

# 示例
A = np.array([[1, 1],
              [1, 0],
              [0, 1]])
Q = gram_schmidt(A)
print("正交基:")
print(np.round(Q, 3))
print("Q^T Q =")
print(np.round(Q.T @ Q, 3))  # 应该接近单位矩阵
\`\`\`

## 3. QR 分解

### 3.1 定义

任意 \\(m \\times n\\) 矩阵可以分解为：

\\[A = QR\\]

其中 \\(Q\\) 是 \\(m \\times n\\) 标准正交矩阵，\\(R\\) 是 \\(n \\times n\\) 上三角矩阵。

### 3.2 QR 的构造

从 Gram-Schmidt 过程自然得到 QR 分解：

\\[R_{ij} = \\begin{cases} \\mathbf{q}_i \\cdot \\mathbf{a}_j, & i \\leq j \\\\ 0, & i > j \\end{cases}\\]

### 3.3 代码实现

\`\`\`python
def qr_decomposition(A):
    """QR 分解"""
    n, k = A.shape
    Q = np.zeros((n, k))
    R = np.zeros((k, k))

    for j in range(k):
        v = A[:, j].copy()
        for i in range(j):
            R[i, j] = np.dot(Q[:, i], A[:, j])
            v = v - R[i, j] * Q[:, i]
        R[j, j] = np.linalg.norm(v)
        Q[:, j] = v / R[j, j]

    return Q, R

# 测试
A = np.array([[1, -1, 4],
              [1, 4, -2],
              [1, 4, 2],
              [1, -1, 0]])
Q, R = qr_decomposition(A)
print("Q:")
print(np.round(Q, 3))
print("R:")
print(np.round(R, 3))
print("QR - A:")
print(np.round(Q @ R - A, 10))  # 应该接近零
\`\`\`

## 4. QR 分解的应用

### 4.1 求解线性方程组

\\(A\\mathbf{x} = \\mathbf{b} \\implies QR\\mathbf{x} = \\mathbf{b} \\implies R\\mathbf{x} = Q^T\\mathbf{b}\\)

因为 \\(R\\) 是上三角矩阵，可以通过回代高效求解。

\`\`\`python
def solve_with_qr(A, b):
    """用 QR 分解求解 Ax = b"""
    Q, R = qr_decomposition(A)
    # 计算 Q^T b
    y = Q.T @ b
    # 回代求解 Rx = y
    n = R.shape[1]
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        x[i] = (y[i] - R[i, i+1:] @ x[i+1:]) / R[i, i]
    return x

# 测试
A = np.array([[1, 1], [1, 2], [1, 3]])
b = np.array([2, 4, 5])
x = solve_with_qr(A, b)
print("解:", x)
print("对比 np.linalg.lstsq:", np.linalg.lstsq(A, b, rcond=None)[0])
\`\`\`

### 4.2 数值稳定性

相比正规方程 \\(A^T A\\hat{\\mathbf{x}} = A^T\\mathbf{b}\\)，QR 分解在数值上更稳定，因为不需要计算 \\(A^T A\\)（这可能会放大条件数）。

## 5. 思考练习

1. 对 \\(\\mathbf{a}_1 = [1,1,0], \\mathbf{a}_2 = [1,0,1]\\) 做 Gram-Schmidt 正交化
2. 证明：如果 \\(Q\\) 是标准正交矩阵，则 \\(\\|Q\\mathbf{x}\\| = \\|\\mathbf{x}\\|\\)
3. QR 分解和 LU 分解相比，各自的优缺点是什么？
4. 用 QR 分解解决一个最小二乘问题（数据点先你自己定）

## 本章总结

- Gram-Schmidt 通过逐步减去投影来构造正交基
- QR 分解将矩阵分解为正交矩阵和上三角矩阵的乘积
- QR 分解在数值上比正规方程更稳定
- 它是求解最小二乘问题的首选方法之一
`,
  },
  {
    title: "行列式理论与计算",
    slug: "determinants",
    order: 8,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 理解行列式的几何意义
- 掌握行列式的十大性质
- 高效计算行列式
- 理解行列式的应用

## 1. 行列式的几何意义

### 1.1 二维中：平行四边形的面积

\\[\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc\\]

**几何意义**：这是由 \\((a,c)\\) 和 \\((b,d)\\) 张成的平行四边形的**有向面积**。

### 1.2 三维中：平行六面体的体积

3×3 行列式给出三个列向量张成的平行六面体的有向体积。

**关键直觉**：行列式衡量线性变换"缩放"面积/体积的倍数。

## 2. 行列式的十大性质

### 性质 1-3：定义性质

1. \\(\\det(I) = 1\\)
2. 交换两行，行列式变号
3. 行列式对每行是线性的

### 性质 4-6：简化计算

4. 两行相同 ⇒ \\(\\det = 0\\)
5. 一行减去另一行的倍数，行列式不变（消元不影响行列式！）
6. 一行全为零 ⇒ \\(\\det = 0\\)

### 性质 7-8：矩阵操作

7. \\(\\det(A) = \\det(A^T)\\)
8. \\(\\det(AB) = \\det(A) \\det(B)\\)
9. \\(\\det(A^{-1}) = 1/\\det(A)\\)

### 性质 10：三角矩阵

\\(\\det(\\text{三角矩阵}) = \\text{对角线元素的乘积}\\)

## 3. 行列式的计算方法

### 3.1 2×2 和 3×3 公式

**2×2**：\\(\\det = ad - bc\\)

**3×3（Sarrus 法则）**：

\\[\\det\\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} = \\]
\\[a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}\\]

### 3.2 通过消元计算

将矩阵通过行操作消元为上三角形式，然后取对角线乘积（同时记录行交换的次数）：

\\[\\det(A) = (-1)^{\\#\\text{行交换}} \\times \\prod \\text{主元}\\]

\`\`\`python
import numpy as np

def det_via_elimination(A):
    """通过消元计算行列式"""
    n = len(A)
    U = A.astype(float).copy()
    sign = 1

    for col in range(n-1):
        # 选主元
        if abs(U[col, col]) < 1e-10:
            for row in range(col+1, n):
                if abs(U[row, col]) > 1e-10:
                    U[[col, row]] = U[[row, col]]
                    sign *= -1
                    break

        if abs(U[col, col]) < 1e-10:
            return 0.0

        for row in range(col+1, n):
            factor = U[row, col] / U[col, col]
            U[row, col:] -= factor * U[col, col:]

    det = sign * np.prod(np.diag(U))
    return det

A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 10]])
print("手动计算:", det_via_elimination(A))
print("numpy验证:", np.linalg.det(A))
\`\`\`

### 3.3 展开公式（余子式）

行列式可以按任意行或列展开：

\\[\\det(A) = \\sum_{j=1}^n a_{ij} C_{ij}\\]

其中 \\(C_{ij} = (-1)^{i+j} M_{ij}\\) 是余子式，\\(M_{ij}\\) 是去掉第 i 行第 j 列后的子式。

## 4. 行列式的应用

### 4.1 判断可逆性

\\[\\det(A) = 0 \\iff A \\text{ 是奇异的}\\]
\\[\\det(A) \\neq 0 \\iff A \\text{ 是可逆的}\\]

### 4.2 克拉默法则 (Cramer's Rule)

解 \\(A\\mathbf{x} = \\mathbf{b}\\) 的公式：

\\[x_j = \\frac{\\det(A_j)}{\\det(A)}\\]

其中 \\(A_j\\) 是将 \\(A\\) 的第 \\(j\\) 列替换为 \\(\\mathbf{b}\\)。

**注意**：克拉默法则理论价值高，但计算效率低（实际中不用它来求解）。

### 4.3 特征多项式

\\(\\det(A - \\lambda I) = 0\\) 给出矩阵 \\(A\\) 的特征多项式，其根是特征值。

\`\`\`python
A = np.array([[1, 2], [2, 1]])

# 特征多项式: det(A - λI) = (1-λ)² - 4 = λ² - 2λ - 3
# 特征值: λ = 3, λ = -1
eigvals = np.linalg.eigvals(A)
print("特征值:", eigvals)

# 验证: det(A) = 特征值的积
print("det(A) =", np.linalg.det(A))
print("特征值积 =", np.prod(eigvals))
\`\`\`

## 5. 思考练习

1. 计算 \\(\\det\\begin{bmatrix} 2 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix}\\)
2. 证明 \\(\\det(A^{-1}) = 1/\\det(A)\\)
3. 一个 4×4 矩阵的对角线元素都是 2，非对角线都是 1，求行列式
4. 用消元和展开两种方法计算同一个 4×4 矩阵的行列式，比较结果

## 本章总结

- 行列式度量线性变换对"体积"的缩放
- 十大性质是行列式理论的基础
- 消元法（上三角化）是计算行列式的实用方法
- 行列式为 0 ⇔ 矩阵奇异
`,
  },
  {
    title: "特征值与特征向量",
    slug: "eigenvalues-eigenvectors",
    order: 9,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 理解特征值和特征向量的几何意义
- 计算矩阵的特征值和特征向量
- 掌握特征值分解
- 理解特征值的应用

## 1. 核心思想

### 1.1 定义

对于方阵 \\(A\\)，如果存在非零向量 \\(\\mathbf{x}\\) 和标量 \\(\\lambda\\) 使得：

\\[A\\mathbf{x} = \\lambda\\mathbf{x}\\]

那么 \\(\\lambda\\) 是 \\(A\\) 的**特征值**，\\(\\mathbf{x}\\) 是**特征向量**。

### 1.2 几何意义

**特征向量是线性变换下的"特殊方向"**——在这个方向上，变换只做拉伸/压缩，不改变方向。

**类比**：想象你在揉一团面。大多数方向上的点都会被移动到不同位置；但有一些"特殊方向"上的点只在同一条直线上移动——这些就是特征向量，拉伸倍数就是特征值。

### 1.3 一个直观例子

\\[A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\]

作用在 \\(\\mathbf{x} = [1,0]\\) 上：\\(A\\mathbf{x} = [2,0] = 2\\mathbf{x}\\) —— 所以 \\(\\lambda = 2\\)
作用在 \\(\\mathbf{x} = [0,1]\\) 上：\\(A\\mathbf{x} = [0,3] = 3\\mathbf{x}\\) —— 所以 \\(\\lambda = 3\\)

对角矩阵的特征向量就是标准基向量！

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# 3Blue1Brown 风格的直观演示
A = np.array([[1, 2], [2, 1]])
eigvals, eigvecs = np.linalg.eig(A)

print("特征值:", eigvals)
print("特征向量:")
print(eigvecs)

# 验证
for i in range(2):
    v = eigvecs[:, i]
    l = eigvals[i]
    lhs = A @ v
    rhs = l * v
    print(f"A * v{i} = {lhs}, {l} * v{i} = {rhs}, 匹配?", np.allclose(lhs, rhs))
\`\`\`

## 2. 特征方程

### 2.1 求解方法

\\[A\\mathbf{x} = \\lambda\\mathbf{x} \\implies (A - \\lambda I)\\mathbf{x} = \\mathbf{0}\\]

非零解存在 ⇔ \\(\\det(A - \\lambda I) = 0\\)

这就是**特征方程**——一个 \\(n\\) 次多项式方程。

### 2.2 2×2 例子的完整求解

\\[A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\]

\\[\\det(A - \\lambda I) = \\det\\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix} = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3\\]

\\[\\lambda = 3, \\lambda = 1\\]

对 \\(\\lambda = 3\\)：求解 \\((A - 3I)\\mathbf{x} = \\mathbf{0}\\)
\\[\\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix} \\mathbf{x} = \\mathbf{0} \\implies \\mathbf{x} = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}\\]

对 \\(\\lambda = 1\\)：\\((A - I)\\mathbf{x} = \\mathbf{0} \\implies \\mathbf{x} = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}\\)

\`\`\`python
import sympy as sp

# 用 sympy 符号计算
A = sp.Matrix([[2, 1], [1, 2]])
eig = A.eigenvects()
for val, mult, vecs in eig:
    print(f"特征值: {val}, 重数: {mult}")
    for v in vecs:
        print(f"  特征向量: {v.T}")
\`\`\`

## 3. 重要性质

### 3.1 迹和行列式

\\[\\text{tr}(A) = \\sum_{i=1}^n \\lambda_i\\]
\\[\\det(A) = \\prod_{i=1}^n \\lambda_i\\]

**证明提示**：
特征多项式 \\(\\det(A - \\lambda I) = (-1)^n\\lambda^n + (-1)^{n-1}(\\text{tr}A)\\lambda^{n-1} + \\cdots + \\det(A)\\)
由多项式根与系数的关系即得。

### 3.2 特征值的上下界

**Gershgorin 圆盘定理**：每个特征值至少位于一个圆盘中：
\\[|\\lambda - a_{ii}| \\leq \\sum_{j \\neq i} |a_{ij}|\\]
（即：特征值在以对角线元素为中心、行绝对值和为半径的圆盘内）

\`\`\`python
def gershgorin_discs(A):
    """计算 Gershgorin 圆盘"""
    n = len(A)
    discs = []
    for i in range(n):
        center = A[i, i]
        radius = sum(abs(A[i, j]) for j in range(n) if j != i)
        discs.append((center, radius))
    return discs

A = np.array([[4, -1, 0],
              [-1, 4, -1],
              [0, -1, 4]])
discs = gershgorin_discs(A)
print("Gershgorin 圆盘:")
for i, (c, r) in enumerate(discs):
    print(f"  行{i}: 中心={c}, 半径={r}")

eigvals = np.linalg.eigvals(A)
print("实际特征值:", eigvals)
# 每个特征值都在某个圆盘中
\`\`\`

## 4. 对角化

### 4.1 定义

如果 \\(A\\) 有 \\(n\\) 个线性无关的特征向量（组成矩阵 \\(S\\)），则：

\\[A = S\\Lambda S^{-1}\\]

其中 \\(\\Lambda\\) 是对角矩阵，对角元素是特征值。

### 4.2 可对角化的条件

- 充分条件：\\(A\\) 有 \\(n\\) 个不同的特征值
- 充要条件：\\(A\\) 的每个特征值的几何重数 = 代数重数

### 4.3 幂的计算

\\[A^k = S\\Lambda^k S^{-1}\\]

这使我们能够高效计算矩阵的高次幂。

\`\`\`python
def matrix_power_eig(A, k):
    """用特征值分解计算矩阵的 k 次幂"""
    eigvals, eigvecs = np.linalg.eig(A)
    S = eigvecs
    Lambda_k = np.diag(eigvals ** k)
    S_inv = np.linalg.inv(S)
    return S @ Lambda_k @ S_inv

A = np.array([[1, 2], [2, 1]])
A_5_eig = matrix_power_eig(A, 5)
A_5_direct = np.linalg.matrix_power(A, 5)
print("A^5 (特征值分解):")
print(A_5_eig)
print("A^5 (直接):")
print(A_5_direct)
print("匹配?", np.allclose(A_5_eig, A_5_direct))
\`\`\`

## 5. 应用：马尔可夫矩阵

马尔可夫矩阵每一列和为1，具有特征值 \\(\\lambda = 1\\)。其稳态分布是对应 \\(\\lambda = 1\\) 的特征向量。

\`\`\`python
# 网页链接的 PageRank 简化版本
M = np.array([[0.9, 0.1],
              [0.1, 0.9]])

eigvals, eigvecs = np.linalg.eig(M)
print("特征值:", eigvals)

# 稳态分布（对应 λ=1 的特征向量）
steady_state = eigvecs[:, 0]
steady_state = steady_state / sum(steady_state)
print("稳态分布:", steady_state)

# 验证: M @ steady = steady
print("M @ steady =", M @ steady_state)
\`\`\`

## 6. 思考练习

1. 求 \\(A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}\\) 的特征值和特征向量
2. 证明 \\(A\\) 和 \\(A^T\\) 有相同的特征值
3. 如果 \\(\\lambda\\) 是 \\(A\\) 的特征值，\\(A^{-1}\\) 的特征值是什么？
4. 用特征值分解计算 \\(A^{10}\\)，其中 \\(A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\)

## 本章总结

- 特征向量是变换下的"特殊方向"，特征值是缩放倍数
- \\(\\det(A - \\lambda I) = 0\\) 是求解特征值的基本方程
- \\(\\text{tr}(A) = \\sum \\lambda_i\\)，\\(\\det(A) = \\prod \\lambda_i\\)
- 对角化 \\(A = S\\Lambda S^{-1}\\) 简化了矩阵幂和多项式计算
`,
  },
  {
    title: "对称矩阵与正定性",
    slug: "symmetric-positive-definite",
    order: 10,
    estimatedMinutes: 50,
    content: `## 学习目标

完成本节后，你将能够：
- 理解对称矩阵的特殊性质
- 判断矩阵是否正定
- 理解正定矩阵的几何意义
- 掌握正定矩阵的判定方法

## 1. 对称矩阵

### 1.1 定义和性质

\\(A^T = A\\)

**谱定理**：对称矩阵可被正交对角化：

\\[A = Q\\Lambda Q^T\\]

其中 \\(Q\\) 是正交矩阵（\\(Q^T = Q^{-1}\\)），\\(\\Lambda\\) 是实对角矩阵。

**关键性质**：
- 对称矩阵的特征值都是实数
- 对称矩阵的特征向量相互正交
- 对称矩阵可以被正交对角化

### 1.2 证明：对称矩阵的特征值是实数

设 \\(A\\mathbf{x} = \\lambda\\mathbf{x}\\)，\\(\\mathbf{x} \\neq \\mathbf{0}\\)

\\[\\bar{\\mathbf{x}}^T A \\mathbf{x} = \\lambda\\bar{\\mathbf{x}}^T\\mathbf{x}\\]

由于 \\(A = A^T\\)，左边是实数（取共轭转置不变），所以 \\(\\lambda\\) 是实数。

\`\`\`python
import numpy as np

# 对称矩阵的例子
A = np.array([[3, 1, 0],
              [1, 3, 1],
              [0, 1, 3]])

eigvals, eigvecs = np.linalg.eigh(A)  # 专为对称矩阵设计
print("特征值（全部实数）:", eigvals)
print("特征向量互相正交:")
print(np.round(eigvecs.T @ eigvecs, 2))  # 接近单位矩阵
\`\`\`

## 2. 正定矩阵

### 2.1 定义

对称矩阵 \\(A\\) 是正定的，如果对所有非零向量 \\(\\mathbf{x}\\)：

\\[\\mathbf{x}^T A \\mathbf{x} > 0\\]

### 2.2 几何意义

**二次型** \\(f(\\mathbf{x}) = \\mathbf{x}^T A \\mathbf{x}\\) 定义了一个"碗形"曲面。正定意味着这个碗**朝上**——能量始终为正。

这是二次型 "是椭圆形的"，而不是"马鞍形"的判别标准。

**类比**：在物理中，正定矩阵对应稳定平衡——任何微小偏离都会产生恢复力。

### 2.3 等价条件

以下条件等价（对对称矩阵 \\(A\\)）：

1. \\(\\mathbf{x}^T A \\mathbf{x} > 0\\) 对所有 \\(\\mathbf{x} \\neq \\mathbf{0}\\)
2. 所有特征值 > 0
3. 所有主元 > 0（消元过程中）
4. 所有顺序主子式 > 0
5. 存在可逆矩阵 \\(R\\) 使得 \\(A = R^T R\\)

\`\`\`python
def is_positive_definite(A):
    """判断矩阵是否正定"""
    # 方法1: 检查特征值
    eigvals = np.linalg.eigvalsh(A)
    if np.all(eigvals > 0):
        print("✓ 正定：所有特征值 > 0")
        return True
    elif np.all(eigvals >= 0):
        print("半正定：有零特征值")
        return False
    else:
        print("✗ 不正定：有负特征值")
        return False

# 正定矩阵示例
A_pos = np.array([[2, -1], [-1, 2]])
is_positive_definite(A_pos)

# 非正定矩阵（鞍点）
A_neg = np.array([[1, 0], [0, -1]])
is_positive_definite(A_neg)

# 几何验证
x = np.array([1, 1])
print("x^T A_pos x =", x.T @ A_pos @ x)    # 正数
print("x^T A_neg x =", x.T @ A_neg @ x)    # 0
\`\`\`

### 2.4 2×2 正定的简单判据

\\[A = \\begin{bmatrix} a & b \\\\ b & c \\end{bmatrix}\\]

\\(A\\) 正定当且仅当：

\\[a > 0 \\quad \\text{且} \\quad ac - b^2 > 0\\]

（第一个主元为正 + 行列式为证）

## 3. 二次型与等高线

\\[\\mathbf{x}^T A \\mathbf{x} = 1\\]

当 \\(A\\) 正定时，该方程定义一个**椭球**，其轴方向由特征向量给出，轴长由特征值决定。

\`\`\`python
import numpy as np

# 可视化椭球
A = np.array([[3, 1], [1, 3]])
eigvals, eigvecs = np.linalg.eigh(A)

print("特征值（轴长平方的倒数）:", eigvals)
print("特征向量（轴方向）:")
print(eigvecs)

# 轴长 = 1 / sqrt(λ)
axis_lengths = 1 / np.sqrt(eigvals)
print("轴长:", axis_lengths)
\`\`\`

## 4. 正定矩阵在机器学习中的应用

### 4.1 协方差矩阵

协方差矩阵是半正定的，它描述数据的分布形状。

### 4.2 Hessian 矩阵

函数的 Hessian 矩阵的正定性决定了该点是局部极小值（正定）、极大值（负定）还是鞍点（不定）。

## 5. 半正定矩阵

\\[\\mathbf{x}^T A \\mathbf{x} \\geq 0 \\quad \\text{对所有 } \\mathbf{x}\\]

- 所有特征值 ≥ 0
- 可以写成 \\(A = B^T B\\)（\\(B\\) 可能不可逆）

## 6. 思考练习

1. 判断 \\(\\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix}\\) 是否正定
2. 判断 \\(\\begin{bmatrix} 2 & 2 \\\\ 2 & 5 \\end{bmatrix}\\) 是否正定
3. 构造一个 3×3 的正定矩阵，验证所有五个等价条件
4. 证明：如果 \\(A\\) 正定，则 \\(A^{-1}\\) 也正定

## 本章总结

- 对称矩阵可正交对角化 \\(A = Q\\Lambda Q^T\\)
- 正定矩阵：\\(\\mathbf{x}^T A \\mathbf{x} > 0\\)
- 等价条件：正特征值、正主元、正顺序主子式、\\(A = R^T R\\)
- 正定性在优化、统计、物理中至关重要
`,
  },
  {
    title: "奇异值分解 SVD",
    slug: "singular-value-decomposition",
    order: 11,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 理解 SVD 的几何意义
- 计算 SVD 分解
- 理解 SVD 与四个基本子空间的关系
- 应用SVD进行数据压缩

## 1. 什么是 SVD？

### 1.1 定义

任意 \\(m \\times n\\) 矩阵 \\(A\\) 可以分解为：

\\[A = U \\Sigma V^T\\]

其中：
- \\(U\\) 是 \\(m \\times m\\) 正交矩阵（左奇异向量）
- \\(\\Sigma\\) 是 \\(m \\times n\\) 对角矩阵（奇异值 \\(\\sigma_i\\)）
- \\(V\\) 是 \\(n \\times n\\) 正交矩阵（右奇异向量）

### 1.2 几何意义

SVD 将一个线性变换分解为三个简单步骤：
1. **旋转** (\\(V^T\\)) — 在输入空间旋转/反射
2. **缩放** (\\(\\Sigma\\)) — 沿各方向拉伸/压缩
3. **旋转** (\\(U\\)) — 在输出空间旋转/反射

\`\`\`
   A        =   U     ×   Σ     ×   Vᵀ
 (旋转+缩放)    (旋转)    (缩放)    (旋转)
\`\`\`

### 1.3 与特征值分解的关系

- SVD 适用于**任意**矩阵，特征值分解只适用于方阵
- 对对称半正定矩阵：\\(A = Q\\Lambda Q^T\\) 其实就是 SVD
- \\(U\\) 的列是 \\(AA^T\\) 的特征向量
- \\(V\\) 的列是 \\(A^T A\\) 的特征向量
- \\(\\sigma_i^2\\) 是 \\(A^T A\\) 的特征值

\`\`\`python
import numpy as np

# SVD 分解
A = np.array([[1, 0, 1],
              [0, 1, 1],
              [1, 1, 0]])

U, s, Vt = np.linalg.svd(A)
V = Vt.T

print("U =")
print(np.round(U, 3))
print("\\n奇异值 =", np.round(s, 3))
print("\\nV =")
print(np.round(V, 3))

# 验证 A = U Σ V^T
Sigma = np.zeros(A.shape)
Sigma[:len(s), :len(s)] = np.diag(s)
A_reconstructed = U @ Sigma @ Vt
print("\\nA_reconstructed - A =")
print(np.round(A_reconstructed - A, 10))  # 接近0
\`\`\`

## 2. SVD 与四个基本子空间

SVD 揭示矩阵的四个基本子空间：

| 子空间 | 由...张成 |
|--------|----------|
| 列空间 \\(C(A)\\) | \\(U\\) 的前 \\(r\\) 列 |
| 左零空间 \\(N(A^T)\\) | \\(U\\) 的后 \\(m-r\\) 列 |
| 行空间 \\(C(A^T)\\) | \\(V\\) 的前 \\(r\\) 列 |
| 零空间 \\(N(A)\\) | \\(V\\) 的后 \\(n-r\\) 列 |

其中 \\(r\\) 是秩。

\`\`\`python
def four_subspaces_svd(A):
    """用 SVD 求矩阵的四个基本子空间"""
    U, s, Vt = np.linalg.svd(A)
    r = np.sum(s > max(A.shape) * np.finfo(float).eps * s[0])
    m, n = A.shape

    return {
        "列空间": U[:, :r],
        "左零空间": U[:, r:],
        "行空间": Vt[:r, :].T,
        "零空间": Vt[r:, :].T,
    }

A = np.array([[1, 0, 1],
              [0, 1, 1],
              [0, 0, 0]])
subspaces = four_subspaces_svd(A)
for name, basis in subspaces.items():
    print(f"{name}: shape {basis.shape}")
    print(np.round(basis, 2))
    print()
\`\`\`

## 3. SVD 和数据压缩

### 3.1 矩阵的低秩近似

将 SVD 截断到前 \\(k\\) 个奇异值：

\\[A \\approx U_k \\Sigma_k V_k^T = \\sum_{i=1}^k \\sigma_i u_i v_i^T\\]

这是 \\(A\\) 的**最佳秩 \\(k\\) 近似**（Eckart-Young 定理）。

### 3.2 图像压缩示例

\`\`\`python
# 将 SVD 用于矩阵压缩
def svd_compress(A, k):
    """用 SVD 对矩阵做低秩近似"""
    U, s, Vt = np.linalg.svd(A, full_matrices=False)
    # 只保留前 k 个奇异值
    U_k = U[:, :k]
    s_k = s[:k]
    Vt_k = Vt[:k, :]
    return U_k @ np.diag(s_k) @ Vt_k

# 示例矩阵
A = np.random.randn(50, 50)

# 不同秩的近似
for k in [5, 10, 25, 50]:
    A_k = svd_compress(A, k)
    error = np.linalg.norm(A - A_k) / np.linalg.norm(A)
    compression = k * (50 + 50) / (50 * 50)
    print(f"k={k:2d}: 相对误差={error:.3f}, 压缩率={compression:.2%}")

# 存储量对比：
# 原始: 50×50 = 2500 个值
# k=10: 50×10 + 10 + 10×50 = 1010 个值，压缩了 60%
\`\`\`

### 3.3 压缩率计算

原始矩阵需要存储 \\(mn\\) 个值。
秩 \\(k\\) 近似需要存储 \\(mk + k + kn = k(m+n+1)\\) 个值。

**压缩率** = \\(\\frac{k(m+n+1)}{mn}\\)

## 4. SVD 的其他应用

### 4.1 条件数

\\[\\text{cond}(A) = \\frac{\\sigma_\\max}{\\sigma_\\min}\\]

条件数衡量矩阵对误差的敏感程度：
- 条件数大 → 病态矩阵（小扰动大变化）
- 条件数小时 1 → 良态矩阵

### 4.2 伪逆

\\[A^+ = V \\Sigma^+ U^T\\]

其中 \\(\\Sigma^+\\) 是将非零奇异值的倒数放在对角线上。

伪逆用于求解最小二乘问题 \\(\\min \\|A\\mathbf{x} - \\mathbf{b}\\|\\) 的最小范数解。

\`\`\`python
# 矩阵的条件数
A_ill = np.array([[1, 1], [1, 1.001]])
print("条件数:", np.linalg.cond(A_ill))  # 很大

A_well = np.array([[1, 0], [0, 1]])
print("条件数:", np.linalg.cond(A_well))  # 1

# numpy 的伪逆
A = np.array([[1, 2], [2, 4], [3, 6]])
A_pinv = np.linalg.pinv(A)
print("伪逆:")
print(np.round(A_pinv, 3))
\`\`\`

## 5. 思考练习

1. 对 \\(A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\) 做 SVD，与它的特征值分解对比
2. 为什么 SVD 比特征值分解更通用？
3. 用 SVD 对一个简单的图像矩阵做压缩（取前 10% 的奇异值）
4. 证明：\\(\\|A\\|_2 = \\sigma_\\max\\)

## 本章总结

- SVD 将任意矩阵分解为旋转 × 缩放 × 旋转
- SVD 完整揭示四个基本子空间
- 截断 SVD 给出矩阵的最佳低秩近似
- SVD 是 PCA、数据压缩、推荐系统、条件数计算的基础
`,
  },
  {
    title: "线性变换",
    slug: "linear-transformations",
    order: 12,
    estimatedMinutes: 50,
    content: `## 学习目标

完成本节后，你将能够：
- 理解线性变换的定义和矩阵表示
- 掌握坐标变换
- 理解不同基下的矩阵表示
- 应用线性变换解决实际问题

## 1. 线性变换的定义

### 1.1 定义

映射 \\(T: V \\to W\\) 是线性变换，如果对任意 \\(\\mathbf{u}, \\mathbf{v} \\in V\\) 和标量 \\(c\\)：

\\[T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})\\]
\\[T(c\\mathbf{u}) = cT(\\mathbf{u})\\]

合并为一条：\\(T(c\\mathbf{u} + \\mathbf{v}) = cT(\\mathbf{u}) + T(\\mathbf{v})\\)

### 1.2 例子

- \\(T(\\mathbf{x}) = A\\mathbf{x}\\)（左乘矩阵）是线性变换
- \\(T(f) = f'\\)（求导）是线性变换
- \\(T(\\mathbf{x}) = \\mathbf{x} + \\mathbf{b}\\) 不是线性变换（\\(T(\\mathbf{0}) = \\mathbf{b} \\neq \\mathbf{0}\\)）

## 2. 线性变换的矩阵表示

### 2.1 核心思想

在选定基下，每个线性变换对应一个矩阵。

设 \\(V\\) 有基 \\(\\mathcal{B} = \\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_n\\}\\)，\\(W\\) 有基 \\(\\mathcal{C} = \\{\\mathbf{w}_1, \\ldots, \\mathbf{w}_m\\}\\)。

变换 \\(T\\) 的矩阵 \\(A\\) 的第 \\(j\\) 列 = \\(T(\\mathbf{v}_j)\\) 在基 \\(\\mathcal{C}\\) 下的坐标。

### 2.2 标准基下的矩阵

用标准基时，\\(T(\\mathbf{x}) = A\\mathbf{x}\\)，\\(A\\) 的第 \\(j\\) 列就是 \\(T(\\mathbf{e}_j)\\)。

\`\`\`python
import numpy as np

# 旋转 90 度的线性变换
def rotate_90(x):
    return np.array([-x[1], x[0]])

# 在标准基下的矩阵表示
e1 = np.array([1, 0])
e2 = np.array([0, 1])

A = np.column_stack([rotate_90(e1), rotate_90(e2)])
print("旋转90度的矩阵:")
print(A)
# 应该是 [[0, -1], [1, 0]]

# 验证
v = np.array([1, 2])
print("T(v) =", rotate_90(v))
print("A @ v =", A @ v)
\`\`\`

## 3. 不同基下的矩阵

### 3.1 基变换

同一线性变换在不同基下有不同的矩阵表示。

如果 \\(T\\) 在基 \\(\\mathcal{B}\\) 下的矩阵是 \\(B\\)，在基 \\(\\mathcal{C}\\) 下的矩阵是 \\(C\\)，且 \\(P\\) 是从 \\(\\mathcal{B}\\) 到 \\(\\mathcal{C}\\) 的过渡矩阵，则：

\\[C = P^{-1} B P\\]

这称为**相似变换**。

### 3.2 相似矩阵

\\(B\\) 和 \\(C\\) 相似如果存在可逆 \\(P\\) 使得 \\(C = P^{-1}BP\\)。

相似矩阵的重要性质：
- 相同的特征值
- 相同的行列式
- 相同的迹
- 相同的秩

\`\`\`python
# 基变换示例
B = np.array([[2, 0], [0, 3]])  # 对角矩阵
P = np.array([[1, 1], [0, 1]])  # 过渡矩阵
P_inv = np.linalg.inv(P)

C = P_inv @ B @ P  # 相似变换
print("C = PAP^{-1}:")
print(C)

# 验证特征值不变
print("B的特征值:", np.linalg.eigvals(B))
print("C的特征值:", np.linalg.eigvals(C))

# 验证行列式不变
print("det(B) =", np.linalg.det(B))
print("det(C) =", np.linalg.det(C))
\`\`\`

## 4. 常见线性变换及其矩阵

### 4.1 旋转变换

绕原点旋转 \\(\\theta\\) 角：

\\[R_\\theta = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\]

### 4.2 反射变换

关于直线的反射：以 x 轴为例

\\[H = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\]

### 4.3 投影变换

投影到 \\(\\mathbf{a}\\) 的方向：

\\[P = \\frac{a a^T}{a^T a}\\]

**重要区别**：投影不可逆（\\(\\det P = 0\\)），旋转可逆（\\(\\det R = 1\\)）。

\`\`\`python
def rotation_matrix(theta):
    return np.array([[np.cos(theta), -np.sin(theta)],
                     [np.sin(theta), np.cos(theta)]])

def reflection_matrix(axis_angle):
    """关于过原点直线的反射"""
    c, s = np.cos(2*axis_angle), np.sin(2*axis_angle)
    return np.array([[c, s], [s, -c]])

R = rotation_matrix(np.pi/3)  # 60度旋转
print("旋转60度:")
print(np.round(R, 3))
print("det(R) =", np.linalg.det(R))  # 1

H = reflection_matrix(np.pi/4)  # 关于45度直线的反射
print("\\n反射:")
print(H)
print("det(H) =", np.linalg.det(H))  # -1
\`\`\`

## 5. 线性变换的复合

两个线性变换的复合对应它们矩阵的**乘积**。

\\[T(U(\\mathbf{x})) = (T \\circ U)(\\mathbf{x}) = BA\\mathbf{x}\\]

其中 \\(A\\) 是 \\(U\\) 的矩阵，\\(B\\) 是 \\(T\\) 的矩阵。

**注意顺序**：先应用 \\(U\\)，再应用 \\(T\\) → 矩阵 \\(BA\\)。

## 6. 思考练习

1. 证明：\\(T(\\mathbf{x}) = A\\mathbf{x}\\) 是线性变换
2. 找出关于直线 \\(y = x\\) 反射的 2×2 矩阵
3. 找出先旋转 30 度再沿 x 轴放大 2 倍的复合变换矩阵
4. 证明：可逆线性变换将直线映射到直线

## 本章总结

- 线性变换保持加法和数乘结构
- 每线性变换对应一个矩阵（选基后）
- 不同基下的矩阵通过相似变换关联
- 线性变换的复合 = 矩阵乘法
`,
  },
]

async function main() {
  console.log("📐 开始导入 MIT 18.06 线性代数课程...")

  // Delete existing linear algebra course if exists
  const existing = await prisma.course.findUnique({ where: { slug: COURSE_DATA.slug } })
  if (existing) {
    console.log("  ⚠️  课程已存在，删除重建...")
    await prisma.lesson.deleteMany({ where: { courseId: existing.id } })
    await prisma.course.delete({ where: { id: existing.id } })
  }

  // Find the "数学基础" category
  const category = await prisma.category.findUnique({ where: { slug: "math-basics" } })
  if (!category) {
    console.error("❌ 找不到 '数学基础' 分类")
    return
  }

  // Create course
  const course = await prisma.course.create({
    data: {
      ...COURSE_DATA,
      categoryId: category.id,
    },
  })

  // Create lessons
  for (const lesson of LESSONS) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        courseId: course.id,
      },
    })
  }

  console.log(`  ✅ 课程: ${course.title}`)
  console.log(`  ✅ 共 ${LESSONS.length} 节课`)
  console.log("\n🎉 MIT 18.06 线性代数课程导入完成！")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
