<template>
  <el-row class="add-resume">
    <el-col :span="4" class="menu">
      <el-col :span="24">
        <el-header>
          <el-input placeholder="请输入简历名称"></el-input>
          <el-button type="primary"
                     class="save-button"
                     @click="save"
                     size="small">保存
          </el-button>
        </el-header>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">工作经验</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">在校荣誉</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">技能特长</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">自我简介</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-col>


    <el-col :span="20" class="content">

    </el-col>

    <!-- 输入信息提示框 start -->
    <el-dialog title="编辑求职意向" :visible.sync="dialogFormVisible">
      <div class="base-info">
        <el-form class="demo-form-inline" :inline="true">
          <el-form-item label="姓名">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="出生年份">
            <el-select v-model="baseInfo.year" placeholder="活动区域">
              <el-option label="1990" value="1990"></el-option>
              <el-option label="1991" value="1991"></el-option>
              <el-option label="1992" value="1992"></el-option>
              <el-option label="1993" value="1993"></el-option>
              <el-option label="1994" value="1994"></el-option>
              <el-option label="1995" value="1995"></el-option>
              <el-option label="1996" value="1996"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在城市" class="city-form">
            <el-select v-model="baseInfo.province" placeholder="省份">
              <el-option label="1990" value="1990"></el-option>
            </el-select>
            <el-select v-model="baseInfo.city" placeholder="城市">
              <el-option label="1990" value="1990"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电话">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="一句话介绍自己" class="summary">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="job-intention" style="display: none;">
        <el-form class="demo-form-inline" :inline="true">
          <el-form-item label="意向职位">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="工作类型">
            <el-select v-model="baseInfo.year" placeholder="活动区域">
              <el-option label="实习" value="1"></el-option>
              <el-option label="全职" value="2"></el-option>
              <el-option label="兼职" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期望薪资" class="salary">
            <el-input type="number"></el-input>
            &nbsp;K-&nbsp;
            <el-input type="number"></el-input>
            &nbsp;K
          </el-form-item>
        </el-form>
      </div>

      <div class="education" style="display: none;">
        <el-form class="demo-form-inline" :inline="true">
          <el-form-item label="教育时间">
            <el-date-picker
              v-model="education.time"
              type="daterange"
              :editable="false"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学校">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="主修课程" class="summary">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 输入信息提示框 end -->
  </el-row>
</template>
<style>
  .add-resume .el-dialog .city-form .el-select .el-input__inner {
    width: 120px;
  }

  .add-resume .el-dialog .summary {
    display: flex;
  }

  .add-resume .el-dialog .base-info .summary .el-form-item__content,
  .add-resume .el-dialog .education .summary .el-form-item__content {
    flex: 1;
  }

  .add-resume .el-dialog .job-intention .salary {
    display: flex;
  }

  .add-resume .el-dialog .job-intention .salary .el-form-item__content {
    display: flex;
  }

  .add-resume .el-dialog .job-intention .salary .el-input__inner {
    width: 80px;
  }

  .add-resume {
    width: 100%;
    display: flex;
    letter-spacing: 0.5px;
  }

  .add-resume .menu {
    /*width: 200px;*/
    border-right: 1px solid #e7e7e7;
  }

  .add-resume .menu .el-header {
    height: auto !important;
    display: flex;
    flex-direction: column;
  }

  .add-resume .menu .el-header .el-input__inner {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .add-resume .menu .el-header .save-button {
    margin-bottom: 20px;
  }

  .add-resume .content {
    flex: 1;
    padding: 16px;
  }

  /* 简历 */
  .add-resume .content .resume {
    width: 820px;
    display: flex;
    box-shadow: 8px 1px 10px #d8d8d8;
    margin: 0 auto;
  }

  .add-resume .content .resume .wrapper > .title {
    border-bottom: 1px solid #254665;
    padding: 2px 0;
  }

  /* 简历左边信息 */
  .add-resume .content .resume .left {
    width: 270px;
    background-color: #254665;
    color: #FFFFFF;
  }

  .add-resume .content .resume .left .wrapper {
    padding: 0 30px;
    border: 1px solid #254665;
  }

  .add-resume .content .resume .left .image-wrapper {
    width: 120px;
    height: 150px;
    border: 2px solid #FFFFFF;
    background-color: #FFFFFF;
    margin: 60px auto 0;
  }

  .add-resume .content .resume .left .image-wrapper img {
    width: 120px;
    height: 150px;
  }

  .add-resume .content .resume .left .base-info {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }

  .add-resume .content .resume .left .base-info span {
    margin: 6px 0;
  }

  .add-resume .content .resume .left .specialty .list .item {
    margin-bottom: 12px;
  }

  .add-resume .content .resume .left .specialty .level {
    display: flex;
    align-items: center;
    margin-top: 4px;
  }

  .add-resume .content .resume .left .specialty .level > span {
    width: 60px;
    text-align: center;
  }

  .add-resume .content .resume .left .specialty .progress-wrapper {
    width: calc(100% - 60px);
    height: 10px;
  }

  /* 简历右边信息 */
  .add-resume .content .resume .right {
    flex: 1;
    color: #254665;
    padding: 20px 20px 30px 20px;
  }

  .add-resume .content .resume .right .list .item:not(:first-child) {
    margin-top: 20px;
  }

  .add-resume .content .resume .right .list .item .title {
    margin: 4px 0;
  }

  .add-resume .content .resume .right .list .item .title > span {
    margin-right: 40px;
  }

  .add-resume .content .resume .right .wrapper {
    border: 1px solid #FFFFFF;
  }

  .add-resume .content .resume .right .name-wrapper {
    display: flex;
    vertical-align: bottom;
    align-items: baseline;
    margin: 8px 0;
    border: 1px solid #FFFFFF;
  }

  .add-resume .content .resume .right .name-wrapper h1 {
    font-weight: normal;
    margin: 0;
  }

  .add-resume .content .resume .right .name-wrapper span {
    font-size: 15px;
    height: 20px;
    margin-left: 16px;
    color: #7a7a7a;
  }

  .add-resume .content .resume .right .job-intention .intention > span {
    margin-right: 24px;
  }

  .add-resume .content .resume .right .education .item .desc,
  .add-resume .content .resume .right .projects .item .desc,
  .add-resume .content .resume .right .honors .honor,
  .add-resume .content .resume .right .self-evaluation .evaluation,
  .add-resume .content .resume .right .internship .item .desc {
    color: #8c8c8c;
    font-size: 14px;
  }

  .add-resume .content .resume .right .honors .honor {
    margin: 2px 0;
  }

  .add-resume .content .resume .right .internship .item ul li {
    list-style: disc;
    margin: 4px 0 0 20px;
  }

  .add-resume .wrapper:hover {
    border: 1px dashed #30ba51 !important;
  }
</style>
<script type="text/ecmascript-6">
  import SpecialtyProgress from '../../components/progress/progress.vue'

  export default{
    data () {
      return {
        baseInfo: {
          name: '',
          year: 1996,
          city: '',
          phone: '',
          email: '',
          summary: ''
        },
        dialogFormVisible: true,
        education: {
          time: ''
        }
      }
    },
    components: {
      SpecialtyProgress
    },
    methods: {
      save () {
        this.dialogFormVisible = true;
      }
    }
  }
</script>
