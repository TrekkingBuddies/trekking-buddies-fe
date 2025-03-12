import React, { useEffect, useState, useContext } from "react";
import getHikers from "../../utils/getHikers";
import HikerCard from "./HikerCard";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";

export default function HikersList({ filters }) {
  const [hikers, setHikers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // reset hikers and pagination when filters change
    setHikers([]);
    setPage(1);
    setHasMore(true);
    // fetch new data immediately after reset
    fetchData(1);
  }, [filters]);

  useEffect(() => {
    if (page !== 1) {
      fetchData(page);
    }
  }, [page]);

  const fetchData = (currentPage) => {
    setLoading(true);
    user
      .getIdToken()
      .then((token) => {
        return getHikers(token, currentPage, 5, filters);
      })
      .then((usersData) => {
        if (usersData.users.length === 0) {
          setHasMore(false);
        } else {
          setHikers((prevHikers) =>
            currentPage === 1
              ? usersData.users
              : [...prevHikers, ...usersData.users]
          );
        }
      })
      .catch((err) => {
        console.log(err, "error in hikers list");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.flatListContent}>
      {loading && page === 1 ? ( // only show loading on first load
        <ActivityIndicator size="large" color="#52796f" />
      ) : hikers && hikers.length > 0 ? (
        <FlatList
          data={hikers}
          keyExtractor={(item) => item.uid.toString()}
          renderItem={({ item }) => <HikerCard hiker={item} />}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.9} // how close to the end the user needs to be to trigger loading new page
          ListFooterComponent={
            loading && page > 1 ? <ActivityIndicator /> : null
          } // loading indicator at the bottom
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={{textAlign: "center", marginTop: 20, fontSize: 15}}>No hikers found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 100,
  },
});
