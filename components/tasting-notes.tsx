import { FLAVOUR_FAMILIES, type TastingNote } from '../content/coffee';

/** Tasting notes as chips with a coloured dot for each flavour family. */
export function TastingNotes({ notes, className = '' }: { notes: TastingNote[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Tasting notes">
      {notes.map(note => (
        <li key={note.note} className={`taste taste-${note.family}`} title={FLAVOUR_FAMILIES[note.family]}>{note.note}</li>
      ))}
    </ul>
  );
}
