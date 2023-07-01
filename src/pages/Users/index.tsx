import Container from "components/Container";
import Loading from "components/Loader";
import useUsers from "hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { handleStatus } from "utils/helpers";

const column = ["#", "Логин", "Имя", "Роль", "Действия"];

const Users = () => {
  const { data: users, isLoading } = useUsers({ enabled: true });
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  return (
    <Container>
      <h1>Пользователи</h1>
      <div className="content table-responsive table-full-width">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              {column.map(name => (
                <th className="font-weight-bold text-dark" key={name}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>

                  <td>{handleStatus(user.role)}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      type="button"
                      className="btn btn-success">
                      edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Users;
