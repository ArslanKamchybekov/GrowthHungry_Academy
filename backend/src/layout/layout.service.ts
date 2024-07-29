import { Injectable } from "@nestjs/common";
import { Layout } from "../models/layout.model";

@Injectable()
export class LayoutService {
    constructor() {}

    async create(layoutData: any) {
        try {
            if (!layoutData.type) {
                throw new Error("Type is required");
            }
            if (layoutData.type === "Banner") {
                const { image, title, subTitle } = layoutData;
                if (!image || !title || !subTitle) {
                    throw new Error("Banner layout must include image, title, and subTitle");
                }
            } else if (layoutData.type === "Category") {
                if (!Array.isArray(layoutData.categories) || layoutData.categories.length === 0) {
                    throw new Error("Category layout must include a non-empty categories array");
                }
            } else {
                throw new Error("Invalid layout type");
            }
    
            const newLayout = new Layout(layoutData);
            return await newLayout.save();
        } catch (error) {
            throw new Error(`Error creating layout: ${error.message}`);
        }
    }
    
}