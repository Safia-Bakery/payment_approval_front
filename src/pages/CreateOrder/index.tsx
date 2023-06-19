import Container from "src/components/Container";
import InputBlock from "src/components/Input";
import "./index.scss";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
const depArr = ["", "Fabrika", "Roznitsa"];

const CreateOrder = () => {
  const [image, $image] = useState<string | ArrayBuffer | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) $image(reader.result);
    };
    reader.readAsDataURL(e.target.files?.[0] as Blob);
  };

  const onSubmit = () => {
    const { user_name, item_name } = getValues();

    console.log({ user_name, item_name });
  };
  return (
    <Container>
      <h1>Create Order</h1>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Select department</label>
                <select
                  {...register("department", { required: "required" })}
                  defaultValue={"Select Item"}
                  className="form-select"
                  aria-label="Default select example">
                  {depArr.map(dep => (
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
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <InputBlock
                  register={register("user_name", { required: "required" })}
                  className="form-control"
                  placeholder="Username"
                  label="Username"
                  error={errors.user_name}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <InputBlock
                  register={register("item_name", { required: "required" })}
                  className="form-control"
                  placeholder="item name"
                  label="Item Name"
                  error={errors.item_name}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <InputBlock
                  register={register("price", { required: "required" })}
                  className="form-control"
                  inputType="number"
                  placeholder="Price"
                  label="Price"
                  error={errors.price}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Comments</label>
                <textarea
                  rows={4}
                  {...register("comment")}
                  className="form-control textArea"
                  name="comment"
                  placeholder="Here can be your description"
                />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12 uploadImage">
              <label>Upload Image</label>
              <input
                {...register("image", { required: "required" })}
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

          <button type="submit" className="btn btn-info btn-fill pull-right">
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateOrder;
