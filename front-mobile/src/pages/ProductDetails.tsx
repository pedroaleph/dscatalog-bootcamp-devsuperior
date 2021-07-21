import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import arrow from '../assets/leftArrow.png';
import { api } from '../services';
import { text, theme } from '../styles';

const ProductDetails = ({
  route: { params: { id },
  },
}) => {
  const [product, setProduct] = useState({
    id: null,
    name: null,
    imgUrl: null,
    description: null,
    price: null,
    categories: [],
  });
  const [isLoading, setIsLoading] =  useState(false);
  const navigation = useNavigation();

  async function loadProductData() {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    loadProductData();
  }, [])

  return (
    <View style={theme.detailContainer}>
      {isLoading ? (<ActivityIndicator size="large" />) : (
        <View style={theme.detailCard}>
          <TouchableOpacity
            style={theme.goBackContainer}
            onPress={() => navigation.goBack()}>
            <Image source={arrow} />
            <Text style={text.goBackText}>Voltar</Text>
          </TouchableOpacity>
          <View style={theme.productImageContainer}>
            <Image
              source={{ uri: product.imgUrl }}
              style={theme.productImage}
            />
          </View>
          <Text style={text.productDetailsName}>{product.name}</Text>
          <View style={theme.priceContainer}>
            <Text style={text.currencyDetail}>R$</Text>
            <Text style={text.productDetailPrice}>{product.price}</Text>
          </View>
          <ScrollView style={theme.scrollTextContainer}>
            <Text style={text.productDescription}>{product.description}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default ProductDetails;