export interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="w-1/4 h-6/7 bg-skin-bg-medium text-skin-text-primary ring-2 ring-gray-600 drop-shadow-lg rounded-full hover:bg-skin-bg-light hover:border-transparent focus:ring-gray-500">
      {label}
    </button>
  );
};

export default Button;
