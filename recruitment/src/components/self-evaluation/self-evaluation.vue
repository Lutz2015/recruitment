<template>
  <div class="self-evaluation">
    <el-col :span="18">
      <el-form>
        <el-form-item label="自我评价">
          <el-input type="textarea"
                    :rows="5"
                    v-model="evaluation"
                    placeholder="介绍自己，说明自己的最大优势，让企业看到你的闪光点"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :offset="2" class="buttons">
      <el-button type="warning"
                 class="prev"
                 @click="prev"
                 size="medium">上一步
      </el-button>
      <el-button type="primary"
                 class="next"
                 @click="save"
                 size="medium">保存
      </el-button>
    </el-col>
  </div>
</template>
<script type="text/ecmascript-6">
  import {modifyEvaluation} from '../../api/resume/resume'

  export default {
    data() {
      return {
        evaluation: '',
      }
    },
    mounted() {
      let resume = this.$store.getters.resume;
      if (resume) {
        this.evaluation = resume.evaluation;
        this.resume = resume;
      }
    },
    methods: {
      save() {
        this.resume = this.$store.getters.resume;
        if (!this.resume.resumeName) {
          this.showMessage('请输入简历的名称');
          return;
        }
        let evaluation = this.evaluation;
        if (!evaluation) {
          this.showMessage('请输入自我评价');
        } else {
          modifyEvaluation(this.resume._id, evaluation)
            .then((data) => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                this.showMessage('提交信息成功', 'success');
                this.$router.push({path: '/jobSeeker'});
              } else {
                this.showMessage('提交信息出错了...');
              }
            })
        }
      },
      prev() {
        this.$router.push({
          path: '/add-resume/honors'
        })
      },
      showMessage(message, type = 'error') {
        this.$message({type, message})
      }
    }
  }
</script>
