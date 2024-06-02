import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class authService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("appwrite create account error: ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("appwrite login error: ", error);
      throw error;
    }
    }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite getCurrentUser func error: ", error);
    }
  }

  // assignment-1
  async deleteAccount() {
    // await this.account.deleteSession("current")
  }

  async logout() {
    try {
      this.account.deleteSession();
    } catch (error) {
      console.log("appwrite logout error::: ", error);
      throw error;
    }
  }
}

const authServices = new authService();
export default authServices;