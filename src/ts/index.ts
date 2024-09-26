const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);

  const filterButton = document.querySelector('.btn_filter') as HTMLButtonElement;
  const sortButton = document.querySelector('.btn_sort') as HTMLButtonElement;
  const filterMenu = document.querySelector('.menu_overlay.filter_menu') as HTMLDivElement;
  const sortMenu = document.querySelector('.menu_overlay.sort_menu') as HTMLDivElement;
  const closeButtons = document.querySelectorAll('.close_menu') as NodeListOf<HTMLButtonElement>;

  filterButton?.addEventListener('click', () => {
    filterMenu?.classList.add('active');
    console.log("Filter opened");
  });

  sortButton?.addEventListener('click', () => {
    sortMenu?.classList.add('active');
    console.log("Sort opened");
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterMenu?.classList.remove('active');
      sortMenu?.classList.remove('active');
      console.log("Menus closed");
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
