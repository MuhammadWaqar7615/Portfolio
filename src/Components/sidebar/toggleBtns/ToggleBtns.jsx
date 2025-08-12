import { motion } from "motion/react"

export default function ToggleBtns({setOpen}) {
  return (
    <button onClick={()=> setOpen((prev) => !prev)}>
        <svg width="15" height="15" viewBox="-22 0 20 20" className="text-4xl font-extrabold overflow-visible">
        <motion.path
         strokeWidth="4"
         stroke="black" 
         strokeLinecap="round" 
         variants={{
            closed : {d: "M 2 2.5 L 20 2.5"},
            open: {d: "M 3 16.5 L 17 2.5"},
        }}
        />
         <motion.path 
            strokeWidth="4"
            stroke="black" 
            strokeLinecap="round" 
            d="M 2 9.423 L 20 9.423" 
            variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
            }}
        />
        <motion.path
         strokeWidth="4"
         stroke="black" 
         strokeLinecap="round" 
         variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: {d: "M 3 2.5 L 17 16.346"}
        }}
        />
      </svg>
    </button>
  )
}
