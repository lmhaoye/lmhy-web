<template>
<el-container>
  <el-header>
    <el-menu
    default-active="root"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    @select="handSelect"
    active-text-color="#ffd04b">
        <el-menu-item index="root">区块链演示</el-menu-item>
        <el-menu-item index="2"><router-link :to="{name:'s1'}">供应链金融Demo</router-link></el-menu-item>
        <el-menu-item index="3"><router-link :to="{name:'l1'}">物流Demo</router-link></el-menu-item>
    </el-menu>
  </el-header>
    <el-main>
        <router-view/>
    </el-main>
</el-container>


</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    handSelect(index) {
      if (!isNaN(index)) return;
      this.$router.push({
        name: index
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

