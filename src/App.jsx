import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import AllGamePage from './pages/AllGamePage/AllGamePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// function App() {
//   const styles = {
//     container: {
//       marginBottom: '14px',
//       fontSize: '24px'
//     }
//   };
//   return (
//     <>
//       <StyledContainer>
//         <Header />
//         <MainContainer>
//           <AsideContainer>
//             <StyledAside>
//               <nav>
//                 <div style={styles.container}>
//                   <a href="#">
//                     <span>Home</span>
//                   </a>
//                 </div>
//                 <div style={styles.container}>
//                   <a href="#">
//                     <span>Reviews</span>
//                   </a>
//                 </div>
//                 <div style={styles.container}>
//                   <a href="#" style={styles.container}>
//                     <span>New Releases</span>
//                   </a>
//                   <ul>
//                     <li>
//                       <a href="#">
//                         <span>+</span>
//                         <span>Last 30 days</span>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <span>+</span>
//                         <span>This week</span>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <span>+</span>
//                         <span>Next week</span>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <span>31</span>
//                         <span>Release calendar</span>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </nav>
//             </StyledAside>
//           </AsideContainer>

//           <ContentWrapper>
//             <AllGamePage />
//           </ContentWrapper>
//         </MainContainer>
//       </StyledContainer>
//     </>
//   );
// }

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="games" element={<AllGamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
