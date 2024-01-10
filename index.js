import express from 'express'
import mongoose, { Schema } from 'mongoose';
import cors from "cors"

const app = express()
const port = 3100
app.use(cors())

app.use(express.json())

const servicesSchema = new Schema({
    icons: String,
    title: String,
    description: String,

});

const servicesModel = mongoose.model('Football', servicesSchema);

app.get('/', async (req, res) => {
    try {
        const services = await servicesModel.find({})
        res.send(services)
    } catch (error) {
        res.send(error.message)

    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const services = await servicesModel.findById(id)
        res.send(services)
    } catch (error) {
        res.send(error.message)

    }
})

app.post('/', async (req, res) => {
    try {
        const { icons, title, description } = req.body
        const newServices = new servicesModel({ icons, title, description })
        await newServices.save()
        res.send('Ugurla elave olundu')
    } catch (error) {
        res.send(error.message)

    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { icons, title, description } = req.body
        const services = await servicesModel.findByIdAndUpdate(id, { icons, title, description })
        res.send(services)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const services = await servicesModel.findByIdAndDelete(id)
        res.send(services)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/')
.then(() => console.log('Connected!'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})