import { useState, useContext } from "react";
import CaptureImage from "./InputElements/CaptureImage";
import { ref, uploadBytes , getDownloadURL } from 'firebase/storage'
import { GlobalContext } from '../globalConfig/firebase';

const Photo = (mbmID, type="slip", width=220, height=200) => {

    const [capturedImage, setCapturedImage] = useState('')
    const [load, setLoad] = useState(false)
    // const { storage } = useSelector(state => state.firebase);
    const {fireb, setFireb} = useContext(GlobalContext);

    const uploadImage = async (img) => {
        setLoad(true)
        if (img === null) return;
        let path = ""
        if (type === "slip"){
            path = `election/${mbmID["mbmID"]+".jpg"}`
        }else{
            path = `election/${mbmID["mbmID"]+"_sign.jpg"}`
        }
        const imageRef = ref(fireb.storage, path)
        let snapshot = await uploadBytes(imageRef, img.file)
        let url = await getDownloadURL(snapshot.ref)
        if (url !== ""){
            if(type === "slip"){
                // update the url in fireb global context
                setFireb({...fireb, url: url})
            }else{
                // update the url in fireb global context
                setFireb({...fireb, signUrl: url})
            }
        }
        setLoad(false)
    }

    return (
        <div>
            <CaptureImage capturedImage={capturedImage} setCapturedImage={setCapturedImage} name={""} uploadImage={uploadImage} width={width} height={height}/>
        </div>
    )
}

export default Photo