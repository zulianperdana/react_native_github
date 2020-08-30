import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, Image, ImageStyle, TextInput, StyleSheet } from "react-native"
import { Text, Screen, Input, LoadingIndicator } from "../../components"
import { translate } from "../../i18n"
import { Layout, Button } from "@ui-kitten/components"
import { useStores } from "../../models/root-store/root-store-context"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
const logoWhite = require("../../../assets/image/logo_white.png")
const logoBlack = require("../../../assets/image/logo_black.png")

const styles = StyleSheet.create({
  content: {
    flexGrow: 3,
    marginTop: 24,
  },
  footer: {
    height: 50,
  },
  header: {
    flexGrow: 2,
  },
  headerImage: {
    height: 50,
    width: 50,
  },
  headerImageContainer: {
    flexGrow: 2,
    justifyContent: "flex-end",
  },
  headerTextContainer: {
    flexGrow: 3,
    justifyContent: "center",
  },
  root: {
    flex: 1,
    paddingHorizontal: 24,
  },
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const navigation = useNavigation()
  const { darkMode, user } = useStores()
  const [status, setStatus] = useState("basic")
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const { checkUsername } = user
  // OR
  // const rootStore = useStores()
  const [usernameForm, setUsernameForm] = useState("")
  const onPressNext = async () => {
    setCaption("")
    setStatus("basic")
    if (usernameForm.length === 0) {
      setStatus("danger")
      setCaption("login.username_validation_1")
    } else {
      setLoading(true)
      try {
        const user = await checkUsername(usernameForm)
        if (user !== undefined) {
          navigation.navigate("password")
        } else {
          setStatus("danger")
          setCaption("login.username_validation_2")
        }
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <Screen style={styles.root}>
      <SafeAreaView />
      <Layout style={styles.header}>
        <Layout style={styles.headerImageContainer}>
          <Image source={darkMode ? logoWhite : logoBlack} style={styles.headerImage} />
        </Layout>
        <Layout style={styles.headerImageContainer}>
          <Text category="h1" tx="login.greetings" />
          <Text category="p1" tx="login.greetings_description" />
        </Layout>
      </Layout>
      <Layout style={styles.content}>
        <Input
          label="Username"
          status={status}
          caption={caption !== "" ? translate(caption) : ""}
          value={usernameForm}
          autoCapitalize="none"
          onSubmitEditing={onPressNext}
          autoFocus={true}
          onChangeText={(nextValue) => setUsernameForm(nextValue)}
        />
      </Layout>
      <SafeAreaView>
        <Layout style={styles.footer}>
          <Button onPress={onPressNext}>
            {loading ? <LoadingIndicator status="basic" /> : translate("common.next")}
          </Button>
        </Layout>
      </SafeAreaView>
    </Screen>
  )
})
