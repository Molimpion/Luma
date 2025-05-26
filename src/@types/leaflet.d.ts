import "leaflet";

declare module "leaflet" {
  interface IconOptions {
    iconRetinaUrl?: string;
    iconUrl?: string;
    shadowUrl?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    shadowSize?: [number, number];
  }
}
