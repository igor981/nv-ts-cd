import VehicleIF from "../interfaces/vehicle";

export class Vehicle  implements VehicleIF {
    id: number;
    vehicleType: string;
    
    constructor(id: number, vehicleType: string) {
        this.id = id,
        this.vehicleType = vehicleType
    }
    getVehicleType(): string {
        return this.vehicleType;
    }
}
