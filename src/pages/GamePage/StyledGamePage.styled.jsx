import styled from 'styled-components';

export const BackgroundImageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;

  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      /* сверху — ещё темнее */ rgba(0, 0, 0, 0.9) 60%,
      /* середина */ rgba(0, 0, 0, 1) 90%,
      /* почти чёрный */ rgba(0, 0, 0, 1) 100% /* низ — абсолютно чёрный */
    ),
    url(${(props) => props.image});

  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;

  transition: background-image 0.3s ease-in-out;
`;
