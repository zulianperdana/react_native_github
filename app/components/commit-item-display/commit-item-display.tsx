import * as React from "react"
import { View, StyleSheet, Linking } from "react-native"
import { Text } from "../"
import { Card, Layout, Avatar, Button, Tooltip } from "@ui-kitten/components"
import { UserDetails } from "../../models/user/user"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import TimeAgo from "react-timeago"
import enStrings from "react-timeago/lib/language-strings/en"
import idStrings from "react-timeago/lib/language-strings/id"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"
import i18n from "i18n-js"
import { translate } from "../../i18n"

const enFormatter = buildFormatter(enStrings)
const idFormatter = buildFormatter(idStrings)

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 6,
  },
  avatarText: {
    flexGrow: 1,
    marginLeft: 12,
  },
  card: {
    marginBottom: 12,
  },
  message: {
    marginTop: 12,
  },
  root: {
    flexDirection: "column",
  },
})

export interface CommitItemDisplayProps {
  commit: any
}

/**
 * Describe your component here
 */
export function CommitItemDisplay({ commit }: any) {
  const { author, authorTime, commentCount, commiterTime, committer, message, sha } = commit.item
  const timeAgoRenderer = (props) => <Text category="c1" {...props} />
  const renderAvatar = (user: UserDetails, type: string, time: Date) => {
    const [visible, setVisible] = React.useState(false)
    const renderTimeago = () => (
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <TimeAgo
          date={time}
          component={timeAgoRenderer}
          formatter={i18n.locale === "en" ? enFormatter : idFormatter}
        />
      </TouchableWithoutFeedback>
    )

    return (
      <Layout style={styles.avatarContainer}>
        <Avatar source={{ uri: user.avatarUrl }} />
        <Text style={styles.avatarText} category="c2">
          {user.username} {type}
        </Text>
        <Tooltip anchor={renderTimeago} visible={visible} onBackdropPress={() => setVisible(false)}>
          {new Date(time).toDateString()}
        </Tooltip>
      </Layout>
    )
  }

  const Footer = (props) => (
    <View {...props}>
      <Button
        onPress={() => Linking.openURL(`https://github.com/facebook/react-native/commit/${sha}`)}
        size="small"
      >
        {translate("commits.see_details")} ({commentCount}) {translate("commits.comments")}
      </Button>
    </View>
  )
  return (
    <Card style={styles.card} footer={Footer}>
      <Layout style={styles.root}>
        {author.username !== "" && renderAvatar(author, "authored", authorTime)}
        {committer.username !== "" &&
          committer.username !== author.username &&
          renderAvatar(committer, "committed", commiterTime)}
        <Text style={styles.message} category="p1">
          {message}
        </Text>
      </Layout>
    </Card>
  )
}
