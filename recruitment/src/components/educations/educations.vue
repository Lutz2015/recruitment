<template>
  <div class="education">
    <el-form label-width="50px" :inline="true" label-position="left">
      <el-col>
        <el-form-item label="学校">
          <el-input placeholder="请输入学校名称" v-model="school"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input placeholder="请输入专业名称" v-model="major"></el-input>
        </el-form-item>
        <el-form-item label="学位">
          <el-select v-model="degree">
            <el-option label="中专" value="zhongzhuan"></el-option>
            <el-option label="大专" value="dazhuan"></el-option>
            <el-option label="本科" value="benke"></el-option>
            <el-option label="硕士" value="shuoshi"></el-option>
            <el-option label="博士" value="boshi"></el-option>
            <el-option label="MBA" value="MBA"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-form-item label="时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-button @click="add">增加</el-button>
    </el-form>
    <el-table :data="educations" style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="date" label="时间" width="240">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="210">
      </el-table-column>
      <el-table-column prop="major" label="专业">
      </el-table-column>
      <el-table-column prop="degree" label="学位">
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
  import {modifyEducations} from '../../api/resume/resume'

  export default {
    data() {
      return {
        date: '',
        school: '',
        major: '',
        degree: '',
        educations: []
      }
    },
    mounted() {
      let resume = this.$store.getters.resume;
      if (resume) {
        this.educations = [].concat(resume.educations);
        this.resume = resume;
      }
    },
    methods: {
      add() {
        if (this.educations.length >= 3) {
          this.showMessage('最多添加只能三条教育经历!');
          return;
        }
        let {date, school, major, degree} = this;
        if (!date || !school || !major || !degree) {
          this.showMessage('请输入完成的信息');
          return;
        }
        let time = `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`;
        this.educations.push({date: time, school, major, degree});
        this.date = '';
        this.school = '';
        this.major = '';
        this.degree = '';
      },
      deleteRow(index) {
        this.educations.splice(index, 1);
      },
      next() {
        let resume = this.resume;
        let educations = this.educations;
        if (educations.length !== 0 && !this.isEquals(resume.educations, educations)) {
          modifyEducations(resume._id, this.educations)
            .then(data => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                this.resume.educations = [].concat(this.educations);
                this.showMessage('提交信息成功', 'success');
                this.$router.push({path: '/add-resume/works'})
              } else {
                this.showMessage('提交信息出错了...');
              }
            })
            .catch(() => {
              this.showMessage('提交信息出错了...');
            })
        } else {
          this.$router.push({
            path: '/add-resume/works'
          })
        }
      },
      prev() {
        this.$router.push({
          path: '/add-resume/job-intention'
        })
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
