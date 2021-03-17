import React, { useState, useContext, useEffect } from "react";
import Popup from "./components/Popup";
import BlockchainContext from "./BlockchainContext";
import Nodesuccess from "./Node Options/Nodesuccess";
import Nodefail from "./Node Options/Nodefail";

const Node = () => {
  // pulls the context areas from the root component to use here */}
  const blockchainContext = useContext(BlockchainContext);
  const {   
    useraccount,  
    setUID,
    setCertificate,  
    getList,
  } = blockchainContext; //pulls the stuff from the useContext to let me use them

  const [cert, setCert] = useState("");
  const [access, setAccess] = useState(false);
  const [successButt, setSuccessButt] = useState(false); //button for sign in

  //function to check if node is in list.js
  const [nodes, setNodes] = useState([]);
    // use effect to run getList then pull the nodes and set them in the useState above, */}
    useEffect(() => {
      getList().then((nodes) => {        
        setNodes(nodes);
      });
    }, [setNodes]);
    // use state to automate the pop up */}
    useEffect(() => {
      setTimeout(() => {
        setSuccessButt(true);
      }, 500);
    }, []);

    // find function to search the list for an address matching the nodes, then if it finds one checking that the certificate matches */}
  function findNode () {    
    setSuccessButt(false);
    const access = nodes.find((node) => useraccount === node.address);
    // if statement compares the certificate entered to the certificate in the blockchain */}
    if (cert === access.certificate){
      setCertificate(cert);
      setUID(access.nodeID);    
      // sets the access to true if both conditions have been met */} 
      setAccess(true);
    }else{
      window.alert("Im sorry your not registered as a Node on this Network")
    }    
  };

  


  return (
    <div className="container-fluid mt-5">     
      <div className="row justifiy-contents-center">
        <main role="main" className="col-lg-12 text-center">  
        {/* if access is true, give access to nodesuccess if not keep as nodefailed */}      
        {access ? (
              <Nodesuccess />
            ) : (
              <Nodefail />
            )}

        </main>     
        {/* Pop up form to get the users account which is auto filled from metamask and for thhe ode to input the certificate */}   
        <Popup trigger={successButt}>
        <form className="align-center text-center">
            <h3>Sign In</h3>
            <input
              className="mt-2"
              type="text"
              required
              readOnly
              value={useraccount}
            />
            <input
              className="ml-2 mt-2"
              type="text"
              placeholder="Certificate"
              required
              value={cert}
              onChange={(e) => setCert(e.target.value)}
            />{" "}
            <div></div>
            <button className="mt-2 btn btn-outline-success"
            onClick={findNode}>Submit</button>
          </form>
        </Popup>

      </div>
    </div>
  );
};

export default Node;
