
type Props = { title: string; rightSlot?: React.ReactNode };

export default function SectionHeader({ title, rightSlot }: Props) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="section-accent text-lg sm:text-xl font-semibold text-body">
        {title}
      </h2>
      {rightSlot}
    </div>
  );
}
