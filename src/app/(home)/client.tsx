"use client";
import { trpc } from "@/trpc/client";
import { useState } from "react";

export const Client = () => {
    const [data] = trpc.hello.useSuspenseQuery({ text: "FIRAS LATRACH" });
    return <div>pageClient :{data.greeting}</div>;
};
