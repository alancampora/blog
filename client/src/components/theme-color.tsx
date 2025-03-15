interface ThemeColor {
  code: string;
  name: string;
}

interface ThemeColorBarProps {
  colors: ThemeColor[];
  onSelected: () => void;
  selected: boolean;
  name: string;
}

const ThemeColor: React.FC<ThemeColorBarProps> = ({ colors, onSelected, selected, name }) => {
  return (
    <div
      className={`
          flex flex-col items-center justify-center 
          p-4 
          rounded-lg 
          border-2 
          border-solid
          border-black
          cursor-pointer 
          transition-all 
        ${selected ? "bg-bs border-black-500 shadow-md" : "border-black-900"}
      `}
      onClick={onSelected}
    >
      {/* Color Circles */}
      <div className="flex items-center relative">
        {colors.map((color, index) => (
          <div key={index} className="relative group">
            <div
              className="w-10 h-10 border-2 border-neutral-900 rounded-full transition-transform duration-200 ease-in-out hover:scale-110"
              style={{
                backgroundColor: color.code,
                marginLeft: index === 0 ? "0px" : "-10px",
              }}
            ></div>
            {/* Tooltip */}
            <span className="absolute left-1/2 -top-8 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
              {color.name}
            </span>
          </div>
        ))}
      </div>

      {/* Theme Name */}
      <p className="mt-2 text-sm font-semibold">{name}</p>
    </div>
  );
};

export default ThemeColor;