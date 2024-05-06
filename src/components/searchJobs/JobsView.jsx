import { ElectricBolt, Person } from '@mui/icons-material';
import { Avatar, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import '../../styles/jobsView.css';

const JobsView = props => {
    const [isFiltered, setIsFiltered] = useState(false)

    const triggerApply = link => {
        window.open(link)
    }
    
    useEffect(() => {
        // checks whether filters have been applied and sets isFiltered state
        let filtered = true
        if(
            props.jobFilters.role.length === 0 &&
            props.jobFilters.exp === '' &&
            props.jobFilters.mode.length === 0 &&
            props.jobFilters.location === '' &&
            props.jobFilters.tech.length === 0 &&
            props.jobFilters.pay === '' &&
            props.jobFilters.company === ''
        )
            filtered = false
        
        setIsFiltered(filtered)
    }, [props.jobFilters, props.jobs])

    // to check if a job is satisfying any of the filters
    const filterMatch = job => {
        let should = false
        if(
            props.jobFilters.role.includes(job.jobRole) ||
            props.jobFilters.tech.includes(job.jobRole) ||
            props.jobFilters.mode.includes(job.location) ||
            props.jobFilters.mode.includes('in-office') ||
            (props.jobFilters.location !== '' && job.location.includes(props.jobFilters.location)) ||
            (props.jobFilters.companyName !== '' && job.companyName.includes(props.jobFilters.companyName)) ||
            (props.jobFilters.exp !== '' && job.minExp && (Number(props.jobFilters.exp) <= job.minExp)) ||
            (props.jobFilters.pay !== '' && job.minJdSalary && (Number(props.jobFilters.pay) <= job.minJdSalary))
        )
            should = true
        return should
    }

    const jobList = props.jobs.filter(job => !isFiltered || filterMatch(job)).map((job, i) => {
        return(
            <div key={job.jdUid + ':' + i} className='jobCardBox'>
                <Card elevation={3} className='jobCard'>
                    <CardContent>
                        <div className='jobIntroBox'>
                            <div className='jobIconBox'>
                                <img src={job.logoUrl} alt='logo' className='jobIcon'/>
                            </div>
                            <div>
                                <h4 className='jobCompany noMargin'>{job.companyName}</h4>
                                <p className='noMargin'>{job.jobRole}</p>
                                <p className='jobLocation noMargin'>{job.location}</p>
                            </div>
                        </div>
                        <div>
                            <p className='noMargin'>
                                Estimated Salary: {job.salaryCurrencyCode + ' '}
                                {(job.minJdSalary === null ? '???' : job.minJdSalary) + ' - '}
                                {job.maxJdSalary === null ? '???' : job.maxJdSalary}
                            </p>
                        </div>
                        <div className='aboutBox'>
                            <h3 className='noMargin'>About Company:</h3>
                            <p className='noMargin'>{job.jobDetailsFromCompany}</p>
                            <div className='seeMoreBox'>
                                <span className='seeText'>See More</span>
                            </div>
                        </div>
                        <div>
                            <h4 className='jobCompany noMargin'>Minimum Experience</h4>
                            <p className='noMargin'>{job.minExp === null ? '???' : job.minExp} years</p>
                        </div>
                        <div>
                            <button type='button' className='applyButton' onClick={() => triggerApply(job.jdLink)}>
                                <div className='applyButtonBody'>
                                    <div className='applyIconBox'><ElectricBolt sx={{ color: 'goldenrod' }} /></div>
                                    <div><span className='buttonText'>Easy Apply</span></div>
                                </div>
                            </button>
                            <button type='button' className='applyButton referButton'>
                                <div className='applyButtonBody'>
                                    <div className='applyIconBox'>
                                        <Avatar sx={{ height: 28, width: 28 }}>
                                            <Person/>
                                        </Avatar>
                                    </div>
                                    <div><span className='buttonText referText'>Ask for referral</span></div>
                                </div>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    })
    return(
        <div className='jobsViewBox'>
            {jobList}
        </div>
    )
}

export default JobsView;