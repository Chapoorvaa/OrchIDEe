interface HeaderProps {
  homepage: boolean;
}

const Header: React.FC<HeaderProps> = ({ homepage }) => {
    return (
        <div className="fixed insert-x-0 top-0 bg-gray-800">
            <header className="text-gray-100 border-b-2 border-gray-600 text-center w-screen px-4 py-2">
                {homepage ? "Welcome to OrchIDEe" : "Create a project"}
            </header>
        </div>
    );
}

export default Header;
