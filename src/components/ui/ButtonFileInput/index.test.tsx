import React from 'react';

import {
  cleanup, fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';

import ButtonFileInput from '@/components/ui/ButtonFileInput/index';

import { IButtonFileInputProps } from '@/definitions/ui';

describe('Button', () => {
  const id = 'button-file-input';
  const children = 'Button title';
  let handleChange: any;
  let dom: RenderResult;
  let element: Element;

  const renderButtonFileInput = (props?: Partial<IButtonFileInputProps>) => {
    handleChange = jest.fn();
    dom = render(
      <ButtonFileInput
        id={id}
        onFilesChange={handleChange}
        {...props}
      >
        {props?.children || children}
      </ButtonFileInput>,
    );

    element = dom.container.querySelector(`#${id}`) as Element;
  };

  afterEach(() => {
    cleanup();
  });

  it('Renders component', () => {
    renderButtonFileInput();

    expect(element).toBeInTheDocument();
  });

  it('Renders children as a component', () => {
    const childId = 'child-component';
    renderButtonFileInput({
      children: (
        <div data-testid={childId}>
          Child test
        </div>
      ),
    });

    expect(screen.getByTestId(childId)).toBeInTheDocument();
  });

  it('Renders input element', () => {
    renderButtonFileInput();

    const inputElement = dom.container.querySelector('input');

    expect(inputElement).toBeInTheDocument();
  });

  it('Fires onFilesChange event', () => {
    renderButtonFileInput();

    const inputElement = dom.container.querySelector('input') as Element;

    fireEvent.change(inputElement, {
      target: {
        files: [new File(['123'], 'image.png', { type: 'image/png' })],
      },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
