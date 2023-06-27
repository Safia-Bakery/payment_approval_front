import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import cl from "classnames";
import loginMutation from "hooks/mutation/loginMutation";
import { useAppDispatch, useAppSelector } from "redux/utils/types";
import axios from "axios";
import { loginHandler, tokenSelector } from "redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToken from "hooks/useToken";
import { errorToast, successToast } from "utils/toast";
import InputMask from "react-input-mask";
import { fixedString } from "utils/helpers";

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

  useEffect(() => {
    if (token) navigate("/history-orders");
  }, [navigate, token]);

  const onSubmit = () => {
    const { username, password } = getValues();

    mutate(
      { username: "998" + fixedString(username), password },
      {
        onSuccess: ({ data }) => {
          const token = data.access_token;
          axios.defaults.headers["Authorization"] = `Bearer ${token}`;
          dispatch(loginHandler(data.access_token));
          refetch();
          navigate("/history-orders");
          successToast("Добро пожаловать");
        },
        onError: (error: any) => errorToast(error.toString()),
      },
    );
  };
  return (
    <div className={styles.login_wrap}>
      <div className={cl(styles.content, "p-4 shadow bg-white rounded")}>
        <h1 className="text-center mb-3">Войти</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Логин</label>
            <InputMask
              className="form-control"
              mask="(99) 999-99-99"
              autoFocus
              {...register("username", { required: "required" })}
              alwaysShowMask
            />
          </div>
          <div className="">
            <label>Пароль</label>

            <input
              {...register("password", { required: "required" })}
              className="form-control"
              placeholder="Пароль"
              type="password"
            />

            {errors.password && (
              <div className="alert alert-danger p-2" role="alert">
                {errors.password?.message?.toString()}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-info btn-fill pull-right">
            Логин
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
