"use client";

import { useEffect, useRef, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { Vessel, VesselStatus } from "../../types/vessel";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

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
    vessels: Vessel[];
    onReload: () => void;
    isReloading: boolean;
};

export default function FleetMap({
    selectedVesselId,
    onVesselSelect,
    vessels,
    onReload,
    isReloading,
}: FleetMapProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);

    const map = useRef<mapboxgl.Map | null>(null);

    const markers = useRef<Map<string, mapboxgl.Marker>>(
        new Map()
    );

    const [mapReady, setMapReady] = useState(false);

    /*
     * Initialize Mapbox once.
     */
    useEffect(() => {
        if (!mapContainer.current || map.current) {
            return;
        }

        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [15, 45],
            zoom: 3,
        });

        map.current = mapInstance;

        const handleLoad = () => {
            setMapReady(true);
        };

        mapInstance.once("load", handleLoad);

        return () => {
            mapInstance.off("load", handleLoad);
            mapInstance.remove();

            map.current = null;
            markers.current.clear();
            setMapReady(false);
        };
    }, []);

    /*
     * Synchronize vessel markers with vessel data.
     *
     * The Mapbox map is never recreated here.
     */
    useEffect(() => {
        const currentMap = map.current;

        if (!currentMap || !mapReady) {
            return;
        }

        /*
         * Create markers for new vessels.
         */
        vessels.forEach((vessel) => {
            const existingMarker = markers.current.get(
                vessel.id
            );

            if (existingMarker) {
                /*
                 * Existing marker:
                 * only update its geographic position.
                 */
                existingMarker.setLngLat([
                    vessel.longitude,
                    vessel.latitude,
                ]);

                return;
            }

            /*
             * New vessel:
             * create its marker.
             */
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
                .setLngLat([
                    vessel.longitude,
                    vessel.latitude,
                ])
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
                .addTo(currentMap);

            markers.current.set(vessel.id, marker);
        });

        /*
         * Remove markers for vessels that no longer exist.
         */
        markers.current.forEach((marker, vesselId) => {
            const vesselExists = vessels.some(
                (vessel) => vessel.id === vesselId
            );

            if (!vesselExists) {
                marker.remove();
                markers.current.delete(vesselId);
            }
        });
    }, [vessels, mapReady, onVesselSelect]);

    /*
     * Handle vessel selection.
     */
    useEffect(() => {
        const currentMap = map.current;

        if (
            !currentMap ||
            !mapReady ||
            !selectedVesselId
        ) {
            return;
        }

        markers.current.forEach((marker, vesselId) => {
            const element = marker.getElement();

            element.classList.toggle(
                "fleetops-vessel-marker--selected",
                vesselId === selectedVesselId
            );
        });

        const vessel = vessels.find(
            (vessel) => vessel.id === selectedVesselId
        );

        const marker = markers.current.get(
            selectedVesselId
        );

        if (!vessel || !marker) {
            return;
        }

        currentMap.flyTo({
            center: [
                vessel.longitude,
                vessel.latitude,
            ],
            zoom: 6,
            duration: 1000,
        });

        markers.current.forEach((marker) => {
            marker.getPopup()?.remove();
        });

        marker.togglePopup();
    }, [
        selectedVesselId,
        vessels,
        mapReady,
    ]);

    /*
     * Reload vessel data.
     *
     * We deliberately do NOT remove the markers here.
     * The updated vessel data will cause the synchronization
     * effect above to move existing markers.
     */
    const handleReload = () => {
        onReload();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-100">
                        Fleet Map
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Current vessel positions
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleReload}
                    disabled={isReloading}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isReloading ? "Reloading..." : "Reload"}
                </button>
            </div>

            <div
                ref={mapContainer}
                className="h-125 w-full"
            />
        </div>
    );
}