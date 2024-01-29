import Product from "../Product";
import ProductInfo from "../ProductInfo";

type productObjectItem = {
    _id: number;
    name: string;
    desc: string;
    price: number;
}

type ProductsProps = {
    data: productObjectItem[];
    delProduct: (id:number) => void;
    saveProduct: (name: string, desc: string, price: number) => void;
    prodIndex: number;
    setProdIndex: (index: number) => void;
}

export const Products = (props: ProductsProps) => {
    const { data, delProduct, saveProduct, prodIndex, setProdIndex } = props;

    return(
        <div className="columns2">
            <div className="col1">
                {data ? data.map((item, key) => {
                    return <div key={key} onClick={()=>{setProdIndex(key)}}>
                        <Product data={item} delProduct={delProduct} picked={prodIndex === key ? true : false} index={key}/>
                    </div>
                })
                :<></>
            }
            </div>
            <div className="col2">
                {data ? <ProductInfo data={data[prodIndex]} saveProduct={saveProduct}/> : <></>}
            </div>
        </div>
    )
}