import { StatusRoles } from "./types";

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

export const handleStatus = (status: StatusRoles) => {
  switch (status) {
    case StatusRoles.accountant:
      return "Бухгалтерия";
    case StatusRoles.fin:
      return "Финансовый отдел";
    case StatusRoles.purchasing:
      return "Отдел закупа";
    case StatusRoles.musa:
      return "Руководитель отдела закупа";
    case StatusRoles.shakhzod:
      return "Директор производства";
    case StatusRoles.begzod:
      return "Директор розницы";
    case StatusRoles.paid:
      return "Оплачен";
    case StatusRoles.denied:
      return "Отказан";

    default:
      return "Роль не выбран";
  }
};
