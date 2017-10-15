/**
 * theme {}
 * This object stores the general theme for all
 * styled-components nested within Core
 */

const theme = {
  colors: {
    red: '#fb5032', // WS red #f27c5e // #fb7857
    green: '#6eafae', // WS green #7cb7b6
    pink: '#ff9493', // old pink: #fe9591
    purple: '#5361b9',
    palePurple: '#5f5f75',
    blue: '#161533',
    lightBlue: '#82a3b9', // WS blue #82a3b9
    black: '#0f0f17',
    beige: '#faf3d5',
    text: 'rgba(0,0,0,0.85)',
    placeholder: '#f3f3f3',
    grey: {
      mid: '#95989a'
    }
  },
  width: {
    max: '1040px'
  },
  fontFamily: {
    avenir: `'Avenir STD',
      Avenir,
      -apple-system,
      BlinkMacSystemFont,
      San Francisco,
      Helvetica Neue,
      Helvetica,
      Ubuntu,
      Roboto,
      Noto,
      Segoe UI,
      Arial,
      sans-serif`,
    tiempos: `'Tiempos', 'Avenir STD', sans-serif;`
  }
};

export default theme;
