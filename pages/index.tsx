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
    // CLEAN OLD GAME IN DEVELOPMENT

    //Load phaser async when windows is ready
    import("phaser").then(setPhaser)
    //Load scenes async when windows is ready
    Promise.all([
      
      // import("@/game/TestScene"),
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

    // get query parameter level
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level');
    if (level) {
      localStorage.setItem("level", level);
    } else {
      localStorage.setItem("level", "0");
    }
  }, [])

  React.useEffect(() => {
    // wait until phaser and scenes is ready and check for CLEAN OLD GAME IN DEVELOPMENT
    if (phaser && scenes.length && !game) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: "100%",
        height: "100%",
        parent: "game-container",
        scale: {
          mode: window.Phaser.Scale.NONE
        },
        scene: scenes,
        physics: {
          default: "arcade",
          arcade: {
            overlapBias: 10,
            gravity: { y: 1000, x: 0 },
            debug: false
          }
        }
      }
      const game = new phaser.Game(config)
      setGame(game);
      /* ola */

      /* CONTROLS THE RESIZE AND RESTART OF SCENE */

      window.addEventListener("resize", () => {
        setTimeout(() => {
          var gameWidth = window.innerWidth
          var gameHeight = window.innerHeight
          var ratio = gameWidth / gameHeight
          var scaleX = window.innerWidth / gameWidth;
          var scaleY = window.innerHeight / gameHeight;
          game.scene.getScenes(true).map((s) => {
            s.scale.resize(gameWidth, gameHeight);
            s.renderer.onResize
          })
        }, 100);
      })
    }
  }, [phaser, scenes])

  return (
    <div id="game-container" style={{ overflow: "hidden" }} />
  )
}
