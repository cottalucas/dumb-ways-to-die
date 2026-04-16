interface QuickRepliesProps {
  options: string[]
  onSelect: (option: string) => void
  disabled?: boolean
}

export function QuickReplies({ options, onSelect, disabled }: QuickRepliesProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar px-4">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="flex-shrink-0 h-11 px-4 rounded-full border-2 border-teal text-teal text-sm font-semibold bg-white hover:bg-teal-light transition-colors disabled:opacity-40 whitespace-nowrap"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
