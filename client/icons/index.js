import React from 'react';

/**
 * /icons/index.js
 * Used to contain all our required SVG imports. Each SVG can have its
 * width, height, and className set for customization.
 */
export const BackpackIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <polyline
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points="
  16,10 16,2 32,2 32,10 "
        strokeLinejoin="miter"
      />
      <polyline
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="42,30.9 42,46 6,46 6,30.9 
  "
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        d="M38,32H10c-4.4,0-8-3.6-8-8
  V10h44v14C46,28.4,42.4,32,38,32z"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="12"
        y1="26"
        x2="16"
        y2="26"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="14"
        y1="26"
        x2="14"
        y2="38"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="32"
        y1="26"
        x2="36"
        y2="26"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="34"
        y1="26"
        x2="34"
        y2="38"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

export const BoxIcon = ({ width = 48, height = 48, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <polyline
      data-cap="butt"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      points="4,12 24,21 44,12 "
      strokeLinejoin="miter"
      strokeLinecap="butt"
    />
    <line
      data-cap="butt"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      x1="24"
      y1="21"
      x2="24"
      y2="45"
      strokeLinejoin="miter"
      strokeLinecap="butt"
    />
    <polygon
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      points="44,36 24,45 4,36 
    4,12 24,3 44,12 "
      strokeLinejoin="miter"
    />
  </svg>
);

export const BoxGraphIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <polyline
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="35.99,20.28 41,23 
    46,16 "
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polyline
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="2,24 6,27 10,20 
    16,31 20,23 24,26 28.178,21.183 "
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <rect
        x="2"
        y="5"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        width="44"
        height="38"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="32"
        y1="29"
        x2="32"
        y2="43"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="32"
        y1="5"
        x2="32"
        y2="16"
        strokeLinejoin="miter"
      />
      <circle
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="32"
        cy="20"
        r="4"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

export const ChevronLeft = ({ width = 24, height = 24, className = '' }) => (
  <svg
    className={className}
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const ChevronDown = ({ width = 24, height = 24, className = '' }) => (
  <svg
    className={className}
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const EarthPointIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <path
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M12.536,42.39
  c1.262-0.933,2.23-3.304,2.23-3.304s1.09-0.757,1.431-1.723c0.341-0.966,0.019-2.278,0.019-2.278s0.966-2.836,0.511-3.631
  c-0.455-0.795-2.386-1.307-2.386-1.307s-0.795-1.477-2.443-1.761c-1.08-0.114-2.159-0.852-2.159-2.386s1.534-4.034,1.534-4.034
  s1.591-0.778,1.818-1.346s0.305-1.892,0.305-1.892s1.513-2.67,0.661-4.205c-0.272-0.489-1.534-0.852-1.534-0.852l-1.77-2.655"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M39.784,38.284
  c-1.93-0.925-5.306-1.698-5.306-1.698s-2.467-2.746-4.086-2.519c-1.619,0.227-3.267,2.045-3.267,2.045s0.114,3.352-0.398,3.523
  c-0.511,0.17-1.875-0.739-2.727-0.057c-0.852,0.682-0.361,2.604-0.361,2.604s-1.855,0.578-2.082,1.203s0.675,2.017,0.847,2.551"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M26.95,6.216
  C25.987,6.074,25.002,6,24,6C12.954,6,4,14.954,4,26s8.954,20,20,20s20-8.954,20-20c0-2.089-0.32-4.103-0.915-5.997"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="34"
        y1="18"
        x2="34"
        y2="25"
        strokeLinejoin="miter"
      />
      <circle
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="34"
        cy="10"
        r="8"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

export const ExIcon = ({
  width = 24,
  height = 24,
  className = '',
  fill = '#fff'
}) => (
  <svg
    fill={fill}
    className={className}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const FormListRemoveIcon = ({
  width = 24,
  height = 12,
  className = '',
  fill = 'rgba(0,0,0,0.85)'
}) => (
  <svg
    fill={fill}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const HandsCoinsIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <path
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M8,26h3c3.284,0,6.3,1.462,8,4h6
  c2.907,0,6,3.093,6,6H17"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M29.176,32H39c4.833,0,6,4,6,4
  l-21.203,7.746c-1.647,0.392-3.37,0.33-4.985-0.18L8,39"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <circle
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="33"
        cy="19"
        r="5"
        strokeLinejoin="miter"
      />
      <circle
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="19"
        cy="9"
        r="5"
        strokeLinejoin="miter"
      />
      <rect
        x="2"
        y="24"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        width="6"
        height="16"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

export const LightBulbIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    viewBox="0 0 48 48"
  >
    <path
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      d="M40,18
  c0-8.837-7.163-16-16-16S8,9.163,8,18c0,6.713,4.139,12.451,10,14.826V41h12v-8.174C35.861,30.451,40,24.713,40,18z"
      strokeLinejoin="miter"
    />
    <path
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      d="M16,18
  c0-4.418,3.582-8,8-8"
      strokeLinejoin="miter"
    />
    <line
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      x1="18"
      y1="46"
      x2="30"
      y2="46"
      strokeLinejoin="miter"
    />
  </svg>
);

export const LogoIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <rect
      x="2"
      y="2"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      width="44"
      height="44"
      strokeLinejoin="miter"
    />
    <polyline
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      points="
	9,37 18,26 28,33 39,21 "
      strokeLinejoin="miter"
    />
    <circle
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      cx="20"
      cy="14"
      r="4"
      strokeLinejoin="miter"
    />
  </svg>
);

export const MailIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <polyline
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="10,16.2 2,22 2,46 46,46 
  46,22 38,16.2 "
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polyline
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="10,26.4 10,2 38,2 38,26.4 
  "
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <line
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="2"
        y1="22"
        x2="46"
        y2="46"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <line
        data-cap="butt"
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="46"
        y1="22"
        x2="24"
        y2="34"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="18"
        y1="12"
        x2="30"
        y2="12"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="18"
        y1="20"
        x2="30"
        y2="20"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

export const PaperClipIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <path
        fill="none"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        d="M43.9,22.7L26.3,40.4
  c-5.1,5.1-13.3,5.1-18.4,0l0,0c-5.1-5.1-5.1-13.3,0-18.4L23.4,6.4c3.5-3.5,9.2-3.5,12.7,0l0,0c3.5,3.5,3.5,9.2,0,12.7L22,33.3
  c-2,2-5.1,2-7.1,0l0,0c-2-2-2-5.1,0-7.1l12-12"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

export const PencilIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <line
      data-cap="butt"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      x1="19"
      y1="9"
      x2="15"
      y2="5"
      strokeLinejoin="miter"
      strokeLinecap="butt"
    />
    <polygon
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeLinecap="square"
      strokeMiterlimit="10"
      points="7,21 2,22 3,17 
  18,2 22,6 "
      strokeLinejoin="miter"
    />
  </svg>
);

export const UploadIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <line
        data-cap="butt"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="24"
        y1="36"
        x2="24"
        y2="20"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polyline
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points="18,26 24,20 
  30,26 "
        strokeLinejoin="miter"
      />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        d="M32,38h6
  c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8c0,0,0,0-0.1,0c-0.5-7.8-7-14-14.9-14C15,8,8.4,14.3,8,22.3c-3.5,0.9-6,4-6,7.7c0,4.4,3.6,8,8,8h6"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

/**
 * Company Icons
 */
export const FacebookIcon = () => (
  <svg width="25" viewBox="0 0 25 25">
    <path
      d="M23.62,0H1.38A1.38,1.38,0,0,0,0,1.38V23.62A1.38,1.38,0,0,0,1.38,25h12V15.32H10.1V11.55h3.26V8.76c0-3.23,2-5,4.85-5a26.73,26.73,0,0,1,2.91.15V7.3h-2c-1.57,0-1.87.74-1.87,1.84v2.41H21l-.49,3.77H17.25V25h6.37A1.38,1.38,0,0,0,25,23.62V1.38A1.38,1.38,0,0,0,23.62,0Z"
      fill="#fff"
    />
  </svg>
);

export const GoogleIcon = () => (
  <svg width="25" viewBox="0 0 25 25">
    <path
      d="M24.5,12.78a14.36,14.36,0,0,0-.23-2.56H12.5v4.84h6.73a5.75,5.75,0,0,1-2.49,3.77V22h4a12.19,12.19,0,0,0,3.73-9.19Z"
      fill="#4285f4"
    />
    <path
      d="M12.5,25a11.93,11.93,0,0,0,8.27-3l-4-3.14a7.54,7.54,0,0,1-11.23-4H1.33v3.24A12.5,12.5,0,0,0,12.5,25Z"
      fill="#34a853"
    />
    <path
      d="M5.51,14.88a7.39,7.39,0,0,1,0-4.75V6.89H1.33a12.52,12.52,0,0,0,0,11.23l4.18-3.24Z"
      fill="#fbbc05"
    />
    <path
      d="M12.5,5a6.75,6.75,0,0,1,4.78,1.87l3.59-3.59A12,12,0,0,0,12.5,0,12.5,12.5,0,0,0,1.33,6.89l4.18,3.24A7.45,7.45,0,0,1,12.5,5Z"
      fill="#ea4335"
    />
    <path d="M0,0H25V25H0Z" fill="none" />
  </svg>
);

export const GithubIcon = () => (
  <svg width="25" viewBox="0 0 25 24.47">
    <path
      d="M12.56,0a12.55,12.55,0,0,0-4,24.45c.62.12.85-.27.85-.61V21.71C5.94,22.47,5.2,20,5.2,20a3.32,3.32,0,0,0-1.39-1.83c-1.14-.77.08-.77.08-.77a2.63,2.63,0,0,1,1.93,1.29,2.67,2.67,0,0,0,3.63,1.05h0a2.68,2.68,0,0,1,.77-1.68c-2.76-.3-5.68-1.38-5.68-6.18A4.85,4.85,0,0,1,5.85,8.53,4.51,4.51,0,0,1,6,5.21S7,4.87,9.42,6.49a11.89,11.89,0,0,1,6.28,0c2.4-1.62,3.45-1.29,3.45-1.29a4.51,4.51,0,0,1,.11,3.32,4.84,4.84,0,0,1,1.29,3.37c0,4.82-2.93,5.88-5.73,6.16a3,3,0,0,1,.85,2.31V23.8c0,.42.22.72.86.6A12.55,12.55,0,0,0,12.56,0Z"
      fill="#fff"
    />
  </svg>
);

/**
 * Small Icons, can't adjust size. They're fixed path width
 */
export const BabyFaceIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M8.5,13
  c0.829,0,1.5,0.672,1.5,1.5S9.329,16,8.5,16S7,15.328,7,14.5S7.671,13,8.5,13z M15.5,13c0.828,0,1.5,0.672,1.5,1.5
  S16.328,16,15.5,16S14,15.328,14,14.5S14.672,13,15.5,13z M23,13c0-1.487-1.085-2.713-2.505-2.95C19.273,6.53,15.936,4,12,4
  c-3.936,0-7.273,2.53-8.495,6.05C2.085,10.287,1,11.513,1,13c0,1.486,1.085,2.713,2.505,2.95C4.727,19.471,8.064,22,12,22
  c3.936,0,7.273-2.529,8.495-6.05C21.915,15.713,23,14.486,23,13z M12,7c-0.25-3.583,1.667-5.792,5-6"
    />
  </svg>
);

export const BeerGlassIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeNiterlimit="10"
      d="M17,12h4v4
  c0,1.1-0.9,2-2,2h-2 M17,10.5V23H3V10.5 M15.5,6L15.5,6c-0.3-2.8-2.6-5-5.5-5C7.1,1,4.8,3.2,4.5,6l0,0C3,6,1.9,7.3,2,8.8
  C2.1,10.1,3.3,11,4.6,11H7v4c0,1.1,0.9,2,2,2l0,0c1.1,0,2-0.9,2-2v-4h4.4c1.3,0,2.5-0.9,2.6-2.2C18.1,7.3,17,6,15.5,6z"
    />
  </svg>
);

