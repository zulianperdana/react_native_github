import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, Image, ImageStyle } from "react-native"
import { Text, Screen, Input } from "../../components"
import { translate } from "../../i18n"
import { Layout, Button } from "@ui-kitten/components"
import { useStores } from "../../models/root-store/root-store-context"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
export const logoWhite = require("../../../assets/image/logo_white.png")
export const logoBlack = require("../../../assets/image/logo_black.png")

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: 24,
}

const HEADER: ViewStyle = {
  backgroundColor: "#fff",
  flexGrow: 2,
}

const HEADER_IMAGE_CONTAINER: ViewStyle = {
  flexGrow: 2,
  justifyContent: "flex-end",
}

const HEADER_IMAGE: ImageStyle = {
  width: 50,
  height: 50,
}
const HEADER_TEXT_CONTAINER: ViewStyle = {
  justifyContent: "center",
  flexGrow: 3,
}

const CONTENT: ViewStyle = {
  flexGrow: 3,
}

const FOOTER: ViewStyle = {
  height: 50,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const navigation = useNavigation()
  const { darkMode, user } = useStores()
  const [status, setStatus] = useState("basic")
  const [caption, setCaption] = useState("")
  const { setUsername } = user
  // OR
  // const rootStore = useStores()
  const [usernameForm, setUsernameForm] = useState("")
  const onPressNext = () => {
    if (usernameForm.length === 0) {
      setStatus("danger")
      setCaption("login.username_validation_1")
    } else {
      setStatus("basic")
      setUsername(usernameForm)
      setCaption("")
    }
  }
  return (
    <Screen style={ROOT}>
      <SafeAreaView />
      <Layout style={HEADER}>
        <Layout style={HEADER_IMAGE_CONTAINER}>
          <Image source={darkMode ? logoWhite : logoBlack} style={HEADER_IMAGE} />
        </Layout>
        <Layout style={HEADER_TEXT_CONTAINER}>
          <Text category="h1" tx="login.greetings" />
          <Text category="p1" tx="login.greetings_description" />
        </Layout>
      </Layout>
      <Layout style={CONTENT}>
        <Input
          label="Username"
          status={status}
          caption={caption !== "" ? translate(caption) : ""}
          value={usernameForm}
          onChangeText={(nextValue) => setUsernameForm(nextValue)}
        />
      </Layout>
      <SafeAreaView>
        <Layout style={FOOTER}>
          <Button onPress={onPressNext}>{translate("common.next")}</Button>
        </Layout>
      </SafeAreaView>
    </Screen>
  )
})
