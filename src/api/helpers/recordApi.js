// адаптер Record API

// eslint-disable-next-line no-useless-escape
const regexp = /\[(\[\S+\]\.\[\S+\])\|ID=(\d+)\]\n(.+)\n.+/m
// const trans = 'The transaction ended in the trigger. The batch has been aborted.'
/*
1 = ParameterDirection.Input,
2 = ParameterDirection.Output,
3 = ParameterDirection.InputOutput
*/

/**
 * @typedef Parameter
 * @type {object}
 * @property {string} name
 * @property {'string'|'bigint'|'bit'} [type]
 * @property {0|1} [direction]
 * @property {*} value
 */

/**
 * @typedef Column
 * @type {object}
 * @property {string} name
 * @property {'json'} [type]
 */

/**
 *
 * @typedef RecordRequest
 * @type {object}
 * @property {string} procedure
 * @property {Parameter[]} [parameters]
 * @property {Column[]} [columns]
 */

/**
 * Http client
 * @param {RecordRequest} request
 * @returns {Promise<{ status: number, recordset: object[] } | never>}
 */
export function recordApi(request) {
  return fetch('/api/query', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(request),
  })
    .then(response => {
      if (!response.ok) {
        console.groupCollapsed(`/api/query: ${request.procedure} service error`)
        console.error(response.statusText)
        console.info(request)
        console.info(response)
        console.groupEnd()

        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(responseBody => {
      if (responseBody.status.code !== 200) {
        console.groupCollapsed(
          `/api/query: ${request.procedure} query error with code ${responseBody.status.code}`
        )
        console.error(responseBody.status.message)
        console.info(request)
        console.info(responseBody)
        console.groupEnd()

        throw new APIError(responseBody.status.message)
      }
      return responseBody
    })
}

export class APIError extends Error {
  constructor(message) {
    const [, code, id, clearMessage] = message.match(regexp)
    super(clearMessage)
    this.name = 'APIError'
    this.message = clearMessage
    this.procedure = code.replace(/\[|\]/g, '')
    this.fullMessage = `${this.procedure}: ${this.message}`
    this.id = id
  }
}
