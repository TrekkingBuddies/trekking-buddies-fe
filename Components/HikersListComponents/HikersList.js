import React, { useEffect, useState, useContext } from "react";
import getHikers from "../../utils/getHikers";
import HikerCard from "./HikerCard";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";

export default function HikersList() {
  const [hikers, setHikers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      user
        .getIdToken()
        .then((token) => {
          return getHikers(token);
        })
        .then((users) => {
          setHikers(users);
        })
        .catch((err) => {
          console.log(err, "error in hikers list");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  console.log(hikers, "hikers array");

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : hikers && hikers.length > 0 ? (
        <FlatList
          data={hikers}
          keyExtractor={(item) => item.uid.toString()}
          renderItem={({ item }) => <HikerCard hiker={item} />}
        />
      ) : (
        <Text>No hikers found.</Text>
      )}
    </View>
  );
}
