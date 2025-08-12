import { useEffect, useState } from "react"
import { motion } from "motion/react"
import "./cursor.scss"

function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const mouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", mouseMove)
        return () => {
            window.removeEventListener("mousemove", mouseMove)
        }
    }, [])

    return (
        <motion.div
            className="cursor"
            initial={{ x: 0, y: 0 }} // ✅ Add this
            animate={{ x: position.x, y: position.y }}
        ></motion.div>
    )
}

export default Cursor
