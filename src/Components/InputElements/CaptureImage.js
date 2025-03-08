import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CaptureImage = ({ capturedImage, setCapturedImage, uploadImage, width = 220, height = 200, ext = "jpeg" }) => {
  const webcamRef = useRef(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(device => device.kind === "videoinput");

      if (videoDevices.length > 0) {
        // Check for an external USB webcam first
        const externalCam = videoDevices.find(device => 
          !device.label.toLowerCase().includes("integrated") && !device.label.toLowerCase().includes("built-in")
        );

        // If no USB webcam, check for a back camera (usually labeled "back" or "rear")
        const backCam = videoDevices.find(device => 
          device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear")
        );

        // If no USB webcam or back camera, fallback to the first available (likely front camera)
        setDeviceId(externalCam ? externalCam.deviceId : backCam ? backCam.deviceId : videoDevices[0].deviceId);
      }
    });
  }, []);

  const videoConstraints = {
    width: width,
    height: height,
    deviceId: deviceId ? { exact: deviceId } : undefined, // Use detected camera
    facingMode: "environment" // Use back camera
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then(res => res.blob());
    let file = new File([blob], 'photo', { type: 'image/jpeg' });
    setCapturedImage({ image: imageSrc, file: file });
    uploadImage({ data_url: imageSrc, file: file });
  }, []);

  return (
    <div>
      {capturedImage === '' ? (
        <div>
          <Webcam
            audio={false}
            height={width}
            ref={webcamRef}
            screenshotFormat={`image/${ext}`}
            width={height}
            screenshotQuality={1.0}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture} className="bg-gray-200 px-2 py-1 rounded w-full">Capture</button>
        </div>
      ) : (
        <div>
          <img src={capturedImage.image} alt="Captured" />
          <button onClick={() => setCapturedImage('')} className="bg-gray-200 px-2 py-1 rounded w-full">Update</button>
        </div>
      )}
    </div>
  );
};

export default CaptureImage;
