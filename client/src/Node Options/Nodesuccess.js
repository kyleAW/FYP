import React, { useState, useContext, useEffect } from "react";
import BlockchainContext from "./../BlockchainContext";
import List from "./../components/Listnode";
import Popup from "./../components/Popup";

function Nodesuccess() {
  const [buttonPopup, setButtonPopup] = useState(false); //setIP button

  useEffect(() => {
    setTimeout(() => {
      setButtonPopup(true);
    }, 500);
  }, []);
  const blockchainContext = useContext(BlockchainContext);
  const { IP, setIP } = blockchainContext; //pulls the stuff from the useContext to let me use them

  return (
    <div className="row justifiy-contents-center">
      <main role="main" className="col-lg-12 text-center">
        <h3>Node Access Panel</h3>
        <p>Here you can see all the avaliable nodes,</p>
        <p>
          Future work will allow for open flow of data here via another smart
          contract
        </p>
        <List />

        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          className="position : fixed"
        >
          <form className="align-center text-center">
            <h3>Please Enter your IP address</h3>
            <input
              className="mt-2"
              type="text"
              placeholder="IP Address"
              required
              value={IP}
              onChange={(e) => setIP(e.target.value)}
            />
            <button
              className="ml-3 btn btn-outline-secondary"
              onClick={() => setButtonPopup(false)}
            >
              Submit
            </button>
          </form>
        </Popup>
      </main>
    </div>
  );
}

export default Nodesuccess;
