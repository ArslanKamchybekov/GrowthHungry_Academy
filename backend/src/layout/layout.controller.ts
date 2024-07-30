import { Body, Controller, Req, UseGuards } from "@nestjs/common";
import { LayoutService } from "./layout.service";
import { CloudinaryService } from "src/course/cloudinary.service";
import { Post } from "@nestjs/common";
import { JwtGuard } from "src/auth/jwt-auth.guard"; 
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller('layout')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class LayoutController {
    constructor(private readonly layoutService: LayoutService, private readonly cloudinaryService: CloudinaryService) {}
    
    @Post("/create")
    async createLayout(@Body() layoutData: any) {
        try {
            const { type } = layoutData;

            if (type === "Banner") {
                const { image, title, subTitle } = layoutData;
                const uploadedImage = await this.cloudinaryService.upload(image, "banner");

                const newLayout = {
                    type,
                    banner: {
                        image: {
                            public_id: uploadedImage.public_id,
                            url: uploadedImage.url
                        },
                        title,
                        subTitle
                    }
                };

                const createdLayout = await this.layoutService.create(newLayout);
                return { success: true, layout: createdLayout };
            } else if (type === "Category") {
                const { categories } = layoutData;

                const newLayout = { type, categories };

                const createdLayout = await this.layoutService.create(newLayout);
                return { success: true, layout: createdLayout };
            } else {
                return { success: false, error: "Invalid layout type" };
            }
        } catch (error) {
            return { success: false, error: `Error creating layout: ${error.message}` };
        }
    }
}