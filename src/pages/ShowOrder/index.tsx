import { BASE_URL } from "api/apiClient";
import Container from "components/Container";
import Loading from "components/Loader";
import dayjs from "dayjs";
import { useOrder } from "hooks/userOrder";
import styles from "./index.module.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useToken from "hooks/useToken";
import { StatusRoles } from "utils/types";
import MainInput from "components/BaseInputs/MainInput";
import { useForm } from "react-hook-form";
import payMutation from "hooks/mutation/payMutation";
import { useEffect } from "react";
import { successToast } from "utils/toast";
import useOrders from "hooks/useOrders";

const ShowOrder = () => {
  const { id } = useParams();
  const { data: order, isLoading, refetch: orderRefetch } = useOrder({ id: Number(id) });
  const { data: me } = useToken({});
  const navigate = useNavigate();
  const { mutate } = payMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const finished = searchParams.get("finished");

  const both = me?.role === StatusRoles.nakladnoy || me?.role === StatusRoles.accountant;
  const acc = me?.role === StatusRoles.accountant;

  const { refetch } = useOrders({ enabled: false });
  const { register, handleSubmit, getValues, reset } = useForm();

  useEffect(() => {
    if (both && !finished) {
      reset({
        nakladnoy: order?.nakladnoy,
      });
    }
  }, [me?.role, order?.amount_paid, order?.nakladnoy]);

  const onSubmit = () => {
    const { amount_paid, nakladnoy } = getValues();
    mutate(
      {
        paid_amount: Number(amount_paid),
        nakladnoy,
        order_id: Number(id),
      },
      {
        onSuccess: () => {
          successToast("Успешно изменено");
          refetch();
          orderRefetch();
          navigate("/active-orders");
        },
      },
    );
  };

  if (isLoading) return <Loading />;
  return (
    <Container>
      <h1>Заказ #{id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className={`table table-striped table-bordered detail-view ${styles.orderTable}`}>
          <tbody>
            <tr>
              <th>отдел</th>
              <td>{order?.category}</td>
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
                {dayjs(order?.delivery_time).format("DD/MM/YYYY")} {order?.urgent && "срочно"}
              </td>
            </tr>
            <tr>
              <th>Комментарии</th>
              <td>{order?.description}</td>
            </tr>

            {!!order?.amount_paid && (
              <tr>
                <th>Оплачен (UZS)</th>
                <td>{order?.amount_paid}</td>
              </tr>
            )}
            {acc && !finished && (
              <tr>
                <th>Оплатить (UZS)</th>
                <td>
                  <MainInput placeholder={"Оплатить"} register={register("amount_paid")} />
                </td>
              </tr>
            )}
            {both && !finished && (
              <tr>
                <th>Накладной номер</th>
                <td>
                  <MainInput placeholder={"Накладной номер"} register={register("nakladnoy")} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {both && !finished && (
          <button type="submit" className="btn pull-right btn-info btn-fill">
            Сохранить
          </button>
        )}
        {order?.image && (
          <div className="d-flex flex-column">
            <h2>Картинки</h2>
            <div className={styles.image}>
              <Link to={`${BASE_URL}/${order.image}`} target="_blank" rel="noreferrer">
                {order.image}
              </Link>
            </div>
          </div>
        )}
      </form>
    </Container>
  );
};

export default ShowOrder;
