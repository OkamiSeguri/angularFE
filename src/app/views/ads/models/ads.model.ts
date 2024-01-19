import { BlogPost } from "../../blog-post/models/blog-post.model";

export interface Ads {
    id: string;
    company: string;
    userId: string;
    adsImage: string;
    blogPost: BlogPost
    type: number;
    payment: number;
    status: number;
    comment: string;
    supporterId: string;
    dateCreated: Date;
    dateUpdated: Date;
    datePaid: Date;
}