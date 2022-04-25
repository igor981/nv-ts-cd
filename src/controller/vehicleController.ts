import {Request, Response} from 'express'
import vehicleList from '../db/vehicleList'
import getTax from './congestionTaxCalculator'
import DbObject from '../interfaces/dbObject'
import { Vehicle } from '../models/vehicle'



export const vehicleTaxTotal = (req: Request, res: Response) => {
    try {
      const vehicleId = parseInt(req.params.id);
      // Filtering the database to find the correct vehicle
      const item: DbObject = vehicleList.filter(
        (item) => item.vehicle.id === vehicleId
      )[0];

      // Checking if there has been a match, otherwise throw 404.
      if (item) {
        // Creating a new instance of the vehicle class using the key values of the previous match.
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        const totalTax = getTax(vehicle, item.dates!);
        
        res.status(200).send({ ...item, cost: totalTax });
      } else {
        res.status(404).send({ error: "Vehicle of that ID does not exist" });
      }
    } catch (error: any) {
        res.send({error: error.message})
    } 
}

export const vehicleTaxMonth = (req: Request, res: Response) => {
    try {
      const vehicleId = parseInt(req.params.id);
      let month = req.params.month;

      const item: DbObject = vehicleList.filter(
        (item) => item.vehicle.id === vehicleId
      )[0];

      if (item) {
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType);

        // Formatting the string to match the date string
        if (month.length == 1) {
          month = month.padStart(2, "0");
        }

        // Filtering the dates that matches the url param, the date string gets split in order to compare the months.
        const rightMonth: string[] = item.dates!.filter((date: string) => {
          const dbMonth = date.split(" ")[0].split("-")[1];
          if (month === dbMonth) return date
        });
        const totalTax = getTax(vehicle, rightMonth);

        res.status(200).send({ ...item, dates: rightMonth, cost: totalTax });
      } else {
        res.status(404).send({ error: "Vehicle of that ID does not exist" });

      }
    } catch (error: any) {
        res.send({error: error.message})
    }
}

export const vehicleTaxDay = (req: Request, res: Response) => {
    try {
      const vehicleId = parseInt(req.params.id);
      let month = req.params.month;
      let day = req.params.day;

      const item: DbObject = vehicleList.filter(
        (item) => item.vehicle.id === vehicleId
      )[0];

      
      // Same process but with specific day of the month
      if (item) {
        const vehicle = new Vehicle(item.vehicle.id, item.vehicle.vehicleType)
        if (month.length == 1) {
          month = month.padStart(2, "0");
        }
        if (day.length == 1) {
          day = day.padStart(2, "0");
        }

        const rightMonthAndDay: string[] = item.dates!.filter((date: string) => {
          const dbMonth = date.split(" ")[0].split("-")[1];
          const dbDay = date.split(" ")[0].split("-")[2];

          if (month === dbMonth && day === dbDay) return date
        });
        const totalTax = getTax(vehicle, rightMonthAndDay);

        res.status(200).send({ ...item, dates: rightMonthAndDay, cost: totalTax });
      } else {
        res.status(404).send({ error: "Vehicle of that ID does not exist" });
        return;
      }
    } catch (error: any) {
      res.send({ error: error.message });
    }
}