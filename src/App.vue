<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ChatLogs from './components/chat/ChatLogs.vue'
import EmojiManager from './components/emoji/EmojiManager.vue'

// Control sidebar visibility on mobile
const isSidebarCollapsed = ref(window.innerWidth < 768)

// Menu active state tracker
const activeMenu = ref('dashboard')

// Handle window resize for responsive layout
window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true
  }
})

// Toggle sidebar on mobile
function toggleSidebar(): void {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// Handle menu click
function handleMenuSelect(key: string): void {
  activeMenu.value = key
  // Auto-collapse sidebar on mobile when menu item is clicked
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true
  }
}

// Set light mode for Element Plus
onMounted(() => {
  document.documentElement.classList.remove('dark')
  document.body.setAttribute('data-theme', 'light')
})
</script>

<template>
  <div class="app-container h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm z-10">
      <div class="flex items-center justify-between px-4 py-3">
        <!-- Mobile menu button -->
        <button
          class="md:hidden text-gray-500 hover:text-gray-700"
          @click="toggleSidebar"
        >
          <el-icon size="24">
            <el-icon-menu />
          </el-icon>
        </button>

        <!-- Logo -->
        <div class="flex items-center">
          <img src="/vite.svg" alt="MaiMBot Logo" class="h-8 w-8 mr-2">
          <h1 class="text-xl font-bold text-gray-800">
            MaiMBot WebUI
          </h1>
        </div>

        <!-- User menu -->
        <div class="flex items-center">
          <el-dropdown trigger="click">
            <span class="flex items-center text-gray-700 cursor-pointer">
              <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span class="ml-2 hidden sm:inline">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <el-menu
        :collapse="isSidebarCollapsed"
        :default-active="activeMenu"
        class="sidebar bg-white border-r border-gray-200 h-full overflow-y-auto"
        :class="{ 'md:w-64 w-64': !isSidebarCollapsed, 'w-0 md:w-auto': isSidebarCollapsed }"
        @select="handleMenuSelect"
      >
        <el-menu-item index="dashboard" class="flex items-center">
          <el-icon><el-icon-odometer /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>

        <el-sub-menu index="config">
          <template #title>
            <el-icon><el-icon-setting /></el-icon>
            <span>配置管理</span>
          </template>
          <el-menu-item index="bot-config">
            机器人配置
          </el-menu-item>
          <el-menu-item index="models">
            模型设置
          </el-menu-item>
          <el-menu-item index="reply-behavior">
            回复行为
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="chat-logs">
          <el-icon><el-icon-chat-dot-round /></el-icon>
          <span>聊天记录</span>
        </el-menu-item>

        <el-menu-item index="emojis">
          <el-icon><el-icon-picture /></el-icon>
          <span>表情管理</span>
        </el-menu-item>

        <el-menu-item index="schedule">
          <el-icon><el-icon-calendar /></el-icon>
          <span>日程管理</span>
        </el-menu-item>

        <el-menu-item index="memory">
          <el-icon><el-icon-cpu /></el-icon>
          <span>记忆管理</span>
        </el-menu-item>

        <el-menu-item index="knowledge">
          <el-icon><el-icon-collection /></el-icon>
          <span>知识库</span>
        </el-menu-item>

        <el-menu-item index="relations">
          <el-icon><el-icon-user /></el-icon>
          <span>用户关系</span>
        </el-menu-item>
      </el-menu>

      <!-- Main content -->
      <div class="main-content flex-1 p-4 overflow-y-auto">
        <!-- Dashboard (default view) -->
        <div v-if="activeMenu === 'dashboard'">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              麦麦机器人控制台
            </h2>
            <p class="text-gray-600">
              欢迎使用 MaiMBot WebUI，这里是您管理麦麦机器人的控制中心。
            </p>
          </div>

          <!-- Status Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <el-card shadow="hover" class="status-card">
              <div class="flex items-center">
                <el-icon class="text-green-500 mr-3" :size="36">
                  <el-icon-circle-check />
                </el-icon>
                <div>
                  <div class="text-sm text-gray-500">
                    机器人状态
                  </div>
                  <div class="text-xl font-semibold">
                    运行中
                  </div>
                </div>
              </div>
            </el-card>

            <el-card shadow="hover" class="status-card">
              <div class="flex items-center">
                <el-icon class="text-blue-500 mr-3" :size="36">
                  <el-icon-message />
                </el-icon>
                <div>
                  <div class="text-sm text-gray-500">
                    今日消息
                  </div>
                  <div class="text-xl font-semibold">
                    328
                  </div>
                </div>
              </div>
            </el-card>

            <el-card shadow="hover" class="status-card">
              <div class="flex items-center">
                <el-icon class="text-purple-500 mr-3" :size="36">
                  <el-icon-user-filled />
                </el-icon>
                <div>
                  <div class="text-sm text-gray-500">
                    活跃用户
                  </div>
                  <div class="text-xl font-semibold">
                    42
                  </div>
                </div>
              </div>
            </el-card>

            <el-card shadow="hover" class="status-card">
              <div class="flex items-center">
                <el-icon class="text-orange-500 mr-3" :size="36">
                  <el-icon-alarm-clock />
                </el-icon>
                <div>
                  <div class="text-sm text-gray-500">
                    运行时间
                  </div>
                  <div class="text-xl font-semibold">
                    3天12小时
                  </div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- Recent Activity -->
          <el-card class="mb-6">
            <template #header>
              <div class="flex justify-between items-center">
                <span class="font-semibold">最近活动</span>
                <el-button type="primary" text>
                  查看全部
                </el-button>
              </div>
            </template>

            <el-table
              :data="[
                { time: '10:23', user: '小明', group: '麦麦粉丝群', content: '麦麦，今天天气怎么样？' },
                { time: '10:20', user: '小红', group: '技术交流群', content: '麦麦，帮我搜索一下Vue的文档' },
                { time: '10:15', user: '小刚', group: '日常闲聊群', content: '麦麦，给我讲个笑话' },
                { time: '10:10', user: '小李', group: '麦麦粉丝群', content: '麦麦，你今天的心情怎么样？' },
                { time: '10:05', user: '小王', group: '日常闲聊群', content: '麦麦，你知道今天有什么新闻吗？' },
              ]" style="width: 100%" max-height="250"
            >
              <el-table-column prop="time" label="时间" width="80" />
              <el-table-column prop="user" label="用户" width="100" />
              <el-table-column prop="group" label="群组" width="140" />
              <el-table-column prop="content" label="内容" />
            </el-table>
          </el-card>

          <!-- System Resources -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <el-card>
              <template #header>
                <div class="font-semibold">
                  系统资源
                </div>
              </template>

              <div class="space-y-4">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-700">CPU使用率</span>
                    <span class="text-sm font-semibold text-gray-700">32%</span>
                  </div>
                  <el-progress :percentage="32" />
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-700">内存使用率</span>
                    <span class="text-sm font-semibold text-gray-700">64%</span>
                  </div>
                  <el-progress :percentage="64" color="#909399" />
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-700">磁盘空间</span>
                    <span class="text-sm font-semibold text-gray-700">28%</span>
                  </div>
                  <el-progress :percentage="28" color="#67c23a" />
                </div>
              </div>
            </el-card>

            <!-- Quick Actions -->
            <el-card>
              <template #header>
                <div class="font-semibold">
                  快速操作
                </div>
              </template>

              <div class="grid grid-cols-2 gap-4">
                <el-button type="primary" class="w-full">
                  <el-icon class="mr-1">
                    <el-icon-refresh-right />
                  </el-icon>
                  重启机器人
                </el-button>

                <el-button type="warning" class="w-full">
                  <el-icon class="mr-1">
                    <el-icon-remove />
                  </el-icon>
                  暂停响应
                </el-button>

                <el-button type="success" class="w-full">
                  <el-icon class="mr-1">
                    <el-icon-document />
                  </el-icon>
                  查看日志
                </el-button>

                <el-button type="info" class="w-full">
                  <el-icon class="mr-1">
                    <el-icon-download />
                  </el-icon>
                  备份数据
                </el-button>
              </div>
            </el-card>
          </div>
        </div>

        <!-- Chat logs page -->
        <ChatLogs v-if="activeMenu === 'chat-logs'" />

        <!-- Emoji management page -->
        <EmojiManager v-else-if="activeMenu === 'emojis'" />

        <!-- Placeholder for other pages -->
        <div v-else-if="activeMenu !== 'dashboard'" class="flex items-center justify-center h-full">
          <el-empty description="页面正在开发中...">
            <el-button type="primary" @click="activeMenu = 'dashboard'">
              返回仪表盘
            </el-button>
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sidebar {
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 64px;
}

@media (max-width: 768px) {
  .sidebar.collapsed {
    width: 0;
    overflow: hidden;
  }
}

/* This is needed for correct sidebar transition */
.el-menu--collapse {
  width: 64px;
}
</style>
