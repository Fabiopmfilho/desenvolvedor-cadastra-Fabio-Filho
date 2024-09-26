import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);

  document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.querySelector('.btn_filter') as HTMLButtonElement;
    const sortButton = document.querySelector('.btn_sort') as HTMLButtonElement;
    const filterMenu = document.querySelector('.filter_menu') as HTMLDivElement;
    const sortMenu = document.querySelector('.sort_menu') as HTMLDivElement;
    const closeButtons = document.querySelectorAll('.close-menu') as NodeListOf<HTMLButtonElement>;
  
    filterButton?.addEventListener('click', () => {
      filterMenu?.classList.add('active');
      console.log("Filter")
    });
    
    sortButton?.addEventListener('click', () => {
      sortMenu?.classList.add('active');
      console.log("Sort")
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterMenu?.classList.remove('active');
        sortMenu?.classList.remove('active');
      });
    });
  });
  
}

document.addEventListener("DOMContentLoaded", main);
