import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { ProductCard, SearchInput } from "../../../components";
import { deleteProduct, getProducts } from "../../../services";
import { Product } from "../../../services/product";
import { admin, text, theme } from "../../../styles";

interface DashboardProps {
  setActiveScreen: Function;
  setProductId: Function;
}

const ListProducts: React.FC<DashboardProps> = (props) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setActiveScreen, setProductId } = props;

  const handleEditProduct = (id: number) => {
      setProductId(id);
      setActiveScreen('editProduct');
  }

  async function handleDeleteProduct(id: number) {
    setIsLoading(true);
    const res = await deleteProduct(id);
    fillProducts();
    setIsLoading(false);
  }

  async function fillProducts() {
    setIsLoading(true);
    const res = await getProducts();
    setIsLoading(false);
    setProducts(res.data.content);
  }

  useEffect(() => {
    fillProducts();
  }, []);

  const data = search.length > 0 ?
    products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())) :
    products;

  return (
    <ScrollView contentContainerStyle={admin.container}>
      <TouchableOpacity
        style={admin.addButton}
        activeOpacity={0.8}
        onPress={() => setActiveScreen('newProduct')}
      >
        <Text style={text.addButtonText}>adicionar</Text>
      </TouchableOpacity>
      <SearchInput placeholder="Nome do produto" search={search} setSearch={setSearch} />
      {isLoading ? (<ActivityIndicator size="large" />) :
        (data.map(product => {
          const { id } = product

          return (
            <ProductCard
              {...product}
              key={id}
              role="admin"
              handleDelete={handleDeleteProduct}
              handleEdit={handleEditProduct}
            />
          )
        })
        )}
    </ ScrollView>
  )
}

export default ListProducts;