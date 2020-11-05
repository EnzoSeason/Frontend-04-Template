# Flexbox

1. 收集 box 进 line

    * 分行： 

        * 根据主轴尺寸，进行分行
        * no-wrap，不分行

2. 计算 main axis layout
    
    1. 找出所有flex元素
    2. 主轴方向的空间，按比例分给flex元素
    3. 剩余空间为负数，所有flex置零，等比压缩

3. 计算 cross axis layout

    1. 根据每行的最大元素，获得行高
    2. 根据行高，flex-algin，item-align，确定元素具体位置