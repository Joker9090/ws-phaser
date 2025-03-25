import React from 'react';

export default function Home() {
  const [phaser, setPhaser] = React.useState<typeof Phaser | undefined>()
  const [game, setGame] = React.useState<Phaser.Game | undefined>()
  const [scenes, setScenes] = React.useState<typeof Phaser.Scene[]>([])

  React.useEffect(() => {
    // CLEAN OLD GAME IN DEVELOPMENT
    if (game) {
      game.destroy(true)
      setGame(undefined)
    }

    import("phaser").then(setPhaser)

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
      setScenes(scenes.map(s => s.default))
    })

    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level');
    if (level) {
      localStorage.setItem("level", level);
    } else {
      localStorage.setItem("level", "0");
    }
  }, [])

  React.useEffect(() => {
    if (phaser && scenes.length && !game) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "game-container",
      min: {
          width: 480,
          height: 720,
      },
      max: {
          width: window.innerWidth,
          height: window.innerHeight,
      },
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
      },
        scene: scenes,
        physics: {
          default: "arcade",
          arcade: {
            overlapBias: 10,
            gravity: { y: 1000, x: 0 },
            debug: true
          }
        }
      }

      const game = new phaser.Game(config)
      setGame(game);

      const handleResize = () => {
        setTimeout(() => {
          // game.scale.resize(window.innerWidth, window.innerHeight);
        }, 10);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }
  }, [phaser, scenes])

  return (
    <div id="game-container" style={{ width: "100vw", height: "100vh", overflow: "hidden" }} />
  )
}
