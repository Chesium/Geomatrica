<center>
   <img src="../Geomatrica/assets/deduchain.svg" width=500/>
</center>

---
<center><h2>概念</h2></center>

* ## 隐含条件
   传统的欧几里得几何证明过程对各几何图形的位置关系并没有作特别严格的检查，比如「点在直线的哪一侧」「点在另一点的上下左右哪一边」，对于日常做题而言，一般默认配图的各关系就是正确的，但在机器推理检查中要做得更细。  

  下面的几个「关系矩阵」内部存储的均为在日常证明中一般会忽略的条件，在作图和证明过程中会自动生成，辅助检查证明的正确性。矩阵的值多为布尔值（$\mathtt{boolean}$）元组，每个值代表对应情况是否有可能出现。每时每刻每个元组中必有且仅有一个布尔值对应的情况为真。这意味着元组中的布尔值不可能全为非（$\mathtt{false}$），至少有一个值为真（$\mathtt{true}$），此种情形下为真的布尔值对应的情况始终成立。而为非的布尔值对应的情况是被认为「不可能发生」，在分类讨论中是不能被单独提出讨论的，将「假如$\dots$」用于此种情况也是不合法的。

* ## $\mathtt{PL}$：点-线位置关系矩阵
   $\mathtt{PL}_{a,b}$ 指 $P_a$ 与 $l_b$ 的可能位置关系：$\boxed{\boxed{在线方向左侧}\ \boxed{在线上}\ \boxed{在线方向右侧}}$

* ## $\mathtt{PC}$：点-圆位置关系矩阵
   $\mathtt{PC}_{a,b}$ 指 $P_a$ 与 $\odot b$ 的可能位置关系：$\boxed{\boxed{在圆外}\ \boxed{在圆上}\ \boxed{在圆内}}$

* ## $\mathtt{LC}$：线-圆位置关系矩阵
   $\mathtt{LC}_{a,b}$ 指 $l_a$ 与 $\odot b$ 的可能位置关系：$\boxed{\boxed{相离}\ \boxed{相切}\ \boxed{相交}}$

* ## $\mathtt{CC}$：圆-圆位置关系矩阵
   $\mathtt{CC}_{a,b}$ 指 $\odot a$ 与 $\odot b$ 的可能位置关系：$\boxed{\boxed{外离}\ \boxed{外切}\ \boxed{相交}\ \boxed{内切}\ \boxed{内含}}$
   
* ## 隐形连线
   设每两点之间都有一条隐形连线，这些连线有自己的索引，如果所有点都是自由点（没有两个以上的点共线）则每两点对应的连线索引不同。

* ## $\mathtt{PPLI}$：用于检查共线的索引矩阵
   $\mathtt{PPLI}_{a,b}$指$p_a$在$p_b$哪个索引对应的隐形连线上，要判断$P_iP_jP_k$是否三点共线，只需在$\{i,j,k\}$任取两个不同的二元组$\{m,n\}\{p,q\}$，检查$\mathtt{PPLI}_{m,n}=\mathtt{PPLI}_{p,q}$是否成立，若是，则共线，否则不共线。  
   拓展到检查$P_1P_2\dots P_n$共$n$个点是否共线，要在$I=\{1,2,\dots,n\}$中选取至少$\lceil\frac{n}2\rceil$个二元组$\{a_i,b_i\}\ (i\in 1,2,\dots,m)\ (m\geq\lceil\frac{n}2\rceil)$，使这些二元组内的所有元素完全覆盖了$I$，即$a\cup b\supseteq I$，然后检查$\mathtt{PPLI}_{a_1,b_1}=\mathtt{PPLI}_{a_2,b_2}=\dots=\mathtt{PPLI}_{a_m,b_m}$是否成立，若是，则共线，否则不共线。
   
* ## $\mathtt{PPL}$ 共线点位置关系矩阵
   $\mathtt{PLL}_{a,b}$指$p_a$与$p_b$在$\mathtt{PPLI}$中对应隐形连线中$p_a$的可能位置，设此线形如$\overset{a}{—}$$\underset{A}{\circ}\overset{b}{——}\underset{B}{\circ}$$\overset{c}{—}$，则这样：$\boxed{\boxed{在a上}\ \boxed{与A重合}\ \boxed{在b上}\ \boxed{与B重合}\ \boxed{在c上}}$

---
<center><h2>规则</h2></center>

1. 每创建一个非特殊点$P_n\ (n\geq1)$，都遍历一遍所有先前创建的图形对象$P_i\ l_j\ c_k$

$$
\mathtt{PPLI}_{n,i}=\mathtt{PPLI}_{i,n}\gets\frac{n(n-1)}2+i\\
\mathtt{PPL}_{i,n}:\boxed{\circ\bullet\circ\circ\circ}\\
\mathtt{PPL}_{n,i}:\boxed{\circ\circ\circ\bullet\circ}\\
\mathtt{PL}_{i,j}:\boxed{\bullet\bullet\bullet}\\
$$

2. （创建「线上的点」时执行）$\forall P_i\subset l_{j\langle P_a,P_b\rangle}\ (\mathtt{pointOnLine})\implies$
   $$
   \mathtt{PL}_{i,j}:\boxed{\circ\bullet\circ}\\
   \mathtt{PPLI}_{i,a}=\mathtt{PPLI}_{a,i}=\mathtt{PPLI}_{i,b}=\mathtt{PPLI}_{b,i}\gets\mathtt{PPLI}_{a,b}\\
   \mathtt{PPL}_{a,i}\gets\mathtt{PPL}_{a,b}\\
   \mathtt{PPL}_{b,i}\gets\mathtt{PPL}_{b,a}\\
   \mathtt{PPL}_{i,a}=\mathtt{PPL}_{i,b}:
   \begin{cases}
      \boxed{\bullet\bullet\bullet\bullet\bullet}  &  l\in\mathtt{straightLine}\\
      \boxed{\circ\bullet\bullet\bullet\bullet}    &  l\in\mathtt{halfLine}\\
      \boxed{\circ\bullet\bullet\bullet\circ}      &  l\in\mathtt{segment}\\
      \boxed{\circ\circ\circ\bullet\bullet}        &  l\in\mathtt{extensionLine}
   \end{cases}
   $$