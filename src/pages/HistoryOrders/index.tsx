import Container from "components/Container";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import useOrders from "hooks/useOrders";
import { OrderType } from "utils/types";
import Loading from "components/Loader";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from "material-react-table";
import { useEffect, useMemo, useRef, useState } from "react";

const HistoryOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading: orderLoading } = useOrders({ history: true });
  const handleNavigate = (id: number) => () => navigate(`/order/${id}`);

  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const columns = useMemo<MRT_ColumnDef<OrderType>[]>(
    () => [
      {
        accessorKey: "purchaser",
        header: "заказчик",
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

  if (orderLoading) return <Loading />;
  return (
    <Container>
      <h1>История Заказов</h1>
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
          renderRowActions={({ row }) => [
            <div key={"view"} className={styles.viewBtn} onClick={handleNavigate(row.original.id)}>
              <img className={styles.viewImg} src="/assets/icons/view.svg" alt="edit" />
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
      </div>
    </Container>
  );
};

export default HistoryOrders;
