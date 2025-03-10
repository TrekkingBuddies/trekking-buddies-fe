import React, { useState, useMemo } from "react";
import { Text, View } from "react-native";
import HikersList from "./HikersListComponents/HikersList";
import HikersFilter from "./HikersListComponents/HikersFilter";

export default function Hikers() {
  const [filters, setFilters] = useState({
    skill_level: "All",
    preferences: [],  
    distance: "All" 
  });

  return (
    <View>
      <HikersFilter setFilters={setFilters} />
      <HikersList filters={filters} />
    </View>
  );
}
