import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';

type RadioFormProps={
  setValue:React.Dispatch<React.SetStateAction<string>>,
  value:string
}

export default function ControlledRadioButtonsGroup(props:RadioFormProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.value}
        onChange={handleChange}
      >
        <FormControlLabel value="student" control={<Radio />} 
        label={<Typography sx={{fontFamily:"Mulish",  fontWeight:"bold"}}>Student</Typography>} />
        <FormControlLabel value="teacher" control={<Radio />} 
        label={<Typography sx={{fontFamily:"Mulish",  fontWeight:"bold"}}>Teacher</Typography>} />
      </RadioGroup>
    </FormControl>
  );
}