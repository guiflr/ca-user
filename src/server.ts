import express from 'express'
import userRoutes from './routes/users'

const app = express()

app.use(express.json())
app.use('/api', userRoutes)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
