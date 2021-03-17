import React, { useEffect, useState } from "react";
import IoTACReg from "./artifacts/IoTACReg.json";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Owner from "./Owner";
import Node from "./Node";
import getWeb3 from "./smartcontracts/getWeb3";
import BlockchainContext from "./BlockchainContext";

function App() {
  const [loader, setLoader] = useState(true); //loader

  const [Web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(); //contractDetails
  const [useraccount, setUseraccount] = useState(""); //userAddress
  const [contractowner, setContractowner] = useState(""); //ownersAddress

  const [certificate, setCertificate] = useState(""); //users certificate details
  const [totalNodes, setTotalNodes] = useState(0);

  const [IP, setIP] = useState(""); //users IP address for footer (used for future things)
  const [uid, setUID] = useState(""); //users uniqueID

  useEffect(() => {
    // do this first */}
    loadBlockchaindata();
  }, []);

  const loadBlockchaindata = async () => {
    // Load the blockchain data from Web3.js */}
    const web3 = await getWeb3();
    // get the users account */}
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // to get the contract need to get the networkID so we can pull the contract details out of that
    const networkID = await web3.eth.net.getId();
    const networkData = IoTACReg.networks[networkID];
    if (networkData) {
      //if its connected to the blockcahin network
      const IoTaccesscontrol = await new web3.eth.Contract(
        IoTACReg.abi,
        networkData.address
      );
      // set the contract, web3 and the users Account*/}
      setContract(IoTaccesscontrol);
      setWeb3(web3);
      setUseraccount(account);
    } else {
      window.alert("Contract not deployed to current network");
    }
  };

  // function to check if the contract owner is the user */}
  function ownerCheck() {
    if (useraccount === contractowner) {
      return true;
    } else {
      return false;
    }
  }

  // contract call for owner to make sure the contracts running if it doesnt then the site wont load*/}
  useEffect(() => {
    const load = async () => {
      const owner = await contract.methods.owner().call();
      setContractowner(owner);
      setLoader(false);
    };
    if (
      typeof web3 !== "undefined" &&
      typeof useraccount !== "undefined" &&
      typeof contract !== "undefined"
    ) {
      load();
    }
  }, [Web3, useraccount, contract]);

  // generate list function, to get the list of nodes for the tables to display */}
  const getList = async () => {  
    let x = 0;
    let nodeCount = true;
    const nodes = [];

    while (nodeCount !== false) {
      const nodeList = await contract.methods.nodeList(x).call();
      const noNode = "0x0000000000000000000000000000000000000000";
      x = x + 1;
      if (nodeList["3"] !== noNode) {
        //if (responseValue !== false) {
        nodes.push({
          nodeID: nodeList.nodeID,
          ip: nodeList.MAC,
          address: nodeList.nodeAdd,
          certificate: nodeList.certificate,
          active: nodeList.active,
        });
      } else {
        nodeCount = false;
      }
    }    
    return nodes;
  };

  if (loader) {
    // run Loader first, incase things havent loaded yet*/}
    return <div className="align-middle text-center"> Please Wait...... </div>;
  }
  return (
    <div>
      {/* blockchain context provider to pass props to the rest of the tree structure*/}
      <BlockchainContext.Provider
        value={{
          Web3,
          useraccount,
          contract,
          IP,
          setUID,
          setCertificate,
          setLoader,
          setTotalNodes,
          getList,
          setIP,
        }}
      >
        <div>
          <Navbar account={useraccount} />
        </div>
        <div>
          <main>
            {/* Run owner check, if it passes then go to the owner container if it fails go to the node containe*/}
            {ownerCheck() ? (
              <Owner account={useraccount} />
            ) : (
              <Node account={useraccount} certificate={certificate} />
            )}
          </main>
        </div>
        <div>
          <Footer owner={contractowner} IP={IP} uid={uid} />
        </div>
      </BlockchainContext.Provider>
    </div>
  );
}

export default App;
