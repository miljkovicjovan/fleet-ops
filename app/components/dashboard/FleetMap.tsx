"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { mockVessels } from "../../data/mock-vessels";
import type { VesselStatus } from "../../types/vessel";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

function getMarkerColor(status: VesselStatus) {
    switch (status) {
        case "active":
            return "#22d3ee";
        case "offline":
            return "#f87171";
        case "inactive":
            return "#71717a";
    }
}

function createVesselMarker(
    status: VesselStatus,
    heading: number
) {
    const element = document.createElement("div");

    element.className = `fleetops-vessel-marker fleetops-vessel-marker--${status}`;

    element.style.setProperty(
        "--vessel-heading",
        `${heading}deg`
    );

    element.innerHTML = `
        <div class="fleetops-vessel-marker__ring"></div>
        <div class="fleetops-vessel-marker__dot"></div>
    `;

    return element;
}

function createPopupContent(
    id: string,
    name: string,
    imo: string,
    status: VesselStatus,
    speed: number,
    heading: number
) {
    return `
        <div class="fleetops-popup__header">
            <a
                href="/dashboard/vessels/${id}"
                class="fleetops-popup__name"
            >
                ${name}
            </a>

            <div class="fleetops-popup__status fleetops-popup__status--${status}">
                <span class="fleetops-popup__status-dot"></span>
                ${status}
            </div>

            <p class="fleetops-popup__imo">
                IMO ${imo}
            </p>
        </div>

        <div class="fleetops-popup__metrics">
            <div class="fleetops-popup__metric">
                <p class="fleetops-popup__metric-label">
                    Speed
                </p>

                <p class="fleetops-popup__metric-value">
                    ${speed.toFixed(1)} kn
                </p>
            </div>

            <div class="fleetops-popup__metric">
                <p class="fleetops-popup__metric-label">
                    Heading
                </p>

                <p class="fleetops-popup__metric-value">
                    ${heading}°
                </p>
            </div>
        </div>
    `;
}

type FleetMapProps = {
    selectedVesselId: string | null;
    onVesselSelect: (vesselId: string) => void;
};

export default function FleetMap({
    selectedVesselId,
    onVesselSelect,
}: FleetMapProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<Map<string, mapboxgl.Marker>>(new Map());

    useEffect(() => {
        if (!mapContainer.current || map.current) {
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [15, 45],
            zoom: 3,
        });

        mockVessels.forEach((vessel) => {
            const markerElement = createVesselMarker(
                vessel.status,
                vessel.heading
            );

            markerElement.addEventListener("click", () => {
                onVesselSelect(vessel.id);
            });

            const marker = new mapboxgl.Marker({
                element: markerElement,
            })
                .setLngLat([vessel.longitude, vessel.latitude])
                .setPopup(
                    new mapboxgl.Popup({
                        offset: 20,
                        closeButton: true,
                        closeOnClick: true,
                        className: "fleetops-popup",
                    }).setHTML(
                        createPopupContent(
                            vessel.id,
                            vessel.name,
                            vessel.imo,
                            vessel.status,
                            vessel.speed,
                            vessel.heading
                        )
                    )
                )
                .addTo(map.current!);

            markers.current.set(vessel.id, marker);
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, []);

    useEffect(() => {
        if (!map.current || !selectedVesselId) {
            return;
        }

        markers.current.forEach((marker, vesselId) => {
            const element = marker.getElement();

            element.classList.toggle(
                "fleetops-vessel-marker--selected",
                vesselId === selectedVesselId
            );
        });

        const vessel = mockVessels.find(
            (vessel) => vessel.id === selectedVesselId
        );

        const marker = markers.current.get(selectedVesselId);

        if (!vessel || !marker) {
            return;
        }

        map.current.flyTo({
            center: [vessel.longitude, vessel.latitude],
            zoom: 6,
            duration: 1000,
        });

        markers.current.forEach((marker) => {
            marker.getPopup()?.remove();
        });

        marker.togglePopup();
    }, [selectedVesselId]);

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-100">
                        Fleet Map
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Current vessel positions
                    </p>
                </div>
            </div>

            <div
                ref={mapContainer}
                className="h-125 w-full"
            />
        </div>
    );
}