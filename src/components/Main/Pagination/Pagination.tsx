import { useEffect, useState } from "react";

type PaginationProps = {
    paginate: (page: number) => void;
    total: number;
}

export const Pagination = (props: PaginationProps) => {
    const { paginate, total } = props
    const [page, setPage] = useState(1);
    useEffect(()=>{
        paginate(page);
    },[page])

    return(
        <div className="actionBar">
            <button onClick={()=>setPage(prev=>{return prev-1})} disabled={page===1}>{`< Prev Page`}</button>
            <div>{page}/{total}</div>
            <button onClick={()=>setPage(prev=>{return prev+1})} disabled={page===total}>{`Next Page >`}</button>
        </div>
    )
}