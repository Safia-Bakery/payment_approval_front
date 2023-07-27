import { BASE_URL } from "api/apiClient";
import Container from "components/Container";
import Loading from "components/Loader";
import dayjs from "dayjs";
import { useOrder } from "hooks/userOrder";
import styles from "./index.module.scss";
import { Link, useParams } from "react-router-dom";
import useToken from "hooks/useToken";
import { StatusRoles } from "utils/types";
import MainInput from "components/BaseInputs/MainInput";
import { useForm } from "react-hook-form";
import payMutation from "hooks/mutation/payMutation";
import { useEffect } from "react";
import { successToast } from "utils/toast";

const ShowOrder = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useOrder({ id: Number(id) });
  const { data: me } = useToken({});

  const { mutate } = payMutation();

  const { register, handleSubmit, getValues, reset } = useForm();

  useEffect(() => {
    if (me?.role === StatusRoles.nakladnoy || me?.role === StatusRoles.accountant) {
      reset({
        amount_paid: order?.amount_paid,
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
              <td>{order?.category?.name}</td>
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
            {me?.role === StatusRoles.accountant && (
              <tr>
                <th>Оплачен (UZS)</th>
                <td>
                  <MainInput placeholder={"Оплачен"} register={register("amount_paid")} />
                </td>
              </tr>
            )}
            {(me?.role === StatusRoles.accountant || me?.role === StatusRoles.nakladnoy) && (
              <tr>
                <th>Накладной номер</th>
                <td>
                  <MainInput placeholder={"Накладной номер"} register={register("nakladnoy")} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {(me?.role === StatusRoles.nakladnoy || me?.role === StatusRoles.accountant) && (
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
