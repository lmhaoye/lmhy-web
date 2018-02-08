<template>
  <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="code"
          label="派车单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="carNo"
          label="车牌号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="运输量"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
              <el-tag  v-if="scope.row.state==1">已回单</el-tag>
            <el-button type="primary" @click="confirmRc(scope.row)"  v-if="scope.row.state==0">确认回单</el-button>
          </template>
        </el-table-column>
      </el-table>
  </el-row>
</template>

<script>
export default {
  mounted() {
    this.refreshTable();
  },
  data() {
    return {
      tableData: [],
      form: {},
      loading:null
    };
  },
  methods: {
    refreshTable(check = false) {
      let adr = this.$store.state.order.address;
      this.$http.get(`/api/l/order/ts?adr=${adr}`).then(res => {
        let rs = res.data.data;
        this.tableData = rs;
        if(this.loading){
          this.loading.close();
        }
        if (check) {
          this.$nextTick(() => {
            let rs = true;
            this.tableData.forEach(ele => {
              if (ele.state == 0) {
                rs = false;
                return false;
              }
            });
            if (rs) {
              this.$message({
                message: "已全部回单，系统已自动结算付款",
                center: true
              });
              setTimeout(()=>{
                this.$router.push({name:'l5'})
              },2000)
            }
          });
        }
      });
    },
    confirmRc(row) {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let adr = this.$store.state.order.address;
      this.$http
        .post("/api/l/order/rc", {
          adr,
          reNo: row.code
        })
        .then(res => {
          this.refreshTable(true);
          
        });
    }
  }
};
</script>

