import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => (
  <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 duration-300">
    <img
      className="w-full h-48 object-cover rounded-t-xl"
      src={recipe.image}
      alt={recipe.label}
    />
    <div className="px-6 py-4">
      <h2 className="font-bold text-xl mb-3 text-indigo-600">{recipe.label}</h2>
      <p className="text-gray-500 font-medium mb-2">Ingredients:</p>
      <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  </div>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default RecipeCard;
