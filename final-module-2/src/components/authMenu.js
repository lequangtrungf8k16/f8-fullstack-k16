const authMenu = () => {
    return `
    <ul class="js-authMenu hidden absolute right-0 w-xs py-2 bg-gray-700 text-white rounded-lg overflow-hidden">
        <li>
            <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                <i class="fa-brands fa-youtube"></i>
                <span>Get Music Premium</span>
            </a>
        </li>
        <li>
            <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Terms & privacy policy</span>
            </a>
        </li>
        <li>
            <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                <i class="fa-regular fa-circle-question"></i>
                <span>Help</span>
            </a>
        </li>
        <li>
            <a class="flex gap-4 items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-500 transition-colors">
                <span>
                <i class="fa-regular fa-message"></i>
                Send feedback
                </span>
            </a>
        </li>
    </ul>
    `;
};

export default authMenu;
