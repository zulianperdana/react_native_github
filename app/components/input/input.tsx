import * as React from "react"
import { Input as KittenInput, InputProps, useTheme } from "@ui-kitten/components"

export function Input(props: InputProps) {
  const theme = useTheme()
  const TEXT_STYLE = { marginLeft: 0, paddingLeft: 0 }
  const CONTAINER_STYLE = {
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderBottomColor: theme["color-basic-transparent-300"],
  }
  return <KittenInput textStyle={TEXT_STYLE} style={CONTAINER_STYLE} {...props} />
}
