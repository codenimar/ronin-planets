import React from 'react';
import { canCraftRecipe, formatNumber } from '../../utils/helpers';
import './RecipeCard.css';

const RecipeCard = ({ recipe, userResources, onCraft }) => {
  const canCraft = canCraftRecipe(recipe, userResources);

  return (
    <div className="recipe-card card">
      <div className="recipe-header">
        <h3>{recipe.name}</h3>
        <div className="recipe-output text-cyan">+{recipe.output} Points</div>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-requirements">
        <h4>Required Materials:</h4>
        <div className="requirements-list">
          {recipe.requirements.map((req) => {
            const userAmount = userResources[req.resource] || 0;
            const hasEnough = userAmount >= req.amount;
            
            return (
              <div key={req.resource} className={`requirement-item ${hasEnough ? 'has-enough' : 'not-enough'}`}>
                <span className="req-resource">{req.resource}</span>
                <span className="req-amounts">
                  <span className={hasEnough ? 'text-green' : 'text-red'}>
                    {formatNumber(userAmount)}
                  </span>
                  <span className="text-muted"> / {formatNumber(req.amount)}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <button
        className="btn btn-primary btn-craft"
        onClick={() => onCraft(recipe)}
        disabled={!canCraft}
      >
        {canCraft ? `Craft for ${recipe.output} Points` : 'Insufficient Materials'}
      </button>
    </div>
  );
};

export default RecipeCard;
