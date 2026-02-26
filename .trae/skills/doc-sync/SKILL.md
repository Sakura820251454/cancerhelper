---
name: "doc-sync"
description: "Enforces documentation synchronization across codebase. Invoke after any code changes to update file headers, folder READMEs, and root ARCHITECTURE.md."
---

# 文档同步规范 (Doc Sync)

此技能确保代码与文档始终保持同步，是AI辅助编程的核心规范。

## 核心原则

**任何代码变更后，必须同步更新相关文档。**

## 三层文档结构

### 1. 根目录主文档 (ARCHITECTURE.md)

位置：项目根目录 `ARCHITECTURE.md`

内容要求：
- 系统整体架构概述
- 核心模块关系图
- **必须在顶部声明：** "任何功能、架构、写法更新必须在工作结束后同步更新相关目录的子文档"

### 2. 文件夹文档 (README.md)

位置：每个文件夹内的 `README.md`

内容要求（极简）：
```
# [文件夹名]

架构说明（三行以内）

---
一旦我所属的文件夹有所变化请更新我

## 文件清单

| 文件名 | 地位 | 功能 |
|--------|------|------|
| xxx.ts | 核心组件 | 处理xxx逻辑 |
```

### 3. 代码文件头注释

每个代码文件开头必须包含：

```typescript
/**
 * @input 依赖外部的什么（模块、组件、类型）
 * @output 对外提供什么（函数、组件、类型）
 * @pos 在系统局部的地位是什么
 * 
 * 一旦我被更新务必更新我的开头注释以及所属文件夹的 README.md
 */
```

## 执行时机

**必须在此技能被激活后执行以下步骤：**

1. **代码修改完成后**
   - 更新被修改文件的头注释（input/output/pos）
   - 更新该文件所属文件夹的 README.md

2. **新增文件后**
   - 为新文件添加标准头注释
   - 更新所属文件夹的 README.md 文件清单

3. **删除文件后**
   - 从所属文件夹的 README.md 移除相关条目

4. **重构/架构变更后**
   - 更新根目录 ARCHITECTURE.md
   - 更新所有受影响文件夹的 README.md

## 模板

### ARCHITECTURE.md 模板

```markdown
# 系统架构

> 任何功能、架构、写法更新必须在工作结束后同步更新相关目录的子文档

## 概述

[系统整体描述]

## 核心模块

- **模块A**: [描述]
- **模块B**: [描述]

## 架构图

[可选：ASCII图或链接]
```

### 文件夹 README.md 模板

```markdown
# [文件夹名]

[一行描述本模块职责]
[一行说明关键设计]
[一行列出主要依赖]

---
一旦我所属的文件夹有所变化请更新我

## 文件清单

| 文件名 | 地位 | 功能 |
|--------|------|------|
| ... | ... | ... |
```

### 代码文件头注释模板

```typescript
/**
 * @input [外部依赖：模块、组件、类型、API]
 * @output [对外暴露：函数、组件、类型、常量]
 * @pos [地位：核心/辅助/工具/入口等]
 * 
 * 一旦我被更新务必更新我的开头注释以及所属文件夹的 README.md
 */
```

## 示例

### 示例：组件文件

```typescript
/**
 * @input React, @/hooks/useAuth, @/types/user
 * @output ProfileComponent (默认导出), ProfileProps (类型)
 * @pos 用户模块核心组件，负责用户信息展示与编辑
 * 
 * 一旦我被更新务必更新我的开头注释以及所属文件夹的 README.md
 */

'use client';

import { useAuth } from '@/hooks/useAuth';
import type { ProfileProps } from '@/types/user';

export default function ProfileComponent({ userId }: ProfileProps) {
  // ...
}
```

### 示例：工具函数文件

```typescript
/**
 * @input 无外部依赖
 * @output formatDate, parseDate, DateUtils (命名导出)
 * @pos 通用工具层，提供日期处理能力
 * 
 * 一旦我被更新务必更新我的开头注释以及所属文件夹的 README.md
 */

export function formatDate(date: Date): string { ... }
export function parseDate(str: string): Date { ... }
```

## 注意事项

1. **头注释要简洁** - 每个字段一行，不要冗长
2. **地位描述要准确** - 使用"核心"、"辅助"、"工具"、"入口"等明确词汇
3. **依赖要具体** - 写明具体模块名，不要写"各种依赖"
4. **文档同步是强制的** - 不是可选项，是每次代码变更的必要步骤
