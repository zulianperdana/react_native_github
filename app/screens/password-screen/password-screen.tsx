import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text, Screen, Input, LoadingIndicator, BackButton } from "../../components"
import { translate } from "../../i18n"
import { Layout, Button, Avatar, Text as KittenText, Icon } from "@ui-kitten/components"
import { useStores } from "../../models/root-store/root-store-context"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

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
  headerImageContainer: {
    flexGrow: 2,
    justifyContent: "flex-end",
  },
  root: {
    flex: 1,
    paddingHorizontal: 24,
  },
})

export const PasswordScreen = observer(function PasswordScreen() {
  // Pull in one of our MST stores
  const navigation = useNavigation()
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const { user } = useStores()
  const [status, setStatus] = useState("basic")
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const { tempUserDetails, login } = user
  const { avatarUrl, username } = tempUserDetails

  // OR
  // const rootStore = useStores()
  const [passwordForm, setPasswordForm] = useState("")
  const onPressNext = async () => {
    setCaption("")
    setStatus("basic")
    if (passwordForm.length === 0) {
      setStatus("danger")
      setCaption("login.username_validation_1")
    } else {
      setLoading(true)
      try {
        const success: boolean = await login(username, passwordForm)
        if (!success) {
          setStatus("danger")
          setCaption("login.password_validation_1")
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  )
  return (
    <Screen style={styles.root}>
      <SafeAreaView />
      <BackButton />
      <Layout style={styles.header}>
        <Layout style={styles.headerImageContainer}>
          <Avatar size="giant" source={{ uri: avatarUrl }} />
        </Layout>
        <Layout style={styles.headerImageContainer}>
          <KittenText category="h1">
            {translate("login.password_greetings")} {username}
          </KittenText>
          <Text category="p1" tx="login.password_greetings_description" />
        </Layout>
      </Layout>
      <Layout style={styles.content}>
        <Input
          label="Password / Access Token"
          secureTextEntry={secureTextEntry}
          autoFocus={true}
          status={status}
          caption={caption !== "" ? translate(caption) : ""}
          value={passwordForm}
          accessoryRight={renderIcon}
          onSubmitEditing={onPressNext}
          autoCapitalize="none"
          onChangeText={(nextValue) => setPasswordForm(nextValue)}
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
