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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  return (
    <div>
      <EventForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}
