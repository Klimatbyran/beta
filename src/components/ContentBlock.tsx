import { cn } from '@/lib/utils'
import { Text } from '@/components/ui/text'

interface ContentBlockProps {
  title: string
  content: string
  className?: string
}

export function ContentBlock({ title, content, className }: ContentBlockProps) {
  return (
    <div className={cn('bg-black-2 rounded-[48px] p-16', className)}>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[#E2FF8D]" />
          <Text as="h2" variant="h6" className="text-grey">
            {title}
          </Text>
        </div>

        <Text
          variant="display"
          className="max-w-[90%] leading-[1.1] tracking-[-0.02em]"
        >
          {content}
        </Text>
      </div>
    </div>
  )
}
