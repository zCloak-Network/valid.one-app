import { useStore } from "@/hooks";
interface ItemProps {
  label: string;
  value: string;
}

function Item({ label, value }: ItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-white text-sm font-medium">{value}</span>
      <span className="text-zinc-300 text-sm font-medium">{label}</span>
    </div>
  );
}

export default function SocialData() {
  const { User } = useStore();

  // TODO fetch social data

  return (
    <div className="flex gap-4">
      <Item value="0" label="Followers" />
      <Item value="0" label="Following" />
      <Item value="0" label="Connected" />
    </div>
  );
}
