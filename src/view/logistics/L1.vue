<template>
  <el-row>
      <el-form :inline="true" :model="form" :rules="rules" ref="form" class="demo-form-inline">
        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请填写名称"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="类型">
                <el-option label="贸易公司" value="0"></el-option>
                <el-option label="物流公司" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
        </el-form>
        <el-row>
          <el-table
          v-loading="loading"
            :data="users"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              label="类型"
              width="180">
              <template slot-scope="scope">
                   <div class="name-wrapper" v-if="scope.row.type==0">
                      <el-tag size="medium">贸易公司</el-tag>
                    </div>
                    <div class="name-wrapper" v-if="scope.row.type==1">
                      <el-tag size="medium">物流企业</el-tag>
                    </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="adr"
              label="地址">
            </el-table-column>
          </el-table>
        </el-row>
  </el-row>
</template>

<script>
export default {
  props: ["users"],
  data() {
    return {
      // users: this.$store.state.user.all,
      form: {
        name: "",
        type: ""
      },
      loading: true,
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择企业类型", trigger: "change" }]
      }
    };
  },
  created() {
    console.log(this.users);
    this.loading = false;
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if(!valid){
          return;
        }
        let param = {
          name: this.form.name,
          type: this.form.type
        };
        let loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$http.post("/api/l/user", param).then(res => {
          param.adr = res.data.data;
          this.$store.commit("addUser", param);
          this.users.push(param);
          loading.close();
          this.$refs['form'].resetFields();
        });
      });
    }
  }
};
</script>

