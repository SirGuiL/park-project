export class AuthStorage {
  static setAccessToken(token: string) {
    localStorage.setItem('@spark:accessToken', token)
  }

  static getAccessToken() {
    return localStorage.getItem('@spark:accessToken')
  }

  static removeAccessToken() {
    localStorage.removeItem('@spark:accessToken')
  }
}
