import { Link } from 'react-router-dom'; // تغییر: ایمپورت Link به جای useNavigate

const NotFound = () => {
    // هوک navigate حذف شد چون بهش نیازی نیست

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            {/* پنل اصلی کمیک */}
            <div className="comic-panel p-8 md:p-12 max-w-4xl w-full bg-white relative transform rotate-1 transition-transform duration-300 hover:rotate-0 mt-8">

                {/* افکت پس‌زمینه نقطه‌دار مانگایی */}
                <div className="absolute inset-0 manga-bg opacity-40 pointer-events-none"></div>

                {/* المان‌های تزئینی و افکت‌های صوتی کمیک */}
                <div className="absolute -top-8 -left-6 bg-yellow-400 text-black font-comic text-3xl md:text-4xl px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] transform -rotate-12 z-20">
                    NANI?!
                </div>
                <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white font-comic text-2xl md:text-3xl px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] transform rotate-12 z-20">
                    BUG!
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    
                    {/* تیتر ارور با استایل اغراق‌آمیز */}
                    <div className="relative mb-12">
                        <h1 className="text-8xl md:text-9xl font-comic text-white bg-black inline-block px-10 py-2 border-4 border-black shadow-[8px_8px_0_0_#ef4444] transform -rotate-2">
                            404
                        </h1>
                        <span className="absolute -bottom-5 -right-4 bg-white text-red-500 font-comic text-2xl border-3 border-black px-3 py-1 transform rotate-6 shadow-[4px_4px_0_0_#000]">
                            NOT FOUND
                        </span>
                    </div>

                    {/* باکس دیالوگ و تصویر */}
                    <div className="bg-gray-100 border-4 border-black p-6 md:p-8 w-full relative shadow-[8px_8px_0_0_#000] mb-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
                        
                        {/* لیبل دیالوگ باکس */}
                        <div className="absolute -top-6 right-6 md:right-8 bg-red-500 text-white font-comic px-6 py-2 text-xl md:text-2xl border-4 border-black shadow-[4px_4px_0_0_#000] transform rotate-2">
                            استاد هژیر می‌گوید:
                        </div>

                        {/* بخش تصویر با افکت‌های خفن */}
                        <div className="shrink-0 relative group mt-4 md:mt-0">
                            {/* یک مربع زرد پشت تصویر به عنوان افکت سه‌بعدی کمیک */}
                            <div className="absolute inset-0 bg-yellow-400 border-4 border-black transform translate-x-3 translate-y-3"></div>
                            
                            <img 
                                src="./404.png" 
                                alt="404 Error"
                                className="relative z-10 w-48 h-48 md:w-56 md:h-56 object-cover border-4 border-black grayscale group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-300 bg-white"
                            />
                        </div>

                        {/* متن دیالوگ */}
                        <p className="text-gray-900 font-bold leading-loose text-xl md:text-2xl text-justify relative z-10" dir="rtl">
                            «به نظر می‌رسد مسیرت را در این هزارتوی دیجیتال گم کرده‌ای، شینوبیِ جوان...
                            آنجا که تو ایستاده‌ای، خلأ مطلق است؛ جایی که هیچ کدی کامپایل نمی‌شود و داستان‌ها به پایان رسیده‌اند.
                            اما نترس... دستت را به من بده تا تو را به گرند لاین بازگردانم.»
                        </p>
                    </div>

                    {/* تغییر دکمه به کامپوننت Link */}
                    <Link
                        to="/"
                        className="text-2xl md:text-3xl font-comic bg-yellow-400 border-4 border-black px-8 py-5 shadow-[6px_6px_0_0_#000] hover:bg-yellow-300 active:translate-y-2 active:translate-x-2 active:shadow-none transition-all flex flex-col md:flex-row items-center gap-2 md:gap-4 cursor-pointer"
                    >
                        <span>بگیر دستمو استاد!</span>
                        <span className="text-lg md:text-xl border-t-2 md:border-t-0 md:border-r-2 border-black pt-2 md:pt-0 md:pr-4 opacity-80">
                            (بازگشت به خانه)
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;