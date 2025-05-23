"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"

interface TransformationExampleProps {
  title: string
  description: string
  beforeSrc: string // Should be a Cloudinary video URL
  afterSrc: string  // Should be a Cloudinary video URL
}

export default function TransformationExample({ title, description, beforeSrc, afterSrc }: TransformationExampleProps) {
  const [showAfter, setShowAfter] = useState(false)

  const videoSrc = showAfter ? afterSrc : beforeSrc

  return (
    <Card className="overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-video">
        <video
          controls
          className="w-full h-full"
          src={videoSrc}
        />
        <div className="absolute top-2 left-2 bg-background/80 dark:bg-background/30 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
          {showAfter ? "After" : "Before"}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-2 right-2 gap-2 bg-background/80 dark:bg-background/30 backdrop-blur-sm"
          onClick={() => setShowAfter(!showAfter)}
        >
          <ArrowLeftRight className="h-4 w-4" />
          {showAfter ? "Show Original" : "Show Transformed"}
        </Button>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}