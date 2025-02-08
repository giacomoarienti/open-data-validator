"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ClassificationModal from "@/components/ClassificationModal"
import { validateImage, getRandomImage, ImageData } from "./actions"

export default function Home() {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadNewImage()
  }, [])

  const loadNewImage = async () => {
    setIsLoading(true)
    const result = await getRandomImage()
    setImageData(result);
    setIsLoading(false);
  }

  const handleValidation = async (isCorrect: boolean) => {
    if(!imageData) return

    if (isCorrect) {
      await validateImage(imageData.imagePath, imageData.label)
      await loadNewImage()
    } else {
      setIsModalOpen(true)
    }
  }

  const handleCorrectClassification = async (correctLabel: string) => {
    if(!imageData) return

    await validateImage(imageData.imagePath, correctLabel)
    setIsModalOpen(false)
    await loadNewImage()
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!imageData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p className="text-xl font-semibold mb-4 text-center">All done! Please provide more data.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Open Data Validator</h1>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="aspect-square relative mb-4">
            <Image src={imageData.imageSrc} alt="Image to validate" layout="fill" objectFit="contain" />
          </div>
          <p className="text-xl mb-4 text-center">
            Current classification:
            <span className="font-semibold block">{imageData.label}</span>
            </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => handleValidation(true)} className="bg-green-500 hover:bg-green-600">
              Yes
            </Button>
            <Button size="lg" onClick={() => handleValidation(false)} className="bg-red-500 hover:bg-red-600">
              No
            </Button>
          </div>
        </CardContent>
      </Card>
      <ClassificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClassify={handleCorrectClassification}
      />
    </div>
  )
}

