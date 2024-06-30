import CenterCube from "./CenterCube";
import Header from "./Header";
import OpenProject from "./open_project/OpenProject";
import { useState } from "react";

interface HomePageProps {
  setBasePage: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  path: string;
  language: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const HomePage: React.FC<HomePageProps> = ({
  setBasePage,
  projectName,
  path,
  language,
  setName,
  setPath,
  setLanguage,
}) => {
  const [homepage, setHomepage] = useState(true);
  return (
    <div className="flex flex-col justify-center w-screen h-screen bg-skin-bg-medium font-custom">
      <Header homepage={homepage} />
      {homepage && (
        <CenterCube
          setBasePage={setBasePage}
          setHomepage={setHomepage}
          setName={setName}
          setPath={setPath}
          setLanguage={setLanguage}
        />
      )}
      {!homepage && (
        <OpenProject
          setBasePage={setBasePage}
          projectName={projectName}
          path={path}
          language={language}
          setHomepage={setHomepage}
          setProjectName={setName}
          setPath={setPath}
          setLanguage={setLanguage}
        />
      )}
    </div>
  );
};

export default HomePage;
