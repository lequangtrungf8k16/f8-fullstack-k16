import searchBar from "./searchBar";
import authAction from "./authAction";

const header = () => {
    return `
        <header class="flex flex-auto items-center justify-between border-r border-gray-600 bg-black px-20 py-4 sticky top-0 z-50">            
          
            <!-- Thanh tìm kiếm -->
            ${searchBar()}

            <!-- >Người dùng -->
            ${authAction()}            
        </header>
    `;
};

export default header;
