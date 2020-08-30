import { SearchModel, Search } from "./search"

test("can be created", () => {
  const instance: Search = SearchModel.create({})

  expect(instance).toBeTruthy()
})
