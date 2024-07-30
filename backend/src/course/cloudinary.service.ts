import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_SECRET_KEY
        });
    }

    // upload method to upload images to Cloudinary(image database)
    async upload(filePath: string, folder: string) {
        return v2.uploader.upload(filePath, {folder: folder});
    }

    // delete method to delete images from Cloudinary
    async delete(public_id: string ) {
        return v2.uploader.destroy(public_id);
    }
}