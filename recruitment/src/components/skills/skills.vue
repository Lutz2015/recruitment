<template>
  <div class="skills">
    <el-form :inline="true">
      <el-form-item label="技能">
        <el-input placeholder="请输入技能" v-model="skill"></el-input>
      </el-form-item>
      <el-form-item label="熟练度">
        <el-select v-model="level">
          <el-option label="了解" value="1"></el-option>
          <el-option label="熟悉" value="2"></el-option>
          <el-option label="掌握" value="3"></el-option>
          <el-option label="精通" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="addSkill">增加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="skills">
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="skill" label="技能">
      </el-table-column>
      <el-table-column label="熟练度" width="340">
        <template slot-scope="rows">
          <skill-progress :progress="getSkillLevel(rows.row)" bgColor="gray"></skill-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="rows">
          <el-button @click="deleteRow(rows.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import SkillProgress from '../../components/progress/progress.vue'

  export default {
    data() {
      return {
        skill: '',
        level: '',
        skills: []
      }
    },
    methods: {
      addSkill() {
        let skill = this.skill;
        let level = this.level;
        if (!skill || !level) {
          this.$message({message: '请输入完整的信息', type: 'error'})
        } else {
          this.skills.push({skill, level})
        }
      },
      getSkillLevel(row) {
        let level;
        switch (row.level) {
          case "1":
            level = 0.25;
            break;
          case "2":
            level = 0.5;
            break;
          case "3":
            level = 0.75;
            break;
          case "4":
            level = 1;
            break;
        }
        return level;
      }
    },
    components: {
      SkillProgress
    }
  }
</script>
