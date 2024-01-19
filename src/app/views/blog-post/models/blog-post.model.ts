import { User } from "../../auth/models/user.model";
import { Category } from "../../category/models/category.model";

export interface BlogPost {
    id: string
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishedDate: Date;
    author: User;
    isVisible: boolean;
    categories: Category[];
}