import gmailClone from "../../../assets/gmailCard.png"
import html from "../../../assets/htmlIcon.png"
import css from "../../../assets/cssIcon.png"

export default function GmailClone() {
    return (
        // <div className="w-72 h-8/12 rounded-lg mx-3 bg-white text-black">
        <div className="w-full max-w-[280px] box-border h-[500px] rounded-2xl mx-auto bg-white text-black shadow-md overflow-hidden">
            <div className="w-full h-[40%] overflow-hidden rounded-t-lg bg-transparent"><img src={gmailClone} alt="" className='w-[100%] h-[100%] block relative ' /></div>
            <div className="mx-3">
                <h1 className='font-bold text-2xl py-3'>Gmail Clone</h1>
                <p className='text-sm'>Designed a static Gmail homepage clone using HTML and CSS, replicating the layout and styling of Gmail's landing page.</p>
                <span className='flex justify-center items-center gap-1 py-3'>
                    {/* <span><ImHtmlFive className='text-blue-700 text-2xl' /></span>
                    <span><FaCss3Alt className='text-blue-700 text-2xl' /></span> */}

                    <span><img src={html} alt="" className="w-5" /></span>
                    <span><img src={css} alt=""  className="w-5"/></span>
                    <span>- HTML</span>

                </span>
                <div className="flex gap-3 justify-center">
                    <a href="https://muhammadwaqar7615.github.io/Gmail_Clone/" className='px-4 leading-10 text-white rounded-lg bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-150'>Live Demo</a>
                    <a href="https://github.com/MuhammadWaqar7615/Gmail_Clone" className='px-10 leading-10 text-black rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400 transition-all duration-150'>GitHub</a>
                </div>
            </div>
        </div>
    )
}
