import { useState } from "react";

type ActionBarProps = {
    addProduct: () => void;
    sortBy: (option: string) => void;
    search: (text: string) => void;
}

export const ActionBar = (props: ActionBarProps) => {
    const { addProduct, sortBy, search } = props
    const [sort, setSort] = useState("")
    const [searchL, setSearch] = useState("");
    return(
        <div className="actionBar">
            <button onClick={addProduct} >Add +</button>
            <input type="search" onChange={(e)=>{
                search(e.target.value);
                setSearch(e.target.value);
            }} value={searchL} />
            <div>Sort By 
                <select onChange={(e)=>{
                    sortBy(e.target.value);
                    setSort(e.target.value);
                }} value={sort}>
                    <option value="">Choose Option</option>
                    <option value="name">Name</option>
                    <option value="date">Recently Added</option>
                </select>
            </div>
        </div>
    )
}