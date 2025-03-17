import { StyledContainer } from './components/Container/Container.styled';
import { Header } from './components/Header/Header';
import { MainContentWrapper } from './components/MainContentWrapper/MainContentWrapper';

function App() {
  return (
    <>
      <StyledContainer>
        <Header />
        <MainContentWrapper />
      </StyledContainer>
    </>
  );
}

export default App;
