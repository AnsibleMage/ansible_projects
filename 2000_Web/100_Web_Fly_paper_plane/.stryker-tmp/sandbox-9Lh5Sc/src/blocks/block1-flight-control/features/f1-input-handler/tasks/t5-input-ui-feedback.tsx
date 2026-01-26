/**
 * Task 1.1.5: Input UI Feedback
 *
 * Visual feedback component for debugging and learning.
 * Displays current keyboard and mouse input states in real-time.
 *
 * @example
 * <InputFeedbackUI
 *   keyboardState={keyboardState}
 *   mouseState={mouseState}
 *   visible={true}
 * />
 */
// @ts-nocheck


import React from 'react'
import type { KeyboardState } from './t1-keyboard-input'
import type { MouseState } from './t2-mouse-input'

export interface InputFeedbackProps {
  keyboardState: KeyboardState
  mouseState: MouseState
  visible: boolean
}

const styles = {
  container: {
    position: 'fixed' as const,
    top: '10px',
    right: '10px',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    fontFamily: 'monospace',
    fontSize: '14px',
    borderRadius: '8px',
    zIndex: 9999,
    minWidth: '220px',
  },
  section: {
    marginBottom: '12px',
  },
  title: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  keyContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4px',
    marginBottom: '8px',
  },
  key: {
    padding: '8px',
    backgroundColor: '#333',
    textAlign: 'center' as const,
    borderRadius: '4px',
    fontSize: '12px',
    transition: 'all 0.1s ease',
  },
  keyActive: {
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
  },
  keyEmpty: {
    backgroundColor: 'transparent',
  },
  mouseInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  mouseItem: {
    padding: '4px 8px',
    backgroundColor: '#333',
    borderRadius: '4px',
    fontSize: '12px',
  },
  mouseClicked: {
    backgroundColor: '#2196F3',
    boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
  },
}

export const InputFeedbackUI: React.FC<InputFeedbackProps> = ({
  keyboardState,
  mouseState,
  visible,
}) => {
  if (!visible) {
    return null
  }

  const getKeyStyle = (isActive: boolean) => {
    return {
      ...styles.key,
      ...(isActive ? styles.keyActive : {}),
    }
  }

  const getKeyClassName = (isActive: boolean) => {
    return isActive ? 'active' : ''
  }

  const getMouseClickStyle = () => {
    return {
      ...styles.mouseItem,
      ...(mouseState.isClicked ? styles.mouseClicked : {}),
    }
  }

  const getMouseClickClassName = () => {
    return mouseState.isClicked ? 'clicked' : ''
  }

  return (
    <div style={styles.container} data-testid="input-feedback">
      {/* Keyboard Section */}
      <div style={styles.section}>
        <div style={styles.title}>Keyboard</div>
        <div style={styles.keyContainer}>
          <div style={styles.keyEmpty}></div>
          <div
            style={getKeyStyle(keyboardState.forward)}
            className={getKeyClassName(keyboardState.forward)}
            data-testid="key-forward"
          >
            ↑ W
          </div>
          <div style={styles.keyEmpty}></div>

          <div
            style={getKeyStyle(keyboardState.left)}
            className={getKeyClassName(keyboardState.left)}
            data-testid="key-left"
          >
            ← A
          </div>
          <div
            style={getKeyStyle(keyboardState.backward)}
            className={getKeyClassName(keyboardState.backward)}
            data-testid="key-backward"
          >
            ↓ S
          </div>
          <div
            style={getKeyStyle(keyboardState.right)}
            className={getKeyClassName(keyboardState.right)}
            data-testid="key-right"
          >
            → D
          </div>
        </div>
      </div>

      {/* Mouse Section */}
      <div style={styles.section}>
        <div style={styles.title}>Mouse</div>
        <div style={styles.mouseInfo}>
          <div style={styles.mouseItem}>deltaX: {mouseState.deltaX}</div>
          <div style={styles.mouseItem}>deltaY: {mouseState.deltaY}</div>
          <div
            style={getMouseClickStyle()}
            className={getMouseClickClassName()}
            data-testid="mouse-click"
          >
            {mouseState.isClicked ? '🖱️ Clicked' : '🖱️ Not Clicked'}
          </div>
        </div>
      </div>
    </div>
  )
}
