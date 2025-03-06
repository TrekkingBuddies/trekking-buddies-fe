import React, { useEffect, useState, useContext } from "react";
import getHikers from "../../utils/getHikers";
import HikerCard from "./HikerCard";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { UserContext } from "../../contexts/UserContext";

export default function HikersList() {
  const [hikers, setHikers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, [page]); // refetch when the user scrolls

  const fetchData = () => {
    setLoading(true);
    user
      .getIdToken()
      .then((token) => {
        return getHikers(token, page);
      })
      .then((usersData) => {
        if (usersData.users.length === 0) {
          setHasMore(false); // no more hikers in db
        } else {
          setHikers((prevHikers) => [...prevHikers, ...usersData.users]);
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
    <View>
      {loading && page === 1 ? ( // only show loading on first load
        <ActivityIndicator />
      ) : hikers && hikers.length > 0 ? (
        <FlatList
          data={hikers}
          keyExtractor={(item) => item.uid.toString()}
          renderItem={({ item }) => <HikerCard hiker={item} />}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.7} // how close to the end the user needs to be to trigger loading new page
          ListFooterComponent={
            loading && page > 1 ? <ActivityIndicator /> : null
          } // loading indicator at the bottom
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text>No hikers found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    flatListContent: {
      paddingBottom: 50, // Add padding at the bottom of the FlatList content
    },
  });
