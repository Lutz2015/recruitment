<template>
  <el-row class="resumes">
    <el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
          <el-select v-model="searchMode" slot="prepend" placeholder="请选择">
            <el-option label="简历名称" value="1"></el-option>
            <el-option label="更新时间" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchResume"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" class="add-resume-btn" size="medium" @click="addResume">新建简历</el-button>
      </el-col>
    </el-col>
    <el-col class="data-content" :span="24">
      <el-table :data="resumes" stripe style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="resumeName" label="简历名称" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="更新日期" width="180">
          <template slot-scope="scope">
            {{getDate(scope.row.updateTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="jobName" label="岗位名称" width="180"></el-table-column>
        <el-table-column label="工作类型">
          <template slot-scope="scope">
            {{getWorkType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column width="100" class-name="is-default-td">
          <template slot-scope="scope">
            <el-tag v-if="scope.row._id===jobSeekerInfo.defaultResume" type="success">默认简历</el-tag>
            <el-button v-else type="primary"
                       @click="setDefault(scope.row)"
                       size="mini">设为默认
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" class-name="op-td">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="preview(scope.row)">预览
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteResume(scope.$index,scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="onPageChange"
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="1">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
  import './resume.css'
  import {
    addResume as _addResume,
    deleteResume as _deleteResume
  } from '../../api/resume/resume'
  import MutationTypes from '../../store/mutation-types'
  import {getResumes} from '../../api/resume/resume'
  import {changeDefaultResume} from '../../api/jobseeker/jobseeker'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        keyword: '',
        searchMode: '1',
        currentPage: 6,
        resumes: []
      }
    },
    computed: {
      ...mapGetters(['jobSeekerInfo'])
    },
    mounted() {
      getResumes(this.$store.getters.jobSeekerInfo._id)
        .then((data) => {
          console.log(data);
          this.resumes = data.data;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    methods: {
      searchResume() {
        console.log(this.keyword, this.searchMode)
      },
      onPageChange(page) {
        console.log(page)
      },
      addResume() {
        let jobSeekerInfo = this.$store.getters.jobSeekerInfo;
        _addResume(jobSeekerInfo._id)
          .then(data => {
            if (data.status === 0 && data.data) {
              this.$store.commit(MutationTypes.SET_RESUME, data.data);
              this.$router.push({path: '/add-resume'});
            } else {
              this.$message({
                type: 'error',
                message: '抱歉，新建简历出错了'
              })
            }
          })
          .catch(error => {
            this.$message({
              type: 'error',
              message: '抱歉，新建简历出错了'
            });
            console.log(error);
          })
      },
      deleteResume(index, row) {
        this.$confirm('确定删除该简历？删除后不可恢复', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _deleteResume(row._id)
              .then(data => {
                if (data.status === 0 && data.data && data.data.n === 1) {
                  this.$message({type: 'success', message: '删除简历成功'});
                  this.resumes.splice(index, 1)
                } else {
                  this.$message({type: 'error', message: '删除简历出错了..'});
                }
              })
              .catch(err => {
                this.$message({type: 'error', message: '删除简历出错了..'});
              })
          })
          .catch(() => {
            console.log('取消删除操作')
          })
      },
      preview(row) {
        console.log(row);
        this.$store.commit(MutationTypes.SET_RESUME, row);
        this.$router.push({path: '/preview'})
      },
      setDefault(data) {
        console.log(data);
        let defaultResume = data._id;
        changeDefaultResume(this.jobSeekerInfo._id, defaultResume)
          .then(data => {
            if (data.status === 0 && data.data && data.data.ok === 1) {
              this.jobSeekerInfo.defaultResume = defaultResume;
              this.showMessage('默认简历修改成功', 'success')
            } else {
              this.showMessage('修改出错了，请稍后重试...')
            }
          })
          .catch(error => {
            console.log('resumes--change default resume fail.', error);
            this.showMessage('修改出错了，请稍后重试...');
          })
      },
      getWorkType(data) {
        let type;
        switch (data.typeOfWork) {
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
      getDate(ts) {
        let date = new Date();
        date.setTime(ts);
        return date.toLocaleDateString();
      },
      showMessage(message, type = 'error') {
        this.$message({message, type})
      }
    }
  }
</script>
