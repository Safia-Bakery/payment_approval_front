import { useForm } from "react-hook-form";
import InputBlock from "src/components/Input";
import styles from "./index.module.scss";
import cl from "classnames";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = () => {
    const { user_name, password } = getValues();

    console.log({ user_name, password });
  };
  return (
    <div className={styles.login_wrap}>
      <div className={cl(styles.content, "p-4 shadow bg-white rounded")}>
        <h1 className="text-center mb-3">Login</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <InputBlock
            register={register("user_name", { required: "required" })}
            className="form-control"
            inputType="email"
            placeholder="Username"
            label="Username"
            error={errors.user_name}
          />
          <InputBlock
            register={register("password", { required: "required" })}
            className="form-control"
            placeholder="password"
            inputType="password"
            label="Username"
            error={errors.user_name}
          />

          <button type="submit" className="btn btn-info btn-fill pull-right">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
