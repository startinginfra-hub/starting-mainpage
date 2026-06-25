"use client"

import { useState } from "react"
import { PrivacyPolicyContent } from "@/app/components/legal/privacy-policy-content"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type PrivacyPolicyDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(90vh,800px)] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
        aria-describedby="privacy-policy-description"
      >
        <DialogHeader className="shrink-0 border-b border-neutral-200 px-6 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-neutral-900">개인정보처리방침</DialogTitle>
          <DialogDescription id="privacy-policy-description" className="sr-only">
            스타팅파트너스 주식회사 개인정보처리방침 전문
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <PrivacyPolicyContent />
        </div>
      </DialogContent>
    </Dialog>
  )
}

type PrivacyPolicyDialogLinkProps = {
  className?: string
  children?: React.ReactNode
}

export function PrivacyPolicyDialogLink({
  className,
  children = "개인정보처리방침",
}: PrivacyPolicyDialogLinkProps) {
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
      <PrivacyPolicyDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
