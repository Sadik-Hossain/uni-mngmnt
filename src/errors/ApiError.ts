class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
      /* 
        * this refers to the current object instance 
        * this.constructor refers to the constructor function of that object. 
        * By passing these arguments to Error.captureStackTrace(), the method will capture the stack trace and attach it to the current object instance.
        
        */
    }
  }
}
export default ApiError
