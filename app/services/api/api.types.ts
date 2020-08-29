import { GeneralApiProblem } from "./api-problem"
import { UserDetails } from "../../models/user/user"
import { CommitItem } from "../../models/commit/commit"

export type GithubLoginResult = { kind: "ok"; user: UserDetails } | GeneralApiProblem

export type SearchRepositoriesResults = { kind: "ok"; repositories: string[] } | GeneralApiProblem

export type CommitResults = { kind: "ok"; commits: CommitItem[] } | GeneralApiProblem
