import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import { logoutHandler, roleHandler, tokenSelector } from "redux/reducers/authReducer";
import CreateOrder from "pages/CreateOrder";
import Login from "pages/Login";
import ActiveOrders from "pages/ActiveOrders";
import HistoryOrders from "pages/HistoryOrders";
import { useLayoutEffect, useMemo } from "react";
import useCategories from "hooks/useCategories";
import Users from "pages/Users";
import EditUser from "pages/EditUser";
import useUserRoles from "hooks/useUserRoles";
import ShowOrder from "pages/ShowOrder";
import useToken from "hooks/useToken";
import { StatusRoles } from "utils/types";
import Home from "pages/Home";

const Navigation = () => {
  const token = useAppSelector(tokenSelector);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: me, isError, error } = useToken({ enabled: !!token });

  useLayoutEffect(() => {
    if (!token) navigate("/login");
    if (isError || error) dispatch(logoutHandler());
    if (me?.role) dispatch(roleHandler(me));
  }, [token, isError, me, error, navigate, dispatch]);

  useCategories({ enabled: !!token });
  useUserRoles({ enabled: !!token });

  const renderRoutes = useMemo(() => {
    if (me?.role === StatusRoles.purchasing)
      return <Route element={<CreateOrder />} path="/create-order" />;

    if (me?.role === StatusRoles.superadmin) {
      return (
        <>
          <Route element={<CreateOrder />} path="/create-order" />
          <Route element={<ActiveOrders />} path="/active-orders" />
          <Route element={<Users />} path="/users" />
          <Route element={<EditUser />} path="/users/:id" />
          <Route element={<ShowOrder />} path="/order/:id" />
        </>
      );
    } else {
      return (
        <>
          <Route element={<ActiveOrders />} path="/active-orders" />
          <Route element={<ShowOrder />} path="/order/:id" />
        </>
      );
    }
  }, [me?.role]);

  return (
    <>
      {token && <SideBar />}
      <Routes>
        {/* <Route element={<Home />} path="/" /> */}
        <Route element={<Home />} path="*" />
        <Route element={<Login />} path="/login" />
        <Route element={<HistoryOrders />} path="/history-orders" />

        {renderRoutes}
      </Routes>
    </>
  );
};

export default Navigation;
