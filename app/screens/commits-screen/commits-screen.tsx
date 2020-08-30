import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, SafeAreaView, RefreshControl, FlatList, TouchableOpacity } from "react-native"
import { Layout, useTheme, Toggle } from "@ui-kitten/components"
import {
  Screen,
  MenuActions,
  BackButton,
  Text,
  CommitItemDisplay,
  LoadingIndicator,
} from "../../components"
import { useStores } from "../../models"
import { translate } from "../../i18n"
import { Commit } from "../../models/commit/commit"

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 24,
  },
  empty: {
    alignItems: "center",
    marginTop: 50
  },
  footer: {
    alignItems: "center",
  },
  headerLayout: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 12,
  },
  headerText: {
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 12,
  },
  listHeaderLayout: {
    marginBottom: 12,
    alignItems: "flex-end",
  },
})

export const CommitsScreen = observer(function CommitsScreen({ route }: any) {
  const { repository } = route.params
  const theme = useTheme()
  const { commitStore, user } = useStores()
  const { password } = user
  const { username } = user.userDetails
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const { repositories, loadNextPage } = commitStore
  const currentRepositories: Commit = repositories.get(repository)
  if (currentRepositories === undefined) {
    return <Text>Undefined</Text>
  }
  const { commits, showOnlyMyCommit } = currentRepositories
  const renderTitle = () => (
    <Layout style={styles.headerLayout}>
      <BackButton />
      <Text style={styles.headerText} category="h6">
        {repository}
      </Text>
      <MenuActions />
    </Layout>
  )

  const renderCommit = (commit) => <CommitItemDisplay key={commit.sha} commit={commit} />

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await loadNextPage(currentRepositories, username, password, true)
    } finally {
      setRefreshing(false)
    }
  }

  const onLoadMore = async () => {
    setIsLoadingMore(true)
    try {
      console.log(username, password)
      await loadNextPage(currentRepositories, username, password, false)
    } finally {
      setIsLoadingMore(false)
    }
  }
  const textStyle = {
    color: theme["color-primary-400"],
    marginBottom: 24,
  }
  const doneTextStyle = {
    color: theme["color-basic-disabled"],
    marginBottom: 24,
  }

  const renderLoadMoreButton = () => {
    return (
      <SafeAreaView style={styles.footer}>
        {currentRepositories.commits.length > 0 &&
          (currentRepositories.paginationDone ? (
            <Text style={doneTextStyle} tx="commits.no_more_data" category="label" />
          ) : isLoadingMore ? (
            <LoadingIndicator />
          ) : (
            <TouchableOpacity onPress={onLoadMore}>
              <Text style={textStyle} tx="commits.load_more" category="p1" />
            </TouchableOpacity>
          ))}
      </SafeAreaView>
    )
  }

  const renderListHeader = () => (
    <Layout style={styles.listHeaderLayout}>
      <Toggle
        checked={showOnlyMyCommit}
        onChange={() => {
          currentRepositories.setShowOnlyMyCommit(!showOnlyMyCommit)
          onRefresh()
        }}
      >
        {translate("commits.show_only_my_commits")}
      </Toggle>
    </Layout>
  )

  const emptyCommitRenderer = () => (
    <Layout style={styles.empty}>
      <Text style={doneTextStyle} tx="commits.commits_not_found" category="h5" />
    </Layout>
  )

  return (
    <Screen>
      <SafeAreaView />
      {renderTitle()}
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={styles.content}
        data={commits}
        ListEmptyComponent={emptyCommitRenderer}
        keyExtractor={(i) => i.sha}
        ListFooterComponent={renderLoadMoreButton}
        ListHeaderComponent={renderListHeader}
        renderItem={renderCommit}
      />
    </Screen>
  )
})
