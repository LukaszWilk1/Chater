function Signin(props) {

    const root = document.getElementById("root");
  
    root.classList.remove("h-100");
    root.classList.remove("w-100");
  
    return (
      <div id="signIn" className="w-100 d-flex flex-column justify-content-center p-2">
      <p className="h1 mb-4 text-primary text-center">CHATER</p>
      <button type="button" className="btn btn-danger w-80 mt-4" onClick={props.logIn} name="loginButton">LOGIN WITH GOOGLE</button>
      </div>
    );
  };

export default Signin;