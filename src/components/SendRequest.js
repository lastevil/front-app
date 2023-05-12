async function SendRequest(requestOptions, url) {
  const server = "http://localhost:8701";
  var dataTest = {};
  var errorMessage;
  var checkMes;

  dataTest = fetch(server + url, requestOptions)
    .then((response) => {
      if ((response.status >= 300) & !response.ok) {
        errorMessage = { code: response.status, message: response.statusText };
      }
      return response.json();
    })
    .catch((e) => {
      return errorMessage;
    });

  checkMes = dataTest.then((data) => {
    if (errorMessage != null) {
      if (data.message != null) {
        return data;
      }
      return errorMessage;
    }
    return data;
  });

  return checkMes;
}
export default SendRequest;
