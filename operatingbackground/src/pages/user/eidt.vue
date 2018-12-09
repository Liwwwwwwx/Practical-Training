<template>
  <base-page index="2-1">
    <template slot="content">
      <div class="box">
        <el-form ref="forms" :model="forms" label-width="80px">
          <el-form-item label="用户 ID">
            <el-input readonly="readonly" v-model="forms.noteid"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="forms.username"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                readonly="readonly"
                placeholder="选择日期"
                v-model="forms.logindate"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-date-picker
                type="date"
                readonly="readonly"
                placeholder="选择日期"
                v-model="forms.birth"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-input v-model="forms.sex"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="age" v-model.number="forms.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="邮箱">
            <el-input v-model="form.name"></el-input>
          </el-form-item>-->
          <el-form-item label="QQ">
            <el-input v-model="forms.qq"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="forms.wechat"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" v-model="forms.desc"></el-input>
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
      this.$confirm("此操作将永久修改该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("addOne", datas);
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
</style>