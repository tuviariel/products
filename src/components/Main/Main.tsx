import { useEffect, useState } from "react"
import ActionBar from "./ActionBar";
import Products from "./Products";
import Pagination from "./Pagination";
import { ProductsData } from "../../ProductsData";

type ProductObject = {
    _id: number;
    name: string;
    desc: string;
    price: number;
    createDate: Date;
}

export const Main = () => {
    // console.log(ProductsData)
    const data = localStorage.getItem("products");
    let parsedData = [];
    if(data){
        parsedData = JSON.parse(data)
    }
    const [productsData, setProductsData] = useState(data ? parsedData.map((item:any)=>{
        return {...item, createDate: new Date(item.createDate)}
    }) : ProductsData)
    const [productsShow, setProductsShow] = useState([])
    const [prodIndex, setProdIndex] = useState(-1);
    const [rerender, setRerender] = useState(true);
    
    //updating localStorage at products list change:
    useEffect(()=>{
        console.log(productsData)
        localStorage.setItem("products",JSON.stringify(productsData))
        paginate(1)
    },[productsData])

    //removing product from list:
    const delProduct = (index:number) => {
        setProductsData((prev:[])=>{
            return prev.toSpliced(index,1);
        });
        // setRerender(!rerender);
    };

    //saving edited product to list (either adding new one to list or updating one from list):
    const saveProduct = (name: string, desc: string, price: number) => {
        console.log(name, desc, price)
        if(prodIndex !== -1) {
            setProductsData((prev:[])=>{
                return prev.map((item:ProductObject, i)=>{
                    return prodIndex === i
                    ? {
                        ... item,
                        name: name,
                        desc: desc,
                        price: price
                    }
                    : item;
                })
            });
        } else {
            let newArr = productsData;
            let newId = newArr[newArr.length-1]._id + 1
            let newIndex = newArr.length
            let newObj = {_id:newId, name:name, desc:desc, price:price, createDate: new Date}
            newArr.push(newObj)
            setProductsData((prev:[])=>{ return newArr })
            setProdIndex(newIndex);
        }
    };

    //clicking on add product button in action bar:
    const addProduct = () => {
        setProdIndex(-1)
    }

    //enabling searching from names of products:
    const search = (text: string) => {
        paginate(1)
        if(text) {
            console.log(text)
            setProductsShow(()=>{
                return productsData.filter((item:ProductObject)=>{
                    return item.name.startsWith(text) || item.name.startsWith(text.toLocaleLowerCase())
                })
            })
        } else {
            // setProductsShow(productsData)
            paginate(1)
        }
    }

    //enabling sorting products either by name (alphabetically) or by time created (numerically):
    const sortBy = (option: string) => {
        console.log(option)
        if(option === "name") {
            setProductsData((prev:[])=>{
                return prev.sort((a:ProductObject,b:ProductObject)=>{
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                })
            })
            paginate(1);
            // setRerender(!rerender);
        } else if(option === "date") {
            setProductsData((prev:[])=>{
                return prev.sort((a:ProductObject,b:ProductObject)=> {
                    return a.createDate.getTime() - b.createDate.getTime();
                })
            })
            paginate(1);
            // setRerender(!rerender);
        }
    }   

    //enabling pagination of list:
    const paginate = (page:number) => {
        setProductsShow(()=>{
            return productsData.filter((item:ProductObject, i:number)=>{
                return i+1<(page*5)+1 && i+1>(page-1)*5
            })
        })
        setProdIndex(-1)
    }

    return(
        <div className="">
            <ActionBar addProduct={addProduct} sortBy={sortBy} search={search}/>
            <Products data={productsShow} delProduct={delProduct} saveProduct={saveProduct} prodIndex={prodIndex} setProdIndex={setProdIndex}/>
            <Pagination paginate={paginate} total={productsData.length%5>0 ? ((productsData.length-productsData.length%5)/5)+1 : (productsData.length-productsData.length%5)/5}/>
        </div>
    )
}