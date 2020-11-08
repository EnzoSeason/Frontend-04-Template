# HTML

## 转义

&lt;, &gt;, &#34;, &#38;

## 标签语义

* aside: 侧栏
* main: 主体
* footer：脚
* article: 文章
* nav: 导航
* hgroup: 标题组

    ```html
    <hgroup>
        <h1></h1>
        <h2></h2>
    </hgroup>
    ```

* figure + figcaption:

    ```html
    <figure>
        <img />
        <figcaption></figcaption>
    </figure>
    ````

* ol vs li: 如果有顺序性，就用`<ol>`。即使不想显示数字也要用，这是为了体现语义。
* abbr: 缩写
* dfn: 定义
* strong：加粗
* sample：例子
* pre：预处理

## 语法

* 合法元素

  * element：`<tag></tag>`
  * text
  * comment: `<!-- comment -->`
  * DocumentType: `<!Doctype html>`
  * ProcessingInstruction: `<?a 1?>`
  * CDATA: 文本节点 `<![CDATA[]]>`

* 字符引用

  * &#955;
  * &amp;
  * &lt;
  * &gt;
  * &quot;
