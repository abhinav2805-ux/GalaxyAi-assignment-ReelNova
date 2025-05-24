"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import TransformationExample from "./transformation-example"

export default function ReelNovaationHero() {
  const [isPlaying, setIsPlaying] = useState(false)

  // Simulated video player state
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying])

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12">
     
      <div className="flex-1 w-full max-w-xl">
        <div className="relative bg-background rounded-xl overflow-hidden shadow-lg p-4">
          
          <div className="relative aspect-video mb-4">
            {isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center text-primary">
                <span className="text-lg font-medium">Demo video playing...</span>
              </div>
            ) : (
              <TransformationExample
                title=""
                description=""
                beforeSrc="https://storage.googleapis.com/falserverless/hunyuan_video/hunyuan_v2v_input.mp4"
                afterSrc="https://v3.fal.media/files/kangaroo/y5-1YTGpun17eSeggZMzX_video-1733468228.mp4"
              />
            )}
          </div>

          
        </div>
      </div>
    </div>
  )
}