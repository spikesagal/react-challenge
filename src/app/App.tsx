import { Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from 'src/components/Layout';
import Pokemons from 'src/components/Pokemons';
import Abilities from 'src/components/Abilities';
import NotFound from 'src/components/NotFound';

const queryClient = new QueryClient();
const App = (): React.ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Pokemons />} />
          <Route path='abilities/' element={<NotFound />} />
          <Route path='abilities/:pokemonName' element={<Abilities />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
