export type car = {
  name: string;
  licensePlate: string;
  brand: string;
  created_at: Date;
  type: "parked" | "wash";
  id: string;
};

export type serviceType = {
  service: string;
  created_at: Date;
};

export interface unifiedCar extends car {
  services: serviceType[];
}
