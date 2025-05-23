"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function VisionPage() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

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
    router.push("/movie")
  }

  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden" ref={containerRef}>
      <div className="fixed top-0 left-0 w-full h-1 bg-[rgba(212,175,55,0.2)] z-50">
        <motion.div className="h-full bg-gold" style={{ width: lineWidth }} />
      </div>

      <section className="h-screen flex flex-col items-center justify-center p-8 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Dubai Skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black-velvet bg-opacity-60" />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="font-cinzel text-4xl md:text-6xl text-gold mb-8">A Legacy We'll Build</h1>

          <h2 className="font-playfair text-2xl md:text-4xl text-ivory mb-12">Dubai Office</h2>

          <p className="font-lora text-lg md:text-xl text-champagne mb-8 max-w-2xl mx-auto">
            Where ambition meets opportunity. Our headquarters in the city of gold, overlooking a skyline that reminds
            us daily that dreams can touch the clouds.
          </p>
        </motion.div>
      </section>

      <section className="h-screen flex flex-col items-center justify-center p-8 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Cannes House"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black-velvet bg-opacity-60" />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-2xl md:text-4xl text-ivory mb-12">Cannes House</h2>

          <p className="font-lora text-lg md:text-xl text-champagne mb-8 max-w-2xl mx-auto">
            Our sanctuary by the sea. Morning coffees on the terrace, evenings watching the sunset paint the
            Mediterranean. A place where time slows down just for us.
          </p>
        </motion.div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="Our Life" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black-velvet bg-opacity-70" />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-2xl md:text-4xl text-ivory mb-12">Our Life</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[rgba(255,255,240,0.1)] p-6 rounded-lg backdrop-blur-sm">
              <h3 className="font-cinzel text-xl text-gold mb-4">Backyard Dinners</h3>
              <p className="font-lora text-ivory">
                Intimate evenings under string lights, sharing stories and dreams over wine.
              </p>
            </div>

            <div className="bg-[rgba(255,255,240,0.1)] p-6 rounded-lg backdrop-blur-sm">
              <h3 className="font-cinzel text-xl text-gold mb-4">Racing Bikes</h3>
              <p className="font-lora text-ivory">
                Weekend adventures, wind in our hair, discovering hidden paths together.
              </p>
            </div>

            <div className="bg-[rgba(255,255,240,0.1)] p-6 rounded-lg backdrop-blur-sm">
              <h3 className="font-cinzel text-xl text-gold mb-4">Traveling the World</h3>
              <p className="font-lora text-ivory">
                Collecting passport stamps and memories, finding ourselves in new cultures.
              </p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="bg-gold hover:bg-champagne text-black-velvet font-playfair text-lg px-8 py-6 mt-8"
          >
            Continue Our Journey
          </Button>
        </motion.div>
      </section>

      <button onClick={toggleMusic} className="music-toggle" aria-label={musicPlaying ? "Mute music" : "Play music"}>
        {musicPlaying ? <VolumeX className="h-6 w-6 text-wine-red" /> : <Music className="h-6 w-6 text-wine-red" />}
      </button>
    </div>
  )
}
