import React, {useState, useEffect} from "react";
import { Lightbox } from 'react-modal-image';

const LightBox = ({src, alt, hideDownload, hideZoom}) => {
  const [isExpanded, setIsExpanded] = useState(false);

// useEffect(() => {
//   console.log({src});
// }, [src]);

  return (
    <>
    {isExpanded ?
      <Lightbox
        large={src}
        alt={alt}
        hideDownload={hideDownload}
        hideZoom={hideZoom}
        onClose={() => setIsExpanded(false)}
      /> :
      <div className="px-4 first:pl-0 last:pr-0">
        <img draggable="false" className="object-cover h-20 w-24 " alt={alt} onClick={() => setIsExpanded(true)} src={src}/>
      </div>
    }
    </>
  )
}

export default LightBox;