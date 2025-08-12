import ecommerceSite from "../../../assets/ecommerceCard.png"
import html from "../../../assets/htmlIcon.png"
import tailwind from "../../../assets/tailwindcssLogo.png"
import react from "../../../assets/reactIcon.png"

export default function EcommerceSite() {
    return (
        <div>
            <div className="w-full max-w-[280px] box-border h-[500px] rounded-2xl mx-auto bg-white text-black shadow-md overflow-hidden">
                <div className="w-full h-[40%] overflow-hidden rounded-t-lg bg-transparent">
                    <img src={ecommerceSite} alt="" className='w-full h-full block relative' />
                </div>
                <div className="mx-3">
                    <h1 className='font-bold text-2xl py-3'>Ecommerce Website</h1>
                    <p className='text-sm'>Built a responsive eCommerce frontend with React.js and Tailwind CSS; collaborated with backend team for API integration. Project functional locally but not pushed to GitHub due to sync issues.</p>
                    <span className='flex justify-center items-center gap-1 py-3'>
                        <span><img src={html} alt="" className="w-5" /></span>
                        <span><img src={tailwind} alt="" className="w-9" /></span>
                        <span><img src={react} alt="" className="w-5 pb-[3px]" /></span>
                        <span>- React</span>
                    </span>
                    <div className="flex gap-3 justify-center">
                        <a href="https://irfan-alyy.github.io/Ecommerce-Store/" className="px-4 leading-10 text-white rounded-lg bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-150"><span className="">Live Demo</span></a>
                        <a href="https://github.com/MuhammadWaqar7615" className='px-10 leading-10 text-black rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400 transition-all duration-150'>GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
