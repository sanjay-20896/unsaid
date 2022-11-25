import React from 'react';
import PropTypes from 'prop-types';
import {MOBILE_BREAKPOINT} from '../config'

function ArcText({ text, arc, radius }) {
  const characters = text.split('');
  const degree = arc / characters.length;

  return (
      <>
    <h1 className="canelaThin">
      {characters.map((char, i) => (
        <span
          key={`heading-span-${i}`}
          style={{
            height: `${radius}px`,
            transform: `rotate(${degree * i - arc / 2}deg)`,
            transformOrigin: `0 ${radius}px 0`,
          }}>
          {char}
        </span>
      ))}
    </h1>
    <style jsx>{`
        h1 {
            font-size: 20px;
            text-align: center;
            position: absolute;
            left: 50%;
            /* I think this works for centering? */
            top: calc(50% - 64px);
            -webkit-transform: translate(-50%, calc(-50% - 64px));
            -ms-transform: translate(-50%, calc(-50% - 64px));
            transform: translate(-50%, calc(-50% - 64px)) rotate(2deg);
        }
        span {
            position: absolute;
        }
        @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
          h1 {
            font-size: 16px;
            transform: translate(-50%, calc(-50% - 64px)) rotate(1deg);
          }
        }
    `}</style>


      </>
  );
}

ArcText.propTypes = {
  text: PropTypes.string.isRequired,
  arc: PropTypes.number, // how curved do you want the text
  radius: PropTypes.number, // how big do you want the curve
};

// ArcText.defaultProps = {
//   arc: 120,
//   radius: 400,
// };

export default ArcText;
