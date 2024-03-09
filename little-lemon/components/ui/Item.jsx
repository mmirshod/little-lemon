import {Image, StyleSheet, View} from "react-native";
import { Text, Card } from "react-native-paper";
import COLORS from "../../styles/colors";

const IMAGE_URL = imageFileName => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`

const Item = ({ item }) => {
  return (
    <Card style={{ marginVertical: 12, backgroundColor: COLORS.darkGreen }}>
      <Card.Title
        title={item.name}
        subtitle={`${item.price}\$`}
        titleVariant={"titleLarge"}
        subtitleVariant={"titleSmall"}
        titleStyle={{ fontWeight: 'bold' }}
        subtitleStyle={{ fontStyle: 'italic' }}
      />
      <Card.Cover
        source={{ uri: IMAGE_URL(item.image) }}
        width={100}
        height={100}
      />
      <Card.Content>
        <Text variant='bodyMedium'>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: "space-around",
  }
});

export default Item;