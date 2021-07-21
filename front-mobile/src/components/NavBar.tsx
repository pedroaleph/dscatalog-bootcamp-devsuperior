import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import menu from "../assets/menu.png";
import { doLogout, isAuthenticated } from "../services/auth";
import { nav, text } from "../styles";

const NavBar: React.FC = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  function navigate(path: any) {
    if (path) {
      setIsShowing(false);
      navigation.navigate(path);
    }
    setIsShowing(false);
  }

  async function isLogged() {
    const result = await isAuthenticated();

    result ? setAuthenticated(true) : setAuthenticated(false);
  }

  function logout() {
    doLogout();
    navigation.navigate("Login");
  }

  useEffect(() => {
    isLogged();
  }, [])

  return (
    <>
      {authenticated ? (
        <TouchableOpacity
        style={nav.logoutBtn}
          onPress={() => logout()}
        >
          <Text style={text.logoutText}>Sair</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={nav.drawer}
          onPress={() => setIsShowing(!isShowing)}
        >
          <Image source={menu} />
          {isShowing ? (
            <View style={nav.options}>
              <TouchableOpacity style={nav.option} onPress={() => navigate("Home")}>
                <Text
                  style={[nav.textOption, route.name === "Home" ? nav.textActive : null]}
                >home
                </Text>
              </TouchableOpacity >
              <TouchableOpacity style={nav.option} onPress={() => navigate("Catalog")}>
                <Text
                  style={[nav.textOption, route.name === "Catalog" ? nav.textActive : null]}
                >
                  catálogo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={nav.option} onPress={() => navigate("Login")}>
                <Text
                  style={[nav.textOption, route.name === "Login" ? nav.textActive : null]}
                >
                  adm
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </TouchableOpacity>
      )}
    </>
  )
}

export default NavBar;