import * as actionTypes from './actionTypes';

export const JobSearch = (state = {
        loading: true,
        jobs: [],
        count: null
    }, action) => {
    switch(action.type) {
        case actionTypes.JOBS_LOADING:
            return { ...state, loading: true, count: null }
        case actionTypes.ADD_JOBS:
            let newJobs = action.payload.jobs.jdList
            let range = action.payload.range

            // checking if payload is not null
            if(newJobs) {
                newJobs = [
                    ...state.jobs.slice(0, range.offset),
                    ...newJobs,
                    ...state.jobs.slice(range.offset + range.limit)
                ]
                return { ...state, loading: false, jobs: newJobs, count: action.payload.jobs.totalCount }
            }
            
            return { ...state, loading: false }
        default:
            return state
    }
}