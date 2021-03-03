import React from 'react';

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import Button from '@/components/ui/Button';

import { IButtonProps } from '@/definitions/ui';

describe('Button', () => {
  const buttonId = 'button';
  let handlePress: any;
  let dom;
  let buttonElement: Element;

  const renderButton = (props?: Partial<IButtonProps>) => {
    handlePress = jest.fn();
    dom = render(
      <Button
        id={buttonId}
        onPress={handlePress}
        {...props}
      >
        {props?.children || 'Button title'}
      </Button>,
    );
    buttonElement = dom.container.querySelector(`#${buttonId}`) as Element;
  };

  afterEach(() => {
    cleanup();
  });

  it('Renders component', () => {
    renderButton();
    expect(buttonElement).toBeInTheDocument();
  });

  it('Renders children as a component', () => {
    const childId = 'child-component';
    renderButton({
      children: (
        <div data-testid={childId}>
          Child test
        </div>
      ),
    });

    expect(screen.getByTestId(childId)).toBeInTheDocument();
  });

  it('Handles click', () => {
    renderButton();
    fireEvent.click(buttonElement);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('Renders "Загрузка..." when loading', () => {
    renderButton({
      isLoading: true,
    });

    expect(buttonElement).toHaveTextContent('Загрузка...');
  });

  it('Has "button--full-width" class when isFullWidth=true', () => {
    renderButton({
      isFullWidth: true,
    });

    expect(buttonElement).toHaveClass('button--full-width');
  });
});
