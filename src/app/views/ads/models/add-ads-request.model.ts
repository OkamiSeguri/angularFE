export interface AddAdsRequest {
    company: string;
    userId: string;
    adsImage: string;
    type: number;
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishedDate: Date;
    author: string;
    isVisible: boolean;
    categories: string[];
}