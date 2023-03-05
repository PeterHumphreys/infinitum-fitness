import { useContext } from "react";
import DataContext from "../../../context/DataContext"

function Heading() {
  const {headingOptions : options} = useContext(DataContext);
  return (
    <h1 
      className = {options.imgPath ? 'heading img-heading' : 'heading'} 
    >
      {options.imgPath && <img src={options.imgPath} alt={options.altText}/>}
      &nbsp;
      {options.title}
      &nbsp;
      {options.icon && options.icon}
    </h1>
  )
}

export default Heading