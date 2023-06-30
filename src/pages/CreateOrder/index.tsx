import Container from "components/Container";
import InputBlock from "components/Input";
import styles from "./index.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import createOrderMutation from "hooks/mutation/createOrderMutation";
import useCategories from "hooks/useCategories";
import axios from "axios";
import Loading from "components/Loader";
import { errorToast, successToast } from "utils/toast";
import { BASE_URL } from "api/apiClient";

const paymentType = ["Перечисление", "наличные", "перевод на карту"];

const mockDepartment = [
  { id: 1, name: "Фабрика" },
  { id: 2, name: "Розница" },
];

const CreateOrder = () => {
  const { data: dept, isLoading } = useCategories({ enabled: false });
  const [imageId, $imageId] = useState<any>();
  const [delivery_time, $delivery_time] = useState(new Date());
  const [department, $department] = useState<number>();
  const [imageLoading, $imageLoading] = useState(false);
  const [payment_type, $payment_type] = useState<string>(paymentType[0]);
  const { mutate: mutateOrder } = createOrderMutation();

  useEffect(() => {
    if (dept?.length) $department(dept[0].id);
  }, [dept]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const reserveTime = (time: Date) => $delivery_time(time);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      $imageLoading(true);
      axios
        .post(`${BASE_URL}/image/upload`, formData)
        .then(({ data }) => {
          $imageId(data.id);
        })
        .catch(e => {
          errorToast(e.message);
        })
        .finally(() => $imageLoading(false));
    }
  };

  const handleDept = (val: number) => () => $department(val);
  const handlePayment = (e: ChangeEvent<HTMLSelectElement>) => $payment_type(e.target.value);
  const onSubmit = () => {
    const { user_name, product_name, price, payer, provider, urgent, description } = getValues();

    mutateOrder(
      {
        category_id: Number(department),
        purchaser: user_name,
        product: product_name,
        seller: provider,
        delivery_time,
        price,
        payer,
        urgent,
        description,
        payment_type,
        image_id: imageId,
      },
      {
        onSuccess: () => {
          reset();
          successToast("Заказ успешно создано");
        },
        onError: (error: any) => errorToast(error.toString()),
      },
    );
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <h1>Создать заказ</h1>
      <div className="d-flex flex-column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-4 form-group">
              <label>Выберите сферу</label>
              <div className="d-flex justify-content-between align-items-center gap-10">
                {(dept?.length ? dept : mockDepartment)?.map(({ id, name }) => (
                  <div key={id} className={styles.deptItem} onClick={handleDept(id)}>
                    <label>{name}</label>
                    <input
                      onChange={handleDept(id)}
                      checked={department === id}
                      className="ml-2"
                      type="radio"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 form-group">
              <InputBlock
                register={register("user_name", { required: "Обязательное поле" })}
                className="form-control"
                placeholder="Укажите заказчика"
                label="Укажите заказчика"
                error={errors.user_name}
              />
            </div>
            <div className="col-md-4 form-group">
              <InputBlock
                register={register("product_name", { required: "Обязательное поле" })}
                className="form-control"
                placeholder="Название товара"
                label="Название товара"
                error={errors.product_name}
              />
            </div>
            <div className="col-md-5 form-group">
              <InputBlock
                register={register("price", { required: "Обязательное поле" })}
                className="form-control"
                inputType="number"
                placeholder="Цена (UZS)"
                label="Цена (UZS)"
                error={errors.price}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 form-group">
              <label>Выберите тип оплаты</label>
              <select
                defaultValue={"Select Item"}
                className="form-select"
                onChange={handlePayment}
                aria-label="Default select example">
                {paymentType.map(dep => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="alert alert-danger p-2" role="alert">
                  {errors.department.message?.toString()}
                </div>
              )}
            </div>
            <div className="col-md-4 form-group">
              <InputBlock
                register={register("payer", { required: "Обязательное поле" })}
                className="form-control"
                placeholder="Платильщик"
                label="Платильщик"
                error={errors.payer}
              />
            </div>
            <div className="col-md-5 form-group">
              <InputBlock
                register={register("provider", { required: "Обязательное поле" })}
                className="form-control"
                placeholder="Поставщик"
                label="Поставщик"
                error={errors.provider}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <label>Комментарии</label>
              <textarea
                rows={4}
                {...register("description")}
                className={`form-control ${styles.textArea}`}
                name="description"
                placeholder="Комментарии"
              />
            </div>
            <div className="col-md-6 form-group d-flex flex-column">
              <label>Срок</label>
              <DatePicker
                selected={delivery_time}
                onChange={(date: Date) => reserveTime(date)}
                timeInputLabel="Time:"
                dateFormat="MM.dd.yyyy  HH:mm "
                showTimeInput
                className={`${styles.datePicker} form-control`}
              />
              <div className={styles.urgent}>
                <label>Срочно</label>
                <input {...register("urgent")} className="ml-2" type="checkbox" name="urgent" />
              </div>
            </div>
          </div>

          <div className={`row mb-4 col-md-12 ${styles.uploadImage}`}>
            <label>Добавить файл</label>
            <input
              className="form-control"
              type="file"
              multiple
              onChange={handleImage}
              name="file-upload"
              // accept="image/*"
            />
            {errors.image && (
              <div className="alert alert-danger p-2" role="alert">
                {errors.image.message?.toString()}
              </div>
            )}
          </div>

          <button
            disabled={imageLoading}
            type="submit"
            className={`btn btn-info btn-fill pull-right ${styles.btn}`}>
            Создать
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateOrder;
