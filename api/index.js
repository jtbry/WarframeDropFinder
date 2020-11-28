const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cluster = require('cluster')
const cpuCount = require('os').cpus().length
const mongoClient = require('mongodb').MongoClient
const mongoDbUrl = process.env.mongoConnectionUrl || 'mongodb://localhost:27017'
const app = express()
const logger = require('./helpers/logger')

// todo: caching with redis, maybe with nginx
// todo: set up unit testing
async function main () {
  if (cluster.isMaster && process.env.NODE_ENV === 'production') {
    // Fork the app into clusters from main.
    for (let i = 0; i < cpuCount; ++i) {
      cluster.fork()
    }

    // Restart a cluster when it exits
    cluster.on('exit', (worker, code, signal) => {
      logger.warn(`${worker.process.pid} exited (${code} ${signal})`)
      setTimeout(() => cluster.fork(), 2000)
    })
  } else {
    // Create express app if this is a cluster process
    try {
      // Middleware
      app.use(helmet())
      app.use(compression())
      app.use(express.json())
      app.use((err, req, res, next) => {
        if (err instanceof SyntaxError) {
          res.status(400).json({ error: 'Invalid JSON Object given' })
        } else {
          next()
        }
      })

      // Set up debug logging
      if (process.env.NODE_ENV !== 'production') {
        // HTTP Requests
        app.use((req, res, next) => {
          logger.http(`${req.method} ${req.path} ${req.ip}`)
          next()
        })
      }

      // Database Connection
      const client = await mongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
      const db = client.db('wfdf')
      app.set('db', db)

      // Routes
      app.get('/', (req, res) => { res.send('You can view docs at <a href="/api/docs">/api/docs</a>') })
      app.use(require('./routes'))

      // Listen
      app.listen(8080)
        .on('error', (err) => { throw err })
        .on('listening', () => { logger.info(`Worker ${process.pid} is ready.`) })
    } catch (err) {
      logger.error(err.stack)
      process.exit(1)
    }
  }
}

main()
