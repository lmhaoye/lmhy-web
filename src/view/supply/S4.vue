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
        <el-form-item label="贷款订单">
          <el-select v-model="form.reNo" placeholder="请选择要贷款的订单" @change="selectSplic">
            <el-option v-for="item in oopt" :key="item.value" :label="item.label" :value="item.value" :disabled="!item.state"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额">
            <el-input v-model="form.fee" readonly></el-input>
        </el-form-item>
        <el-form-item label="下单企业">
          <el-input v-model="form.from" readonly></el-input>
        </el-form-item>
        <el-form-item label="金融机构">
            <el-select v-model="form.to" placeholder="请选择金融机构">
                <el-option v-for="item in mopt" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
  name: "s4",
  mounted() {
    this.$emit("nextStep", 3);
    let order = this.$store.state.order;
    if (!order) {
      this.$router.push({ name: "s1" });
      return;
    }
    let adr = order.address;
    this.form.adr = adr;
    this.$http.get(`/api/s/order/splic?id=${adr}`).then(res => {
      let da = res.data.data;
      this.$store.commit("resetSplic", da);
      da.forEach(ele => {
        this.oopt.push({
          value: ele.no,
          label: ele.no,
          state: true
        });
      });
      this.so = da;
    });

    this.$store.state.user.m.forEach(element => {
      this.mopt.push({
        value: element.address,
        label: element.name
      });
    });
  },
  data() {
    return {
      fullscreenLoading:false,
      so: [],
      oopt: [],
      mopt: [],
      form: {
        adr: ""
      }
    };
  },
  methods: {
    preStep() {
      this.$router.push({ name: "s3" });
    },
    nextStep() {
      this.$router.push({ name: "s5" });
    },
    onSubmit() {
      let param = this.form,
        adr = param.adr;
        this.fullscreenLoading = true;
      this.$http.post("/api/s/order/load", param).then(res => {
        this.reset();
        let i =0;
        this.oopt.forEach(ele=>{
          if(ele.no == param.reNo){
            this.oopt[i].state = false;
            return false;
          }
          i++;
        })
        this.$http.get(`/api/s/order/load?id=${adr}`).then(res => {
          let da = res.data.data;
          console.log(da);
          this.$store.commit("resetLoad", da);
          this.fullscreenLoading = false;
        });
      });
    },
    selectSplic() {
      let no = this.form.reNo,
        order = null;
      this.so.forEach(ele => {
        if (ele.no == no) {
          order = ele;
          return false;
        }
      });
      this.form.fee = order.fee;
      this.form.from = order.ow;
    },
    reset() {
      this.form.fee = 0;
      this.form.from = "";
      this.form.reNo = "";
      this.form.to = "";
    }
  }
};
</script>
