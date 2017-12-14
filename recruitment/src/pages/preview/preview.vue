<template>
  <div class="preview">
    <div class="resume">
      <div class="left">
        <div class="image-wrapper">
          <img src="http://img03.51jobcdn.com/im/2016/resume/man.png">
        </div>
        <div class="base-info wrapper">
          <span>年龄：{{getAge(jobSeekerInfo.birthday)}}岁</span>
          <span>居住地：{{jobSeekerInfo.address.split('-')[1]}}</span>
          <span>手机号：{{jobSeekerInfo.phone}}</span>
          <span>邮箱：{{jobSeekerInfo.email}}</span>
        </div>
        <div class="specialty wrapper">
          <h2 class="title">技能特长</h2>
          <div class="list">
            <div class="item">
              <span class="name">Android</span>
              <div class="level">
                <specialty-progress :progress=".3"></specialty-progress>
                <span>精通</span>
              </div>
            </div>
            <div class="item">
              <span class="name">Html</span>
              <div class="level">
                <specialty-progress></specialty-progress>
                <span>精通</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 姓名信息 -->
        <div class="name-wrapper wrapper">
          <h1 v-text="jobSeekerInfo.name"></h1>
          <span v-text="resume.summary"></span>
        </div>
        <!-- 求职意向 -->
        <div class="job-intention wrapper">
          <h2 class="title">求职意向</h2>
          <div class="intention">
            <span>职位：{{resume.jobName}}</span>
            <span>工作类型：{{getWorkType(resume.typeOfWork)}}</span>
            <span>薪资：{{resume.lowSalary}}K-{{resume.highSalary}}K</span>
          </div>
        </div>
        <!-- 教育背景 -->
        <div class="education wrapper" v-if="resume.educations.length>0">
          <h2 class="title">教育背景</h2>
          <div class="list">
            <div class="item" v-for="item in resume.educations">
              <div class="title">
                <span v-text="item.date"></span>
                <span v-text="item.school"></span>
                <span v-text="item.major"></span>
              </div>
              <span class="desc">主修课程：{{item.desc||'未填写具体的主修课程简介'}}</span>
            </div>
          </div>
        </div>
        <!-- 实习经历 -->
        <div class="internship wrapper" v-if="resume.works.length>0">
          <h2 class="title">工作经历</h2>
          <div class="list">
            <div class="item" v-for="work in resume.works">
              <div class="title">
                <span v-text="work.date"></span>
                <span v-text="work.company"></span>
                <span v-text="work.job"></span>
              </div>
              <span class="desc">主修课程：{{work.desc||'未填写具体的工作简介'}}</span>
            </div>
          </div>
        </div>
        <!-- 项目经验 -->
        <div class="projects wrapper" v-if="resume.projects.length>0">
          <h2 class="title">项目经验</h2>
          <div class="list">
            <div class="item" v-for="project in resume.projects">
              <div class="title">
                <span v-text="project.date"></span>
                <span v-text="project.company"></span>
                <span v-text="project.name"></span>
              </div>
              <span class="desc">主修课程：{{project.desc||'未填写具体的项目简介'}}</span>
            </div>
          </div>
        </div>
        <!-- 荣誉奖项 -->
        <div class="honors wrapper" v-if="resume.honors.length>0">
          <h2 class="title">荣誉奖项</h2>
          <span class="honor" v-for="honor in resume.honors">{{honor}}</span>
        </div>
        <!-- 自我评价 -->
        <div class="self-evaluation wrapper">
          <h2 class="title">自我评价</h2>
          <span class="evaluation" v-text="resume.evaluation">
            </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import './preview.css'
  import {mapGetters} from 'vuex'
  import SpecialtyProgress from '../../components/progress/progress.vue'

  export default {
    computed: {
      ...mapGetters(['jobSeekerInfo', 'resume'])
    },
    mounted() {
      console.log(this.resume);
      if (!this.jobSeekerInfo || !this.resume) {
        this.$router.back();
      }
    },
    methods: {
      getWorkType(typeOfWork) {
        let type;
        switch (typeOfWork) {
          case "1":
            type = '全职';
            break;
          case "2":
            type = '兼职';
            break;
          case "3":
            type = '实习';
            break;
        }
        return type;
      },
      getAge(birthday) {
        return new Date().getFullYear() - birthday.split('/')[0]
      }
    },
    components: {
      SpecialtyProgress
    }
  }
</script>
