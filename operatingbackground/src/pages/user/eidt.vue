<template>
  <base-page index="2-1">
    <template slot="content">
      <div class="box">
        <el-form ref="forms" :model="forms" label-width="80px">
          <el-form-item label="文章ID">
            <el-input readonly="readonly" v-model="forms.noteid"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input readonly="readonly" v-model="forms.username"></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <el-input type="textarea" v-model="forms.notecontent"></el-input>
          </el-form-item>
          <el-form-item label="所属文集">
            <el-input v-model="forms.anthologyname"></el-input>
          </el-form-item>
          <el-form-item label="文章图片">
            <el-input v-model="forms.noteimg"></el-input>
          </el-form-item>
          <el-form-item label="文章音乐">
            <el-input v-model="forms.note"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(forms)">立即修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </base-page>
</template>
<script>
import BasePage from "@/components/BasePage";
import request from "@/http/request.js";
import URL from "@/http/url.js";
export default {
  name: "edit",
  props: [],
  components: {
    "base-page": BasePage
  },

  data() {
    return {
      form: this.$route.params.notedata,
      fileList: []
    };
  },
  computed: {
    forms() {
      return JSON.parse(localStorage.getItem("key"));
    }
  },
  methods: {
    onSubmit(datas) {
      this.$confirm("此操作将永久修改该文章信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return request({
            url: URL.notedata + "/update",
            method: "post",
            data: {
              item: JSON.stringify(datas)
            }
          });

          this.$message({
            type: "success",
            message: "修改用户信息成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改用户信息"
          });
        });
    }
  }
};
</script>
<style>
.box {
  width: 40rem;
  margin: 2rem auto;
}
.el-form {
  width: 30rem;
  margin: 0 auto;
}
.el-textarea__inner {
  height: 10rem;
}
</style>