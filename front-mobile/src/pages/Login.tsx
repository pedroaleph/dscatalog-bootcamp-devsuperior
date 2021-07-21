import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { text, theme } from '../styles';
import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import arrow from '../assets/arrow.png';
import { isAuthenticated, login } from '../services/auth';
import { useNavigation } from '@react-navigation/native';

const Login: React.FC = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [userFetchData, setUserFetchData] = useState({});
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const navigation = useNavigation();

  async function handleLogin() {
    const data = await login(userInfo);
    setUserFetchData(data);
    navigation.navigate("Dashboard");
  }

  return (
    <View style={theme.container}>
      <View style={theme.loginCard}>
        <Text style={text.loginTitle}>Login</Text>
        <View style={theme.form}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={theme.textInput}
            value={userInfo.username}
            onChangeText={event => {
              const newUserInfo = { ...userInfo };
              newUserInfo.username = event;
              setUserInfo(newUserInfo);
            }}
          />
          <View style={theme.passwordGroup}>
            <TextInput
              placeholder="Senha"
              autoCapitalize="none"
              style={theme.textInput}
              value={userInfo.password}
              secureTextEntry={hidePassword}
              onChangeText={event => {
                const newUserInfo = { ...userInfo };
                newUserInfo.password = event;
                setUserInfo(newUserInfo);
              }}
            />
            <TouchableOpacity
              style={theme.toggle}
              onPress={() => setHidePassword(!hidePassword)}
            >
              <Image
                source={hidePassword ? eyesClosed : eyesOpened}
                //style={theme.eyes}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={theme.primaryButton}
            activeOpacity={0.8}
            onPress={() => handleLogin()}
          >
            <View
              //style={theme.buttonTextContainer}
            >
              <Text style={text.primaryText}>fazer login</Text>
            </View>
            <View style={theme.arrowContainer}>
              <Image source={arrow} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login;