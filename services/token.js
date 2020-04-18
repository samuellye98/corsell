import { AsyncStorage } from "react-native";

export const storeToken = async (email, password) => {
  await AsyncStorage.setItem("@email", email);
  await AsyncStorage.setItem("@password", password);
};

export const getToken = () => {
  return AsyncStorage.multiGet(["@email", "@password"]);
};

export const deleteToken = () => {
  return AsyncStorage.multiRemove(["@email", "@password"]);
};
