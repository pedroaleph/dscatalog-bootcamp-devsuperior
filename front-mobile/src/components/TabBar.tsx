import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { tabbar } from "../styles";

interface TabBarProps {
  activeScreen: string;
  setActiveScreen: Function;
}

const TabBar: React.FC<TabBarProps> = (props) => {
  const { activeScreen, setActiveScreen } = props;

  function changeActiveScreen(page: string) {
    setActiveScreen(page);
  }

  return (
    <View style={tabbar.container}>
      <TouchableOpacity
        style={[tabbar.pill, activeScreen === 'products' && tabbar.pillActive]}
        onPress={() => changeActiveScreen('products')}
        activeOpacity={0.7}
      >
        <Text
          style={[tabbar.pillText, activeScreen === 'products' && tabbar.pillTextActive]}
        >
          Produtos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[tabbar.pill, activeScreen === 'categories' && tabbar.pillActive]}
        onPress={() => changeActiveScreen('categories')}
        activeOpacity={0.7}
      >
        <Text
          style={[tabbar.pillText, activeScreen === 'categories' && tabbar.pillTextActive]}
        >
          Categorias</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[tabbar.pill, activeScreen === 'users' && tabbar.pillActive]}
        onPress={() => changeActiveScreen('users')}
        activeOpacity={0.7}
      >  
        <Text
          style={[tabbar.pillText, activeScreen === 'users' && tabbar.pillTextActive]}
        >
          Usuários</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TabBar;