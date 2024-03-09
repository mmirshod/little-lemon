import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';

import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useContext, useEffect, useMemo, useReducer} from 'react';
import {authContext, AuthContext, dispatch, state} from "./context";

import Home from "./screens/Home";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name={'home'} component={Home} />
    <Tab.Screen name={'profile'} component={Profile} />
  </Tab.Navigator>
)

export default function App({ navigation }) {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            email: action.email,
            firstName: action.firstName,
            lastName: action.lastName,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            email: action.email,
            firstName: action.firstName,
            lastName: action.lastName,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            email: null,
            firstName: null,
            lastName: null,
          };
      }
    },
    {
      firstName: null,
      lastName: null,
      email: null,
      isSignOut: false,
      isLoading: true
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({
          type: 'SIGN_IN',
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
        });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      ...state,
    }),
    [state]
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let email;

      try {
        email = state.email;
      } catch (e) {
        console.warn('RESTORE FAILED');
      }
      dispatch({ type: 'RESTORE_TOKEN', email: email });
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {
              state.email !== null || undefined
                ? <Stack.Screen name={'main'} component={BottomTabs} options={{ headerShown: false }} />
                : <Stack.Screen name={'onboarding'} component={Onboarding} options={{ headerTitle: 'Welcome!' }} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}