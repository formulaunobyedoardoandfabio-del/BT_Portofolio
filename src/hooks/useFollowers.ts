import { useEffect, useState } from "react"
import { FOLLOWERS_ENDPOINT, FOLLOWERS_FALLBACK, FOLLOWERS_POLL_MS } from "../lib/config"

export function useFollowers() {
  const [count, setCount] = useState(FOLLOWERS_FALLBACK)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let alive = true

    if (!FOLLOWERS_ENDPOINT) {
      const id = setInterval(() => setCount((c) => c + 1 + Math.floor(Math.random() * 3)), 6000)
      return () => clearInterval(id)
    }

    const load = async () => {
      try {
        const res = await fetch(FOLLOWERS_ENDPOINT, { cache: "no-store" })
        const data = await res.json()
        const n = Number(data.followers ?? data.count)
        if (alive && Number.isFinite(n)) {
          setCount(n)
          setLive(true)
        }
      } catch {
        if (alive) setLive(false)
      }
    }
    load()
    const id = setInterval(load, FOLLOWERS_POLL_MS)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  return { count, live }
}
