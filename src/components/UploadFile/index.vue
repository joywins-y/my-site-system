<template>
  <div class="upload-container">
    <div class="block">{{ title }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" alt="img" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { server_URL } from '@/utils/url'

export default {
  props: {
    title: { type: String, default: '' },
    value: { type: String, default: '' }
  },
  computed: {
    imageUrl() {
      if (this.value) {
        const prefix = this.value.indexOf('http') === -1 ? server_URL : ''
        return prefix + this.value
      }
    },
    headers() {
      return {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  methods: {
    handleSuccess(res, file) {
      if (!res.code && res.data) {
        this.$emit('input', res.data)
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式！')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="scss">
.upload-container {
    .block {
        margin: 16px 0;
        font-weight: 100;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            border-color: #409EFF;
        }
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 100%;
        display: block;
    }
}
</style>
