import {SafeAreaView, SectionList, StatusBar, StyleSheet} from "react-native";
import { Searchbar, Text, Card } from "react-native-paper";
import {useCallback, useEffect, useMemo, useState} from "react";
import Filters from "../components/ui/Filters";
import Item from "../components/ui/Item";
import debounce from 'lodash.debounce';
import {createTable, filterByQueryAndCategories, getMenuItems, saveMenuItems} from "../database";
import {getSectionListData, useUpdateEffect} from "../utils";
import COLORS from "../styles/colors";

const sections = ['starters', 'mains', 'desserts'];
const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"

const Home = () => {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    try {
      const resp = await fetch(API_URL);
      const data = await resp.json();
      return data.menu;
    } catch (e) {
      console.error(`COULD NOT FETCH DATA FROM API: ${e}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        console.log("SECTION LIST DATA (MENU): ")
        console.dir(sectionListData, { depth: null });
        setData(sectionListData);
      } catch (e) {
        console.error(`ERROR IN useEffect ${e}`);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every(item => item === false))
          return true;
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories,
        );
        const sectionListData = getSectionListData(menuItems);
        console.log(`PRESSED. NEW DATA: ${sectionListData} END`);
        setData(sectionListData);
      } catch (e) {
        console.error(`ERROR in useUpdateEffect: ${e}`);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async index => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  }

  const sectionTitle = (title) => title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title
          title={'Little Lemon'}
          subtitle={'Chicago'}
          titleStyle={{fontSize: 32, fontWeight: 'bold'}}
          subtitleStyle={{ fontSize: 18, fontWeight: '400'}}
        />
        <Card.Content />
      </Card>
      <Searchbar
        placeholder={"Search"}
        value={searchBarText}
        style={styles.searchBar}
        iconColor={'white'}
        inputStyle={{ color: 'white' }}
        onChangeText={handleSearchChange}
        placeholderTextColor={'white'}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={( item ) => item.id}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>
            {sectionTitle(title)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.darkGreen,
    paddingTop: StatusBar.currentHeight,
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginVertical: 12,
    marginHorizontal: 8,
    // backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: COLORS.darkGreen,
    // backgroundColor: '#495E57',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
});