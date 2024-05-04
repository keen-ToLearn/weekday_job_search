import * as actionTypes from './actionTypes';

export const JobSearch = (state = {
        loading: true,
        jobs: []
    }, action) => {
    switch(action.type) {
        case actionTypes.JOBS_LOADING:
            return { ...state, loading: true, jobs: [] }
        case actionTypes.ADD_JOBS:
            let jobList = action.payload
            if(!jobList) // checking if payload is null
                jobList = []
            return { ...state, loading: false, jobs: jobList }
        default:
            return state
    }
}