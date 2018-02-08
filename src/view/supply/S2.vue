<template>
  <el-row type="flex" class="row-bg">
        <el-col :span="6">
            <el-button type="warning"  @click="preStep">上一步</el-button>
            <el-button type="info" @click="nextStep">下一步</el-button>
        </el-col>
        <el-col :span="18">
             <el-alert
                v-if="order && order.address"
                :title="orderText"
                type="info">
            </el-alert>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="金额">
                    <el-input v-model="form.fee"></el-input>
                </el-form-item>
                <el-form-item label="核心企业">
                    <el-select v-model="form.from" placeholder="请选择核心企业">
                        <el-option v-for="item in copt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上游企业">
                    <el-select v-model="form.to" placeholder="请选择上游企业">
                        <el-option v-for="item in sopt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">创建订单</el-button>
                </el-form-item>
            </el-form>
        </el-col>
  </el-row>
</template>

<script>
export default {
  name: "s2",
  mounted() {
    this.$emit("nextStep", 1);
    let core = this.$store.state.user.c;
    console.log(core);
    let arr = [];
    core.forEach(element => {
      arr.push({
        value: element.address,
        label: element.name
      });
    });
    this.copt = arr;
    arr = [];
    let sup = this.$store.state.user.s;
    sup.forEach(element => {
      arr.push({
        value: element.address,
        label: element.name
      });
    });
    this.sopt = arr;

    this.order = this.$store.state.order;
  },
  data() {
    return {
      fullscreenLoading:false,
      order: null,
      orderText:'',
      sopt: [],
      copt: [],
      form: {
        fee: 0,
        from: "",
        to: ""
      }
    };
  },
  methods: {
    preStep() {
      this.$router.push({ name: "s1" });
    },
    nextStep() {
      this.$router.push({ name: "s3" });
    },
    onSubmit() {
      let param = this.form;
      this.fullscreenLoading = true;
      this.$http.post("/api/s/order", param).then(res => {
        
        let da = res.data.data;
        let order = {
          ...param,
          address: da.address,
          code: da.code
        };
        this.order = order;
        this.orderText = `订单地址:${order.address}`
        this.$store.commit("rOrder", order);
        this.fullscreenLoading = false;
      });
    }
  }
};
</script>
