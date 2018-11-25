<template>
    <base-page index='2'>
        <template slot="content">
            <div>
                <el-table
                    :data="userdata"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    :header-cell-style="tableHeaderColors"
                     @selection-change="handleSelectionChange">
                     <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名">
                            <span>{{ props.row.username }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ props.row.sex }}</span>
                        </el-form-item>
                        <el-form-item label="用户 ID">
                            <span>{{ props.row.userid }}</span>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <span>{{ props.row.tel }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span>{{ props.row.email }}</span>
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
                    
                    <el-table-column
                    label="用户名"
                    prop="username"
                    >
                    </el-table-column>
                    <el-table-column
                    label="性别"
                    prop="sex">
                    </el-table-column>
                    <el-table-column
                    label="手机号"
                    prop="tel">
                    </el-table-column>
                    <el-table-column
                    label="生日"
                    prop="birth">
                    </el-table-column>
                    <el-table-column
                    label="邮箱"
                    prop="email">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="deleteRow(scope.$index, userdata)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                background
                layout="prev, pager, next"
                :total="100">
                </el-pagination>
            </div>
        </template>
    </base-page>
</template>
<script>
import BasePage from "@/components/BasePage";
export default {
  name: "user",

  components: {
    "base-page": BasePage
  },

  data() {
    return {
      userdata:this.$store.state.data,
      multipleSelection: [],
    };
  },
  created(){
       this.$store.dispatch("getdata")
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    // deleterow() {
    //   this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }

    deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          // this.$store.dispatch('deletedata')
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
    }
  },
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
.el-pagination{
    padding-top: 1rem;
}
</style>