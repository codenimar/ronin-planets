import React from 'react';
import Modal from '../Common/Modal';
import { formatNumber } from '../../utils/helpers';
import './RecipeCard.css';

const CraftingModal = ({ isOpen, onClose, recipe, onConfirm, isCrafting }) => {
  if (!recipe) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Craft Item" size="medium">
      <div className="crafting-modal">
        <div className="modal-recipe-info">
          <h3>{recipe.name}</h3>
          <p className="text-secondary">{recipe.description}</p>
        </div>

        <div className="modal-requirements">
          <h4>Materials Required:</h4>
          <div className="requirements-list">
            {recipe.requirements.map((req) => (
              <div key={req.resource} className="requirement-item">
                <span className="req-resource">{req.resource}</span>
                <span className="req-amount">×{formatNumber(req.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-reward">
          <h4>Reward:</h4>
          <div className="reward-display">
            <span className="reward-value text-cyan">+{recipe.output} Points</span>
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={isCrafting}
          >
            Cancel
          </button>
          <button 
            className="btn btn-success" 
            onClick={onConfirm}
            disabled={isCrafting}
          >
            {isCrafting ? (
              <>
                <span className="spinner"></span>
                Crafting...
              </>
            ) : (
              'Confirm Craft'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CraftingModal;
