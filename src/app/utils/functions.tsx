export const capitalize = (item:string) => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
}

export const sideMenu = (menu:string) => {
  const aside = document.getElementById(`aside-${menu}`);
  if (aside) {
    if (menu === "Menu") {
      aside.classList.toggle("-left-full");
      aside.classList.toggle("left-0");
    } else {
      aside.classList.toggle("-right-full");
      aside.classList.toggle("right-0");
    }
  }
}