# item-api
This service is responsible for running the back-end REST API that the [client](/client) app calls to. This API uses the [ExpressJS](https://expressjs.com/) framework amongst other technologies/frameworks.

## Route Documentation
The final result of this route documentation is an OpenAPI spec compliant file which is passed to Swagger. Documentation will be available on the `/api/docs` enpoint of any running instace of the API.

While the final result of documentation is an OpenAPI / Swagger documented API the actual in code documentation slightly differs from OpenAPI spec. Originally this project used swagger-jsdoc but it was cumbersoem to write out so much YAML for each route and took up a lot of space in route files.

Now swagger documentation is automatically generated from the exported `spec` field of all route files. The generation is handles in `/helpers/swaggerGenerator.js`. To see an example of this documentation in action look at any route files (other than index.js).