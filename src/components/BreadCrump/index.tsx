import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import styles from "./index.module.scss";
import { FC } from "react";
import { logoutHandler, roleSelector } from "redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "redux/utils/types";

interface Breadcrumb {
  path: string;
  name: string;
}

const routeNameMappings: { [key: string]: string } = {
  "create-order": "create",
  "active-orders": "active",
  home: "Главная",
  order: "Заявка",
  map: "Карта",
  "history-orders": "history",
  add: "Добавить",
  edit: "Изменить",
};

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutHandler());
    window.location.reload();
  };
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
