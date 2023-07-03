import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required, rules }: any) => {
  const { control } = useFormContext();
  // const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        rules={rules ?? {}}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <TextField
            label={label}
            defaultValue=""
            fullWidth
            required={required}
            error={!!error}
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
            helperText={!!error && error.message}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
