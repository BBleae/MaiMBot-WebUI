# MaiMBot RESTful API �ĵ����ݰ���

  ## ������Ϣ
  - ����URL: `/api/v1`
  - ������Ӧ��ΪJSON��ʽ
  - ��֤��ʽ: Bearer Token

  ## ��֤

  ### ��ȡ��֤����
  - ����: POST
  - ·��: `/auth/token`
  - ������:
    ```json
    {
      "username": "admin",
      "password": "password"
    }
  - ��Ӧ:
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2025-04-14T10:00:00Z"
  }

  �����¼API

  ��ȡ�����¼�б�

  - ����: GET
  - ·��: /chats
  - ��ѯ����:
    - page: ҳ�� (Ĭ��: 1)
    - limit: ÿҳ���� (Ĭ��: 20)
    - group: Ⱥ��ID������ (��ѡ)
    - sender: ������ID������ (��ѡ)
    - startDate: ��ʼ���� (ISO 8601��ʽ, ��ѡ)
    - endDate: �������� (ISO 8601��ʽ, ��ѡ)
    - query: �����ؼ��� (��ѡ)
  - ��Ӧ:
  {
    "data": [
      {
        "id": "1",
        "timestamp": "2023-03-12T10:23:45Z",
        "group": {
          "id": "12345",
          "name": "�����˿Ⱥ"
        },
        "sender": {
          "id": "67890",
          "name": "С��",
          "avatar": "https://example.com/avatar/67890.jpg"
        },
        "content": "���󣬽���������ô����",
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

  ���������¼

  - ����: GET
  - ·��: /chats/export
  - ��ѯ����: (���ȡ�����¼��ͬ)
  - ��Ӧ: �ļ�����

  ��ȡȺ���б�

  - ����: GET
  - ·��: /groups
  - ��Ӧ:
  {
    "data": [
      {
        "id": "12345",
        "name": "�����˿Ⱥ",
        "memberCount": 120
      },
      ...
    ]
  }

  �����API

  ��ȡ������б�

  - ����: GET
  - ·��: /emojis
  - ��ѯ����:
    - page: ҳ�� (Ĭ��: 1)
    - limit: ÿҳ���� (Ĭ��: 20)
    - emotion: �������� (��ѡ)
    - query: �����ؼ��� (��ѡ)
    - sort: �����ֶ� (name|useCount, Ĭ��: useCount)
    - order: ������ (asc|desc, Ĭ��: desc)
  - ��Ӧ:
  {
    "data": [
      {
        "id": "1",
        "name": "happy_1.png",
        "emotion": "����",
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

  ��ȡ���������б�

  - ����: GET
  - ·��: /emojis/emotions
  - ��Ӧ:
  {
    "data": ["����", "����", "����", "����", "����", "����", "˼��", "����", "����"]
  }

  �ϴ������

  - ����: POST
  - ·��: /emojis
  - ��������: multipart/form-data
  - �������:
    - file: ������ļ� (����)
    - emotion: �������� (����)
  - ��Ӧ:
  {
    "id": "13",
    "name": "uploaded_happy.png",
    "emotion": "����",
    "url": "https://example.com/emojis/uploaded_happy.png",
    "useCount": 0,
    "createdAt": "2025-03-14T12:30:00Z"
  }

  �����ϴ������

  - ����: POST
  - ·��: /emojis/batch
  - ��������: multipart/form-data
  - �������:
    - files[]: ������ļ��б� (����)
    - defaultEmotion: Ĭ���������� (��ѡ)
  - ��Ӧ:
  {
    "success": 5,
    "failed": 1,
    "data": [
      {
        "id": "14",
        "name": "batch_1.png",
        "emotion": "����",
        "url": "https://example.com/emojis/batch_1.png",
        "useCount": 0,
        "createdAt": "2025-03-14T12:35:00Z"
      },
      ...
    ],
    "errors": [
      {
        "filename": "invalid.doc",
        "error": "��֧�ֵ��ļ�����"
      }
    ]
  }

  ɾ�������

  - ����: DELETE
  - ·��: /emojis/{id}
  - ��Ӧ:
  {
    "success": true
  }

  ϵͳ״̬API

  ��ȡϵͳ״̬

  - ����: GET
  - ·��: /system/status
  - ��Ӧ:
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

  ��ȡϵͳ��־

  - ����: GET
  - ·��: /system/logs
  - ��ѯ����:
    - level: ��־���� (info|warning|error|all, Ĭ��: all)
    - startDate: ��ʼ���� (ISO 8601��ʽ, ��ѡ)
    - endDate: �������� (ISO 8601��ʽ, ��ѡ)
    - limit: �������� (Ĭ��: 100)
  - ��Ӧ:
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

  ����������API

  ��ȡ����������

  - ����: GET
  - ·��: /bot/config
  - ��Ӧ:
  {
    "name": "����",
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 2048,
    "responseDelay": 1000,
    "autoReply": true,
    "replyRate": 0.8,
    "blacklistedWords": ["���д�1", "���д�2"],
    "blacklistedUsers": ["123456", "789012"]
  }

  ���»���������

  - ����: PATCH
  - ·��: /bot/config
  - ������:
  {
    "name": "����2.0",
    "temperature": 0.8,
    "replyRate": 0.9
  }
  - ��Ӧ:
  {
    "success": true,
    "message": "���ø��³ɹ�"
  }

  ������Ӧ

  ����API���󽫷����ʵ���HTTP״̬���һ���������������JSON����:

  {
    "error": {
      "code": "INVALID_CREDENTIALS",
      "message": "�û��������벻��ȷ",
      "details": "..."
    }
  }

  ע������

  1. ���������������Ч����֤����
  2. �ļ��ϴ���С����: �����ļ�2MB�������ϴ��ܼ�10MB
  3. API��������: ÿ����100����

  ����API��ƺ�����WebUI��Ҫ�����й��ܵ㣬������
  1. �����¼������ѯ�����ˡ�������
  2. ����������ϴ����������롢���ࡢɾ����
  3. ϵͳ״̬���
  4. ���������ù���

  API��ѭRESTful���ʹ�ñ�׼HTTP������״̬�룬������������Դ��νṹ��һ�µ���Ӧ��ʽ��
