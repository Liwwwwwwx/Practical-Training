<template>
  <base-page index="6">
    <template slot="content">
      <el-col :span="24" class="toolbar pageBar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout=" prev, pager, next, sizes, total"
          :total="total"
        ></el-pagination>
      </el-col>
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
      currentPage1: 1,
      total: 0,
      page: 1,
      pageSize: 10,
      pageNum: 1
    };
  },
  methods: {
    //获取列表数据
    getUser: function() {
      let para = { pageNum: this.pageNum, pageSize: this.pageSize };
      this.loading = true;
      getList(para).then(res => {
        if (res.data.success) {
          this.total = res.data.data.total;
          this.currentPage1 = res.data.pageNum;
          this.users = res.dataList;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({ message: res.data.returnMsg, type: "error" });
        }
      });
    },
    //改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUser();
    },
    //条目改变时
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUser();
    }
  }
};
</script>