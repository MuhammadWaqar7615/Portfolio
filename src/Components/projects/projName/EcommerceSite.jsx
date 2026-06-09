import ecommerceSite from "../../../assets/ecommerceCard.png";
import html from "../../../assets/htmlIcon.png";
import tailwind from "../../../assets/tailwindcssLogo.png";
import react from "../../../assets/reactIcon.png";

export default function EcommerceSite() {
  return (
    <div className="w-full max-w-[340px] mx-auto group transition-all duration-300 hover:-translate-y-1">
      <div className="relative rounded-2xl bg-[#111122] border border-white/10 overflow-hidden shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20 hover:shadow-xl flex flex-col">
        {/* Image with fixed 16:9 aspect ratio */}
        <div className="relative w-full pt-[56.25%] bg-gray-800 overflow-hidden">
          <img
            src={ecommerceSite}
            alt="Ecommerce Website"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-bold text-white mb-1 truncate">
            Ecommerce Website
          </h3>
          <p className="text-gray-300 text-xs mb-3 line-clamp-2">
            Built a responsive eCommerce frontend with React.js and Tailwind CSS; collaborated with backend team for API integration.
          </p>

          {/* Tech stack with icons + text */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <img src={html} alt="HTML5" className="w-5 h-5" />
              <span className="text-gray-300 text-xs">HTML5</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={tailwind} alt="Tailwind CSS" className="w-5 h-5" />
              <span className="text-gray-300 text-xs">Tailwind</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={react} alt="React" className="w-5 h-5" />
              <span className="text-gray-300 text-xs">React</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href="https://github.com/MuhammadWaqar7615"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700 text-gray-200 text-xs font-medium transition"
            >
              Code
            </a>
            <a
              href="https://irfan-alyy.github.io/Ecommerce-Store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-medium transition"
            >
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}