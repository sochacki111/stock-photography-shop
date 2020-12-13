export interface IPhoto {
  _id: string;
  title: string;
  author: {
    id: string;
    email: string;
  };
  url: string;
  price: number;
}
