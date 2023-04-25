// const messageTypes = require('../responses/types')
import  { ResponseStatus }  from "../responseCode/code"

class Response {
  
 async success(req: any, res: any, status: any, data = null, message = 'success') {
    try {
      console.log('************************** Response');

      if (data == null) {
        data._id = '';
      }
      // if (status == ResponseStatus.HTTP_OK) {
    
      //   //req.appLogger.info(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value?req.value:{})} | Response :  ${JSON.stringify(data)}`)      
      // //   req.winstonLogger.logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, { tags: `${req.originalUrl}`, additionalInfo: { body: req.body, responseTime: res.responseTime, status: status, message: message,UserId:data._id,headers: req.headers } });
      // } else {
  
      //  // req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value?req.value:{})} | Error : ${message}`)
      // //   req.winstonLogger.logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, { tags: `${req.originalUrl}`, additionalInfo: { body: req.body, responseTime: res.responseTime, status: status, message: message,UserId: data._id, headers: req.headers } });
      // }

      return res.status(status).json({
        status,
        message,
        data
      });
    } catch (error) {
      console.log('************************** Response success',error);

    }
  }


  async errors(req: any, res: any, status: any, message: any) {
    try {
        //  req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value?req.value:{})} | Error : ${message}`)
    // req.winstonLogger.logger.log('error', `Requesting ${req.method} ${req.originalUrl}`, { tags: `${req.originalUrl}`, additionalInfo: { body: req.body, status: status, message: message, headers: req.headers } });
      //  res.set('Cache-control', 'no-cache', 'no-store')
      // res.header('X-Frame-Options', 'SAMEORIGIN')
      // res.removeHeader("X-Powered-By");
    return res.status(status).json({
      status,
      message
    });
    } catch (error) {
      console.log('************************** errors',error);

    }
  }

  // joierrors(req, res, err) {  
  //   let error = err.details.reduce((prev, curr) => {
  //     prev[curr.path[0]] = curr.message.replace(/"/g, '');
  //     return prev;
  //   }, {});
  //   let message = messageTypes.badRequest();
  //   let status = responseStatus.HTTP_BAD_REQUEST;
  //  // req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value?req.value:{})} | BadRequestError : ${JSON.stringify(error)}`)
  //   // req.winstonLogger.logger.log('error', `Requesting ${req.method} ${req.originalUrl}`, { tags: `${req.originalUrl}`, additionalInfo: { body: req.body, status: status, message: error, headers: req.headers } });

  //   return res.status(status).json({
  //     status,
  //     message,
  //     error
  //   });
  // }
}

// export = { Response };
export default new Response();
// module.exports = new Response();