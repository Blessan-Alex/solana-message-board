import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlassButton } from '@/components/ui/GlassButton';

describe('GlassButton', () => {
  it('renders button with children', () => {
    render(<GlassButton>Test Button</GlassButton>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<GlassButton onClick={handleClick}>Click Me</GlassButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<GlassButton loading>Loading</GlassButton>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<GlassButton loading>Loading</GlassButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant classes', () => {
    render(<GlassButton variant="secondary">Secondary</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/10');
  });

  it('applies correct size classes', () => {
    render(<GlassButton size="lg">Large</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
  });
});
