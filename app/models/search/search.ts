import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { SearchRepositoriesResults } from "../../services/api/api.types"
import { withEnvironment } from "../extensions/with-environment"
import { omit } from "ramda"
/**
 * Model description here for TypeScript hints.
 */
export const SearchModel = types
  .model("Search")
  .props({
    searchValue: types.optional(types.string, ""),
    searchSuggestions: types.optional(types.array(types.string), []),
    searchHistories: types.optional(types.array(types.string), []),
  })
  .postProcessSnapshot(omit(["searchSuggestions"]))
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addToSearchHistory(search: string) {
      if (!self.searchHistories.includes(search)) {
        self.searchHistories.replace([...self.searchHistories, search])
      }
    },
    replaceSuggestions(suggestions: string[]) {
      self.searchSuggestions.replace(suggestions)
    },
    setSearch(search: string) {
      self.searchValue = search
    },
  }))
  .actions((self) => ({
    fetchSuggestions: flow(function* (search: string) {
      const result: SearchRepositoriesResults = yield self.environment.api.searchRepositories(
        search,
      )
      console.log("SUGGESTIONS", result)
      if (result.kind === "ok") {
        self.replaceSuggestions(result.repositories)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type SearchType = Instance<typeof SearchModel>
export interface Search extends SearchType {}
type SearchSnapshotType = SnapshotOut<typeof SearchModel>
export interface SearchSnapshot extends SearchSnapshotType {}
