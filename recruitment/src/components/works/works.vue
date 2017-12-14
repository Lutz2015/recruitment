<template>
  <div class="work">
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
        <el-form-item label="职位">
          <el-input placeholder="请输入职位名称" v-model="job"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="描述" class="desc">
          <el-input type="textarea"
                    v-model="desc"
                    :maxlength="100"
                    placeholder="描述你的职责范围、工作任务和取得的成绩"></el-input>
        </el-form-item>
        <el-button @click="addWork">增加</el-button>
      </el-col>
    </el-form>
    <el-table :data="works" style="width: 100%">
      <el-table-column type="expand" width="50">
        <template slot-scope="rows">
          <span>简介：{{rows.row.desc||'无简介'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" width="240">
      </el-table-column>
      <el-table-column prop="company" label="公司" width="240">
      </el-table-column>
      <el-table-column prop="job" label="职位">
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
  import './works.css'
  import MutationTypes from '../../store/mutation-types'
  import {modifyWorks} from '../../api/resume/resume'

  export default {
    data() {
      return {
        company: '',
        job: '',
        date: '',
        desc: '',
        works: []
      }
    },
    mounted() {
      let resume = this.$store.getters.resume;
      if (resume) {
        this.works = [].concat(resume.works);
        this.resume = resume;
      }
    },
    methods: {
      addWork() {
        let {company, job, date, desc} = this;
        if (this.works.length >= 3) {
          this.showMessage('最多添加只能三条工作经历!');
          return;
        }
        if (!company || !job || !date) {
          this.showMessage('请输入完成的信息');
          return;
        }
        let time = `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`;
        this.works.push({date: time, company, job, desc});
        this.date = '';
        this.company = '';
        this.job = '';
        this.desc = '';
      },
      next() {
        let resume = this.resume;
        let works = this.works;
        if (works.length !== 0 && !this.isEquals(resume.works, works)) {
          modifyWorks(resume._id, this.works)
            .then(data => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                this.resume.works = [].concat(this.works);
                this.showMessage('提交信息成功', 'success');
                this.$router.push({path: '/add-resume/projects'});
              } else {
                this.showMessage('提交信息出错了...');
              }
            })
            .catch(() => {
              this.showMessage('提交信息出错了...');
            })
        } else {
          this.$router.push({path: '/add-resume/projects'});
        }
      },
      prev() {
        this.$router.push({path: '/add-resume/educations'})
      },
      deleteRow(index) {
        this.works.splice(index, 1);
      },
      showMessage(message, type = 'error') {
        this.$message({
          type,
          message
        })
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
