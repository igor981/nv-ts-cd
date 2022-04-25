import 'ts-jest'
import vehicleList from '../src/db/vehicleList'
import getTax from '../src/controller/congestionTaxCalculator'
import { Vehicle } from '../src/models/vehicle'


const taxFreeDays: any = [
    '2013-01-01 07:00:00',
    '2013-03-28 07:00:00',
    '2013-03-29 07:00:00',
    '2013-04-01 06:23:27',
    '2013-04-30 06:23:27',
    '2013-05-01 15:27:00',
    '2013-05-08 15:27:00',
    '2013-05-09 15:27:00',
    '2013-06-05 06:27:00',
    '2013-06-06 06:27:00',
    '2013-06-21 06:27:00',
    '2013-07-08 06:20:27',
    '2013-11-01 14:35:00',
    '2013-12-24 15:29:00',
    '2013-12-25 15:29:00',
    '2013-12-26 15:29:00',
    '2013-12-31 15:29:00',
  ]
describe('Testing vehicle objects', () => {
    test('Function should return vehicle type', () => {
        const {vehicle} = vehicleList[0]
        const vehicleClass = new Vehicle(vehicle.id, vehicle.vehicleType)
        expect(vehicleClass.getVehicleType()).toBe('Car')
    })
    test('Vehicle type should be ', () => {
        const {vehicle} = vehicleList[2]
        const vehicleClass = new Vehicle(vehicle.id, vehicle.vehicleType)
        expect(vehicleClass.getVehicleType()).toBe('Motorcycle')
    })
})
describe('Testing tax calculator', () => {
    test('Tax should be higher than 0', () => {
        const item: any = vehicleList[0]
      
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBeGreaterThan(0)
    })
    test('Tax should be 60', () => {
        const item: any = vehicleList[0]
       
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(60)
    })
    test('Vehicle of type motorcycle shoud be tax free ', () => {
        const item: any = vehicleList[2]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(0)
    })
    test('Vehicle of type buss shoud be tax free ', () => {
        const item: any = vehicleList[3]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(0)
    })
    test('Vehicle of type emergency shoud be tax free ', () => {
        const item: any = vehicleList[4]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(0)
    })
    test('Vehicle of type diplomat shoud be tax free ', () => {
        const item: any = vehicleList[5]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(0)
    })
    test('Vehicle of type foreign shoud be tax free ', () => {
        const item: any = vehicleList[6]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(0)
    })
    test('Vehicle of type military shoud be tax free ', () => {
        const item: any = vehicleList[7]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(0)
    })
    test('Holidays should be tax free', () => {
        const item: any = vehicleList[1]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        expect(getTax(vehicle, taxFreeDays)).toBe(0)
    })
    test('No extra fee if the car passes a station within 60 minutes and the maount that must be paid is the highest one ', () => {
        const item: any = vehicleList[8]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(18)
    })
    test('Fee should not surpass 60kr', () => {
        const item: any = vehicleList[9]
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const dates = item.dates
        expect(getTax(vehicle, dates)).toBe(60)
    })
})
