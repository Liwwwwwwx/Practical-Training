<template>
    <base-page index='1'>
        <template slot="content"  style="overflow:-Scroll;overflow-y:hidden">
            <div class="box">
                <el-card 
                 :style={background:item.backcolor}
                 class="box-card"
                 v-for="item in homedata" :key="item.index" :index="item.index">
                    <div class="card-content">
                        <p style="font-size:52px; color:#ffffff;">{{item.count}}</p>
                        <p style="font-weight: bold;">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <div class="box-charts">
                <div id="activeusers"></div>
                <div id="usernumbers"></div>
                <div id="notecounts"></div>
                <div id="filecounts"></div>
                <div id="opinioncounts"></div>
                <div id="systemcounts"></div>
            </div>
        </template>
    </base-page>
</template>
<script>
import BasePage from "@/components/BasePage";
import {
  drawActiveUsers,
  drawUserNumber,
  drawNoteCounts,
  drawFileCounts,
  drawOpinionCounts,
  drawSystemCounts
} from "@/utils/drawcharts";
import { homedata } from "./data";
export default {
  name: "home",
  components: {
    "base-page": BasePage
  },
  data() {
    return {
      drawActiveUsers,
      drawUserNumber,
      drawNoteCounts,
      drawFileCounts,
      drawOpinionCounts,
      drawSystemCounts,
      homedata
    };
  },
  mounted() {
    this.drawActiveUsers();
    this.drawUserNumber();
    this.drawNoteCounts();
    this.drawFileCounts();
    this.drawOpinionCounts();
    this.drawSystemCounts()
  },
  methods: {}
};
</script>
<style>
.box {
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 2rem;
}
.box-card {
  width: 22%;
  height: 10rem;
  display: flex;
  justify-content: center;
}
.card-content {
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.box-charts {
  width: 99%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 2rem;
}
.box-charts>div {
  width: 45%;
  height: 20rem;
}
</style>