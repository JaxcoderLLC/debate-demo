"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  roundName: yup.string().required(),
  roundStart: yup.date().required(),
  roundEnd: yup.date().required(),
});

export default function Manage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  

  return (
    <div className="mt-8">
      <h1>Manage Page</h1>
    </div>
  );
}
