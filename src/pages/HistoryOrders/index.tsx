import Container from "components/Container";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import useOrders from "hooks/useOrders";
import Loading from "components/Loader";
import { handleStatus, numberWithCommas, rowColor } from "utils/helpers";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";

const column = ["#", "Заказчик", "Отдел", "Название товара", "Цена (UZS)", "Статус", ""];
const itemsPerPage = 20;

const HistoryOrders = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => () => navigate(`/order/${id}?finished=true`);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: orders,
    isLoading: orderLoading,
    refetch,
  } = useOrders({
    history: true,
    size: itemsPerPage,
    page: currentPage,
  });

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleIdx = (index: number) => {
    if (currentPage === 1) return index + 1;
    else return index + 1 + itemsPerPage * (currentPage - 1);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (orderLoading) return <Loading />;
  return (
    <Container>
      <h1>История Заказов</h1>
      <div className="content table-responsive table-full-width">
        <table className="table table-hover">
          <thead>
            <tr>
              {column.map(name => (
                <th className="font-weight-bold text-dark" key={name}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          {!!orders?.items?.length && (
            <tbody>
              {orders?.items.map((order, idx) => (
                <tr className={rowColor(order.status)} key={order.id}>
                  <td>{handleIdx(idx)}</td>
                  <td>{order.purchaser}</td>
                  <td>{order.category.name}</td>
                  <td>{order.product}</td>
                  <td>{numberWithCommas(order.price)}</td>
                  <td>{handleStatus(order.status)}</td>
                  <td>
                    <div className={styles.viewBtn} onClick={handleNavigate(order.id)}>
                      <img className={styles.viewImg} src="/assets/icons/view.svg" alt="edit" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!orders?.items?.length && (
          <div className="w-100">
            <p className="text-center w-100 ">Спосок пуст</p>
          </div>
        )}
      </div>
      {!!orders && (
        <Pagination
          totalItems={orders?.total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default HistoryOrders;
