const EnteringRoom = prop => {
    return(
      <div id="enteringRoom">
        <div className="w-100 d-flex flex-column justify-content-center p-2">
          <p className="h1 mb-5 text-primary text-center">ENTER ROOM</p>
          <div className="input-group input-group-sm mb-3">
           <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="chatRoomName" onChange={prop.handleChange} value={prop.chatRoomName}></input>
        </div>
        {prop.isEmpty ? <p className="text-danger text-center">You must name the room!</p> : <></>}
        <button className="btn btn-primary w-80 mt-2" onClick={prop.getChattRoomName}>Enter</button>
        <button className="btn btn-primary w-80 mt-4" onClick={prop.logOut}>Logout</button>
            </div>
      </div>
    );
  }

export default EnteringRoom;