"use client";

import ProfileForm from "@/components/ProfileForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  profileName: yup.string().required().min(3),
  email: yup.string().email().required(),
  about: yup.string().required().min(50),
});

export default function ProfileDetail({ params }: { params: { id: string } }) {
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
    <div className="mt-4">
      <span className="text-4xl text-center">Profile Detail</span>
      <div className="flex flex-row items-center justify-between mb-4 p-2">
        <p>Profile ID: {params.id}</p>
        {/* <div className="flex flex-row items-center justify-between hover:shadow-xl">
          <span>
            <XMarkIcon className="h-5 w-5 text-rose-500 cursor-pointer hover:bg-rose-200 hover:text-rose-700 rounded-xl border border-rose-600" />
          </span>
        </div> */}
      </div>
      <ProfileForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </div>
  );
}
