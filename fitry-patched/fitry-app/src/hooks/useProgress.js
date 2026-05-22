import { useEffect, useState } from "react"
import { doc, collection, onSnapshot } from "firebase/firestore"
import { db } from "../lib/firebase"
import { getAuth } from "firebase/auth"

/**
 * Fetch a single course progress document by courseId.
 * Returns { progress, loading }.
 */
export function useProgress(courseId) {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const uid = getAuth().currentUser?.uid
    if (!uid || !courseId) {
      setLoading(false)
      return
    }

    const ref = doc(db, "users", uid, "progress", String(courseId))
    const unsub = onSnapshot(ref, snap => {
      setProgress(snap.exists() ? snap.data() : null)
      setLoading(false)
    })

    return () => unsub()
  }, [courseId])

  return { progress, loading }
}

/**
 * Fetch ALL course progress documents for the current user.
 * Returns { allProgress: Array, loading }.
 * Each item is the Firestore doc data with its `id` injected.
 */
export function useAllProgress() {
  const [allProgress, setAllProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const uid = getAuth().currentUser?.uid
    if (!uid) {
      setLoading(false)
      return
    }

    const colRef = collection(db, "users", uid, "progress")
    const unsub = onSnapshot(colRef, snap => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setAllProgress(docs)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { allProgress, loading }
}
