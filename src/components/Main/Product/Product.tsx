import DefaultImage from "../../../assets/image.svg"
import PickedImage from "../../../assets/imagePicked.svg"
type ProductDataObject = {
    _id: number;
    name: string;
    desc: string;
    price: number;
}

type ProductProps = {
    data: ProductDataObject;
    delProduct: (id:number) => any;
    picked: boolean;
    index: number;
}
export const Product = (props: ProductProps) => {

    const { data, delProduct, picked, index } = props;

    return(
        <div className={`listItem ${picked ? "pickedItem" : ""}`}>
            <img src={picked ? PickedImage : DefaultImage} alt="Product Image" />
            <div className="text">
                <label className="">{data.name}</label>
                <p className="">{data.desc}</p>
            </div>
            {picked && <button onClick={()=>{delProduct(index)}} className="" title="Clicking this button will delete the product from the list.">Delete</button>}
        </div>
    )
}