<template>
  <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="贸易金额" prop="fee">
          <el-input v-model.number="form.fee"></el-input>
        </el-form-item>
        <el-form-item label="运输货物" prop="goods">
          <el-input v-model="form.goods"></el-input>
        </el-form-item>
        <el-form-item label="运输重量" prop="weight">
          <el-input v-model.number="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="甲方" prop="from">
          <el-select v-model="form.from" placeholder="请选择甲方">
            <el-option v-for="i in this.$store.state.opt.m" :key="i.value" :value="i.value" :label="i.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="乙方" prop="to">
          <el-select v-model="form.to" placeholder="请选择乙方">
            <el-option v-for="i in this.$store.state.opt.m" :key="i.value" :value="i.value" :label="i.label" :disabled="i.value==form.form"/>
          </el-select>
        </el-form-item>
        <el-form-item label="物流委托方" prop="go">
          <el-select v-model="form.go" placeholder="请选择物流公司">
            <el-option v-for="i in this.$store.state.opt.w" :key="i.value" :value="i.value" :label="i.label"/>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">创建贸易合同</el-button>
        </el-form-item>
      </el-form>
  </el-row>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.opt.m);
  },
  data() {
    return {
      form: {
        fee: 0,
        goods: "",
        weight: 0,
        from: "",
        to: "",
        go: ""
      },
      fullscreenLoading: false,
      rules: {
        fee: [
          { required: true, message: "请输入货物金额", trigger: "blur" },
          { type: "number", message: "金额必须为数字值" }
        ],
        goods: [{ required: true, message: "请输入货物名称", trigger: "blur" }],
        weight: [
          { required: true, message: "请输入货物重量", trigger: "blur" },
          { type: "number", message: "金额必须为数字值" }
        ],
        from: [{ required: true, message: "请选择企业", trigger: "change" }],
        to: [{ required: true, message: "请选择企业", trigger: "change" }],
        go: [{ required: true, message: "请选择企业", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        }
        let param = this.form;
        this.fullscreenLoading = true;
        this.$http.post("/api/l/order", param).then(res => {
          let obj = res.data.data;
          this.$store.state.order = obj;
          this.$emit("changeData", obj);
          this.fullscreenLoading = false;
        });
      });
    }
  }
};
</script>

