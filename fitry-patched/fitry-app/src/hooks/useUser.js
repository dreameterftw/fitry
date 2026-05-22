import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../lib/firebase"
import { getAuth } from "firebase/auth"

export function useUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const uid = getAuth().currentUser?.uid
    if (!uid) {
      setLoading(false)
      return
    }

    const ref = doc(db, "users", uid)
    const unsub = onSnapshot(ref, snap => {
      setUser(snap.exists() ? snap.data() : null)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { user, loading }
}
