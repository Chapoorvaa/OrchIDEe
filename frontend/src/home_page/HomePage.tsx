import CenterCube from "./CenterCube";
import Header from "./Header";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
    const [homepage, setHomepage] = useState(true);
    return (
        <div className="flex flex-col justify-center w-screen h-screen bg-gray-700">
            <Header />
            {homepage && <CenterCube setHomepage={setHomepage}/>}
        </div>
    );
}

export default HomePage;
