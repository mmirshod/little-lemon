import { MD3LightTheme as DefaultLightTheme, MD3DarkTheme as DefaultDarkTheme } from "react-native-paper";
import COLORS from "./colors";

const LightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        primary: COLORS.yellow,
        primaryVariant: COLORS.darkGreen,
        onPrimary: '#EDEFEE',
        primaryContainer: COLORS.darkGreen,
        secondary: COLORS.darkGreen,
    },
}

export default LightTheme