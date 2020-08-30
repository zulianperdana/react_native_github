import React from "react"
import { observer } from "mobx-react-lite"
import { Icon, TopNavigationAction, OverflowMenu, MenuItem } from "@ui-kitten/components"
import { useStores } from "../../models/root-store/root-store-context"
import { translate } from "../../i18n"

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />

const LogoutIcon = (props) => <Icon {...props} name="log-out" />

const MoonIcon = (props) => <Icon {...props} name="moon-outline" />
const SunIcon = (props) => <Icon {...props} name="sun-outline" />

export const MenuActions = observer(function MenuActions() {
  const [menuVisible, setMenuVisible] = React.useState(false)
  const { darkMode, setDarkMode, user, logout } = useStores()
  const { clearPassword } = user
  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
        {darkMode ? (
          <MenuItem
            onPress={() => setDarkMode(false)}
            accessoryLeft={SunIcon}
            title={translate("settings.light_mode")}
          />
        ) : (
          <MenuItem
            onPress={() => setDarkMode(true)}
            accessoryLeft={MoonIcon}
            title={translate("settings.dark_mode")}
          />
        )}
        <MenuItem
          onPress={() => {
            clearPassword()
            // TO DO : need a better way
            setTimeout(logout, 1000)
          }}
          accessoryLeft={LogoutIcon}
          title="Logout"
        />
      </OverflowMenu>
    </React.Fragment>
  )

  return <>{renderOverflowMenuAction()}</>
})
