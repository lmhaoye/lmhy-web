<template>
  <el-row>
      <el-form ref="form" :model="form" label-width="100px">
        <template v-if="ydCode==''">
        <el-form-item>
          <el-button type="primary" @click="toYd">1-生成运单</el-button>
        </el-form-item>
        </template>
        <template v-else>
        <el-form-item label="运输量" prop="weight" :rules="[
          { required: true, message: '运输量不能为空'},
          { type: 'number', message: '运输量必须为数字值'}
        ]">
          <el-input-number v-model="form.weight" :min="1" :max="max" label="运输量"></el-input-number>
        </el-form-item>
        <el-form-item label="车牌号" prop="carNo" :rules="[
        { required: true, message: '车牌号不能为空'},
        ]">
          <el-input v-model="form.carNo"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="toTs">2-生成派车单</el-button>
        </el-form-item>
        </template>
      </el-form>
  </el-row>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.order);
    let order = this.$store.state.order;
    let haveWeight = this.$store.state.weight;
    this.max = order.weight * 1 - haveWeight * 1;
    this.adr = order.address;
    if (order.ydCode) {
      this.ydCode = order.ydCode;
    }
  },
  data() {
    return {
      adr: null,
      ydCode: "",
      max: 1,
      form: {
        weight: 1
      },
      loading: null
    };
  },
  methods: {
    toYd() {
      let adr = this.adr;
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$http
        .post("/api/l/order/yd", {
          adr
        })
        .then(res => {
          let rs = res.data;
          this.loading.close();
          if (rs.success) {
            let ydCode = rs.data;
            this.$notify({
              title: "成功",
              message: `生成运单，编号${ydCode}`,
              type: "success"
            });
            this.$store.commit("addYd", ydCode);
            this.ydCode = ydCode;
          } else {
            this.$notify.error({
              title: "错误",
              message: "已经生成过运单了"
            });
          }
        });
    },
    toTs() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        }
        let param = this.form;
        param.adr = this.adr;
        this.loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http.post("/api/l/order/ts", param).then(res => {
          this.loading.close();
          this.$notify({
            title: "成功",
            message: "生成派车单成功",
            type: "success"
          });
        });
      });
    }
  }
};
</script>

