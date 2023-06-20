import { useState } from "react";
import "./index.scss";
import { useAppDispatch } from "redux/utils/types";
import { logoutHandler } from "redux/reducers/authReducer";

// const orderArr = [
//   {
//     name: "createOrder",
//     url: "createOrder",
//   },
// ];

const superUserArr = [
  {
    name: "make order",
    url: "/",
    icon: "/assets/icons/order.svg",
  },
  {
    name: "Active Orders",
    url: "active-orders",
    icon: "/assets/icons/activeOrder.svg",
  },
  {
    name: "History Orders",
    url: "history-orders",
    icon: "/assets/icons/historyOrder.svg",
  },
];

const SideBar = () => {
  const dispatch = useAppDispatch();
  const [active, $active] = useState(false);

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
            logout
            <div className="logout ml-2">
              <img src="/assets/icons/logout.svg" alt="logout" />
            </div>
          </div>

          <ul className="nav mt-2">
            {superUserArr.map(item => (
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
