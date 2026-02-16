'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationPickerProps {
    position: [number, number] | null;
    onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ position, onLocationSelect }: LocationPickerProps) {
    const map = useMap();

    // Fly to position when it changes externally (e.g. from address input)
    useEffect(() => {
        if (position) {
            map.flyTo(position, map.getZoom());
        }
    }, [position, map]);

    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function LocationPicker({ position, onLocationSelect }: LocationPickerProps) {
    // Default center: Poland (roughly) or Warsaw
    const defaultCenter: [number, number] = [52.2297, 21.0122];

    return (
        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            <MapContainer
                center={position || defaultCenter}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} onLocationSelect={onLocationSelect} />
            </MapContainer>
        </div>
    );
}
