import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../Common/Toast';
import { RECIPES } from '../../utils/constants';
import { canCraftRecipe } from '../../utils/helpers';
import { updateResources, updatePoints, addCraftingHistory } from '../../utils/storage';
import RecipeCard from './RecipeCard';
import CraftingModal from './CraftingModal';
import './Factory.css';

const Factory = () => {
  const { address } = useWallet();
  const { userData, refreshUserData } = useGame();
  const { success, error } = useToast();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCrafting, setIsCrafting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const userResources = userData?.resources || {};

  const filteredRecipes = RECIPES.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCraftClick = (recipe) => {
    if (canCraftRecipe(recipe, userResources)) {
      setSelectedRecipe(recipe);
    }
  };

  const handleConfirmCraft = async () => {
    if (!selectedRecipe) return;

    setIsCrafting(true);

    try {
      // Simulate crafting (in real app, this would interact with smart contract)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Deduct resources
      selectedRecipe.requirements.forEach(req => {
        updateResources(address, req.resource, req.amount, false);
      });

      // Add points
      updatePoints(address, selectedRecipe.output, true);

      // Add to crafting history
      addCraftingHistory(address, selectedRecipe);

      refreshUserData();
      success(`Successfully crafted ${selectedRecipe.name}! +${selectedRecipe.output} points`);
      setSelectedRecipe(null);
    } catch (err) {
      console.error('Crafting error:', err);
      error('Failed to craft item');
    } finally {
      setIsCrafting(false);
    }
  };

  return (
    <div className="factory">
      <div className="factory-header">
        <div>
          <h1>⚙️ Factory</h1>
          <p className="page-description text-secondary">
            Craft items using resources collected from planets. Each craft rewards you with points!
          </p>
        </div>
      </div>

      <div className="factory-controls card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="recipe-count">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} available
        </div>
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            userResources={userResources}
            onCraft={handleCraftClick}
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="empty-state card">
          <h3>No recipes found</h3>
          <p>Try adjusting your search terms.</p>
        </div>
      )}

      <CraftingModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
        onConfirm={handleConfirmCraft}
        isCrafting={isCrafting}
      />
    </div>
  );
};

export default Factory;
