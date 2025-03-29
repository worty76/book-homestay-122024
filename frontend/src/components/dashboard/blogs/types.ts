export interface Blog {
  _id: string;
  title: string;
  summary: string;
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
  summary: string;
  content: string;
  category: string;
  tags: string;
}
