# selection label tool

> 选品标签排序工具

## 准备工作

### 前置依赖

该项目依赖 [vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)，请确保 nodejs 版本大于 14.18。

项目使用 [pnpm](https://www.pnpm.cn/) 管理包依赖，请先确保已经安装过 pnpm

### 开发部署

进入到该项目根目录，使用如下命令安装依赖：

```shell
pnpm install # 安装
pnpm run dev # 启动开发
pnpm run build # 构建出dist目录

netlify deploy --prod # 发布到netlify（确保已构建出dist目录）
```

## 工具使用

1. 在左侧“魔盒配置”区填入魔盒配置;
2. “标签展示”区会实时显示树组件;
3. 对数组件的节点进行拖拽重新排序;
4. 点击右上角的“预览”按钮后，复制更改后的魔盒配置。
