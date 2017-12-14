<template>
  <div class="progress-wrapper" :style="style">
    <div class="progress" ref="progress"></div>
  </div>
</template>
<style>
  .progress-wrapper {
    height: 20px;
  }

  .progress {
    background: #4079af;
    height: 100%;
  }
</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      progress: {
        Type: Number,
        default: .5
      },
      bgColor: {
        Type: String,
        default: '#ffffff'
      }
    },
    data() {
      return {
        style: ''
      }
    },
    mounted() {
      if (this.progress > 1)
        return;
      this.$refs.progress.style.width = `${this.progress * 100}%`;
      this.style = `background:${this.bgColor};`;
    }
  }
</script>
