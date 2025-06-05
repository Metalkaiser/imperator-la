import Closebtn from "./Closebtn";
import Cartcontent from "./Cartcontent";

export default function Sidemenu ({type}: {type:string}) {
  let content = <></>;
  const location = type === "Menu" ? "-left-full" : "-right-full";

  if (type === "Menu") {
    content = <></>;
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