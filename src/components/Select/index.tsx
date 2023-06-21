import { FC } from "react";
import Select from "react-select";
interface Props {
  defaultValue: string | undefined;
  onChange: () => void;
  options: string[];
}

const CustomSelect: FC<Props> = ({ options, onChange, defaultValue }) => {
  return (
    <Select
      defaultValue={defaultValue ? defaultValue : "unconfirmed"}
      // onChange={onChange}
      placeholder={"unconfirmed"}
      options={options}
    />
  );
};

export default CustomSelect;
