import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = () => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-center"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-600" />,
        info: <InfoIcon className="size-5 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-600" />,
        error: <OctagonXIcon className="size-5 text-red-600" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          /* default */
          "--normal-bg": "hsl(0 0% 100%)",
          "--normal-text": "hsl(222.2 47.4% 11.2%)",
          "--normal-border": "hsl(214.3 31.8% 91.4%)",

          /* success */
          "--success-bg": "hsl(142.1 76.2% 95%)",
          "--success-text": "hsl(142.1 70.6% 25%)",
          "--success-border": "hsl(142.1 70.6% 45%)",

          /* error */
          "--error-bg": "hsl(0 85.7% 97.3%)",
          "--error-text": "hsl(0 74.2% 35.3%)",
          "--error-border": "hsl(0 74.2% 50%)",

          /* warning */
          "--warning-bg": "hsl(48 100% 96%)",
          "--warning-text": "hsl(30 84% 30%)",
          "--warning-border": "hsl(45 93% 47%)",

          /* info */
          "--info-bg": "hsl(210 100% 97%)",
          "--info-text": "hsl(217 91% 40%)",
          "--info-border": "hsl(217 91% 60%)",

          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
    />
  )
}

export { Toaster }
