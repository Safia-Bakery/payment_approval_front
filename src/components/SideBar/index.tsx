import { useState } from "react";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import { logoutHandler, roleSelector } from "redux/reducers/authReducer";
import { Roles } from "utils/types";

const purchasing = [
  {
    name: "createOrder",
    url: "/",
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
];

const superAdmins = [
  {
    name: "Создать Заказ",
    url: "/",
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

const SideBar = () => {
  const dispatch = useAppDispatch();
  const [active, $active] = useState(false);
  const role = useAppSelector(roleSelector);

  console.log(role, "role sidebar");

  // useEffect(() => )

  const handleLogout = () => dispatch(logoutHandler());

  return (
    <>
      <header className="shadow-sm header">
        {!active && (
          <div className="burgerBtn p-3" onClick={() => $active(!active)}>
            <img src="/assets/icons/burger.svg" alt="burger" />
          </div>
        )}
      </header>
      <div className="block" />
      <div className={`sidebar ${active && "active"}`} data-image="../assets/img/sidebar-5.jpg">
        <div className="sidebar-wrapper">
          <div
            onClick={handleLogout}
            className="d-flex text-center justify-content-end px-3 pt-3 font-weight-bold pointer">
            Выйти
            <div className="logout ml-2">
              <img src="/assets/icons/logout.svg" alt="logout" />
            </div>
          </div>

          <ul className="nav mt-2">
            {[...(role === Roles.purchasing ? purchasing : superAdmins)].map(item => (
              <li key={item.url}>
                <a className="nav-link" href={item.url}>
                  <img src={item.icon} alt={item.name} className="sidebarIcon" />
                  <p>{item.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {active && <div className="overlay" onClick={() => $active(!active)} />}
    </>
  );
};

export default SideBar;
