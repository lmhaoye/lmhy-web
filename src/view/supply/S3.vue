<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="6">
      <el-button type="warning"  @click="preStep">上一步</el-button>
      <el-button type="info" @click="nextStep">下一步</el-button>
    </el-col>
    <el-col :span="18">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="订单链hash">
            <el-input v-model="form.adr" readonly></el-input>
        </el-form-item>
        <el-form-item label="采购订单">
          <el-select v-model="form.code" placeholder="请选择拆分订单" @change="selectOrder">
            <el-option v-for="item in oopt" :key="item.value" :label="item.label" :value="item.value" :disabled="!item.state"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额">
            <el-input v-model="form.fee" readonly></el-input>
        </el-form-item>
        <el-form-item label="下单企业">
          <el-input v-model="form.from" readonly></el-input>
        </el-form-item>
        <el-form-item label="上游企业">
            <el-select v-model="form.to" placeholder="请选择上游企业">
                <el-option v-for="item in sopt" :key="item.value" :label="item.label" :value="item.value" :disabled="form.from && item.value==form.from"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">下单</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "s3",
  mounted() {
    this.$emit("nextStep", 2);
    let state = this.$store.state;
    let order = state.order;

    if (!order) {
      this.$router.push({ name: "s1" });
      return;
    }
    this.od = order;
    this.form.adr = order.address;
    let arr = [];
    arr.push({
      value: order.code,
      label: "【主单】" + order.code,
      state: true
    });
    this.oopt = arr;
    this.allOrder.push(order);

    arr = [];
    let sup = this.$store.state.user.s;
    sup.forEach(element => {
      arr.push({
        value: element.address,
        label: element.name
      });
    });
    this.sopt = arr;
  },
  data() {
    return {
      fullscreenLoading:false,
      allOrder: [],
      od: {},
      oopt: [],
      sopt: [],
      form: {
        fee: 0
      }
    };
  },
  methods: {
    preStep() {
      this.$router.push({ name: "s2" });
    },
    nextStep() {
      this.$router.push({ name: "s4" });
    },
    selectOrder() {
      let code = this.form.code;
      let obj = null;
      this.allOrder.forEach(ele => {
        if (ele.code == code) {
          obj = ele;
          return false;
        }
      });
      this.form.fee = obj.fee;
      this.form.from = obj.to;
    },
    onSubmit() {
      console.log(this.form);
      let sOrder = this.form;
      this.fullscreenLoading = true;
      this.$http.post("/api/s/order/splic", sOrder).then(res => {
        let da = res.data.data;
        sOrder.no = da;
        sOrder.code = da;
        this.allOrder.push(sOrder);
        this.oopt[0].state = false;
        this.oopt.push({
          value: sOrder.no,
          label: "【子单】" + sOrder.no,
          state: true
        });
        this.$store.commit("runSplic", sOrder);
        this.reset();
        this.fullscreenLoading = false;
      });
    },
    reset() {
      this.form = {
        adr: this.form.adr,
        fee:0,
        code:'',
        from:'',
        to:''
      };
    }
  }
};
</script>
