import Container from "components/Container";
import useOrders from "hooks/useOrders";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/utils/types";
import { roleSelector } from "redux/reducers/authReducer";
import { StatusRoles, Status } from "utils/types";
import orderStatusMutation from "hooks/mutation/orderStatusMutation";
import { errorToast, successToast } from "utils/toast";
import Loading from "components/Loader";
import { handleStatus, numberWithCommas } from "utils/helpers";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const itemsPerPage = 5;

const ActiveOrders = () => {
  const navigate = useNavigate();
  const createOrder = () => navigate("/history-orders");
  const role = useAppSelector(roleSelector);
  const admin = role !== StatusRoles.purchasing && role !== StatusRoles.superadmin;
  const { mutate } = orderStatusMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: orders,
    refetch,
    isLoading: orderLoading,
  } = useOrders({ size: itemsPerPage, page: currentPage });

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleNavigate = (id: number) => () => navigate(`/order/${id}`);
  const handleStatusSubmit = (body: { order_id: number; status: Status }) => () => {
    mutate(body, {
      onSuccess: () => {
        refetch();
        body.status === Status.accepted
          ? successToast("успешно принито")
          : successToast("успешно отклонено");
      },
      onError: (error: any) => errorToast(error.toString()),
    });
  };

  const handleIdx = (index: number) => {
    if (currentPage === 1) return index + 1;
    else return index + 1 + itemsPerPage * (currentPage - 1);
  };

  const column = [
    "#",
    "Заказчик",
    "Отдел",
    "Название товара",
    "Цена (UZS)",
    "Время поступления",
    "Статус",
    admin ? "Дествия" : "",
  ];

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (orderLoading) return <Loading />;

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
              <th className=" " key={name}>
                {name}
              </th>
            ))}
          </thead>

          {orders?.items.length && (
            <tbody>
              {orders?.items.map((order, idx) => (
                <tr key={order.id}>
                  <td className={styles.num}> {handleIdx(idx)}</td>
                  <td>{order.purchaser}</td>
                  <td>{order?.category.name}</td>
                  <td>{order.product}</td>
                  <td>{numberWithCommas(order.price)}</td>
                  <td>{dayjs(order.time_created).format("DD-MMM-YYYY HH:mm")}</td>
                  <td>{handleStatus(order.status)}</td>
                  {admin ? (
                    <>
                      <td className="d-flex gap-2 align-items-center">
                        <button
                          onClick={handleStatusSubmit({
                            order_id: order.id,
                            status: Status.accepted,
                          })}
                          type="button"
                          className="btn btn-success">
                          Принять
                        </button>
                        <button
                          onClick={handleStatusSubmit({
                            order_id: order.id,
                            status: Status.denied,
                          })}
                          type="button"
                          className="btn btn-danger">
                          Отклонить
                        </button>
                        <div className="mx-2" />
                        <div className={styles.viewBtn} onClick={handleNavigate(order.id)}>
                          <img className={styles.viewImg} src="/assets/icons/view.svg" alt="edit" />
                        </div>
                      </td>
                    </>
                  ) : (
                    <td>
                      <div className={styles.viewBtn} onClick={handleNavigate(order.id)}>
                        <img className={styles.viewImg} src="/assets/icons/view.svg" alt="edit" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}

          {!!orders && (
            <Pagination
              totalItems={orders?.total}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </table>
      </div>
    </Container>
  );
};

export default ActiveOrders;
