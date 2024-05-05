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

    const changeFieldOpen = (key, state) => {
        setFieldOpen({ ...fieldOpen, [key]: state})
    }

    const triggerFilterUpdate = (key, value, applying) => {
        if(applying)
            changeFieldOpen(key, false)
        props.updateFilters(key, value, applying)
    }

    return(
        <div className='jobFilterBox'>
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
                    clearIcon={<ClearRounded className='clearIcon' onClick={() => props.resetFilter('role')}/>}
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
        </div>
    )
}

export default JobFilters;