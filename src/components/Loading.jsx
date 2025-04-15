import loader from "/loading.gif"

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[100%] w-[100%] object-cover" src={loader}></img>
    </div>
  )
}

export default Loading
