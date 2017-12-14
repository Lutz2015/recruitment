<template>
  <div class="honors">
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
      <el-form-item label="奖项">
        <el-input placeholder="请输入奖项名称" v-model="honor"></el-input>
      </el-form-item>
      <el-col>
        <el-form-item label="描述" class="desc">
          <el-input type="textarea"
                    v-model="desc"
                    placeholder="描述你的荣誉奖项"></el-input>
        </el-form-item>
        <el-button @click="addHonor">增加</el-button>
      </el-col>
    </el-form>
    <el-table :data="honors" style="width: 100%">
      <el-table-column type="expand" width="50">
        <template slot-scope="rows">
          <span>简介：{{rows.row.honors||'无奖项描述'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" width="240">
      </el-table-column>
      <el-table-column prop="honor" label="奖项">
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
  import './honors.css'
  import MutationTypes from '../../store/mutation-types'
  import {modifyHonors} from '../../api/resume/resume'

  export default {
    data() {
      return {
        honor: '',
        honors: []
      }
    },
    mounted() {
      let resume = this.$store.getters.resume;
      if (resume) {
        this.honors = [].concat(resume.honors);
        this.resume = resume;
      }
    },
    methods: {
      addHonor() {
        let honor = this.honor;
        if (this.honors.length >= 3) {
          this.showMessage('最多添加只能三条荣誉奖项!');
          return;
        }
        if (!honor) {
          this.showMessage('请输入完成的信息');
          return;
        }
        let time = `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`;
        this.honors.push({honor});
        this.honor = '';
      },
      deleteRow(index) {
        this.honors.splice(index, 1)
      },
      next() {
        let resume = this.resume;
        let honors = this.honors;
        if (honors.length !== 0 && !this.isEquals(resume.honors, honors)) {
          modifyHonors(resume._id, this.honors)
            .then(data => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                this.resume.honors = [].concat(this.honors);
                this.showMessage('提交信息成功', 'success');
                this.$router.push({path: '/add-resume/self-evaluation'});
              } else {
                this.showMessage('提交信息出错了...');
              }
            })
            .catch(() => {
              this.showMessage('提交信息出错了...');
            })
        } else {
          this.$router.push({path: '/add-resume/self-evaluation'});
        }
      },
      prev() {
        this.$router.push({
          path: '/add-resume/projects'
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
