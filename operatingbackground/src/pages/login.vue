<template>
    <div class="container" :style="backgroundDiv">
       <div class="login">
           <div>
               <p style="font-size:46px;font-weight:solid;">{{Timenow}}</p>
               <p style="font-size:10px;">{{Datenow}} <span>{{Weeknow}}</span> </p>
           </div>
            <div style="height:100px;display:flex;flex-direction:column;justify-content:space-around;">
                <el-input
                :placeholder="$store.state.username"
                v-model="username">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-input
                :placeholder="$store.state.password"
                v-model="password">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <el-button style="width:100%;" type="primary" @click="loginsuccess">立即登陆</el-button>
       </div>
    </div>
</template>
<script>
import { PathConfig } from "@/router/config";
export default {
  name: "login",
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../../static/bg.png") + ")"
      },
      paths:PathConfig,
      Datenow: "",
      Timenow: "",
      Weeknow: "",
      username: "",
      password: ""
    };
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      if(new Date(timeStamp).getDay()==1){
          this.Weeknow = '星期一'
      }else if(new Date(timeStamp).getDay()==2){
          this.Weeknow = '星期二'
      }else if(new Date(timeStamp).getDay()==3){
          this.Weeknow = '星期三'
      }else if(new Date(timeStamp).getDay()==4){
          this.Weeknow = '星期四'
      }else if(new Date(timeStamp).getDay()==5){
          this.Weeknow = '星期五'
      }else if(new Date(timeStamp).getDay()==6){
          this.Weeknow = '星期六'
      }else{
          this.Weeknow = '星期日'
      }
      this.Timenow = hh + ":" + mm
      this.Datenow = year + "-" + month + "-" + date
    },
    nowTimes() {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 30 * 1000)
    },
    loginsuccess() {
       let routePath = this.paths[1]; 
      this.$router.push(routePath);
    }
  },
  created() {
    this.nowTimes();
    // this.$store.dispatch("getdata")
  },
  mounted() {
    this.nowTimes();
  }
};
</script>
<style>
.container {
  height: 100%;
  width: 100%;
  background: no-repeat no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login {
  width: 15%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>