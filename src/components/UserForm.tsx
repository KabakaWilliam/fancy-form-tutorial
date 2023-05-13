import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

declare global {
  interface IFormInputs {
    id?: string;
    firstName: string;
    lastName: string;
    country: string;
    password: string;
    age: string;
  }
  interface CompleteFormWrapper {
    register: UseFormRegister<IFormInputs>;
    handleSubmit: UseFormHandleSubmit<IFormInputs>;
    onSubmit: SubmitHandler<IFormInputs>;
  }
  interface FormWrapperType {
    register: UseFormRegister<IFormInputs>;
    labelName: string;
    fieldName: keyof IFormInputs;
    inputType: "text" | "password" | "file" | "date" | "email" | "number";
  }
}

const FormWrapper = (props: FormWrapperType) => {
  return (
    <label className="flex w-full flex-col">
      {props.labelName}
      <input
        type={props.inputType}
        className="border border-black px-2"
        {...props.register(props.fieldName)}
      />
    </label>
  );
};

export const UserForm = ({
  handleSubmit,
  register,
  onSubmit,
}: CompleteFormWrapper) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e).catch((err) => {
          // Handle error here
          console.error(err);
        });
      }}
      className="flex flex-col gap-y-3"
    >
      <FormWrapper
        labelName="First Name"
        register={register}
        fieldName="firstName"
        inputType="text"
      />
      <FormWrapper
        labelName="Last Name"
        register={register}
        fieldName="lastName"
        inputType="text"
      />
      <FormWrapper
        labelName="Country"
        register={register}
        fieldName="country"
        inputType="text"
      />
      <FormWrapper
        labelName="Password"
        register={register}
        fieldName="password"
        inputType="password"
      />
      <FormWrapper
        inputType="number"
        labelName="Age"
        register={register}
        fieldName="age"
      />
      <div className="flex h-full w-full justify-center">
        <button
          className="h-full w-max rounded-lg bg-purple-300 p-3 hover:bg-purple-200"
          type="submit"
        >
          Submit
        </button>
      </div>{" "}
    </form>
  );
};
