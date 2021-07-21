import React from "react";
import { View, Text, ImageSourcePropType, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { admin, text, theme } from "../styles";
import { TextInputMask } from "react-native-masked-text";

interface ProductProps {
  id: number;
  name: string;
  imgUrl: string;
  price: string;
  role?: string;
  handleDelete?: Function;
  handleEdit?: Function;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price, role, handleDelete, handleEdit }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={theme.productCard}
      onPress={() => role ? '' : navigation.navigate('ProductDetails', { id } )}
      activeOpacity={0.8}
    >
      <Image source={{ uri: imgUrl }} style={theme.productImg} />
      <View style={theme.productDescription}>
        <Text style={text.productName}>{name}</Text>
        <View style={theme.priceContainer}>
          <Text style={text.currency}>R$</Text>
          <TextInputMask
            type={"money"}
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: " ",
              suffixUnit:  "",
            }}
            value={price}
            style={text.productPrice}
          />
        </View>
      </View>
      { role === 'admin' && (
        <View style={admin.buttonContainer}>
          <TouchableOpacity
            style={admin.deleteBtn}
            onPress={() => {
              Alert.alert(
                "Deseja excluir?",
                "O produto será excluido permanentemente",
                [
                  {
                    text: 'Não',
                    style: 'cancel',
                  },
                  {
                    "text": 'Sim',
                    onPress: () => {handleDelete && handleDelete(id)},
                    style: 'default',
                  }
                ]
              )
            }}
          >
            <Text style={text.deleteText}>excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={admin.editBtn}
            onPress={() => handleEdit && handleEdit(id)}
          >
            <Text style={text.editText}>editar</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default ProductCard;