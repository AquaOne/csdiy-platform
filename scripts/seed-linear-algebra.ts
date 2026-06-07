/**
 * MIT 18.06 线性代数完整课程
 * 参考体系：
 *   - Gilbert Strang《Introduction to Linear Algebra》(第5版)
 *   - MIT 18.06 OCW 全部34讲
 *   - 3Blue1Brown《线性代数的本质》系列16集
 *   - 配套 NumPy/Python 实践代码
 */
import { prisma } from "../src/lib/prisma"

const COURSE = {
  title: "MIT 18.06: 线性代数",
  slug: "mit-linear-algebra",
  description: "从几何直观到矩阵理论的完整线性代数体系 — 基于 Gilbert Strang 经典教材与 MIT 18.06",
  longDescription: `本课程基于 MIT 18.06 与 Gilbert Strang 的《Introduction to Linear Algebra》。
融合 3Blue1Brown 的几何直观方法与零基础友好的渐进式讲解，
确保你学完本课程后能够达到 MIT 本科生水准。

课程四大板块：
【基础篇】向量、线性组合、矩阵运算、高斯消元
【空间篇】向量空间、四个基本子空间、正交性
【理论篇】行列式、特征值、对角化、正定性
【进阶篇】SVD、线性变换、数值方法

每节包含：直观理解 → 严格定义 → 定理证明 → Python实践 → 习题`,
  difficulty: "intermediate",
  estimatedHours: 100,
  order: 2,
  categorySlug: "math-basics",
}

const LESSONS = [
  {
    title: "向量的几何与代数",
    slug: "vectors-intro",
    order: 0,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 用几何和代数两种观点理解向量
- 掌握加法、数乘、线性组合三大运算
- 理解线性组合与张成的空间
- 用 NumPy 实现向量操作

## 1. 向量的三种视角

### 1.1 物理学视角

物理学家眼中的向量是**有大小和方向的量**——力、速度、位移。你可以在纸上画出带箭头的线段，箭头的长度代表大小，指向代表方向。两个向量相加就是"首尾相接"。这个视角很直观，但推广到高维时不够用。

### 1.2 计算机科学视角

程序员眼中的向量是**有序的数字列表**。比如一个学生的成绩单 \\([95, 87, 92, 78]\\) 就是一个四维向量。你可以在 Python 中直接用数组表示它。这个视角便于计算操作，但缺乏几何意义。

### 1.3 数学家的视角

数学家将这两种视角统一起来：**向量是向量空间中的元素**。二维向量 \\(\\begin{bmatrix}2\\\\3\\end{bmatrix}\\) 既可以看作平面上从原点指向 (2,3) 的箭头，也可以看作"向右2步、向上3步"的指令集合。

> **核心思维**：向量 = 带箭头的数字列表。你可以随时在几何直观和代数计算之间切换。

## 2. 向量的基本运算

### 2.1 向量加法

**几何意义**：平行四边形法则。把两个向量首尾相接，从起点到终点的对角线就是和向量。

**代数计算**：对应位置相加。

\\[\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} + \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} 1+3 \\\\ 2+(-1) \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}\\]

> **直觉**：想象你走了"右1上2"，又走了"右3下1"，最终位置是"右4上1"。

### 2.2 数乘

**几何意义**：拉伸或压缩向量。正数保持方向，负数反转方向。

\\[3 \\cdot \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 3 \\end{bmatrix}, \\quad -1 \\cdot \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -2 \\\\ -1 \\end{bmatrix}\\]

> **直觉**：3 倍就是将向量延伸到原来的三倍长，-1 倍就是掉头。

### 2.3 线性组合——最重要的概念

**线性组合** = 缩放 + 相加

\\[c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\cdots + c_n\\mathbf{v}_n\\]

这是线性代数的核心运算。**线性代数本质上就是研究线性组合的学科**。

\\[2\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} + 3\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}\\]

你看，\\(\\begin{bmatrix}2\\\\3\\end{bmatrix}\\) 就是标准基 \\(\\mathbf{e}_1, \\mathbf{e}_2\\) 的一个线性组合。

### 2.4 Python 实践

\`\`\`python
import numpy as np

# 定义向量
v = np.array([2, 3])
w = np.array([-1, 1])

# 加法
print(f"v + w = {v + w}")

# 数乘
print(f"3 * v = {3 * v}")

# 线性组合
print(f"2*v + 0.5*w = {2*v + 0.5*w}")

# 向量长度
print(f"||v|| = {np.linalg.norm(v):.2f}")
print(f"||w|| = {np.linalg.norm(w):.2f}")
\`\`\`

## 3. 张成的空间 (Span)

给定一组向量，它们的**张成空间**是所有线性组合的集合。

> **直觉**：想象你有一个"向量遥控器"。对每个向量都有一个旋钮来控制缩放倍数。所有能到达的点的集合就是张成空间。

- 一个非零向量 \\(\\mathbf{v}\\) 的张成空间是一条过原点的直线
- 两个不共线的向量 \\(\\mathbf{v}, \\mathbf{w}\\) 的张成空间是一个平面
- 三个不共面的向量的张成空间是整个三维空间

## 4. 点积——衡量向量的相似性

### 4.1 定义和几何

\\[\\mathbf{v} \\cdot \\mathbf{w} = \\sum_{i=1}^n v_i w_i = \\|\\mathbf{v}\\|\\|\\mathbf{w}\\|\\cos\\theta\\]

**几何解释**：点积 = 一个向量的长度 × 另一个向量的投影长度

> **直觉**：点积衡量两个向量的"对齐程度"。方向相同时最大，垂直时为零，方向相反时最小。

### 4.2 关键应用

- **判断垂直**：\\(\\mathbf{v} \\perp \\mathbf{w} \\iff \\mathbf{v} \\cdot \\mathbf{w} = 0\\)
- **投影长度**：\\(\\mathbf{b}\\) 在 \\(\\mathbf{a}\\) 方向上的投影长度 = \\((\\mathbf{a} \\cdot \\mathbf{b}) / \\|\\mathbf{a}\\|\\)
- **柯西-施瓦茨不等式**：\\(|\\mathbf{v} \\cdot \\mathbf{w}| \\leq \\|\\mathbf{v}\\| \\|\\mathbf{w}\\|\\)

\`\`\`python
# 点积的几何意义
v = np.array([1, 0])
w = np.array([0.707, 0.707])

dot = np.dot(v, w)
cos_theta = dot / (np.linalg.norm(v) * np.linalg.norm(w))
print(f"cosθ = {cos_theta:.3f}")  # 约为 0.707，即 cos(45°)

# 判断垂直
v1 = np.array([1, 0])
v2 = np.array([0, 1])
print(f"垂直? {np.dot(v1, v2) == 0}")  # True
\`\`\`

## 5. 本节习题

1. 设 \\(\\mathbf{v} = [2, -1, 3]\\)，\\(\\mathbf{w} = [1, 0, -2]\\)，计算 \\(3\\mathbf{v} - 2\\mathbf{w}\\)
2. 证明 \\(\\|\\mathbf{v} + \\mathbf{w}\\|^2 = \\|\\mathbf{v}\\|^2 + \\|\\mathbf{w}\\|^2 + 2\\mathbf{v} \\cdot \\mathbf{w}\\)
3. 用这个公式推导：当 \\(\\mathbf{v} \\perp \\mathbf{w}\\) 时勾股定理成立
4. 三点 \\((0,0), (1,2), (2,4)\\) 是否共线？（提示：看张成空间）
5. 编写 Python 函数验证三角不等式和柯西-施瓦茨不等式

## 总结

- 向量是理解线性代数的基本单元
- 线性组合 = 缩放 + 相加，是贯穿全书的运算
- Span 描述了一组向量能表达的所有可能结果
- 点积将几何（角度）和代数（求和）联系了起来
`,
  },
  {
    title: "线性组合、张成空间与基",
    slug: "linear-combinations-span-basis",
    order: 1,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 深刻理解线性组合
- 理解张成空间和张成集
- 判断线性无关性
- 理解基的定义和性质

## 1. 线性无关与线性相关

**线性无关**：向量组 \\(\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}\\) 线性无关，如果线性组合为零的唯一方式是所有系数为零：

\\[c_1\\mathbf{v}_1 + \\cdots + c_k\\mathbf{v}_k = \\mathbf{0} \\implies c_1 = \\cdots = c_k = 0\\]

**几何意义**：没有冗余方向。每个向量都贡献了一个新的维度。

> **直觉 (3Blue1Brown)**：线性无关的向量组中，每个向量都指向一个"新的方向"，不可以用其他向量的线性组合来表示。线性相关的向量组中，至少有一个向量是"多余的"——它在其他向量张成的空间中。

### 1.1 如何判断？

设 \\(A = [\\mathbf{v}_1 \\; \\cdots \\; \\mathbf{v}_k]\\)，则检验 \\(A\\mathbf{c} = \\mathbf{0}\\) 是否只有零解。

