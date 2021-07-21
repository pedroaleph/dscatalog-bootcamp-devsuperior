import axios from 'axios';
import { Platform } from 'react-native';
import mime from 'mime';
import { userToken } from './auth';
import { Product } from './product';

export const api = axios.create({
  baseURL: 'https://dscatalog-pedroaleph.herokuapp.com',
})

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";

export function getProducts() {
  const res = api.get(`/products?direction=DESC&orderBy=id`);
  return res;
}

export function getCategories() {
  const res = api.get(`/categories`);
  return res;
}

export async function createProduct(data: Object) {
  const authToken = await userToken();
  const res = api.post('/products', data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  });
  return res;
}

export async function deleteProduct(id: number) {
  const authToken = await userToken();
  const res = api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  });
  return res;
}

export const uploadImage = async (image: string) => {
  if (!image) return;
  const authToken = await userToken();
  let data = new FormData();

  if (Platform.OS === 'android') {
    const newImageUri = 'file:///' + image.split('file:/').join("");

    data.append("file", {
      uri: newImageUri,
      type: mime.getType(image),
      name: newImageUri,
    });
  } else if (Platform.OS === 'ios') {
    data.append("file", {
      uri: image,
      name: image,
    });
  }

  const res = await api.post(`/products/image`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
}

export const getProduct = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res;
}

export const updateProduct = async (data: Object) => {
  const authToken = await userToken();
  const res = api.put(`/products/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  });
  return res;
}