<template>
  <el-row>
      <el-col :span="6">
        <el-button type="warning"  @click="preStep" v-show="active>0">上一步</el-button>
        <el-button type="info" @click="nextStep">下一步</el-button>
      <hr/>
        <el-steps :active="active" direction="vertical">
          <el-step title="步骤 1" description="创建角色(贸易双方/物流公司)"></el-step>
          <el-step title="步骤 2" description="签署贸易合同/物流合同"></el-step>
          <el-step title="步骤 3" description="生成运单&派车单"></el-step>
          <el-step title="步骤 4" description="运输回单处理"></el-step>
          <el-step title="步骤 5" description="运输详情查看"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="18">
        <el-alert
          :title="title"
          type="info"
          v-show="order"
          :closable="false"
          >
        </el-alert>
        <router-view @changeData="changeData" :users="users"/>
      </el-col>
  </el-row>
</template>

<script>
import LoStore from "@/store/lo";
export default {
  name: "Logistics",
  store: LoStore,
  data() {
    return {
      users:[],
      order:null,
      title:'',
      active: 0
    };
  },
  mounted(){
    this.$http.get('/api/l/user').then(resp=>{
      let users = resp.data.data;
      this.users = users;
      this.$store.commit('resetUser',users);
    })
  },
  methods: {
    preStep() {
      this.active -= 1;
      this.$router.push({ name: `l${this.active+1}` });
    },
    nextStep() {
      this.active += 1;
      this.$router.push({ name: `l${this.active+1}` });
    },
    changeData(da){
      this.order = da;
      this.title = `贸易合同链上地址:${da.address} 合同编号:${da.myCode} 物流编号:${da.wlCode}`;
    }
  }
};
</script>

