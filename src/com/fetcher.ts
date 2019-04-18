import * as _ from 'lodash'
import axios from 'axios'

const API = 'http://10.1.1.90:3001/'

interface GETHeader {
	source: string,
	header?: object,
	params?: object,
	timeout?: number
}
interface POSTHeader extends GETHeader {
	data: object
}
const defaultFetcherProps = {
	header: {},
	params: {},
	timeout: 10000,
}
const Fetcher = {
	GET: (_props: GETHeader) => {
		const props = _.merge(_.cloneDeep(defaultFetcherProps), _props)
		const { source, header, params, timeout } = props
		let CancelToken = axios.CancelToken
		let tokenSource = CancelToken.source()

		var request = {
			method: 'GET',
			url: API + source,
			headers: header,
			params: params,
			timeout: timeout,
			json: true,
			cancelToken: tokenSource.token
		}
		return { request: axios(request), tokenSource: tokenSource }
	},
	POST: (_props: POSTHeader) => {
		const props = _.merge(_.cloneDeep(defaultFetcherProps), _props)
		const { source, data, header, params, timeout } = props
		let CancelToken = axios.CancelToken
		let tokenSource = CancelToken.source()

		var request = {
			method: 'POST',
			url: API + source,
			data: data,
			headers: header,
			params: params,
			timeout: timeout,
			json: true,
			cancelToken: tokenSource.token
		}
		return { request: axios(request), tokenSource: tokenSource }
	},
	makeBody: (dataSet: object) => {
		let body: any = {}

		if (dataSet)
			for (let [dataKey, dataContent] of Object.entries(dataSet))
				body[dataKey] = dataContent
		return body
	},
	interpretError: (error: any, counter: number) => {
		if (counter > 1)
			return { type: 'cancel', status: 0, message: 'Current request was aborted, waiting for the remaining requests...' }

		if (axios.isCancel(error))
			return { type: 'cancel', status: 1, message: 'Request was canceled' }

		if (error.code === 'ECONNABORTED')
			return { type: 'error', status: 408, message: 'Request timed out' }

		if (error.response)
			switch (error.response.status) {
				case 401: return { type: 'responseError', status: error.response.status, message: 'Unauthorized' }
				case 404: return { type: 'responseError', status: error.response.status, message: 'Not found on server' }
				case 500: return { type: 'responseError', status: error.response.status, message: 'Server error' }
				case 502: return { type: 'responseError', status: error.response.status, message: 'Bad Gateway' }
				default: return { type: 'responseError', status: error.response.status, message: 'Unknown Error' }
			}

		if (error.request)
			return { type: 'requestError', status: 2, message: 'Client could not get any response' }

		return { type: 'genericError', status: 3, message: 'Generic error' }
	}
}

export {
	API,
	Fetcher
}