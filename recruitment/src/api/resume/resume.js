import Axios from 'axios'

export function addResume(jobSeekerId) {
  return new Promise((resolve, reject) => {
    Axios.post('/resumes/addResume', {jobSeekerId})
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}


export function modifyJobIntention(resumeId, lowSalary, highSalary, typeOfWork, jobName, summary) {
  return new Promise((resolve, reject) => {
    Axios.post('/resumes/modifyJobIntention', {
      resumeId, lowSalary, highSalary, typeOfWork, jobName, summary
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteResume(resumeId) {
  return new Promise((resolve, reject) => {
    Axios.post('/resumes/deleteResume', {resumeId})
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function modifyResumeName(resumeId, name) {
  return modifyResume(resumeId, name, 'resumeName')
}

export function modifyEducations(resumeId, educations = []) {
  return modifyResume(resumeId, educations, 'educations')
}

export function modifyWorks(resumeId, works = []) {
  return modifyResume(resumeId, works, 'works')
}

export function modifyProjects(resumeId, projects = []) {
  return modifyResume(resumeId, projects, 'projects')
}

export function modifyHonors(resumeId, honors = []) {
  return modifyResume(resumeId, honors, 'honors')
}

export function modifyEvaluation(resumeId, evaluation) {
  return modifyResume(resumeId, evaluation, 'evaluation')
}

function modifyResume(resumeId, data, key) {
  if (key !== 'resumeName' && key !== 'evaluation') {
    data = JSON.stringify(data);
  }
  return new Promise((resolve, reject) => {
    Axios.post('/resumes/modifyResume', {
      resumeId,
      key,
      data
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getResumes(jobSeekerId) {
  return new Promise((resolve, reject) => {
    Axios.get('/resumes/getResumes', {
      params: {jobSeekerId}
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
