import Axios from 'axios'

export function modifyBaseInfo(_id, name, birthday, email, address, sex) {
  return new Promise((resolve, reject) => {
    Axios.post('/jobseekers/modifyBaseInfo', {
      _id, name, birthday, email, address, sex
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function login(phone, password) {
  return new Promise((resolve, reject) => {
    Axios.post('/jobseekers/login', {phone, password})
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    Axios.post('/jobseekers/logout')
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function register(phone, password) {
  return new Promise((resolve, reject) => {
    Axios.post('/jobseekers/register', {phone, password})
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function checkPhone(phone) {
  return new Promise((resolve, reject) => {
    Axios.post('/jobseekers/checkPhone', {phone})
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function changeDefaultResume(jobSeekerId, resumeId) {
  return new Promise((resolve, reject) => {
    Axios.post('/jobseekers/changeDefaultResume', {
      jobSeekerId, resumeId
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
