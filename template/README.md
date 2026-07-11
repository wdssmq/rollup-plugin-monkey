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
- `match`: userscript 的 `@match`
- `namespace`: userscript 的 `@namespace`
