type FilterPanelProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

const categories = ["All", "Laptop", "Phone", "Accessory", "Monitor"];

export default function FilterPanel({
  category,
  onCategoryChange,
}: FilterPanelProps) {
  return (
    <div>
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => onCategoryChange(item)}
          style={{
            marginRight: 8,
            fontWeight: category === item ? "bold" : "normal",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
