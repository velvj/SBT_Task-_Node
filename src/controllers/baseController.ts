import ResponseCode from "../responses/response";
import { ResponseStatus } from "../responseCode/code";
import { ExceptionErrors } from "../exceptions/handler";
// const MessageTypes = require('../responses/types');

import { ConsoleLog } from "../utils/consoleLog";

/**
 * Base controller class which inherits all util methods
 * to use in the derived classes
 */
export class BaseController {
  public success: any;
  public errors: any;
  public status: any;
  public exceptions: any;
  public consolelogs: any;
  constructor() {
    // Method to send success response
    this.success = ResponseCode.success;
    // Method to send error response
    this.errors = ResponseCode.errors;
    // Status code
    this.status = ResponseStatus;
    // Success status message
    // this.messageTypes = MessageTypes;
    // Exception messages
    this.exceptions = ExceptionErrors;

    this.consolelogs = ConsoleLog;
  }
}
// export default new BaseController();
