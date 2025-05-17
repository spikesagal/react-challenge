import { PokemonClient } from 'pokenode-ts';
import { buildWebStorage } from 'axios-cache-interceptor';

// Here the response data per unique request actually caches on local
// storage, so the cache will be served between reloads and in new
// sessions
const REQUEST_CACHE_TTL = 1000 * 60 * 5; // 5 minutes
const REQUEST_CACHE_STORAGE = buildWebStorage(localStorage, 'axios-cache:');

const api = new PokemonClient({
  cacheOptions: {
    storage: REQUEST_CACHE_STORAGE,
    ttl: REQUEST_CACHE_TTL
  }
});

export default api;
