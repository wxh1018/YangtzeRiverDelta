<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
     
      <!-- 登录表单区域 -->
      <!--  ref="loginFormRef" 表单引用对象  :rules="loginFormRules" 为表单添加验证 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
      <h1 class="title">{{this.$store.state.title}}</h1>
        <!-- 用户名 -->
        <!-- prop="username" 添加用户名验证 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <!-- prop="password" 添加密码验证 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Lj from "../utils/login";
export default {
  data() {
    return {
      //登录表单的数据绑定
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          //required: true  代表必填项；message  文本提示信息；trigger: 'blur'  验证触发的时机，文本框失去焦点的时候触发
          { required: true, message: "请输入登录名称", trigger: "blur" },
          //验证长度区间 min: 3  最小长度； max: 10  最大长度
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
      Lj.istoken(this)
      this.enter()
  },
  methods: {
    //重置form表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$message.success("登录成功！");
      Lj.Savetoken("123");
      this.$router.push("/");
    },
    enter(){
      document.onkeyup = ((v)=>{
        if(v.code == 'Enter'){
          this.login()
        }
      })
    }
  }
};
</script>

<style scoped>
.login_container {
  background: url('../assets/img/login.jpg') no-repeat;
  background-size: cover;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgba(0,0,0,.4);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatat_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatat_box > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
.btns button{
  width: 300px;
}
.title{
  color: white;
  text-align: center;
  margin-bottom: 50px;
  font-size: 24px;
}
</style>