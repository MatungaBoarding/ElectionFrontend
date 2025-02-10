
import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;



const CaptureImage = ({capturedImage, setCapturedImage, name, uploadImage, width=220, height=200}) => {

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: { exact: "environment" }
  };

  const webcamRef = useRef(null);
  const capture = useCallback(
    async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      let file = new File([blob], 'photo', {type: 'image/jpeg'})
      setCapturedImage({'image': imageSrc, 'file': file})
      console.log("test")
      uploadImage({'data_url': imageSrc, 'file': file})
    },
    [webcamRef]
  );
  return (
    <div>
      {
        capturedImage === '' ? 
        <div className=''>
          <Webcam
            audio={false}
            height={width}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={height}
            videoConstraints={videoConstraints}
          />
          <button 
            onClick={(e)=>{
              capture();
            }}
            className='bg-gray-200 px-2 py-1 rounded w-full'
          >Capture</button>
        </div> :
        <div>
          <img src={capturedImage.image} alt="" />
          <button 
            onClick={(e)=>{
              setCapturedImage('');
            }}
            className='bg-gray-200 px-2 py-1 rounded w-full'
          >Update</button>
        </div>
      }
    </div>
  )
}

export default CaptureImage
