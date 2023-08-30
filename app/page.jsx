"use client";
import { connection } from 'dapp-sdk';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// type Inputs = {
//   network: string;
//   mnemonic: string;
// };

export default function App() {
  const [account, setAccount] = useState();

  const connect = async (network, mnemonic) => {
    const res = await connection.create({
      network,
      wallet: {
        mnemonic,
      },
    });

    setAccount(res);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit= async data => {
    await connect(data.network, data.mnemonic)

    console.log("Account: ",)
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="w-[40%] rounded p-4 mx-auto mt-28 bg-white  space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Label htmlFor="network">Network</Label>
        <Input
          id="network"
          {...register("network", { required: true })}
          placeholder="Network"
        />
        {errors.network && (
          <small className="text-red-500">This field is required</small>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="mnemonic">Mnemonic</Label>
        <Input
          id="mnemonic"
          {...register("mnemonic", { required: true })}
          placeholder="Mnemonic"
        />
        {/* errors will return when field validation fails  */}
        {errors.mnemonic && (
          <small className="text-red-500">This field is required</small>
        )}
      </div>

      <Button>Submit</Button>
    </form>
  );
}
