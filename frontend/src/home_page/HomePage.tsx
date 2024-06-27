import Logo from "../Logo";
import Button from "./Button";

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center w-screen h-screen bg-gray-700">
            <div className="fixed insert-x-0 top-0 bg-gray-800">
                <header className="text-gray-100 border-b-2 border-gray-600 text-center w-screen px-4 py-2">
                    Welcome to OrchIDEe
                </header>
            </div>
            <div className="flex flex-col justify-center m-auto drop-shadow-lg rounded-xl border-2 border-gray-600 bg-gray-800 h-1/2 w-1/4">
                <Logo />
                <div className="flex justify-around">
                    <Button label="new" />
                    <Button label="open" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
