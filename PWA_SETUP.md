# MaiMBot WebUI PWA 设置指南

为了完成 MaiMBot WebUI 的 PWA (Progressive Web App) 设置，需要进行以下步骤：

## 1. 安装 PWA 相关依赖

```bash
pnpm add -D vite-plugin-pwa
```

## 2. 更新 Vite 配置

在 `vite.config.ts` 文件中添加 PWA 插件配置：

```typescript
import { VitePWA } from 'vite-plugin-pwa'

// 在 plugins 数组中添加:
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'MaiMBot WebUI',
    short_name: 'MaiMBot',
    description: 'MaiMBot网页管理界面 - 配置、监控和管理您的MaiMBot智能QQ群聊机器人',
    theme_color: '#409EFF',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
})
```

## 3. 添加必要的图标

请在 `public` 目录中添加以下图标文件：

- `favicon.ico` - 网站图标
- `apple-touch-icon.png` - 至少 180x180px，用于 iOS 设备
- `pwa-192x192.png` - PWA 图标 (192x192px)
- `pwa-512x512.png` - PWA 图标 (512x512px)

## 4. 本地开发测试

PWA 功能在本地开发环境中可能无法完全测试。为了测试 PWA 功能，建议：

```bash
# 构建生产版本
pnpm build

# 使用 serve 预览构建结果
pnpm preview
```

## 5. 部署

部署时，确保:

1. 服务器配置了 HTTPS (PWA 需要安全连接)
2. 服务器正确设置了 MIME 类型，特别是 `application/manifest+json`
3. 服务器配置了适当的缓存控制标头

## 注意事项

- 始终在使用新的 Service Worker 时测试离线功能
- 在生产环境中监控 PWA 安装和使用情况
- 考虑添加更新提示，当有新版本可用时通知用户
