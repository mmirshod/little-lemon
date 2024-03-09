import {useContext, useState} from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AuthContext } from "../context";

const Onboarding = ({ route, navigation }) => {
  const theme = useTheme();
  const context = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const confirmHandler = () => {
    if (email.length !== 0 && firstName.length !== 0) {
      context.signIn({ email, firstName, lastName })
    } else {
      Alert.alert(
        'Failed',
        'Please enter correct data',
        [ {text: 'OK', style: 'destructive'} ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Image source={require('../assets/Logo.png')} style={{
          width: 300,
          height: 60,
          resizeMode: 'stretch'
        }}/>
      </View>
      <View style={styles.body} >
        <View>
          <Text 
            variant='headlineLarge'
            style={{
              'textAlign': 'center',
              'color': theme.colors.primaryVariant,
              'fontWeight': '800',
            }}
          >
            Welcome to Little Lemon!
          </Text>
          <Text
            variant='titleMedium'
            style={{
              'textAlign': 'center',
              margin: 8,
              'color': theme.colors.secondary,
              'opacity': 0.9,
            }}
          >
            Let's get to know each other
          </Text>
        </View>
        <View>
          <View style={{ marginBottom: 24, }}>
            <TextInput
              placeholderTextColor={theme.colors.outline}
              onChangeText={val => setEmail(val)}
              value={email}
              inputMode='email'
              keyboardType='email-address'
              label={'Email'}
            />
          </View>
          <View style={{ marginBottom: 16, }}>
            <TextInput
              placeholderTextColor={theme.colors.outline}
              value={firstName}
              onChangeText = {val => setFirstName(val)}
              label='First Name'
            />
          </View>
          <View style={{ marginBottom: 16, }}>
            <TextInput
              placeholderTextColor={theme.colors.outline}
              value={lastName}
              onChangeText = {val => setLastName(val)}
              label='Last Name'
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button mode='contained-tonal' onPress={confirmHandler} style={{width: 200, height: 45, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Confirm</Text>
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignContent: 'center'
  },
  body: {
    flex: 4,
    justifyContent: 'space-evenly'
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
})
