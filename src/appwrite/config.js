import { Client, Databases, ID, Query } from "appwrite";
import { conf } from "../config/conf";
export class Services {
  Client = new Client();
  databases;
  bucket;
  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }
  async createPost({ title, content, slug, featuredImg, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImg, status, userId }
      );
    } catch (error) {
      console.log("error while createPost::", error);
    }
  }
  async updatePost({ title, content, slug, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.log("error occour while update::", error);
    }
  }
  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error while delete post::", error);
      return false;
    }
  }
  async getPost({ slug }) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error while getpost::", error);
    }
  }
  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return (
        await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId
        ),
        query
      );
    } catch (error) {
      console.log("error occour while getposts::", error);
    }
  }

  //upload file services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error occour while uploadfile::", error);
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error occour while deleteFile::", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}
const service = new Services();
export default service;
