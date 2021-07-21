import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ProductCard, SearchInput } from '../components';
import { api } from '../services';
import { Product } from '../services/product';
import { theme } from '../styles';

const Catalog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fillProducts() {
    setIsLoading(true);
    const res = await api.get(`/products`);
    setIsLoading(false);
    setProducts(res.data.content);
  }

  useEffect(() => {
    fillProducts();
  }, [])

  const data = search.length > 0 ?
    products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())) :
    products;

  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      <SearchInput placeholder="Nome do produto" search={search} setSearch={setSearch} />
      {isLoading ? (<ActivityIndicator size="large" />) :
        (data.map(product => (
          <ProductCard {...product} key={product.id} />
        ))
        )}
    </ScrollView>
  )
}

export default Catalog;