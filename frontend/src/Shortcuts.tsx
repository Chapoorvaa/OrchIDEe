import React, { useState, useEffect } from 'react';

type ShortcutKeys = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  callback: () => void;
};

const useShortcut = (shortcuts: ShortcutKeys[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        const {
          key,
          ctrlKey = false,
          shiftKey = false,
          callback,
        } = shortcut;

        if (event.key === key && event.ctrlKey === ctrlKey && event.shiftKey === shiftKey) {
          event.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};

const Shortcut: React.FC = ({ settingsFunction }) => {
  const handleSave = () => {
    console.log('Save shortcut');
    // TODO: Ajouter la fonction de sauvegarde
  };

  useShortcut([
    {
      key: 's',
      ctrlKey: true,
      shiftKey: false,
      callback: handleSave,
    },
  ]);

  const handleZoomIn = () => {
    console.log('Zoom in shortcut');
    // TODO: Ajouter la fonction de zoom in
  };

  useShortcut([
    {
      key: '+',
      ctrlKey: true,
      shiftKey: false,
      callback: handleZoomIn,
    },
  ]);

  const handleZoomOut = () => {
    console.log('Zoom out shortcut');
    // TODO: Ajouter la fonction de zoom out
  };

  useShortcut([
    {
      key: '-',
      ctrlKey: true,
      shiftKey: false,
      callback: handleZoomOut,
    },
  ]);

  const handleRun = () => {
    console.log('Run shortcut');
    // TODO: Ajouter la fonction de run
  };

  useShortcut([
    {
      key: 'F5',
      ctrlKey: true,
      shiftKey: false,
      callback: handleRun,
    },
  ]);

  const handleBuild = () => {
    console.log('Build shortcut');
    // TODO: Ajouter la fonction de build
  };

  useShortcut([
    {
      key: 'F6',
      ctrlKey: true,
      shiftKey: false,
      callback: handleBuild,
    },
  ]);

  const handleNewFile = () => {
    console.log('New file shortcut');
    // TODO: Ajouter la fonction de new file
  };

  useShortcut([
    {
      key: 'n',
      ctrlKey: true,
      shiftKey: false,
      callback: handleNewFile,
    },
  ]);

  const handleNewFolder = () => {
    console.log('New folder shortcut');
    // TODO: Ajouter la fonction de new folder
  };

  useShortcut([
    {
      key: 'd',
      ctrlKey: true,
      shiftKey: false,
      callback: handleNewFolder,
    },
  ]);

  const handleSettings = () => {
    console.log('Settings shortcut');
    settingsFunction();
  };

  useShortcut([
    {
      key: 'S',
      ctrlKey: true,
      shiftKey: true,
      callback: handleSettings,
    },
  ]);
};

export default Shortcut;
