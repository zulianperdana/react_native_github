import * as React from "react"
import { Icon } from "@ui-kitten/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 32,
  },
})

export function BackButton() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <Icon fill="#000" style={styles.icon} name="arrow-back-outline" />
    </TouchableOpacity>
  )
}
