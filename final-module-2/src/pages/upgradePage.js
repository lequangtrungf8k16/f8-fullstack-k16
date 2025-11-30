const upgradePage = () => {
    return `
    <div class="flex items-center justify-center bg-black text-white">
        <div class="w-full p-6 text-center rounded-lg overflow-hidden">
            <div class="flex justify-center">
                <img src="./src/assets/icon/logo-youtubeMusic.png">
            </div>
            <div class="py-12 px-6">                
                <h1 class="text-4xl md:text-4xl font-extrabold leading-tight mb-8 drop-shadow-lg">
                    Mua Music Premium để nghe nhạc không có quảng cáo, không cần mạng và cả khi tắt màn hình
                </h1>
                
                <p class="text-lg mb-8 text-gray-200">
                    65.000 đ/tháng • Không bao gồm thuế GTGT • Hủy bất cứ lúc nào
                </p>
                
                <button class="bg-white text-black font-bold py-3 px-8 rounded-full text-lg shadow-xl cursor-pointer hover:bg-gray-200 transition-colors transform hover:scale-105">
                    Mua Music Premium
                </button>
                
                <p class="mt-8 text-sm text-gray-300">
                    Hoặc tiết kiệm tiền bằng gói dành cho gia đình hoặc sinh viên
                </p>

                <div class="mt-4 text-xs text-gray-400">
                    <p>Thanh toán định kỳ</p>
                    <p class="mt-1">Có áp dụng quy định hạn chế</p>
                </div>

            </div>
        </div>
    </div>
    `;
};

export default upgradePage;
