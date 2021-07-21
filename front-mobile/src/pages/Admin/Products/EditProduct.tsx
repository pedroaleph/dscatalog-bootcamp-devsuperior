import React, { useEffect, useState } from "react";
import Toast from 'react-native-tiny-toast';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { updateProduct, getProduct, getCategories, uploadImage } from "../../../services";
import { Category, Product } from "../../../services/product";
import arrow from '../../../assets/leftArrow.png';
import { admin, text, theme } from "../../../styles";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';

interface DashboardProps {
  setActiveScreen: Function;
  productId: number;
}

const EditProduct: React.FC<DashboardProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isShowingCategories, setIsShowingCategories] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    imgUrl: ' ',
    description: '',
    price: '',
    categories: [],
  });
  const [image, setImage] = useState('');

  useEffect(() => {
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Precisamos de acesso a biblioteca de imagens!');
      }
    }
  }, [])

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    !result.cancelled && setImage(result.uri);
  }

  const handleUpload = async () => {
    uploadImage(image).then(res => {
      const { uri } = res?.data;
      setProduct({ ...product, imgUrl: uri })
    })
  }

  useEffect(() => {
    image ? handleUpload() : null
  }, [image])

  const { setActiveScreen, productId } = props;

  const getRawData = () => {
    const str = product.price;
    const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
    return res;
  }

  async function handleSave() {
    setIsLoading(true);
    const data = {
      ...product,
      price: getRawData(),
    };
    console.log(data.price);
    try {
      await updateProduct(data);
      setActiveScreen('products');
      Toast.showSuccess('Produto atualizado com sucesso!');
    }
    catch (res) {
      Toast.show("Erro ao salvar...");
    }
    setIsLoading(false);
  }

  const loadProduct = async () => {
    setIsLoading(true);
    const res = await getProduct(productId);
    setProduct(res.data);
    setIsLoading(false);
  }

  async function loadCategories() {
    setIsLoading(true);
    const res = await getCategories();
    setCategories(res.data.content);
    setIsLoading(false);
  }

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [])

  return (
    <View style={admin.formContainer}>
      {isLoading ? (<ActivityIndicator size="large" />) : (
        <View style={admin.formCard}>
          <ScrollView>
            <Modal
              visible={isShowingCategories}
              animationType="fade"
              transparent
              presentationStyle="overFullScreen"
            >
              <View style={admin.modalContainer}>
                <ScrollView contentContainerStyle={admin.modalContent}>
                  {categories?.map(cat => {
                    const { id, name } = cat;

                    return (
                      <TouchableOpacity
                        style={admin.modalItem}
                        key={id}
                        onPress={() => {
                          setProduct({ ...product, categories: [...categories, cat] });
                          setIsShowingCategories(!isShowingCategories);
                        }}
                      >
                        <Text>{name}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => setActiveScreen('products')}
              style={theme.goBackContainer}
            >
              <Image source={arrow} />
              <Text style={text.goBackText}>voltar</Text>
            </TouchableOpacity>
            <TextInput
              style={admin.formInput}
              placeholder="Nome do Produto"
              value={product?.name}
              onChangeText={event => setProduct({ ...product, name: event })}
            />
            <TouchableOpacity
              onPress={() => setIsShowingCategories(!isShowingCategories)}
              style={admin.selectInput}
            >
              <Text>
                {product.categories.length > 0 && product.categories[0].name}
              </Text>
            </TouchableOpacity>
            <TextInputMask
              type={"money"}
              placeholder="Preço"
              style={admin.formInput}
              value={product.price}
              onChangeText={event => setProduct({ ...product, price: event })}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={admin.uploadBtn}
              onPress={selectImage}
            >
              <Text style={text.uploadText}>carregar imagem</Text>
            </TouchableOpacity>
            <Text style={text.fileSize}>
              As imagens devem ser  JPG ou PNG e não devem ultrapassar 5 mb.
            </Text>
            <TouchableOpacity
              onPress={selectImage}
              activeOpacity={0.9}
              style={{ width: '100%', height: 150, borderRadius: 10, marginVertical: 10 }}
            >
              <Image
                source={image === '' ? { uri: product.imgUrl } : { uri: image }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
            </TouchableOpacity>
            <TextInput
              multiline
              placeholder="Descrição"
              style={admin.textArea}
              value={product?.description}
              onChangeText={event => setProduct({ ...product, description: event })}
            />
            <View style={admin.buttonContainer}>
              <TouchableOpacity
                style={admin.deleteBtn}
                onPress={() => {
                  Alert.alert(
                    "Deseja cancelar?",
                    "Os dados inseridos não serão salvos",
                    [
                      {
                        text: 'Voltar',
                        style: 'cancel',
                      },
                      {
                        "text": 'Confirmar',
                        onPress: () => setActiveScreen('products'),
                        style: 'default',
                      }
                    ]
                  )
                }}
              >
                <Text style={text.deleteText}>cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={admin.saveBtn}
                onPress={() => handleSave()}
              >
                <Text style={text.saveText}>salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default EditProduct;