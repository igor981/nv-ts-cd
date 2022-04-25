import express, { Application} from 'express'
import router from './routes/routes'


const app: Application = express()
const port = process.env.PORT || 3001

app.use(router)

app.listen(port, () => {
    console.log('App listening on port:' + port);    
})