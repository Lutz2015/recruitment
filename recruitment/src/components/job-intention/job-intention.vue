<template>
  <el-col :span="20" class="job-intention">
    <el-form class="clear-fix" ref="form" label-width="80px">
      <el-form-item label="工作性质">
        <el-select v-model="typeOfWork"
                   placeholder="请选择工作性质">
          <el-option label="全职" value="1"></el-option>
          <el-option label="兼职" value="2"></el-option>
          <el-option label="实习" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期望薪资" class="salary">
        <el-input placeholder="最低工资" type="number" v-model="lowSalary"></el-input>
        K -
        <el-input placeholder="最高工资" type="number" v-model="highSalary"></el-input>
        K
      </el-form-item>
      <el-form-item label="职位/职能">
        <el-input placeholder="请输入意向职位" v-model="job"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input placeholder="一句话告诉HR为什么选择你" v-model="summary"></el-input>
      </el-form-item>
    </el-form>
    <el-col :offset="2" class="buttons">
      <el-button type="warning"
                 class="prev"
                 @click="prev"
                 size="medium">上一步
      </el-button>
      <el-button type="primary"
                 class="next"
                 @click="next"
                 size="medium">下一步
      </el-button>
    </el-col>
  </el-col>
</template>
<script type="text/ecmascript-6">
  import './job-intention.css'
  import {modifyJobIntention} from '../../api/resume/resume'
  import MutationTypes from '../../store/mutation-types'

  export default {
    data() {
      return {
        typeOfWork: '',
        lowSalary: '',
        highSalary: '',
        job: '',
        summary: ''
      }
    },
    mounted() {
      let resume = this.$store.getters.resume;
      if (resume) {
        this.typeOfWork = resume.typeOfWork;
        this.lowSalary = resume.lowSalary;
        this.highSalary = resume.highSalary;
        this.job = resume.job;
        this.summary = resume.summary;
        this.resume = resume;
      }
    },
    methods: {
      next() {
        let {typeOfWork, lowSalary, highSalary, job, summary} = this;
        if (!typeOfWork || !lowSalary || !highSalary || !job) {
          this.showMessage('请输入完整的信息')
        } else {
          if (highSalary >= lowSalary && lowSalary > 0) {
            let resume = this.resume;
            if (typeOfWork === resume.typeOfWork &&
              lowSalary === resume.lowSalary &&
              summary === resume.summary &&
              highSalary === resume.highSalary &&
              job === resume.job) {
              this.$router.push({path: '/add-resume/educations'});
              return;
            }
            modifyJobIntention(resume._id, lowSalary, highSalary, typeOfWork, job, summary)
              .then(data => {
                console.log(data);
                if (data.status === 0 && data.data && data.data.ok === 1) {
                  resume.typeOfWork = typeOfWork;
                  resume.job = job;
                  resume.lowSalary = lowSalary;
                  resume.highSalary = highSalary;
                  resume.summary = summary;
                  this.resume = resume;
                  this.showMessage('提交信息成功', 'success');
                  this.$router.push({path: '/add-resume/educations'})
                } else {
                  this.showMessage('提交信息失败了，请稍后重试')
                }
              })
              .catch(error => {
                console.log(error);
                this.showMessage('提交信息失败了，请稍后重试');
              })
          } else {
            this.showMessage('请输入正确的最低和最高工资')
          }
        }
      },
      prev() {
        this.$router.push({
          path: '/add-resume/'
        })
      },
      showMessage(message, type = 'error') {
        this.$message({type, message})
      }
    },
    beforeDestroy() {
      this.resume && this.$store.commit(MutationTypes.SET_RESUME, this.resume);
    }
  }
</script>
