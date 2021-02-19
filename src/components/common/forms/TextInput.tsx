import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { TextField, Tooltip } from '@material-ui/core';

interface IProps extends FieldRenderProps<string, HTMLElement> {
  toolTip?: string;
}

export const TextInput: React.FC<IProps> = ({
  input: { ...inputProps },
  toolTip,
  meta: { error, touched },
  ...otherProps
}) => {
  if (toolTip) {
    return (
      <Tooltip title={toolTip}>
        <TextField
          error={touched && !!error}
          {...inputProps}
          {...otherProps}
          helperText={touched ? error : undefined}
        />
      </Tooltip>
    );
  }
  return (
    <TextField
      error={touched && !!error}
      {...inputProps}
      {...otherProps}
      helperText={touched ? error : undefined}
    />
  );
};
