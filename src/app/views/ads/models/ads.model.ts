import { User } from "../../auth/models/user.model";
import { BlogPost } from "../../blog-post/models/blog-post.model";

export interface Ads {
    id: string;
    company: string;
    user: User;
    adsImage: string;
    blogPost: BlogPost
    type: number;
    payment: number;
    status: number;
    comment: string;
    supporter: User;
    dateCreated: Date;
    dateUpdated: Date;
    datePaid: Date;
}