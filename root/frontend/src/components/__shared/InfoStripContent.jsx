import {AiOutlineExpandAlt} from 'react-icons/ai';
import {FaPlusSquare, FaMinusSquare} from 'react-icons/fa';
import {useState} from 'react';

//Delete this component
function InfoStripContent({imgPath, imgAltText, title, content}) {

  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <img src={imgPath} alt= {imgAltText} className="circle"/>
      <h4>{title}</h4>
      <div className= {`info ${expanded ? 'expanded' : ''}`} >
          <p>{content.description.replace(/(<([^>]+)>)/ig, '')}</p>
          {/*<li>Sets: <span> {content.sets}</span></li>
          <li>Reps: <span> {content.reps}</span></li>
          <li>Weights: <span> {content.weight}</span> lbs</li>
          <li>Rest: <span> {content.rest}</span> secs</li>*/}
      </div>
      <AiOutlineExpandAlt onClick={() => {setExpanded(!expanded)}}/>
      <FaPlusSquare/>
    </>
  )
}

export default InfoStripContent