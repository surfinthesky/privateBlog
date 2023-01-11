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
  // import {loading} from "@/utils/utils"
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入账号"));
        } else {
          this.$nextTick(() => {
            if (this.ruleForm.checkPass !== "") {
              this.$refs.ruleForm.validateField("name");
            }
          });
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          this.$nextTick(() => {
            if (this.ruleForm.checkPass !== "") {
              this.$refs.ruleForm.validateField("pass");
            }
          });
          callback();
        }
      };
      return {
        ruleForm: {
          name: "admin",
          pass: "123",
        },
        rules: {
          name: [{ validator: validateName, trigger: "blur" }],
          pass: [{ validator: validatePass, trigger: "blur" }],
        },
      };
    },
    mounted() {
      // this.$router.push({ name: "homePage" });
    },
    methods: {
      submitForm(formName) {
        console.log(formName);
        console.log(this.$refs.ruleForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('???')
            this.$router.push({ path: "/homePage" });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  