export const BusIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M17,7v4h3 M16.1,17
  H7.9 M3.1,17H1V6c0-1.1,0.9-2,2-2h18c1.1,0,2,0.9,2,2v11h-2.1 M5.5,15C6.881,15,8,16.119,8,17.5S6.881,20,5.5,20S3,18.881,3,17.5
  S4.119,15,5.5,15z M18.5,15c1.381,0,2.5,1.119,2.5,2.5S19.881,20,18.5,20S16,18.881,16,17.5S17.119,15,18.5,15z M4,7h10v4H4V7z"
    />
  </svg>
);

export const ClockIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M12,1v4 M23,12h-4
   M12,23v-4 M1,12h4 M12,1c6.075,0,11,4.925,11,11s-4.925,11-11,11S1,18.075,1,12S5.925,1,12,1z M8,6l4,6h4"
    />
  </svg>
);

export const CoffeeCupIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M10,1v2 M5,2v2
   M15,2v2 M19,8h4v4c0,1.1-0.9,2-2,2h-2.5 M10,20L10,20c-5,0-9-4-9-9V8h18v3C19,16,15,20,10,20z M1,23h18"
    />
  </svg>
);

export const DesktopMonitorIcon = ({
  width = 24,
  height = 24,
  className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M12,23v-4 M6,23h12
   M12,4c0.553,0,1,0.448,1,1s-0.447,1-1,1c-0.552,0-1-0.448-1-1S11.448,4,12,4z M21,19H3c-1.105,0-2-0.895-2-2V3c0-1.105,0.895-2,2-2
  h18c1.105,0,2,0.895,2,2v14C23,18.105,22.105,19,21,19z M1,15h22"
    />
  </svg>
);

export const DogIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M8,10
  c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S7.448,10,8,10z M16,10c0.553,0,1,0.448,1,1s-0.447,1-1,1s-1-0.448-1-1
  S15.447,10,16,10z M2.997,10.998C1.784,10.085,1,8.634,1,7V1l0,0c2.961,0,5.546,1.608,6.93,4 M21.004,10.998
  C22.216,10.085,23,8.634,23,7V1l0,0c-2.961,0-5.547,1.608-6.93,4 M5.994,21.873C4.272,21.427,3,19.861,3,18v-8c0-2.761,2.239-5,5-5
  h8c2.762,0,5,2.239,5,5v8c0,1.863-1.274,3.43-3,3.874 M12,18.528V19c0,2.209-1.791,4-4,4H6v-5c0-1.656,1.343-3,3-3h0.765 M12,18.056
  V19c0,2.209,1.791,4,4,4h2v-5c0-1.656-1.344-3-3-3h-0.765 M10.766,14h2.468c0.777,0,1.257,0.848,0.857,1.515l-1.234,2.056
  c-0.389,0.648-1.327,0.648-1.715,0l-1.234-2.056C9.509,14.848,9.989,14,10.766,14z"
    />
  </svg>
);

