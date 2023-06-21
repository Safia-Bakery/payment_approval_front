import Container from "components/Container";
import InputBlock from "components/Input";
import useUserRoles from "hooks/useUserRoles";
import useUserByID from "hooks/useUserByID";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import updateUser from "hooks/mutation/updateUserMutation";
import useUsers from "hooks/useUsers";
import Loading from "components/Loader";

const EditUser = () => {
  const { data: roles } = useUserRoles({});
  const { id } = useParams();
  const { data: user, isLoading } = useUserByID({ id: Number(id) });
  const [userRole, $userRole] = useState("");
  const { mutate } = updateUser();
  const navigate = useNavigate();
  const { refetch } = useUsers({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      mutate(
        { user_id: user?.id, role: userRole },
        {
          onSuccess: () => {
            refetch();
            navigate("/users");
          },
        },
      );
    }
  };

  if (isLoading) return <Loading />;
  return (
    <Container>
      <h1>Изменить</h1>
      <div className="d-flex flex-column">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 form-group">
              <InputBlock disabled className="form-control" value={user?.username} label="ФИО" />
            </div>
            <div className="col-md-6 form-group">
              <label>РОЛЬ</label>
              <select
                className="form-select"
                onChange={e => $userRole(e.target.value)}
                aria-label="Default select example">
                {roles?.length &&
                  roles.map(dep => (
                    <option selected={dep === user?.role} key={dep} value={dep}>
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
