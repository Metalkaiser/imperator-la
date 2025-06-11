import Closebtn from "./Closebtn";
import Cartcontent from "./Cartcontent";
import Catmenu from "./Catmenu";

type catsType = {
  catIndexes: number[];
  subCatIndexes?: number[][];
}

export default function Sidemenu ({type, cats}: {type:string, cats?: catsType}) {
  let content = <></>;
  const location = type === "Menu" ? "-left-full" : "-right-full";

  if (type === "Menu") {
    if (cats) {
      content = <Catmenu catIndexes={cats.catIndexes} subCatIndexes={cats.subCatIndexes} />;
    }
  } else {
    content = <Cartcontent />
  }
  
  return (
    <div id={`aside-${type}`} className={`flex flex-col fixed h-dvh w-screen md:w-[350px] absolute transform duration-200 top-0 ${location} p-5 aside border border-gray-300 dark:border-gray-700`}>
      <div className="w-full flex justify-end">
        <Closebtn type={type} />
      </div>
      {content}
    </div>
  )
}