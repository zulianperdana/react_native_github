import * as React from "react"
import { View, StyleSheet } from "react-native"
import { Spinner } from "@ui-kitten/components"

const styles = StyleSheet.create({
  indicator: {
    alignItems: "center",
    justifyContent: "center",
  },
})

interface LoadingIndicatorProps {
  status?: string
}

const LoadingIndicator = ({ status }: LoadingIndicatorProps) => (
  <View style={styles.indicator}>
    <Spinner status={status} size="small" />
  </View>
)

LoadingIndicator.defaultProps = {
  status: "primary",
}

export { LoadingIndicator }
