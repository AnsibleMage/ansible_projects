import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InputFeedbackUI } from './t5-input-ui-feedback'
import type { KeyboardState } from './t1-keyboard-input'
import type { MouseState } from './t2-mouse-input'

describe('Task 1.1.5: Input UI Feedback', () => {
  const defaultKeyboardState: KeyboardState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  }

  const defaultMouseState: MouseState = {
    deltaX: 0,
    deltaY: 0,
    isClicked: false,
  }

  describe('Rendering', () => {
    it('should render when visible is true', () => {
      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const container = screen.getByTestId('input-feedback')
      expect(container).toBeInTheDocument()
      expect(container).toHaveStyle({
        position: 'fixed',
      })
    })

    it('should not render when visible is false', () => {
      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={false}
        />
      )

      expect(screen.queryByTestId('input-feedback')).not.toBeInTheDocument()
    })
  })

  describe('Keyboard State Display', () => {
    it('should display forward key state', () => {
      const keyboardState: KeyboardState = {
        ...defaultKeyboardState,
        forward: true,
      }

      render(
        <InputFeedbackUI
          keyboardState={keyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const forwardElement = screen.getByTestId('key-forward')
      expect(forwardElement).toHaveClass('active')
      expect(forwardElement).toHaveStyle({ backgroundColor: '#4CAF50' })
    })

    it('should display backward key state', () => {
      const keyboardState: KeyboardState = {
        ...defaultKeyboardState,
        backward: true,
      }

      render(
        <InputFeedbackUI
          keyboardState={keyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const backwardElement = screen.getByTestId('key-backward')
      expect(backwardElement).toHaveClass('active')
    })

    it('should display left key state', () => {
      const keyboardState: KeyboardState = {
        ...defaultKeyboardState,
        left: true,
      }

      render(
        <InputFeedbackUI
          keyboardState={keyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const leftElement = screen.getByTestId('key-left')
      expect(leftElement).toHaveClass('active')
    })

    it('should display right key state', () => {
      const keyboardState: KeyboardState = {
        ...defaultKeyboardState,
        right: true,
      }

      render(
        <InputFeedbackUI
          keyboardState={keyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const rightElement = screen.getByTestId('key-right')
      expect(rightElement).toHaveClass('active')
    })

    it('should highlight multiple active keys simultaneously', () => {
      const keyboardState: KeyboardState = {
        forward: true,
        backward: false,
        left: true,
        right: false,
      }

      render(
        <InputFeedbackUI
          keyboardState={keyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      expect(screen.getByTestId('key-forward')).toHaveClass('active')
      expect(screen.getByTestId('key-left')).toHaveClass('active')
      expect(screen.getByTestId('key-backward')).not.toHaveClass('active')
      expect(screen.getByTestId('key-right')).not.toHaveClass('active')
    })

    it('should not highlight inactive keys', () => {
      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const forwardElement = screen.getByTestId('key-forward')
      expect(forwardElement).not.toHaveClass('active')
      expect(forwardElement).toHaveStyle({ backgroundColor: '#333' })

      expect(screen.getByTestId('key-backward')).not.toHaveClass('active')
      expect(screen.getByTestId('key-left')).not.toHaveClass('active')
      expect(screen.getByTestId('key-right')).not.toHaveClass('active')
    })
  })

  describe('Mouse State Display', () => {
    it('should display mouse deltaX', () => {
      const mouseState: MouseState = {
        deltaX: 150,
        deltaY: 0,
        isClicked: false,
      }

      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={mouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaX: 150/)).toBeInTheDocument()
    })

    it('should display mouse deltaY', () => {
      const mouseState: MouseState = {
        deltaX: 0,
        deltaY: -75,
        isClicked: false,
      }

      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={mouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaY: -75/)).toBeInTheDocument()
    })

    it('should display mouse click state when clicked', () => {
      const mouseState: MouseState = {
        deltaX: 0,
        deltaY: 0,
        isClicked: true,
      }

      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={mouseState}
          visible={true}
        />
      )

      const clickElement = screen.getByTestId('mouse-click')
      expect(clickElement).toHaveClass('clicked')
      expect(clickElement).toHaveStyle({ backgroundColor: '#2196F3' })
      expect(clickElement).toHaveTextContent('🖱️ Clicked')
    })

    it('should not highlight click state when not clicked', () => {
      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const clickElement = screen.getByTestId('mouse-click')
      expect(clickElement).not.toHaveClass('clicked')
      expect(clickElement).toHaveTextContent('🖱️ Not Clicked')
    })
  })

  describe('State Updates', () => {
    it('should update display when keyboard state changes', () => {
      const { rerender } = render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      expect(screen.getByTestId('key-forward')).not.toHaveClass('active')

      const newKeyboardState: KeyboardState = {
        ...defaultKeyboardState,
        forward: true,
      }

      rerender(
        <InputFeedbackUI
          keyboardState={newKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      expect(screen.getByTestId('key-forward')).toHaveClass('active')
    })

    it('should update display when mouse state changes', () => {
      const { rerender } = render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaX: 0/)).toBeInTheDocument()

      const newMouseState: MouseState = {
        deltaX: 250,
        deltaY: 0,
        isClicked: false,
      }

      rerender(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={newMouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaX: 250/)).toBeInTheDocument()
    })
  })

  describe('Style Verification', () => {
    it('should apply correct key styles', () => {
      const keyboardState: KeyboardState = {
        forward: true,
        backward: false,
        left: false,
        right: false,
      }

      render(
        <InputFeedbackUI
          keyboardState={keyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const forwardKey = screen.getByTestId('key-forward')
      const backwardKey = screen.getByTestId('key-backward')

      // Active key
      expect(forwardKey).toHaveStyle({
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        backgroundColor: '#4CAF50',
      })

      // Inactive key
      expect(backwardKey).toHaveStyle({
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        backgroundColor: '#333',
      })
    })

    it('should apply correct mouse styles', () => {
      const mouseState: MouseState = {
        deltaX: 100,
        deltaY: 50,
        isClicked: true,
      }

      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={mouseState}
          visible={true}
        />
      )

      const deltaXElement = screen.getByText(/deltaX: 100/)
      const clickElement = screen.getByTestId('mouse-click')

      expect(deltaXElement).toHaveStyle({
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
      })

      expect(clickElement).toHaveStyle({
        backgroundColor: '#2196F3',
      })
    })

    it('should apply correct container padding', () => {
      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      const container = screen.getByTestId('input-feedback')
      expect(container).toHaveStyle({
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero values correctly', () => {
      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={defaultMouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaX: 0/)).toBeInTheDocument()
      expect(screen.getByText(/deltaY: 0/)).toBeInTheDocument()
    })

    it('should handle negative mouse deltas', () => {
      const mouseState: MouseState = {
        deltaX: -100,
        deltaY: -50,
        isClicked: false,
      }

      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={mouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaX: -100/)).toBeInTheDocument()
      expect(screen.getByText(/deltaY: -50/)).toBeInTheDocument()
    })

    it('should handle large mouse deltas', () => {
      const mouseState: MouseState = {
        deltaX: 9999,
        deltaY: -9999,
        isClicked: false,
      }

      render(
        <InputFeedbackUI
          keyboardState={defaultKeyboardState}
          mouseState={mouseState}
          visible={true}
        />
      )

      expect(screen.getByText(/deltaX: 9999/)).toBeInTheDocument()
      expect(screen.getByText(/deltaY: -9999/)).toBeInTheDocument()
    })
  })
})
