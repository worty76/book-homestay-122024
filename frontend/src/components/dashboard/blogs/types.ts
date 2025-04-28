export interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string;
  image?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormDataBlog {
  title: string;
  content: string;
  category: string;
  tags: string;
}
