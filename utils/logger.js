const requestLogger = (request, response, next) => {
    console.log('Methd:', request.method)
    console.log('Path:', request.path)
    console.log('Headers', request.headers)
    console.log('Body:', request.body)
    console.log('Query', request.query)
    console.log('Params', request.params)
    console.log('Cookies', request.cookies)
    console.log('--------------')
    next();
}

export default requestLogger;