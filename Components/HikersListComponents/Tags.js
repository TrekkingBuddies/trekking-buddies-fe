import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/tagsStyles";

export default function Tags({ setFilters }) {
  const tags = ["uphill", "flat", "countryside", "dog friendly"];
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagPress = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      preferences: selectedTags,
    }));
  }, [selectedTags]);

  return (
    <View style={styles.tagContainer}>
      {tags &&
        tags.map((tag, index) => (
          <View key={index} style={styles.tagWrapper}>
            <TouchableOpacity
              style={[
                styles.tag,
                selectedTags.includes(tag) ? styles.selectedTag : styles.unselectedTag,
              ]}
              onPress={() => handleTagPress(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}