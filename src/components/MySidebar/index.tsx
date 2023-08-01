import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import styles from "./index.module.scss";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import cl from "classnames";
import { StatusRoles } from "utils/types";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import { roleSelector } from "redux/reducers/authReducer";
import { sidebarHandler, toggleSidebar } from "redux/reducers/toggleReducer";
import { useEffect } from "react";

const purchasing = [
  {
    name: "История Заказов",
    url: "/history-orders",
    icon: "/assets/icons/historyOrder.svg",
  },
  {
    name: "Создать Заказ",
    url: "/create-order",
    icon: "/assets/icons/order.svg",
  },
];

const overhead = [
  {
    name: "Активные Заказы",
    url: "/active-orders",
    icon: "/assets/icons/activeOrder.svg",
  },
];

const approvers = [
  {
    name: "Активные Заказы",
    url: "/active-orders",
    icon: "/assets/icons/activeOrder.svg",
  },
  {
    name: "История Заказов",
    url: "/history-orders",
    icon: "/assets/icons/historyOrder.svg",
  },
];

const superAdmins = [
  {
    name: "Создать Заказ",
    url: "/create-order",
    icon: "/assets/icons/order.svg",
  },
  {
    name: "Активные Заказы",
    url: "/active-orders",
    icon: "/assets/icons/activeOrder.svg",
  },
  {
    name: "История Заказов",
    url: "/history-orders",
    icon: "/assets/icons/historyOrder.svg",
  },
  {
    name: "Пользователи",
    url: "/users",
    icon: "/assets/icons/user.svg",
  },
];

const CustomSidebar = () => {
  const me = useAppSelector(roleSelector);
  const collapsed = useAppSelector(toggleSidebar);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth < 991) dispatch(sidebarHandler(false));
  }, [pathname]);

  const handleOverlay = () => dispatch(sidebarHandler(!collapsed));

  const routeArr = () => {
    switch (me?.role) {
      case StatusRoles.purchasing:
        return purchasing;
      case StatusRoles.superadmin:
        return superAdmins;
      case StatusRoles.nakladnoy:
        return overhead;

      default:
        return approvers;
    }
  };

  const matchUrl = (route: string) => useMatch(route);

  return (
    <Sidebar
      backgroundColor="#9368E9"
      className={cl(styles.sidebar, { [styles.collapsed]: collapsed })}
      rootStyles={{
        color: "white",
        height: "100%",
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}>
      <div className="w-100 d-flex flex-column">
        <h3 className="pointer mb-0 pl-2">FIN</h3>
        <p className={cl("mb-0 pl-2 ", styles.descr)}>
          <small>Finance management</small>
        </p>
      </div>
      <Menu
        menuItemStyles={{
          subMenuContent: ({ level }) => ({
            backgroundColor: level === 0 ? "#9368E9" : "transparent",
          }),
        }}>
        {collapsed && <div className={styles.overlay} onClick={handleOverlay} />}
        <MenuItem
          icon={
            <img
              alt="control-panel"
              height={30}
              width={30}
              src={"/assets/icons/controlPanel.svg"}
            />
          }
          className={cl(styles.menuItem, {
            [styles.active]: matchUrl("/"),
          })}
          component={<NavLink to={"/"} onClick={handleOverlay} />}>
          Панель управления
        </MenuItem>
        {!!routeArr()?.length &&
          routeArr()?.map(item => {
            const isActive = !!item.url && !!useMatch(item.url);
            return (
              <MenuItem
                key={item.name + item.url}
                icon={<img alt={item.name} height={30} width={30} src={item.icon || ""} />}
                className={cl(styles.menuItem, {
                  [styles.active]: isActive,
                })}
                onClick={() => dispatch(sidebarHandler(false))}
                component={<NavLink to={item.url || ""} />}>
                {item.name}
              </MenuItem>
            );
          })}
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
