import { Injectable } from '@nestjs/common';
import { v2, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'; 

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
    async upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (result) resolve(result);
                else reject(error);
            });
        });
    }

    // delete method to delete images from Cloudinary
    async delete(public_id: string ) {
        return v2.uploader.destroy(public_id);
    }
}