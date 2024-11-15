import { useState } from 'react';
import { Search } from 'lucide-react';
import RecipeCard from './Components/RecipeCard';

const APP_ID = 'e9595357';
const APP_KEY = 'b3a598d6972b38e9d0264e6970bde9bb';
const USER_ID = 'shadosx';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          method: 'GET',
          headers: {
            'Edamam-Account-User': USER_ID,
          },
        }
      );
      const data = await response.json();
      if (data.count === 0) {
        setError('No recipes found for the given search.');
        setRecipes([]);
      } else {
        setRecipes(data.hits.map((hit) => hit.recipe));
        setError('');
      }
    } catch {
      setError('An error occurred while fetching recipes.');
      setRecipes([]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchRecipes();
    }
  };

  return (
    <div className="App bg-gradient-to-br from-indigo-500 to-purple-700 min-h-screen">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-5xl text-white font-bold mb-8">Recipe Finder</h1>
        
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <Search className="text-gray-500 ml-4" size={24} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search for a recipe..."
              className="outline-none bg-transparent w-full text-gray-700 px-4 py-2"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex justify-center p-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md max-w-lg" role="alert">
            <span className="font-semibold">Oops!</span> {error}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
        {recipes.length === 0 && !error ? (
          <div className="text-white text-center text-lg col-span-full">
            Start by searching for a recipe above!
          </div>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
