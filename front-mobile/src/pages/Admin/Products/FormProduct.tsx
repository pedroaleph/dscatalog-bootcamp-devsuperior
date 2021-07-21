import React, { useEffect, useState } from "react";
import Toast from 'react-native-tiny-toast';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createProduct, getCategories, uploadImage } from "../../../services";
import { Category, Product } from "../../../services/product";
import arrow from '../../../assets/leftArrow.png';
import { admin, colors, text, theme } from "../../../styles";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';

interface DashboardProps {
  setActiveScreen: Function;
}

const FormProduct: React.FC<DashboardProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>();
  const [isShowingCategories, setIsShowingCategories] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    imgUrl: '',
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

  const { setActiveScreen } = props;

  const handleSave = () => {
    newProduct();
  }

  const getRawData = () => {
    const str = product.price;
    const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
    return res;
  }

  async function newProduct() {
    setIsLoading(true);
    const cat = replaceCategory();
    const data = {
      ...product,
      price: getRawData(),
      categories: [
        {
          id: cat,
        },
      ],
    };
    console.log(data.price);
    try {
      await createProduct(data);
      setActiveScreen('products');
      Toast.showSuccess('Produto Salvo!');
    }
    catch (res) {
      Toast.show("erro ao salvar ...");
    }
    setIsLoading(false);
  }

  const replaceCategory = () => {
    const cat = categories?.find(category => category.name === product?.categories);
    return cat?.id;
  }

  async function loadCategories() {
    setIsLoading(true);
    const res = await getCategories();
    setIsLoading(false);
    setCategories(res.data.content);
  }

  useEffect(() => {
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
                  {categories?.map(cat => (
                    <TouchableOpacity
                      style={admin.modalItem}
                      key={cat.id}
                      onPress={() => {
                        setProduct({ ...product, categories: cat.name });
                        setIsShowingCategories(!isShowingCategories);
                      }}
                    >
                      <Text>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
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
              <Text style={{ color: product?.categories.length === 0 ? colors.mediumGray : colors.black }}>
                {product?.categories.length === 0
                  ? 'Categorias'
                  : product.categories
                }
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
            {image !== '' && (
              <TouchableOpacity
                onPress={selectImage}
                activeOpacity={0.9}
                style={{ width: '100%', height: 150, borderRadius: 10, marginVertical: 10 }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
              </TouchableOpacity>
            )}
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

export default FormProduct;