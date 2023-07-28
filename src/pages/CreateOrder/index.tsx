import Container from "components/Container";
import styles from "./index.module.scss";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import createOrderMutation from "hooks/mutation/createOrderMutation";
import useCategories from "hooks/useCategories";
import axios from "axios";
import Loading from "components/Loader";
import { errorToast, successToast } from "utils/toast";
import { BASE_URL } from "api/apiClient";
import useOverhead from "hooks/useOverhead";
import BaseInput from "components/BaseInputs";
import MainSelect from "components/BaseInputs/MainSelect";
import MainInput from "components/BaseInputs/MainInput";
import MainTextArea from "components/BaseInputs/MainTextArea";
import MainDatePicker from "components/BaseInputs/MainDatePicker";

const paymentType = [
  { id: "Перечисление", name: "Перечисление" },
  { id: "Наличные", name: "Наличные" },
  { id: "Перевод на карту", name: "Перевод на карту" },
];

const mockDepartment = [
  { id: 1, name: "Фабрика" },
  { id: 2, name: "Розница" },
];

const CreateOrder = () => {
  const { data: dept, isLoading } = useCategories({ enabled: false });
  const { data: overheads } = useOverhead({});
  const [imageId, $imageId] = useState<any>();

  const [date, $date] = useState<Date>();
  const [imageLoading, $imageLoading] = useState(false);

  const { mutate: mutateOrder } = createOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

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
  const handleDate = (e: any) => $date(e);

  const onSubmit = () => {
    const {
      user_name,
      product_name,
      price,
      payer,
      provider,
      urgent,
      description,
      department,
      payment_type,
      overhead,
    } = getValues();

    mutateOrder(
      {
        category_id: Number(department),
        purchaser: user_name,
        product: product_name,
        seller: provider,
        delivery_time: date!,
        price,
        payer,
        urgent,
        description,
        payment_type,
        image_id: imageId,
        user_id: overhead,
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

      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        <div className="row">
          <BaseInput className="col-md-4" label="Выберите сферу" error={errors.department}>
            <MainSelect
              values={dept?.length ? dept : mockDepartment}
              register={register("department", { required: "Обязательное поле" })}
            />
          </BaseInput>
        </div>
        <div className="row">
          <BaseInput className="col-md-3" label="Укажите заказчика" error={errors.user_name}>
            <MainInput
              register={register("user_name", { required: "Обязательное поле" })}
              placeholder="Укажите заказчика"
            />
          </BaseInput>

          <BaseInput className="col-md-4" label="Название товара" error={errors.product_name}>
            <MainInput
              register={register("product_name", { required: "Обязательное поле" })}
              placeholder="Название товара"
            />
          </BaseInput>

          <BaseInput label="Цена (UZS)" className="col-md-5" error={errors.price}>
            <MainInput
              register={register("price", { required: "Обязательное поле" })}
              placeholder="Цена (UZS)"
              type="number"
            />
          </BaseInput>
        </div>

        <div className="row">
          <BaseInput className="col-md-3" label="Выберите тип оплаты" error={errors.payment_type}>
            <MainSelect
              register={register("payment_type", { required: "Обязательное поле" })}
              values={paymentType}
            />
          </BaseInput>

          <BaseInput className="col-md-4" label="Платильщик" error={errors.payer}>
            <MainInput
              register={register("payer", { required: "Обязательное поле" })}
              placeholder="Платильщик"
            />
          </BaseInput>

          <BaseInput className="col-md-5" label="Поставщик" error={errors.provider}>
            <MainInput
              register={register("provider", { required: "Обязательное поле" })}
              placeholder="Поставщик"
            />
          </BaseInput>
        </div>
        <div className="row">
          <BaseInput className="col-md-6" label="Комментарии">
            <MainTextArea register={register("description")} placeholder="Комментарии" />
          </BaseInput>

          <BaseInput label="Срок" className="col-md-6 d-flex flex-column">
            <MainDatePicker selected={date} onChange={handleDate} />
            <div className={styles.urgent}>
              <label>Срочно</label>
              <input {...register("urgent")} className="ml-2" type="checkbox" name="urgent" />
            </div>
          </BaseInput>
        </div>
        <div className="row">
          <div className={`mb-4 col-md-6 ${styles.uploadImage}`}>
            <label>Добавить файл</label>
            <input
              className="form-control"
              type="file"
              multiple
              onChange={handleImage}
              name="file-upload"
            />
            {errors.image && (
              <div className="alert alert-danger p-2" role="alert">
                {errors.image.message?.toString()}
              </div>
            )}
          </div>

          <BaseInput className="col-md-6 " label="Выберите сотрудника для накладного ноомера">
            <MainSelect register={register("overhead")}>
              <option value={undefined}></option>
              {overheads?.map(person => (
                <option key={person.id} value={person.id}>
                  {person.full_name}
                </option>
              ))}
            </MainSelect>
          </BaseInput>
        </div>

        <button
          disabled={imageLoading}
          type="submit"
          className={`btn btn-info btn-fill pull-right ${styles.btn}`}>
          Создать
        </button>
      </form>
    </Container>
  );
};

export default CreateOrder;
