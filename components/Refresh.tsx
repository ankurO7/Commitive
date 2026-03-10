"use client";
import { useRouter } from "next/router"; 
import { Button } from "@heroui/button";
import { refreshDashboard } from "@/app/actions/refresh";

export default function RefreshButton(){

    const router = useRouter();
    return (
        <Button
            color="primary"
            variant="flat"
            onPress={async () =>{
                await refreshDashboard();
                router.refresh();
        }}>
            Refresh
        </Button>
    );
}