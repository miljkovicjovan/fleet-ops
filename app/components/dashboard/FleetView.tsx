"use client";

import { useEffect, useState } from "react";

import FleetMap from "./FleetMap";
import VesselList from "./VesselList";
import Toast, { type ToastType } from "../ui/Toast";

import type { Vessel } from "../../types/vessel";

type ToastState = {
    type: ToastType;
    message: string;
};

export default function FleetView() {
    const [vessels, setVessels] = useState<Vessel[]>([]);
    const [selectedVesselId, setSelectedVesselId] =
        useState<string | null>(null);

    const [isReloading, setIsReloading] =
        useState(false);

    const [toast, setToast] =
        useState<ToastState | null>(null);

    async function fetchVessels() {
        setIsReloading(true);

        try {
            const response = await fetch(
                "/api/vessels",
                {
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch vessels"
                );
            }

            const data: Vessel[] =
                await response.json();

            setVessels(data);

            setToast({
                type: "success",
                message:
                    "Fleet data refreshed successfully.",
            });
        } catch {
            setToast({
                type: "error",
                message:
                    "Failed to refresh fleet data.",
            });
        } finally {
            setIsReloading(false);
        }
    }

    useEffect(() => {
        fetchVessels();
    }, []);

    return (
        <>
            <div className="mt-6">
                <FleetMap
                    vessels={vessels}
                    selectedVesselId={selectedVesselId}
                    onVesselSelect={setSelectedVesselId}
                    onReload={fetchVessels}
                    isReloading={isReloading}
                />
            </div>

            <div className="mt-6">
                <VesselList
                    vessels={vessels}
                    selectedVesselId={selectedVesselId}
                    onVesselSelect={setSelectedVesselId}
                />
            </div>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}