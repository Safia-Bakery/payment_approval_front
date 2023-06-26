import Container from "components/Container";
import useOrders from "hooks/useOrders";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/utils/types";
import { roleSelector } from "redux/reducers/authReducer";
import { OrderType, Roles, Status } from "utils/types";
import orderStatusMutation from "hooks/mutation/orderStatusMutation";
import { errorToast, successToast } from "utils/toast";
import Loading from "components/Loader";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from "material-react-table";
import { useEffect, useMemo, useRef, useState } from "react";

const ActiveOrders = () => {
  const navigate = useNavigate();
  const { data: orders, refetch, isLoading: orderLoading } = useOrders({});
  const createOrder = () => navigate("/history-orders");
  const role = useAppSelector(roleSelector);
  const admin = role !== Roles.purchasing && role !== Roles.superadmin;
  const { mutate } = orderStatusMutation();

  const handleNavigate = (id: number) => () => navigate(`/order/${id}`);
  const handleStatus = (body: { order_id: number; status: Status }) => () => {
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

  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const columns = useMemo<MRT_ColumnDef<OrderType>[]>(
    () => [
      {
        accessorKey: "purchaser",
        header: "заказщик",
      },
      {
        accessorKey: "category",
        header: "отдел",
      },
      {
        accessorKey: "product",
        header: "Названия товара",
      },
      {
        accessorKey: "price",
        header: "Цена",
      },
      {
        accessorKey: "status",
        header: "статус",
      },
    ],
    [],
  );

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  if (isLoading || orderLoading) return <Loading />;

  return (
    <Container>
      <div className="d-flex flex-column">
        <h1>Активные заказы</h1>
        <button onClick={createOrder} className={`btn btn-info btn-fill mb-4 ${styles.btn}`}>
          Создать
        </button>
      </div>
      <div className="content table-responsive table-full-width">
        <MaterialReactTable
          columns={columns}
          data={orders || []}
          defaultDisplayColumn={{ enableResizing: true }}
          enableBottomToolbar={false}
          enableColumnResizing
          enableColumnVirtualization
          enableGlobalFilterModes
          enableRowActions
          displayColumnDefOptions={{
            "mrt-row-actions": {
              size: admin ? 250 : 100,
            },
          }}
          renderRowActions={({ row }) => [
            <div key={"accept_deny"} className="d-flex align-items-center gap-1">
              {admin && (
                <>
                  <button
                    onClick={handleStatus({
                      order_id: row.original.id,
                      status: Status.accepted,
                    })}
                    type="button"
                    className="btn btn-success">
                    Принять
                  </button>
                  <button
                    onClick={handleStatus({
                      order_id: row.original.id,
                      status: Status.denied,
                    })}
                    type="button"
                    className="btn btn-danger">
                    Отклонить
                  </button>
                </>
              )}
              <div className={styles.viewBtn} onClick={handleNavigate(row.original.id)}>
                <img className={styles.viewImg} src="/assets/icons/edit.svg" alt="edit" />
              </div>
            </div>,
          ]}
          positionActionsColumn="last"
          enablePagination={false}
          enableRowNumbers
          enableRowVirtualization
          muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
          onSortingChange={setSorting}
          state={{ isLoading, sorting }}
          rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
          rowVirtualizerProps={{ overscan: 5 }}
          columnVirtualizerProps={{ overscan: 2 }}
        />
        {/* <table className="table table-hover table-striped">
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
                  <td>{order?.category}</td>
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
              ))}
            </tbody>
          )}
        </table> */}
      </div>
    </Container>
  );
};

export default ActiveOrders;
