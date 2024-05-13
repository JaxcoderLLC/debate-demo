"use client";

import ProfileForm from "@/components/ProfileForm";
import { createProfile } from "@/sdk/registry";
import { yupResolver } from "@hookform/resolvers/yup";
import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Address } from "viem";
import * as yup from "yup";

const schema = yup.object({
  profileName: yup.string().required().min(5).max(50),
  website: yup.string().url(),
  about: yup.string(),
});

export default function NewProfile() {
  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    // todo: move to context
    const fetchProvider = async () => {
      const provider = await wallet.getEthereumProvider();

      setProvider(provider);
    };
    fetchProvider();
  }, [wallet]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);

    // Create a new profile
    createProfile({
      provider,
      name: data.profileName,
      owner: wallet.address as Address,
    });
  };

  return (
    <div className="mt-4">
      <ProfileForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </div>
  );
}
