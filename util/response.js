import _ from 'underscore'

const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UnProcessable_Entity: 422,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  Not_Acceptable: 406,
  Conflict: 409,
  Request_Timeout: 408
}

const msg = {
  success: 'success',
  serverError: 'serverError',
  apiNotFound: 'apiNotFound',
  invalidParams: 'invalidParams',
  dataNotFound: 'dataNotFound',
  noPermission: 'noPermission',
  insertSuccess: 'insertSuccess',
  insertBulkSuccess: 'insertBulkSuccess',
  updateSuccess: 'updateSuccess',
  deleteSuccess: 'deleteSuccess',
  getSuccess: 'getSuccess',
  getAllSuccess: 'getAllSuccess',
  insertError: 'insertError',
  updateError: 'updateError',
  getError: 'getError',
  getAllError: 'getAllError',
  deleteError: 'deleteError',
  dbError: 'dbError',
  byIdError: 'byIdError',
  idReq: 'idReq',
  notAuthorized: 'notAuthorized',
  databaseError: 'databaseError',
  typeError: 'typeError',
  databaseValidationError: 'databaseValidationError',
  integerReq: 'integerReq',
  boolReq: 'boolReq',
  noEmployeeFound: 'noEmployeeFound',
  noServiceFound: 'noServiceFound',
  invalidAdmin: 'invalidAdmin',
  invalidUser: 'invalidUser',
  invalidVendor: 'invalidVendor',
  alreadyExitsRecord: 'alreadyExitsRecord',
  invalidLocations: 'invalidLocations',
  invalidOperation: 'invalidOperation',
  userNotFound: 'userNotFound',
  provideReqParams: 'provideReqParams',
  validBoolean: 'validBoolean',
  ipPermissionDeny: "ipPermissionDeny",
  limitInValid: "limitInValid",
  pageInValid: "pageInValid"
}


/**
 * Response data with status code 200 (OK)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {Object} data return data
 * @param {String} message key to get code and message
 */
const rS200 = (res, data = {}, message = msg.success) => {
  const code = HttpStatus.OK;
  const result = {
    success: true,
    message,
    code
  }
  result.data = _.isEmpty(data) ? undefined : data
  return res.status(HttpStatus.OK).send(result)
}
/**
 * Response data with status code 200 (OK)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {Object} data return data
 * @param {String} message key to get code and message
 */
const r200 = (res, data = {}, message = msg.success) => {
  const code = HttpStatus.OK;
  const result = {
    message,
    code
  }
  result.data = _.isEmpty(data) ? undefined : data
  return res.status(HttpStatus.OK).send(result)
}

/**
 * Response data with status code 201 (Created)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {Object} data return data
 * @param {String} message key to get code and message
 */
const r201 = (res, data = {}, message = msg.success) => {
  const result = {
    message,
    code: HttpStatus.CREATED
  }
  result.data = _.isEmpty(data) ? undefined : data
  return res.status(HttpStatus.CREATED).send(result)
}

/**
 * Response data with status code 400 (BAD REQUEST)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} message key to get code and message
 */
const r400 = (res, message = invalidParams,) => {
  return res.status(HttpStatus.BAD_REQUEST).send({
    message,
    status: "failure",
    code: HttpStatus.BAD_REQUEST,
  })
}

/**
 * Response data with status code 401 (UNAUTHORIZED)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} message key to get code and message
 */
const r401 = (res, message = noPermission) => {
  return res.status(HttpStatus.UNAUTHORIZED).send({
    message,
    status: "failure",
    code: HttpStatus.UNAUTHORIZED,
  })
}

/**
 * Response data with status code 404 (NOT FOUND)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} message key to get code and message
 */
const r404 = (res, message = dataNotFound) => {
  return res.status(HttpStatus.NOT_FOUND).send({
    message,
    status: "failure",
    code: HttpStatus.NOT_FOUND,
  })
}


/**
 * Response data with status code 500 (SERVER ERROR)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 */
const r500 = (res, message = serverError) => {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    message,
    status: "failure",
    code: HttpStatus.INTERNAL_SERVER_ERROR,
  })
}



export default { rS200, r200, r201, r400, r401, r404, r500, rS200 }