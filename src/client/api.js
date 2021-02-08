export const apiCall = async ({ method, page = 1, body, headers }) => {
  const apiBaseUrl = "/api/profile";

  const url_ = `${apiBaseUrl}?page=${page}`;

  const requestOptions = {
    method,
    headers: headers,
    body: body
  };
  return fetch(url_, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res;
      }
    })
    .catch((error) => {
      console.log(error);
      return 500;
    });
};
