const winston = require('winston')

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
)

const fileTimestamp = new Date().toDateString().replace(/ /g, '-')
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3
}
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  sql: 'blue'
}

winston.addColors(colors)
const logger = winston.createLogger({
  level: 'info',
  levels: levels,
  transports: [
    new winston.transports.File({ filename: `./logs/${fileTimestamp}_error.log`, format: productionFormat, level: 'error' }),
    new winston.transports.File({ filename: `./logs/${fileTimestamp}_combined.log`, format: productionFormat })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.level = 'http'
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(info => `[${info.level}] ${info.message}`)
      )
    })
  )
}

module.exports = logger
