"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const movieScenes = [
  {
    title: "Dubai Chocolate Night",
    description:
      "A private tasting at the world's finest chocolatier, where we discover flavors as complex as our connection.",
    image: "/assets/img8.jpeg",
  },
  {
    title: "Helicopter in NYC",
    description: "Soaring above the city that never sleeps, making plans that will outlast the skyline below.",
    image: "/assets/img7.jpeg",
  },
  {
    title: "Disappearing to an Island",
    description: "Just us, the sound of waves, and conversations that flow as endlessly as the ocean around us.",
    image: "/assets/img9.jpeg",
  },
  {
    title: "Business Class Surprise",
    description: "The moment you realize I've booked the seat next to yours on your flight home.",
    image: "/assets/img10.jpeg",
  },
]

export default function MoviePage() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentScene, setCurrentScene] = useState(0)
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

  const nextScene = () => {
    setCurrentScene((prev) => (prev === movieScenes.length - 1 ? 0 : prev + 1))
  }

  const prevScene = () => {
    setCurrentScene((prev) => (prev === 0 ? movieScenes.length - 1 : prev - 1))
  }

  const handleContinue = () => {
    router.push("/style")
  }

  return (
    <div className="min-h-screen bg-black-velvet flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="font-cinzel text-4xl md:text-6xl text-gold text-center mb-12">If Our Love Was a Film</h1>

        <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={movieScenes[currentScene].image || "/placeholder.svg"}
                alt={movieScenes[currentScene].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-velvet to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <h2 className="font-playfair text-2xl md:text-4xl text-ivory mb-4">
                  {movieScenes[currentScene].title}
                </h2>
                <p className="font-lora text-lg text-champagne max-w-2xl">{movieScenes[currentScene].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevScene}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] rounded-full p-2 text-ivory hover:bg-gold hover:text-black-velvet transition-colors"
            aria-label="Previous scene"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextScene}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] rounded-full p-2 text-ivory hover:bg-gold hover:text-black-velvet transition-colors"
            aria-label="Next scene"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {movieScenes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScene(index)}
                className={`w-3 h-3 rounded-full ${currentScene === index ? "bg-gold" : "bg-champagne opacity-50"}`}
                aria-label={`Go to scene ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleContinue}
            className="bg-wine-red hover:bg-black-velvet text-ivory border border-wine-red hover:border-gold font-playfair text-lg px-8 py-6"
          >
            Continue Our Journey
          </Button>
        </div>
      </motion.div>

      <button onClick={toggleMusic} className="music-toggle" aria-label={musicPlaying ? "Mute music" : "Play music"}>
        {musicPlaying ? <VolumeX className="h-6 w-6 text-gold" /> : <Music className="h-6 w-6 text-gold" />}
      </button>
    </div>
  )
}
