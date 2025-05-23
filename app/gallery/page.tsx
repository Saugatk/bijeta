"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  {
    title: "First Date",
    description: "The beginning of our story",
    image: "/assets/img1.jpeg",
  },
  {
    title: "Sunset in Bali",
    description: "Where time stood still",
    image: "/assets/img2.jpeg",
  },
  {
    title: "Paris Weekend",
    description: "Unexpected adventures",
    image: "/assets/img4.jpeg",
  },
  {
    title: "Mountain Retreat",
    description: "Finding peace together",
    image: "/assets/img3.jpeg",
  },
  {
    title: "Anniversary Dinner",
    description: "Celebrating us",
    image: "/assets/img5.jpeg",
  },
  {
    title: "Beach Day",
    description: "Simple joys",
    image: "/assets/img6.jpeg",
  },
]

export default function GalleryPage() {
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
    router.push("/confession")
  }

  return (
    <div className="min-h-screen bg-ivory py-16 px-4 relative overflow-hidden">
      {/* Floating petals animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-champagne rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 1000],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="font-cinzel text-4xl md:text-6xl text-wine-red text-center mb-8">Moments I Dream Of</h1>

        <p className="font-lora text-lg md:text-xl text-black-velvet text-center mb-16 max-w-3xl mx-auto">
          These spaces await our memories. The frames are ready for the moments we'll create together, each one a
          chapter in our unfolding story.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryImages.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-champagne"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="relative h-64 w-full">
                <div className="absolute inset-0">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="font-playfair text-xl text-white mb-1">{item.title}</h3>
                    <p className="font-lora text-champagne">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleContinue}
            className="bg-wine-red hover:bg-black-velvet text-ivory font-playfair text-lg px-8 py-6"
          >
            Continue to Final Chapter
          </Button>
        </div>
      </motion.div>

      <button onClick={toggleMusic} className="music-toggle" aria-label={musicPlaying ? "Mute music" : "Play music"}>
        {musicPlaying ? <VolumeX className="h-6 w-6 text-wine-red" /> : <Music className="h-6 w-6 text-wine-red" />}
      </button>
    </div>
  )
}
