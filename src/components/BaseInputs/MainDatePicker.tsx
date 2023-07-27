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
}

const MainDatePicker: FC<Props> = ({ className, selected, register, onChange }) => {
  return (
    <DatePicker
      onChange={onChange}
      selected={selected}
      timeFormat="p"
      dateFormat="Pp"
      showTimeSelect
      timeIntervals={10}
      wrapperClassName="form-group"
      className={cl("form-control", className)}
      {...register}
    />
  );
};

export default MainDatePicker;
