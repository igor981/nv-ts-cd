import 'ts-jest'
import axios from 'axios'

const url = `http://localhost:3001/vehicle/`
describe('Testing http requests', () => {
    test('Should be a succesful get request', async () => {
        const fetch = await axios.get(url + '1')
        expect(fetch.status).toBe(200)
    })
    test('Should return an object that contains vehicle object, an array of dates and cost', async () => {
        const vehicleObject = {
            vehicle: { id: 1, vehicleType: 'Car' },
            dates: [
              '2013-01-14 21:00:00',
              '2013-01-15 21:00:00',
              '2013-02-07 06:23:27',
              '2013-02-07 15:27:00',
              '2013-02-08 06:20:27',
              '2013-02-08 06:27:00',
              '2013-02-08 14:35:00',
              '2013-02-08 15:29:00',
              '2013-02-08 15:47:00',
              '2013-02-08 16:01:00',
              '2013-02-08 16:48:00',
              '2013-02-08 17:49:00',
              '2013-02-08 18:29:00',
              '2013-02-08 18:35:00',
              '2013-03-26 14:25:00',
              '2013-03-28 14:07:27'
            ],
            cost: 60
          }
        

        const fetch = await axios.get(url + '1')
        expect(fetch.data).toStrictEqual(vehicleObject)
    })
    test('Should return the same object but only include the cost and dates of only february ', async () => {
        const vehicleObject = {
            vehicle: { id: 1, vehicleType: 'Car' },
            dates: [
              '2013-02-07 06:23:27',
              '2013-02-07 15:27:00',
              '2013-02-08 06:20:27',
              '2013-02-08 06:27:00',
              '2013-02-08 14:35:00',
              '2013-02-08 15:29:00',
              '2013-02-08 15:47:00',
              '2013-02-08 16:01:00',
              '2013-02-08 16:48:00',
              '2013-02-08 17:49:00',
              '2013-02-08 18:29:00',
              '2013-02-08 18:35:00',
            ],
            cost: 60
          }
        

        const fetch = await axios.get(url + '1/2')
        expect(fetch.data).toStrictEqual(vehicleObject)
    })
    test('Should return the same object but only include the cost and only the date of 8th of february', async () => {
        const vehicleObject = {
            vehicle: { id: 1, vehicleType: 'Car' },
            dates: [
              '2013-02-08 06:20:27',
              '2013-02-08 06:27:00',
              '2013-02-08 14:35:00',
              '2013-02-08 15:29:00',
              '2013-02-08 15:47:00',
              '2013-02-08 16:01:00',
              '2013-02-08 16:48:00',
              '2013-02-08 17:49:00',
              '2013-02-08 18:29:00',
              '2013-02-08 18:35:00',
            ],
            cost: 39
          }
        

        const fetch = await axios.get(url + '1/2/8')
        expect(fetch.data).toStrictEqual(vehicleObject)
    })
    test('Should return the same object but with an empty array of dates if no matches were found', async () => {
        const vehicleObject = {
            vehicle: { id: 1, vehicleType: 'Car' },
            dates: [

            ],
            cost: 0
          }
        

        const fetch = await axios.get(url + '1/2/20')
        expect(fetch.data).toStrictEqual(vehicleObject)
    })
    test('Should return an emergency vehicle object with 0 cost', async () => {
        const vehicleObject = {
          vehicle: { id: 5, vehicleType: "Emergency" },
          dates: [
            "2013-01-14 21:00:00",
            "2013-01-15 21:00:00",
            "2013-02-07 06:23:27",
            "2013-02-07 15:27:00",
            "2013-02-08 06:27:00",
            "2013-02-08 06:20:27",
            "2013-02-08 14:35:00",
            "2013-02-08 15:29:00",
            "2013-02-08 15:47:00",
            "2013-02-08 16:01:00",
            "2013-02-08 16:48:00",
            "2013-02-08 17:49:00",
          ],
          cost: 0,
        };
        

        const fetch = await axios.get(url + '5')

        
        expect(fetch.data).toStrictEqual(vehicleObject)
    })
    test('Should return a 404 when the id is invalid', async () => {
        try {
            await axios.get(url + '11111211')
        } catch (error: any) {
            expect(error).toThrowError
        }
    })
  
})
