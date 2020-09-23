class DataSource {
  static searchBook (keyword) {
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
    ).then(response => {
      return response.json()
    }).then(responseJson => {
      if (responseJson.items) {
        return Promise.resolve(responseJson)
      } else {
        return Promise.reject(`${keyword} is not found`)
      }
    })
  }
}
export default DataSource
