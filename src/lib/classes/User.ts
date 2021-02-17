export default class User {
  static async getToken(): Promise<string | undefined> {
    return localStorage.getItem('token') || undefined;
  }

  static async login(token: string): Promise<void> {
    await localStorage.setItem('token', token);
  }

  static async logout(): Promise<void> {
    await localStorage.removeItem('token');
  }
}