export const FamilyIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M13,23h10v-8.8
  c0-0.739-0.407-1.417-1.059-1.765l-4.008-2.15 M13.077,10.292l-2.35,1.253 M15.5,11L15.5,11C13.016,11,11,8.985,11,6.5v-1
  C11,3.015,13.016,1,15.5,1l0,0C17.984,1,20,3.015,20,5.5v1C20,8.985,17.984,11,15.5,11z M4.592,17.195l-2.487,1.253
  C1.428,18.786,1,19.479,1,20.236V23h12v-2.764c0-0.758-0.428-1.45-1.106-1.789l-2.487-1.254 M7,18L7,18c-2.209,0-4-1.791-4-4v-1
  c0-2.209,1.791-4,4-4l0,0c2.209,0,4,1.791,4,4v1C11,16.209,9.209,18,7,18z"
    />
  </svg>
);

export const FoodBowlIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeNiterlimit="10"
      d="M6,9L1,7 M7.6,7.6
  L2,2 M9.3,7c0.8-2.4,3-4,5.7-4c3.3,0,6,2.7,6,6c0,1.1-0.3,2.1-0.8,3 M5,12c0-2.8,2.2-5,5-5s5,2.2,5,5 M1.7,16h20.6 M12,23
  c6.1,0,11-4.9,11-11H1C1,18.1,5.9,23,12,23z"
    />
  </svg>
);

