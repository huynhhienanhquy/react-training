type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function SearchBar({
  search,
  onSearchChange,
}: SearchBarProps) {
  return (
    <input
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search product..."
    />
  );
}
