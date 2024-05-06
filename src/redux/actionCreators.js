import * as actionTypes from './actionTypes';

// thunk for fetching jobs
export const fetchJobs = range => dispatch => {
    dispatch(jobsLoading())

    return fetch(window.baseURI + 'adhoc/getSampleJdJSON', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(range)
    })
        .then(response => {
            if(response.ok)
                return response.json()
            else {
                let err = new Error(response.status + ':' + response.statusText)
                err.response = response
                throw err
            }
        },
        error => {
            throw new Error(error.message)
        })
        .then(jobs => dispatch(addJobs(jobs, range)))
        .catch(error => console.log(error.message))
}

// action creator for when jobs are loading
const jobsLoading = () => ({
    type: actionTypes.JOBS_LOADING
})

// action creator for adding the fetched jobs
const addJobs = (jobs, range) => ({
    type: actionTypes.ADD_JOBS,
    payload: { jobs, range }
})