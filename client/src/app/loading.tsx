import { RouteLoading } from '@/components/layout/Layout'

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <RouteLoading />
    </div>
  )
}

