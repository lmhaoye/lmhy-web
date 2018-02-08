<template>
  <el-row>
    <el-row>
      <el-steps :active=stepActive>
        <el-step title="步骤 1" description="创建角色（核心企业/上游/金融机构）"></el-step>
        <el-step title="步骤 2" description="创建采购订单"></el-step>
        <el-step title="步骤 3" description="S1上游向S2上游采购"></el-step>
        <el-step title="步骤 4" description="S2上游利用信用传递向金融机构贷款"></el-step>
        <el-step title="步骤 5" description="当核心企业对应付债权完成清算，所有还款自动完成"></el-step>
      </el-steps>
    </el-row>
    <el-row>
      <hr/>
      <router-view @nextStep="nextStep"/>
    </el-row>
  </el-row>
</template>

<script>
import SupplyStore from "@/store/su";
export default {
  name: "Supply",
  store: SupplyStore,
  data() {
    return {
      stepActive: 0
    };
  },
  mounted() {
    this.$http.get("/api/s/user").then(res => {
      let userArr = res.data.data;
      userArr.forEach(ele => {
        // let user = {
        //   id: ele[0],
        //   address: ele[1],
        //   name: ele[3],
        //   cate: ele[2]
        // };
        this.$store.commit("addUser", ele);
      });
    });
  },
  methods: {
    nextStep(step) {
      this.stepActive = step;
    }
  }
};
</script>
