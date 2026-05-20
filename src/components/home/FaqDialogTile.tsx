import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface FaqDialogTileProps {
  eyebrow: string;
  question: string;
  answer: ReactNode;
  tone?: "surface" | "gray";
}

/**
 * FAQ tile that visually matches a `text` Tile (size=third, mobile cell) but
 * opens a Dialog with the full answer on tap. Lives inside a TileScreen slot
 * and fills its cell.
 */
export function FaqDialogTile({ eyebrow, question, answer, tone = "surface" }: FaqDialogTileProps) {
  const toneCls =
    tone === "gray"
      ? "bg-brandmark-gray ring-1 ring-zinc-600/30 text-white"
      : "bg-surface text-surface-foreground";
  const eyebrowCls = tone === "gray" ? "eyebrow text-white" : "eyebrow text-brand";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Open answer: ${question}`}
          className={`group relative h-full w-full overflow-hidden rounded-md p-4 md:p-5 text-left flex flex-col ${toneCls} hover:opacity-95 transition-opacity cursor-pointer`}
        >
          <p className={`${eyebrowCls} mb-2`}>{eyebrow}</p>
          <p className="display-5 leading-snug pr-7">{question}</p>
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 inline-grid place-items-center size-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"
          >
            <Plus className="size-4" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-xl p-6 sm:p-8 bg-zinc-950 border-zinc-800 text-zinc-100 sm:rounded-md">
        <p className="eyebrow text-brand mb-2">{eyebrow}</p>
        <DialogTitle className="display-4 leading-tight text-white">{question}</DialogTitle>
        <DialogDescription className="body text-zinc-300 mt-4">{answer}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}