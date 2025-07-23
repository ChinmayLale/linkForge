"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { toggleProgressBar } from "@/store/slices/miscSlice"
import { RootState } from "@/store/store"

function Progress({
  className,
  // value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {

  const [value, setValue] = React.useState(0)
  // const show = useSelector((state: RootState) => state.misc.showProgressBar);
  // console.log({show})
  const dispatch = useDispatch()
  React.useEffect(() => {
    // setShow(true)
    setValue(0)

    const interval = setInterval(() => {
      setValue((prev) => {
        const randomIncrement = Math.floor(Math.random() * 20) + 10 // 10 to 99

        if (prev >= 100) {
          clearInterval(interval)
          // setTimeout(() => setShow(false), 1000)
          dispatch(toggleProgressBar())
          return 110
        }

        const nextValue = prev + randomIncrement
        return nextValue >= 100 ? 0 : nextValue
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
