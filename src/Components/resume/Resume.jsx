import cv from "../../assets/cv.pdf"
export default function Resume() {
  return (
    <div>
      <iframe src={cv} 
        className="box-border overflow-hidden h-screen w-screen relative top-0 left-0"
      ></iframe>
    </div>
  )
}
