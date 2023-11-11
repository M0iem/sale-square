import React from 'react'
import { brandingData } from '../static/data'

const Categories = () => {
  return (
    <div>
        <div>
            { brandingData && brandingData.map((i,index)=>(
                <div key={index}>
                    {i.icon}
                    <div>
                        <h3>
                            {i.title}
                        </h3>
                        <p>{i.Description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Categories