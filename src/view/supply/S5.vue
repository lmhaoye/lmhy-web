<template>
<el-row type="flex" class="row-bg">
    <el-col :span="6">
      <el-button type="warning"  @click="preStep">上一步</el-button>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{order.code}}还款记录</span>
            <el-button style="float: right; padding: 3px 0" type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">自动还款</el-button>
            <el-button style="float: right; padding: 3px 0" type="warning" @click="onDetail">订单详情</el-button>
          </div>
          <div v-for="o in replayList" :key="o.address" class="text item">
            {{o.reNo}} 已完成自动还款
          </div>
        </el-card>
      </el-row>
    </el-col>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单{{order.code}}</span>
        </div>
        <div class="text item">
          <p>订单金额：￥{{order.fee}}</p>
          <p>采购方：{{order.from}}</p>
          <p>采购对象：{{order.to}}</p>
          <p>订单链地址：{{order.address}}</p>
        </div>
        <el-collapse>
          <el-collapse-item title="采购单列表" name="1">
            <div v-for="ele in splic" :key="ele.no">采购单编号<el-tag size="mini">{{ele.no}}</el-tag>
            <p>在{{ele.time}}由{{ele.from}}向{{ele.ow}}采购，应收款项：<el-tag type="danger" size="mini">￥{{ele.fee}}</el-tag></p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="贷款单列表" name="2">
            <div v-for="ele in load" :key="ele.no">贷款单编号<el-tag size="mini">{{ele.no}}</el-tag> 
            <p>在{{ele.time}}由{{ele.from}}向{{ele.to}}贷款<el-tag type="danger" size="mini">￥{{ele.fee}}</el-tag></p>

            </div>
          </el-collapse-item>
          <el-collapse-item title="还款单列表" name="3">
            <div v-for="ele in repay" :key="ele.no">还款单编号<el-tag size="mini">{{ele.no}}</el-tag> 
            <p>在{{ele.time}}由{{ele.from}}向{{ele.to}}还款<el-tag type="danger" size="mini">￥{{ele.fee}}</el-tag></p>

            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: "s5",
  mounted() {
    this.$emit("nextStep", 4);
    let order = this.$store.state.order;
    if (!order) {
      this.$router.push({ name: "s1" });
      return;
    }
    console.log(order);

    this.form.adr = order.address;
    this.order = order;
  },
  data() {
    return {
      fullscreenLoading:false,
      dialogVisible: false,
      order: {},
      form: {
        adr: ""
      },
      replayList: [],
      splic:[],
      load:[],
      repay:[]
    };
  },
  methods: {
    preStep() {
      this.$router.push({ name: "s4" });
    },
    onSubmit() {
      let adr = this.form.adr;
      this.fullscreenLoading = true;
      this.$http.get(`/api/s/order/load?id=${adr}`).then(res => {
        let da = res.data.data;
        da.forEach(ele => {
          let param = {
            adr,
            reNo: ele.no,
            from: ele.from,
            to: ele.to,
            fee: ele.fee
          };
          this.runReplay(param);
          this.fullscreenLoading = false;
        });
      });
    },
    runReplay(param) {
      this.fullscreenLoading = true;
      this.$http.post("/api/s/order/repay", param).then(res => {
        this.replayList.push(param);
        this.fullscreenLoading = false;
        console.log(res);
      });
    },
    onDetail() {
      this.dialogVisible = true;
      let adr = this.order.address;
      this.$http.get(`/api/s/order/splic?id=${adr}`).then(res=>{
        this.splic = res.data.data;
      })
      this.$http.get(`/api/s/order/load?id=${adr}`).then(res=>{
        this.load = res.data.data;
      })
      this.$http.get(`/api/s/order/repay?id=${adr}`).then(res=>{
        this.repay = res.data.data;
      })
    }
  }
};
</script>
