interface ThemeColor {
  name: string;
  code: string;
}

interface ThemeColorBarProps {
  colors: ThemeColor[];
  onSelected: () => void; // Function to trigger when selecting the component
  selected: boolean; // Boolean to control selection state
  name: string;
}

const ThemeColorBar: React.FC<ThemeColorBarProps> = ({ colors, onSelected, selected, name }) => {
  return (
    <div className="">
      <p className="text-center text-sm italic">{name}</p>
      <div
        className={`m-2 relative flex items-center mx-8 h-12 rounded-lg border-2 border-black 
        overflow-hidden transition-all cursor-pointer
        ${selected ? "shadow-none" : "shadow-[2px_2px_0px_rgba(0,0,0,1)]"}`}
        onClick={onSelected}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 h-full transition-all hover:opacity-80"
            style={{ backgroundColor: color.code }}
          />
        ))}
      </div>

    </div>
  );
};

export default ThemeColorBar;