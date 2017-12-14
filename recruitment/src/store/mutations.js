/**
 * Created by Logan on 2017/10/28.
 */
import MutationTypes from './mutation-types';

const mutations = {
  [MutationTypes.SET_JOB_SEEKER_INFO](state, jobSeekerInfo) {
    state.jobSeekerInfo = jobSeekerInfo;
  },
  [MutationTypes.SET_RESUME](state, resume) {
    state.resume = resume;
  }
};
export default mutations;
