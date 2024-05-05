import * as actionTypes from './actionTypes';

export const JobSearch = (state = {
        loading: true,
        jobs: [],
        count: null
    }, action) => {
    switch(action.type) {
        case actionTypes.JOBS_LOADING:
            return { ...state, loading: true, jobs: [], count: null }
        case actionTypes.ADD_JOBS:
            let newJobs = action.payload.jdList

            // checking if payload is not null
            if(newJobs) {
                newJobs = [ ...state.jobs, ...newJobs ]
                return { ...state, loading: false, jobs: newJobs, count: action.payload.totalCount }
            }
            
            return { ...state, loading: false }
        default:
            return state
    }
}