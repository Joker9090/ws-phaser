import React from 'react';
export default function Home() {
  const [phaser, setPhaser] = React.useState<typeof Phaser | undefined>()
  const [game, setGame] = React.useState<Phaser.Game | undefined>()
  const [scenes, setScenes] = React.useState<typeof Phaser.Scene[]>([])

  React.useEffect(() => {
    // CLEAN OLD GAME IN DEVELOPMENT
    if(game) {
      game.destroy(true)
      setGame(undefined)
    }  
    // CLEAN OLD GAME IN DEVELOPMENT

    //Load phaser async when windows is ready
    import("phaser").then(setPhaser) 
    //Load scenes async when windows is ready
    import("@/game/Scene1").then((scene1) => setScenes([scene1.default]))
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
          mode: window.Phaser.Scale.FIT
        },
        scene: scenes[0],
        physics: {
          default: "arcade",
          arcade: {
            overlapBias: 100,
            gravity: { y: 1000 },
            //debug: true
          }
        } 
      }
      const game = new phaser.Game(config)
      setGame(game);
    } 
  }, [phaser, scenes])

  return (
    <div id="game-container" style={{ overflow: "hidden" }} />
  )
}
