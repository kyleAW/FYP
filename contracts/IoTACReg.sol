// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";

contract IoTACReg is Ownable { //IoT access control registration

    uint256 public totalNodes; //total number of nodes
    

    struct Node {
        uint256 nodeID; //the node id
        string MAC; //the mac address for the Node
        string certificate; // the certificate generated in a function on contract
        address nodeAdd; //the address of the node for signing 
        bool active;
    }
    
    mapping(uint256 => Node) public nodeList;

    modifier nodeDoesNotExist (address nodeToAdd) {
        bool check = false;

        for (uint256 i = 0; i <= totalNodes; i++ ){
            if (nodeList[i].nodeAdd == nodeToAdd) {
                check = true;
            }
        }

        require(check != true, "node already exists");
        _;
    }

    event NodeAdded(uint256 nodeID);
    event NodeDeactivated(uint256 nodeID);
    event NodeActivated(uint256 nodeID);
    event CertificateGenerated(bytes32 cert, string MAC, address nodeAdd);

    //add new node
    function addNode(
        address nodeAddress, 
        string memory _mac, string memory _certificate) 
        onlyOwner nodeDoesNotExist(nodeAddress) public returns(bool) 
    {
        uint256 nodeID = totalNodes;
        //Node memory nodeCheck = nodeList[nodeID];
        //check if node address does not exist in mapping already 
        require(nodeAddress != address(0), "node address is invalid"); 
        //require(nodeCheck.nodeAdd == address(0), "node already exists in mapping"); 
        nodeList[nodeID] = Node(nodeID, _mac, _certificate, nodeAddress, true);
        totalNodes++;
        emit NodeAdded(nodeID);
        return true;
    }

    //return node data
    function getNode(uint256 nodeID) 
        public view 
        returns (uint256, string memory, string memory, address, bool) 
    {
        Node memory nodeCheck = nodeList[nodeID];
        require(nodeCheck.nodeAdd != address(0), "node does not exist in mapping"); 
        
        return (
            nodeCheck.nodeID, nodeCheck.MAC, 
            nodeCheck.certificate, nodeCheck.nodeAdd, 
            nodeCheck.active
            );
    }
    
    //deactivate added/existing node from mapping
    function deactivateNode(uint256 nodeID) onlyOwner public returns(bool) {
        Node memory nodeCheck = nodeList[nodeID];
        //deactivate node
        require(nodeCheck.nodeAdd != address(0), "node does not exist in mapping"); 
        nodeList[nodeID].active = false;
        emit NodeDeactivated(nodeID);
        return true;
    }

    //activate added/existing node from mapping
    function activateNode(uint256 nodeID) onlyOwner public returns(bool) {
        Node memory nodeCheck = nodeList[nodeID];
        //deactivate node
        require(nodeCheck.nodeAdd != address(0), "node does not exist in mapping"); 
        nodeList[nodeID].active = true;
        emit NodeActivated(nodeID);
        return true;
    }
    
    //generates a certificate based on sha256 hash of mac address + UID 
    function generateCertificate(string memory _MAC, address nodeAdd) 
        onlyOwner public returns(bytes32) 
    {
        //convert address to string and concatenate mac and address
        string memory macAndNodeAdd = string(abi.encodePacked(_MAC, abi.encodePacked(nodeAdd)));
        bytes32 cert = sha256(abi.encodePacked(macAndNodeAdd));
        emit CertificateGenerated(cert, _MAC, nodeAdd);
        return cert;     
    }
        

    /**
    From Solidity documentation:
    
    Explicit data location for all variables of struct, 
    array or mapping types is now mandatory. 
    This is also applied to function parameters and return variables. 
    For example, change uint[] x = m_x 
    to uint[] storage x = m_x, 
    and function f(uint[][] x) 
    to function f(uint[][] memory x) where memory is the data location 
    and might be replaced by storage or calldata accordingly. 
    Note that external functions require parameters with a data location of calldata. 
    */
}