import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { GithubLoginResult } from "../../services/api/api.types"
import { omit } from "ramda"
import { save, load } from "../../utils/keychain"

export interface UserDetails {
  username: string
  url: string
  avatarUrl: string
}

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    userDetails: types.frozen<UserDetails>(),
    tempUserDetails: types.frozen<UserDetails>(),
    username: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
  })
  .postProcessSnapshot(omit(["password"])) // prevent password to be stored in async storage, instead use secure keychain
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setUser(userDetails: UserDetails, password: string) {
      self.userDetails = userDetails
      self.password = password
    },
    setTempUser(userDetails: UserDetails) {
      self.tempUserDetails = userDetails
    },
    setUsername(username: string) {
      self.username = username
    },
    logout() {
      self.password = ""
      self.userDetails = null
      self.tempUserDetails = null
    },
  }))
  .actions((self) => ({
    login: flow(function* (login: string, password: string) {
      const result: GithubLoginResult = yield self.environment.api.loginToGithub(login, password)
      if (result.kind === "ok") {
        self.setUser(result.user, password)
        yield save(result.user.username, password)
        return true
      }
      return false
    }),
    checkUsername: flow(function* (username: string) {
      const result: GithubLoginResult = yield self.environment.api.getUser(username)
      if (result.kind === "ok") {
        self.setTempUser(result.user)
        return result.user
      }
    }),
    loadPassword: flow(function* () {
      const { password } = yield load()
      self.password = password
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
