import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import styles from "./index.module.scss";
import { FC } from "react";
import { logoutHandler, roleSelector } from "redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import { sidebarHandler } from "redux/reducers/toggleReducer";
import cl from "classnames";

interface Breadcrumb {
  path: string;
  name: string;
}

const routeNameMappings: { [key: string]: string } = {
  "create-order": "Создать заказ",
  "active-orders": "Активные заказы",
  home: "Главная",
  order: "Заявка",
  map: "Карта",
  "history-orders": "История заказов",
  add: "Добавить",
  edit: "Изменить",
  users: "Пользователи",
};

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logoutHandler());

  const me = useAppSelector(roleSelector);

  const breadcrumbs: Breadcrumb[] = [];

  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  pathSegments.reduce((prevPath, currentPath) => {
    const path = `${prevPath}/${currentPath}`;
    const name = routeNameMappings[currentPath] || currentPath.replace(/-/g, " ");

    breadcrumbs.push({ path, name });

    return path;
  }, "");

  return (
    <div className={styles.block}>
      <Container>
        <div className={styles.container}>
          <ul className={styles.breadcrump}>
            <button
              onClick={() => dispatch(sidebarHandler(true))}
              className={cl("btn p-2 btn-round btn-icon mb-0", styles.btn)}>
              <img
                width={22}
                className="d-flex"
                height={22}
                src="/assets/icons/burger.svg"
                alt="burger"
              />
            </button>
            <div className={styles.titles}>
              <li className="ml-3">
                <Link to="/">Главная</Link>
              </li>
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.path}>
                  {index === breadcrumbs.length - 1 ? (
                    <span>{breadcrumb.name}</span>
                  ) : (
                    <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
                  )}
                </li>
              ))}
            </div>
          </ul>

          <span onClick={handleLogout} className={styles.logout}>
            Выйти ({me?.role})
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
