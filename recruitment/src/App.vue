<template>
  <div id="app">
    <v-header/>
    <router-view/>
    <v-footer/>
  </div>
</template>

<script>
  import VHeader from './components/header/header.vue'
  import VFooter from './components/footer/footer.vue'

  export default {
    name: 'app',
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style>
  body {
    margin: 0;
    color: #5A5E66;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  a {
    text-decoration: none;
    color: #5A5E66;
  }

  .clear-fix::after {
    display: table;
    clear: both;
    content: '';
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: #a6b5c5;
    border-radius: 2px;
  }
</style>
