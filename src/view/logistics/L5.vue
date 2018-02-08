<template>
  <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>贸易合同：{{order.myCode}}</span>
          <el-tag style="float: right; padding: 3px 0">{{order.address}}</el-tag>
        </div>
        <div class="text">
        发货方:{{order.from}}
        </div>
        <div class="text">
        接收方:{{order.to}}
        </div>
        <div class="text">
        承运方:{{order.go}}
        </div>
        <div class="text">
        贸易金额:{{order.fee}}￥
        </div>
        <div class="text">
        贸易商品:{{order.goods}}
        </div>
        <div class="text">
        运输总量（吨）:{{order.weight}}
        </div>
        <el-collapse  v-model="active">
          <el-collapse-item title="承运信息" name="1">
            <div>
              物流合同：{{order.wlCode}}
            </div>
            <div>
              运单编号：{{order.ydCode}}
            </div>
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="code"
              label="派车单编号">
            </el-table-column>
            <el-table-column
              prop="carNo"
              label="车牌号">
            </el-table-column>
            <el-table-column
              prop="weight"
              label="运输量">
            </el-table-column>
            <el-table-column
              prop="rcCode"
              label="回单编号">
            </el-table-column>
            <el-table-column
              prop="rcTime"
              label="回单时间">
            </el-table-column>
          </el-table>
          </el-collapse-item>
        </el-collapse>
        
      </el-card>
  </el-row>
</template>

<script>
export default {
  mounted() {
    this.order = this.$store.state.order;
    this.$http.get(`/api/l/order/rc?adr=${this.order.address}`).then(res=>{
      let da = res.data.data;
      this.tableData = da;
    })
  },
  data() {
    return {
      order: {},
      tableData:[],
      active:['1']
    };
  }
};
</script>

