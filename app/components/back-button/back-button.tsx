import * as React from "react"
import { Icon } from "@ui-kitten/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 32,
  },
})

export const BackButton = observer(function BackButton() {
  const navigation = useNavigation()
  const { darkMode } = useStores()
  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <Icon fill={!darkMode ? "#000" : "#fff"} style={styles.icon} name="arrow-back-outline" />
    </TouchableOpacity>
  )
})
