import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from "../../styles/colors";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: selections[index] ? '#EE9972' : COLORS.yellow,
            borderWidth: 1,
            borderColor: 'white',
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'white' : COLORS.darkGreen }}>
              {section.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: COLORS.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default Filters;