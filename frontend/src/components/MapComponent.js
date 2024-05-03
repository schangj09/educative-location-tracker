import { MapContainer, TileLayer } from "react-leaflet";

const center = [39.5834, 2.6462];
const zoom = 12;

export default function MapComponent() {
  return (
    <div className="w-full overflow-hidden relative z-0 h-screen">
      <MapContainer placeholder zoom={zoom} center={center} scrollWheelZoom={false} className="h-[90%] w-auto leaflet-container">
        <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         >

        </TileLayer>
      </MapContainer>
    </div>
  );
}
