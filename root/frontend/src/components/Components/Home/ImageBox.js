import React from 'react'

function ImageBox({item, isLoading}) {
  return (
    <div className = "image-box" id={`dnw-${item.id}`}>
        <a href={item.linkPath}>
            <img src={item.imgPath}/>
            <div className = "overlay-text-container">
                <h3>{item.title}</h3>
            </div>
        </a>
    </div>
  )
}

export default ImageBox