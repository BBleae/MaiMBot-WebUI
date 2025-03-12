<script setup lang="ts">
import { computed, ref } from 'vue'

interface ChatMessage {
  id: string
  timestamp: string
  group: string
  sender: string
  content: string
  isBot: boolean
}

// Mock data - will come from API in real implementation
const mockMessages = [
  {
    id: '1',
    timestamp: '2023-03-12 10:23:45',
    group: '麦麦粉丝群',
    sender: '小明',
    content: '麦麦，今天天气怎么样？',
    isBot: false,
  },
  {
    id: '2',
    timestamp: '2023-03-12 10:24:12',
    group: '麦麦粉丝群',
    sender: '麦麦',
    content: '今天天气晴朗，气温适宜，非常适合户外活动哦！你有什么户外计划吗？',
    isBot: true,
  },
  {
    id: '3',
    timestamp: '2023-03-12 10:25:30',
    group: '麦麦粉丝群',
    sender: '小明',
    content: '我想去公园野餐，你觉得怎么样？',
    isBot: false,
  },
  {
    id: '4',
    timestamp: '2023-03-12 10:26:05',
    group: '麦麦粉丝群',
    sender: '麦麦',
    content: '野餐是个好主意！记得带上防晒霜和足够的饮用水。公园里可能会有其他人也在野餐，记得保持距离哦~',
    isBot: true,
  },
  {
    id: '5',
    timestamp: '2023-03-12 11:30:22',
    group: '技术交流群',
    sender: '小红',
    content: '麦麦，帮我搜索一下Vue的文档',
    isBot: false,
  },
  {
    id: '6',
    timestamp: '2023-03-12 11:31:05',
    group: '技术交流群',
    sender: '麦麦',
    content: 'Vue.js的官方文档可以在https://vuejs.org/guide/introduction.html找到。如果你需要中文文档，可以访问https://cn.vuejs.org/。需要我帮你找些特定的内容吗？',
    isBot: true,
  },
]

const chatMessages = ref<ChatMessage[]>(mockMessages)
const searchQuery = ref('')
const selectedGroup = ref('')
const dateRange = ref('')

// Available groups for filtering
const groups = computed(() => {
  const uniqueGroups = [...new Set(chatMessages.value.map(msg => msg.group))]
  return uniqueGroups
})

// Filtered messages based on search and filters
const filteredMessages = computed(() => {
  return chatMessages.value.filter((msg) => {
    // Filter by search query
    const matchesSearch = !searchQuery.value
      || msg.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      || msg.sender.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Filter by group
    const matchesGroup = !selectedGroup.value || msg.group === selectedGroup.value

    return matchesSearch && matchesGroup
  })
})

// Format time from timestamp (e.g. "10:23")
function formatTime(timestamp: string): string {
  return timestamp.split(' ')[1].substr(0, 5)
}

// Handle export data
function exportData(): void {
  // In real implementation, generate and download logs
  // console.log('Exporting chat logs...')
}
</script>

<template>
  <div class="chat-logs">
    <!-- Header with filters -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        聊天记录
      </h2>

      <div class="flex flex-wrap gap-4 mb-4">
        <el-input
          v-model="searchQuery"
          placeholder="搜索消息内容或发送者"
          class="max-w-md"
          clearable
        >
          <template #prefix>
            <el-icon><el-icon-search /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedGroup"
          placeholder="选择群组"
          clearable
          class="w-40"
        >
          <el-option
            v-for="group in groups"
            :key="group"
            :label="group"
            :value="group"
          />
        </el-select>

        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="w-72"
        />
      </div>

      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          共找到 {{ filteredMessages.length }} 条消息
        </div>
        <el-button type="primary" @click="exportData">
          <el-icon class="mr-1">
            <el-icon-download />
          </el-icon>
          导出记录
        </el-button>
      </div>
    </div>

    <!-- Chat message list -->
    <div class="space-y-4">
      <el-empty v-if="filteredMessages.length === 0" description="没有找到匹配的聊天记录" />

      <div
        v-for="message in filteredMessages"
        :key="message.id"
        class="chat-message p-4 rounded-lg"
        :class="message.isBot ? 'bg-blue-50' : 'bg-gray-50'"
      >
        <div class="flex items-start gap-3">
          <!-- Avatar -->
          <el-avatar
            :size="40"
            :class="message.isBot ? 'bg-blue-500' : 'bg-gray-400'"
          >
            {{ message.isBot ? '麦' : message.sender.charAt(0) }}
          </el-avatar>

          <!-- Message content -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-baseline gap-2 mb-1">
              <span class="font-medium text-gray-900">
                {{ message.sender }}
              </span>
              <span class="text-xs text-gray-500">
                {{ message.group }}
              </span>
              <span class="text-xs text-gray-400 ml-auto">
                {{ formatTime(message.timestamp) }}
              </span>
            </div>

            <div class="text-gray-800 break-words">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        :page-size="10"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  transition: all 0.2s ease;
}

.chat-message:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}
</style>
