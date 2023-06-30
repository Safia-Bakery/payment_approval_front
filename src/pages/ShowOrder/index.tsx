import { BASE_URL } from "api/apiClient";
import Container from "components/Container";
import Loading from "components/Loader";
import dayjs from "dayjs";
import { useOrder } from "hooks/userOrder";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";

const ShowOrder = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useOrder({ id: Number(id) });

  if (isLoading) return <Loading />;
  return (
    <Container>
      <h1>Заказ #{id}</h1>
      <table className={`table table-striped table-bordered detail-view ${styles.orderTable}`}>
        <tbody>
          <tr>
            <th>отдел</th>
            <td>{order?.category.name}</td>
          </tr>
          <tr>
            <th>заказчик</th>
            <td>{order?.purchaser}</td>
          </tr>
          <tr>
            <th>Название товара</th>
            <td>{order?.product}</td>
          </tr>
          <tr>
            <th>Цена (UZS)</th>
            <td>{order?.price}</td>
          </tr>
          <tr>
            <th>тип оплаты</th>
            <td>{order?.payment_type}</td>
          </tr>
          <tr>
            <th>Платильщик</th>
            <td>{order?.payer}</td>
          </tr>
          <tr>
            <th>Поставщик</th>
            <td>{order?.seller}</td>
          </tr>
          <tr>
            <th>Срок</th>
            <td>
              {dayjs(order?.delivery_time).format("DD-MMM-YYYY")} {order?.urgent && "срочно"}
            </td>
          </tr>
          <tr>
            <th>Комментарии</th>
            <td>{order?.description}</td>
          </tr>
        </tbody>
      </table>
      {order?.image && (
        <div className="d-flex flex-column">
          <h2>Картинки</h2>
          <div className={styles.image}>
            <a href={`${BASE_URL}/${order.image}`} target="_blank" rel="noreferrer">
              {order.image}
            </a>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShowOrder;
