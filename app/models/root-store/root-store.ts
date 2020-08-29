import { CommitStoreModel } from "../commit-store/commit-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user/user"
import { SearchModel } from "../search/search"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  commitStore: types.optional(CommitStoreModel, {}),
  user: types.optional(UserModel, {} as any),
  search: types.optional(SearchModel, {} as any),
  darkMode: types.optional(types.boolean, false),
}).actions((self) => ({
  setDarkMode(darkMode: boolean) {
    self.darkMode = darkMode
  },
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
