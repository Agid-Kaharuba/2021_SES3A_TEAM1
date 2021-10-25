import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    position: 'absolute',
    top: '55px',
    left: 'calc(80% - 400px)',
    display: 'flex',
  }
})

export const Recommendation = (props) => {
  const classes = useStyles();
  const recommendationLabelColor = () => {
    switch (props.recommendation) {
      case 'Hire': {
        return "green"
      }
      case 'Fire': {
        return "#DC143C"
      }
      default: {
        return "#662D8C"
      }
    }
  }

  return (
    <div className={classes.wrapper}>
      <svg width="517" height="60" viewBox="0 0 517 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="recLinGrad" x1="95.55%" x2="6.387%" y1="50%" y2="50%">
            <stop offset="10%" stop-color="#ED1E79" />
            <stop offset="100%" stop-color="#662D8C" />
          </linearGradient>
          <path
            id="recLabel"
            d="M0 0H349L333 85H60.1504C37.1554 85 17.1252 69.3162 11.6099 46.9924L0 0Z"
          />
          <path
            id="recResult"
            d="M315 0H517L488.751 66.6998C484.052 77.7933 473.174 85 461.126 85H335.174C316.381 85 302.215 67.9188 305.692 49.4504L315 0Z"
            fill={recommendationLabelColor()}
          />
        </defs>
        <g fill="none" fill-rule="evenodd" transform="translate(3 1)">
          <use fill="#000" xlinkHref="#recLabel" />
          <use fill="url(#recLinGrad)" xlinkHref="#recLabel" />
          <use xlinkHref="#recResult" />
          <text fill="#FFF">
            <tspan x="40" y="55" fontSize="32" fontFamily="Roboto, Helvetica, Arial, sans-serif">
              Recommendation
            </tspan>
          </text>
          <text fill="#FFF">
            <tspan x="340" y="55" fontSize="32" fontFamily="Roboto, Helvetica, Arial, sans-serif">
              {props.recommendation}
            </tspan>
          </text>
        </g>
      </svg>
    </div >
  )

  return (<div className={classes.wrapper}>
    <svg className={classes.recommendationLabel} width="349" height="65" viewBox="0 0 349 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 45deg, #662D8C  10%, #ED1E79 */}
        <linearGradient id="prefix__c" x1="95.55%" x2="6.387%" y1="50%" y2="50%">
          <stop offset="0%" stop-color="#ED1E79" />
          <stop offset="100%" stop-color="#662D8C" />
        </linearGradient>
        <path
          id="prefix__b"
          d="M0 0H349L333 85H60.1504C37.1554 85 17.1252 69.3162 11.6099 46.9924L0 0Z"
        // fill="#5E5252"
        />
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(3 1)">
        <use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
        <use fill="url(#prefix__c)" xlinkHref="#prefix__b" />
        <text fill="#FFF">
          <tspan x="40" y="48" fontSize="32" fontFamily="Roboto, Helvetica, Arial, sans-serif">
            Recommendation
          </tspan>
        </text>
      </g>
    </svg>

    <svg className={classes.TheRecommendationLabel} width="212" height="65" viewBox="0 0 212 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path
          id="prefix__ba"
          d="M10 0H212L183.751 66.6998C179.052 77.7933 168.174 85 156.126 85H30.1739C11.3811 85 -2.78472 67.9188 0.691693 49.4504L10 0Z"
          fill="#8e908d" />
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(3 1)">
        <use fill="#000" xlinkHref="#prefix__ba" />
        <text fill="#FFF">
          <tspan x="40" y="48" fontSize="32" fontFamily="Roboto, Helvetica, Arial, sans-serif">
            Fire
          </tspan>
        </text>
      </g>
    </svg>
  </div>)

  return (<>
    <svg>
      {/* <path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent" /> */}
      <path
        d="M 0 0
        l 100 0
        T 180 80
        l 0 100
        l -100 0"
        stroke="black"
        fill="transparent"
      // d="M160 0l-15.12 46.249c-1.112 3.402-4.35 5.651-7.926 5.507L24.159 47.208c-3.14-.127-5.916-2.08-7.094-4.995L0 0h160z"
      />
      <text fill="#FFF">
        <tspan x="27.61" y="33">Recommendation: </tspan>
      </text>
    </svg>
    {/* <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" width="166" height="58" viewBox="0 0 166 58">
      <defs>
        <linearGradient id="prefix__c" x1="95.55%" x2="6.387%" y1="50%" y2="50%">
          <stop offset="0%" stop-color="#0975E0" />
          <stop offset="100%" stop-color="#114BD5" />
        </linearGradient>
        <filter id="prefix__a" width="106.9%" height="120.7%" x="-3.4%" y="-6.7%" filterUnits="objectBoundingBox">
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.5" />
          <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
        </filter>
        <path
          id="#prefix__b"
          d="M160 0l-15.12 46.249c-1.112 3.402-4.35 5.651-7.926 5.507L24.159 47.208c-3.14-.127-5.916-2.08-7.094-4.995L0 0h160z"
        />
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(3 1)">
        <use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
        <use fill="url(#prefix__c)" xlinkHref="#prefix__b" />
        <text fill="#FFF">
          <tspan x="27.61" y="33">GET STARTED</tspan>
        </text>
      </g>
    </svg> */}
  </>
  );
};

export default Recommendation;
