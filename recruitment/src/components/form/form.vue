<template>
  <div class="form">
    <h2 class="form-title" v-text="title"></h2>
    <div class="form-con">
      <div class="error-wrap"
           :class="{'shake':shake}"
           v-show="errMsg">
          <span class="icon-jinzhi">
          </span>
        <span class="error-msg" v-text="errMsg"></span>
      </div>
      <slot>
        <!--<div class="input-wrap">-->
        <!--<span><i class="icon-password"></i></span>-->
        <!--<input type="password"-->
        <!--class="password"-->
        <!--placeholder="请输入密码"-->
        <!--v-model="password"-->
        <!--@keyup.enter="login">-->
        <!--</div>-->
        <!--<button class="form-btn" @click="login">登录</button>-->
      </slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import './form.css'

  export default {
    props: {
      title: {
        Type: String,
        default: ''
      },
      errMsg: {
        Type: String,
        default: ''
      }
    },
    data() {
      return {
        shake: false
      }
    },
    methods: {
      _shake() {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 400)
      }
    }
  }
</script>
