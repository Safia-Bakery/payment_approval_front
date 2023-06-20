import Container from "components/Container";
import InputBlock from "components/Input";
import styles from "./index.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import createOrderMutation from "hooks/mutation/createOrderMutation";
import useCategories from "hooks/useCategories";

const paymentType = ["перечисления", "наличные", "перевод на карту"];

const CreateOrder = () => {
  const { data: categories } = useCategories({ enabled: false });
  const [image, $image] = useState<string | ArrayBuffer | null>();
  const [reserve_time, $reserve_time] = useState(new Date());
  const [department, $department] = useState<number>();
  const { mutate } = createOrderMutation();

  console.log(image, "image");

  useEffect(() => {
    if (categories?.length) $department(categories[0].id);
  }, [categories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const reserveTime = (time: Date) => $reserve_time(time);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) $image(reader.result);
    };
    reader.readAsDataURL(e.target.files?.[0] as Blob);
  };

  const handleDept = (val: number) => () => $department(val);

  const onSubmit = () => {
    const {
      user_name,
      product_name,
      delivery_time,
      price,
      payer,
      provider,
      urgent,
      description,
      payment_type,
    } = getValues();

    mutate({
      category_id: 0,
      purchaser: user_name,
      product: product_name,
      seller: provider,
      delivery_time,
      price,
      payer,
      urgent,
      description,
      payment_type,
      // image: image?.toString(),
    });
  };

  return (
    <Container>
      <h1>Создать заказ</h1>
      <div className="d-flex flex-column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Выберите отдел</label>
                <div className="d-flex justify-content-between align-items-center gap-10">
                  {categories?.map(({ id, name }) => (
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
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <InputBlock
                  register={register("user_name", { required: "Обязательное поле" })}
                  className="form-control"
                  placeholder="Укажите заказщика"
                  label="Укажите заказщика"
                  error={errors.user_name}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <InputBlock
                  register={register("product_name", { required: "Обязательное поле" })}
                  className="form-control"
                  placeholder="Названия товара"
                  label="Названия товара"
                  error={errors.product_name}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <InputBlock
                  register={register("price", { required: "Обязательное поле" })}
                  className="form-control"
                  inputType="number"
                  placeholder="Цена"
                  label="Цена"
                  error={errors.price}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Выберите тип оплаты</label>
                <select
                  // {...register("payment_type", { required: "Обязательное поле" })}
                  defaultValue={"Select Item"}
                  className="form-select"
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
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <InputBlock
                  register={register("payer", { required: "Обязательное поле" })}
                  className="form-control"
                  placeholder="Платильщик"
                  label="Платильщик"
                  error={errors.payer}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <InputBlock
                  register={register("provider", { required: "Обязательное поле" })}
                  className="form-control"
                  placeholder="Поставщик"
                  label="Поставщик"
                  error={errors.provider}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Комментарии</label>
                <textarea
                  rows={4}
                  {...register("description")}
                  className={`form-control ${styles.textArea}`}
                  name="comment"
                  placeholder="Комментарии"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group d-flex flex-column">
                <label>Срок</label>
                <DatePicker
                  // {...register("delivery_time", { required: "Обязательное поле" })}
                  selected={reserve_time}
                  onChange={(date: Date) => reserveTime(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm"
                  className={`${styles.datePicker} form-control`}
                  showTimeInput
                />
                <div className={styles.urgent}>
                  <label>Срочно</label>
                  <input {...register("urgent")} className="ml-2" type="checkbox" name="urgent" />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className={`col-md-12 ${styles.uploadImage}`}>
              <label>Добавить фото</label>
              <input
                className="form-control"
                type="file"
                onChange={handleImage}
                name="image-upload"
                accept="image/*"
              />
              {errors.image && (
                <div className="alert alert-danger p-2" role="alert">
                  {errors.image.message?.toString()}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className={`btn btn-info btn-fill pull-right ${styles.btn}`}>
            Создать
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateOrder;
