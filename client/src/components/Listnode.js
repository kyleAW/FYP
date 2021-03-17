import React, { useState, useContext, useEffect } from "react";
import BlockchainContext from "../BlockchainContext";
import * as ReactBootStrap from "react-bootstrap";

function List() {
  const blockchainContext = useContext(BlockchainContext);
  const { getList } = blockchainContext; //pulls the stuff from the useContext to let me use them

  const [nodes, setNodes] = useState([]);

    useEffect(() => {
      getList().then((nodes) => {        
        setNodes(nodes);
      });
    }, [setNodes]);
  
 

  const renderNodeList = (nodes, index) => {
    return (
      <tr key={index}>
        <td>{nodes.nodeID}</td>
        <td>{nodes.active.toString()}</td>
        <td>{nodes.address}</td>
        <td>{nodes.ip}</td>
        
      </tr>
    );
  };

  return (
    <div>
      
      <ReactBootStrap.Table>
        <thead>
          <tr>
            <th>NodeID </th>
            <th>Active</th>
            <th>Address</th>
            <th>MAC</th>
            
          </tr>
        </thead>
        <tbody>{nodes.map(renderNodeList)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default List;
