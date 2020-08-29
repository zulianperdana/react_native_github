import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserDetails } from "../user/user"

export interface CommitItem {
  author: UserDetails
  committer: UserDetails
  authorTime: Date
  commiterTime: Date
  message: string
  sha: string
  commentCount: number
}

/**
 * Model description here for TypeScript hints.
 */
export const CommitModel = types
  .model("Commit")
  .props({
    repository: types.optional(types.string, ""),
    showOnlyMyCommit: types.optional(types.boolean, false),
    perPage: types.optional(types.number, 10),
    currentPage: types.optional(types.number, 1),
    paginationDone: types.optional(types.boolean, false),
    commits: types.optional(types.array(types.frozen<CommitItem>()), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setRepository(repository: string) {
      self.repository = repository
    },
    setShowOnlyMyCommit(value: boolean) {
      self.showOnlyMyCommit = value
    },
    setPerPage(perPage: number) {
      self.perPage = perPage
    },
    setCurrentPage(currentPage: number) {
      self.currentPage = currentPage
    },
    setPaginationDone(value: boolean) {
      self.paginationDone = value
    },
    setCommits(commits: CommitItem[]) {
      self.commits.replace(commits)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CommitType = Instance<typeof CommitModel>
export interface Commit extends CommitType {}
type CommitSnapshotType = SnapshotOut<typeof CommitModel>
export interface CommitSnapshot extends CommitSnapshotType {}
