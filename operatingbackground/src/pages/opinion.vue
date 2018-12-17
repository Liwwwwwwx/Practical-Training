<template>
  <base-page index="6">
    <template slot="content">
      <input
        class="file"
        name="file"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        @change="update"
      >
    </template>
  </base-page>
</template>
<script>
import BasePage from "@/components/BasePage";
import request from "@/http/request.js";
import URL from "@/http/url.js";
export default {
  name: "opinion",

  components: {
    "base-page": BasePage
  },

  data() {
    return {
      fileList: []
    };
  },
  methods: {
    update(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      param.append("chunk", "0"); //添加form表单中其他数据
      console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      // let config = {
      //   headers:{'Content-Type':'multipart/form-data'}
      // };  //添加请求头
      // this.axios.post('http://upload.qiniu.com/',param,config)
      // .then(response=>{
      //   console.log(response.data);
      // })
      console.log(param)
      return request({
        url: URL.upload + '/upload',
        method: "POST",
        data: {
          param: param,
        }
      }).then(res => {
        console.log(res)
        return res;
      });
    }
  }
};
</script>
<style>
</style>
