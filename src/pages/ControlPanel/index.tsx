import { useAppSelector } from "redux/utils/types";
import styles from "./index.module.scss";
import { roleSelector, tokenSelector } from "redux/reducers/authReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ControlPanel = () => {
  const me = useAppSelector(roleSelector);
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div className={styles.card}>
      <div className="header text-center">
        <h4 className="title m-0">Добро пожаловать {me?.username}</h4>
        <p className={styles.category}>{me?.role}</p>
      </div>
    </div>
  );
};

export default ControlPanel;
