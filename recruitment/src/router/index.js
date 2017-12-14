import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/index.vue'
import Login from '../pages/login/login.vue'
import Register from '../pages/register/register.vue'
import JobSeeker from '../pages/job-seeker/job-seeker.vue'
import JobSeekerResume from '../components/resume/resume.vue'
import AddResume from '../pages/add-resume/add-resume.vue'
import Preview from '../pages/preview/preview.vue'
// 增加简历
import BaseInfo from '../components/base-info/base-info.vue'
import JobIntention from '../components/job-intention/job-intention.vue'
import Educations from '../components/educations/educations.vue'
import Works from '../components/works/works.vue'
import Projects from '../components/projects/projects.vue'
import Honors from '../components/honors/honors.vue'
import Skills from '../components/skills/skills.vue'
import SelfEvaluation from '../components/self-evaluation/self-evaluation.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/jobSeeker',
      component: JobSeeker,
      children: [
        {
          path: '/',
          component: JobSeekerResume
        }
      ]
    },
    {
      path: '/add-resume',
      component: AddResume,
      children: [
        {
          path: '/',
          component: BaseInfo
        },
        {
          path: 'job-intention',
          component: JobIntention
        },
        {
          path: 'skills',
          component: Skills
        },
        {
          path: 'educations',
          component: Educations
        },
        {
          path: 'works',
          component: Works
        },
        {
          path: 'projects',
          component: Projects
        },
        {
          path: 'honors',
          component: Honors
        },
        {
          path: 'self-evaluation',
          component: SelfEvaluation
        }
      ]
    },
    {
      path: '/preview',
      component: Preview
    }
  ]
})
