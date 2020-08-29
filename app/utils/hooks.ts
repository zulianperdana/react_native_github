import { useStores } from "../models/root-store/root-store-context"

export default function useMst(mapStateToProps) {
  const store = useStores()

  if (typeof mapStateToProps !== "undefined") {
    return mapStateToProps(store)
  }

  return store
}
