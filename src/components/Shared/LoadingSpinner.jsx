import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = () => {
  return (
    <div
      className='min-h-screen flex flex-col justify-center items-center'
    >
      <ScaleLoader size={100} color='black' />
    </div>
  )
}


export default LoadingSpinner