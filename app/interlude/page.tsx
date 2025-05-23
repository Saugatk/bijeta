"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function InterludePage() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [daysSince, setDaysSince] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/piano-background.mp3")
    audio.loop = true
    setAudioElement(audio)

    // Calculate days since February 14, 2024
    const calculateDays = () => {
      const startDate = new Date(2024, 1, 14) // Month is 0-indexed (1 = February)
      const currentDate = new Date()
      
      // Calculate difference in milliseconds
      const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
      // Convert to days
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      
      setDaysSince(diffDays)
    }

    calculateDays()
    // Update the counter every day
    const interval = setInterval(calculateDays, 1000 * 60 * 60 * 24)

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      clearInterval(interval)
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

  const handleContinue = () => {
    router.push("/vision")
  }

  return (
    <div className="min-h-screen bg-black-velvet flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Background stars animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center p-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="font-cinzel text-4xl md:text-6xl text-gold mb-12">Distance Between Us</h1>

        <motion.p
          className="font-playfair text-xl md:text-3xl text-ivory mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          12,039 km between us. Yet my heart never wandered.
        </motion.p>

        <motion.div
          className="mb-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1.5 }}
        >
          <p className="font-cinzel text-lg md:text-2xl text-gold mb-2">Since I first saw you</p>
          <div className="bg-black bg-opacity-40 px-6 py-3 rounded-lg border border-gold">
            <span className="font-playfair text-2xl md:text-4xl text-gold">{daysSince}</span>
            <span className="font-lora text-xl md:text-2xl text-ivory ml-3">days</span>
          </div>
        </motion.div>

        <motion.p
          className="font-lora text-lg md:text-2xl text-champagne mb-16 floating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        >
          Wherever you are… that's home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <Button
            onClick={handleContinue}
            className="bg-transparent hover:bg-gold text-gold hover:text-black-velvet border border-gold font-playfair text-lg px-8 py-6"
          >
            Continue Our Journey
          </Button>
        </motion.div>
      </motion.div>

      <button onClick={toggleMusic} className="music-toggle fixed bottom-8 right-8" aria-label={musicPlaying ? "Mute music" : "Play music"}>
        {musicPlaying ? <VolumeX className="h-6 w-6 text-gold" /> : <Music className="h-6 w-6 text-gold" />}
      </button>
    </div>
  )
}
