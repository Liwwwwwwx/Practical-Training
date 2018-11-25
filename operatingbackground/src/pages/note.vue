<template>
    <base-page index='3'>
        <template slot="content">
            <div>
               <el-table
                    :data="notedata"
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
                          <el-form-item label="用户 ID">
                              <span>{{ props.row.id }}</span>
                          </el-form-item>
                          <el-form-item label="文章 ID">
                              <span>{{ props.row.noteid }}</span>
                          </el-form-item>
                          <el-form-item label="文章 ID">
                              <span>{{ props.row.noteid }}</span>
                          </el-form-item>
                          <el-form-item label="发表时间">
                              <span>{{ props.row.notetime }}</span>
                          </el-form-item>
                          <el-form-item label="类别">
                              <span>{{ props.row.category }}</span>
                          </el-form-item>
                          <el-form-item label="内容">
                              <span>{{ props.row.contentdetails }}</span>
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
                    label="发表时间"
                    prop="notetime">
                    </el-table-column>
                    <el-table-column
                    label="类别"
                    prop="category">
                    </el-table-column>
                    <el-table-column
                    label="内容"
                    prop="content">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="deleteRow(scope.$index, notedata)">删除</el-button>
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
  name: "note",

  components: {
    "base-page": BasePage
  },

  data() {
    return {
      notedata: [
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
        },
        {
          id: "12987122",
          name: "Alua",
          noteid: "123",
          notetime: "11-08-1997",
          category: "文字",
          content: "悲剧是上天给了你抱负，……",
          contentdetails:
            "悲剧是上天给了你抱负，给了你理想，给了你实现理想的才华，却一生不给你施展完成的机会，生生折断你的理想。即使是悲剧又岂能尽归罪于“天意”？人难道就可以两手一拍，声称自己全无责任？"
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
        return "active";
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
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
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

<style>
.el-table .active {
  background-color: antiquewhite;
}
.el-table .cell {
  text-align: center;
}
</style>