import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeObjectData = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(error);
    }
};

export const storeData = async (value, key) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
};

export const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(error);
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`);
        return value === null ? null : value;
    } catch (e) {
      // error reading value
    }
};