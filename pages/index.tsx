import React from 'react';

export default function Home() {
  const [phaser, setPhaser] = React.useState<typeof Phaser | undefined>();
  const [game, setGame] = React.useState<Phaser.Game | undefined>();
  const [scenes, setScenes] = React.useState<typeof Phaser.Scene[]>([]);
  const [overlayVisible, setOverlayVisible] = React.useState(false);

  const checkOrientation = () => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isPortrait = window.innerHeight > window.innerWidth;
    setOverlayVisible(isTouch && isPortrait);
    console.log("isTouch", isTouch, "isPortrait", isPortrait);
  };

  React.useEffect(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  React.useEffect(() => {
    if (game) {
      game.destroy(true);
      setGame(undefined);
    }

    import("phaser").then(setPhaser);

    Promise.all([
      import("@/game/LoaderScene"),
      import("@/game/MultiScene"),
      import("@/game/MasterManager"),
      import("@/game/movies/startMovie"),
      import("@/game/movies/Cinematography-modular"),
      import("@/game/Menu"),
      import("@/game/Game"),
      import("@/game/BetweenScenes"),
    ]).then((scenes) => {
      setScenes(scenes.map((s) => s.default));
    });

    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level') ?? "0";
    localStorage.setItem("level", level);
  }, []);

  React.useEffect(() => {
    if (phaser && scenes.length && !game && !overlayVisible) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "game-container",
        scale: {
          mode: window.Phaser.Scale.RESIZE,
          autoCenter: window.Phaser.Scale.CENTER_BOTH,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        input: {
          gamepad: true,
          keyboard: true,
          mouse: true,
          touch: true,
        },
        scene: scenes,
        physics: {
          default: "arcade",
          arcade: {
            overlapBias: 10,
            gravity: { y: 1000, x: 0 },
            debug: false,
          },
        },
      };

      const gameInstance = new phaser.Game(config);
      setGame(gameInstance);

      const handleResize = () => {
        console.log("handleResize", window.innerWidth, window.innerHeight, gameInstance,);
        if (!gameInstance) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width > height) {
          console.log("width", width, "height", height);

          gameInstance.scale.resize(width, height);
          gameInstance.scene.scenes.forEach(scene => {
            console.log("scene", scene.cameras, scene.cameras.main);
            if (scene.cameras && scene.cameras.main) {
              scene.cameras.main.setSize(height, width);
              setTimeout(() => {
                scene.cameras.main.setSize(width, height);
              }, 50); 
            }
            if (scene.cameras) {
              const backgroundCamera = scene.cameras.getCamera('backgroundCamera');
              if (backgroundCamera) {
                backgroundCamera.setSize(width, height);
              }
            }
          });
        }
      };
      handleResize(); // Initial resize to set the correct size
      setTimeout(handleResize, 50); // Ensure correct sizing on init
      window.addEventListener("resize", () => setTimeout(handleResize, 50));
      window.addEventListener("load", () => setTimeout(handleResize, 50));

      return () => {
        window.removeEventListener("resize", () => setTimeout(handleResize, 50));
        window.removeEventListener("load", () => setTimeout(handleResize, 50));
      };
    }
  }, [phaser, scenes, overlayVisible]);

  return (
    <div id="game-container" style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      {overlayVisible && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            zIndex: 10,
            fontSize: '1.5rem',
          }}
        >
          Please rotate your device to landscape mode.
        </div>
      )}
    </div>
  );
}
