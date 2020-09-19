class DataSource {
  static searchBook (keyword) {
    return fetch(
            `api?${keyword}`
    ).then(response => {
      return response.json()
    }).then(responseJson => {
      if (responseJson.results) {
        return Promise.resolve(responseJson)
      } else {
        return Promise.reject(`${keyword} is not found`)
      }
    })
  }
}
export default DataSource
