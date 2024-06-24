import CenterCube from "./CenterCube";
import Header from "./Header";
import OpenProject from "./open_project/OpenProject";
import { useState } from "react";

const HomePage: React.FC = () => {
    const [homepage, setHomepage] = useState(true);
    return (
        <div className="flex flex-col justify-center w-screen h-screen bg-gray-700">
            <Header homepage={homepage}/>
            {homepage && <CenterCube setHomepage={setHomepage}/>}
            {!homepage && <OpenProject setHomepage={setHomepage}/>}
        </div>
    );
}

export default HomePage;
