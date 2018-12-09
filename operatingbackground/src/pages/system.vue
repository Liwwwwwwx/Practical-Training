<template>
    <base-page index='5'>
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
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ props.row.sex }}</span>
                        </el-form-item>
                        <el-form-item label="用户 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <span>{{ props.row.tel }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="粉丝人数">
                            <span>{{ props.row.fanscounts }}</span>
                        </el-form-item>
                        <el-form-item label="关注人数">
                            <span>{{ props.row.followcounts }}</span>
                        </el-form-item>
                        <el-form-item label="文集数量">
                            <span>{{ props.row.notecount }}</span>
                        </el-form-item>
                        </el-form>
                    </template>
                    </el-table-column>
                    
                    <el-table-column
                    label="用户名"
                    prop="name"
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
  name: "opinion",

  components: {
    "base-page": BasePage
  },

  data() {
    return {
      userdata: [
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        },
        {
          id: "12987122",
          name: "李文轩",
          sex: "男",
          tel: "152-3278-0628",
          birth: "11-08-1997",
          email: "1076843408@qq.com",
          fanscounts: "25",
          followcounts: "36",
          notecount: "103"
        }
      ]
    };
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
    deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
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
  }
};
</script>