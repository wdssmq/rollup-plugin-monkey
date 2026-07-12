# template

独立的 Plop 子项目，用于生成新的 GM 工程。

## 使用

在 `rollup-plugin-monkey` 根目录执行：

```bash
pnpm --dir template run gen:gm

```

或在当前目录执行：

```bash
pnpm run gen:gm

```

生成结果默认输出到 `template/output/<name>`。

## 生成后

```bash
cd template/output/<name>
pnpm install
pnpm run dev

```

## 参数

- `name`: 项目名（kebab-case）
- `description`: userscript 描述
- `match`: userscript 的 `@match`，支持单值或多值
- `namespace`: userscript 的 `@namespace`

### `match` 多值说明

- 支持逗号分隔：`http://localhost:3000/*,http://127.0.0.1:3000/*`
- 支持换行分隔（交互输入时可粘贴多行）
- 会自动 `trim`、去空值、去重
- 若最终为空，会回退为默认值：`http://localhost:3000/*`

生成后的 `src/__info.js` 会输出多行 `@match`，例如：

```js
// @match        http://localhost:3000/*
// @match        http://127.0.0.1:3000/*
```

可通过命令行参数直接传入（非交互）：

```bash
pnpm --dir template run gen:gm -- --name gm-demo --description "demo" --match "http://localhost:3000/*,http://127.0.0.1:3000/*" --namespace "https://www.wdssmq.com/"

```
