export const colors = {
  white: '255, 255, 255',
  black: '0, 0, 0',
  dark: '17, 23, 31',
  grey: '221, 221, 221',
  lightGrey: '238, 238, 238',
  darkGrey: '128, 128, 128',
  blue: '97, 218, 251',
  lightBlue: '197, 242, 255',
  brightBlue: '58, 113, 242',
  navyBlue: '17, 23, 31',
  gold: '246, 203, 71',
  green: '0, 163, 106',
  lightGreen: '10, 255, 162',
  red: '221, 69, 65'
};

export const fonts = {
  tiny: '10px',
  small: '12px',
  medium: '16px',
  large: '18px',
  big: '22px',
  h1: '42px',
  h2: '32px',
  h3: '24px',
  h4: '20px',
  h5: '17px',
  h6: '14px'
};

export const transitions = {
  short: 'all 0.1s ease-in-out',
  base: 'all 0.2s ease-in-out',
  long: 'all 0.3s ease-in-out'
};

export const responsive = {
  short: {
    min: 'min-height: 479px',
    max: 'max-height: 480px'
  },
  xxs: {
    min: 'min-width: 359px',
    max: 'max-width: 360px'
  },
  xs: {
    min: 'min-width: 479px',
    max: 'max-width: 480px'
  },
  sm: {
    min: 'min-width: 639px',
    max: 'max-width: 640px'
  },
  md: {
    min: 'min-width: 959px',
    max: 'max-width: 960px'
  },
  lg: {
    min: 'min-width: 1023px',
    max: 'max-width: 1024px'
  },
  xl: {
    min: 'min-width: 1399px',
    max: 'max-width: 1400px'
  }
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

  html, body, #root, #router-root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: rgb(${colors.navyBlue});
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: ${fonts.medium};
    color: rgb(${colors.white});
    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button:active,
  button:focus,
  button.active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: none;
            box-shadow: none;
  }

  [tabindex] {
    outline: none;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box !important;
  }

  button {
    border-style: none;
    line-height: 1em;
  }
`;
