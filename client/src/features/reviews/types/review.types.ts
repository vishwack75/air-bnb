export interface Review {
  _id: string;
  listing: string;
  user?: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewInput {
  rating: number;
  comment: string;
  authorName?: string;
  authorAvatar?: string;
}
