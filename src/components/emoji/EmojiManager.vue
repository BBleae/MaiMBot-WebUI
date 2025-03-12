<script setup lang="ts">
import type { UploadFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, reactive, ref } from 'vue'

// Define Emoji interface
interface Emoji {
  id: string
  name: string
  emotion: string
  url: string
  useCount: number
}

// Mock data for emoji categories
const emotions = ['快乐', '悲伤', '生气', '惊讶', '无语', '害羞', '思考', '困惑', '得意']

// Mock data for emojis
const mockEmojis: Emoji[] = [
  { id: '1', name: 'happy_1.png', emotion: '快乐', url: 'https://via.placeholder.com/120', useCount: 42 },
  { id: '2', name: 'happy_2.png', emotion: '快乐', url: 'https://via.placeholder.com/120', useCount: 37 },
  { id: '3', name: 'sad_1.png', emotion: '悲伤', url: 'https://via.placeholder.com/120', useCount: 18 },
  { id: '4', name: 'angry_1.png', emotion: '生气', url: 'https://via.placeholder.com/120', useCount: 23 },
  { id: '5', name: 'surprised_1.png', emotion: '惊讶', url: 'https://via.placeholder.com/120', useCount: 31 },
  { id: '6', name: 'confused_1.png', emotion: '困惑', url: 'https://via.placeholder.com/120', useCount: 15 },
  { id: '7', name: 'happy_3.png', emotion: '快乐', url: 'https://via.placeholder.com/120', useCount: 28 },
  { id: '8', name: 'proud_1.png', emotion: '得意', url: 'https://via.placeholder.com/120', useCount: 19 },
  { id: '9', name: 'surprised_2.png', emotion: '惊讶', url: 'https://via.placeholder.com/120', useCount: 25 },
  { id: '10', name: 'shy_1.png', emotion: '害羞', url: 'https://via.placeholder.com/120', useCount: 33 },
  { id: '11', name: 'angry_2.png', emotion: '生气', url: 'https://via.placeholder.com/120', useCount: 21 },
  { id: '12', name: 'thinking_1.png', emotion: '思考', url: 'https://via.placeholder.com/120', useCount: 29 },
]

const emojis = ref<Emoji[]>(mockEmojis)
const activeEmotion = ref<string>('全部')
const searchQuery = ref<string>('')
const sortBy = ref<keyof Emoji>('useCount')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Filter emojis based on search and active emotion
const filteredEmojis = computed(() => {
  return emojis.value.filter((emoji) => {
    // Filter by emotion category
    const emotionFilter = activeEmotion.value === '全部' || emoji.emotion === activeEmotion.value

    // Filter by search query
    const searchFilter = !searchQuery.value
      || emoji.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    return emotionFilter && searchFilter
  }).sort((a, b) => {
    // Sort by selected field
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    else {
      return aValue < bValue ? 1 : -1
    }
  })
})

// Define upload form interface
interface UploadForm {
  file: UploadFile | null
  emotion: string
}

// Dialog for emoji upload
const uploadDialogVisible = ref<boolean>(false)
const uploadForm = reactive<UploadForm>({
  file: null,
  emotion: '',
})

// Handle file selection
function handleFileChange(file: UploadFile): void {
  uploadForm.file = file
}

// Handle upload submission
function handleUpload(): void {
  // In real implementation, upload file to server
  // console.log('Uploading emoji:', uploadForm)

  // Reset form and close dialog
  uploadForm.file = null
  uploadForm.emotion = ''
  uploadDialogVisible.value = false

  // Notification
  ElMessage({
    type: 'success',
    message: '表情包上传成功！',
  })
}

// Batch import dialog
const batchImportVisible = ref<boolean>(false)

// Handle batch import
function handleBatchImport(): void {
  // In real implementation, handle batch import
  // console.log('Batch importing emojis')
  batchImportVisible.value = false

  // Notification
  ElMessage({
    type: 'success',
    message: '批量导入表情包成功！',
  })
}

