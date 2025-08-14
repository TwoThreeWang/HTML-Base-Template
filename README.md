# HTML Base Template - 现代化HTML基础模板

这是一个功能完整的HTML基础模板项目，专为开发现代化响应式网站而设计。项目集成了SVG图标系统、响应式布局和现代化的开发工具。

## 🚀 项目特色

- **SVG精灵图系统**：高效的图标管理方案
- **响应式设计**：完美适配移动端和桌面端
- **现代化HTML5结构**：语义化标签，SEO友好
- **图标自动化工具**：Python脚本自动生成SVG精灵图
- **模块化CSS**：可复用的样式组件

## 📁 项目结构

```
HTML-Base-Template/
├── css/                    # 样式文件目录
│   ├── icon.css           # 图标样式文件
│   ├── icons/             # SVG图标文件
│   │   ├── *.svg         # 各种图标文件
│   └── 生成svg精灵图.py   # SVG精灵图生成脚本
├── index.html             # 完整响应式网站框架示例
├── sprite.svg             # 生成的SVG精灵图文件
└── README.md              # 项目说明文档
```

## 🛠️ 快速开始

### 1. 克隆项目
```bash
git clone [项目地址]
cd HTML-Base-Template
```

### 2. 使用SVG图标系统

**1：直接在use中引用（传统方式）**
```html
<svg class="icon">
  <use href="sprite.svg#图标名称"></use>
</svg>
```

**2：使用base标签避免重复路径（推荐）**
在HTML的`<head>`中添加：
```html
<base href="./">
```
然后可以简化为：
```html
<svg class="icon">
  <use href="sprite.svg#图标名称"></use>
</svg>
```

**3：使用symbol引用（最简洁）**
在HTML中预定义sprite引用：
```html
<svg style="display:none;">
  <defs>
    <symbol id="cog-icon" viewBox="0 0 24 24">
      <use href="sprite.svg#cog"></use>
    </symbol>
    <symbol id="user-icon" viewBox="0 0 24 24">
      <use href="sprite.svg#circle-user"></use>
    </symbol>
  </defs>
</svg>
```
然后直接使用：
```html
<svg class="icon"><use href="#cog-icon"></use></svg>
<svg class="icon"><use href="#user-icon"></use></svg>
```

**4：使用JavaScript动态加载**
```javascript
// 在页面加载时自动加载sprite
fetch('sprite.svg')
  .then(response => response.text())
  .then(svg => {
    const div = document.createElement('div');
    div.innerHTML = svg;
    div.style.display = 'none';
    document.body.insertBefore(div, document.body.firstChild);
  });
```
然后可以直接使用：
```html
<svg class="icon"><use href="#cog"></use></svg>
```

## 🎨 可用图标

项目包含以下图标（位于 `css/icons/`）：
- 基础图标：home, user, bell, clock, search, star
- 功能图标：edit, trash, copy, eye, link, cog
- 媒体图标：image, html5, podcast, newspaper
- 箭头图标：arrow-right, redo
- 其他图标：fire, folder-open, comments, etc.

## 📱 响应式特性

- **移动优先**：基于移动设备的响应式设计
- **弹性布局**：使用Flexbox和Grid布局
- **媒体查询**：针对不同屏幕尺寸的优化
- **触摸友好**：适合触摸操作的交互设计

## 🔧 开发工具

### SVG精灵图生成器
- **文件**：`css/生成svg精灵图.py`
- **功能**：自动将多个SVG文件合并为单个精灵图
- **使用方法**：
  ```bash
  python css/生成svg精灵图.py
  ```

### 自定义配置
可以在Python脚本中修改以下参数：
```python
INPUT_DIR = "icons"        # 输入SVG文件夹
OUTPUT_FILE = "sprite.svg" # 输出精灵图文件
```

## 🌐 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器（iOS Safari 12+, Chrome Mobile）

## 📄 许可证

MIT License - 详见项目根目录LICENSE文件

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交GitHub Issue

---

*这是一个现代化的HTML基础模板，旨在帮助开发者快速构建高质量的响应式网站。*