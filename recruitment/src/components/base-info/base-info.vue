<template>
  <div class="base-info clear-fix">
    <el-col :span="20">
      <el-col :span="24">
        <input type="file" ref="file" @change="onFileChange" style="display: none;">
        <img class="user-avatar"
             ref="avatar"
             @click="changeFile"
             src="http://c.hiphotos.baidu.com/image/pic/item/3b87e950352ac65c7ad3bf96f1f2b21192138a05.jpg" alt="">
      </el-col>
      <el-form class="clear-fix" ref="form" :model="baseInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="baseInfo.name"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="baseInfo.sex" label="1">男</el-radio>
          <el-radio v-model="baseInfo.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker
            v-model="baseInfo.birthday"
            type="date"
            placeholder="请选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="baseInfo.phone"
                    placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="baseInfo.email"
                    placeholder="请输入联系邮箱"></el-input>
        </el-form-item>
        <el-form-item label="居住地">
          <el-cascader
            :options="options"
            @active-item-change="handleItemChange"
            :props="props"
            placeholder="请选择居住地"
            v-model="baseInfo.address"
          ></el-cascader>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :offset="2" class="buttons">
      <el-button type="primary"
                 class="next"
                 @click="next"
                 size="medium">下一步
      </el-button>
    </el-col>
  </div>
</template>
<script type="text/ecmascript-6">
  import './base-info.css'
  import provinces from '../../common/js/provinces'
  import {modifyBaseInfo} from '../../api/jobseeker/jobseeker'
  import MutationTypes from '../../store/mutation-types'

  export default {
    data() {
      return {
        baseInfo: {
          name: '',
          birthday: '',
          phone: '',
          email: '',
          sex: '1',
          address: []
        },
        props: {
          value: 'label',
          children: 'cities'
        },
        options: []
      }
    },
    mounted() {
      let options = [];
      provinces.forEach((province) => {
        options.push({
          label: province.provinceName,
          value: province.provinceName,
          cities: []
        })
      });
      this.options = options;
      let jobSeekerInfo = this.$store.getters.jobSeekerInfo;
      if (jobSeekerInfo) {
        this.baseInfo.name = jobSeekerInfo.name;
        this.baseInfo.birthday = jobSeekerInfo.birthday;
        this.baseInfo.phone = jobSeekerInfo.phone;
        this.baseInfo.email = jobSeekerInfo.email;
        if (jobSeekerInfo.address) {
          let address = jobSeekerInfo.address.split('-');
          this.handleItemChange(address);
          this.baseInfo.address = address;
        }
        this.jobSeekerInfo = jobSeekerInfo;
      }
    },
    methods: {
      handleItemChange(val) {
        let index = provinces.findIndex((province) => {
          return val[0] === province.provinceName;
        });
        if (index !== -1 && this.options[index].cities.length === 0) {
          let cities = [];
          provinces[index].cities.forEach((city) => {
            cities.push({
              label: city.cityName,
              value: city.cityName
            })
          });
          this.options[index].cities = cities;
        }
      },
      next() {
        let {name, birthday, email, address, sex} = this.baseInfo;
        if (!name || !birthday || !email || [] === address) {
          this.showMessage('请输入完整的内容', 'error')
        } else {
          address = `${address[0]}-${address[1]}`;
          let jobSeekerInfo = this.jobSeekerInfo;
          if (jobSeekerInfo.name === name &&
            jobSeekerInfo.birthday === birthday &&
            jobSeekerInfo.email === email &&
            jobSeekerInfo.address === address &&
            jobSeekerInfo.sex === sex) {
            this.$router.push({path: '/add-resume/job-intention'});
            return;
          }
          birthday = typeof birthday !== 'string' ? birthday.toLocaleDateString() : birthday;
          modifyBaseInfo(jobSeekerInfo._id, name, birthday, email, address, sex)
            .then(data => {
              if (data.status === 0 && data.data && data.data.ok === 1) {
                jobSeekerInfo.name = name;
                jobSeekerInfo.birthday = birthday;
                jobSeekerInfo.email = email;
                jobSeekerInfo.address = address;
                jobSeekerInfo.sex = sex;
                this.jobSeekerInfo = jobSeekerInfo;
                this.showMessage('修改基本信息成功');
                this.$router.push({
                  path: '/add-resume/job-intention'
                })
              } else {
                this.showMessage('修改基本信息失败，请稍后重试', 'error')
              }
            })
            .catch(() => {
              this.showMessage('修改基本信息失败，请稍后重试', 'error')
            })
        }
      },
      showMessage(message, type = 'success') {
        this.$message({
          type,
          message
        })
      },
      changeFile() {
        return this.$refs.file.click();
      },
      onFileChange(ev) {
        if (ev.target.files.length > 0) {
          let file = ev.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.$refs.avatar.src = reader.result;
          }
        }
      }
    },
    beforeDestroy() {
      this.jobSeekerInfo && this.$store.commit(MutationTypes.SET_JOB_SEEKER_INFO, this.jobSeekerInfo);
    }
  }
</script>
