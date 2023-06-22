export const numberWithCommas = (val: number) => {
  return val
    ?.toFixed(2)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fixedString = (value: string) => {
  return value
    .split("")
    .filter(item => {
      return [" ", "-", "(", ")"].indexOf(item) === -1;
    })
    .join("");
};
