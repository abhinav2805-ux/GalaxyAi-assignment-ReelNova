"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { FileUploaderRegular } from "@uploadcare/react-uploader/next"
import "@uploadcare/react-uploader/core.css"
import { ArrowLeft, Upload, Wand2, Info, Sparkles, FileVideo, Settings, Zap,History as HistoryIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY

export default function TransformPage() {
  const [form, setForm] = useState({
    prompt: "",
    num_inference_steps: 30,
    aspect_ratio: "16:9",
    resolution: "720p",
    num_frames: 129,
    strength: 0.85,
    seed: "",
    pro_mode: false,
    enable_safety_checker: true,
  })

  const [files, setFiles] = useState<any[]>([])
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")

  const handleChange = (name: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Poll for job status if jobId is set
  useEffect(() => {
    if (!jobId) return
    let interval: NodeJS.Timeout

    const pollStatus = async () => {
      try {
        const res = await fetch(`/api/falhook?jobId=${jobId}`)
        const data = await res.json()
        if (data.status === "completed" && (data.output?.video_url || data.output?.video?.url)) {
          setGeneratedVideoUrl(data.output.video_url || data.output.video?.url)
          setIsGenerating(false)
          setActiveTab("result")
          clearInterval(interval)
        }
      } catch (err) {
        // Optionally handle error
      }
    }

    interval = setInterval(pollStatus, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [jobId])

  // Uploadcare file upload handler
  const handleChangeEvent = async (e: any) => {
    const successfulFiles = e.allEntries.filter((file: any) => file.status === "success")
    setFiles(successfulFiles)

    if (successfulFiles.length > 0) {
      const cdnUrl = successfulFiles[0].cdnUrl
      setUploading(true)
      setError(null)
      setCloudinaryUrl(null)

      try {
        const res = await fetch("/api/cloudinary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cdnUrl }),
        })
        const data = await res.json()
        if (res.ok) {
          setCloudinaryUrl(data.url)
        } else {
          setError(data.error || "Cloudinary upload failed")
        }
      } catch (err: any) {
        setError(err.message || "Cloudinary upload failed")
      } finally {
        setUploading(false)
      }
    }
  }

  const handleUploadFailed = (e: any) => {
    setError(e.errors[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsGenerating(true)

    if (!cloudinaryUrl) {
      setError("Please upload a video first.")
      setIsGenerating(false)
      return
    }

    try {
      const res = await fetch("/api/hunyuanvideo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          video_url: cloudinaryUrl,
        }),
      })
      const data = await res.json()
      if (res.ok && data.jobId) {
        setJobId(data.jobId)
        setGeneratedVideoUrl(null) // Clear previous video
      } else {
        setError(data.error || "Fal video generation failed")
        setIsGenerating(false)
      }
    } catch (err: any) {
      setError(err.message || "Fal video generation failed")
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-background dark:from-violet-950/10 dark:to-background">
      <div className="container max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            AI Video Transformation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-purple-500 dark:from-violet-400 dark:to-purple-300 mb-4">
            Transform Your Videos with AI
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload a video and set parameters to transform it using our advanced AI model
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
              <TabsTrigger
                value="upload"
                className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 dark:data-[state=active]:bg-violet-900/30 dark:data-[state=active]:text-violet-300"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 dark:data-[state=active]:bg-violet-900/30 dark:data-[state=active]:text-violet-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger
                value="result"
                className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 dark:data-[state=active]:bg-violet-900/30 dark:data-[state=active]:text-violet-300"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Result
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <TabsContent value="upload" className="mt-0">
                <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10 border-b border-violet-100 dark:border-violet-800/20">
                    <CardTitle className="flex items-center gap-2 text-violet-800 dark:text-violet-300">
                      <Upload className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      Upload Your Video
                    </CardTitle>
                    <CardDescription>Upload a video file to transform with our AI model</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="prompt"
                          className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                        >
                          Transformation Prompt
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Describe the style or transformation you want to apply to your video
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Input
                          id="prompt"
                          name="prompt"
                          type="text"
                          placeholder="E.g., 'Convert to anime style' or 'Make it look cinematic'"
                          value={form.prompt}
                          onChange={(e) => handleChange("prompt", e.target.value)}
                          required
                          className="border-violet-200 dark:border-violet-800/50 focus-visible:ring-violet-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1 text-violet-800 dark:text-violet-300">
                          Upload Video
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">Upload a video file (MP4, MOV, etc.) to transform</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <div className="border-2 border-dashed border-violet-200 dark:border-violet-800/30 rounded-lg p-6 bg-violet-50/50 dark:bg-violet-950/10 text-center">
                          <FileUploaderRegular
                            onFileUploadFailed={handleUploadFailed}
                            pubkey={pubKey}
                            onChange={handleChangeEvent}
                          />
                          {uploading && (
                            <div className="text-sm text-violet-600 dark:text-violet-400 mt-4 flex items-center justify-center gap-2">
                              <Upload className="h-4 w-4 animate-pulse" />
                              Uploading to Cloudinary...
                            </div>
                          )}
                          {cloudinaryUrl && (
                            <div className="text-sm text-green-600 dark:text-green-400 mt-4 break-all flex items-center justify-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-green-600 dark:text-green-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              Video uploaded successfully!
                            </div>
                          )}
                          {error && (
                            <div className="text-sm text-red-600 dark:text-red-400 mt-4 flex items-center justify-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-red-600 dark:text-red-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                              {error}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setActiveTab("settings")}
                          disabled={!cloudinaryUrl}
                          className="border-violet-200 dark:border-violet-800/50 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300"
                        >
                          Next: Settings
                          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10 border-b border-violet-100 dark:border-violet-800/20">
                    <CardTitle className="flex items-center gap-2 text-violet-800 dark:text-violet-300">
                      <Settings className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      Transformation Settings
                    </CardTitle>
                    <CardDescription>Customize how your video will be transformed</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="aspect_ratio"
                            className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                          >
                            Aspect Ratio
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>The width-to-height ratio of the output video</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Select
                            value={form.aspect_ratio}
                            onValueChange={(value) => handleChange("aspect_ratio", value)}
                          >
                            <SelectTrigger className="border-violet-200 dark:border-violet-800/50 focus-visible:ring-violet-500">
                              <SelectValue placeholder="Select aspect ratio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                              <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="resolution"
                            className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                          >
                            Resolution
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>The quality of the output video</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Select value={form.resolution} onValueChange={(value) => handleChange("resolution", value)}>
                            <SelectTrigger className="border-violet-200 dark:border-violet-800/50 focus-visible:ring-violet-500">
                              <SelectValue placeholder="Select resolution" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="480p">480p (SD)</SelectItem>
                              <SelectItem value="580p">580p (Medium)</SelectItem>
                              <SelectItem value="720p">720p (HD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="num_frames"
                            className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                          >
                            Number of Frames
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>The number of frames to process in the video</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Select
                            value={form.num_frames.toString()}
                            onValueChange={(value) => handleChange("num_frames", Number.parseInt(value))}
                          >
                            <SelectTrigger className="border-violet-200 dark:border-violet-800/50 focus-visible:ring-violet-500">
                              <SelectValue placeholder="Select number of frames" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="85">85 (Faster)</SelectItem>
                              <SelectItem value="129">129 (Better quality)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="seed"
                            className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                          >
                            Seed (Optional)
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Set a specific seed for reproducible results</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="seed"
                            name="seed"
                            type="number"
                            placeholder="Enter seed for reproducibility"
                            value={form.seed}
                            onChange={(e) => handleChange("seed", e.target.value)}
                            className="border-violet-200 dark:border-violet-800/50 focus-visible:ring-violet-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1 text-violet-800 dark:text-violet-300">
                          Transformation Strength: {form.strength.toFixed(2)}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>How strongly to apply the transformation (0-1)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Slider
                          value={[form.strength]}
                          onValueChange={([value]) => handleChange("strength", value)}
                          min={0}
                          max={1}
                          step={0.01}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Subtle</span>
                          <span>Strong</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-violet-50 dark:bg-violet-950/10 border border-violet-100 dark:border-violet-900/20">
                          <Checkbox
                            id="pro_mode"
                            checked={form.pro_mode}
                            onCheckedChange={(checked) => handleChange("pro_mode", checked)}
                            className="border-violet-300 dark:border-violet-700 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                          />
                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="pro_mode"
                              className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                            >
                              Pro Mode
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Uses more inference steps for higher quality but slower processing</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            <p className="text-xs text-muted-foreground">55 steps, higher quality output</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-violet-50 dark:bg-violet-950/10 border border-violet-100 dark:border-violet-900/20">
                          <Checkbox
                            id="enable_safety_checker"
                            checked={form.enable_safety_checker}
                            onCheckedChange={(checked) => handleChange("enable_safety_checker", checked)}
                            className="border-violet-300 dark:border-violet-700 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                          />
                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="enable_safety_checker"
                              className="flex items-center gap-1 text-violet-800 dark:text-violet-300"
                            >
                              Safety Checker
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Filters inappropriate content from generated videos</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            <p className="text-xs text-muted-foreground">Filter inappropriate content</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("upload")}
                          className="border-violet-200 dark:border-violet-800/50 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                          disabled={isGenerating || !cloudinaryUrl}
                        >
                          {isGenerating ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Generating Video...
                            </>
                          ) : (
                            <>
                              Generate Video
                              <Zap className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="result" className="mt-0">
                <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10 border-b border-violet-100 dark:border-violet-800/20">
                    <CardTitle className="flex items-center gap-2 text-violet-800 dark:text-violet-300">
                      <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      Transformation Result
                    </CardTitle>
                    <CardDescription>Your transformed video will appear here</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {generatedVideoUrl ? (
                      <div className="space-y-6">
                        <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-violet-200 dark:border-violet-800/50 shadow-lg">
                          <video controls className="w-full h-full" src={generatedVideoUrl} />
                        </div>
                        <div className="bg-violet-50/80 dark:bg-violet-950/10 p-4 rounded-lg border border-violet-100 dark:border-violet-900/20">
                          <h4 className="text-sm font-medium mb-2 text-violet-800 dark:text-violet-300 flex items-center gap-1">
                            <FileVideo className="h-4 w-4" />
                            Video URL:
                          </h4>
                          <div className="text-xs break-all text-muted-foreground bg-white/80 dark:bg-background/80 p-2 rounded border border-violet-100 dark:border-violet-900/20">
                            {generatedVideoUrl}
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-violet-200 dark:border-violet-800/50 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300"
                          >
                            <a href={generatedVideoUrl} download>
                              <ArrowLeft className="h-4 w-4 mr-2 rotate-180" />
                              Download Video
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-violet-200 dark:border-violet-800/50 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300"
                          >
                            <a href={generatedVideoUrl} target="_blank" rel="noopener noreferrer">
                              Open in New Tab
                              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ) : isGenerating ? (
                      <div className="text-center py-16 px-4">
                        <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
                          <Sparkles className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-violet-800 dark:text-violet-300">
                          Generating Your Video
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Please wait while our AI transforms your video. This may take a few minutes depending on the
                          complexity.
                        </p>
                        <div className="mt-6 flex justify-center">
                          <div className="w-16 h-1.5 bg-violet-200 dark:bg-violet-800/50 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-600 dark:bg-violet-400 animate-progress"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16 px-4">
                        <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-6">
                          <Wand2 className="h-10 w-10 text-violet-600/50 dark:text-violet-400/50" />
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-violet-800 dark:text-violet-300">
                          No Video Generated Yet
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Upload a video and set your transformation parameters, then click "Generate Video" to see the
                          result here.
                        </p>
                        <div className="mt-6">
                          <Button
                            onClick={() => setActiveTab("upload")}
                            className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                          >
                            Start Transformation
                            <Wand2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {error && !isGenerating && (
                      <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg text-red-800 dark:text-red-400 text-sm">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg
                              className="h-5 w-5 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium">Error</h3>
                            <p className="mt-1">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-violet-50/50 dark:bg-violet-950/5 border-t border-violet-100 dark:border-violet-900/20 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab("settings")}
                      className="text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Settings
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                    >
                      <Link href="/history">
                        View History
                        <HistoryIcon className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
