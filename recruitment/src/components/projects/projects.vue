<template>
  <div class="projects">
    <el-form label-width="50px" :inline="true" label-position="left">
      <el-form-item label="时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-col>
        <el-form-item label="公司">
          <el-input placeholder="请输入公司名称" v-model="company"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" label-width="70px">
          <el-input placeholder="请输入项目名称" v-model="name"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="描述" class="desc">
          <el-input type="textarea"
                    v-model="desc"
                    placeholder="介绍你的项目、工作任务"></el-input>
        </el-form-item>
        <el-button @click="addProject">增加</el-button>
      </el-col>
    </el-form>
    <el-table :data="projects" style="width: 100%">
      <el-table-column type="expand" width="50">
        <template slot-scope="rows">
          <span>简介：{{rows.row.desc||'无简介'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" width="240">
      </el-table-column>
      <el-table-column prop="company" label="公司" width="210">
      </el-table-column>
      <el-table-column prop="name" label="项目名称">
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteRow(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script type="text/ecmascript-6">
  import MutationTypes from '../../store/mutation-types'
  import {modifyProjects} from '../../api/resume/resume'

  export default {
    data() {
      return {
        company: '',
        name: '',
        date: '',
        desc: '',
        projects: []
      }
    },
    mounted() {
      let resume = this.$store.getters.resume;
      if (resume) {
        this.projects = [].concat(resume.projects);
        this.resume = resume;
      }
    },
    methods: {
      addProject() {
        let {company, name, date, desc} = this;
        if (this.projects.length >= 3) {
          this.showMessage('最多添加只能三条工作经历!');
          return;
        }
        if (!company || !name || !date) {
          this.showMessage('请输入完成的信息');
          return;
        }
        let time = `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`;
        this.projects.push({date: time, company, name, desc});
        this.date = '';
        this.company = '';
        this.name = '';
        this.desc = '';
      },
      deleteRow(index) {
        this.projects.splice(index, 1)
      },
      next() {
        let resume = this.resume;
        let projects = this.projects;
        if (projects.length !== 0 && !this.isEquals(resume.projects, projects)) {
          modifyProjects(resume._id, this.projects)
            .then(data => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                this.resume.projects = [].concat(this.projects);
                this.showMessage('提交信息成功', 'success');
                this.$router.push({path: '/add-resume/honors'});
              } else {
                this.showMessage('提交信息出错了...');
              }
            })
            .catch(() => {
              this.showMessage('提交信息出错了...');
            })
        } else {
          this.$router.push({path: '/add-resume/honors'});
        }
      },
      prev() {
        this.$router.push({
          path: '/add-resume/works'
        })
      },
      showMessage(message, type = 'error') {
        this.$message({type, message})
      },
      isEquals(arr1, arr2) {
        if (arr1.length !== arr2.length)
          return false;
        return arr1.every((item, index) => {
          let obj = arr2[index];
          for (let key in obj) {
            if (obj[key] !== item[key]) {
              return false
            }
          }
          return true
        })
      }
    },
    beforeDestroy() {
      this.resume && this.$store.commit(MutationTypes.SET_RESUME, this.resume);
    }
  }
</script>
