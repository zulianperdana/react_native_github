import { GeneralApiProblem } from "./api-problem"
import { UserDetails } from "../../models/user/user"

export type GithubLoginResult = { kind: "ok"; user: UserDetails } | GeneralApiProblem

export type SearchRepositoriesResults = { kind: "ok"; repositories: string[] } | GeneralApiProblem
