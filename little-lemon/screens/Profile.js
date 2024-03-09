import {useContext, useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from "react-native-paper";
import COLORS from "../styles/colors";
import {AuthContext} from "../context";

const Profile = () => {
  const [state, setState] = useState({});
  const context = useContext(AuthContext);
  const [image, setImage] = useState(state.avatar);
  const [checkedNews, setCheckedNews] = useState(true);
  const [checkedOffers, setCheckedOffers] = useState(true);
  const [checkedStatus, setCheckedStatus] = useState(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled)
      setImage(result.assets[0].uri);

    setState({
      ...state,
      avatar: image
    });
  };

  const removeImage = () => {
    setImage(null);
    setState({
      ...state,
      avatar: null,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(context)
        const firstInitial = context["firstName"].charAt(0).toUpperCase();
        const lastInitial = context["lastName"] ? context['lastName'].charAt(0).toUpperCase() : '';
        context["initials"] = firstInitial + lastInitial;
        setState(context);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={{flexDirection: 'row', gap: 16, justifyContent: 'space-around', alignItems: 'center', marginVertical: 8,}}>
          {
            image ?
            <Avatar.Image
              size={80}
              source={{ uri: image }}
            />
            :
            <Avatar.Text
              size={80}
              label={state.initials}
              maxFontSizeMultiplier={1}
            />
          }
          <View style={{flexDirection: 'row', gap: 6, justifyContent: 'space-between'}}>
            <Button mode="contained" icon={'camera'} onPress={pickImage} style={{elevation: 5, shadowOpacity: 0.9}}>Change</Button>
            <Button mode="elevated" icon={'delete'} onPress={removeImage}>Remove</Button>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text variant="titleLarge">Personal Details:</Text>
          <View style={styles.details}>
            <View style={styles.textContainer}>
              <Text variant="labelSmall" style={{color: '#4d4d4d'}}>First Name:</Text>
              <Text variant="titleMedium">{state.firstName}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text variant="labelSmall" style={{color: '#4d4d4d'}}>Last Name:</Text>
              <Text variant="titleMedium">{state.lastName}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text variant="labelSmall" style={{color: '#4d4d4d'}}>Email:</Text>
              <Text variant="titleMedium">{state.email}</Text>
            </View>
          </View>
      </View>
      <View style={styles.section}>
        <Text variant="titleLarge">Notification Settings:</Text>
        <View style={styles.details}>
          <Checkbox.Item status={checkedNews ? 'checked' : 'unchecked'} labelVariant={'titleMedium'} onPress={() => {setCheckedNews(!checkedNews)}} label={'Newsletters'} color={COLORS.darkGreen} />
          <Checkbox.Item status={checkedOffers ? 'checked' : 'unchecked'} labelVariant={'titleMedium'} onPress={() => {setCheckedOffers(!checkedOffers)}} label={'Special Offers'} color={COLORS.darkGreen} />
          <Checkbox.Item status={checkedStatus ? 'checked' : 'unchecked'} labelVariant={'titleMedium'} onPress={() => {setCheckedStatus(!checkedStatus)}} label={'Order Statuses'} color={COLORS.darkGreen} />
        </View>
        <Button onPress={context.signOut}> SIGN OUT </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignContent: 'center',
    // backgroundColor: '#333333'
  },
  section: {
    height: 'auto',
    width: '100%',
    // backgroundColor: '#aaa',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 0,
  },
  details: {
    marginTop: 8,
    width: '100%',
  },
  textContainer: {
    marginVertical: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderRadius: 12,
    width: '90%',
    gap: 2,
    borderColor: 'rgba(46, 70, 61, 0.6)',
    backgroundColor: 'rgba(46,70,61,0.1)'
  }
});