import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { CommitModel, Commit } from "../commit/commit"
import { CommitResults } from "../../services/api/api.types"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const CommitStoreModel = types
  .model("CommitStore")
  .props({
    repositories: types.optional(types.map(CommitModel), {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions((self) => ({
    loadNextPage: flow(function* (
      commit: Commit,
      username: string,
      password: string,
      reset: boolean,
    ) {
      if (!commit.paginationDone || reset) {
        const defaultPerPage = 10
        const { repository, perPage, showOnlyMyCommit, currentPage } = commit
        const result: CommitResults = yield self.environment.api.getCommits(
          repository,
          username,
          password,
          showOnlyMyCommit ?? false,
          perPage ?? defaultPerPage,
          reset ? 1 : currentPage + 1,
        )
        if (result.kind === "ok") {
          console.log("a")
          if (result.commits.length === 0 && !reset) {
            console.log("b")
            commit.setPaginationDone(true)
          } else {
            commit.setCurrentPage(currentPage + 1)
            if (reset) {
              commit.setPaginationDone(false)
              commit.setCommits(result.commits)
              console.log("SET COMITS", ...result.commits)
            } else {
              commit.setCommits([...commit.commits, ...result.commits])
              console.log("SET COMITS", [...commit.commits, ...result.commits])
            }
          }
        } else {
          __DEV__ && console.tron.log(result.kind)
        }
      }
    }),
    //  Load repository for the first time with default value
    loadRepository: flow(function* (repository: string, username: string, password: string) {
      const defaultPerPage = 10
      const result: CommitResults = yield self.environment.api.getCommits(
        repository,
        username,
        password,
        false,
        defaultPerPage,
        1,
      )
      console.log("load repository", result)
      if (result.kind === "ok") {
        self.repositories.set(
          repository,
          CommitModel.create({
            commits: result.commits,
            currentPage: 1,
            paginationDone: false,
            perPage: defaultPerPage,
            repository,
            showOnlyMyCommit: false,
          }),
        )
        return true
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
      return false
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CommitStoreType = Instance<typeof CommitStoreModel>
export interface CommitStore extends CommitStoreType {}
type CommitStoreSnapshotType = SnapshotOut<typeof CommitStoreModel>
export interface CommitStoreSnapshot extends CommitStoreSnapshotType {}
