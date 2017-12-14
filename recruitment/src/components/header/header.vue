<template>
  <header>
    <h3 class="blank">
      <a href="#">Recruitment</a>
    </h3>
    <el-menu default-active="/"
             mode="horizontal"
             :router="true"
             ref="menu"
             @select="handleMenuClick">
      <el-menu-item index="/">
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/search">
        <span>职位搜索</span>
      </el-menu-item>
      <template v-if="jobSeekerInfo">
        <el-submenu index="/jobSeeker">
          <template slot="title">个人中心</template>
          <el-menu-item index="/jobSeeker/">简历中心</el-menu-item>
          <el-menu-item index="3-2">谁看过我</el-menu-item>
          <el-menu-item index="3-3">我的收藏</el-menu-item>
          <el-menu-item index="3-4">我的申请</el-menu-item>
          <el-menu-item index="#">退出登录</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item index="/login">
          <span>登录/注册</span>
        </el-menu-item>
      </template>
      <el-menu-item index="5">
        <span>订单管理</span>
      </el-menu-item>
    </el-menu>
  </header>
</template>
<script type="text/ecmascript-6">
  import './header.css'
  import {mapGetters} from 'vuex'
  import {logout} from '../../api/jobseeker/jobseeker'
  import MutationTypes from '../../store/mutation-types'

  const PATH_HOME = '/';
  const PATH_SEARCH = '/search';
  const PATH_JOB_SEEKER = '/jobSeeker';

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['jobSeekerInfo'])
    },
    updated() {
      this.$refs.menu._data.activeIndex = this.$route.path;
    },
    methods: {
      handleMenuClick(key) {
        console.log(key);
        switch (key) {
          case '#':
            logout()
              .then(data => {
                console.log(data);
                if (data.status === 0) {
                  this.$store.commit(MutationTypes.SET_JOB_SEEKER_INFO, null);
                  this.$router.push({path: '/'});
                  this.active = '/';
                } else {
                  this.$message({type: 'error', message: '退出登录失败了，请稍后重试'});
                }
              })
              .catch(err => {
                this.$message({type: 'error', message: '网络错误，请稍后重试'});
                console.log(err);
              });
            break;
        }
      }
    }
  }
</script>
