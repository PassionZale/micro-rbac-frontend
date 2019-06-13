const prefixToken = "Authorization";

class Auth {

  constructor() { }

  static setToken(token) {
    return localStorage.setItem(prefixToken, token);
  }

  static getToken() {
    return localStorage.getItem(prefixToken);
  }

  static removeToken() {
    return localStorage.removeItem(prefixToken);
  }

  static logOut() {
    this.removeToken()
    window.location.reload()
  }

}

export default Auth;