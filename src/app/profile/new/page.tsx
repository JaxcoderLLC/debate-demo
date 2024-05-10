"use client";

import ProfileForm from "@/components/ProfileForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { on } from "events";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  roundName: yup.string().required(),
  roundStart: yup.date().required(),
  roundEnd: yup.date().required(),
});
export default function NewProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="mt-4">
      <ProfileForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </div>
  );
}
