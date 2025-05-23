"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music, VolumeX, Volume2, FastForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Particle component for floating hearts
const FloatingHeart = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute text-2xl text-wine-red opacity-50"
    initial={{ y: Math.random() * window.innerHeight, x: Math.random() * window.innerWidth }}
    animate={{
      y: [
        Math.random() * window.innerHeight,
        Math.random() * window.innerHeight - 100,
        Math.random() * window.innerHeight,
      ],
      x: [
        Math.random() * window.innerWidth,
        Math.random() * window.innerWidth + 50,
        Math.random() * window.innerWidth,
      ],
    }}
    transition={{
      duration: 20 + Math.random() * 10,
      repeat: Infinity,
      delay,
    }}
  >
    ❤️
  </motion.div>
)

const TypingParagraph = ({ text, skipAnimation }: { text: string; skipAnimation: boolean }) => {
  const [visibleText, setVisibleText] = useState(skipAnimation ? text : "")

  useEffect(() => {
    if (skipAnimation) return

    let currentIndex = 0
    const typingSpeed = 30 // ms per character

    const interval = setInterval(() => {
      setVisibleText((prev: string) => prev + text[currentIndex])
      currentIndex++

      if (currentIndex === text.length) clearInterval(interval)
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [text, skipAnimation])

  return (
    <p className="font-great-vibes text-lg md:text-2xl text-black-velvet leading-relaxed whitespace-pre-wrap">
      {visibleText}
    </p>
  )
}

export default function LetterPage() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [voiceoverPlaying, setVoiceoverPlaying] = useState(false)
  const [voiceoverAudio, setVoiceoverAudio] = useState<HTMLAudioElement | null>(null)
  const [skipAnimation, setSkipAnimation] = useState(false)
  const router = useRouter()

  const paragraphs = [
    `Bijeta…

      I know everyone doesn't get what they love in life. And maybe I won't either. But one thing I don't want is to regret not telling you how I feel. I don't want to grow old and think, damn, I should've told her.
      
      So here I am.
      
      I've spent 20 years breathing… but I swear I only started living the day I saw you.
      
      Everything around me paused.
      
      The wind? it stopped.
      Your eyes? sparkled.
      Your hair? flowed like a scene straight out of a dream.
      And me? I just stood there… stuck.
      Like my soul already knew—you were her.
      
      And I really, really like you, Bijeta. I still do. More than words can explain. Even without meeting or talking in real life… even without hearing your voice… I've spent days loving you more than yesterday. Sounds crazy, right? But it's true. Just 3 songs, one photo, and your name that stays with me—both in my heart and my wallet.
      
      I used to back off… because I thought I wasn't enough. I mean, love isn't everything, right? I had to become something, someone who could give you the life you deserve. You're not just some random girl. You're beautiful, elegant, hardworking, independent, talented… you literally shine. And to stand next to a girl like you, I knew I had to be more than just "a guy who loves her."
      
      So, I worked. In silence. No big moves, just small steps.
      
      And now… I've started something. A company. AriciaHQ—yep, from your name. This isn't just a business, it's the beginning of everything I've dreamt with you in it. I've been building a whole plan around this. A future.
      
      Once I finish my 4th sem—6 more months—I'll fly to Dubai to start the base. Then to France, where I want to set up our main office. And yeah… that house in Cannes I've been dreaming about? I want to buy that too. It's peaceful. Beautiful. Just like you.
      
      Then slowly expand… brands in different countries, all paying royalty to the Dubai holding (no tax, smart right?). Build a strong passport, travel anywhere, no stress. Live less than 183 days in one place to avoid residency issues. I've calculated everything. I've dreamt everything.
      
      If this plan fails—cool. I have my skills. I can still earn 5–6 lakhs/month, even more with freelancing (8–10L). So, no, I'm not saying I have money. I know you can earn it yourself. That's not what this is about.
      
      What I'm saying is… I want you by my side.
      
      I'll protect you, support you, love you, stay loyal, never cheat, never hurt. I want to give you the life you deserve. In 5–6 years, I want you to look back and feel full. Loved. Safe. Happy.
      
      I want to remove money stress from our lives—because in this cruel world, that's the biggest killer of dreams. With that gone, we can live freely. Wildly.
      
      And I know I'm still just starting. Even if I could do it all alone, with you by my side, I'll build an empire. A legacy. So if you're with me even now, in this early phase, I swear—you won't regret it. It'll be worth it.
      
      I want us to settle down, expand everything, buy that house by 25–26, then get married. After that? Let's disappear. Travel the world for 2–3 years. Create our own little movie.
      
      You crave chocolate? We fly to Dubai.
      Date night? Pick a country, not just a restaurant.
      I'll plan surprise dates—helicopter ride over NYC, dinner I cooked on a random island, backyard stargazing, racing bikes like maniacs.
      
      We'll be partners in business, so our dates will even count as business expenses 😄
      Every day, I think of you and wonder… how can I make her smile today?
      
      Of course, we'll have fights. We'll get angry. Might even stop talking for a bit. But I promise, there'll be no ego. I'll come running back to you every single time. That's what love is, right?
      
      So… I'm done waiting.
      
      Bijeta, in your happy moments or your worst days, I want to be the one holding your hand. Through chaos and calm. Through laughter and silence. I want a life with you that's full of romance, adventure, comedy, drama, thriller, even suspense… all of it.
      
      I want a lifetime that feels like a movie.
      Where the final scene is me…
      breathing my last…
      in your arms.
      
      Will you hold my hand and walk this journey with me?
      
      I've waited really long to say all this. Please don't make me wait anymore.
      Take your time, if you need to…
      But if you feel the same—just say something.
      
      
      – Aaryan`
  ]

  useEffect(() => {
    const music = new Audio("/audio/music1.mp3")
    music.loop = true
    setAudioElement(music)

    const voiceover = new Audio("/audio/music1.mp3")
    setVoiceoverAudio(voiceover)

    return () => {
      if (music) {
        music.pause()
        music.currentTime = 0
      }
      if (voiceover) {
        voiceover.pause()
        voiceover.currentTime = 0
      }
    }
  }, [])

  const handleSkipAnimation = () => {
    setSkipAnimation(true)
  }

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

  const toggleVoiceover = () => {
    if (voiceoverAudio) {
      if (voiceoverPlaying) {
        voiceoverAudio.pause()
      } else {
        voiceoverAudio.play()
      }
      setVoiceoverPlaying(!voiceoverPlaying)
    }
  }

  const handleContinue = () => {
    router.push("/interlude")
  }

  return (
    <div className="min-h-screen bg-ivory old-paper flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}

      <div className="absolute inset-0 bg-gradient-radial from-champagne/20 to-transparent animate-pulse" />

      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-cinzel text-3xl md:text-5xl text-wine-red text-center mb-12">The First Whisper</h1>

        <div className="bg-[rgba(255,255,240,0.8)] p-8 md:p-12 rounded-lg shadow-2xl backdrop-blur-sm">
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <TypingParagraph key={index} text={paragraph} skipAnimation={skipAnimation} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 gap-4">
          {!skipAnimation && (
            <Button
              onClick={handleSkipAnimation}
              className="bg-wine-red hover:bg-black-velvet text-ivory font-playfair text-lg px-6 py-3 flex items-center gap-2"
            >
              <FastForward className="w-4 h-4" />
              Skip Animation
            </Button>
          )}
          <Button
            onClick={handleContinue}
            className="bg-wine-red hover:bg-black-velvet text-ivory font-playfair text-lg px-8 py-6"
          >
            Continue the Journey
          </Button>
        </div>
      </motion.div>

      <div className="fixed bottom-20 right-20 flex space-x-4">
        <button
          onClick={toggleVoiceover}
          className="music-toggle"
          aria-label={voiceoverPlaying ? "Pause voiceover" : "Play voiceover"}
        >
          <Volume2 className="h-6 w-6 text-wine-red" />
        </button>

        <button onClick={toggleMusic} className="music-toggle" aria-label={musicPlaying ? "Mute music" : "Play music"}>
          {musicPlaying ? <VolumeX className="h-6 w-6 text-wine-red" /> : <Music className="h-6 w-6 text-wine-red" />}
        </button>
      </div>
    </div>
  )
}
