import { SxProps } from "@mui/system";
import { FilledInputProps, TextField, Theme } from "@mui/material";
import React from "react";

interface ComponentProps {
  label?: string;
  value: any;
  setValue?: (value: any) => void;
  onChange?: (value: any) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;

  helperText?: string;

  hasError?: boolean;
  errorText?: string;

  inputProps?: Partial<FilledInputProps>;

  hasMultiline?: boolean;
  variant?: "filled" | "outlined" | "standard";
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  type?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
}

const TextInput = (props: ComponentProps) => {
  const {
    label,
    value,
    setValue,
    sx,
    helperText,
    hasError,
    errorText,
    inputProps,
    hasMultiline = true,
    variant,
    minRows,
    maxRows,
    disabled,
    type,
    name,
    onChange,
    onKeyUp,
    onKeyPress,
    required,
    placeholder,
  } = props;

  const handleChange = (event: any): void => {
    if (onChange) {
      onChange(event);
    }
    if (setValue) {
      setValue(event.target.value);
    }
  };

  const [isShowingHelperText] = React.useState<boolean>(
    !!(helperText || errorText)
  );

  const [computedHelperText, setComputedHelperText] = React.useState<string>(
    helperText || ""
  );

  React.useEffect(() => {
    setComputedHelperText(hasError ? errorText || "" : helperText || "");
  }, [hasError, errorText, helperText]);

  return (
    <>
      <TextField
        id={`${label}-fill-text-input`}
        label={label}
        variant={variant ? variant : "filled"}
        value={value}
        fullWidth
        name={name}
        onChange={handleChange}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        sx={sx}
        helperText={
          isShowingHelperText && computedHelperText ? (
            <>{computedHelperText}</>
          ) : (
            <></>
          )
        }
        FormHelperTextProps={{ variant: "filled" }}
        error={hasError}
        InputProps={inputProps}
        multiline={hasMultiline}
        minRows={minRows}
        maxRows={maxRows}
        disabled={disabled}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInput;
