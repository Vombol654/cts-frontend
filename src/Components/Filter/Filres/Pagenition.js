import '../../../Styles/pagination.css'
const Pagenition=(props)=>{
    const {onPageChange}=props;
    return(
        <div className="z"> 
        <div className="r r2">&lt;</div>
        <div className="r r2" onClick={()=>onPageChange(1)} >1</div>
        <div className="r r2" onClick={()=>onPageChange(2)}>2</div>
        <div className="r r2" onClick={()=>onPageChange(3)}>3</div>
        <div className="r r2" onClick={()=>onPageChange(4)}>4</div>
        <div className="r r2" onClick={()=>onPageChange(5)}>5</div>
        <div className="r r2">&gt;</div>

    </div>
    )
}
export default Pagenition;