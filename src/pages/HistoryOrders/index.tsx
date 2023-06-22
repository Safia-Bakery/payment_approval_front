import Container from "components/Container";
import { numberWithCommas } from "utils/helpers";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import useOrders from "hooks/useOrders";
import { useAppSelector } from "redux/utils/types";
import { roleSelector } from "redux/reducers/authReducer";
import { Roles } from "utils/types";
import Loading from "components/Loader";

const column = ["#", "заказщик", "отдел", "Названия товара", "Цена", "статус"];

const HistoryOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useOrders({ history: true });
  const handleNavigate = (id: number) => () => navigate(`/order/${id}`);
  const role = useAppSelector(roleSelector);

  if (isLoading) return <Loading />;
  return (
    <Container>
      <h1>История Заказов</h1>
      <div className="content table-responsive table-full-width">
        <table className="table table-hover table-striped">
          <thead>
            {column.map(name => (
              <th className="text-capitalize" key={name}>
                {name}
              </th>
            ))}
          </thead>
          {orders?.length && (
            <tbody>
              {orders?.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.purchaser}</td>
                  <td>{order.category}</td>
                  <td>{order.product}</td>
                  <td>{numberWithCommas(order.price)}</td>
                  <td>{order.status}</td>
                  {role !== Roles.purchasing && (
                    <td>
                      <div className={styles.viewBtn} onClick={handleNavigate(order.id)}>
                        <img className={styles.viewImg} src="/assets/icons/edit.svg" alt="edit" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!orders?.length && (
          <div className="w-100">
            <h2 className="text-center w-100 ">Спосок пуст</h2>
          </div>
        )}
      </div>
    </Container>
  );
};

export default HistoryOrders;
