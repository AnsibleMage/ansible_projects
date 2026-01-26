import { create } from 'zustand';

// Block 1 (Flight Control System)의 Flight State를 Block 4에서 사용하기 위한 store
// 실제 Block 1과 연동 시 해당 store로 대체 예정

interface FlightState {
  currentSpeed: number; // km/h
  setSpeed: (speed: number) => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  currentSpeed: 0,
  setSpeed: (speed: number) => set({ currentSpeed: speed }),
}));