// Delete confirmation
function handleDelete(emoji: Emoji): void {
  ElMessageBox.confirm(
    `确定要删除表情包 "${emoji.name}" 吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    // In real implementation, delete from server
    emojis.value = emojis.value.filter(e => e.id !== emoji.id)

    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {
    // User cancelled
  })
}
</script>

<template>
  <div class="emoji-manager">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        表情包管理
      </h2>

      <!-- Toolbar -->
      <div class="flex flex-wrap gap-4 mb-6">
        <el-input
          v-model="searchQuery"
          placeholder="搜索表情包"
          class="w-64"
          clearable
        >
          <template #prefix>
            <el-icon><el-icon-search /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="sortBy"
          placeholder="排序方式"
          class="w-32"
        >
          <el-option label="使用次数" value="useCount" />
          <el-option label="名称" value="name" />
        </el-select>

        <el-select
          v-model="sortOrder"
          placeholder="排序顺序"
          class="w-32"
        >
          <el-option label="降序" value="desc" />
          <el-option label="升序" value="asc" />
        </el-select>

        <div class="ml-auto flex flex-wrap gap-2">
          <el-button type="primary" @click="uploadDialogVisible = true">
            <el-icon class="mr-1">
              <el-icon-upload />
            </el-icon>
            上传表情
          </el-button>

          <el-button @click="batchImportVisible = true">
            <el-icon class="mr-1">
              <el-icon-folder-add />
            </el-icon>
            批量导入
          </el-button>
        </div>
      </div>

      <!-- Emotion categories -->
      <div class="mb-6">
        <el-radio-group v-model="activeEmotion" size="large">
          <el-radio-button label="全部">
            全部
          </el-radio-button>
          <el-radio-button
            v-for="emotion in emotions"
            :key="emotion"
            :label="emotion"
          >
            {{ emotion }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <!-- Emojis grid -->
      <el-empty v-if="filteredEmojis.length === 0" description="没有找到匹配的表情包" />

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <el-card
          v-for="emoji in filteredEmojis"
          :key="emoji.id"
          class="emoji-card"
          shadow="hover"
          body-style="padding: 0;"
        >
          <div class="p-3">
            <img :src="emoji.url" alt="emoji" class="w-full aspect-square object-cover rounded mb-2">

            <div class="text-sm truncate mb-1" :title="emoji.name">
              {{ emoji.name }}
            </div>

            <div class="flex justify-between items-center">
              <el-tag size="small">
                {{ emoji.emotion }}
              </el-tag>
              <span class="text-xs text-gray-500">使用: {{ emoji.useCount }}</span>
            </div>

            <div class="actions mt-2 flex justify-between">
              <el-button type="danger" size="small" text @click="handleDelete(emoji)">
                <el-icon><el-icon-delete /></el-icon>
              </el-button>

              <el-button type="primary" size="small" text>
                <el-icon><el-icon-view /></el-icon>
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- Upload dialog -->
    <el-dialog
      v-model="uploadDialogVisible"
      title="上传表情包"
      width="500px"
    >
      <el-form label-position="top">
        <el-form-item label="选择文件">
          <el-upload
            class="emoji-uploader"
            drag
            action="#"
            :auto-upload="false"
            :limit="1"
            :on-change="handleFileChange"
          >
            <el-icon class="el-icon--upload">
              <el-icon-upload-filled />
            </el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持JPG/PNG/GIF，文件大小不超过2MB
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="情绪分类">
          <el-select v-model="uploadForm.emotion" placeholder="选择情绪分类" class="w-full">
            <el-option
              v-for="emotion in emotions"
              :key="emotion"
              :label="emotion"
              :value="emotion"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpload">上传</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Batch import dialog -->
    <el-dialog
      v-model="batchImportVisible"
      title="批量导入表情包"
      width="500px"
    >
      <el-upload
        class="batch-uploader"
        drag
        action="#"
        :auto-upload="false"
        multiple
      >
        <el-icon class="el-icon--upload">
          <el-icon-upload-filled />
        </el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持批量上传JPG/PNG/GIF文件，文件大小不超过10MB
          </div>
        </template>
      </el-upload>

      <el-form class="mt-4">
        <el-form-item label="默认情绪分类">
          <el-select placeholder="选择默认情绪分类" class="w-full">
            <el-option
              v-for="emotion in emotions"
              :key="emotion"
              :label="emotion"
              :value="emotion"
            />
          </el-select>
          <div class="text-xs text-gray-500 mt-1">
            系统将自动检测表情的情绪，也可以设置默认值
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchImportVisible = false">取消</el-button>
          <el-button type="primary" @click="handleBatchImport">开始导入</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.emoji-card {
  transition: all 0.3s ease;
}

.emoji-card:hover {
  transform: translateY(-5px);
}

.emoji-card .actions {
  opacity: 0.2;
  transition: opacity 0.2s ease;
}

.emoji-card:hover .actions {
  opacity: 1;
}
</style>
