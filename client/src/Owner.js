import React, { useState, useContext } from "react";
import Popup from "./components/Popup";
import BlockchainContext from "./BlockchainContext";
import List from "./components/List";

const Owner = ({ account }) => {
  const blockchainContext = useContext(BlockchainContext);
  const {
    Web3,
    useraccount,
    contract,
    setLoader,
    setTotalNodes,    
  } = blockchainContext; //pulls the stuff from the useContext to let me use them

  // useStates for buttons */}
  const [appButt, setAppButt] = useState(false);
  const [rmvButt, setRmvButt] = useState(false);
  const [transButt, setTransButt] = useState(false); 
  const [genButt, setGenButt] = useState(false);
  const [reacButt, setReacButt] = useState(false);

  // useStates for add & remove node = these are manually input from the popups */}
  const [userAdd, setUserAdd] = useState("");
  const [userCert, setUserCert] = useState("");
  const [userIP, setUserIP] = useState("");
  const [idno, setIdno] = useState(); //placeholder for UID for the node that wants to be de or reactivated

  // Genereate Certificate function*/}
  const genCert = async () => {
    setLoader(true);
    const hexAdd = Web3.utils.toHex(userAdd);
    setGenButt(false);
    const reciept = await contract.methods
      .generateCertificate(userIP, hexAdd)
      .send({ from: useraccount });
    totalCurrentNodes(); // run total current nodes to update the total*/}
    window.alert(reciept.events.CertificateGenerated.returnValues.cert); //get certificate in a pop up for easy copy and paste
    console.log(reciept.events.CertificateGenerated.returnValues.cert); //also put the certificate in the console just incase
    setLoader(false);
  };
  //transfer Owner function
  const transferOwner = async () => {
    console.log("button");
    setLoader(true);
    setTransButt(false);
    const hexAdd = Web3.utils.toHex(userAdd);
    const transfer = await contract.methods
      .transferOwnership(hexAdd)
      .send({ from: useraccount });
    console.log(transfer);
    setLoader(false);
  };

  // Add node function */}
  const addNodes = async () => {
    setLoader(true);
    const hexAdd = Web3.utils.toHex(userAdd);
    setAppButt(false);
    try {
      const recieptAdd = await contract.methods
        .addNode(hexAdd, userIP, userCert)
        .send({ from: useraccount });
      console.log(recieptAdd);
      //getList();
      totalCurrentNodes(); // run total current nodes to update the total*/}
      setLoader(false);
    } catch {
      window.alert(
        "Theres been an error, check that your node doesnt already exist"
      );
      setLoader(false);
    }
    // need some kind of error checking maybe? */}
  };
  // deactivate node function*/}

  const removeNodes = async () => {
    setLoader(true);
    const hexAdd = Web3.utils.toHex(idno);
    setRmvButt(false);
    try {
      const recieptrmv = await contract.methods
        .deactivateNode(hexAdd)
        .send({ from: useraccount });
      console.log(recieptrmv);
      //getList();
      totalCurrentNodes(); // run total current nodes to update the total*/}
      setLoader(false);
    } catch {
      window.alert("The Node doesnt exist please check");
      setLoader(false);
    }
  };

  // reactivate node function */}
  const reactivateNodes = async () => {
    setLoader(true);
    const hexAdd = Web3.utils.toHex(idno);
    setReacButt(false);
    try {
      const recieptrmv = await contract.methods
        .activateNode(hexAdd)
        .send({ from: useraccount });
      console.log(recieptrmv);
      //getList();
      totalCurrentNodes();
      setLoader(false);
    } catch {
      window.alert("The Node doesnt exist please check");
      setLoader(false);
    }
  };

  // total nodes call*/}
  const totalCurrentNodes = async () => {
    const idNode = await contract.methods.totalNodes().call();
    const temp = parseInt(idNode);
    setTotalNodes(temp); //calls totalNodes, gets the
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row justifiy-contents-center">
        <main role="main" className="col-lg-12 text-center">
          {/* Owner Nav Bar for admin controls */}
          <nav className="navbar navbar-dark static-top bg-dark p-0 justifiy-contents-center">
            <div className="justifiy-contents-left">
              {/* left 3 buttons */}
              <button
                className="ml-2 btn btn-outline-light btn-sm "
                onClick={() => setAppButt(true)}
              >
                Add Node
              </button>
              <button
                className="ml-2 btn btn-outline-light btn-sm "
                onClick={() => setRmvButt(true)}
              >
                Deactivate Node
              </button>
              <button
                className="ml-2 btn btn-outline-light btn-sm "
                onClick={() => setReacButt(true)}
              >
                Reactivate Node
              </button>
            </div>
            <h4 className="navbar-brand col-sm-3 col-md-2 mr-0 ">
              Owners Menu
            </h4>
            <div className="justifiy-contents-right">
              {/* Right 3 buttons */}
              <button
                className="mr-2 btn btn-outline-light btn-sm "
                onClick={() => setGenButt(true)}
              >
                Generate Certificate
              </button>
              <button
                className="mr-2 btn btn-outline-light btn-sm "
                onClick={() => setTransButt(true)}
              >
                Transfer Ownership
              </button>            
            </div>
          </nav>

          <List />
          {/*List is the component to make the table */}
        </main>
        {/* Popups for the different button forms */}

        {/* Add Node Form */}
        <Popup trigger={appButt}>
          <form className="align-center text-center">
            <h3>Add New Node</h3>
            <input
              className="mt-2"
              type="text"
              placeholder="Acc Address"
              value={userAdd}
              onChange={(e) => setUserAdd(e.target.value)}
            />
            <input
              className="ml-2"
              type="text"
              placeholder="MAC"
              value={userIP}
              onChange={(e) => setUserIP(e.target.value)}
            />
            <input
              className="mt-2"
              type="text"
              placeholder="Certificate"
              value={userCert}
              onChange={(e) => setUserCert(e.target.value)}
            />
            <div></div>
            <button
              className="mt-4 mr-2 btn btn-outline-secondary"
              onClick={() => setAppButt(false)}
            >
              Cancel
            </button>
            <button
              className="mt-4 btn btn-outline-secondary"
              onClick={addNodes}
            >
              Submit
            </button>
          </form>
        </Popup>
        {/*Deactivate Node Form */}
        <Popup trigger={rmvButt}>
          <form className="align-center text-center">
            <h3>Deactivate Node</h3>
            <input
              className="mt-2"
              type="text"
              placeholder="Node ID"
              value={idno}
              onChange={(e) => setIdno(e.target.value)}
            />
            <div></div>
            <button
              className="mt-4 mr-2 btn btn-outline-secondary"
              onClick={() => setRmvButt(false)}
            >
              Cancel
            </button>
            <button
              className="mt-4 btn btn-outline-secondary"
              onClick={removeNodes}
            >
              
              Submit
            </button>
          </form>
        </Popup>
        {/* Reactivate Node Form */}
        <Popup trigger={reacButt}>
          <form className="align-center text-center">
            <h3>Reactivate Node</h3>
            <input
              className="mt-2"
              type="text"
              placeholder="Node ID"
              value={idno}
              onChange={(e) => setIdno(e.target.value)}
            />
            <div></div>
            <button
              className="mt-4 mr-2 btn btn-outline-secondary"
              onClick={() => setReacButt(false)}
            >
              Cancel
            </button>
            <button
              className="mt-4 btn btn-outline-secondary"
              onClick={reactivateNodes}
            >
              Submit
            </button>
          </form>
        </Popup>
        {/* Transfer contract owner Form*/}
        <Popup trigger={transButt}>
          <form className="align-center text-center">
            <h3>Transfer Contract Ownership</h3>
            <input
              className="ml-2 mt-2"
              type="text"
              placeholder="New Address"
              required
              value={userAdd}
              onChange={(e) => setUserAdd(e.target.value)}
            />{" "}
            <div></div>
            <button
              className="mt-4 mr-2 btn btn-outline-secondary"
              onClick={() => setTransButt(false)}
            >
              Cancel
            </button>
            <button
              className="mt-4 btn btn-outline-secondary"
              onClick={transferOwner}
            >
              Submit
            </button>
            
          </form>
        </Popup>       
        {/* Generate Certificate Form */}
        <Popup trigger={genButt}>
          <form className="align-center text-center">
            <h3>Generate Certificate</h3>
            <input
              className="mt-2"
              type="text"
              placeholder="Acc Address"
              value={userAdd}
              onChange={(e) => setUserAdd(e.target.value)}
            />
            <input
              className="ml-2"
              type="text"
              placeholder="MAC"
              value={userIP}
              onChange={(e) => setUserIP(e.target.value)}
            />
            <div></div>
            <button
              className="mt-4 mr-2 btn btn-outline-secondary"
              onClick={() => setGenButt(false)}
            >
              Cancel
            </button>
            <button
              className="mt-4 btn btn-outline-secondary"
              onClick={genCert}
            >
              Submit
            </button>
          </form>
        </Popup>
      </div>
    </div>
  );
};

export default Owner;
