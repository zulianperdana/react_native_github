import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import { UserDetails } from "../../models/user/user"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets github user details from their username and password/personal access token
   */

  async loginToGithub(username: string, password: string): Promise<Types.GithubLoginResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `/user`,
      {},
      { auth: { username, password } },
    )
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    console.log(response.data)
    try {
      const { url, login } = response.data
      const resultUser: UserDetails = {
        avatarUrl: response.data.avatar_url,
        url,
        username: login,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Search for repositories by name for autocomplete feature
   */

  async searchRepositories(search: string): Promise<Types.SearchRepositoriesResults> {
    const perPage = 10
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `/search/repositories?q=${search}%20in:name&per_page=${perPage}`,
    )
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const { items } = response.data
      const repositories: string[] = items.map((item) => item.full_name)
      return { kind: "ok", repositories }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
