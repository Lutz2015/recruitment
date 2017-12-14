<template>
  <el-row class="add-resume">
    <el-col :span="4" class="menu">
      <el-header>
        <el-input placeholder="请输入简历名称" v-model="resumeName"></el-input>
        <el-button type="primary"
                   class="save-button"
                   @click="save"
                   size="small">保存
        </el-button>
      </el-header>
      <div class="steps-wrapper">
        <el-steps direction="vertical" :active="step">
          <el-step title="基本信息"></el-step>
          <el-step title="求职意向"></el-step>
          <el-step title="教育背景"></el-step>
          <el-step title="工作经历"></el-step>
          <el-step title="项目经验"></el-step>
          <el-step title="荣誉奖项"></el-step>
          <el-step title="自我评价"></el-step>
        </el-steps>
      </div>
    </el-col>

    <el-col :span="20" class="content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/add-resume/' }">增加简历</el-breadcrumb-item>
        <el-breadcrumb-item>{{path}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view/>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
  import './add-resume.css'
  import {modifyResumeName} from '../../api/resume/resume'
  import MutationTypes from '../../store/mutation-types'

  const PATH_JOB_INTENTION = '/add-resume/job-intention';
  const PATH_EDUCATIONS = '/add-resume/educations';
  const PATH_WORKS = '/add-resume/works';
  const PATH_PROJECTS = '/add-resume/projects';
  const PATH_HONORS = '/add-resume/honors';
  const PATH_SELF_EVALUATION = '/add-resume/self-evaluation';
  const PATHS = ['基本信息', '求职意向', '教育背景', '工作经历', '项目经验', '荣誉奖项', '自我评价'];

  export default {
    data() {
      return {
        step: 0,
        path: '',
        resumeName: ''
      }
    },
    mounted() {
      this.changePath();
    },
    updated() {
      let resume = this.$store.getters.resume;
      if (!resume) {
        this.$router.push({path: '/jobSeeker'});
        return;
      }
      this.resume = resume;
      this.changePath();
    },
    methods: {
      save() {
        if (!this.resumeName) {
          this.$message({
            message: '请输入简历的名字', type: 'error'
          })
        } else {
          modifyResumeName(this.resume._id, this.resumeName)
            .then((data) => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                this.resume.resumeName = this.resumeName;
                this.$store.commit(MutationTypes.SET_RESUME, this.resume);
                this.$message({message: '提交信息成功', type: 'success'})
              } else {
                this.$message({
                  message: '提交信息出错了...', type: 'error'
                })
              }
            })
        }
      },
      changePath() {
        const href = window.location.href;
        if (href.indexOf(PATH_JOB_INTENTION) !== -1) {
          this.step = 1;
        } else if (href.indexOf(PATH_EDUCATIONS) !== -1) {
          this.step = 2;
        } else if (href.indexOf(PATH_WORKS) !== -1) {
          this.step = 3;
        } else if (href.indexOf(PATH_PROJECTS) !== -1) {
          this.step = 4;
        } else if (href.indexOf(PATH_HONORS) !== -1) {
          this.step = 5;
        } else if (href.indexOf(PATH_SELF_EVALUATION) !== -1) {
          this.step = 6;
        }
        this.path = PATHS[this.step];
      }
    }
  }
</script>
