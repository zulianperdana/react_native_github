import React, { useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, SafeAreaView } from "react-native"
import {
  TopNavigation,
  Layout,
  Avatar,
  Icon,
  AutocompleteItem,
  Autocomplete,
  Card,
} from "@ui-kitten/components"
import { Screen, Text, MenuActions, LoadingIndicator } from "../../components"
import { useStores } from "../../models/root-store/root-store-context"
import { translate } from "../../i18n"
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler"
import { debounce } from "lodash"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
  body: {
    padding: 24,
  },
  card: {
    marginTop: 18,
  },
  cardHeader: {
    padding: 8,
  },
  logo: {
    marginHorizontal: 16,
  },
  root: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
})

export const HomeScreen = observer(function HomeScreen() {
  const { user, search, commitStore } = useStores()
  const navigation = useNavigation()
  const { userDetails, password } = user
  const {
    searchSuggestions,
    fetchSuggestions,
    replaceSuggestions,
    addToSearchHistory,
    searchHistories,
  } = search
  const { loadRepository } = commitStore
  const { avatarUrl, username } = userDetails
  const [status, setStatus] = useState("basic")
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchForm, setSearchForm] = useState("facebook/react-native")

  const onGoToRepository = async (repository: string) => {
    setStatus("basic")
    setCaption("")
    setLoading(true)
    try {
      const result = await loadRepository(repository, username, password)
      if (result === true) {
        addToSearchHistory(repository)
        navigation.navigate("commits", { repository })
      } else {
        setStatus("danger")
        setCaption("home.repository_not_found")
      }
    } finally {
      setLoading(false)
    }
  }

  const renderTitle = (props) => (
    <Layout style={styles.titleContainer}>
      <Avatar style={styles.logo} source={{ uri: avatarUrl }} />
      <Text {...props}>{username}</Text>
    </Layout>
  )

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSearchForm("")
        replaceSuggestions([])
      }}
    >
      <Icon {...props} name="close" />
    </TouchableWithoutFeedback>
  )
  const renderLoadingIndicator = () => <LoadingIndicator />
  const debounceFetchSuggestion = useCallback(
    debounce((search: string) => fetchSuggestions(search), 500),
    [],
  )

  const renderOption = (item, index) => (
    <AutocompleteItem
      onPress={() => {
        setSearchForm(item)
        onGoToRepository(item)
      }}
      key={index}
      title={item}
    />
  )

  const renderCardHeader = () => (
    <Text style={styles.cardHeader} category="s1" tx="home.search_histories" />
  )
  const searchHistoryItem = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate("commits", { repository: item })}>
      <Text key={item} category="label">
        {item}
      </Text>
    </TouchableOpacity>
  )

  return (
    <Screen style={styles.root}>
      <SafeAreaView />
      <TopNavigation title={renderTitle} accessoryRight={MenuActions} />
      <Layout style={styles.body}>
        <Autocomplete
          label={translate("home.search_label")}
          status={status}
          caption={caption !== "" ? translate(caption) : ""}
          value={searchForm}
          onSubmitEditing={(v) => onGoToRepository(v.nativeEvent.text)}
          autoCapitalize="none"
          accessoryRight={loading ? renderLoadingIndicator : renderCloseIcon}
          onChangeText={(nextValue) => {
            setSearchForm(nextValue)
            debounceFetchSuggestion(nextValue)
          }}
        >
          {searchSuggestions.map(renderOption)}
        </Autocomplete>
        <Card style={styles.card} header={renderCardHeader}>
          {searchHistories.map(searchHistoryItem)}
        </Card>
      </Layout>
    </Screen>
  )
})
