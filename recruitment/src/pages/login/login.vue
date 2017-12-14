<template>
  <div class="login-page">
    <my-form title="用户登录"
             :errMsg="errMsg">
      <div class="input-wrap">
        <span><i>icon</i></span>
        <input type="tel" v-model="phone" placeholder="输入用户手机号">
      </div>
      <div class="input-wrap">
        <span><i>icon</i></span>
        <input type="password" v-model="password" placeholder="输入用户密码">
      </div>
      <button class="form-btn" @click="login">登录</button>
      <div class="reg-and-forget">
        <router-link to="/forget-password" class="link">忘记密码</router-link>
        <router-link to="/register" class="link">没有账号?去注册吧</router-link>
      </div>
    </my-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import './login.css'
  import MyForm from '../../components/form/form.vue'
  import {login as _login} from '../../api/jobseeker/jobseeker'
  import MutationTypes from '../../store/mutation-types'

  export default {
    data() {
      return {
        phone: '',
        password: '',
        errMsg: ''
      }
    },
    methods: {
      login() {
        let phone = this.phone;
        let password = this.password;
        if (!phone || !password) {
          this.errMsg = '请填写用户名和密码';
        } else {
          _login(phone, password)
            .then(data => {
              if (data.status === 0) {
                if (data.data) {
                  this.$store.commit(MutationTypes.SET_JOB_SEEKER_INFO, data.data);
                  this.$router.push({path: '/'})
                } else {
                  this.errMsg = '手机号或者密码错误';
                }
              }
            })
        }
      }
    },
    components: {
      MyForm
    }
  }
</script>
