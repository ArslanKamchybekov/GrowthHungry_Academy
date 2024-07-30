import { Schema, model, Document } from 'mongoose';

export interface Category extends Document {
    title: string;
}

export interface BannerImage extends Document {
    public_id: string;
    url: string;
}

export interface Layout extends Document {
    type: string;
    categories: Category[];
    banner: {
        image: BannerImage;
        title: string;
        subTitle: string;
    };
}

const categorySchema = new Schema<Category>({
    title: { type: String, required: true }
});

const bannerImageSchema = new Schema<BannerImage>({
    public_id: { type: String, required: true },
    url: { type: String, required: true }
});

const layoutSchema = new Schema<Layout>({
    type: { type: String },
    categories: { type: [categorySchema], default: [] },
    banner: {
        image: { type: bannerImageSchema },
        title: { type: String },
        subTitle: { type: String }
    }
});

export const Category = model<Category>('Category', categorySchema);
export const BannerImage = model<BannerImage>('BannerImage', bannerImageSchema);
export const Layout = model<Layout>('Layout', layoutSchema);
