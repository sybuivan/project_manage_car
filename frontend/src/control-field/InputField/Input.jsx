import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

function InputField(props) {
  // eslint-disable-next-line object-curly-newline
  const { type, placeholder, name, errors, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      width="100%"
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          fullWidth
          variant="outlined"
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

InputField.propTypes = {};

export default InputField;
