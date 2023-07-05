import { ChangeEvent, FC } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  inputType?: "text" | "password" | "email" | "number" | "date" | "time";
  placeholder?: string | null;
  autoFocus?: boolean;
  onFocus?: () => void;
  disabled?: boolean;
  label?: string;
  register?: Object;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const InputBlock: FC<Props> = ({
  inputType = "text",
  label,
  register,
  placeholder,
  error,
  ...others
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...register} placeholder={placeholder || ""} type={inputType} {...others} />
      {error && (
        <div className="alert alert-danger p-2" role="alert">
          {error?.message?.toString()}
        </div>
      )}
    </div>
  );
};

export default InputBlock;
