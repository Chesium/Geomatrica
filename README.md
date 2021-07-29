<img src="assets/GeomatricA.svg" width=200>
=

crd: coordinate的缩写，计算用坐标
pos: position的缩写，显示用坐标
“拖动”指用鼠标按住对象然后拖的操作，大部分时候等价于“移动”
“移动”指对象改变位置时与其相关的对象也随其改变位置

添加功能的步骤:

1. 在shape文件夹里写新功能类
2. 写drawingMode
3. 将drawingMode添至dm.ts
4. 在Mode里注册drawingMode
5. 在index.ts中添加按钮



Geomatrica 是一个类似Geogebra，开发中的动态几何软件（Dynamic Geometry Software (DGS)），目前已实现和准备实现的功能：

以模式分类：

## mode 0 - 拖动

- [x] 可任意拖动自由点，其所有子对象随着改变位置
- [x] 拖动在线、圆上的半自由点时让其沿轨迹运动，做出动点的效果（不断计算离光标最近的位置）
- [x] 可拖动线和圆，这等价于递归拖动其所有父对象，其所有子对象也随着改变位置

## mode 1 - 线段
- [x] 点击界面并拖动以画一条线段
- [x] 点击其他点时可以其为初始点开始画线段
- [x] 点击其他线、圆时在其上作一点并该点为初始点开始画线段
- [x] 若在其他点上松开鼠标，则视为连接该点和初始点
- [x] 若在其他线、圆上松开鼠标，则在其上作一点，连接此点和初始点
## mode 2 - 描点
- [x] 点击界面空白处画一个点
- [x] 点击界面上的线、圆在其上画一个点
## mode 3 - 画圆
- [x] 点击界面确定圆心并拖动以画一个圆
- [x] 点击其他点时可以其为圆心开始画圆
- [x] 点击其他线、圆时在其上作一点并该点为圆心开始画圆
- [x] 若在其他点上松开鼠标，则视为连接该点和初始点
- [x] 若在其他线、圆上松开鼠标，则在其上作一点，连接此点和初始点
## mode 4 - 直线
- [x] 点击界面并拖动以画一条直线
## mode 5 - 射线
- [x] 点击界面并拖动以画一条射线
## mode 6 - 交点
## mode 7 - 垂线
## mode 8 - 平行线
## mode 9 - 延长线
## mode 10 - 角平分线
## mode 11 - 切线
## mode 12 - 中垂线
## mode 13 - 中点
## mode 14 - 外接圆


- [x] 绘线、圆时松开鼠标后若光标在点上则自动吸附至该点
- [x] 绘线、圆模式中点击线或圆时若光标在点上则以其为初始点来绘图
- [x] 绘线、圆模式中点击线或圆时若光标在线或圆上则先创造在其上的一动点并以其为初始点来绘图
- [x] 显示对象点击预判断区域（调试功能）
