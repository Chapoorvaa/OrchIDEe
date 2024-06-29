interface HeaderProps {
  homepage: boolean;
}

const Header: React.FC<HeaderProps> = ({ homepage }) => {
  return (
    <div className="fixed insert-x-0 top-0 bg-skin-bg-dark">
      <header className="text-skin-text-primary border-b-2 border-skin-stroke-light text-center w-screen px-4 py-2">
        {homepage ? "Welcome to OrchIDEe" : "Create a project"}
      </header>
    </div>
  );
};

export default Header;
