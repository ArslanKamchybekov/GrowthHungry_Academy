import { Injectable, Post } from '@nestjs/common';
import UserModel from '../models/user.model';


@Injectable()
export class UserService {

      //create a post
      async createPost(data: any) {
        try {
            const newPost = await UserModel.create(data)
            return newPost

        } catch (error) {
            console.log(error)
        }
    }

    //get all posts
    async getPosts() {
        try {
            const posts = await UserModel.find({})
            return posts

        } catch (error) {
            console.log(error)
        }
    }

    //get a single post
    async getPost(id: string) {
      
        try {
            const post = await UserModel.findById({_id:id})
            if (!post) {
                return 'post not available'
            }
            return post

        } catch (error) {
            console.log(error)
        }
    }

    //update a post
    async updatePost(id: string, data: any) {
        try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
            } catch (error) {
            console.log(error)
        }
    }


    //delete a post by using the find by id and delete 
    async deletePost(id: string) {
        try {
            const post = await UserModel.findByIdAndDelete(id)
            if (!post) {
                return 'post not available'
            }
        } catch (error) {
            console.log(error)
        }
    }
}

  