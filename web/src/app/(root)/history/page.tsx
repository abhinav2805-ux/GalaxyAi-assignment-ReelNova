"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wand2, History as HistoryIcon, Calendar, Clock, FileVideo, Settings, ExternalLink, Sparkles, Download } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [recent, setRecent] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentLoading, setRecentLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch history:", error)
        setLoading(false)
      })
  }, [])

  // Fetch recent only when the tab is selected
  useEffect(() => {
    if (activeTab === "recent") {
      setRecentLoading(true)
      fetch("/api/history/recent")
        .then((res) => res.json())
        .then((data) => {
          setRecent(data.history || null)
          setRecentLoading(false)
        })
        .catch((error) => {
          setRecent(null)
          setRecentLoading(false)
        })
    }
  }, [activeTab])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-background dark:from-violet-950/10 dark:to-background">
      <div className="container max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Transformation History
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-purple-500 dark:from-violet-400 dark:to-purple-300 mb-4">
            Your Video Transformations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View and manage all your previous video transformations
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>

            {/* All Tab */}
            <TabsContent value="all" className="mt-0">
              {loading ? (
                <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
                      <CardHeader>
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Skeleton className="h-48 w-full rounded-md" />
                          <Skeleton className="h-48 w-full rounded-md" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : history.length === 0 ? (
                <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-6">
                    <HistoryIcon className="h-10 w-10 text-violet-600/50 dark:text-violet-400/50" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-violet-800 dark:text-violet-300">
                    No Transformation History
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven&apos;t transformed any videos yet. Start by creating your first video transformation.
                  </p>
                  <Button
                    asChild
                    className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                  >
                    <Link href="/transform">
                      <Wand2 className="h-4 w-4" />
                      Create Your First Transformation
                    </Link>
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  {history.map((item) => (
                    <TransformationCard key={item._id} item={item} formatDate={formatDate} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Recent Tab */}
            <TabsContent value="recent" className="mt-0">
              {recentLoading ? (
                <div className="space-y-8">
                  <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
                    <CardHeader>
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Skeleton className="h-48 w-full rounded-md" />
                        <Skeleton className="h-48 w-full rounded-md" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : !recent ? (
                <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-6">
                    <HistoryIcon className="h-10 w-10 text-violet-600/50 dark:text-violet-400/50" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-violet-800 dark:text-violet-300">
                    No Recent Transformations
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven&apos;t transformed any videos recently.
                  </p>
                  <Button
                    asChild
                    className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                  >
                    <Link href="/transform">
                      <Wand2 className="h-4 w-4" />
                      Create New Transformation
                    </Link>
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  <TransformationCard item={recent} formatDate={formatDate} />
                </div>
              )}
            </TabsContent>

            {/* Favorites Tab (unchanged) */}
            <TabsContent value="favorites" className="mt-0">
              <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="h-10 w-10 text-violet-600/50 dark:text-violet-400/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 text-violet-800 dark:text-violet-300">
                  No Favorite Transformations
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You haven&apos;t marked any transformations as favorites yet.
                </p>
                <Button
                  asChild
                  className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0"
                >
                  <Link href="/transform">
                    <Wand2 className="h-4 w-4" />
                    Create New Transformation
                  </Link>
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Card component for displaying a transformation
function TransformationCard({ item, formatDate }: { item: any, formatDate: (date: string) => string }) {
  // Prepare readable parameter labels
  const paramLabels: Record<string, string> = {
    prompt: "Prompt",
    resolution: "Resolution",
    aspect_ratio: "Aspect Ratio",
    num_inference_steps: "Inference Steps",
    num_frames: "Frames",
    strength: "Strength",
    seed: "Seed",
    pro_mode: "Pro Mode",
    enable_safety_checker: "Safety Checker",
  }

  // Only show known parameters in a nice table
  const paramEntries = Object.entries(item.parameters || {}).filter(([key]) =>
    Object.keys(paramLabels).includes(key)
  )

  return (
    <Card className="border border-violet-200/50 dark:border-violet-800/20 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10 border-b border-violet-100 dark:border-violet-800/20">
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl font-semibold line-clamp-1 text-violet-800 dark:text-violet-300">
            {item.parameters.prompt || "Untitled Transformation"}
          </span>
          <Badge
            variant="outline"
            className="ml-2 flex-shrink-0 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50"
          >
            {item.parameters.resolution}
          </Badge>
        </CardTitle>
        <CardDescription className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
            {formatDate(item.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
            {item.parameters.num_inference_steps} steps
          </span>
          <span className="flex items-center gap-1">
            <FileVideo className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
            {item.parameters.aspect_ratio}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-1 text-violet-800 dark:text-violet-300">
              <FileVideo className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
              Original Video
            </h4>
            <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-violet-200/70 dark:border-violet-800/30 shadow-md">
              <video controls className="w-full h-full" src={item.sourceVideoUrl} />
              <a
                href={item.sourceVideoUrl}
                download
                className="absolute bottom-2 left-2 text-white bg-violet-600/90 hover:bg-violet-700/90 px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-colors"
              >
                <Download className="h-3 w-3" />
                Download
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-1 text-violet-800 dark:text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
              Transformed Video
            </h4>
            <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-violet-400/70 dark:border-violet-600/30 shadow-md">
              <video controls className="w-full h-full" src={item.generatedVideoUrl} />
              <a
                href={item.generatedVideoUrl}
                download
                className="absolute bottom-2 left-2 text-white bg-violet-600/90 hover:bg-violet-700/90 px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-colors"
              >
                <Download className="h-3 w-3" />
                Download
              </a>
            </div>
          </div>
        </div>
        {/* Parameters Table */}
        <div className="mt-6">
          <h5 className="text-md font-semibold mb-2 text-violet-800 dark:text-violet-300 flex items-center gap-2">
            <Settings className="h-4 w-4 text-violet-500 dark:text-violet-400" />
            Transformation Details
          </h5>
          <div className="overflow-x-auto rounded-lg border border-violet-100 dark:border-violet-900/20 bg-violet-50/80 dark:bg-violet-950/10">
            <Table>
              <TableBody>
                {paramEntries.map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium text-violet-700 dark:text-violet-300 w-1/3">
                      {paramLabels[key] || key}
                    </TableCell>
                   <TableCell className="text-violet-900 dark:text-violet-100">
  {typeof value === "boolean"
    ? value
      ? "Yes"
      : "No"
    : value === ""
    ? <span className="italic text-muted-foreground">N/A</span>
    : String(value)}
</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-violet-100 dark:border-violet-900/20 bg-violet-50/50 dark:bg-violet-950/5 py-3">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30"
        >
          <a
            href={item.sourceVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Source
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30"
        >
          <a
            href={item.generatedVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Result
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
