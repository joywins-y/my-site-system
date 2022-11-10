<template>
  <div class="app-container">
    <el-form :model="form" label-position="top">
      <div class="block">网站信息</div>
      <el-form-item label="网站标题" prop="siteTitle" style="width: 500px">
        <el-input v-model="form.siteTitle" :disabled="disabled" />
      </el-form-item>

      <el-form-item label="邮箱" prop="mail" style="width: 500px">
        <el-input v-model="form.mail" :disabled="disabled" />
      </el-form-item>

      <el-form-item label="备案号" prop="icp" style="width: 500px">
        <el-input v-model="form.icp" :disabled="disabled" />
      </el-form-item>

      <el-divider />
      <el-form-item label="网站头像信息" prop="avatar">
        <template v-if="disabled">
          <el-image style="width: 100px; height: 100px" :src="form.avatar" />
        </template>
        <template v-else>
          <UploadFile v-model="form.avatar" />
        </template>
      </el-form-item>

      <el-divider />
      <div class="block">网址图标信息</div>
      <el-form-item label="网址图标地址" prop="favicon" style="width: 500px">
        <el-input v-model="form.favicon" placeholder="请输入图片地址" :disabled="disabled" />
      </el-form-item>

      <el-form-item label="网址图标预览" prop="favicon">
        <template v-if="disabled">
          <el-image style="width: 50px; height: 50px" :src="form.favicon" />
        </template>
        <template v-else>
          <UploadFile v-model="form.favicon" />
        </template>
      </el-form-item>

      <el-divider />
      <div class="block">github 信息</div>
      <el-form-item label="github 名字" style="width: 500px" prop="githubName">
        <el-input v-model="form.githubName" :disabled="disabled" />
      </el-form-item>

      <el-form-item label="github 地址" style="width: 500px" prop="github">
        <el-input v-model="form.github" :disabled="disabled" />
      </el-form-item>

      <el-divider />
      <div class="block">QQ 信息</div>
      <el-form-item label="QQ 号码" style="width: 500px" prop="qq">
        <el-input v-model="form.qq" :disabled="disabled" />
      </el-form-item>

      <el-form-item label="QQ 二维码图片预览" style="width: 500px" prop="qqQrCode">
        <template v-if="disabled">
          <el-image style="width: 100px; height: 100px" :src="form.qqQrCode" />
        </template>
        <template v-else>
          <UploadFile v-model="form.qqQrCode" />
        </template>
      </el-form-item>

      <el-divider />
      <div class="block">微信信息</div>
      <el-form-item label="微信号" style="width: 500px" prop="weixin">
        <el-input v-model="form.weixin" :disabled="disabled" />
      </el-form-item>

      <el-form-item label="微信二维码图片预览" style="width: 500px" prop="weixinQrCode">
        <template v-if="disabled">
          <el-image style="width: 100px; height: 100px" :src="form.weixinQrCode" />
        </template>
        <template v-else>
          <UploadFile v-model="form.weixinQrCode" />
        </template>
      </el-form-item>

    </el-form>
    <el-divider />
    <div align="right">
      <template v-if="disabled">
        <el-button type="primary" @click="handleEdit">进入编辑模式</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button @click="disabled = true">取消</el-button>
      </template>
    </div>
    <!-- 弹出层 -->
    <el-dialog title="请编辑信息" :visible.sync="visible" width="50%" top="5vh">
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form2.siteTitle" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form2.mail" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form2.icp" />
        </el-form-item>
        <el-form-item label="网站头像地址">
          <!-- <el-input v-model="form2.avatar"></el-input> -->
          <UploadFile v-model="form2.avatar" />
        </el-form-item>
        <el-form-item label="网站图标地址">
          <el-input v-model="form2.favicon" />
        </el-form-item>
        <el-form-item label="github 名字">
          <el-input v-model="form2.githubName" />
        </el-form-item>
        <el-form-item label="github 地址">
          <el-input v-model="form2.github" />
        </el-form-item>
        <el-form-item label="QQ 号码">
          <el-input v-model="form2.qq" />
        </el-form-item>
        <el-form-item label="QQ 二维码图片地址">
          <!-- <el-input v-model="form2.qqQrCode"></el-input> -->
          <UploadFile v-model="form2.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form2.weixin" />
        </el-form-item>
        <el-form-item label="微信二维码图片地址">
          <!-- <el-input v-model="form2.weixinQrCode"></el-input> -->
          <UploadFile v-model="form2.weixinQrCode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSetting, setSetting } from '@/api/setting.js'
import UploadFile from '@/components/UploadFile'

export default {
  components: { UploadFile },
  props: {},
  data() {
    return {
      form: {
        avatar: '',
        favicon: '',
        github: '',
        githubName: '',
        icp: '',
        id: '',
        mail: '',
        qq: '',
        qqQrCode: '',
        siteTitle: '',
        weixin: '',
        weixinQrCode: ''
      },
      form2: {
        avatar: '',
        favicon: '',
        github: '',
        githubName: '',
        icp: '',
        id: '',
        mail: '',
        qq: '',
        qqQrCode: '',
        siteTitle: '',
        weixin: '',
        weixinQrCode: ''
      },
      visible: false,
      disabled: true
    }
  },

  created() {
    this.fetchData() // 获取数据
  },
  methods: {
    fetchData() {
      getSetting().then(res => {
        this.form = res.data
        // 处理图片的链接
        // this.form.avatar2 = server_URL  + this.form.avatar;
        // this.form.qqQrCode2 = server_URL  + this.form.qqQrCode;
        // this.form.weixinQrCode2 = server_URL  + this.form.weixinQrCode;
        this.form2 = { ...this.form }
      })
    },
    handleEdit() {
      this.disabled = false
      // this.visible = true
    },
    handleConfirm() {
      // setSetting(this.form2).then(() => {
      //   this.visible = false;
      //   this.fetchData();
      //   this.$message.success('修改成功！');
      // })
      setSetting(this.form).then(() => {
        this.fetchData()
        this.$message.success('修改成功！')
      });
      this.disabled = true;
    }
  }
}
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-size: 20px;
  font-weight: 100;
}

.block2 {
  margin: 15px 0;
  font-size: 14px;
  font-weight: 100;
}
</style>
