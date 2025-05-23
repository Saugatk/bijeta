"use client"

import { useState, useEffect, useRef } from "react"
import { Music, VolumeX, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import Image from "next/image"
import Script from "next/script"

export default function ConfessionPage() {
  // EmailJS initialization
  const emailjsInitialized = useRef(false);
  // Basic state
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [curtainOpen, setCurtainOpen] = useState(false)

  // Response state
  const [showQuestion, setShowQuestion] = useState(true)
  const [showYesResponse, setShowYesResponse] = useState(false)
  const [showTimeResponse, setShowTimeResponse] = useState(false)
  const [showCustomResponse, setShowCustomResponse] = useState(false)
  
  // EmailJS state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [showSubmittedResponse, setShowSubmittedResponse] = useState(false)

  // Custom response
  const [customResponse, setCustomResponse] = useState("")

  // Confetti for "Yes" response
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiRef = useRef<HTMLCanvasElement>(null)
  const confettiContext = useRef<CanvasRenderingContext2D | null>(null)
  const confettiParticles = useRef<any[]>([])

  // Rose petals for "Yes" response
  const [showRosePetals, setShowRosePetals] = useState(false)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/piano-background.mp3")
    audio.loop = true
    setAudioElement(audio)

    // Open curtain after a delay
    const timer = setTimeout(() => {
      setCurtainOpen(true)
    }, 1500)

    // Initialize EmailJS
    if (!emailjsInitialized.current) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        window.emailjs.init('vS4eX7rH6mT_N4a4x');
        emailjsInitialized.current = true;
      };
      document.body.appendChild(script);
    }

    return () => {
      clearTimeout(timer)
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  // Confetti effect for "Yes" response
  useEffect(() => {
    if (showConfetti && confettiRef.current) {
      const canvas = confettiRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      confettiContext.current = canvas.getContext("2d")

      // Initialize confetti
      createConfetti()

      // Start animation
      const animationId = requestAnimationFrame(animateConfetti)

      return () => {
        cancelAnimationFrame(animationId)
      }
    }
  }, [showConfetti])

  const createConfetti = () => {
    confettiParticles.current = []

    for (let i = 0; i < 200; i++) {
      confettiParticles.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight,
        size: Math.random() * 10 + 5,
        color: [
          "#D4AF37", // gold
          "#FFFFF0", // ivory
          "#722F37", // wine red
          "#F7E7CE", // champagne
        ][Math.floor(Math.random() * 4)],
        speed: Math.random() * 5 + 2,
        angle: Math.random() * 2 * Math.PI,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
      })
    }
  }

  const animateConfetti = () => {
    if (!confettiContext.current) return

    const ctx = confettiContext.current
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    confettiParticles.current.forEach((particle) => {
      particle.y += particle.speed
      particle.x += Math.sin(particle.angle) * 2
      particle.rotation += particle.rotationSpeed

      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)

      ctx.fillStyle = particle.color
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)

      ctx.restore()

      // Reset particles that fall off screen
      if (particle.y > window.innerHeight) {
        particle.y = Math.random() * -100
        particle.x = Math.random() * window.innerWidth
      }
    })

    requestAnimationFrame(animateConfetti)
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

  // Send email function
  const sendEmail = (option: string, message: string = "") => {
    if (!emailjsInitialized.current) {
      setSubmitError(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    
    // Add debugging logs
    console.log('Sending email with params:', {
      option_selected: option,
      custom_message: message,
      timestamp: new Date().toLocaleString()
    });
    
    const templateParams = {
      option_selected: option,  // Changed from selected_option to match template
      custom_message: message || "No custom message provided",
      timestamp: new Date().toLocaleString()
    };

    // @ts-ignore
    window.emailjs.send('service_fyv1dg8', 'template_4eaxn2k', templateParams)
      .then(() => {
        console.log('Email sent successfully');
        setIsSubmitting(false);
        setSubmitSuccess(true);
      })
      .catch((error: any) => {
        console.error('Email sending failed:', error);
        setIsSubmitting(false);
        setSubmitError(true);
      });
  };

  // Button handlers
  const handleYesResponse = () => {
    // Hide question, show yes response
    setShowQuestion(false)
    setShowYesResponse(true)

    // Play champagne pop sound
    const champagneSound = new Audio("/audio/champagne-pop.mp3")
    champagneSound.play()

    // Show confetti and rose petals
    setShowConfetti(true)
    setShowRosePetals(true)
    
    // Send email
    sendEmail("Say Yes");
  }

  const handleTimeResponse = () => {
    // Hide question, show time response
    setShowQuestion(false)
    setShowTimeResponse(true)
    
    // Send email
    sendEmail("Need Some Time");
  }

  const handleCustomResponse = () => {
    // Hide question, show custom response
    setShowQuestion(false)
    setShowCustomResponse(true)
  }

  const handleSubmitCustom = () => {
    // Hide custom response, show submitted response
    setShowCustomResponse(false)
    setShowSubmittedResponse(true)
    
    // Send email with custom message
    sendEmail("Say Something Else", customResponse);
  }

  const handleBackToQuestion = () => {
    // Reset all responses
    setShowYesResponse(false)
    setShowTimeResponse(false)
    setShowCustomResponse(false)
    setShowSubmittedResponse(false)

    // Hide effects
    setShowConfetti(false)
    setShowRosePetals(false)

    // Show question again
    setShowQuestion(true)
  }

  return (
    <div className="h-screen w-screen bg-black-velvet flex flex-col items-center justify-center overflow-hidden relative">
      {/* Confetti canvas */}
      {showConfetti && <canvas ref={confettiRef} className="absolute inset-0 z-50 pointer-events-none" />}

      {/* Rose petals animation */}
      {showRosePetals && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-wine-red rounded-full opacity-80"
              style={{
                top: `-50px`,
                left: `${Math.random() * 100}%`,
                borderRadius: "50% 0 50% 50%",
                transform: "rotate(45deg)",
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [45, 45 + Math.random() * 360],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Curtain animation */}
      <div className="absolute inset-0 z-30 flex pointer-events-none">
        <motion.div
          className="w-1/2 h-full bg-wine-red"
          initial={{ x: 0 }}
          animate={{ x: curtainOpen ? "-100%" : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="w-1/2 h-full bg-wine-red"
          initial={{ x: 0 }}
          animate={{ x: curtainOpen ? "100%" : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Starry background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-black-velvet bg-opacity-70" />
      </div>

      {/* Candles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gold rounded-full candle-flicker z-10" />
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-gold rounded-full candle-flicker z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gold rounded-full candle-flicker z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-gold rounded-full candle-flicker z-10" />

      {/* Main Question */}
      {curtainOpen && showQuestion && (
        <motion.div
          className="relative z-20 text-center p-8 max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-cinzel text-4xl md:text-6xl text-gold mb-12">One Question Remains...</h1>

          <motion.p
            className="font-playfair text-2xl md:text-4xl text-ivory mb-16 floating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            Bijeta, will you walk this journey with me?
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <Button
              onClick={handleYesResponse}
              variant="default"
              className="font-playfair text-lg px-8 py-6 bg-gold hover:bg-champagne text-black-velvet"
            >
              💍 Say Yes
            </Button>

            <Button
              onClick={handleTimeResponse}
              variant="outline"
              className="font-playfair text-lg px-8 py-6 text-ivory border-wine-red hover:bg-wine-red"
            >
              🕰️ Need Some Time
            </Button>

            <Button
              onClick={handleCustomResponse}
              variant="outline"
              className="font-playfair text-lg px-8 py-6 text-champagne border-champagne hover:bg-champagne hover:text-black-velvet"
            >
              ✒️ Say Something Else
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Yes Response */}
      {showYesResponse && (
        <motion.div
          className="relative z-20 text-center p-8 max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-cinzel text-4xl md:text-6xl text-gold mb-8">
              You've just made my universe bloom.
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
            <p className="font-lora text-xl md:text-2xl text-ivory mb-12">
              Every moment from now on is ours to write together.
            </p>
          </motion.div>

          <motion.div
            className="w-40 h-40 mx-auto mb-8 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring" }}
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Champagne celebration"
              width={200}
              height={200}
              className="object-contain"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
            <Button
              onClick={handleBackToQuestion}
              className="bg-transparent hover:bg-gold text-gold hover:text-black-velvet border border-gold font-playfair text-lg px-6 py-2 mt-8"
            >
              Back to Question
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Time Response */}
      {showTimeResponse && (
        <motion.div
          className="relative z-20 text-center p-8 max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-cinzel text-3xl md:text-5xl text-gold mb-8">
              Time is yours. So am I.
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
            <p className="font-lora text-xl text-ivory mb-12">
              Take all the time you need. Some things are worth waiting for, and you are worth every moment of patience.
            </p>
          </motion.div>

          <motion.div
            className="w-40 h-40 mx-auto mb-8 relative"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 0.8, delay: 1, type: "spring" },
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          >
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Vintage watch"
              width={200}
              height={200}
              className="object-contain"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
            <Button
              onClick={handleBackToQuestion}
              className="bg-transparent hover:bg-gold text-gold hover:text-black-velvet border border-gold font-playfair text-lg px-6 py-2 mt-8"
            >
              Back to Question
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Response */}
      {showCustomResponse && (
        <motion.div
          className="relative z-20 text-center p-8 max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-cinzel text-3xl md:text-5xl text-gold mb-8">Your words matter to me</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <p className="font-lora text-lg text-ivory mb-8">
              Whatever you wish to say, I'm here to listen with an open heart.
            </p>
          </motion.div>

          <motion.div
            className="bg-[rgba(255,255,240,0.1)] p-6 rounded-lg backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Textarea
              placeholder="Share your thoughts with me..."
              className="bg-transparent border-champagne text-ivory font-lora min-h-[150px]"
              value={customResponse}
              onChange={(e) => setCustomResponse(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <Button
                onClick={handleBackToQuestion}
                className="bg-transparent hover:bg-gold text-gold hover:text-black-velvet border border-gold font-playfair text-lg"
              >
                Back
              </Button>

              <Button
                onClick={handleSubmitCustom}
                className="bg-champagne hover:bg-gold text-black-velvet font-playfair text-lg px-6 py-2"
                disabled={!customResponse.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : submitError ? (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                ) : (
                  "Send Your Response"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Submitted Response */}
      {showSubmittedResponse && (
        <motion.div
          className="relative z-20 text-center p-8 max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-cinzel text-3xl md:text-5xl text-gold mb-8">Your note is safe with me.</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
            <p className="font-lora text-xl text-ivory mb-12">
              Your words have been received with the same care with which they were written. I cherish your honesty and
              the connection we share.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
            <Button
              onClick={handleBackToQuestion}
              className="bg-transparent hover:bg-gold text-gold hover:text-black-velvet border border-gold font-playfair text-lg px-6 py-2 mt-8"
            >
              Back to Question
            </Button>
          </motion.div>
        </motion.div>
      )}

      <button
        onClick={toggleMusic}
        className="music-toggle z-40"
        aria-label={musicPlaying ? "Mute music" : "Play music"}
      >
        {musicPlaying ? <VolumeX className="h-6 w-6 text-gold" /> : <Music className="h-6 w-6 text-gold" />}
      </button>
    </div>
  )
}
