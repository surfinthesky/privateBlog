<template>
  <div class="loginBox">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="150px"
      :rules="rules"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/api/user";
import { mapMutations } from "vuex";
import * as secret from "@/utils/crypto";
// import {loading} from "@/utils/utils"
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        setTimeout(() => {
          if (!this.$refs.ruleForm) {
            return;
          }
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("name");
          }
        }, 10);
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        //Vue用elementui表单校验报错: Error in v-on handlerError in v-on handler: "RangeError: Maximum call stack size exceeded"
        setTimeout(() => {
          if (!this.$refs.ruleForm) {
            return;
          }
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("pass");
          }
        }, 10);
        callback();
      }
    };
    return {
      ruleForm: {
        name: "admin123",
        pass: "admin123",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    ...mapMutations({ setActiveName: "SET_activeName" }),
    ...mapMutations(["SET_userInfo"]),
    // ...mapMutations({ setPath: "editor/SET_activePath" }),
    //注意此处的setPath是我们在页面调用的方法名哦，调用这个即是调用模块的方法
    //第二种写法 '模块名',['调用方法名称']
    ...mapMutations("editor", ["SET_activePath"]),
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          login({
            username: this.ruleForm.name,
            password: secret.encrypt(this.ruleForm.pass),
          }).then((res) => {
            if (res.data.message == "success") {
              this.$message({
                type: "success",
                message: "登录成功",
              });
              this.SET_userInfo(res.data);
              sessionStorage.setItem("access_token", res.data.token);
              sessionStorage.setItem("refreshToken", res.data.refreshToken);
              sessionStorage.setItem("loginName", res.data.result[0].username);
              // this.setActiveName("/homepage")
              if (this.ruleForm.name == "sysmaner") {
                this.SET_activePath("/editor/num");
                this.$router.replace({ path: "/editor/num" });
              } else if (this.$route.query.redirect) {
                this.$router.replace({
                  path: this.$route.query.redirect,
                });
              } else {
                this.$router.replace({ path: "/homepage" });
              }
            } else {
              this.$message({
                type: "warning",
                message: res.data.message,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.loginBox {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    min-width: 500px;
    ::v-deep .el-form-item__label {
      color: #fff;
    }
  }
}
</style>
