import { ClearRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Autocomplete, Chip, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import '../../styles/jobFilters.css';
import { filterTypes } from '../../utilities/filterTypes';

const RoleListPaper = props => {
    return <Paper {...props} className='roleListBox' />
}

const JobFilters = props => {
    const [fieldOpen, setFieldOpen] = useState({
        role: false,
        exp: false,
        mode: false,
        tech: false,
        pay: false
    })

    // to control field pop up open/close state
    const changeFieldOpen = (key, state) => {
        setFieldOpen(fieldOpen => ({ ...fieldOpen, [key]: state}))
    }

    const triggerFilterUpdate = (key, value, applying) => {
        // applying true - setting filter, false - removing filter
        if(applying)
            changeFieldOpen(key, false)
        props.updateFilters(key, value, applying)
    }

    const fieldClearIconClick = (event, key) => {
        props.resetFilter(key)
        changeFieldOpen(key, false)

        if(key === 'role')
            props.resetFilter('tech')
        
        event.preventDefault()
        event.stopPropagation()
    }

    return(
        <div className='jobFilterBox'>
            {/* Role Filter field */}
            <div className='filterItemBox'>
                <label htmlFor='roleFilter'
                    className={`filterLabel${props.jobFilters.role.length === 0 ? 'Invisible' : ''}`}>
                    Roles
                </label>
                <Autocomplete
                    open={fieldOpen.role}
                    id='roleFilter'
                    size='small'
                    multiple
                    noOptionsText='No options'
                    popupIcon={<ExpandMoreRounded/>}
                    clearIcon={<ClearRounded className='clearIcon' onClick={event => fieldClearIconClick(event, 'role')}/>}
                    options={filterTypes.role.flatMap(category => [ ('#' + category.category + '#'), ...category.types ])}
                    filterSelectedOptions
                    renderOption={(props, option) => (
                        <MenuItem {...props}
                            disabled={option.startsWith('#') && option.endsWith('#')}
                            onClick={() => triggerFilterUpdate('role', option, true)}>
                            <Typography
                                variant='inherit'
                                className={`optionItem${option.startsWith('#') && option.endsWith('#')? 'AllUpper' : ''}`}>
                                {option.startsWith('#') && option.endsWith('#') ? option.slice(1, -1) : option}
                            </Typography>
                        </MenuItem>
                    )}
                    value={props.jobFilters.role}
                    renderInput={params => (
                        <TextField {...params}
                            placeholder={props.jobFilters.role.length === 0 ? 'Roles' : ''}
                            sx={{ '& input::placeholder': { fontSize: '90%' } }}
                            onClick={() => changeFieldOpen('role', true)}
                            onChange={() => changeFieldOpen('role', true)}
                            onFocus={() => changeFieldOpen('role', true)}
                            onBlur={() => changeFieldOpen('role', false)}/>
                    )}
                    renderTags={(value, getTagProps) => value.map((option, index) => (
                        <Chip {...getTagProps({ index })}
                            size='small'
                            label={option}
                            sx={{ textTransform: 'capitalize', borderRadius: 1 }}
                            deleteIcon={<ClearRounded className='chipClearIcon'/>}
                            onDelete={() => triggerFilterUpdate('role', option, false)}/>
                    ))}
                    PaperComponent={RoleListPaper}
                    className='roleInputBox'
                    sx={{ '.MuiAutocomplete-clearIndicator': { marginRight: '2px' } }}
                />
            </div>
            {/* Min Experience field */}
            <div className='filterItemBox'>
                <label htmlFor='expFilter'
                    className={`filterLabel${props.jobFilters.exp.length === 0 ? 'Invisible' : ''}`}>
                    Min Experience
                </label>
                <Autocomplete
                    open={fieldOpen.exp}
                    id='expFilter'
                    size='small'
                    noOptionsText='No options'
                    popupIcon={<ExpandMoreRounded/>}
                    clearIcon={<ClearRounded className='clearIcon' onClick={event => fieldClearIconClick(event, 'exp')}/>}
                    options={filterTypes.exp.map(val => val.toString())}
                    renderOption={(props, option) => (
                        <MenuItem {...props}
                            onClick={() => triggerFilterUpdate('exp', option, true)}>
                            <Typography
                                variant='inherit'
                                className='optionItem'>
                                {option}
                            </Typography>
                        </MenuItem>
                    )}
                    value={props.jobFilters.exp}
                    renderInput={params => (
                        <TextField {...params}
                            placeholder={props.jobFilters.exp.length === 0 ? 'Min Experience' : ''}
                            sx={{ '& input::placeholder': { fontSize: '90%' } }}
                            onClick={() => changeFieldOpen('exp', true)}
                            onChange={() => changeFieldOpen('exp', true)}
                            onFocus={() => changeFieldOpen('exp', true)}
                            onBlur={() => changeFieldOpen('exp', false)}/>
                    )}
                    renderTags={value => value.map(option => (<div>{option}</div>))}
                    PaperComponent={RoleListPaper}
                    className='expInputBox'
                    sx={{ '.MuiAutocomplete-clearIndicator': { marginRight: '2px' } }}
                />
            </div>
            {/* Remote field */}
            <div className='filterItemBox'>
                <label htmlFor='modeFilter'
                    className={`filterLabel${props.jobFilters.mode.length === 0 ? 'Invisible' : ''}`}>
                    Remote
                </label>
                <Autocomplete
                    open={fieldOpen.mode}
                    id='modeFilter'
                    size='small'
                    multiple
                    noOptionsText='No options'
                    popupIcon={<ExpandMoreRounded/>}
                    clearIcon={<ClearRounded className='clearIcon' onClick={event => fieldClearIconClick(event, 'mode')}/>}
                    options={filterTypes.mode}
                    filterSelectedOptions
                    renderOption={(props, option) => (
                        <MenuItem {...props}
                            onClick={() => triggerFilterUpdate('mode', option, true)}>
                            <Typography
                                variant='inherit'
                                className='optionItem'>
                                {option}
                            </Typography>
                        </MenuItem>
                    )}
                    value={props.jobFilters.mode}
                    renderInput={params => (
                        <TextField {...params}
                            placeholder={props.jobFilters.mode.length === 0 ? 'Remote' : ''}
                            sx={{ '& input::placeholder': { fontSize: '90%' } }}
                            onClick={() => changeFieldOpen('mode', true)}
                            onChange={() => changeFieldOpen('mode', true)}
                            onFocus={() => changeFieldOpen('mode', true)}
                            onBlur={() => changeFieldOpen('mode', false)}/>
                    )}
                    renderTags={(value, getTagProps) => value.map((option, index) => (
                        <Chip {...getTagProps({ index })}
                            size='small'
                            label={option}
                            sx={{ textTransform: 'capitalize', borderRadius: 1 }}
                            deleteIcon={<ClearRounded className='chipClearIcon'/>}
                            onDelete={() => triggerFilterUpdate('mode', option, false)}/>
                    ))}
                    PaperComponent={RoleListPaper}
                    className='roleInputBox'
                    sx={{ '.MuiAutocomplete-clearIndicator': { marginRight: '2px' } }}
                />
            </div>
            {/* Location field */}
            <div className='filterItemBox'>
                <label htmlFor='locationFilter'
                    className={`filterLabel${props.jobFilters.location.length === 0 ? 'Invisible' : ''}`}>
                    Location
                </label>
                <TextField size='small' id='locationFilter' name='location'
                    placeholder='Search Location' className='locationInputBox'
                    sx={{ '& input::placeholder': { fontSize: '90%' } }}
                    value={props.jobFilters.location}
                    onChange={event => triggerFilterUpdate('location', event.target.value, true)}/>
            </div>
            {/* Tech field */}
            {props.jobFilters.role.length !== 0 &&
            <div className='filterItemBox'>
                <label htmlFor='techFilter'
                    className={`filterLabel${props.jobFilters.tech.length === 0 ? 'Invisible' : ''}`}>
                    Tech Stack
                </label>
                <Autocomplete
                    open={fieldOpen.tech}
                    id='techFilter'
                    size='small'
                    multiple
                    noOptionsText='No options'
                    popupIcon={<ExpandMoreRounded/>}
                    clearIcon={<ClearRounded className='clearIcon' onClick={event => fieldClearIconClick(event, 'tech')}/>}
                    options={filterTypes.tech}
                    filterSelectedOptions
                    renderOption={(props, option) => (
                        <MenuItem {...props}
                            onClick={() => triggerFilterUpdate('tech', option, true)}>
                            <Typography
                                variant='inherit'
                                className='optionItem'>
                                {option}
                            </Typography>
                        </MenuItem>
                    )}
                    value={props.jobFilters.tech}
                    renderInput={params => (
                        <TextField {...params}
                            placeholder={props.jobFilters.tech.length === 0 ? 'Tech Stack' : ''}
                            sx={{ '& input::placeholder': { fontSize: '90%' } }}
                            onClick={() => changeFieldOpen('tech', true)}
                            onChange={() => changeFieldOpen('tech', true)}
                            onFocus={() => changeFieldOpen('tech', true)}
                            onBlur={() => changeFieldOpen('tech', false)}/>
                    )}
                    renderTags={(value, getTagProps) => value.map((option, index) => (
                        <Chip {...getTagProps({ index })}
                            size='small'
                            label={option}
                            sx={{ textTransform: 'capitalize', borderRadius: 1 }}
                            deleteIcon={<ClearRounded className='chipClearIcon'/>}
                            onDelete={() => triggerFilterUpdate('tech', option, false)}/>
                    ))}
                    PaperComponent={RoleListPaper}
                    className='roleInputBox'
                    sx={{ '.MuiAutocomplete-clearIndicator': { marginRight: '2px' } }}
                />
            </div>}
            {/* Min Pay field */}
            <div className='filterItemBox'>
                <label htmlFor='payFilter'
                    className={`filterLabel${props.jobFilters.pay.length === 0 ? 'Invisible' : ''}`}>
                    Min Base Pay
                </label>
                <Autocomplete
                    open={fieldOpen.pay}
                    id='payFilter'
                    size='small'
                    noOptionsText='No options'
                    popupIcon={<ExpandMoreRounded/>}
                    clearIcon={<ClearRounded className='clearIcon' onClick={event => fieldClearIconClick(event, 'pay')}/>}
                    options={filterTypes.pay.map(val => val.toString())}
                    renderOption={(props, option) => (
                        <MenuItem {...props}
                            onClick={() => triggerFilterUpdate('pay', option, true)}>
                            <Typography
                                variant='inherit'
                                className='optionItem'>
                                {option}
                            </Typography>
                        </MenuItem>
                    )}
                    value={props.jobFilters.pay}
                    renderInput={params => (
                        <TextField {...params}
                            placeholder={props.jobFilters.pay.length === 0 ? 'Min Base Pay Salary' : ''}
                            sx={{ '& input::placeholder': { fontSize: '90%' } }}
                            onClick={() => changeFieldOpen('pay', true)}
                            onChange={() => changeFieldOpen('pay', true)}
                            onFocus={() => changeFieldOpen('pay', true)}
                            onBlur={() => changeFieldOpen('pay', false)}/>
                    )}
                    renderTags={value => value.map(option => (<div>{option}</div>))}
                    PaperComponent={RoleListPaper}
                    className='payInputBox'
                    sx={{ '.MuiAutocomplete-clearIndicator': { marginRight: '2px' } }}
                />
            </div>
            {/* Company field */}
            <div className='filterItemBox'>
                <label htmlFor='companyFilter'
                    className={`filterLabel${props.jobFilters.company.length === 0 ? 'Invisible' : ''}`}>
                    Company name
                </label>
                <TextField size='small' id='companyFilter' name='company'
                    placeholder='Search Company name' className='companyInputBox'
                    sx={{ '& input::placeholder': { fontSize: '90%' } }}
                    value={props.jobFilters.company}
                    onChange={event => triggerFilterUpdate('company', event.target.value, true)}/>
            </div>
        </div>
    )
}

export default JobFilters;