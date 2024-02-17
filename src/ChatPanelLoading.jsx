const ChatPanelLoading = () => {

    const root = document.getElementById("root");
    const underRoot = document.getElementById("underRoot");
  
    underRoot.classList.remove("justify-content-center");
    underRoot.classList.add("justify-content-left");
  
    root.classList.add("w-100");
  
    return(
      <div className="w-100 h-100 d-flex p-0" aria-hidden="true">
        <div id="ChatPanel" className="h-100 w-20 p-2 d-flex flex-column col-3 border-end border-primary">
          <div className="h-50 d-flex flex-column justify-content-tart placeholder-glow" aria-hidden="true">
           <p className="h1 text-center text-primary placeholder-glow"><span className="placeholder">roomname</span></p>
          </div>
          <div className="h-50 d-flex flex-column justify-content-end">
            <i className="bi bi-arrow-return-left btn btn-primary mb-1 disabled placeholder" aria-disabled="true"></i>
            <i class="bi bi-box-arrow-left btn btn-primary disabled placeholder" aria-disabled="true"></i>
          </div>
        </div>
        <div id="ChatPanel" className="h-100 w-20 p-2 d-flex flex-column col-9">
          <div className="h-100 d-flex flex-column justify-content-end">
          <div class="input-group">
          <span class="placeholder col-12 bg-light m-0"></span>
            <button class="btn btn-outline-primary disabled placeholder" type="button" id="button-addon2">Send</button>
        </div>
          </div>
        </div>
      </div>
    )
  }

export default ChatPanelLoading;