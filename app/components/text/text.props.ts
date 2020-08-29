import { TextStyle, TextProps as TextProperties } from "react-native"

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * Ui kitten text category https://akveo.github.io/react-native-ui-kitten/docs/components/text/overview#text
   */
  category?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "s1"
    | "s2"
    | "p1"
    | "p2"
    | "c1"
    | "c2"
    | "label"

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]
}
