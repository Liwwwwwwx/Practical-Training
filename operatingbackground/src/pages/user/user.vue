<template>
  <base-page index="2">
    <template slot="content">
      <el-col :span="24" class="warp-breadcrum">
        <!--搜索栏-->
        <el-col :span="24" class="toolbar">
          <el-form :inline="true">
            <el-form-item>
              <!-- <el-button type="primary" @click="getUser">搜索</el-button> -->
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="primary" @click="getUser">添加</el-button> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
      <el-table
        id="out-table"
        :data="userdata"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :header-cell-style="tableHeaderColors"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="签名">
                <span>{{ props.row.autograph }}</span>
              </el-form-item>
              <el-form-item label="QQ">
                <span>{{ props.row.qq }}</span>
              </el-form-item>
              <el-form-item label="微信">
                <span>{{ props.row.wechat }}</span>
              </el-form-item>
              <el-form-item label="用户 ID">
                <span>{{ props.row.userid }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.phoneNumber }}</span>
              </el-form-item>
              <el-form-item label="注册日期">
                <span>{{ props.row.logindate }}</span>
              </el-form-item>
              <el-form-item label="粉丝人数">
                <span>{{ props.row.fanscount }}</span>
              </el-form-item>
              <el-form-item label="关注人数">
                <span>{{ props.row.followcount }}</span>
              </el-form-item>
              <el-form-item label="文集数量">
                <span>{{ props.row.notecount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="手机号" prop="phoneNumber"></el-table-column>
        <el-table-column label="生日" prop="birth"></el-table-column>
        <el-table-column label="注册日期" prop="logindate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, userdata,scope.row.userid)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="4"
          :page-size="7"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </template>
  </base-page>
</template>
<script>
import BasePage from "@/components/BasePage";
import { RouteConfig, PathConfig } from "@/router/config";
import request from "@/http/request.js";
import URL from "@/http/url.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "user",

  components: {
    "base-page": BasePage
  },

  data() {
    return {
      userdata: [],
      multipleSelection: [],
      routers: RouteConfig,
      paths: PathConfig,
      total: 0,
      pageNum: 1,
      listLoading: false
    };
  },
  beforeCreate() {
    if(this.$store.state.isLogin){
      return request({
      url: URL.userdata
    }).then(res => {
      localStorage.setItem("datas", JSON.stringify(res.data));
      const obj = JSON.parse(localStorage.getItem("datas"));
      this.userdata = JSON.parse(localStorage.getItem("datas"));
      console.log(this.userdata);
      return res;
    });
    }else {
      this.$router.push({path:'/'});
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    tableHeaderColors({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #00A0B0;color: #ffffff;font-weight: 600;text-align:center;";
      }
    },
    exportExcel() {
      /* generate workbook object from table */

      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */

      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "用户.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
      console.log(wbout);
    },
    deleteRow(index, rows, data) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          console.log(data);
          this.$store.dispatch("deletedata", data);
          // this.$store.dispatch("getdata")
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(val);
    }
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table .cell {
  text-align: center;
}
/* .el-pagination {
  position: absolute;
  bottom: 0.5rem;
  left: 20rem;
  width: 30rem;
} */
.el-pagination {
  padding-top: 2rem;
}
</style>