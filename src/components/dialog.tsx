import { useEffect, useRef, type ReactNode } from 'react'

// Native <dialog>. If this component is mounted, the URL says it should be open,
// so there is no open state. Escape fires the close event for free.
export function Dialog({
  onClose,
  children,
}: {
  onClose: () => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      className="m-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-fg shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </dialog>
  )
}
