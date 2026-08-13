import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { WelcomeState } from '.';

describe('WelcomeState', () => {
  const prompts = [
    'Plan a trip to Paris',
    'Find hotels in Tokyo',
    'Suggest places in Vietnam',
  ];

  it('renders welcome title', () => {
    render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={vi.fn()}
      />
    );

    expect(
      screen.getByText("Let’s Plan Your Next Adventure")
    ).toBeInTheDocument();
  });


  it('matches the design typography for the title and prompt text', () => {
    render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={vi.fn()}
      />
    );

    expect(screen.getByRole('heading')).toHaveClass(
      'font-bold',
      'lg:text-display-title',
    );
    expect(screen.getByRole('button', { name: prompts[0] })).toHaveClass(
      'font-normal',
      'text-slate-500',
      'lg:text-base',
      'lg:leading-6',
    );
  });


  it('renders all prompt buttons', () => {
    render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={vi.fn()}
      />
    );

    prompts.forEach((prompt) => {
      expect(
        screen.getByText(prompt)
      ).toBeInTheDocument();
    });
  });

  it('keeps the 1440px layout and restores document flow above it', () => {
    const { container } = render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={vi.fn()}
      />
    );

    expect(container.firstElementChild).toHaveClass(
      'desktop:absolute',
      'min-[1441px]:relative',
      'min-[1441px]:flex-1',
    );
  });


  it('calls onSelectPrompt when clicking prompt button', async () => {
    const user = userEvent.setup();

    const onSelectPrompt = vi.fn();

    render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={onSelectPrompt}
      />
    );


    await user.click(
      screen.getByText('Plan a trip to Paris')
    );


    expect(onSelectPrompt)
      .toHaveBeenCalledTimes(1);

    expect(onSelectPrompt)
      .toHaveBeenCalledWith(
        'Plan a trip to Paris'
      );
  });


  it('renders images correctly', () => {
    render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={vi.fn()}
      />
    );


    expect(
      screen.getByAltText('Nature')
    ).toBeInTheDocument();


    expect(
      screen.getByAltText('Travel group')
    ).toBeInTheDocument();


    expect(
      screen.getByAltText('Resort beach')
    ).toBeInTheDocument();
  });


  it('renders empty state when prompts is empty', () => {
    render(
      <WelcomeState
        prompts={[]}
        onSelectPrompt={vi.fn()}
      />
    );


    expect(
      screen.queryByRole('button')
    ).not.toBeInTheDocument();
  });


  it('does not crash without prompts', () => {
    expect(() =>
      render(
        <WelcomeState
          prompts={[]}
          onSelectPrompt={vi.fn()}
        />
      )
    ).not.toThrow();
  });


  it('renders correct number of prompt buttons', () => {
    render(
      <WelcomeState
        prompts={prompts}
        onSelectPrompt={vi.fn()}
      />
    );


    const buttons = screen.getAllByRole('button');


    expect(buttons)
      .toHaveLength(prompts.length);
  });

  it('renders all default prompts and dispatches prompts from every row', async () => {
    const user = userEvent.setup();
    const onSelectPrompt = vi.fn();
    render(<WelcomeState onSelectPrompt={onSelectPrompt} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);

    for (const button of buttons) {
      await user.click(button);
    }

    expect(onSelectPrompt).toHaveBeenCalledTimes(6);
    expect(onSelectPrompt).toHaveBeenLastCalledWith(
      'Routes from Miami to Long Island Beach',
    );
  });
});
