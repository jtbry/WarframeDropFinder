const fs = require('fs')
const path = require('path')

function writeSpecToFile (spec) {
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data')
  }
  fs.writeFileSync('./data/swagger.json', JSON.stringify(spec))
}

const responses = [
  { code: 200, desc: 'OK', content: { 'application/json': {} } },
  { code: 400, desc: 'INVALID REQUEST', content: { 'application/json': {} } },
  { code: 404, desc: 'NOT FOUND', content: { 'application/json': {} } },
  { code: 500, desc: 'SERVER ERROR', content: { 'application/json': {} } }
]

function getSpecFromRoute (path, tags) {
  const routeDocs = require(path).spec
  if (routeDocs && routeDocs.length > 0) {
    const spec = {}
    for (const doc of routeDocs) {
      const docSpec = {
        tags: [tags],
        summary: doc.summary
      }

      if (doc.consumes) docSpec.consumes = doc.consumes
      else docSpec.consumes = 'application/json'
      if (doc.reqBody) {
        // Route's request body
        // todo: use request body to generate the parameters field as well
        docSpec.requestBody = {}
        if (doc.reqBody.required) docSpec.requestBody.required = true
        if (doc.reqBody.schema) {
          docSpec.requestBody.content = {
            'application/json': {
              schema: doc.reqBody.schema,
              required: doc.reqBody.requiredParams
            }
          }
        }
      }
      docSpec.responses = {}
      for (const response of doc.responses) {
        const matchingResp = responses.find(r => r.code === response)
        docSpec.responses[response] = {
          description: matchingResp.desc
        }
      }

      spec[doc.method] = docSpec
    }
    return spec
  } else return undefined
}

function generateSwaggerDocs (routePath) {
  // Default SwaggerUI details
  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'WFDF API',
      description: 'Documentation for Warframe Drop Finder REST API.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      version: '1.0.0'
    },
    servers: [
      { url: '/api/v1' }
    ],
    tags: [
      { name: 'general' }
    ],
    paths: {}
  }

  // Generate route documentations
  const files = fs.readdirSync(routePath)
  for (const file of files) {
    const fstat = fs.lstatSync(path.join(routePath, file))
    const fileName = path.parse(file).name
    if (fstat.isFile()) {
      // Process file
      if (file !== 'index.js') {
        const routeSpec = getSpecFromRoute(path.join(routePath, file), 'general')
        if (routeSpec) spec.paths['/' + fileName] = routeSpec
      }
    } else if (fstat.isDirectory()) {
      // Process directory
      spec.tags.push({ name: file })
      const dirFiles = fs.readdirSync(path.join(routePath, file))
      for (const dirFile of dirFiles) {
        const dirFileName = path.parse(dirFile).name
        if (dirFile !== 'index.js') {
          const routeSpec = getSpecFromRoute(path.join(routePath, file, dirFile), file)
          if (routeSpec) {
            if (fileName === dirFileName) spec.paths['/' + fileName] = routeSpec
            else spec.paths['/' + fileName + '/' + dirFileName] = routeSpec
          }
        }
      }
    }
  }

  // Write spec to output file
  writeSpecToFile(spec)
}

module.exports = generateSwaggerDocs
