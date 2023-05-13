import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { UserForm } from "~/components/UserForm";

const Home: NextPage = () => {
  const utils = api.useContext();
  const router = useRouter();
  const initialData = api.example.getAllUsers.useQuery();
  const userMutation = api.example.createUser.useMutation({
    onSuccess(data) {
      utils.example.getAllUsers.invalidate().catch((err) => {
        // Handle error here
        console.error(err);
      });
    },
  });

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      password: "",
      age: "",
    },
    // resolver: zodResolver()
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log(data);
    userMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      password: data.password,
      age: data.age,
    });
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-x-5 md:flex-row">
        {/* <UserForm {... handleSubmit, onSubmit, register}/> */}
        <UserForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
        />
        {/* rendered users */}
        {initialData.data?.length ? (
          <section className="flex h-full flex-col justify-center">
            <h2 className="text-center text-lg font-bold">User Data</h2>
            <div className="flex h-[400px] w-[300px] flex-col gap-y-3 overflow-hidden overflow-y-scroll text-black">
              {initialData.data
                .slice()
                .reverse()
                .map((userData) => (
                  <div
                    onClick={() => {
                      router.push(`/User/${userData.id}`).catch((err) => {
                        // Handle error here
                        console.error(err);
                      });
                    }}
                    key={userData.id}
                    className="hover:border-lg h-[200px] w-full cursor-pointer rounded-lg bg-black p-2 text-white hover:border-[2px] hover:border-black hover:bg-white hover:text-black"
                  >
                    <div>first Name: {userData.firstName}</div>
                    <div>last Name: {userData.lastName}</div>
                    <div>id: {userData.id}</div>
                    <div className="truncate">hash: {userData.password}</div>
                  </div>
                ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
};

export default Home;