\`\`\`python
import numpy as np

def is_independent(vectors):
    A = np.column_stack(vectors)
    rank = np.linalg.matrix_rank(A)
    return rank == A.shape[1]

# 例1：标准基
v1, v2, v3 = np.array([1,0,0]), np.array([0,1,0]), np.array([0,0,1])
print("标准基:", is_independent([v1, v2, v3]))  # True

# 例2：冗余向量
v4 = np.array([1, 2, 3])  # = v1 + 2*v2 + 3*v3
print("加上v4:", is_independent([v1, v2, v3, v4]))  # False
\`\`\`

## 2. 基 (Basis)

### 2.1 定义

一组向量 \\(\\mathcal{B} = \\{\\mathbf{b}_1, \\ldots, \\mathbf{b}_n\\}\\) 是向量空间 \\(V\\) 的一组基，如果：

1. \\(\\mathcal{B}\\) 线性无关
2. \\(\\mathcal{B}\\) 张成 \\(V\\)

**核心思想**：基是描述空间的"最经济的方式"——不多不少，刚好够用。

> **直觉 (3Blue1Brown)**：基向量是构建整个空间的"基本原料"。任何向量都可以表示为基向量的线性组合，而且表示方式**唯一**。

### 2.2 标准基

\\(\\mathbb{R}^n\\) 的标准基是 \\(\\{\\mathbf{e}_1, \\ldots, \\mathbf{e}_n\\}\\)，其中 \\(\\mathbf{e}_i\\) 在第 \\(i\\) 个位置为 1，其他位置为 0。

例如 \\(\\mathbb{R}^2\\) 的标准基：\\(\\mathbf{e}_1 = [1,0], \\mathbf{e}_2 = [0,1]\\)

### 2.3 坐标

向量相对于基 \\(\\mathcal{B}\\) 的坐标是表达它所需要的系数。

\`\`\`python
# 例：在非标准基下的坐标
# 基 B = {[1,1], [1,-1]}
b1 = np.array([1, 1])
b2 = np.array([1, -1])
B = np.column_stack([b1, b2])

# 向量 v = [3, 1] 在标准基下的坐标
v = np.array([3, 1])

# 在B基下的坐标：解 B * [c1, c2]^T = v
coords = np.linalg.solve(B, v)
print(f"v 在 B 基下的坐标: {coords}")  # [2, 1] 即 2*b1 + 1*b2

# 验证
print(f"2*b1 + 1*b2 = {2*b1 + b2}")  # [3, 1] = v
\`\`\`

## 3. 维度

**定义**：向量空间的维度 = 基中向量的个数。

**重要结论**：同一空间的所有基大小相同。所有对 \\(\\mathbb{R}^n\\) 的描述都认同其维度是 \\(n\\)。

### 3.1 维度的直观

- 一条直线的维度为 1
- 一个平面的维度为 2
- \\(\\mathbb{R}^n\\) 的维度为 \\(n\\)
- "所有 2×2 矩阵"的集合维度为 4

## 4. 秩 (Rank)

矩阵 \\(A\\) 的秩 = \\(A\\) 中线性无关的**列**的最大个数 = \\(C(A)\\) 的维度。

\`\`\`python
A1 = np.array([[1, 0, 0],
               [0, 1, 0],
               [0, 0, 0]])
print("秩:", np.linalg.matrix_rank(A1))  # 2

A2 = np.array([[1, 2, 3],
               [4, 5, 6],
               [7, 8, 9]])
print("秩:", np.linalg.matrix_rank(A2))  # 2（因为第三行=2*第二行-第一行）
\`\`\`

## 5. 本节习题

1. 判断 \\(\\{[1,2], [2,4]\\}\\) 是否线性无关
2. 证明：如果 \\(\\{\\mathbf{v}_1, \\mathbf{v}_2\\}\\) 线性无关，则 \\(\\{\\mathbf{v}_1 + \\mathbf{v}_2, \\mathbf{v}_1 - \\mathbf{v}_2\\}\\) 也线性无关
3. 为什么 \\(\\mathbb{R}^3\\) 中任意 4 个向量必然线性相关？
4. 找出 \\(\\mathbb{R}^3\\) 中过原点的直线的一组基
5. 用 Python 写出一般秩的计算程序，不借助 np.linalg.matrix_rank

## 总结

- 线性无关 = 没有冗余方向
- 基 = 线性无关的张成集
- 维度 = 基的大小（刻画空间"大小"）
- 秩 = 矩阵中独立列的数量
`,
  },
  {
    title: "矩阵与线性变换",
    slug: "matrices-linear-transformations",
    order: 2,
    estimatedMinutes: 65,
    content: `## 学习目标

完成本节后，你将能够：
- 将矩阵理解为线性变换
- 理解矩阵乘法对应变换的复合
- 用列视角解释矩阵乘法
- 理解不可交换性

## 1. 线性变换——矩阵的本质

### 1.1 什么是线性变换？

**定义**：映射 \\(T: \\mathbb{R}^n \\to \\mathbb{R}^m\\) 是线性变换，如果：

\\[T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})\\]
\\[T(c\\mathbf{u}) = c T(\\mathbf{u})\\]

合并：\\(T(c\\mathbf{u} + \\mathbf{v}) = cT(\\mathbf{u}) + T(\\mathbf{v})\\)

**几何意义**：线性变换保持网格线平行且等距分布。原点映射到原点。直线映射为直线（或点）。

> **直觉 (3Blue1Brown)**：想象你面前有一个无限大的网格。线性变换就是对这个网格的"操作"——拉伸、旋转、剪切、压缩，但网格线保持直线且等距分布。任何弯曲或扭曲都不是线性变换。

### 1.2 矩阵 = 线性变换 + 选择基

**关键定理**：任何线性变换 \\(T: \\mathbb{R}^n \\to \\mathbb{R}^m\\) 都可以用矩阵表示。

矩阵 \\(A\\) 的第 \\(j\\) 列 = \\(T(\\mathbf{e}_j)\\)，即标准基向量 \\(\\mathbf{e}_j\\) 被变换后的位置。

> **直觉 (3Blue1Brown)**：矩阵的列告诉我们每个基向量去哪儿了。因为我们知道变换后基向量的位置，就知道整个空间如何变换——任何向量都可以表示为基向量的线性组合。

\`\`\`python
import numpy as np

# 例：旋转 90 度的变换
def rotate_90(T):
    return np.array([-T[1], T[0]])

# 矩阵形式：第j列 = T(e_j)
e1, e2 = np.array([1, 0]), np.array([0, 1])
A = np.column_stack([rotate_90(e1), rotate_90(e2)])
print("旋转90度的矩阵:")
print(A)
# [[0, -1],
#  [1,  0]]

# 验证
v = np.array([1, 2])
print(f"T(v) = {rotate_90(v)}")  # [-2, 1]
print(f"A @ v = {A @ v}")        # [-2, 1]
\`\`\`

## 2. 矩阵乘法 = 变换的复合

### 2.1 核心思想

先应用 \\(B\\) 变换，再应用 \\(A\\) 变换 = 应用 \\(AB\\) 变换。

**注意顺序**：\\(AB\\) 的意思是先 B 后 A（因为 \\(AB\\mathbf{x} = A(B\\mathbf{x})\\)）。

### 2.2 不可交换性

\\[AB \\neq BA\\]

**几何原因**：旋转后剪切 ≠ 剪切后旋转。变换的顺序很重要。

\`\`\`python
# 旋转90度
R = np.array([[0, -1], [1, 0]])
# 剪切
S = np.array([[1, 1], [0, 1]])

print("先旋转再剪切:\\n", S @ R)
print("先剪切再旋转:\\n", R @ S)
# 结果不同！
\`\`\`

### 2.3 矩阵乘法的列视角（最重要！）

\\[C = AB\\]

\textbf{C 的第 j 列} = \\(A\\) 乘以 \\(B\\) 的第 \\(j\\) 列。

**这为什么重要？** 因为它告诉我们：\\(AB\\) 的列是 \\(A\\) 对 \\(B\\) 的列应用变换的结果。也就是说，\\(B\\) 的每一列都是一个"向量"，\\(A\\) 分别变换这些向量。

> **直觉 (3Blue1Brown)**：矩阵乘法 \\(AB\\) 的每一列告诉我们：在复合变换中，第 \\(j\\) 个基向量去哪里了。它先被 \\(B\\) 变换，然后结果被 \\(A\\) 变换。

## 3. 常见的线性变换

### 3.1 缩放
\\[\\begin{bmatrix} c & 0 \\\\ 0 & c \\end{bmatrix}\\]
均匀放大 c 倍。

### 3.2 旋转角度 θ
\\[\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\]

### 3.3 剪切
\\[\\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix}\\]
x 坐标保持不变，y 坐标增加 x 的 k 倍。

## 4. 本节习题

1. 找出关于 x 轴反射的 2×2 矩阵
2. 找出将单位正方形变为 \\((0,0), (2,1), (1,3), (3,4)\\) 的矩阵
3. 证明：两个线性变换的复合仍是线性变换
4. 找出一个非零矩阵使得 \\(A^2 = \\mathbf{0}\\)
5. 用 Python 验证：\\((AB)^T = B^T A^T\\)

## 总结

- 矩阵 = 线性变换在选定基下的表示
- 矩阵乘法 = 变换的复合
- 列视角：\\(AB\\) 的列是 \\(A\\) 变换 \\(B\\) 的列的结果
- 矩阵乘法**不可交换**
`,
  },
  {
    title: "高斯消元法与 LU 分解",
    slug: "gaussian-elimination",
    order: 3,
    estimatedMinutes: 70,
    content: `## 学习目标

完成本节后，你将能够：
- 系统地进行高斯消元
- 理解主元、乘数、回代
- 理解 LU 分解的本质和意义
- 用 Python 实现消元法

## 1. 消元法：为什么是它？

**问题**：解 \\(A\\mathbf{x} = \\mathbf{b}\\) 的最可靠方法是什么？

高斯消元法的思想很简单——通过**行操作**将矩阵简化，使得解变得明显。

### 1.1 2×2 示例

\\[\\begin{cases} 2x + 4y = 10 \\\\ 3x + y = 5 \\end{cases} \\implies \\begin{bmatrix} 2 & 4 \\\\ 3 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 10 \\\\ 5 \\end{bmatrix}\\]

**步骤 1**：消去第二行的 x——第二行减去 \\(\\frac{3}{2}\\) 倍第一行

\\[\\begin{bmatrix} 2 & 4 \\\\ 0 & -5 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 10 \\\\ -10 \\end{bmatrix}\\]

**步骤 2**：回代——\\(-5y = -10 \\implies y = 2\\)，\\(2x + 8 = 10 \\implies x = 1\\)

**主元 (Pivot)**：对角线上的 2 和 -5 就是主元。它们是我们消元的"支点"。

### 1.2 主元的重要性

- 如果某个主元为零，需要交换行
- 如果即使交换行也无法得到非零主元，矩阵不可逆（奇异）
- 主元的个数 = 矩阵的秩

## 2. 复杂示例：3×3

\\[\\begin{bmatrix} 2 & 1 & -1 \\\\ -4 & -1 & 3 \\\\ 2 & 3 & 1 \\end{bmatrix} \\mathbf{x} = \\begin{bmatrix} 1 \\\\ -5 \\\\ 7 \\end{bmatrix}\\]

**消元过程**：
1. 主元 2：\\(R_2 \\leftarrow R_2 + 2R_1\\)，\\(R_3 \\leftarrow R_3 - R_1\\)
2. 主元 1：\\(R_3 \\leftarrow R_3 - R_2\\)
3. 回代得到 \\(x=1, y=2, z=3\\)

## 3. 消元矩阵

每次行操作 = 左乘一个**初等矩阵**。

\\[E_{21} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\]

\\[E_{21}A = \\begin{bmatrix} 2 & 1 & -1 \\\\ 0 & 1 & 1 \\\\ 2 & 3 & 1 \\end{bmatrix}\\]

意义：\\(E_{21}\\) 表示"第 2 行加 2 倍第 1 行"。

## 4. LU 分解

### 4.1 消元过程的矩阵表达

\\[E_{32}E_{31}E_{21}A = U\\]

其中 \\(U\\) 是上三角矩阵。将这些消元矩阵求逆移项：

\\[A = (E_{21})^{-1}(E_{31})^{-1}(E_{32})^{-1} U = LU\\]

**L 的秘密**：\\(L\\) 的对角线下方的元素恰好就是消元时的**乘数**！

\\[L = \\begin{bmatrix} 1 & 0 & 0 \\\\ l_{21} & 1 & 0 \\\\ l_{31} & l_{32} & 1 \\end{bmatrix}\\]

\\(l_{21}\\) 就是消元时加在第 2 行上的第一行倍数。

### 4.2 为什么 LU 重要？

**主要优势**：求解多个右侧向量。

假设你要解 \\(A\\mathbf{x} = \\mathbf{b}_1, A\\mathbf{x} = \\mathbf{b}_2, \\ldots, A\\mathbf{x} = \\mathbf{b}_k\\)。

**传统方法**：每次从零开始消元 → \\(O(kn^3)\\)
**LU 方法**：一次分解 \\(A = LU\\)（\\(O(n^3)\\)），然后每次求解只需前向/回代（\\(O(n^2)\\)）

当 \\(k\\) 很大时，差异巨大。

\`\`\`python
import numpy as np
from scipy.linalg import lu

def solve_with_lu(A, b):
    """使用 LU 求解 Ax = b"""
    P, L, U = lu(A)  # PA = LU
    # 解 Ly = P^T b（前向替换）
    y = np.linalg.solve(L, P.T @ b)
    # 解 Ux = y（回代）
    x = np.linalg.solve(U, y)
    return x

# 测试
A = np.array([[2, 1, -1],
              [-4, -1, 3],
              [2, 3, 1]])
b = np.array([1, -5, 7])

x_lu = solve_with_lu(A, b)
x_direct = np.linalg.solve(A, b)
print("LU 解:", x_lu)
print("直接求解:", x_direct)
print("匹配?", np.allclose(x_lu, x_direct))
\`\`\`

## 5. 行交换与置换矩阵

### 5.1 置换矩阵

交换两行的矩阵称为置换矩阵。

\\[P = \\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\]

\\(P A\\) 交换了 \\(A\\) 的第一行和第二行。

### 5.2 PA = LU

当消元需要行交换时，分解变为：\\(PA = LU\\)。

## 6. 计算复杂度

- 消元需要约 \\(\\frac{2}{3}n^3\\) 次浮点运算
- 回代需要约 \\(n^2\\) 次运算
- \\(n=1000\\) 时，消元约 6.7 亿次操作，现代 CPU 约需 0.2 秒

## 7. Python 实现：完整高斯消元

\`\`\`python
def gauss_elimination(A, b):
    """完整高斯消元（带行选主元）"""
    n = len(A)
    Ab = np.hstack([A.astype(float), b.reshape(-1, 1)])

    # 前向消元
    for col in range(n):
        # 部分选主元
        max_row = np.argmax(abs(Ab[col:, col])) + col
        if abs(Ab[max_row, col]) < 1e-12:
            raise ValueError("矩阵奇异")
        Ab[[col, max_row]] = Ab[[max_row, col]]

        for row in range(col+1, n):
            factor = Ab[row, col] / Ab[col, col]
            Ab[row, col:] -= factor * Ab[col, col:]

    # 回代
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        x[i] = (Ab[i, -1] - Ab[i, i+1:n] @ x[i+1:n]) / Ab[i, i]
    return x

A = np.array([[3, 1, 2],
              [6, 3, 4],
              [3, 1, 5]])
b = np.array([0, 1, 3])
print("解:", gauss_elimination(A, b))
\`\`\`

## 8. 本节习题

1. 对 \\(\\begin{bmatrix} 2 & 3 \\\\ 4 & 7 \\end{bmatrix}\\) 做 LU 分解（手工）
2. 证明 \\(\\det(L) = 1\\)（LU 分解中的 L）
3. 为什么部分选主元在数值上很重要？
4. 用 Python 比较：n=100 时，\\(A^{-1}\\mathbf{b}\\) 和 LU 求解的速度差异
5. 解释：当 \\(A\\) 正定时，消元不需要行交换

## 总结

- 高斯消元通过行操作将 \\(A\\) 变为上三角 \\(U\\)
- \\(A = LU\\) 中 \\(L\\) 包含消元乘数，\\(U\\) 是最终上三角矩阵
- LU 的优势：一次分解，多次求解
- 部分选主元保证数值稳定性
`,
  },
  {
    title: "向量空间与子空间",
    slug: "vector-spaces-subspaces",
    order: 4,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 理解向量空间的公理化定义
- 识别子空间
- 理解列空间和零空间
- 掌握秩-零化度定理

## 1. 向量空间

### 1.1 定义

向量空间 \\(V\\) 是在加法和数乘下封闭的集合。

**通俗理解**：向量空间是一个"安全空间"——你把空间中的元素线性组合，结果仍然在空间中。

### 1.2 常见向量空间

- \\(\\mathbb{R}^n\\)：所有 n 元实数组
- \\(M_{m\\times n}\\)：所有 m×n 矩阵
- \\(P_n\\)：所有次数 ≤ n 的多项式
- \\(C[a,b]\\)：区间 [a,b] 上的连续函数

> **洞察**：向量不一定只是数字列表。**函数也是向量**！"把函数加起来"和"给函数乘一个数"就是加法和数乘。

## 2. 子空间

### 2.1 定义

子集 \\(S \\subseteq V\\) 是子空间，如果：
1. \\(\\mathbf{0} \\in S\\)
2. \\(\\mathbf{u}, \\mathbf{v} \\in S \\implies \\mathbf{u}+\\mathbf{v} \\in S\\)
3. \\(\\mathbf{v} \\in S, c \\in \\mathbb{R} \\implies c\\mathbf{v} \\in S\\)

即：对线性组合封闭的、包含零元的子集。

**快速检查**：不过原点的直线不是子空间。

### 2.2 例子与反例

**是子空间**：
- \\(\\mathbb{R}^2\\) 中过原点的直线
- \\(\\mathbb{R}^3\\) 中过原点的平面
- 所有对称矩阵的集合

**不是子空间**：
- \\(\\mathbb{R}^2\\) 中第一象限（数乘 -1 后跑出）
- 单位圆上的点（加法不封闭）
- \\(y = 1\\) 的直线（不过原点）

## 3. 列空间 C(A)

### 3.1 定义

\\(C(A) = \\{A\\mathbf{x} : \\mathbf{x} \\in \\mathbb{R}^n\\}\\) = 所有列的线性组合。

**核心意义**：\\(A\\mathbf{x} = \\mathbf{b}\\) 有解 ⇔ \\(\\mathbf{b} \\in C(A)\\)

### 3.2 如何判断某向量是否在列空间中？

\`\`\`python
def in_column_space(A, b):
    """检查 b 是否在 A 的列空间中"""
    rank_A = np.linalg.matrix_rank(A)
    rank_Ab = np.linalg.matrix_rank(np.hstack([A, b.reshape(-1, 1)]))
    return rank_A == rank_Ab

A = np.array([[1, 2], [2, 4]])  # 两列共线
b1 = np.array([3, 6])   # 在列空间中
b2 = np.array([3, 3])   # 不在

print(in_column_space(A, b1))  # True
print(in_column_space(A, b2))  # False
\`\`\`

## 4. 零空间 N(A)

### 4.1 定义

\\(N(A) = \\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\}\\)

**核心意义**：给出解的自由度。如果 \\(A\\mathbf{x}_p = \\mathbf{b}\\) 且 \\(\\mathbf{x}_n \\in N(A)\\)，则 \\(\\mathbf{x}_p + \\mathbf{x}_n\\) 也是解。

### 4.2 计算零空间

\`\`\`python
def null_space(A):
    """计算矩阵 A 的零空间基"""
    u, s, vh = np.linalg.svd(A)
    rank = np.sum(s > max(A.shape) * 1e-10)
    return vh[rank:].T  # 零空间基向量

A = np.array([[1, 2, 3],
              [2, 4, 6]])  # rank = 1
null_basis = null_space(A)
print("零空间基:", null_basis)
print("dim N(A) =", null_basis.shape[1])  # 应该是 2
print("验证 A @ null_basis[:,0] ≈ 0:")
print(A @ null_basis[:, 0])
\`\`\`

## 5. 秩-零化度定理

\\[\\dim C(A) + \\dim N(A) = \\text{列数}\\]

即：\\(\\text{rank}(A) + \\text{nullity}(A) = n\\)

**直觉理解**：输入空间的 \\(n\\) 个维度中，\\(r\\) 个映射到列空间（"存活"），\\(n-r\\) 个被压缩到零（"消失"）。

## 6. 本节习题

1. 判断 \\(S = \\{[x,y,z] : x + y + z = 0\\}\\) 是否为 \\(\\mathbb{R}^3\\) 的子空间
2. 判断 \\(S = \\{[x,y,z] : x + y + z = 1\\}\\) 是否为 \\(\\mathbb{R}^3\\) 的子空间
3. 找出 \\(A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 2 \\end{bmatrix}\\) 的列空间和零空间
4. 证明：两个子空间的交集仍是子空间
5. 对于 4×6 的秩为 3 的矩阵，列空间和零空间的维度分别是什么？

## 总结

- 向量空间对线性组合封闭
- 子空间是空间中的"平坦子集"
- 列空间衡量"有多少 b 有解"
- 零空间衡量"解的自由度"
- 秩-零化度定理：\\(r + (n-r) = n\\)
`,
  },
  {
    title: "四个基本子空间",
    slug: "four-subspaces",
    order: 5,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 描述矩阵的四个基本子空间
- 计算各子空间的一组基
- 理解子空间之间的正交关系
- 画出基本子空间关系图

## 1. 四个基本子空间概述

对于一个 \\(m \\times n\\) 的矩阵 \\(A\\)，四个基本子空间是：

| # | 子空间 | 符号 | 所在空间 | 维度 |
|---|--------|------|----------|------|
| 1 | 列空间 | \\(C(A)\\) | \\(\\mathbb{R}^m\\) | \\(r\\) |
| 2 | 零空间 | \\(N(A)\\) | \\(\\mathbb{R}^n\\) | \\(n-r\\) |
| 3 | 行空间 | \\(C(A^T)\\) | \\(\\mathbb{R}^n\\) | \\(r\\) |
| 4 | 左零空间 | \\(N(A^T)\\) | \\(\\mathbb{R}^m\\) | \\(m-r\\) |

其中 \\(r = \\text{rank}(A)\\)。

## 2. 正交关系——最重要的洞察

### 2.1 正交补

**行空间 ⟂ 零空间**：\\(C(A^T) \\perp N(A)\\)

为什么？因为 \\(A\\mathbf{x} = \\mathbf{0}\\) 意味着 \\(A\\) 的每一行与 \\(\\mathbf{x}\\) 正交。所以 \\(\\mathbf{x}\\) 与所有行正交，从而与整个行空间正交。

**列空间 ⟂ 左零空间**：\\(C(A) \\perp N(A^T)\\)

### 2.2 正交补的含义

\\[\\mathbb{R}^n = C(A^T) \\oplus N(A)\\]
\\[\\mathbb{R}^m = C(A) \\oplus N(A^T)\\]

**意义**：\\(\\mathbb{R}^n\\) 中的任何向量可以唯一地分解为行空间分量 + 零空间分量。这两个分量相互垂直。

## 3. 通过行最简形 (RREF) 求基本子空间

### 3.1 理解行最简形

行最简形是消元过程的终点——你在主元位置得到 1，并且主元上方的列也被清除。

\\[A \\rightarrow R = \\text{rref}(A)\\]

- **主元列**在 RREF 中是标准基向量
- **自由列**对应零空间中的特殊解

### 3.2 用 RREF 求基

**行空间基**：RREF 中的非零行
**列空间基**：原矩阵中对应主元列的列
**零空间基**：解 \\(R\\mathbf{x} = \\mathbf{0}\\) 的特殊解

\`\`\`python
def rref(A):
    """计算行最简形"""
    A = A.astype(float).copy()
    m, n = A.shape
    row = 0
    for col in range(n):
        if row >= m: break
        # 找主元
        pivot = np.argmax(abs(A[row:, col])) + row
        if abs(A[pivot, col]) < 1e-10: continue
        A[[row, pivot]] = A[[pivot, row]]
        # 归一化
        A[row] /= A[row, col]
        # 清除其他行
        for r in range(m):
            if r != row:
                A[r] -= A[r, col] * A[row]
        row += 1
    return A

A = np.array([[1, 2, 3],
              [2, 4, 6],
              [1, 2, 3]])
R = rref(A)
print("RREF:")
print(np.round(R, 2))
# 非零行是行空间基
# 主元列对应原矩阵的列是列空间基
\`\`\`

## 4. Python 综合：四个子空间计算

\`\`\`python
def all_subspaces(A):
    """用 SVD 计算四个基本子空间"""
    m, n = A.shape
    U, s, Vt = np.linalg.svd(A)
    r = np.sum(s > 1e-10)

    return {
        "列空间 C(A)": U[:, :r],
        "左零空间 N(A^T)": U[:, r:],
        "行空间 C(A^T)": Vt[:r].T,
        "零空间 N(A)": Vt[r:].T,
    }

A = np.array([[1, 0, 1],
              [2, 1, 3],
              [1, 0, 1]])
subspaces = all_subspaces(A)
for name, basis in subspaces.items():
    print(f"{name} (dim={basis.shape[1]}):")
    print(np.round(basis, 3))
    print()

# 验证正交性
CS = subspaces["列空间 C(A)"]
NS = subspaces["左零空间 N(A^T)"]
print("C(A) ⟂ N(A^T)?", np.allclose(CS.T @ NS, 0))
\`\`\`

## 5. 本节习题

1. 对 3×5 的秩为 2 的矩阵，四个子空间的维度分别是多少？
2. 证明 \\(C(A^T)\\) 和 \\(N(A)\\) 是正交补
3. 找出 \\(A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}\\) 的四个子空间并验证正交关系
4. 为什么 \\(A\\) 和 \\(A^T\\) 有相同的秩？
5. 如果 \\(A\\) 是 5×3 满秩矩阵，哪些子空间只有零向量？

## 总结

- 四个基本子空间完整刻画了矩阵的映射行为
- 行空间和零空间在 \\(\\mathbb{R}^n\\) 中互补，列空间和左零空间在 \\(\\mathbb{R}^m\\) 中互补
- \\(C(A^T) \\perp N(A)\\)，\\(C(A) \\perp N(A^T)\\)
- SVD 是计算所有四个子空间的最简洁方法
`,
  },
  {
    title: "正交性与最小二乘法",
    slug: "orthogonality-least-squares",
    order: 6,
    estimatedMinutes: 65,
    content: `## 学习目标

完成本节后，你将能够：
- 理解投影的几何意义和矩阵形式
- 推导法方程 \\(A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\)
- 应用最小二乘法进行数据拟合
- 理解 Gram-Schmidt 正交化

## 1. 投影——将向量分解为两个正交分量

### 1.1 投影到直线上

向量 \\(\\mathbf{b}\\) 在方向 \\(\\mathbf{a}\\) 上的投影：

\\[\\mathbf{p} = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\mathbf{a} \\cdot \\mathbf{a}} \\mathbf{a} = \\frac{a a^T}{a^T a} \\mathbf{b}\\]

投影矩阵：\\(P = \\frac{a a^T}{a^T a}\\)

**性质**：\\(P = P^T\\)（对称），\\(P^2 = P\\)（幂等）

> **直觉 (3Blue1Brown)**：投影 \\(P\\mathbf{b}\\) 就是 \\(\\mathbf{b}\\) 在 \\(\\mathbf{a}\\) 方向上的"影子"。你从 \\(\\mathbf{b}\\) 的顶端向 \\(\\mathbf{a}\\) 作垂线，垂足就是投影点。

### 1.2 投影到子空间

更一般地，将 \\(\\mathbf{b}\\) 投影到矩阵 \\(A\\) 的列空间上：

\\[P = A(A^T A)^{-1} A^T\\]

这个公式看似复杂，其实只是"一维投影公式"的高维版本（用 \\(A\\) 替换 \\(a\\)，用 \\(A^T\\) 替换点积）。

## 2. 最小二乘法

### 2.1 问题

当 \\(\\mathbf{b}\\) 不在 \\(C(A)\\) 中时，\\(A\\mathbf{x} = \\mathbf{b}\\) 无精确解。我们求**最佳近似解**：

\\[\\min_\\mathbf{x} \\|A\\mathbf{x} - \\mathbf{b}\\|^2\\]

### 2.2 法方程

求解这个最小化问题的标准方程是：

\\[A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\]

为什么？因为误差 \\(\\mathbf{e} = \\mathbf{b} - A\\hat{\\mathbf{x}}\\) 垂直于 \\(C(A)\\)，所以 \\(A^T \\mathbf{e} = \\mathbf{0}\\)。

### 2.3 几何理解

> **直觉 (3Blue1Brown)**：最小二乘就是"把 \\(\\mathbf{b}\\) 垂直地投影到 \\(C(A)\\) 上"。误差 \\(\\mathbf{e}\\) 尽可能短——它是从 \\(\\mathbf{b}\\) 到列空间的垂线段。

## 3. 线性回归

\`\`\`python
import numpy as np

# 数据：广告花费 vs 销售额
x = np.array([1, 2, 3, 4, 5])  # 广告费（万元）
y = np.array([2.1, 3.8, 5.2, 7.1, 8.9])  # 销售额

# 模型：y = c + dx（直线拟合）
A = np.column_stack([np.ones_like(x), x])
coeffs = np.linalg.solve(A.T @ A, A.T @ y)
c, d = coeffs

print(f"最佳拟合直线: y = {c:.3f} + {d:.3f}x")
print(f"预测 x=6 时的销售额: {c + d*6:.2f}")

# 计算 R²（拟合优度）
y_pred = A @ coeffs
ss_res = np.sum((y - y_pred)**2)
ss_tot = np.sum((y - np.mean(y))**2)
r2 = 1 - ss_res/ss_tot
print(f"R² = {r2:.4f}")  # 越接近1拟合越好
\`\`\`

## 4. Gram-Schmidt 正交化

### 4.1 算法

从一组线性无关的向量构造一组标准正交基：

1. \\(\\mathbf{q}_1 = \\mathbf{a}_1 / \\|\\mathbf{a}_1\\|\\)
2. \\(\\mathbf{v}_k = \\mathbf{a}_k - (\\mathbf{q}_1^T\\mathbf{a}_k)\\mathbf{q}_1 - \\cdots - (\\mathbf{q}_{k-1}^T\\mathbf{a}_k)\\mathbf{q}_{k-1}\\)
3. \\(\\mathbf{q}_k = \\mathbf{v}_k / \\|\\mathbf{v}_k\\|\\)

> **直觉 (3Blue1Brown)**：每一步，你抓住下一个向量，减去它在所有已有正交方向上的投影。剩下的部分就是新的正交方向。就像剥洋葱——一层层去掉已有的分量。

### 4.2 Python 实现

\`\`\`python
def gram_schmidt(A):
    """Gram-Schmidt 正交化"""
    m, n = A.shape
    Q = np.zeros((m, n))
    R = np.zeros((n, n))

    for j in range(n):
        v = A[:, j].copy()
        for i in range(j):
            R[i, j] = Q[:, i] @ A[:, j]
            v -= R[i, j] * Q[:, i]
        R[j, j] = np.linalg.norm(v)
        Q[:, j] = v / R[j, j]
    return Q, R

A = np.array([[1, 1, 0],
              [1, 0, 1],
              [0, 1, 1]])
Q, R = gram_schmidt(A)
print("Q（正交矩阵）:")
print(np.round(Q, 3))
print("Q^T Q:")
print(np.round(Q.T @ Q, 3))  # 单位矩阵！
\`\`\`

## 5. 本节习题

1. 将 \\(\\mathbf{b} = [3,4,0]\\) 投影到 \\(\\mathbf{a} = [1,1,1]\\) 上
2. 证明：\\(P^2 = P\\) 意味着 \\((I-P)^2 = I-P\\)
3. 拟合三点 \\((1,2), (2,4), (3,5)\\) 的最佳直线
4. 对 \\(\\mathbf{a}_1 = [1,2,2], \\mathbf{a}_2 = [1,0,1]\\) 做 Gram-Schmidt
5. 解释：为什么 \\(A^T A\\) 可逆当且仅当 \\(A\\) 的列线性无关

## 总结

- 投影将向量分解为"列空间分量"和"垂直分量"
- 最小二乘 = 求投影到列空间的最优解
- 法方程 \\(A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\) 是核心
- Gram-Schmidt 构造正交基，转化为 QR 分解
`,
  },
  {
    title: "行列式的完整理论",
    slug: "determinants-complete",
    order: 7,
    estimatedMinutes: 65,
    content: `## 学习目标

完成本节后，你将能够：
- 从几何上理解行列式
- 掌握十大性质及其推导
- 高效计算行列式
- 应用克拉默法则

## 1. 行列式的几何意义

\\[\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc\\]

**几何意义**：这是由 \\((a,c)\\) 和 \\((b,d)\\) 张成的平行四边形的**有向面积**。

> **直觉 (3Blue1Brown)**：行列式衡量线性变换对**面积**（或体积）的缩放倍数。\\(\\det(A) = 2\\) 意味着 \\(A\\) 变换使任何区域的面积变为 2 倍。\\(\\det(A) = 0\\) 意味着该变换将空间压缩到了一个更低维的子空间（"压扁了"）。

### 1.1 为什么这是一个革命性的观点？

以前你可能觉得行列式只是一个抽象公式。但当你理解它是"变换的缩放因子"时，一切都变了：

- \\(\\det(A) = 0\\) ⇔ 变换压缩了维度 ⇔ 矩阵奇异 ⇔ 列线性相关
- \\(\\det(A) > 0\\) 保持方向；\\(\\det(A) < 0\\) 反转方向
- \\(\\det(AB) = \\det(A)\\det(B)\\)：复合变换的缩放因子 = 各缩放的乘积

**几何证明**：组成 \\(A\\) 后的面积缩放 = 先 \\(B\\) 再 \\(A\\) 各自的缩放的乘积。非常简单！

## 2. 十大性质

### 性质 1：\\(\\det(I) = 1\\)
单位矩阵代表"什么都不做"，缩放因子为 1。

### 性质 2：交换两行，变号
几何上——翻转了定向。

### 性质 3：对每行线性
如果把某行放大 \\(t\\) 倍，行列式放大 \\(t\\) 倍。
如果把两行相加，行列式也相加。

### 性质 4：两行相等 → \\(\\det = 0\\)
因为交换相等两行，行列式不变但又必须变号，只能为 0。

### 性质 5：一行减另一行的倍数，行列式不变
这是消元不改变行列式的理论基础！

### 性质 6：全零行 → \\(\\det = 0\\)

### 性质 7：\\(\\det(A) = \\det(A^T)\\)
行和列的地位对称。

### 性质 8：\\(\\det(AB) = \\det(A)\\det(B)\\)

### 性质 9：\\(\\det(A^{-1}) = 1/\\det(A)\\)

### 性质 10：三角矩阵的行列式 = 对角线乘积

## 3. 通过消元计算

\\[\\det(A) = (-1)^{\\text{行交换次数}} \\times \\prod \\text{主元}\\]

\`\`\`python
def det_via_elimination(A):
    n = len(A)
    U = A.astype(float).copy()
    sign = 1.0

    for col in range(n):
        # 选主元
        if abs(U[col, col]) < 1e-10:
            for r in range(col+1, n):
                if abs(U[r, col]) > 1e-10:
                    U[[col, r]] = U[[r, col]]
                    sign *= -1
                    break
        if abs(U[col, col]) < 1e-10:
            return 0.0

        for row in range(col+1, n):
            factor = U[row, col] / U[col, col]
            U[row, col:] -= factor * U[col, col:]

    return sign * np.prod(np.diag(U))

A = np.array([[2, 1, 1],
              [1, 3, 2],
              [1, 2, 3]])
print("消元法:", det_via_elimination(A))
print("numpy:", np.linalg.det(A))
\`\`\`

## 4. 克拉默法则

### 4.1 公式

解 \\(A\\mathbf{x} = \\mathbf{b}\\)：

\\[x_j = \\frac{\\det(A_j)}{\\det(A)}\\]

其中 \\(A_j\\) 是将 \\(A\\) 的第 j 列替换为 \\(\\mathbf{b}\\) 后的矩阵。

**应用**：理论价值高——它明确给出了解的表达式。但计算效率低（需要算 n+1 个行列式），实际中用高斯消元。

## 5. 叉积——三维中的行列式

\\[\\mathbf{a} \\times \\mathbf{b} = \\det\\begin{bmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{bmatrix}\\]

**几何意义**：叉积的大小 = \\(\\mathbf{a}\\) 和 \\(\\mathbf{b}\\) 张成的平行四边形面积。方向垂直于 \\(\\mathbf{a}\\) 和 \\(\\mathbf{b}\\)（右手定则）。

> **直觉 (3Blue1Brown)**：叉积可以看作"线性变换的对偶"。对偶向量 \\(\\mathbf{p}\\) 使得 \\(\\mathbf{p} \\cdot \\mathbf{x} = \\det(\\mathbf{a}, \\mathbf{b}, \\mathbf{x})\\)。这个 \\(\\mathbf{p}\\) 就是 \\(\\mathbf{a} \\times \\mathbf{b}\\)。

## 6. 本节习题

1. 用几何解释 \\(\\det(AB) = \\det(A)\\det(B)\\)
2. 计算 \\(\\det\\begin{bmatrix} 2 & 0 & 1 \\\\ 1 & 3 & 0 \\\\ 0 & 1 & 2 \\end{bmatrix}\\)
3. 证明 \\(\\det(cA) = c^n \\det(A)\\)（n 阶）
4. 用克拉默法则求解 \\(\\begin{cases} 2x + y = 5 \\\\ x - y = 1 \\end{cases}\\)
5. 证明：三角矩阵的行列式等于对角线乘积

## 总结

- 行列式 = 线性变换的面积/体积缩放因子
- 十大性质完整刻画行列式
- 消元法（上三角化）是实用计算方法
- \\(\\det = 0\\) ⇔ 矩阵奇异 ⇔ 压缩维度
`,
  },
  {
    title: "特征值与特征向量",
    slug: "eigenvalues-eigenvectors",
    order: 8,
    estimatedMinutes: 70,
    content: `## 学习目标

完成本节后，你将能够：
- 从几何上理解特征值问题
- 计算 2×2 和 3×3 矩阵的特征值
- 理解对角化的条件
- 应用特征值分解

## 1. 特征值的几何意义

### 1.1 核心定义

\\[A\\mathbf{x} = \\lambda\\mathbf{x},\\quad \\mathbf{x} \\neq \\mathbf{0}\\]

- \\(\\lambda\\) = 特征值（标量）
- \\(\\mathbf{x}\\) = 特征向量（方向）

**几何意义**：特征向量是**不被线性变换改变方向**的特殊向量。变换只会拉伸/压缩它（或反转方向）。

> **直觉 (3Blue1Brown)**：想象一个三维空间中的旋转——大多数向量会改变方向，只有沿着旋转轴的向量保持方向不变。这些"不动的方向"就是特征向量，它们对应的拉伸因子 1 就是特征值。

### 1.2 为什么重要？

特征向量告诉你线性变换的"骨架"——找到这些不变方向后，复杂的线性变换就可以分解为沿这些方向的简单缩放。

## 2. 特征方程

\\[A\\mathbf{x} = \\lambda\\mathbf{x} \\implies (A - \\lambda I)\\mathbf{x} = \\mathbf{0}\\]

有非零解 ⇔ \\(\\det(A - \\lambda I) = 0\\)（特征方程）

### 2.1 2×2 例子的完整求解

\\[A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\]

**第一步**：解特征方程

\\[\\det\\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix} = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = 0\\]

\\[\\lambda_1 = 3,\\quad \\lambda_2 = 1\\]

**第二步**：对每个特征值求特征向量

\\[\\lambda = 3: (A - 3I)\\mathbf{x} = \\mathbf{0} \\implies \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix} \\mathbf{x} = \\mathbf{0} \\implies \\mathbf{x}_1 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}\\]

\\[\\lambda = 1: (A - I)\\mathbf{x} = \\mathbf{0} \\implies \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} \\mathbf{x} = \\mathbf{0} \\implies \\mathbf{x}_2 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}\\]

## 3. 重要性质

### 3.1 迹和行列式

\\[\\text{tr}(A) = \\sum_{i=1}^n a_{ii} = \\sum_{i=1}^n \\lambda_i\\]
\\[\\det(A) = \\prod_{i=1}^n \\lambda_i\\]

**应用**：如果你知道一个特征值，可以用迹或行列式快速求另一个。

### 3.2 Gershgorin 圆盘定理

每个特征值 \\(\\lambda\\) 至少在一个圆盘内：

\\[|\\lambda - a_{ii}| \\leq \\sum_{j \\neq i} |a_{ij}|\\]

这提供了特征值位置的快速估计。

## 4. 对角化

### 4.1 条件

\\(A\\) 可对角化 ⇔ \\(A\\) 有 \\(n\\) 个线性无关的特征向量。

**充分条件**：\\(n\\) 个互异特征值。

**充要条件**：每个特征值的几何重数 = 代数重数。

### 4.2 对角化公式

如果 \\(A\\) 可对角化，令 \\(S\\) 为特征向量矩阵，\\(\\Lambda\\) 为特征值对角矩阵：

\\[A = S\\Lambda S^{-1}\\]

**核心应用**：

\\[A^k = S\\Lambda^k S^{-1}\\]

计算矩阵的高次幂从 \\(O(n^3 \\log k)\\) 降到 \\(O(n^3 + n \\log k)\\)。

\`\`\`python
def matrix_power(A, k):
    """用对角化计算矩阵幂"""
    eigvals, eigvecs = np.linalg.eig(A)
    S = eigvecs
    Lambda_k = np.diag(eigvals ** k)
    return S @ Lambda_k @ np.linalg.inv(S)

A = np.array([[1, 2], [2, 1]])
A_10 = matrix_power(A, 10)
print("A^10:")
print(A_10)
print("验证:")
print(np.linalg.matrix_power(A, 10))
\`\`\`

## 5. 差分方程的应用

### 5.1 斐波那契数列

\\[F_{k+2} = F_{k+1} + F_k, \\quad F_0 = 0, F_1 = 1\\]

用矩阵形式：

\\[\\begin{bmatrix} F_{k+2} \\\\ F_{k+1} \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} F_{k+1} \\\\ F_k \\end{bmatrix}\\]

特征值为 \\(\\phi = \\frac{1+\\sqrt{5}}{2}\\) 和 \\(\\psi = \\frac{1-\\sqrt{5}}{2}\\)。

\\[F_k = \\frac{\\phi^k - \\psi^k}{\\sqrt{5}}\\]

这就是斐波那契数列的闭式解！

\`\`\`python
phi = (1 + np.sqrt(5)) / 2
psi = (1 - np.sqrt(5)) / 2

def fib_closed(k):
    return (phi**k - psi**k) / np.sqrt(5)

for k in range(10):
    print(f"F_{k} = {int(round(fib_closed(k)))}")
\`\`\`

## 6. 本节习题

1. 求 \\(\\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}\\) 的特征值和特征向量
2. 证明：如果 \\(\\lambda\\) 是 \\(A\\) 的特征值，则 \\(\\lambda^2\\) 是 \\(A^2\\) 的特征值
3. 如果 \\(A\\) 的特征值都是 1，\\(A\\) 一定等于 \\(I\\) 吗？
4. 用矩阵对角化计算：\\(\\begin{bmatrix} 0 & 1 \\\\ -2 & -3 \\end{bmatrix}^{10}\\)
5. 证明：不同特征值对应的特征向量线性无关

## 总结

- 特征向量 = 变换下的不变方向
- 特征值 = 沿不变方向的缩放倍数
- 对角化 \\(A = S\\Lambda S^{-1}\\) 化简矩阵幂
- \\(\\text{tr} = \\sum \\lambda_i\\)，\\(\\det = \\prod \\lambda_i\\)
`,
  },
  {
    title: "微分方程与矩阵指数",
    slug: "differential-equations-matrix-exponential",
    order: 9,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 用矩阵形式表示微分方程组
- 理解矩阵指数的定义和计算
- 应用特征值解微分方程组
- 理解稳定性和特征值的关系

## 1. 一阶微分方程组

### 1.1 问题

考虑耦合微分方程组：

\\[\\frac{du_1}{dt} = -u_1 + 2u_2\\]
\\[\\frac{du_2}{dt} = u_1 - 2u_2\\]

写成矩阵形式：

\\[\\frac{d\\mathbf{u}}{dt} = A\\mathbf{u}, \\quad A = \\begin{bmatrix} -1 & 2 \\\\ 1 & -2 \\end{bmatrix}\\]

### 1.2 解耦

如果 \\(A\\) 可对角化，令 \\(\\mathbf{u} = S\\mathbf{v}\\)：

\\[\\frac{d\\mathbf{v}}{dt} = \\Lambda \\mathbf{v}\\]

每个方程变成独立的一阶方程：\\(\\frac{dv_i}{dt} = \\lambda_i v_i\\)

解：\\(v_i(t) = v_i(0) e^{\\lambda_i t}\\)

因此：

\\[\\mathbf{u}(t) = S e^{\\Lambda t} S^{-1} \\mathbf{u}(0) = e^{At}\\mathbf{u}(0)\\]

### 1.3 稳定性分析

- 所有 \\(\\text{Re}(\\lambda_i) < 0\\) ⇒ 系统稳定（\\(\\mathbf{u}(t) \\to \\mathbf{0}\\)）
- 有 \\(\\text{Re}(\\lambda_i) > 0\\) ⇒ 系统不稳定（发散）
- 有纯虚特征值 ⇒ 振荡

## 2. 矩阵指数

\\[e^{At} = I + At + \\frac{A^2 t^2}{2!} + \\frac{A^3 t^3}{3!} + \\cdots\\]

很像泰勒级数，只是把标量 \\(a\\) 换成了矩阵 \\(A\\)。

如果 \\(A = S\\Lambda S^{-1}\\)：

\\[e^{At} = S e^{\\Lambda t} S^{-1}\\]

而 \\(e^{\\Lambda t} = \\text{diag}(e^{\\lambda_1 t}, \\ldots, e^{\\lambda_n t})\\)。

\`\`\`python
def matrix_exponential(A, t):
    """计算矩阵指数"""
    eigvals, eigvecs = np.linalg.eig(A)
    S = eigvecs
    exp_Lambda = np.diag(np.exp(eigvals * t))
    return S @ exp_Lambda @ np.linalg.inv(S)

# 示例
A = np.array([[-1, 2],
              [1, -2]])

# 初始条件
u0 = np.array([3, 0])

# t=1 时的解
t = 1.0
exp_At = matrix_exponential(A, t)
u_t = exp_At @ u0
print(f"u({t}) = {u_t}")

# 验证：用 scipy 的矩阵指数
from scipy.linalg import expm
print(f"scipy: {expm(A * t) @ u0}")
\`\`\`

## 3. 马尔可夫矩阵

**定义**：每列元素和为 1 的非负矩阵。

**性质**：
- 特征值 \\(\\lambda_1 = 1\\)
- 其他特征值 \\(|\\lambda_i| < 1\\)
- \\(u_k = A^k u_0\\) 趋于稳态（对应 \\(\\lambda = 1\\) 的特征向量）

\`\`\`python
# 人口迁移模型
M = np.array([[0.9, 0.2],
              [0.1, 0.8]])
# 每列和为1：0.9+0.1=1, 0.2+0.8=1

# 初始分布
u = np.array([1.0, 0.0])

# 迭代
for step in range(5):
    print(f"第{step}年: 城市={u[0]:.3f}, 乡村={u[1]:.3f}")
    u = M @ u

print(f"\\n稳态:")
eigvals, eigvecs = np.linalg.eig(M)
steady = eigvecs[:, 0]
steady = steady / steady.sum()
print(f"城市={steady[0]:.3f}, 乡村={steady[1]:.3f}")
\`\`\`

## 4. 本节习题

1. 解 \\(\\frac{du}{dt} = \\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix} u\\)，初始条件 \\(u(0) = [1, 0]\\)
2. 判断 \\(A = \\begin{bmatrix} -2 & 1 \\\\ 1 & -2 \\end{bmatrix}\\) 对应的系统是否稳定
3. 证明：马尔可夫矩阵总有特征值 1
4. 用矩阵指数求解一个二阶微分方程（转化为一阶方程组）

## 总结

- 线性微分方程组可以用矩阵指数 \\(e^{At}\\) 求解
- 对角化将耦合系统解耦为独立的一阶方程
- 稳定性由特征值的实部决定
- 马尔可夫矩阵收敛到稳态分布
`,
  },
  {
    title: "对称矩阵与正定性",
    slug: "symmetric-positive-definite",
    order: 10,
    estimatedMinutes: 60,
    content: `## 学习目标

完成本节后，你将能够：
- 理解对称矩阵的特殊性质
- 判断矩阵是否正定
- 理解正定矩阵的几何意义
- 应用正定矩阵解决最优化问题

## 1. 对称矩阵

### 1.1 谱定理

**定理**：对称矩阵 \\(A = A^T\\) 可被正交对角化：

\\[A = Q\\Lambda Q^T\\]

其中 \\(Q\\) 是正交矩阵（\\(Q^TQ = I\\)），\\(\\Lambda\\) 是实对角矩阵。

**三个关键结论**（都来自谱定理）：
1. 对称矩阵的特征值全是**实数**
2. 对称矩阵的特征向量相互**正交**
3. 对称矩阵可被**正交**对角化

### 1.2 特征值为实的证明

设 \\(A\\mathbf{x} = \\lambda\\mathbf{x}\\)，\\(A = A^T\\)：
\\[\\bar{\\mathbf{x}}^T A \\mathbf{x} = \\lambda \\|\\mathbf{x}\\|^2\\]
左边取共轭转置：\\((\\bar{\\mathbf{x}}^T A \\mathbf{x})^H = \\mathbf{x}^T A^T \\bar{\\mathbf{x}} = \\mathbf{x}^T A \\bar{\\mathbf{x}} = \\bar{\\lambda}\\|\\mathbf{x}\\|^2\\)
但左边也是实数（因为 \\(A\\) 对称），所以 \\(\\lambda = \\bar{\\lambda}\\)。

## 2. 正定矩阵

### 2.1 定义

对称矩阵 \\(A\\) 正定，如果对所有非零 \\(\\mathbf{x}\\)：\\(\\mathbf{x}^T A \\mathbf{x} > 0\\)。

**几何意义**：二次型 \\(f(\\mathbf{x}) = \\mathbf{x}^T A \\mathbf{x}\\) 是一个向上的碗（椭球抛物面）。

> **直觉**：正定矩阵的二次型就像物理中的势能——在平衡点处，任何偏离都会增加能量。这就是为什么正定矩阵在优化中如此重要（它对应局部极小值）。

### 2.2 五个等价条件

1. \\(\\mathbf{x}^T A \\mathbf{x} > 0\\) 对所有 \\(\\mathbf{x} \\neq \\mathbf{0}\\)
2. 所有特征值 > 0
3. 所有主元 > 0
4. 所有顺序主子式 > 0
5. 存在可逆 \\(R\\) 使得 \\(A = R^T R\\)

\`\`\`python
def check_positive_definite(A):
    tests = {}

    # 测试1：特征值
    eigvals = np.linalg.eigvalsh(A)
    tests["特征值>0"] = np.all(eigvals > 1e-10)

    # 测试3：主元
    LU = np.linalg.lu(A)
    pivots = np.diag(LU[2])
    tests["主元>0"] = np.all(pivots > 1e-10)

    # 测试4：顺序主子式
    n = len(A)
    tests["主子式>0"] = True
    for i in range(1, n+1):
        if np.linalg.det(A[:i, :i]) <= 0:
            tests["主子式>0"] = False
            break

    for name, result in tests.items():
        print(f"{'✓' if result else '✗'} {name}")
    return all(tests.values())

A = np.array([[2, -1, 0],
              [-1, 2, -1],
              [0, -1, 2]])
print("测试正定矩阵:")
check_positive_definite(A)
\`\`\`

### 2.3 2×2 正定的简单判据

\\[A = \\begin{bmatrix} a & b \\\\ b & c \\end{bmatrix}\\]

\\(A\\) 正定 ⇔ \\(a > 0\\) 且 \\(ac - b^2 > 0\\)

## 3. 二次型与椭圆

方程 \\(\\mathbf{x}^T A \\mathbf{x} = 1\\) ：
- 如果 \\(A\\) 正定：定义**椭球**，主轴方向 = 特征向量，轴长 = \\(1/\\sqrt{\\lambda_i}\\)
- 如果 \\(A\\) 有正有负：定义**双曲面**（鞍点）
- 如果 \\(A\\) 半正定：定义**抛物柱面**

## 4. 应用：多元微积分中的二阶导数检验

函数 \\(f: \\mathbb{R}^n \\to \\mathbb{R}\\) 在临界点 \\(\\mathbf{x}^*\\) 处（\\(\\nabla f = \\mathbf{0}\\)）：

- Hessian 矩阵 \\(H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}\\) 正定 ⇒ 局部极小值
- Hessian 负定 ⇒ 局部极大值
- Hessian 不定 ⇒ 鞍点

## 5. 本节习题

1. 判断 \\(\\begin{bmatrix} 3 & 2 \\\\ 2 & 3 \\end{bmatrix}\\) 是否正定
2. 判断 \\(\\begin{bmatrix} 2 & 4 \\\\ 4 & 8 \\end{bmatrix}\\) 是否正定
3. 证明：如果 \\(A\\) 正定，则 \\(A^{-1}\\) 也正定
4. 证明：正定矩阵的所有对角线元素都为正
5. 用特征值分解求椭圆 \\(4x^2 + 4xy + 7y^2 = 1\\) 的主轴方向

## 总结

- 对称矩阵可正交对角化，特征值为实
- 正定矩阵：\\(\\mathbf{x}^T A \\mathbf{x} > 0\\)
- 五个等价条件提供灵活的判断方法
- 正定性在优化、物理、统计学中至关重要
`,
  },
  {
    title: "奇异值分解 SVD",
    slug: "singular-value-decomposition",
    order: 11,
    estimatedMinutes: 70,
    content: `## 学习目标

完成本节后，你将能够：
- 理解 SVD 的几何和代数意义
- 计算 SVD 分解
- 应用 SVD 进行数据压缩和降维
- 理解 SVD 与 PCA 的关系

## 1. SVD 的几何意义

**定理**：任意 \\(m \\times n\\) 矩阵 \\(A\\) 可以分解为：

\\[A = U \\Sigma V^T\\]

其中 \\(U\\) 和 \\(V\\) 是正交矩阵，\\(\\Sigma\\) 是对角矩阵（奇异值 \\(\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq \\sigma_r > 0\\)）。

**几何分解**：
1. \\(V^T\\)：在输入空间**旋转**
2. \\(\\Sigma\\)：沿坐标轴**缩放**（\\(\\sigma_i\\) 倍）
3. \\(U\\)：在输出空间**旋转**

> **直觉 (3Blue1Brown)**：任何线性变换都可以分解为三个简单步骤：先旋转，再缩放，再旋转。SVD 就是这种分解的精确数学表达。与特征值分解不同，SVD 适用于**任意**形状的矩阵。

## 2. SVD 与特征值分解的关系

- \\(U\\) 的列是 \\(AA^T\\) 的特征向量
- \\(V\\) 的列是 \\(A^T A\\) 的特征向量
- \\(\\sigma_i^2\\) 是 \\(A^T A\\)（或 \\(AA^T\\)）的特征值

\`\`\`python
def svd_manual(A):
    """手工计算 SVD"""
    # 计算 V 和 Σ：A^T A 的特征分解
    AT_A = A.T @ A
    eigvals_V, V = np.linalg.eigh(AT_A)
    idx = np.argsort(eigvals_V)[::-1]
    V = V[:, idx]
    s = np.sqrt(eigvals_V[idx])

    # 计算 U
    U = A @ V / s
    # 使 U 正交
    U, _ = np.linalg.qr(U)
    return U, s, V.T

A = np.array([[3, 1],
              [1, 3],
              [0, 0]])
U_manual, s_manual, Vt_manual = svd_manual(A)
U_scipy, s_scipy, Vt_scipy = np.linalg.svd(A)
print("手工奇异值:", s_manual)
print("scipy奇异值:", s_scipy)
\`\`\`

## 3. SVD 与四个基本子空间

SVD 完整揭示四个基本子空间：

- \\(U\\) 的前 \\(r\\) 列张成**列空间** \\(C(A)\\)
- \\(U\\) 的后 \\(m-r\\) 列张成**左零空间** \\(N(A^T)\\)
- \\(V\\) 的前 \\(r\\) 列张成**行空间** \\(C(A^T)\\)
- \\(V\\) 的后 \\(n-r\\) 列张成**零空间** \\(N(A)\\)

**这可能是理解 SVD 最重要的角度**——它一次给出所有四个子空间的正交基。

## 4. 最佳低秩近似

**Eckart-Young 定理**：截断 SVD 给出矩阵的最佳秩 \\(k\\) 近似：

\\[A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T\\]

这是最小化 \\(\\|A - B\\|_F\\) 的秩 \\(k\\) 矩阵。

### 4.1 图像压缩

\`\`\`python
def svd_compress(A, k):
    """SVD 压缩"""
    U, s, Vt = np.linalg.svd(A, full_matrices=False)
    return U[:, :k] @ np.diag(s[:k]) @ Vt[:k, :]

# 模拟一个 100×100 的矩阵
np.random.seed(42)
A = np.random.randn(100, 100)

# 不同压缩比
orig_size = 100 * 100  # 10000

for k in [5, 10, 20, 50]:
    A_k = svd_compress(A, k)
    error = np.linalg.norm(A - A_k) / np.linalg.norm(A)
    comp_size = k * (100 + 100 + 1)  # U_k + s_k + V_k
    ratio = comp_size / orig_size
    print(f"k={k:2d}: 相对误差={error:.3f}, 压缩率={ratio:.1%}")

# 结论：k=20 时压缩率42%，误差已很小
\`\`\`

## 5. SVD 与 PCA

SVD 是主成分分析 (PCA) 的数学基础：

1. 数据中心化：\\(X \\leftarrow X - \\bar{X}\\)
2. 做 SVD：\\(X = U\\Sigma V^T\\)
3. 主成分方向 = \\(V\\) 的列
4. 主成分得分 = \\(U\\Sigma\\)
5. 解释方差比 = \\(\\sigma_i^2 / \\sum \\sigma_j^2\\)

## 6. 条件数

\\[\\kappa(A) = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}\\]

- \\(\\kappa \\approx 1\\)：良态（数值稳定）
- \\(\\kappa\\) 很大：病态（对误差敏感）

\`\`\`python
def condition_number(A):
    _, s, _ = np.linalg.svd(A)
    return s[0] / s[-1]

# 对比良态和病态矩阵
well_conditioned = np.array([[1, 0], [0, 1]])
ill_conditioned = np.array([[1, 1], [1, 1.001]])

print("良态条件数:", condition_number(well_conditioned))
print("病态条件数:", condition_number(ill_conditioned))
\`\`\`

## 7. 本节习题

1. 对 \\(A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\) 做 SVD，与特征值分解对比
2. 证明：\\(\\|A\\|_2 = \\sigma_{\\max}(A)\\)
3. 用 SVD 计算 \\(A\\) 的伪逆 \\(A^{+}\\)
4. 用 SVD 对一张简单的"图像"（16×16 矩阵）做压缩
5. 解释为什么 \\(\\sigma_i^2\\) 是 \\(A^T A\\) 的特征值

## 总结

- SVD 分解任意矩阵为旋转 × 缩放 × 旋转
- 完整揭示四个基本子空间
- 截断 SVD 给出矩阵的最佳低秩近似
- SVD 是 PCA、数据压缩、推荐系统的基础
- 条件数衡量数值稳定性
`,
  },
  {
    title: "线性变换与基变换",
    slug: "linear-transformations-change-basis",
    order: 12,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 理解线性变换在不同基下的矩阵表示
- 进行基变换
- 理解相似矩阵
- 将抽象向量空间思想推广到函数空间

## 1. 线性变换在不同基下的表现

### 1.1 核心思想

同一个线性变换在不同基下有**不同的矩阵表示**。

设 \\(T: \\mathbb{R}^n \\to \\mathbb{R}^n\\) 是线性变换：
- 在标准基下的矩阵为 \\(A\\)
- 在基 \\(\\mathcal{B}\\) 下的矩阵为 \\(B\\)
- \\(P\\) 是从标准基到基 \\(\\mathcal{B}\\) 的过渡矩阵

则：\\(B = P^{-1} A P\\)

> **直觉 (3Blue1Brown)**：不同基下的矩阵就像用不同语言描述同一个故事。\\(P\\) 是"翻译器"——它将一种语言的坐标翻译为另一种语言。\\(B = P^{-1}AP\\) 意味着：先翻译 → 应用变换 → 再翻译回来。

### 1.2 相似矩阵

\\(B\\) 和 \\(A\\) 相似如果存在可逆 \\(P\\) 使得 \\(B = P^{-1}AP\\)。

**相似矩阵的共同性质**：
- 相同的特征值
- 相同的行列式
- 相同的迹
- 相同的秩

## 2. 对角化 = 找最好的基

\\[A = S\\Lambda S^{-1}\\]

这实际上就是基变换！\\(S\\) 是过渡矩阵，\\(\\Lambda\\) 是变换在特征向量基下的矩阵。

**为什么特征向量基这么好？** 因为在这个基下，线性变换变得极其简单——只是一个对角矩阵（沿各轴独立缩放）。

## 3. 相似变换的几何

\`\`\`python
# 演示相似变换
A = np.array([[2, 1],
              [1, 2]])  # 标准基下的矩阵

P = np.array([[1, 1],
              [0, 1]])  # 过渡到新基
P_inv = np.linalg.inv(P)

B = P_inv @ A @ P  # 新基下的矩阵
print("标准基下的 A:")
print(A)
print("\\n新基下的 B (相似变换):")
print(np.round(B, 3))

# 验证特征值不变
print("\\nA 的特征值:", np.linalg.eigvals(A))
print("B 的特征值:", np.linalg.eigvals(B))
\`\`\`

## 4. 抽象向量空间

### 4.1 从箭头到函数

> **直觉 (3Blue1Brown)**：你可能会想"向量空间"只是一个关于箭头的理论。但当你意识到**函数也是向量**时，视野就彻底打开了。

函数向量空间：
- 加法：\\((f+g)(x) = f(x) + g(x)\\)
- 数乘：\\((cf)(x) = c \\cdot f(x)\\)
- 零向量：\\(f(x) = 0\\) 对所有 \\(x\\)

**无穷维向量空间**：所有多项式、所有连续函数——都是向量空间，但它们需要无穷多个基才能描述。

### 4.2 函数的基

傅里叶级数就是函数在三角基下的分解：

\\[f(x) = a_0 + \\sum_{n=1}^\\infty a_n \\cos(nx) + b_n \\sin(nx)\\]

这本质上就是线性代数！\\(\\{1, \\cos x, \\sin x, \\cos 2x, \\sin 2x, \\ldots\\}\\) 是一组正交基。

## 5. 本节习题

1. 在基 \\(\\mathcal{B} = \\{[1,1], [1,-1]\\}\\) 下，旋转 90 度的矩阵是什么？
2. 证明：相似矩阵的特征多项式相同
3. 证明：对所有 \\(x\\) 都满足 \\(A\\mathbf{x} = B\\mathbf{x}\\) 的 \\(A\\) 和 \\(B\\) 必然相等
4. 函数 \\(f(x) = 1, g(x) = x, h(x) = x^2\\) 是否线性无关？
5. 理解：为什么微分算子 \\(\\frac{d}{dx}\\) 是线性变换？

## 总结

- 线性变换在不同基下有不同矩阵表示
- \\(B = P^{-1}AP\\) 是基变换公式
- 对角化 = 在特征向量基下变换最简
- 向量空间的概念可以推广到函数空间
`,
  },
  {
    title: "数值线性代数与总结",
    slug: "numerical-linear-algebra-review",
    order: 13,
    estimatedMinutes: 55,
    content: `## 学习目标

完成本节后，你将能够：
- 理解数值稳定性问题
- 选择合适的算法
- 回顾整个课程的核心思想
- 了解下一步学习方向

## 1. 数值稳定性

### 1.1 为什么需要数值线性代数？

理论上的完美公式在实际计算中可能出问题。

**例：正规方程 \\(A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\)**

虽然理论上正确，但当 \\(A\\) 的条件数大时，\\(A^T A\\) 的条件数是 \\(A\\) 的平方——稳定性更差！

**经验法则**：优先使用 QR 分解或 SVD 而不是正规方程。

### 1.2 算法选择

| 问题 | 推荐算法 | 复杂度 |
|------|---------|--------|
| 解 \\(A\\mathbf{x} = \\mathbf{b}\\) | LU 分解 | \\(\\frac{2}{3}n^3\\) |
| 最小二乘 | QR 分解 | \\(2mn^2\\) |
| 秩亏最小二乘 | SVD | \\(O(mn^2)\\) |
| 特征值 | QR 算法 | \\(O(n^3)\\) |
| SVD | 分治算法 | \\(O(mn^2)\\) |

## 2. 线性代数全景图

让我们退后一步，看看整个课程的"大图景"：

### 第一板块：基本概念
\\[\\text{向量} \\rightarrow \\text{线性组合} \\rightarrow \\text{张成空间} \\rightarrow \\text{基与维度}\\]
\\[\\text{矩阵} \\rightarrow \\text{线性变换} \\rightarrow \\text{矩阵乘法（变换复合）}\\]

### 第二板块：求解线性系统
\\[A\\mathbf{x} = \\mathbf{b} \\rightarrow \\text{高斯消元} \\rightarrow LU \\text{分解}\\]
\\[\\text{当 } \\mathbf{b} \\notin C(A): \\text{最小二乘} \\rightarrow A^T A\\hat{\\mathbf{x}} = A^T\\mathbf{b}\\]

### 第三板块：空间结构
\\[C(A) \\oplus N(A^T) = \\mathbb{R}^m,\\quad C(A^T) \\oplus N(A) = \\mathbb{R}^n\\]

### 第四板块：特征分析
\\[A\\mathbf{x} = \\lambda\\mathbf{x} \\rightarrow \\text{对角化 } A = S\\Lambda S^{-1} \\rightarrow \\text{SVD } A = U\\Sigma V^T\\]

## 3. 核心公式备忘

| 概念 | 公式 |
|------|------|
| 向量长度 | \\(\\|\\mathbf{v}\\| = \\sqrt{\\sum v_i^2}\\) |
| 点积 | \\(\\mathbf{v}\\cdot\\mathbf{w} = \\|\\mathbf{v}\\|\\|\\mathbf{w}\\|\\cos\\theta\\) |
| 投影 | \\(P = A(A^T A)^{-1}A^T\\) |
| LU | \\(A = LU\\) |
| Gram-Schmidt | \\(A = QR\\) |
| 对角化 | \\(A = S\\Lambda S^{-1}\\) |
| 谱定理 | \\(A = Q\\Lambda Q^T\\)（对称） |
| SVD | \\(A = U\\Sigma V^T\\) |
| 矩阵指数 | \\(e^{At} = Se^{\\Lambda t}S^{-1}\\) |

## 4. 下一步学习方向

完成本课程后，你可能想继续学习：

- **计算线性代数**：大规模矩阵、迭代方法、稀疏矩阵
- **矩阵分析**：范数、扰动理论、广义逆
- **张量分析**：高维数据的张量分解
- **应用领域**：
  - **机器学习**：PCA、SVD、岭回归、核方法
  - **图形学**：仿射变换、投影矩阵
  - **量子力学**：Hermitian 矩阵、量子态
  - **信号处理**：FFT、滤波

## 5. 综合练习题

1. 证明：\\(C(A^T) \\perp N(A)\\)
2. 证明：\\(A^T A\\) 总是半正定的
3. 对 \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\) 做：LU、QR、特征值分解、SVD
4. 比较四种分解的结果和意义
5. 用 Python 生成一个随机矩阵，分析它的四个基本子空间

## 总结

本课程的核心可以用一句话概括：

**线性代数是关于线性变换和它们在空间中的作用的学科，矩阵是这种作用的代数表示。**

我们学习了：
- **直观**：向量是箭头，矩阵是变换，行列式是缩放因子
- **理论**：四个子空间、特征值、对角化、SVD
- **计算**：消元、分解、数值稳定性
- **应用**：数据拟合、压缩、微分方程

继续前进——你已经完全掌握了线性代数的基础，为后续的深入学习做好了准备！
`,
  },
]

async function main() {
  console.log("📐 导入 MIT 18.06: 线性代数课程...")

  const existing = await prisma.course.findUnique({ where: { slug: COURSE.slug } })
  if (existing) {
    console.log("  删除旧课程...")
    await prisma.lesson.deleteMany({ where: { courseId: existing.id } })
    await prisma.course.delete({ where: { id: existing.id } })
  }

  const category = await prisma.category.findUnique({ where: { slug: COURSE.categorySlug } })
  if (!category) {
    console.error("找不到分类!"); return
  }

  const course = await prisma.course.create({
    data: {
      title: COURSE.title,
      slug: COURSE.slug,
      description: COURSE.description,
      longDescription: COURSE.longDescription,
      difficulty: COURSE.difficulty,
      estimatedHours: COURSE.estimatedHours,
      order: COURSE.order,
      categoryId: category.id,
    },
  })

  for (const lesson of LESSONS) {
    await prisma.lesson.create({ data: { ...lesson, courseId: course.id } })
  }

  console.log(`✅ ${course.title} — ${LESSONS.length} 节课程`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
