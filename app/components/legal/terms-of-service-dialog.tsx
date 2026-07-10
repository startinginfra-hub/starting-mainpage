"use client"

import { useState } from "react"
import { TermsOfServiceContent } from "@/app/components/legal/terms-of-service-content"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type TermsOfServiceDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsOfServiceDialog({ open, onOpenChange }: TermsOfServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(90vh,800px)] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
        aria-describedby="terms-of-service-description"
      >
        <DialogHeader className="shrink-0 border-b border-neutral-200 px-6 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-neutral-900">이용약관</DialogTitle>
          <DialogDescription id="terms-of-service-description" className="sr-only">
            스타팅파트너스 주식회사 AI 채용 서비스 이용약관 전문
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <TermsOfServiceContent />
        </div>
      </DialogContent>
    </Dialog>
  )
}

type TermsOfServiceDialogLinkProps = {
  className?: string
  children?: React.ReactNode
}

export function TermsOfServiceDialogLink({
  className,
  children = "이용약관",
}: TermsOfServiceDialogLinkProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={cn("cursor-pointer text-left transition-colors", className)}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <TermsOfServiceDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
