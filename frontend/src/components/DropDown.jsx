import React from 'react'
import { BiBorderAll } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'

const DropDown = ({categoriesData,setDropDown}) => {
    const navigate=useNavigate();
    const submitHandler = (i)=>{
        navigate(`/products?category=${i.title}`)
        setDropDown(false);
        window.location.reload(true);
    }

  return (
    <div className='dropDownCategory bg-[#d8eef4]'>
            <div className='cursor-pointer flex items-center gap-10 hover:bg-gray-50 p-2'  onClick={()=>{
                categoriesData=null;
                navigate('/products')
                window.location.reload(true)
            }}>

<BiBorderAll size={25} className='ml-2' />
<h4  className=''>All Product</h4>

</div>
        
        {
            categoriesData && categoriesData.map((i,index)=>(
                <div className='cursor-pointer flex items-center gap-10 hover:bg-gray-50 p-2' key={index} onClick={()=>submitHandler(i)}>

                    <img src={i.image_Url} alt="" style={{
                        width:"25px",
                        height:"25px",
                        objectFit:"contain",
                        marginLeft:"10px",
                        userSelect:"none"
                
                
                    }} />
                    <h4 className=''>{i.title}</h4>

                </div>
            ))
        }

    </div>
  )
}

export default DropDown