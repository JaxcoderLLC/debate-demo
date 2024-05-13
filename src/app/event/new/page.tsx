"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EventForm from "@/components/EventForm";

const schema = yup.object({
  eventName: yup.string().required().min(3),
  email: yup.string().email().required(),
  about: yup.string().required().min(50),
});

export default function NewEvent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <div>
      <EventForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
}
