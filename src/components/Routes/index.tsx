import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import {
  logoutHandler,
  roleHandler,
  roleSelector,
  tokenSelector,
} from "redux/reducers/authReducer";
import CreateOrder from "pages/CreateOrder";
import Login from "pages/Login";
import ActiveOrders from "pages/ActiveOrders";
import HistoryOrders from "pages/HistoryOrders";
import { useLayoutEffect } from "react";
import useCategories from "hooks/useCategories";
import Users from "pages/Users";
import EditUser from "pages/EditUser";
import ShowOrder from "pages/ShowOrder";
import useToken from "hooks/useToken";
import { StatusRoles } from "utils/types";
import CustomSidebar from "components/MySidebar";
import ControlPanel from "pages/ControlPanel";
import Breadcrumbs from "../BreadCrump";

const Navigation = () => {
  const token = useAppSelector(tokenSelector);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: me, isError, error } = useToken({ enabled: !!token });
  const meLocal = useAppSelector(roleSelector);

  useLayoutEffect(() => {
    if (!token) navigate("/login");
    if (isError || error) dispatch(logoutHandler());
    if (me) dispatch(roleHandler(me));
  }, [token, isError, me, error]);

  useCategories({ enabled: !!token });

  const renderRoutes = () => {
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
    }
    return (
      <>
        <Route element={<ActiveOrders />} path="/active-orders" />
        <Route element={<ShowOrder />} path="/order/:id" />
      </>
    );
  };

  return (
    <>
      {!!token && !!meLocal && (
        <>
          <Breadcrumbs />
          <CustomSidebar />
        </>
      )}
      <Routes>
        <Route element={<ControlPanel />} path="/" />
        <Route element={<Login />} path="/login" />
        {me?.role !== StatusRoles.nakladnoy && (
          <Route element={<HistoryOrders />} path="/history-orders" />
        )}

        {renderRoutes()}
      </Routes>
    </>
  );
};

export default Navigation;
