async function SendRequest(requestOptions, url) {
  const server = "http://192.168.10.8:8701";

  return fetch(server + url, requestOptions)
    .then((response) => {
      if ((response.status >= 500) & !response.ok) {
        localStorage.setItem("token", null);
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    });
}
export default SendRequest;
