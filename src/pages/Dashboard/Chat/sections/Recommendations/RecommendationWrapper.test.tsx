import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { RecommendationWrapper } from './RecommendationWrapper';

describe('RecommendationWrapper', () => {
  it('renders title correctly', () => {
    render(<RecommendationWrapper title="Test Title">Content</RecommendationWrapper>);
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<RecommendationWrapper title="Test Title"><div>Test Content</div></RecommendationWrapper>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('shows See All button when onSeeAll provided', () => {
    render(<RecommendationWrapper title="Test Title" onSeeAll={vi.fn()}>Content</RecommendationWrapper>);
    expect(screen.getByRole('button', { name: 'See all recommendations' })).toBeInTheDocument();
  });

  it('hides See All button when onSeeAll not provided', () => {
    render(<RecommendationWrapper title="Test Title">Content</RecommendationWrapper>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onSeeAll callback when button clicked', async () => {
    const onSeeAll = vi.fn();
    const user = userEvent.setup();
    render(<RecommendationWrapper title="Test Title" onSeeAll={onSeeAll}>Content</RecommendationWrapper>);
    
    await user.click(screen.getByRole('button', { name: 'See all recommendations' }));
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });

  it('displays custom seeAllText', () => {
    render(
      <RecommendationWrapper title="Test Title" onSeeAll={vi.fn()} seeAllText="Custom Text">
        Content
      </RecommendationWrapper>
    );
    expect(screen.getByRole('button', { name: 'Custom Text' })).toBeInTheDocument();
  });
});
