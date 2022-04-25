import Vehicle from "./vehicle";

interface DbObject {
    vehicle: VehicleDB,
    dates?: string[]
}


interface VehicleDB {
    id: number,
    vehicleType: string,
}

export default DbObject;