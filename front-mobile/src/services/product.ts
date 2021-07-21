export type Product = {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
  price: string;
  categories: string | Category[];
}

export type Category = {
  id: number | undefined;
  name: string;
}