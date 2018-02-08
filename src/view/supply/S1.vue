<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="6"><el-button type="info" @click="nextStep">下一步</el-button></el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
            <el-input v-model="form.name" placeholder="请填写名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="类型">
                <el-option label="核心企业" value="0"></el-option>
                <el-option label="上游企业" value="1"></el-option>
                <el-option label="金融机构" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">创建</el-button>
            
        </el-form-item>
        </el-form>
        <el-row>
          <el-table
            :data="tableData"
            style="width: 100%">
             <el-table-column
              prop="id"
              label="id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              label="类型"
              width="180">
              <template slot-scope="scope">
                   <div class="name-wrapper" v-if="scope.row.cate==0">
                      <el-tag size="medium">核心企业</el-tag>
                    </div>
                    <div class="name-wrapper" v-if="scope.row.cate==1">
                      <el-tag size="medium">上游企业</el-tag>
                    </div>
                    <div class="name-wrapper" v-if="scope.row.cate==2">
                      <el-tag size="medium">金融机构</el-tag>
                    </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-row>
        </el-col>
  </el-row>
</template>

<script>
export default {
  name: "s1",
  data() {
    return {
      form: {
        name: "",
        type: ""
      },
      tableData: this.$store.state.user.all,
      fullscreenLoading: false
    };
  },
  mounted() {
    this.$emit("nextStep", 0);
  },
  methods: {
    onSubmit() {
      let da = this.form;
      if (da.name == "" || da.type == "") {
        this.$notify({
          title: "警告",
          message: "请填写相关内容",
          type: "warning"
        });
        return;
      }
      this.fullscreenLoading = true;
      let param = {
        name: da.name,
        type: da.type
      };
      this.$http.post("/api/s/user", param).then(resp => {
        // let user = {
        //   name: da.name,
        //   cate: da.type,
        //   address: "111"
        // };
        // this.$store.commit("addUser", user);
        let id = resp.data.data;
        this.$http.get(`/api/s/user?id=${id}`).then(res => {
          let user = res.data.data;
          
          this.$store.commit("addUser", user);
          this.fullscreenLoading = false;
        });
      });
    },
    nextStep() {
      this.$router.push({ name: "s2" });
    }
  }
};
</script>
