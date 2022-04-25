import Vehicle from "../interfaces/vehicle";

enum TollFreeVehicles {
	Motorcycle,
	Emergency,
	Diplomat,
	Foreign,
	Military,
  Buss
  }

function getTax(vehicle: Vehicle, dates: string[]): number {
    if (dates.length <= 0) return 0;
    
    const dateMap = new Map()
    let totalFee: number = 0;    

    for (let i = 0; i < dates.length; i++) {
      const date: Date = new Date(dates[i]);

      const month: number = date.getMonth() + 1;
      const dayOfMonth: number = date.getDate();
      const mapString = `${month}:${dayOfMonth}`;

      let dayFee = 0;

      if (dateMap.has(mapString)) continue;
      dateMap.set(mapString, 0);

      for (let j = i; j < dates.length; j++) {
        const nextDate = new Date(dates[j]);
        const previousDate = new Date(dates[j - 1]);

        const monthNew: number = nextDate.getMonth() + 1;
        const dayOfMonthNew: number = nextDate.getDate();

        if (month === monthNew && dayOfMonth === dayOfMonthNew) {
          let preFee: number = getTollFee(previousDate, vehicle);
          let feeNew: number = getTollFee(nextDate, vehicle);

          let diffInMillies = nextDate.getTime() - previousDate.getTime();
          let minutes = diffInMillies / 1000 / 60;

          if (minutes <= 60) {
            if (dayFee > 0) dayFee -= preFee;
            if (preFee >= feeNew) feeNew = preFee;
            dayFee += feeNew;
          } else {
            dayFee += feeNew;
          }
        } else {
          break;
        }
      }

      if (dayFee > 60) dayFee = 60;

      dateMap.set(mapString, dayFee);
    }

    dateMap.forEach((val, key) => {
      totalFee += val;
    });
      
      return totalFee;

}

function isTollFreeVehicle(vehicle: Vehicle): boolean {
    if (vehicle == null) return false;
    const vehicleType: string = vehicle.getVehicleType();    
    const result = vehicleType == TollFreeVehicles[TollFreeVehicles.Motorcycle] ||
           vehicleType == TollFreeVehicles[TollFreeVehicles.Emergency] ||
           vehicleType == TollFreeVehicles[TollFreeVehicles.Diplomat] ||
           vehicleType == TollFreeVehicles[TollFreeVehicles.Foreign] ||
           vehicleType == TollFreeVehicles[TollFreeVehicles.Buss] ||
           vehicleType == TollFreeVehicles[TollFreeVehicles.Military];
           return result
           
}

function getTollFee(date: Date, vechicle: Vehicle): number {
  if (isTollFreeDate(date) || isTollFreeVehicle(vechicle)) return 0;

  const hour: number = date.getHours();

  const minute: number = date.getMinutes();

  if (hour == 6 && minute >= 0 && minute <= 29) return 8;
  if (hour == 6 && minute >= 30 && minute <= 59) return 13;
  if (hour == 7 && minute >= 0 && minute <= 59) return 18;
  if (hour == 8 && minute >= 0 && minute <= 29) return 13;

  if (hour >= 8 && minute >= 30) {
    if (hour <= 14 && minute <= 59) {
      return 8;
    }
  }
  if (hour == 15 && minute >= 0 && minute <= 29) return 13;
  if ((hour == 15 && minute >= 30) || (hour == 16 && minute <= 59)) return 18;
  if (hour == 17 && minute >= 0 && minute <= 59) return 13;
  if (hour == 18 && minute >= 0 && minute <= 29) return 8;
  return 0;
}

function isTollFreeDate(date: Date): boolean {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDay();
  const dayOfMonth: number = date.getDate();

  if (day == 6 || day == 0) {
    return true;
  }

  if (year == 2013) {
    if (
      (month == 1 && dayOfMonth == 1) ||
      (month == 3 && (dayOfMonth == 28 || dayOfMonth == 29)) ||
      (month == 4 && (dayOfMonth == 1 || dayOfMonth == 30)) ||
      (month == 5 && (dayOfMonth == 1 || dayOfMonth == 8 || dayOfMonth == 9)) ||
      (month == 6 &&
        (dayOfMonth == 5 || dayOfMonth == 6 || dayOfMonth == 21)) ||
      month == 7 ||
      (month == 11 && dayOfMonth == 1) ||
      (month == 12 &&
        (dayOfMonth == 24 ||
          dayOfMonth == 25 ||
          dayOfMonth == 26 ||
          dayOfMonth == 31))
    ) {
      return true;
    }
  }
  return false;
}

export default getTax