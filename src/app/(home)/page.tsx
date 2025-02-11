import { HydrateClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
    void trpc.hello.prefetch({ text: "FIRAS LATRACH" });
    return (
        <div>
            {/* <div>LOGO</div>
            <p className="text-xl font-semibold tracking-tight">
                Firas Starter
            </p> */}
            <HydrateClient>
                <Suspense fallback={<div>Loading...</div>}>
                    <ErrorBoundary fallback={<div>Error</div>}>
                        <Client />
                    </ErrorBoundary>
                </Suspense>
            </HydrateClient>
        </div>
    );
}
