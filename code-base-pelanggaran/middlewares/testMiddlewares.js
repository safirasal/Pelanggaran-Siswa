exports.middleware1 = (request, response, next) => {
    let message = `This is da first middleware`
    console.log(message);
    next()
}
exports.middleware2 = (request, response, next) =>{
    let message = `This is second middleware`
    console.log(message);
    next()
}