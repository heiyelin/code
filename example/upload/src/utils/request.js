exports.request = function({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress = e => e,
  requestList,
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProgress
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
    xhr.onload = e => {
      if (requestList) {
        const xhrIndex = requestList.findIndex(i => i == xhr)
        requestList.splice(xhrIndex, 1)
      }
      resolve({
        data: e.target.response,
      })
    }
    requestList?.push(xhr)
  })
}
