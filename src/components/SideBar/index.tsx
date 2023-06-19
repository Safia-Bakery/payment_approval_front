import "./index.scss";

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
  return (
    <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
      <div className="sidebar-wrapper">
        <div className="logo">
          <a href="http://www.creative-tim.com" className="simple-text">
            Creative Tim
          </a>
        </div>
        <ul className="nav">
          {superUserArr.map(item => (
            <li key={item.url}>
              <a className="nav-link" href={item.url}>
                {/* <i className="nc-icon nc-chart-pie-35"></i> */}
                <img src={item.icon} alt="" className="sidebarIcon" />
                <p>{item.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
