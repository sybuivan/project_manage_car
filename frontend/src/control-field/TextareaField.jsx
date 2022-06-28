import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

function TextareaField(props) {
  // eslint-disable-next-line object-curly-newline
  const { name, errors, control, type, placeholder, rows } = props;

  return (
    <Controller
      name={name}
      control={control}
      width="100%"
      sx={{ fontSize: '1.4rem!important' }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          fullWidth
          sx={{ height: '9.5rem' }}
          variant="outlined"
          rows={rows}
          multiline
          onChange={onChange}
          onBlur={onBlur}
          value={value == null ? '' : value}
          type={type}
          placeholder={placeholder}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

TextareaField.propTypes = {};

export default TextareaField;
