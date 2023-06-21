import Container from "components/Container";
import dayjs from "dayjs";
import { useOrder } from "hooks/userOrder";
import { useParams } from "react-router-dom";

const ShowOrder = () => {
  const { id } = useParams();
  const { data: order } = useOrder({ id: Number(id) });

  return (
    <Container>
      <h1>Заказ #{id}</h1>
      <table className="table table-striped table-bordered detail-view">
        <tbody>
          <tr>
            <th>отдел</th>
            <td>{order?.category}</td>
          </tr>
          <tr>
            <th>заказщика</th>
            <td>{order?.purchaser}</td>
          </tr>
          <tr>
            <th>Названия товара</th>
            <td>{order?.product}</td>
          </tr>
          <tr>
            <th>Цена</th>
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
          <h2>Images</h2>
          <div className="">
            <img src={order.image} alt="product-img" />
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShowOrder;
