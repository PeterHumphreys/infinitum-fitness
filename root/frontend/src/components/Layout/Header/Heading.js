function Heading({options}) {
  return (
    <h1 
      className = {options.imgPath ? 'img-heading' : ''} 
    >
      {options.imgPath && <img src={options.imgPath} alt={options.altText}/>}
      &nbsp;
      {options.title}
    </h1>
  )
}

export default Heading