async function SendRequest(requestOptions, url) {
  return fetch(url, requestOptions)
    .then((response) => {
      if ((response.status >= 500) & !response.ok) {
        localStorage.clear();
        alert(response.statusText);
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.message != null) {
        alert(data.message);
        localStorage.clear();
        throw new Error(data.message);
      } else {
        return data;
      }
    });
}
export default SendRequest;
