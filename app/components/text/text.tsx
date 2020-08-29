import * as React from "react"
import { Text as UiKittenText } from "@ui-kitten/components"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const { tx, txOptions, text, children, style, category, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return (
    <UiKittenText category={category} {...rest} style={style}>
      {content}
    </UiKittenText>
  )
}
