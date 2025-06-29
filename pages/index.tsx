import React from 'react';

export default function Home() {
  const [phaser, setPhaser] = React.useState<typeof Phaser | undefined>();
  const [game, setGame] = React.useState<Phaser.Game | undefined>();
  const [scenes, setScenes] = React.useState<typeof Phaser.Scene[]>([]);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean | null>(null);

  const checkOrientation = () => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isPortrait = window.innerHeight > window.innerWidth;
    setOverlayVisible(isPortrait);
    // const width = window.innerWidth;
    //     const height = window.innerHeight;
    //     if (width > height) {
    //       console.log("width", width, "height", height);

    //       game?.scale?.resize(width, height);
    //       game?.scene.scenes.forEach(scene => {
    //         console.log("scene", scene.cameras, scene.cameras.main);
    //         if (scene.cameras && scene.cameras.main) {
    //           // scene.cameras.main.setSize(height, width);
    //           setTimeout(() => {
    //             scene.cameras.main.setSize(width, height);
    //           }, 20); 
    //         }
    //         if (scene.cameras) {
    //           const backgroundCamera = scene.cameras.getCamera('backgroundCamera');
    //           if (backgroundCamera) {
    //             backgroundCamera.setSize(width, height);
    //           }
    //         }
    //       });
    //     }
    // console.log("isTouch", isTouch, "isPortrait", isPortrait);
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
        if (!gameInstance.scene) return;
        if (!gameInstance.scale) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width > height) {
          console.log("width", width, "height", height);

          // gameInstance.scale?.resize(width, height);
          gameInstance.scene.scenes.forEach(scene => {
            if (scene.scene.key === "Game") {
              if (scene.cameras && scene.cameras.main) {
                scene.cameras.main.setSize(width, height);
                scene.cameras.getCamera("backgroundCamera")?.setSize(width, height);
                // scene.cameras.main.setZoom(width / height / 3.4);
                scene.cameras.main.setZoom(0.65);

              }
            } else {
              // Para las otras escenas, asegúrate de que NO se les cambia el zoom.
              if (scene.cameras && scene.cameras.main) {
                scene.cameras.main.setZoom(1); // o cualquier valor neutro
                scene.scale.resize(width, height);
                // scene.cameras.main.setSize(width, height);
              }
            }
          });
        }
      };
      // handleResize(); // Initial resize to set the correct size
      setTimeout(handleResize, 50); // Ensure correct sizing on init
      window.addEventListener("resize", () => setTimeout(handleResize));
      window.addEventListener("load", () => setTimeout(handleResize));

      return () => {
        window.removeEventListener("resize", () => setTimeout(handleResize));
        window.removeEventListener("load", () => setTimeout(handleResize));
      };
    }
  }, [phaser, scenes, overlayVisible, game]);

  return (
    <div id="game-container" style={{
  
    }}>
      {overlayVisible && (
        <div className='overlay'>
          {/* <video
          className='rotate-video'
        src="/rotatephone.webM"
        autoPlay
        loop
        muted
        playsInline
      /> */}
          <p>Please rotate your device to landscape mode.</p>
        </div>
      )}
    </div>
  );
}
