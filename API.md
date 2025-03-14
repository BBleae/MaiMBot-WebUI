# MaiMBot RESTful API 文档（草案）

  ## 基础信息
  - 基础URL: `/api/v1`
  - 所有响应均为JSON格式
  - 认证方式: Bearer Token

  ## 认证

  ### 获取认证令牌
  - 方法: POST
  - 路径: `/auth/token`
  - 请求体:
    ```json
    {
      "username": "admin",
      "password": "password"
    }
  - 响应:
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2025-04-14T10:00:00Z"
  }

  聊天记录API

  获取聊天记录列表

  - 方法: GET
  - 路径: /chats
  - 查询参数:
    - page: 页码 (默认: 1)
    - limit: 每页条数 (默认: 20)
    - group: 群组ID或名称 (可选)
    - sender: 发送者ID或名称 (可选)
    - startDate: 起始日期 (ISO 8601格式, 可选)
    - endDate: 结束日期 (ISO 8601格式, 可选)
    - query: 搜索关键词 (可选)
  - 响应:
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
      },
      ...
    ],
    "pagination": {
      "total": 42,
      "page": 1,
      "limit": 20,
      "pages": 3
    }
  }

  导出聊天记录

  - 方法: GET
  - 路径: /chats/export
  - 查询参数: (与获取聊天记录相同)
  - 响应: 文件下载

  获取群组列表

  - 方法: GET
  - 路径: /groups
  - 响应:
  {
    "data": [
      {
        "id": "12345",
        "name": "麦麦粉丝群",
        "memberCount": 120
      },
      ...
    ]
  }

  表情包API

  获取表情包列表

  - 方法: GET
  - 路径: /emojis
  - 查询参数:
    - page: 页码 (默认: 1)
    - limit: 每页条数 (默认: 20)
    - emotion: 情绪分类 (可选)
    - query: 搜索关键词 (可选)
    - sort: 排序字段 (name|useCount, 默认: useCount)
    - order: 排序方向 (asc|desc, 默认: desc)
  - 响应:
  {
    "data": [
      {
        "id": "1",
        "name": "happy_1.png",
        "emotion": "快乐",
        "url": "https://example.com/emojis/happy_1.png",
        "useCount": 42,
        "createdAt": "2023-01-15T08:30:00Z"
      },
      ...
    ],
    "pagination": {
      "total": 67,
      "page": 1,
      "limit": 20,
      "pages": 4
    }
  }

  获取情绪分类列表

  - 方法: GET
  - 路径: /emojis/emotions
  - 响应:
  {
    "data": ["快乐", "悲伤", "生气", "惊讶", "无语", "害羞", "思考", "困惑", "得意"]
  }

  上传表情包

  - 方法: POST
  - 路径: /emojis
  - 内容类型: multipart/form-data
  - 请求参数:
    - file: 表情包文件 (必需)
    - emotion: 情绪分类 (必需)
  - 响应:
  {
    "id": "13",
    "name": "uploaded_happy.png",
    "emotion": "快乐",
    "url": "https://example.com/emojis/uploaded_happy.png",
    "useCount": 0,
    "createdAt": "2025-03-14T12:30:00Z"
  }

  批量上传表情包

  - 方法: POST
  - 路径: /emojis/batch
  - 内容类型: multipart/form-data
  - 请求参数:
    - files[]: 表情包文件列表 (必需)
    - defaultEmotion: 默认情绪分类 (可选)
  - 响应:
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
      },
      ...
    ],
    "errors": [
      {
        "filename": "invalid.doc",
        "error": "不支持的文件类型"
      }
    ]
  }

  删除表情包

  - 方法: DELETE
  - 路径: /emojis/{id}
  - 响应:
  {
    "success": true
  }

  系统状态API

  获取系统状态

  - 方法: GET
  - 路径: /system/status
  - 响应:
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

  获取系统日志

  - 方法: GET
  - 路径: /system/logs
  - 查询参数:
    - level: 日志级别 (info|warning|error|all, 默认: all)
    - startDate: 起始日期 (ISO 8601格式, 可选)
    - endDate: 结束日期 (ISO 8601格式, 可选)
    - limit: 条数限制 (默认: 100)
  - 响应:
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
      },
      ...
    ]
  }

  机器人配置API

  获取机器人配置

  - 方法: GET
  - 路径: /bot/config
  - 响应:
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

  更新机器人配置

  - 方法: PATCH
  - 路径: /bot/config
  - 请求体:
  {
    "name": "麦麦2.0",
    "temperature": 0.8,
    "replyRate": 0.9
  }
  - 响应:
  {
    "success": true,
    "message": "配置更新成功"
  }

  错误响应

  所有API错误将返回适当的HTTP状态码和一个包含错误详情的JSON对象:

  {
    "error": {
      "code": "INVALID_CREDENTIALS",
      "message": "用户名或密码不正确",
      "details": "..."
    }
  }

  注意事项

  1. 所有请求需包含有效的认证令牌
  2. 文件上传大小限制: 单个文件2MB，批量上传总计10MB
  3. API速率限制: 每分钟100请求

  这套API设计涵盖了WebUI需要的所有功能点，包括：
  1. 聊天记录管理（查询、过滤、导出）
  2. 表情包管理（上传、批量导入、分类、删除）
  3. 系统状态监控
  4. 机器人配置管理

  API遵循RESTful风格，使用标准HTTP方法和状态码，具有清晰的资源层次结构和一致的响应格式。
