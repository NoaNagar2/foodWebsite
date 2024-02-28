const TOKEN = "token";

const isLocalStorage = () => {
  return localStorage.getItem(TOKEN);
};

const storeToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

const getToken = () => {
  let token = isLocalStorage();
  if (token) {
    return token;
  } else {
    return sessionStorage.getItem(TOKEN);
  }
};

export { storeToken, getToken };
