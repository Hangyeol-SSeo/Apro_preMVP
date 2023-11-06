import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    -webkit-touch-callout: none;
    user-select: none;
  }

  :root {
    --vh: 100%;
  }

  .floating-button {
    padding-top: env(safe-area-inset-bottom);
  }

  .default-container {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    background-color: #00A77F;
  }
`;

export default GlobalStyle;