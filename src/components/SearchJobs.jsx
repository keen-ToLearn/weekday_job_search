import { FilterAlt } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../redux/actionCreators';
import '../styles/searchJobs.css';
import JobFilters from './searchJobs/JobFilters';
import JobsView from './searchJobs/JobsView';

// makes redux store state available as props
const mapStateToProps = state => {
    return {
        jobs: state.jobSearch.jobs,
        loading: state.jobSearch.loading,
        count: state.jobSearch.count
    }
}
// makes action creators or thunks available as props
const mapDispatchToProps = dispatch => ({
    fetchJobs: range => dispatch(fetchJobs(range))
})

const SearchJobs = props => {
    const [viewFilter, setViewFilter] = useState(true)
    const [jobFilters, setJobFilters] = useState({
        role: [],
        exp: '',
        mode: [],
        location: '',
        tech: [],
        pay: '',
        company: ''
    })
    const [jobOffset, setJobOffset] = useState(10)

    const updateFilters = (key, value, applying) => {
        let update = value
        if(!applying)
            update = [ ...jobFilters[key] ].filter(val => val !== update)
        if(applying && ['role', 'mode', 'tech'].includes(key))
            update = [ ...jobFilters[key], update ]
        setJobFilters(jobFilters => ({ ...jobFilters, [key]: update }))
    }

    const resetFilter = key => {
        let update = ''
        if(['role', 'mode', 'tech'].includes(key))
            update = []
        setJobFilters(jobFilters => ({ ...jobFilters, [key]: update }))
    }

    // fetch jobs as per limit and offset
    const triggerJobFetch = (limit, offset) => {
        props.fetchJobs({ limit, offset })
    }

    const scrollPositionJobFetcher = () => {
        // return if scroll has not reached bottom
        if(Math.abs(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) > 1)
            return
        triggerJobFetch(10, jobOffset)
        setJobOffset(jobOffset + 10)
    }

    useEffect(() => { triggerJobFetch(10, 0) }, [])

    useEffect(() => {
        window.addEventListener('scroll', scrollPositionJobFetcher)
        return () => window.removeEventListener('scroll', scrollPositionJobFetcher)
    }, [props.loading])

    return(
        <>
        <div className='filterBox'>
            <div className='titleBox'>
                <Badge badgeContent={props.count} max={props.count + 1} color='primary'>
                    <span className='titleBadgeText'>Search jobs</span>
                </Badge>
                <FilterAlt className='smallScreenFilterIcon' onClick={() => setViewFilter(!viewFilter)} />
            </div>
            {viewFilter &&
            <JobFilters jobFilters={jobFilters} resetFilter={key => resetFilter(key)}
                updateFilters={(key, value, applying) => updateFilters(key, value, applying)}/>}
        </div>
        <JobsView jobFilters={jobFilters} jobs={props.jobs}/>
        {props.loading &&
        <div className='loadBox'><h2>Loading...</h2></div>}
        </>
    )
}

export default (connect(mapStateToProps, mapDispatchToProps)(SearchJobs));