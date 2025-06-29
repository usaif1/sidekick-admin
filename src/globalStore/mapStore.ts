import { create } from "zustand";
import createSelectors from "@/utils/selectors";

type MapLocation = {
  lat: number;
  lng: number;
  zoom?: number;
};

type MapStore = {
  targetLocation: MapLocation | null;
  shouldPanToLocation: boolean;
};

type MapActions = {
  setTargetLocation: (location: MapLocation) => void;
  clearTargetLocation: () => void;
  setPanToLocation: (shouldPan: boolean) => void;
};

const mapInitialState: MapStore = {
  targetLocation: null,
  shouldPanToLocation: false,
};

const mapStore = create<MapStore & MapActions>((set) => ({
  ...mapInitialState,
  setTargetLocation: (location) =>
    set({ targetLocation: location, shouldPanToLocation: true }),
  clearTargetLocation: () =>
    set({ targetLocation: null, shouldPanToLocation: false }),
  setPanToLocation: (shouldPan) => set({ shouldPanToLocation: shouldPan }),
}));

export default createSelectors(mapStore); 