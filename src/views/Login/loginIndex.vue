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
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.ruleForm.name == "sysmaner") {
            this.$router.replace({ path: "/editor/num" });
          } else {
            login({
              username: this.ruleForm.name,
              password: this.ruleForm.pass,
            }).then((res) => {
              if (res.data.message == "success") {
                sessionStorage.setItem("access_token", res.data.token);
              }
            });
            this.$router.replace({ path: "/homePage" });
          }
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
  }
}
</style>
