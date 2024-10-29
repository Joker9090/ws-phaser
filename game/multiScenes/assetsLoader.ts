import Phaser from "phaser";
import MultiScene from "../MultiScene";
import BetweenScenes, { BetweenScenesStatus } from "../BetweenScenes";

export type SceneKeys =
  | "Menu"
  | "Scenes"
  | "Tutorial"
  | "Music"
  | "Intro"
  | "LevelMap"
  | "Sandbox"
  | "BetweenScenes"
  | "Postales"
  | "IntroMovie";

export type LoadTypes = "image" | "spritesheet" | "audio" | "svg";

const loadAssets = {
  Menu: {
    assets: [
      ["image", "glass", "/game/glass.png"],
      ["image", "hover", "/game/hover.png"],
      ["image", "click", "/game/click.png"],
      ["image", "background", "/game/menuBg1.png"],
      ["image", "background2", "/game/menuBg2.png"],
      ["image", "background3", "/game/menuBg3.png"],
      ["image", "background5", "/game/menuBg4.png"],
      ["image", "astronauta", "/game/astronauta.png"],
      ["image", "nube4", "/game/nube4.png"],
      ["image", "nube5", "/game/nube5.png"],
      ["image", "nube2", "/game/nube2.png"],
      ["image", "nube1", "/game/nube1.png"],
      ["image", "menuAsteroids", "/game/meteoritos2.png"],
      ["image", "menuAsteroidsSmall", "/game/meteoritos1.png"],

      ["image", "planeta1", "/game/planeta1.png"],
      ["image", "planeta2", "/game/planeta2.png"],
      ["image", "menuLogo", "/game/menuLogo.png"],
      ["image", "cursor", "/game/cursor.png"],
      [
        "spritesheet",
        "character",
        "/game/character.png",
        { frameWidth: 330, frameHeight: 450 },
      ],
      [
        "spritesheet",
        "player",
        "/game/player/playerSpriteSheet.png",
        { frameWidth: 200, frameHeight: 200 },
      ],
    ],
  },
  Intro: {
    assets: [["image", "logoNoswar", "/game/logo.png"]],
  },
  Sandbox: {
    assets: [["image", "logoNoswar", "/game/logo.png"]],
  },
  LevelMap: {
    assets: [
      // ["image", "backgroundLevelMap", "/game/backgroundLevelMap.png"],
      // ["image", "sun", "/game/sun.png"],
      // ["image", "planetTutorial", "/game/planetTutorialSprite.png"],
      // ["image", "planetLevel1", "/game/planetlvl1.png"],
      // ["image", "planetLevel2", "/game/planetlvl2.png"],
      [
        "spritesheet",
        "tutorial",
        "/game/tutorial.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "lvl1",
        "/game/lvl1.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "lvl2",
        "/game/lvl2.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "sun",
        "/game/sun.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "portal1",
        "/game/portal1.png",
        { frameWidth: 100, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "portal2",
        "/game/portal2.png",
        { frameWidth: 100, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "portal3",
        "/game/portal3.png",
        { frameWidth: 100, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "portal4",
        "/game/portal4.png",
        { frameWidth: 100, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "meteorito",
        "/game/planeta1/meteoritoSpriteVerde.png",
        { frameWidth: 140, frameHeight: 300 },
      ],
      [
        "spritesheet",
        "personRing",
        "/game/personRing.png",
        { frameWidth: 400, frameHeight: 252 },
      ],
    ],
  },
  Scenes: {
    assets: [
      //planeta 1
      ["image", "plataformaNuevaA", "/game/planeta1/platforms/plataformaNuevaA.png"],
      ["image", "plataformaNuevaLargaA", "/game/planeta1/platforms/newPlatA.png"],
      ["image", "plataformaNuevaLargaB", "/game/planeta1/platforms/newPlatB.png"],
      ["image", "plataformaNuevaLargaC", "/game/planeta1/platforms/newPlatC.png"],
      ["image", "plataformaFinalP1", "/game/planeta1/platforms/plataformaFinal.png"],
      [
        "svg",
        "background0P1",
        "/game/planeta1/backgrounds/background0P1.svg",
        { scale: 1.8 },
      ],
      [
        "svg",
        "background1P1",
        "/game/planeta1/backgrounds/background1P1.svg",
        { scale: 1.8 },
      ],
      [
        "svg",
        "backgroundStars",
        "/game/planeta1/backgrounds/backgroundStars.svg",
        { scale: 1.8 },
      ],
      [
        "svg",
        "montañaEnd",
        "/game/planeta1/backgrounds/montañaEnd.svg",
        { scale: 3 },
      ],
      ["image", "frontGround1", "/game/planeta1/backgrounds/frontGround1.png"],
      ["image", "frontGround2", "/game/planeta1/backgrounds/frontGround2.png"],
      ["image", "cristal1", "/game/planeta1/cristal1.png"],
      ["image", "cristal2", "/game/planeta1/cristal2.png"],
      ["image", "cristal3", "/game/planeta1/cristal3.png"],
      ["image", "montaña1", "/game/planeta1/backgrounds/montaña1.png"],
      ["image", "montaña2", "/game/planeta1/backgrounds/montaña2.png"],
      ["image", "montaña3", "/game/planeta1/backgrounds/montaña3.png"],
      ["image", "montaña4", "/game/planeta1/backgrounds/montaña4.png"],
      ["image", "montaña5", "/game/planeta1/backgrounds/montaña5.png"],
      ["image", "nube1", "/game/planeta1/backgrounds/nube1.png"],
      ["image", "nube2", "/game/planeta1/backgrounds/nube2.png"],
      ["image", "nube3", "/game/planeta1/backgrounds/nube3.png"],
      ["image", "nube4", "/game/planeta1/backgrounds/nube4.png"],
      ["image", "nube5", "/game/planeta1/backgrounds/nube5.png"],

      ["image", "plataformaA", "/game/plataforma.png"],
      ["image", "plataformaB", "/game/plataforma2.png"],
      ["image", "plataformaLarga", "/game/plataformalarga.png"],
      ["image", "plataformaLarga2", "/game/plataformaLarga2.png"],
      ["image", "platformA", "/game/platform1.png"],
      ["image", "platformB", "/game/platform1B.png"],
      ["image", "plataformaCorta", "/game/plataformaCorta1.png"],
      ["image", "plataformaCorta2", "/game/plataformaCorta2.png"],
      ["image", "fallingGuy", "/game/fallingGuy.png"],
      ["image", "asteroid", "/game/asteroid.png"],
      ["image", "asteroid2", "/game/asteroid2.png"],
      ["image", "coin", "/game/cristal.png"],
      ["image", "auraTuto", "/game/auraCristalTuto.png"],
      ["image", "portal", "/game/portal.png"],
      ["image", "heart", "/game/heart.png"],
      ["image", "arrow", "/game/arrow.png"],
      ["image", "uiFull", "/game/uiLifeFull.png"],
      ["image", "uiEmpty", "/game/uiLifeEmpty.png"],
      ["image", "uiLifeSection", "/game/uiLifeSection.png"],
      ["image", "uiLifeSectionEmpty", "/game/uiLifeSectionEmpty.png"],
      ["image", "uiGravity", "/game/uiGravityIndicator.png"],

      ["image", "newBg1", "/game/bg1.png"],
      ["image", "newBg2", "/game/bg2.png"],
      ["image", "newBg3", "/game/bg3.png"],
      ["image", "newBg4", "/game/bg4.png"],
      ["image", "newBg5", "/game/bg5.png"],
      ["image", "newBg6", "/game/bg6.png"],

      ["image", "bg1Lvl1", "/game/lvl1/background/bg1.png"],
      ["image", "bg2Lvl1", "/game/lvl1/background/bg2.png"],
      ["image", "bg3Lvl1", "/game/lvl1/background/bg3.png"],
      ["image", "bg4Lvl1", "/game/lvl1/background/bg4.png"],
      ["image", "bg5Lvl1", "/game/lvl1/background/bg5.png"],
      ["image", "bg6Lvl1", "/game/lvl1/background/bg6.png"],
      ["image", "bg7Lvl1", "/game/lvl1/background/bg7.png"],
      ["image", "filtroFondo", "/game/lvl1/background/filtroFondo.png"],
      ["image", "filtroPiso", "/game/lvl1/background/filtroPiso.png"],
      ["image", "texturaPiso", "/game/lvl1/background/texturaPiso.png"],
      ["image", "piedras", "/game/lvl1/background/piedras.png"],
      ["image", "auraLvl1", "/game/lvl1/auraCristalLvl1.png"],
      ["image", "cristalLvl1", "/game/lvl1/cristalLvl1.png"],

      ["image", "plataformaLvl1", "/game/lvl1/plataformas/plataforma.png"],
      [
        "image",
        "plataformaInicioLvl1",
        "/game/lvl1/plataformas/plataformaInicio.png",
      ],
      [
        "image",
        "plataformaMedioLvl1",
        "/game/lvl1/plataformas/plataformaMedio.png",
      ],
      [
        "image",
        "plataformaFinLvl1",
        "/game/lvl1/plataformas/plataformaFin.png",
      ],

      ["image", "piedra1", "/game/lvl1/plataformas/plataformaMedio.png"],
      ["image", "piedra2", "/game/lvl1/plataformas/plataformaMedio.png"],
      ["image", "piedra3", "/game/lvl1/plataformas/plataformaMedio.png"],

      // planeta2
      [
        "svg",
        "p1backgroundDia",
        "/game/planeta2/bgdia.svg",
        { scale: 1.4 }
      ],
      [
        "svg",
        "p1backgroundNoche",
        "/game/planeta2/bgnoche.svg",
        { scale: 1.4 }
      ],
      [
        "svg",
        "p1capaOscuridad",
        "/game/planeta2/capaOscuridad.svg",
        { scale: 1.4 }
      ],
      [
        "svg",
        "p1neblina",
        "/game/planeta2/neblinaBackground.svg",
        { scale: 1.4 }
      ],
      [
        "svg",
        "p1nubeBackground1",
        "/game/planeta2/nubeBackground1.svg",
        { scale: 1.4 }
      ],
      [
        "svg",
        "p1nubeBackground2",
        "/game/planeta2/nubeBackground2.svg",
        { scale: 1.4 }
      ],
      [
        "svg",
        "p1Stars",
        "/game/planeta2/starsBackground.svg",
        { scale: 1.4 }
      ],
      ["image", "frontground1p1", "/game/planeta2/frontground1.png"],
      ["image", "frontground2p1", "/game/planeta2/frontground2.png"],
      ["image", "huesoFrontp1", "/game/planeta2/huesoFront.png"],
      ["image", "longFloorLeftp1", "/game/planeta2/longFloorLeft.png"],
      ["image", "longFloorRightp1", "/game/planeta2/longFloorRight.png"],
      ["image", "longFloorMiddleAp1", "/game/planeta2/longFloorMiddleA.png"],
      ["image", "longFloorMiddleBp1", "/game/planeta2/longFloorMiddleB.png"],
      [
        "spritesheet",
        "meteoritop1",
        "/game/planeta2/meteorito.png",
        { frameWidth: 98, frameHeight: 210 },
      ],
      ["image", "montaña1p1", "/game/planeta2/montaña1.png"],
      ["image", "montaña2p1", "/game/planeta2/montaña2.png"],
      ["image", "montaña3p1", "/game/planeta2/montaña3.png"],
      ["image", "montaña4p1", "/game/planeta2/montaña4.png"],
      ["image", "montaña5p1", "/game/planeta2/montaña5.png"],
      ["image", "nube1p1", "/game/planeta2/nube1.png"],
      ["image", "nube2p1", "/game/planeta2/nube2.png"],
      ["image", "piedra1p1", "/game/planeta2/piedra1.png"],
      ["image", "pSimple1p1", "/game/planeta2/pSimple1.png"],
      ["image", "pSimple2p1", "/game/planeta2/pSimple2.png"],
      ["image", "comida", "/game/planeta2/comida.png"],
      ["image", "cuevap1", "/game/planeta2/cuevap1.png"],
      
    ],
  },

  Tutorial: {
    assets: [
      ["image", "fireball", "/game/fireball.png"],
      ["image", "textBox", "/game/textBox.png"],
      ["svg", "bordeGlow", "/assets/textBox/bordeGlow.svg", { scale: 7 }],
      ["svg", "fondoDegrade", "/assets/textBox/fondoDegrade.svg", { scale: 7 }],
      ["svg", "lineaAbajo", "/assets/textBox/lineaAbajo.svg", { scale: 1 }],
      ["svg", "lineaArriba", "/assets/textBox/lineaArriba.svg", { scale: 1 }],
      ["svg", "lineaDer", "/assets/textBox/lineaDer.svg", { scale: 1 }],
      ["svg", "lineaIzq", "/assets/textBox/lineaIzq.svg", { scale: 1 }],
    ],
  },
  BetweenScenes: {
    assets: [["image", "block", "/game/50x50.png"]],
  },
  Music: {
    assets: [
      ["audio", "songTutorial", "/sounds/tutorial.mp3"],
      ["audio", "songLevel1", "/sounds/monchiSpace.mp3"],
      ["audio", "songLevel2", "/sounds/level2.mp3"],
      ["audio", "songWon", "/sounds/won.mp3"],
      ["audio", "songLose", "/sounds/lose.mp3"],
      ["audio", "songMenu", "/sounds/menu.mp3"],
    ],
  },
  Postales: {
    assets: [
      ["image", "postal1Planeta1", "/postals/planet1/postal1Planet1.png"],
      ["image", "postal2Planeta1", "/postals/planet1/postal1Planet1.png"],
      ["image", "postal1Planeta2", "/postals/planeta2/Postal1.png"],
      ["image", "postal2Planeta2", "/postals/planeta2/Postal2.png"],
      // ["image", "cine_capsula", "/game/cine_2.png"],
    ],
  },
  //MOVIES
  IntroMovie: {
    assets: [
      [
        "audio",
        "key01",
        "/sounds/bs15.mp3",
      ],
      [
        "audio",
        "key02",
        "/sounds/bs13.mp3",
      ],
      // INTRO
      ["image", "startButton", "/movies/startButton.png"],
      ["image", "backgroundStarsMovie", "/movies/intro/scene1/fondo1.png"],
      ["image", "backgronudClouds", "/movies/intro/scene1/fondo2.png"],
      ["image", "backgroundGlow", "/movies/intro/scene1/fondo3.png"],
      ["image", "planet", "/movies/intro/scene1/planeta.png"],
      ["image", "darkness", "/movies/intro/scene1/viñeta.png"],
      ["image", "shipOn", "/movies/intro/scene1/naveOn.png"],
      ["image", "shipOff", "/movies/intro/scene1/naveOff.png"],
      ["image", "naveZoom", "/movies/intro/scene1/NaveAstro.png"],
      ["image", "naveZoomOn", "/movies/intro/scene1/NaveAstroLuces.png"],
      ["image", "fondo1", "/movies/intro/scene2/FondoCapa1.png"],
      ["image", "fondo2", "/movies/intro/scene2/FondoCapa2.png"],
      ["image", "fondo3", "/movies/intro/scene2/FondoCapa3.png"],
      ["image", "planetScene2", "/movies/intro/scene2/planeta.png"],
      ["image", "part1SetUp", "/movies/intro/scene2/part1SetUp.png"],
      ["image", "part2SetUp", "/movies/intro/scene2/part2SetUp.png"],
      ["image", "nave2C", "/movies/intro/scene2/nave2C.png"],
      ["image", "backgroundPanel", "/movies/intro/scene2/background.png"],
      ["image", "radarCross", "/movies/intro/scene2/radar/Cruz.png"],
      ["image", "leftScreen", "/movies/intro/scene2/leftScreen.png"],
      ["image", "rightScreen", "/movies/intro/scene2/rightScreen.png"],
      ["image", "arrowEmpty-red", "/movies/intro/scene2/radar/arrowEmpty-red.png"],
      ["image", "arrowFull-red", "/movies/intro/scene2/radar/arrowFull-red.png"],
      ["image", "arrowEmpty", "/movies/intro/scene2/radar/arrowEmpty.png"],
      ["image", "arrowFull", "/movies/intro/scene2/radar/arrowFull.png"],
      ["image", "radarInnerCircle1", "/movies/intro/scene2/radar/inner.png"],
      ["image", "radarInnerCircle2", "/movies/intro/scene2/radar/middle.png"],
      ["image", "radarInnerCircle2B", "/movies/intro/scene2/radar/middlePointed.png"],
      ["image", "radarInnerCircle3", "/movies/intro/scene2/radar/outer.png"],
      ["image", "radarSearcher", "/movies/intro/scene2/radar/searcher.png"],
      ["image", "planetOnRadar", "/movies/intro/scene2/radar/Planetita.png"],
      ["image", "planetOnRadar-red", "/movies/intro/scene2/radar/Planetita-red.png"],
      ["image", "titleTopLeft", "/movies/intro/scene2/text/titleTopLeft.png"],
      ["image", "titleTopRight", "/movies/intro/scene2/text/titleTopRight.png"],
      ["image", "titleBottomLeft", "/movies/intro/scene2/text/titleBottomLeft.png"],
      ["image", "titleBottomRight", "/movies/intro/scene2/text/titleBottomRight.png"],
      ["image", "textSelectorFull", "/movies/intro/scene2/elementsScreen/labelFull.png"],
      ["image", "textSelectorEmpty", "/movies/intro/scene2/elementsScreen/labelEmpty.png"],
      ["image", "subTextTopLeft", "/movies/intro/scene2/text/subTextTopLeft.png"],
      ["image", "subTextTopLeft2", "/movies/intro/scene2/text/subTextTopLeft2.png"],
      ["image", "subTextTopRight", "/movies/intro/scene2/text/subTextTopLeft.png"],
      ["image", "subTextBottomRight", "/movies/intro/scene2/text/subTextBottomRight.png"],
      ["image", "subTextBottomLeft", "/movies/intro/scene2/text/subTextBottomLeft.png"],
      ["image", "barFull", "/movies/intro/scene2/elementsScreen/fullBar.png"],
      ["image", "barEmpty", "/movies/intro/scene2/elementsScreen/emptyBar.png"],
      ["image", "circle1", "/movies/intro/scene2/elementsScreen/circle1.png"],
      ["image", "circle2", "/movies/intro/scene2/elementsScreen/circle2.png"],
      ["image", "circle3", "/movies/intro/scene2/elementsScreen/circle3.png"],
      ["image", "danger1", "/movies/intro/scene2/danger1.png"],
      ["image", "danger2", "/movies/intro/scene2/danger2.png"],
      ["image", "radarCross-red", "/movies/intro/scene2/radar/Cruz-red.png"],
      ["image", "radarInnerCircle1-red", "/movies/intro/scene2/radar/inner-red.png"],
      ["image", "radarInnerCircle2-red", "/movies/intro/scene2/radar/middle-red.png"],
      ["image", "radarInnerCircle3-red", "/movies/intro/scene2/radar/outer-red.png"],
      ["image", "radarSearcher-red", "/movies/intro/scene2/radar/searcher-red.png"],
      ["image", "planetOnRadar-red", "/movies/intro/scene2/radar/Planetita-red.png"],
      ["image", "titleTopLeft-red", "/movies/intro/scene2/text/titleTopLeft-red.png"],
      ["image", "titleTopRight-red", "/movies/intro/scene2/text/titleTopRight-red.png"],
      ["image", "titleBottomLeft-red", "/movies/intro/scene2/text/titleBottomLeft-red.png"],
      ["image", "titleBottomRight-red", "/movies/intro/scene2/text/titleBottomRight-red.png"],
      ["image", "textSelectorFull-red", "/movies/intro/scene2/elementsScreen/labelFull-red.png"],
      ["image", "textSelectorEmpty-red", "/movies/intro/scene2/elementsScreen/labelEmpty-red.png"],
      ["image", "subTextTopLeft-red", "/movies/intro/scene2/text/subTextTopLeft-red.png"],
      ["image", "subTextTopLeft2-red", "/movies/intro/scene2/text/subTextTopLeft2-red.png"],
      ["image", "subTextBottomRight-red", "/movies/intro/scene2/text/subTextBottomRight-red.png"],
      ["image", "subTextBottomLeft-red", "/movies/intro/scene2/text/subTextBottomLeft-red.png"],
      ["image", "barFull-red", "/movies/intro/scene2/elementsScreen/fullBar-red.png"],
      ["image", "barEmpty-red", "/movies/intro/scene2/elementsScreen/emptyBar-red.png"],
      ["image", "circle1-red", "/movies/intro/scene2/elementsScreen/circle1-red.png"],
      ["image", "circle2-red", "/movies/intro/scene2/elementsScreen/circle2-red.png"],
      ["image", "circle3-red", "/movies/intro/scene2/elementsScreen/circle3-red.png"],
      ["image", "danger1-red", "/movies/intro/scene2/danger1-red.png"],
      ["image", "danger2-red", "/movies/intro/scene2/danger2-red.png"],
      ["image", "NubePolvo1", "/movies/intro/scene5/NubePolvo1.png"],
      ["image", "NubePolvo2", "/movies/intro/scene5/NubePolvo2.png"],
      ["image", "NubePolvo3", "/movies/intro/scene5/NubePolvo3.png"],
      ["image", "NubePolvo4", "/movies/intro/scene5/NubePolvo4.png"],
      ["image", "NubePolvo5", "/movies/intro/scene5/NubePolvo5.png"],
      ["image", "NaveAbierta", "/movies/intro/scene5/NaveaterrizaOFF.png"],
      ["image", "NaveAbiertaLuces", "/movies/intro/scene5/NaveaterrizaON.png"],
      ["image", "NaveAbiertaB", "/movies/intro/scene5/NaveAterrizaONB.png"],
      ["image", "NaveAbiertaLucesB", "/movies/intro/scene5/NaveAterrizaOFFB.png"],
      ["image", "OpacidadDetrasDeNave", "/movies/intro/scene5/OpacidadDetrasDeNave.png"],
      ["image", "PiedrasDelanteras", "/movies/intro/scene5/PiedrasDelanteras.png"],
      ["image", "PiedrasNave", "/movies/intro/scene5/PiedrasNave.png"],
      ["image", "SuperficiePlaneta", "/movies/intro/scene5/SuperficiePlaneta.png"],
      ["image", "NubePrimerPlano", "/movies/intro/scene5/NubePrimerPlano.png"],
      ["image", "BrazoDelantero", "/movies/intro/scene6/BrazoDelatero.png"],
      ["image", "Cuerpo", "/movies/intro/scene6/Cuerpo.png"],
      ["image", "PiernaDelantera", "/movies/intro/scene6/PiernaDelantera.png"],
      ["image", "PiernaTrasera", "/movies/intro/scene6/PiernaTrasera.png"],
      ["image", "Piso", "/movies/intro/scene6/Piso.png"],
      ["image", "PisoScene6", "/movies/intro/scene7/Piso.png"],
      ["image", "AstroFrenteCorte", "/movies/intro/scene7/AStroFrenteCorte.png"],
      ["image", "AstroPerfilCorte", "/movies/intro/scene7/AstroPerfilCorte.png"],
      ["image", "VidrioVisor", "/movies/intro/scene7/VidrioVisor.png"],
      ["image", "VidrioVisorView", "/movies/intro/scene7/VidrioVisorView.png"],
      ["image", "meteoritoTest", "/movies/intro/scene7/meteoritoTest.png"],
      ["image", "estrellas", "/movies/intro/scene5/estrellas.png"],
      ["image", "fondoRed", "/movies/intro/scene5/fondoRed.png"],
      ["image", "nubes", "/movies/intro/scene5/nubes.png"],
      ["image", "superficie", "/movies/intro/scene5/superficie.png"],
      ["image", "mountains", "/movies/intro/scene8/Montañas.png"],
      ["image", "Nube1", "/movies/intro/scene8/Nube1.png"],
      ["image", "Nube2", "/movies/intro/scene8/Nube2.png"],
      ["image", "Nube3", "/movies/intro/scene8/Nube3.png"],
      ["image", "PisoNivel8", "/movies/intro/scene8/Piso.png"],
      ["image", "Piedra1", "/movies/intro/scene8/Piedra1.png"],
      ["image", "piedrita", "/movies/intro/scene8/piedra.png"],
      ["image", "Piedra2", "/movies/intro/scene8/Piedra2.png"],
      ["image", "Piedra3", "/movies/intro/scene8/Piedra3.png"],
      ["image", "Piedra4", "/movies/intro/scene8/Piedra4.png"],
      ["image", "Piedra5", "/movies/intro/scene8/Piedra5.png"],
      ["audio", "intro1audio1", "/movies/intro/audios/cineIntro1/intro1audio1.mp3"],
      ["audio", "intro1audio2", "/movies/intro/audios/cineIntro1/intro1audio2.mp3"],
      ["audio", "intro2audio1", "/movies/intro/audios/cineIntro2/intro2audio1.mp3"],
      ["audio", "intro2audio2", "/movies/intro/audios/cineIntro2/intro2audio2.mp3"],
      ["audio", "intro2audio3", "/movies/intro/audios/cineIntro2/intro2audio3.mp3"],
      ["audio", "intro2audio4", "/movies/intro/audios/cineIntro2/intro2audio4.mp3"],
      ["audio", "intro2audio5", "/movies/intro/audios/cineIntro2/intro2audio5.mp3"],
      ["audio", "intro2audio6", "/movies/intro/audios/cineIntro2/intro2audio6.mp3"],
      ["audio", "intro2audio7", "/movies/intro/audios/cineIntro2/intro2audio7.mp3"],
      ["audio", "intro6audio1", "/movies/intro/audios/cineIntro6/intro6audio1.mp3"],
      ["audio", "intro7audio1", "/movies/intro/audios/cineIntro7/intro7audio1.mp3"],
      ["audio", "introSoundEffect1", "/movies/intro/soundEffects/Intro/00_14.19.mp3"],
      ["audio", "introSoundEffect2", "/movies/intro/soundEffects/Intro/00_15.18.mp3"],
      ["audio", "introSoundEffect3", "/movies/intro/soundEffects/Intro/14.17_17.25.mp3"],
      ["audio", "introSoundEffect4", "/movies/intro/soundEffects/Intro/15.15_55.mp3"],
      ["audio", "introSoundEffect5", "/movies/intro/soundEffects/Intro/15.18_102.10.mp3"],
      ["audio", "introSoundEffect6", "/movies/intro/soundEffects/Intro/23.29_41.05.mp3"],
      ["audio", "introSoundEffect7", "/movies/intro/soundEffects/Intro/41.07_49.01.mp3"],
      ["audio", "introSoundEffect8", "/movies/intro/soundEffects/Intro/55.00_101.02.mp3"],
      ["audio", "introSoundEffect9", "/movies/intro/soundEffects/Intro/101.02_120.17.mp3"],
      // CINEMATICA 1 
      // SCENE 1
      ["image", "backgroundCine1", "/movies/cinemato1/scene1/back.png"],
      ["image", "starsBackground", "/movies/cinemato1/scene1/estrellas.png"],
      ["image", "nightSkyBg", "/movies/cinemato1/scene1/bgColored.png"],
      ["image", "naveWithLights", "/movies/cinemato1/scene1/luces.png"],
      ["image", "naveSinLights", "/movies/cinemato1/scene1/naveAstro.png"],
      ["image", "nubeBg1", "/movies/cinemato1/scene1/nube1.png"],
      ["image", "nubeBg2", "/movies/cinemato1/scene1/nube2.png"],
      ["image", "nubeBg3", "/movies/cinemato1/scene1/nube3.png"],
      ["image", "nubeCielo", "/movies/cinemato1/scene1/nubeCielo.png"],
      // SCENE 2
      [
        "image",
        "aroCondensadorBottom",
        "/movies/cinemato1/scene2/aroCondensadorBottom.png",
      ],
      [
        "image",
        "aroCondensadorTop",
        "/movies/cinemato1/scene2/aroCondensadorTop.png",
      ],
      [
        "image",
        "brilloCondensador",
        "/movies/cinemato1/scene2/brilloCondensador.png",
      ],
      ["image", "condensador", "/movies/cinemato1/scene2/condensador.png"],
      [
        "image",
        "CristalCondensador",
        "/movies/cinemato1/scene2/CristalCondensador.png",
      ],
      // SCENE 3
      ["image", "aspasVent", "/movies/cinemato1/scene3/aspasVent.png"],
      [
        "image",
        "backgroundComerdor",
        "/movies/cinemato1/scene3/backgroundComerdor.png",
      ],
      ["image", "brazoDer", "/movies/cinemato1/scene3/brazoDer.png"],
      ["image", "brazoIzq", "/movies/cinemato1/scene3/brazoIzq.png"],
      ["image", "noodleCup", "/movies/cinemato1/scene3/noodleCup.png"],
      ["image", "vent", "/movies/cinemato1/scene3/vent.png"],
      ["image", "lucesComedor", "/movies/cinemato1/scene3/lucesComedor.png"],
      ["image", "luz1", "/movies/cinemato1/scene3/luz1.png"],
      ["image", "luz2", "/movies/cinemato1/scene3/luz2.png"],
      ["image", "luz3", "/movies/cinemato1/scene3/luz3.png"],
      // SCENE 4
      ["image", "comidaPopUp", "/movies/cinemato1/scene4/comidaPopUp.png"],
      ["image", "planetaPopUp", "/movies/cinemato1/scene4/planetaPopUp.png"],
      ["image", "extraStars", "/movies/cinemato1/scene4/extraStars.png"],
      ["image", "circle1c1", "/movies/cinemato1/scene4/circle1c1.png"],
      ["image", "circle2c1", "/movies/cinemato1/scene4/circle2c1.png"],
      ["image", "circle3c1", "/movies/cinemato1/scene4/circle3c1.png"],
      ["image", "textBluec1", "/movies/cinemato1/scene4/textBluec1.png"],
      ["image", "textTopLeftc1", "/movies/cinemato1/scene4/textTopLeftc1.png"],
      ["image", "textTopRightc1", "/movies/cinemato1/scene4/textTopRightc1.png"],
      // SCENE 5
      ["image", "astro", "/movies/cinemato1/scene5/astro.png"],
      ["image", "brazoCintDer", "/movies/cinemato1/scene5/brazoCintDer.png"],
      ["image", "brazoCintIzq", "/movies/cinemato1/scene5/brazoCintIzq.png"],
      ["image", "cinturonDer", "/movies/cinemato1/scene5/cinturonDer.png"],
      ["image", "cinturonIzq", "/movies/cinemato1/scene5/cinturonIzq.png"],
      ["image", "sillon", "/movies/cinemato1/scene5/sillon.png"],
      // SCENE 6
      ["image", "backgroundPressButton", "/movies/cinemato1/scene6/backgroundPressButton.png"],
      ["image", "backgroundButtonsOn", "/movies/cinemato1/scene6/backgroundButtonsOn.png"],
      ["image", "buttonsOnA", "/movies/cinemato1/scene6/buttonsOnA.png"],
      ["image", "buttonsOnB", "/movies/cinemato1/scene6/buttonsOnB.png"],
      ["image", "brazoPressButton", "/movies/cinemato1/scene6/brazoPressButton.png"],
      ["image", "pinkButton", "/movies/cinemato1/scene6/pinkButton.png"],
      ["image", "violetButton", "/movies/cinemato1/scene6/violetButton.png"],
      // SCENE 7
      [
        "image",
        "backgroundAcelerar",
        "/movies/cinemato1/scene7/backgroundAcelerar.png",
      ],
      [
        "image",
        "barraColorEmpty",
        "/movies/cinemato1/scene7/barraColorEmpty.png",
      ],
      [
        "image",
        "barraColorFull",
        "/movies/cinemato1/scene7/barraColorFull.png",
      ],
      ["image", "brazoAcelerar", "/movies/cinemato1/scene7/brazoAcelerar.png"],
      [
        "image",
        "lucesPrendidasAcelerar",
        "/movies/cinemato1/scene7/lucesPrendidasAcelerar.png",
      ],
      ["image", "palanca", "/movies/cinemato1/scene7/palanca.png"],
      // SCENE 9
      ["image", "backgroundEarthStars", "/movies/cinemato1/scene9/estrellas.png"],
      ["image", "backgroundEarth", "/movies/cinemato1/scene9/fondo.png"],
      ["image", "planetEarth", "/movies/cinemato1/scene9/Planeta.png"],
      ["image", "nubesEarth", "/movies/cinemato1/scene9/nubes.png"],
      ["image", "shipCine2Scene9", "/movies/cinemato1/scene9/nave.png"],
      ["image", "stoneEarth1", "/movies/cinemato1/scene9/piedra1.png"],
      ["image", "stoneEarth2", "/movies/cinemato1/scene9/piedra3.png"],
      ["image", "stoneEarth3", "/movies/cinemato1/scene9/piedra4-1.png"],
      ["audio", "C2_1", "/movies/cinemato1/soundEffects/C2_1.mp3"],
      ["audio", "C2_2", "/movies/cinemato1/soundEffects/C2_2.mp3"],
      ["audio", "C2_3", "/movies/cinemato1/soundEffects/C2_3.mp3"],
      ["audio", "C2_4", "/movies/cinemato1/soundEffects/C2_4.mp3"],
      ["audio", "C2_5", "/movies/cinemato1/soundEffects/C2_5.mp3"],
      ["audio", "C2_6", "/movies/cinemato1/soundEffects/C2_6.mp3"],
      ["audio", "C2_7", "/movies/cinemato1/soundEffects/C2_7.mp3"],
      ["audio", "C2_8", "/movies/cinemato1/soundEffects/C2_8.mp3"],
      ["audio", "C2_9", "/movies/cinemato1/soundEffects/C2_9.mp3"],
      ["audio", "C2_10", "/movies/cinemato1/soundEffects/C2_10.mp3"],
      ["audio", "C2_11", "/movies/cinemato1/soundEffects/C2_11.mp3"],
      ["audio", "C2_12", "/movies/cinemato1/soundEffects/C2_12.mp3"],
      ["audio", "C2_13", "/movies/cinemato1/soundEffects/C2_13.mp3"],
      ["audio", "C2_14", "/movies/cinemato1/soundEffects/C2_14.mp3"],
      ["audio", "C2_15", "/movies/cinemato1/soundEffects/C2_15.mp3"],
      ["audio", "C2_16", "/movies/cinemato1/soundEffects/C2_16.mp3"],

    ]
  }
};

// Scene in class
class AssetsLoader {
  scene: MultiScene;
  finished: boolean = false;
  constructor(scene: MultiScene) {
    // super({ key: "SceneLoader" });
    this.scene = scene;
  }

  runPreload(this: AssetsLoader) {
    if (!this.finished) {
      this.scene.cameras.main.setBackgroundColor(
        Phaser.Display.Color.GetColor(30, 30, 30)
      );
      var width = this.scene.cameras.main.width;
      var height = this.scene.cameras.main.height;
      var loadingText = this.scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: "Loading...",
        style: {
          font: "20px monospace",
          color: "#ff0000",
        },
      });
      var progressBar = this.scene.add.graphics();
      var progressBox = this.scene.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(width / 2 - 160, height / 2 + 100, 320, 50);

      loadingText.setOrigin(0.5, 0.5);

      var percentText = this.scene.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: "0%",
        style: {
          font: "18px monospace",
          color: "#ff0000",
        },
      });

      percentText.setOrigin(0.5, 0.5);

      var assetText = this.scene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: "",
        style: {
          font: "18px monospace",
          color: "#ff0000",
        },
      });

      assetText.setOrigin(0.5, 0.5);

      this.scene.load.on("progress", function (value: number) {
        percentText.setText(Math.floor(Number(value * 100)) + "%");
        progressBar.clear();
        progressBar.fillStyle(0xff0000, 1);
        progressBar.fillRect(
          width / 2 - 160,
          height / 2 + 100,
          300 * value,
          30
        );
      });

      this.scene.load.on("fileprogress", function (file: any) {
        assetText.setText("Loading asset: " + file.key);
      });

      this.scene.load.once("complete", function (this: AssetsLoader) {
        let sceneToPlay;

        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.finished = true;
        // this.scene.scene.restart({text:"menu"})
        // this.scene.makeTransition("startMovie", undefined);
        // console.log("BARTO ACAA")
        sceneToPlay = () =>
          // this.scene.makeTransition("CinematographyMod", {
          //   // keyname: "cine_intro_1",
          //   keyname: "cine_movie_1",
          // });
        this.scene.makeTransition("Game", { level: 4, lifes: 3 });

        // get center of the screen
        const center = {
          x: this.scene.cameras.main.width / 2,
          y: this.scene.cameras.main.height / 2,
        }
        
        const button = this.scene.add
          .image(center.x, center.y, "fireball")
          .setScale(0.3)
          .setInteractive();
        if (sceneToPlay) button.on("pointerdown", sceneToPlay);
        this.scene.tweens.add({
          targets: button,
          rotation: Math.PI * 2,
          duration: 10000,
          loop: -1,
        })
        this.scene.tweens.add({
          targets: button,
          scale: 0.35,
          duration: 3333,
          loop: -1,
          yoyo: true
        })
      });


      const scenesTitles: Array<SceneKeys> = [
        "Menu",
        "Scenes",
        "Tutorial",
        "Music",
        "Intro",
        "LevelMap",
        "BetweenScenes",
        "Sandbox",
        "Postales",
        "IntroMovie",
      ];
      for (let i = 0; i < scenesTitles.length; i++) {
        loadAssets[scenesTitles[i]].assets.map((sceneAssetConfig) => {
          const type = sceneAssetConfig[0] as LoadTypes;
          const name = sceneAssetConfig[1] as string;
          const src = sceneAssetConfig[2] as string;
          const config = sceneAssetConfig[3] as any;
          if (config) {
            this.scene.load[type](name, src, config);
          } else {
            this.scene.load[type](name, src);
          }
        });
      }
      /*Load Fonts*/
      const ArcadeFont = this.scene.add.text(0, 0, " .", {
        fontFamily: "Arcade",
      });

      // this.scene.load.start();
    }
  }

  update() {}
}

export default AssetsLoader;
