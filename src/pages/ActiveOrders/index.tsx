import Container from "components/Container";
import useOrders from "hooks/useOrders";
import { numberWithCommas } from "utils/helpers";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/utils/types";
import { roleSelector } from "redux/reducers/authReducer";
import { Roles, Status } from "utils/types";
import orderStatusMutation from "hooks/mutation/orderStatusMutation";

const ActiveOrders = () => {
  const navigate = useNavigate();
  const { data: orders, refetch } = useOrders({});
  const createOrder = () => navigate("/");
  const role = useAppSelector(roleSelector);
  const { mutate } = orderStatusMutation();

  const handleNavigate = (id: number) => () => navigate(`/order/${id}`);
  const handleStatus = (body: { order_id: number; status: Status }) => () => {
    mutate(body, { onSuccess: () => refetch() });
  };

  const column = [
    "#",
    "заказщик",
    "отдел",
    "Названия товара",
    "Цена",
    "статус",
    role !== Roles.purchasing ? "дествия" : "",
  ];

  return (
    <Container>
      <div className="d-flex flex-column">
        <h1>Активные заказы</h1>
        <button onClick={createOrder} className={`btn btn-info btn-fill mb-4 ${styles.btn}`}>
          Создать
        </button>
      </div>
      <div className="content table-responsive table-full-width">
        <table className="table table-hover table-striped">
          <thead>
            {column.map(name => (
              <th className="text-capitalize" key={name}>
                {name}
              </th>
            ))}
          </thead>
          <tbody>
            {orders?.length ? (
              orders?.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.purchaser}</td>
                  <td>{order.category_id}</td>
                  <td>{order.product}</td>
                  <td>{numberWithCommas(order.price)}</td>
                  <td>{order.status}</td>
                  {role !== Roles.purchasing ? (
                    <>
                      <td className="d-flex gap-2 align-items-center">
                        <button
                          onClick={handleStatus({
                            order_id: order.id,
                            status: Status.accepted,
                          })}
                          type="button"
                          className="btn btn-success">
                          Принять
                        </button>
                        <button
                          onClick={handleStatus({
                            order_id: order.id,
                            status: Status.denied,
                          })}
                          type="button"
                          className="btn btn-danger">
                          Отклонить
                        </button>
                        <div className="mx-2" />
                        <div className={styles.viewBtn} onClick={handleNavigate(order.id)}>
                          <img className={styles.viewImg} src="/assets/icons/edit.svg" alt="edit" />
                        </div>
                      </td>
                    </>
                  ) : (
                    <td />
                  )}
                </tr>
              ))
            ) : (
              <h2>list empty</h2>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ActiveOrders;
