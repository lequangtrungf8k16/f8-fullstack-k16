import authMenu from "./authMenu";

const authAction = () => {
    return `
    <div class="flex items-center gap-4">
                <button class="text-white text-2xl cursor-pointer">
                    <i class="fa-brands fa-chromecast"></i>
                </button>

                <div class="relative">
                    <button class="js-authMenuBtn text-text-white rotate-90 cursor-pointer">
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                    ${authMenu()}
                </div>

                <button class="bg-white text-black text-sm rounded-full px-4 py-1.5 cursor-pointer">
                    Đăng nhập
                </button>
            </div>
    `;
};

export default authAction;
