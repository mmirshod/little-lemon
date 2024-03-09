import { Pressable, Text } from "react-native";

const ActionButton = ({ onPress, color, text }) => {
  return (
    <Pressable 
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color, },
        ({ pressed }) => pressed && styles.pressed
      ]}>
        <Text>{ text }</Text>
    </Pressable>
  );
};

export default ActionButton;


const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 6,
  },
  pressed: {
    opacity: 0.7
  }
});