export const MedicalCrossIcon = ({
  width = 24,
  height = 24,
  className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M12,1
  c6.075,0,11,4.925,11,11s-4.925,11-11,11S1,18.075,1,12S5.925,1,12,1z M18,10h-4V6h-4v4H6v4h4v4h4v-4h4V10z"
    />
  </svg>
);

export const MoneyFolderIcon = ({
  width = 24,
  height = 24,
  className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M23,23H1V1h8l3,4h11V23z M9,16.5
  L9,16.5c0,1.4,1.1,2.5,2.5,2.5h1c1.4,0,2.5-1.1,2.5-2.5l0,0c0-3.5-6-1.5-6-5l0,0C9,10.1,10.1,9,11.5,9h1c1.4,0,2.5,1.1,2.5,2.5
   M12,8v12"
    />
  </svg>
);

export const GlobeIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M11,19v4 M11,3
  c3.313,0,6,2.687,6,6s-2.687,6-6,6s-6-2.687-6-6S7.687,3,11,3z M6,23h10 M3.01,15.001C4.832,17.428,7.73,19,11,19
  c5.523,0,10-4.477,10-10c0-3.269-1.572-6.167-3.999-7.99"
    />
  </svg>
);

export const PersonSpeakingIcon = ({
  width = 24,
  height = 24,
  className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
  >
    <path
      transform="translate(0.5, 0.5)"
      fill="none"
      stroke="#444444"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M15,22H1v-2.312
  c0-1.213,0.725-2.308,1.846-2.772C3.981,16.445,5.67,16,8,16s4.02,0.445,5.154,0.916C14.275,17.38,15,18.475,15,19.688V22z M8,5
  c2.209,0,4,1.791,4,4s-1.791,4-4,4s-4-1.791-4-4S5.791,5,8,5z M17.001,6.355C17.623,7.06,18,7.986,18,9s-0.378,1.94-1,2.646
   M20.001,2.293C21.842,3.941,23,6.335,23,9s-1.158,5.061-2.999,6.708"
    />
  </svg>
);

export const SearchIcon = ({ width = 25, height = 25, className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 25 25"
  >
    <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z" />
  </svg>
);

export const FilterIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <g strokeWidth="2" transform="translate(0, 0)">
      <line
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="14"
        y1="4"
        x2="23"
        y2="4"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="1"
        y1="4"
        x2="4"
        y2="4"
        strokeLinejoin="miter"
      />
      <line
        data-color="color-2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="22"
        y1="12"
        x2="23"
        y2="12"
        strokeLinejoin="miter"
      />
      <line
        data-color="color-2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="1"
        y1="12"
        x2="12"
        y2="12"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="14"
        y1="20"
        x2="23"
        y2="20"
        strokeLinejoin="miter"
      />
      <line
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        x1="1"
        y1="20"
        x2="4"
        y2="20"
        strokeLinejoin="miter"
      />
      <circle
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="7"
        cy="4"
        r="3"
        strokeLinejoin="miter"
      />
      <circle
        data-color="color-2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="15"
        cy="12"
        r="3"
        strokeLinejoin="miter"
      />
      <circle
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        cx="7"
        cy="20"
        r="3"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);
