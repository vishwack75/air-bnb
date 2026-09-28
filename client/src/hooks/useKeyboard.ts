import { useEffect } from 'react';

type KeyHandlerMap = {
  [key: string]: () => void;
};

export function useKeyboard(keyMap: KeyHandlerMap, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyMap[event.key]) {
        event.preventDefault();
        keyMap[event.key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyMap, active]);
}
