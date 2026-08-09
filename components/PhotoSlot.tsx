/**
 * Empty image placeholder.
 *
 * The original pages used <image-slot> elements backed by an editor state file
 * (.image-slots.state.json) that was never published — it 404s on the live
 * site, so these render as empty boxes today. This reproduces that, and marks
 * the spots where a real photo still needs choosing.
 */
export function PhotoSlot({ label = 'Photo', className = '' }: { label?: string; className?: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-stone text-[13px] tracking-[0.08em] text-muted/70 uppercase ${className}`}
    >
      {label}
    </div>
  );
}
