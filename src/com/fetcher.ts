import _ from 'lodash'
import axios, { CancelTokenSource } from 'axios'

const API = 'http://0.0.0.0:3001/'
// const API = 'https://travel-recommendation-sihc.herokuapp.com/'

interface GETHeader {
	source: string,
	header?: {
		auth_token: string | null,
		[key: string]: any
	},
	params?: object,
	timeout?: number
}
interface POSTHeader extends GETHeader {
	data: object
}
interface PATCHHeader extends GETHeader {
	data: object
}
interface DELETEHeader extends GETHeader {
	data: object
}
export type FetchStatusProps = {
	ready?: boolean,
	cancelToken: CancelTokenSource | undefined
}
const defaultFetcherProps = {
	header: {},
	params: {},
	timeout: 10000,
}
const Fetcher = {
	GET: ($props: GETHeader) => {
		const props = _.merge(_.cloneDeep(defaultFetcherProps), $props)
		props.header['auth_token'] = window.localStorage.getItem('TOKEN')
		const { source, header, params, timeout } = props
		const CancelToken = axios.CancelToken
		const tokenSource = CancelToken.source()

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
	POST: ($props: POSTHeader) => {
		const props = _.merge(_.cloneDeep(defaultFetcherProps), $props)
		props.header['auth_token'] = window.localStorage.getItem('TOKEN')
		const { source, data, header, params, timeout } = props
		const CancelToken = axios.CancelToken
		const tokenSource = CancelToken.source()

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
	PATCH: ($props: PATCHHeader) => {
		const props = _.merge(_.cloneDeep(defaultFetcherProps), $props)
		props.header['auth_token'] = window.localStorage.getItem('TOKEN')
		const { source, data, header, params, timeout } = props
		const CancelToken = axios.CancelToken
		const tokenSource = CancelToken.source()

		var request = {
			method: 'PATCH',
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
	DELETE: ($props: DELETEHeader) => {
		const props = _.merge(_.cloneDeep(defaultFetcherProps), $props)
		props.header['auth_token'] = window.localStorage.getItem('TOKEN')
		const { source, data, header, params, timeout } = props
		const CancelToken = axios.CancelToken
		const tokenSource = CancelToken.source()

		var request = {
			method: 'DELETE',
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
