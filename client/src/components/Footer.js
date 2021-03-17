import React from 'react'

const Footer = ( {owner,IP, uid} ) => {
    return (
        <footer className="bg-dark container-fluid static-bottom pb-0 mb-0 justify-content-center text-light ">
         <div className = "row align-items-center">

            <div className = "col-sm-7">
            <p className="text-muted mb-md-0 mb-5 bold-text"> Contract Owner : {owner}</p>
            </div>

            <div className = "col-sm-2">  
            </div>
            <div className = "col-sm-3"><p className="text-muted mb-md-0 mb-5 bold-text"> 
            IP= {IP} UniqueID = {uid}  </p>  
            </div>
            
         </div>
     </footer>
    )
}

export default Footer
