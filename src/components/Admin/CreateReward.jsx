import React, { useState } from 'react';
import { useToast } from '../Common/Toast';
import { createReward } from '../../utils/storage';
import './CreateReward.css';

const CreateReward = ({ onRewardCreated }) => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'token',
    pointsNeeded: '',
    amount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.pointsNeeded) {
      error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const reward = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        pointsNeeded: parseInt(formData.pointsNeeded),
        amount: formData.amount || null,
      };

      createReward(reward);
      success(`Reward "${reward.name}" created successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        type: 'token',
        pointsNeeded: '',
        amount: '',
      });

      if (onRewardCreated) {
        onRewardCreated();
      }
    } catch (err) {
      console.error('Create reward error:', err);
      error('Failed to create reward');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-reward card">
      <h2>Create New Reward</h2>
      <form onSubmit={handleSubmit} className="reward-form">
        <div className="form-group">
          <label htmlFor="name">Reward Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., 100 AstRON Tokens"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the reward..."
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="token">Token</option>
              <option value="nft">NFT</option>
              <option value="item">Item</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pointsNeeded">Points Required *</label>
            <input
              type="number"
              id="pointsNeeded"
              name="pointsNeeded"
              value={formData.pointsNeeded}
              onChange={handleChange}
              placeholder="e.g., 1000"
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (Optional)</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g., 100, 1x, etc."
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Reward'}
        </button>
      </form>
    </div>
  );
};

export default CreateReward;
