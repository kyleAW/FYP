import React, { useState, useContext, useEffect } from "react";
import BlockchainContext from "./../BlockchainContext";
import * as ReactBootStrap from "react-bootstrap";

function List() {
  const blockchainContext = useContext(BlockchainContext);
  const { getList } = blockchainContext; //pulls the stuff from the useContext to let me use them

  const [nodes, setNodes] = useState([]);
  //use effect to run getList from app.js to generate the list and add it to the use state above
    useEffect(() => {
      getList().then((nodes) => {        
        setNodes(nodes);
      });
    }, [setNodes]);
  
 

  const renderNodeList = (nodes, index) => {
    // key for the table
    return (
      <tr key={index}>
        <td>{nodes.nodeID}</td>
        <td>{nodes.active.toString()}</td>
        <td>{nodes.address}</td>
        <td>{nodes.ip}</td>
        <td>{nodes.certificate}</td>
      </tr>
    );
  };

  return (
    <div>
      {/* The table is generated and then the body is populated with the nodes using the render above */}
      <ReactBootStrap.Table>
        <thead>
          <tr>
            <th>NodeID </th>
            <th>Active</th>
            <th>Address</th>
            <th>MAC</th>
            <th>Certificate</th>
          </tr>
        </thead>
        <tbody>{nodes.map(renderNodeList)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default List;
