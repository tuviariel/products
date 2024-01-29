import { useEffect, useState } from "react"
import ImageInfo from "../../../assets/imageInfo.svg"
type ProductInfoObject = {
    _id: number;
    name: string;
    desc: string;
    price: number;
}
type ProductInfoProps = {
    data: ProductInfoObject;
    saveProduct: (name: string, desc: string, price: number) => void;
}

export const ProductInfo = (props: ProductInfoProps) => {
    const { data, saveProduct } = props;
    // console.log(data)
    const [nameL, setName] = useState(data?.name || "");
    const [descL, setDesc] = useState(data?.desc || "");
    const [priceL, setPrice] = useState(data?.price || 0);
    const [errMessage, setErrMessage] = useState("");
    useEffect(()=>{
        setName(data?.name || "");
        setDesc(data?.desc || "");
        setPrice(data?.price || 0);
    },[data])
    const validationAndSave = () => {
        if(nameL?.length===0) {
            return setErrMessage("The product must have a name...");
        }
        else if(nameL?.length>30) {
            return setErrMessage("The product name has a limit of 30 characters...");
        }
        else if(descL?.length>200) {
            return setErrMessage("The product description has a limit of 200 characters...");
        }
        else if(priceL<1) {
            return setErrMessage("The product price must be a positive number...");
        }
        else {
            saveProduct(nameL, descL, priceL);
        }
    }
    useEffect(()=>{
        setTimeout(() => {
            setErrMessage("");
        }, 5000);
    }, [errMessage])
    return(
        <div className="">
            <label >{data?._id?data?.name+" Details:":"Create New Product:"}</label>
            <div className="productInfo">
                <img src={ImageInfo} alt={"product #"+data?._id+" image is unavailable."} style={{"width":"80px","height":"70"}}/>
                <label >Name:</label>
                <input type="text" value={nameL} onChange={(e)=>{setName(e.target.value)}} placeholder="what is the product's name?"/>
                <label >Description:</label>
                <textarea value={descL} onChange={(e)=>{setDesc(e.target.value)}} rows={3} placeholder="what is the product's description (optional)?"/>
                <label >Price ($):</label>
                <input type="number" min={0} value={priceL} onChange={(e)=>{setPrice(e.target.value ? parseInt(e.target.value) : 0)}} placeholder="what is the product's price?"/>
                <p className="validation-error">{errMessage}</p>
                <button onClick={()=> validationAndSave()} disabled={!nameL || !priceL} className="">{data? "Update" : "Save"}</button>
            </div>
        </div>
    )
}