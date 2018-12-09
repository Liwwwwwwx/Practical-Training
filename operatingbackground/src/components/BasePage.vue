<template>
    <el-container id="base-container">
        <div style="height:100%;width:100%">
            <el-header :height="HeaderHeight">
                <el-row>
                    <el-col :span="4" style="background-color:#F8F8F8;">
                        <h4 style="text-align:center;height:5rem;">
                            <p>{{$store.state.projectname}}</p>
                        </h4>
                    </el-col>
                    <el-col :span="3" :offset="17">
                        <div style="display:flex; align-items:center;">
                            <img :src="$store.state.logosrc" id="base-temp" alt="">
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-row>
                <!-- menu start -->
                <el-col :span="$store.state.menuWidth" id="base-menu">
                    <div id="base-user" :style="{height:uesrHeight}">
                        <div  id="menu-user">
                        <img :src="$store.state.adminsrc" alt="" style="width:5rem;height:5rem;">
                        </div>
                        <div style="color:#ffffff;">
                            <p>{{$store.state.username}}</p>
                            <p>{{$store.state.userposition}}</p>
                        </div>
                    </div>
                    <div :style={height:MenuHeight}>
                        <el-scrollbar class="menu-content__scroll">
                            <el-menu
                                :default-active="$store.state.activeMenuIndex"
                                :collapse="$store.state.menuCollapse"
                                class="el-menu-vertical-demo"
                                @select="handleselect"
                                background-color="#36404c"
                                text-color="#fff"
                                active-text-color="#ffd04b">
                                <el-menu-item  v-for="item in routers" :key="item.index" :index="item.index" >
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">{{item.name}}</span>
                                </el-menu-item>  
                            </el-menu>
                        </el-scrollbar>
                    </div>
                </el-col>
                <!-- menu end -->
                <!-- slot start -->
                <el-col :span="$store.state.pageWidth">
                    <div :style={height:ContentHeight} style="background-color:#F8F8F8;">
                        <el-scrollbar class="menu-content__scroll">
                            <slot name="content" >
                                
                            </slot>
                        </el-scrollbar>
                    </div>
                </el-col>
                <!-- slot end -->
            </el-row>


        </div>
    </el-container>
</template>
<script>
import { RouteConfig, PathConfig } from "@/router/config";
export default {
  name: "BasePage",
  props: ["index"],
  data() {
    return {
      routers: RouteConfig,
      paths: PathConfig,
      HeaderHeight: "5rem",
      uesrHeight: "9rem"
    };
  },
  created() {
    this.$store.commit("pageChange", this.index == null ? "0" : this.index);
    if (this.index == null) {
      this.$router.push(this.paths["1"]);
    }
    window.addEventListener('resize', this.getHeight);
      this.getHeight();
  },
  destory() {
    window.removeEventListener('resize',this.getHeight);
  },
  computed: {
    MenuHeight() {
      return this.Height - 224 + "px";
    },
    ContentHeight() {
      return this.Height - parseInt(this.HeaderHeight) * 16 + "px";
    }
  },
  methods: {
    getHeight() {
      this.Height = window.innerHeight;
    },
    handleselect(index, path) {
      let routePath = this.paths[index];
      this.$router.push(routePath);
      console.log(index);
    }
  }
};
</script>
<style >
.el-header {
  line-height: 5rem;
  padding: 0;
}
#base-temp {
  height: 5rem;
  width: 5rem;
  display: inline-block;
}
#base-menu {
  height: 100%;
  background-color: #36404c;
}
#base-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
#menu-user {
  width: 6rem;
  height: 6rem;
  background-color: #ffffff;
  border-radius: 50%;
}
.el-row {
  height: 100%;
}
#base-container {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}
.el-menu {
  border-right: none;
  text-align: left;
}
.el-menu--collapse {
  width: 100%;
}
.menu-content__scroll {
  height: 100%;
}
.menu-content__scroll .el-scrollbar__wrap {
  overflow: auto;
}
</style>