import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { View, Text, } from "react-native";
import Tags from "./Tags";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../../styles/hikersFilterStyles";

export default function HikersFilter({ setFilters }) {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("All");

  const handleSkillLevelSelect = (skillLevel) => {
    setSelectedSkillLevel(skillLevel);
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      skill_level: selectedSkillLevel,
    }));
  }, [selectedSkillLevel]);

  return (
    <View style={styles.container}>
      <Tags setFilters={setFilters} />
      <Menu style={styles.menu}>
        <MenuTrigger customStyles={{ triggerText: { fontWeight: "bold" } }}>
          <Text>
            Skill Level:{"  "}
            <Text style={{ fontWeight: "bold", color: "#52796f" }}>
              {selectedSkillLevel}
            </Text>{" "}
            <AntDesign name="down" size={13} color="#52796f" />
          </Text>
        </MenuTrigger>
        <MenuOptions style={styles.option}>
          <MenuOption
            onSelect={() => handleSkillLevelSelect("All")}
            style={selectedSkillLevel === "All" ? styles.selectedOption : null}
          >
            <Text
              style={selectedSkillLevel === "All" ? styles.selectedText : null}
            >
              All
            </Text>
          </MenuOption>
          <MenuOption
            onSelect={() => handleSkillLevelSelect("Novice")}
            style={
              selectedSkillLevel === "Novice" ? styles.selectedOption : null
            }
          >
            <Text
              style={
                selectedSkillLevel === "Novice" ? styles.selectedText : null
              }
            >
              Novice
            </Text>
          </MenuOption>
          <MenuOption
            onSelect={() => handleSkillLevelSelect("Intermediate")}
            style={
              selectedSkillLevel === "Intermediate"
                ? styles.selectedOption
                : null
            }
          >
            <Text
              style={
                selectedSkillLevel === "Intermediate"
                  ? styles.selectedText
                  : null
              }
            >
              Intermediate
            </Text>
          </MenuOption>
          <MenuOption
            onSelect={() => handleSkillLevelSelect("Pro")}
            style={selectedSkillLevel === "Pro" ? styles.selectedOption : null}
          >
            <Text
              style={selectedSkillLevel === "Pro" ? styles.selectedText : null}
            >
              Pro
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}