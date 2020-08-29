import { CommitModel, Commit } from "./commit"

test("can be created", () => {
  const instance: Commit = CommitModel.create({})

  expect(instance).toBeTruthy()
})