import { lazy, Suspense } from 'react';
import Loading from './Components/Loading';
const DrawerAppBar = lazy(() => import('./Components/DrawerAppBar'));


function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <div className="App">
        <DrawerAppBar />
      </div>
    </Suspense>
  );
}

export default App;
