const ChatRoomLoading = () => {
    return(
      <div className="w-100 d-flex flex-column justify-content-center p-2 placeholder-glow" aria-hidden="true">
          <p className="h1 mb-5 text-primary text-center placeholder-glow"><span className="placeholder">ENTER ROOM</span></p>
          <span class="placeholder col-12 bg-light"></span>
        <button className="btn btn-primary w-80 mt-2 disabled placeholder w-90" aria-disabled="true"></button>
        <button className="btn btn-primary w-80 mt-4 disabled placeholder w-90" aria-disabled="true"></button>
      </div>
    )
  }

export default ChatRoomLoading;