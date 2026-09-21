import { Flame, Leaf } from 'lucide-react';
const RecipeCard = ({
  recipe
}) => {
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-3">{recipe.name}</h3>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Flame size={14} className="text-orange-400" />
        {recipe.calories} kcal
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
        <div className="bg-gray-50 rounded-lg py-2">
          <p className="font-semibold text-gray-800">{recipe.protein}g</p>
          <p className="text-gray-400">Protein</p>
        </div>
        <div className="bg-gray-50 rounded-lg py-2">
          <p className="font-semibold text-gray-800">{recipe.carbs}g</p>
          <p className="text-gray-400">Carbs</p>
        </div>
        <div className="bg-gray-50 rounded-lg py-2">
          <p className="font-semibold text-gray-800">{recipe.fat}g</p>
          <p className="text-gray-400">Fat</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {recipe.tags.map(tag => <span key={tag} className="flex items-center gap-1 text-xs text-brand-700 bg-brand-50 px-2 py-1 rounded-full">
            <Leaf size={10} /> {tag}
          </span>)}
      </div>
    </div>;
};
export default RecipeCard;