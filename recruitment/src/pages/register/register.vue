<template>
  <div class="register-page">
    <my-form title="用户注册"
             :errMsg="errMsg">
      <div class="input-wrap">
        <span><i>P</i></span>
        <div class="phone-wrap">
          <input type="tel" v-model="phone" placeholder="输入手机号码">
          <button class="send-code">
            发送验证码
          </button>
        </div>
      </div>
      <div class="input-wrap">
        <span><i>P</i></span>
        <input type="text" v-model="password" placeholder="输入密码">
      </div>
      <div class="input-wrap">
        <span><i>C</i></span>
        <input type="text" v-model="code" placeholder="输入验证码">
      </div>
      <button class="form-btn" @click="register">注册</button>
      <div class="to-login">
        <router-link to="/login" class="link">已有账号?去登录吧</router-link>
      </div>
    </my-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import './register.css'
  import MyForm from '../../components/form/form.vue'
  import {register as _register} from '../../api/jobseeker/jobseeker'

  export default {
    data() {
      return {
        phone: '',
        errMsg: '',
        password: '',
        code: ''
      }
    },
    methods: {
      register() {
        let phone = this.phone;
        let password = this.password;
        let code = this.code;
        if (!phone || !password||!code) {
          this.errMsg = '请输入账号和密码';
        }else{

        }
      }
    },
    components: {
      MyForm
    }
  }
</script>
