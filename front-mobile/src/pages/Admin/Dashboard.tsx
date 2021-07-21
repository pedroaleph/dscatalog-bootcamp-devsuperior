import React, { useState } from "react";
import { View } from "react-native";
import { TabBar } from "../../components";
import Categories from "./Categories";
import Users from "./Users";

import Products from "./Products/ListProducts";
import FormProduct from "./Products/FormProduct";
import EditProduct from "./Products/EditProduct";

const Dashboard: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('products');
  const [productId, setProductId] = useState(0);

  return (
    <View>
        <TabBar activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
        {activeScreen === 'products' && (
          <Products setActiveScreen={setActiveScreen} setProductId={setProductId}/>
        )}
        {activeScreen === 'newProduct' && <FormProduct setActiveScreen={setActiveScreen}/>}
        {activeScreen === 'editProduct' && (
          <EditProduct setActiveScreen={setActiveScreen} productId={productId}/>
        )}
        {activeScreen === 'categories' && <Categories />}
        {activeScreen === 'users' && <Users />}
    </View>
  )
}

export default Dashboard;