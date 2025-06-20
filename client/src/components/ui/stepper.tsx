"use client"

import React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepperProps {
  steps: string[]
  activeStep: number
  className?: string
  orientation?: "horizontal" | "vertical"
  alternativeLabel?: boolean
}

export function Stepper({
  steps,
  activeStep,
  className,
  orientation = "horizontal",
  alternativeLabel = false,
}: StepperProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Horizontal connectors for alternativeLabel mode */}
      {orientation === "horizontal" && alternativeLabel && (
        <div 
          className="absolute flex w-full" 
          style={{ top: "calc(1.5rem + 1.75rem)" }} // Position at the center of the circles
        >
          {/* Generate n-1 connectors between n steps */}
          {steps.slice(0, -1).map((_, index) => {
            const stepWidth = `calc(100% / ${steps.length})`;
            const isCompleted = index < activeStep;
            
            return (
              <div 
                key={`connector-${index}`}
                className={cn(
                  "h-px",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
                style={{ 
                  width: stepWidth,
                  marginLeft: `calc(${stepWidth} / 2)`,
                  marginRight: `calc(${stepWidth} / 2)`,
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Steps */}
      <div 
        className={cn(
          "relative flex",
          orientation === "vertical" && "flex-col space-y-6",
          orientation === "horizontal" && !alternativeLabel && "items-center",
          orientation === "horizontal" && alternativeLabel && "justify-between"
        )}
      >
        {steps.map((step, index) => {
          const isActive = activeStep === index
          const isCompleted = activeStep > index
          
          return (
            <React.Fragment key={step}>
              {/* Horizontal connectors when not in alternativeLabel mode */}
              {index > 0 && orientation === "horizontal" && !alternativeLabel && (
                <div 
                  className={cn(
                    "h-px flex-1 mx-2", 
                    activeStep > index - 1 ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
              
              {/* Step item */}
              <div 
                className={cn(
                  "flex",
                  orientation === "horizontal" && alternativeLabel && "flex-col items-center",
                  orientation === "horizontal" && !alternativeLabel && "flex-shrink-0", 
                  orientation === "vertical" && "items-start gap-4"
                )}
              >
                {/* Step label - now placed above in alternativeLabel mode */}
                {alternativeLabel && orientation === "horizontal" ? (
                  <>
                    <div 
                      className={cn(
                        "text-sm font-medium mb-2 text-center",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {step}
                    </div>
                    
                    {/* Step circle */}
                    <div 
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2",
                        isActive && !isCompleted && "border-primary text-primary",
                        isCompleted && "border-primary bg-primary text-primary-foreground",
                        !isActive && !isCompleted && "border-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step circle */}
                    <div 
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2",
                        isActive && !isCompleted && "border-primary text-primary",
                        isCompleted && "border-primary bg-primary text-primary-foreground",
                        !isActive && !isCompleted && "border-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Step label for non-alternativeLabel mode */}
                    <div 
                      className={cn(
                        "text-sm font-medium ml-3",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {step}
                    </div>
                  </>
                )}
                
                {/* Vertical connector */}
                {orientation === "vertical" && index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-4 ml-0 h-6 w-px", 
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                    style={{ top: `calc(${index + 1} * (2rem + 1.5rem) - 0.5rem)` }}
                  />
                )}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export interface StepProps {
  label: string
  optional?: boolean
  completed?: boolean
  error?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

export function Step({
  label,
  optional,
  completed,
  error,
  icon,
  children,
}: StepProps) {
  return (
    <div className="step">
      {children}
    </div>
  )
}

export interface StepLabelProps {
  children: React.ReactNode
  optional?: React.ReactNode
  error?: boolean
  completed?: boolean
  icon?: React.ReactNode
}

export function StepLabel({
  children,
  optional,
  error,
  completed,
  icon,
}: StepLabelProps) {
  return (
    <div className="step-label">
      {icon || (
        <div
          className={cn(
            "step-icon",
            error && "step-icon-error",
            completed && "step-icon-completed"
          )}
        />
      )}
      <div className="step-label-container">
        <span className="step-label-text">{children}</span>
        {optional && <span className="step-label-optional">{optional}</span>}
      </div>
    </div>
  )
}

export interface StepContentProps {
  children: React.ReactNode
  active?: boolean
  transition?: boolean
  className?: string
}

export function StepContent({
  children,
  active,
  transition = true,
  className,
}: StepContentProps) {
  return (
    <div
      className={cn(
        "step-content",
        !active && "step-content-hidden",
        transition && "step-content-transition",
        className
      )}
    >
      {children}
    </div>
  )
}
