import Container from "components/Container";
import InputBlock from "components/Input";
import useUserRoles from "hooks/useUserRoles";
import useUserByID from "hooks/useUserByID";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useState } from "react";
import updateUser from "hooks/mutation/updateUserMutation";
import useUsers from "hooks/useUsers";
import Loading from "components/Loader";
import { errorToast, successToast } from "utils/toast";
import { StatusRoles } from "utils/types";

const EditUser = () => {
  const { data: roles } = useUserRoles({});
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    refetch: userRefetch,
  } = useUserByID({ id: Number(id), enabled: !!id });
  const [userRole, $userRole] = useState<StatusRoles>();
  const { mutate } = updateUser();
  const navigate = useNavigate();
  const { refetch } = useUsers({});

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    $userRole(e.target.value as StatusRoles);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && userRole) {
      mutate(
        { user_id: user?.id, role: userRole },
        {
          onSuccess: () => {
            refetch();
            navigate("/users");
            successToast("Изменено успешно");
          },
          onError: (error: any) => errorToast(error.toString()),
        },
      );
    }
  };

  useLayoutEffect(() => {
    userRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    $userRole(user?.role);
  }, [user?.role]);

  if (isLoading) return <Loading />;
  return (
    <Container>
      <h1>Изменить</h1>
      <div className="d-flex flex-column">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 form-group">
              <InputBlock disabled className="form-control" value={user?.username} label="Логин" />
            </div>
            <div className="col-md-6 form-group">
              <label>РОЛЬ</label>
              <select
                className="form-select"
                onChange={handleSelect}
                aria-label="Default select example">
                {roles &&
                  Object.keys(roles).map(dep => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button type="submit" className={`btn btn-info btn-fill pull-right`}>
            Сохранить
          </button>
        </form>
      </div>
    </Container>
  );
};

export default EditUser;
