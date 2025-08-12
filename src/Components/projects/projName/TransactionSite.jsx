import transactionalSite from "../../../assets/transactionCard.png"
import html from "../../../assets/htmlIcon.png"
import css from "../../../assets/cssIcon.png"
import js from "../../../assets/jsIcon.png"

export default function TransactionSite() {
    return (
        // <div className="w-72 h-8/12 rounded-lg mx-3 bg-white text-black">
        <div className="w-full max-w-[280px] box-border h-[500px] rounded-2xl mx-auto bg-white text-black shadow-md overflow-hidden">
            <div className="w-full h-[40%] overflow-hidden rounded-t-lg bg-transparent"><img src={transactionalSite} alt="" className='w-[100%] h-[100%] block relative ' /></div>
            <div className="mx-3">
                <h1 className='font-bold text-2xl py-3'>Transaction Website</h1>
                <p className='text-sm'>Developed a fully responsive and beautifully designed transaction web application that enables secure, real-time money transfers while incorporating modern features to enhance user experience and security.</p>
                <span className='flex justify-center items-center gap-1 py-3'>
                    {/* <span><ImHtmlFive className='text-blue-700 text-2xl' /></span>
                    <span><FaCss3Alt className='text-blue-700 text-2xl' /></span>
                    <span><DiJsBadge className='text-black bg-yellow-400 text-2xl rounded-sm' /></span> */}

                    <span><img src={html} alt="" className="w-5" /></span>
                    <span><img src={css} alt="" className="w-5" /></span>
                    <span><img src={js} alt=""  className="w-8 pb-[3px]"/></span>
                    <span>- Javascript</span>

                </span>
                <div className="flex gap-3 justify-center">
                    <a href="https://muhammadwaqar7615.github.io/Transaction_website/" className='px-4 leading-10 text-white rounded-lg bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-150'>Live Demo</a>
                    <a href="https://github.com/MuhammadWaqar7615/Transaction_website" className='px-10 leading-10 text-black rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400 transition-all duration-150'>GitHub</a>
                </div>
            </div>
        </div>
    )
}
