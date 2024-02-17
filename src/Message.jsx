const Message = prop => {
    console.log(prop.image)
    return(
      <div id="message" className="d-flex text-center text-primary mb-2">
        <img className="rounded-circle w-10" src={prop.image} alt="image"></img>
        <p className=" h5 text-primary ms-2"> {prop.text} </p>
      </div>
    )
  }

export default Message;