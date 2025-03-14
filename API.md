# MaiMBot RESTful API 文档

## 基础信息

- **基础URL**: `/api/v1`
- **响应格式**: JSON
- **认证方式**: Bearer Token

## 认证 API

### 获取认证令牌

```http
POST /api/v1/auth/token
```

**请求体**:
```json
{
  "username": "admin",
  "password": "password"
}
```

**响应**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2025-04-14T10:00:00Z"
}
```

## 聊天记录 API

### 获取聊天记录列表

```http
GET /api/v1/chats
```

**查询参数**:

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| page | 整数 | 页码 | 1 |
| limit | 整数 | 每页条数 | 20 |
| group | 字符串 | 群组ID或名称 | - |
| sender | 字符串 | 发送者ID或名称 | - |
| startDate | 字符串 | 起始日期 (ISO 8601格式) | - |
| endDate | 字符串 | 结束日期 (ISO 8601格式) | - |
| query | 字符串 | 搜索关键词 | - |

**响应**:
```json
{
  "data": [
    {
      "id": "1",
      "timestamp": "2023-03-12T10:23:45Z",
      "group": {
        "id": "12345",
        "name": "麦麦粉丝群"
      },
      "sender": {
        "id": "67890",
        "name": "小明",
        "avatar": "https://example.com/avatar/67890.jpg"
      },
      "content": "麦麦，今天天气怎么样？",
      "isBot": false
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

### 导出聊天记录

```http
GET /api/v1/chats/export
```

**查询参数**: 与获取聊天记录相同

**响应**: 文件下载

### 获取群组列表

```http
GET /api/v1/groups
```

**响应**:
```json
{
  "data": [
    {
      "id": "12345",
      "name": "麦麦粉丝群",
      "memberCount": 120
    }
  ]
}
```

## 表情包 API

### 获取表情包列表

```http
GET /api/v1/emojis
```

**查询参数**:

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| page | 整数 | 页码 | 1 |
| limit | 整数 | 每页条数 | 20 |
| emotion | 字符串 | 情绪分类 | - |
| query | 字符串 | 搜索关键词 | - |
| sort | 字符串 | 排序字段 (name\|useCount) | useCount |
| order | 字符串 | 排序方向 (asc\|desc) | desc |

**响应**:
```json
{
  "data": [
    {
      "id": "1",
      "name": "happy_1.png",
      "emotion": "快乐",
      "url": "https://example.com/emojis/happy_1.png",
      "useCount": 42,
      "createdAt": "2023-01-15T08:30:00Z"
    }
  ],
  "pagination": {
    "total": 67,
    "page": 1,
    "limit": 20,
    "pages": 4
  }
}
```

### 获取情绪分类列表

```http
GET /api/v1/emojis/emotions
```

**响应**:
```json
{
  "data": ["快乐", "悲伤", "生气", "惊讶", "无语", "害羞", "思考", "困惑", "得意"]
}
```

### 上传表情包

```http
POST /api/v1/emojis
Content-Type: multipart/form-data
```

**请求参数**:

| 参数 | 类型 | 说明 | 必填 |
|------|------|------|------|
| file | 文件 | 表情包文件 | 是 |
| emotion | 字符串 | 情绪分类 | 是 |

**响应**:
```json
{
  "id": "13",
  "name": "uploaded_happy.png",
  "emotion": "快乐",
  "url": "https://example.com/emojis/uploaded_happy.png",
  "useCount": 0,
  "createdAt": "2025-03-14T12:30:00Z"
}
```

### 批量上传表情包

```http
POST /api/v1/emojis/batch
Content-Type: multipart/form-data
```

**请求参数**:

| 参数 | 类型 | 说明 | 必填 |
|------|------|------|------|
| files[] | 文件数组 | 表情包文件列表 | 是 |
| defaultEmotion | 字符串 | 默认情绪分类 | 否 |

**响应**:
```json
{
  "success": 5,
  "failed": 1,
  "data": [
    {
      "id": "14",
      "name": "batch_1.png",
      "emotion": "快乐",
      "url": "https://example.com/emojis/batch_1.png",
      "useCount": 0,
      "createdAt": "2025-03-14T12:35:00Z"
    }
  ],
  "errors": [
    {
      "filename": "invalid.doc",
      "error": "不支持的文件类型"
    }
  ]
}
```

### 删除表情包

```http
DELETE /api/v1/emojis/{id}
```

**响应**:
```json
{
  "success": true
}
```

## 系统状态 API

### 获取系统状态

```http
GET /api/v1/system/status
```

**响应**:
```json
{
  "version": "1.2.0",
  "uptime": 345600,
  "memory": {
    "total": 8192,
    "used": 4096,
    "free": 4096
  },
  "storage": {
    "total": 102400,
    "used": 51200,
    "free": 51200
  },
  "connectedGroups": 15,
  "activeUsers": 120,
  "messagesProcessed": 5678
}
```

### 获取系统日志

```http
GET /api/v1/system/logs
```

**查询参数**:

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| level | 字符串 | 日志级别 (info\|warning\|error\|all) | all |
| startDate | 字符串 | 起始日期 (ISO 8601格式) | - |
| endDate | 字符串 | 结束日期 (ISO 8601格式) | - |
| limit | 整数 | 条数限制 | 100 |

**响应**:
```json
{
  "data": [
    {
      "timestamp": "2025-03-14T10:15:30Z",
      "level": "info",
      "source": "bot",
      "message": "Bot started successfully"
    },
    {
      "timestamp": "2025-03-14T10:15:35Z",
      "level": "warning",
      "source": "connection",
      "message": "Reconnecting to group 12345"
    }
  ]
}
```

## 机器人配置 API

### 获取机器人配置

```http
GET /api/v1/bot/config
```

**响应**:
```json
{
  "name": "麦麦",
  "model": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 2048,
  "responseDelay": 1000,
  "autoReply": true,
  "replyRate": 0.8,
  "blacklistedWords": ["敏感词1", "敏感词2"],
  "blacklistedUsers": ["123456", "789012"]
}
```

### 更新机器人配置

```http
PATCH /api/v1/bot/config
```

**请求体**:
```json
{
  "name": "麦麦2.0",
  "temperature": 0.8,
  "replyRate": 0.9
}
```

**响应**:
```json
{
  "success": true,
  "message": "配置更新成功"
}
```

## 错误响应

所有API错误将返回适当的HTTP状态码和一个包含错误详情的JSON对象:

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "用户名或密码不正确",
    "details": "..."
  }
}
```

## 注意事项

1. 所有请求需包含有效的认证令牌
2. 文件上传大小限制: 单个文件2MB，批量上传总计10MB
3. API速率限制: 每分钟100请求