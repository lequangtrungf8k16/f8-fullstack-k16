import searchBar from "./searchBar";
import authAction from "./authAction";

const header = () => {
    return `
        <header class="sticky top-0 z-50 flex justify-between items-center border-r border-gray-600 px-20 py-4 ">            
          
            <!-- Thanh tìm kiếm -->
            ${searchBar()}

            <!-- >Người dùng -->
            ${authAction()}            
        </header>
    `;
};

export default header;
