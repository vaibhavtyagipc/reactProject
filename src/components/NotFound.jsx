import Notfound from "/404.1.mp4";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[100%] w-[100%] object-cover" src={Notfound}></img>
    </div>
  )
}

export default NotFound
