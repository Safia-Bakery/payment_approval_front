import { FC } from "react";
import DatePicker from "react-datepicker";
import cl from "classnames";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onChange?: any;
  className?: string;
  value?: string;
  disabled?: boolean;
  register?: Object;
  selected?: Date | null | undefined;
  minDate?: Date | null;
  maxDate?: Date | null;
  maxTime?: Date;
  minTime?: Date;
}

const MainDatePicker: FC<Props> = ({
  className,
  selected,
  register,
  onChange,
  minTime,
  ...others
}) => {
  return (
    <DatePicker
      onChange={onChange}
      selected={selected}
      timeFormat="p"
      dateFormat="Pp"
      showTimeSelect
      minTime={minTime}
      timeIntervals={10}
      wrapperClassName="form-group"
      className={cl("form-control", className)}
      {...register}
      {...others}
    />
  );
};

export default MainDatePicker;
