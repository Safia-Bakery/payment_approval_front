import { useForm } from "react-hook-form";
import InputBlock from "components/Input";
import styles from "./index.module.scss";
import cl from "classnames";
import loginMutation from "hooks/mutation/loginMutation";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import axios from "axios";
import { loginHandler, tokenSelector } from "redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import useToken from "hooks/useToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);
  const { refetch } = useToken({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate } = loginMutation();

  useLayoutEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  const onSubmit = () => {
    const { username, password } = getValues();
    mutate(
      { username, password },
      {
        onSuccess: ({ data }) => {
          const token = data.access_token;
          axios.defaults.headers["Authorization"] = `Bearer ${token}`;
          dispatch(loginHandler(data.access_token));
          refetch();
          navigate("/");
        },
      },
    );
  };
  return (
    <div className={styles.login_wrap}>
      <div className={cl(styles.content, "p-4 shadow bg-white rounded")}>
        <h1 className="text-center mb-3">Войти</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <InputBlock
            register={register("username", { required: "required" })}
            className="form-control"
            inputType="text"
            placeholder="Логин"
            label="Логин"
            error={errors.username}
          />
          <InputBlock
            register={register("password", { required: "required" })}
            className="form-control"
            placeholder="Пароль"
            inputType="password"
            label="Пароль"
            error={errors.password}
          />

          <button type="submit" className="btn btn-info btn-fill pull-right">
            Логин
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
