"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLabels } from "@/app/actions"

interface ClassificationModalProps {
  isOpen: boolean
  onClose: () => void
  onClassify: (label: string) => void
}

export default function ClassificationModal({ isOpen, onClose, onClassify }: ClassificationModalProps) {
  const [labels, setLabels] = useState<string[]>([])
  const [selectedLabel, setSelectedLabel] = useState<string>("")

  useEffect(() => {
    async function fetchLabels() {
      const fetchedLabels = await getLabels()
      setLabels(fetchedLabels)
    }
    fetchLabels()
  }, [])

  const handleClassify = () => {
    if (selectedLabel) {
      onClassify(selectedLabel)
      setSelectedLabel("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Correct Classification</DialogTitle>
        </DialogHeader>
        <Select value={selectedLabel} onValueChange={setSelectedLabel}>
          <SelectTrigger>
            <SelectValue placeholder="Select a label" />
          </SelectTrigger>
          <SelectContent>
            {labels.map((label) => (
              <SelectItem key={label} value={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleClassify} disabled={!selectedLabel}>
          Classify
        </Button>
      </DialogContent>
    </Dialog>
  )
}

