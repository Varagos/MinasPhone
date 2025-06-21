"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// Create a context to share orientation value
type OrientationType = "horizontal" | "vertical"
const TabsOrientationContext = React.createContext<OrientationType>("horizontal");

interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  orientation?: "horizontal" | "vertical"
}

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsProps) {
  return (
    <TabsOrientationContext.Provider value={orientation}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsOrientationContext.Provider>
  )
}

interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  orientation?: "horizontal" | "vertical"
}

function TabsList({
  className,
  orientation: explicitOrientation,
  ...props
}: TabsListProps) {
  // Use orientation from context if not explicitly specified
  const contextOrientation = React.useContext(TabsOrientationContext);
  const orientation = explicitOrientation || contextOrientation;
  
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-orientation={orientation}
      className={cn(
        "bg-muted text-muted-foreground",
        orientation === "horizontal" ? 
          "inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]" : 
          "flex flex-col w-fit h-auto items-start justify-start rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  orientation?: "horizontal" | "vertical"
}

function TabsTrigger({
  className,
  orientation: explicitOrientation,
  ...props
}: TabsTriggerProps) {
  // Use orientation from context if not explicitly specified
  const contextOrientation = React.useContext(TabsOrientationContext);
  const orientation = explicitOrientation || contextOrientation;

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-orientation={orientation}
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground items-center gap-1.5 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        orientation === "horizontal" ?
          "inline-flex h-[calc(100%-1px)] flex-1 justify-center px-2 py-1" :
          "flex w-full justify-between px-3 py-2 text-left",
        className
      )}
      {...props}
    />
  )
}

interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
  orientation?: "horizontal" | "vertical"
}

function TabsContent({
  className,
  orientation: explicitOrientation,
  ...props
}: TabsContentProps) {
  // Use orientation from context if not explicitly specified
  const contextOrientation = React.useContext(TabsOrientationContext);
  const orientation = explicitOrientation || contextOrientation;

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      data-orientation={orientation}
      className={cn(
        "outline-none", 
        orientation === "horizontal" ? "flex-1" : "flex-1 ml-2",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
