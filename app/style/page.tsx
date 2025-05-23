"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

const outfits = [
  {
    title: "White & Black – Riviera Look",
    description: "Elegant simplicity for sunset walks along the Mediterranean coast.",
    image: "/assets/img11.jpeg",
  },
  {
    title: "Evening Velvet – Cannes Vibe",
    description: "Sophisticated glamour for nights under the stars at exclusive galas.",
    image: "/assets/img12.jpeg",
  },
  {
    title: "Urban Chic – Dubai Meetings",
    description: "Refined power dressing for making impressions in the business world.",
    image: "/assets/img14.jpeg",
  },
  {
    title: "Island Escape – Private Getaway",
    description: "Effortless luxury for those days when the world is just us.",
    image: "/assets/img13.jpeg",
  },
]

export default function StylePage() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/piano-background.mp3")
    audio.loop = true
    setAudioElement(audio)

    return () => {
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

  const handleContinue = () => {
    router.push("/gallery")
  }

  return (
    <div className="min-h-screen bg-ivory py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="font-cinzel text-4xl md:text-6xl text-wine-red text-center mb-8">Our Timeless Style</h1>

        <p className="font-lora text-lg md:text-xl text-black-velvet text-center mb-16 max-w-3xl mx-auto">
          The world is our runway. These are the moments where our aesthetics align, creating a visual harmony as unique
          as our connection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {outfits.map((outfit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={outfit.image || "/placeholder.svg"} 
                    alt={outfit.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl text-wine-red mb-2">{outfit.title}</h3>
                <p className="font-lora text-black-velvet">{outfit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleContinue}
            className="bg-wine-red hover:bg-black-velvet text-ivory font-playfair text-lg px-8 py-6"
          >
            Continue Our Journey
          </Button>
        </div>
      </motion.div>

      <button onClick={toggleMusic} className="music-toggle" aria-label={musicPlaying ? "Mute music" : "Play music"}>
        {musicPlaying ? <VolumeX className="h-6 w-6 text-wine-red" /> : <Music className="h-6 w-6 text-wine-red" />}
      </button>
    </div>
  )
}
