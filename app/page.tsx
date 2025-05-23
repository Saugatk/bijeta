"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/piano-background.mp3")
    audio.loop = true
    setAudioElement(audio)

    // Simulate loader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  const toggleMusic = () => {
    if (audioElement) {
      if (musicPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setMusicPlaying(!musicPlaying)
    }
  }

  const handleEnter = () => {
    router.push("/letter")
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black-velvet">
        <div className="text-center">
          <h1 className="font-cinzel text-5xl md:text-7xl gold-shimmer mb-8">A × B</h1>
          <p className="font-lora text-champagne text-sm md:text-base mt-4">
            Every heartbeat has whispered your name since 14 Feb 2025.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black-velvet overflow-hidden">
      <motion.div
        className="text-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="font-cinzel text-4xl md:text-6xl text-gold mb-8">Maison de Confession</h1>
        <motion.p
          className="font-playfair text-xl md:text-3xl text-ivory mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          To Bijeta — From the man whose world paused the day he saw you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <Button
            onClick={handleEnter}
            className="bg-transparent hover:bg-gold text-gold hover:text-black-velvet border border-gold font-playfair text-lg px-8 py-6"
          >
            Enter Our Story
          </Button>
        </motion.div>
      </motion.div>

      <button onClick={toggleMusic} className="music-toggle" aria-label={musicPlaying ? "Mute music" : "Play music"}>
        {musicPlaying ? <VolumeX className="h-6 w-6 text-gold" /> : <Music className="h-6 w-6 text-gold" />}
      </button>
    </div>
  )
}
