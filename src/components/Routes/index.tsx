import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { useAppSelector } from "redux/utils/types";
import { tokenSelector } from "redux/reducers/authReducer";
import CreateOrder from "pages/CreateOrder";
import Login from "pages/Login";
import ActiveOrders from "pages/ActiveOrders";
import HistoryOrders from "pages/HistoryOrders";
import { useLayoutEffect } from "react";
import useCategories from "hooks/useCategories";

const Navigation = () => {
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  useCategories({ enabled: !!token });

  useLayoutEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);
  return (
    <>
      {token && <SideBar />}
      <Routes>
        <Route element={<CreateOrder />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<ActiveOrders />} path="/active-orders" />
        <Route element={<HistoryOrders />} path="/history-orders" />
      </Routes>
    </>
  );
};

export default Navigation;
