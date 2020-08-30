import { CommitStoreModel, CommitStore } from "./commit-store"

test("can be created", () => {
  const instance: CommitStore = CommitStoreModel.create({})

  expect(instance).toBeTruthy()
})
