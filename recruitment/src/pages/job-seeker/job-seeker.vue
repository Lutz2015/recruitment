<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">简历中心</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">谁看过我</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>
<style>
  aside.el-aside {
    background-color: #545c64;
  }

  aside.el-aside .el-menu {
    border-right: none;
  }

  .el-main {
    min-height: 550px;
  }
</style>
<script type="text/ecmascript-6">
  export default {
    mounted() {
      let jobSeekerInfo = this.$store.getters.jobSeekerInfo;
      if (!jobSeekerInfo) {
        this.$message({type: 'info', message: '请先登录后查看'});
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
