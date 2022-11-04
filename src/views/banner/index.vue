<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%;">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="midImg" label="小图">
        <template slot-scope="scope">
          <img :src="scope.row.bigImg" alt="" style="width: 100px; height: 100%;">
        </template>
      </el-table-column>
      <el-table-column prop="bigImg" label="大图">
        <template slot-scope="scope">
          <el-image :src="scope.row.bigImg" style="width: 100px; height: 100%" fit="fill" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出编辑框 -->

    <el-dialog title="编辑" :visible.sync="visible" :close-on-click-modal="false" :destroy-on-close="true">
      <el-form :model="form" label-position="top">
        <el-form-item label="标题" :label-width="labelWidth">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="描述" :label-width="labelWidth">
          <el-input v-model="form.description" type="textarea" rows="4" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="小图">
              <UploadFile v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大图">
              <UploadFile v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getBanner, setBanner } from '@/api/banner'
// import { server_URL } from '@/utils/url';
import UploadFile from '@/components/UploadFile'

export default {
  components: { UploadFile },
  props: {},
  data() {
    return {
      data: [],
      visible: false,
      form: {
        id: '',
        midImg: '',
        bigImg: '',
        title: '',
        description: ''
      },
      labelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  // computed: {
  //   imageUrl(){
  //     if(this.value){

  //     }
  //   }
  // },
  methods: {
    fetchData() {
      getBanner().then(res => {
        console.log(res)
        this.data = res.data
        // for (const item of this.data) {
        //   item.minImg = server_URL + item.midImg;
        //   item.maxImg = server_URL + item.bigImg;
        // }
      })
    },
    handleEdit(index, record) {
      this.form = { ...record }
      this.visible = true
    },
    handleConfirm() {
      const arr = [...this.data]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form
        }
      }

      setBanner(arr).then(res => {
        this.visible = false
        this.$message({ type: 'success', message: '修改成功！' })
        this.fetchData()
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
