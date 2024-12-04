import Phaser from "phaser";
import MultiScene from "../MultiScene";
import BetweenScenes, { BetweenScenesStatus } from "../BetweenScenes";
import PreLoadScene from "../PreLoadScene";

export type SceneKeys =
  | "BaseLoad"
  | "Postales"
  | "GamePlay1"
  | "GamePlay2"
  | "GamePlay3"
  | "Cinemato0"
  | "Cinemato1"
  | "Cinemato2"
  | "Cinemato3"

export type LoadTypes = "image" | "spritesheet" | "audio" | "svg";

const loadAssets = {

  BaseLoad: {
    assets: [
      ["image", "block", "/game/50x50.png"],
      ["svg", "bordeGlow", "/assets/textBox/bordeGlow.svg", { scale: 7 }],
      ["svg", "fondoDegrade", "/assets/textBox/fondoDegrade.svg", { scale: 7 }],
      // menu credits
      ["image", "backButton", "/menu/credits/backButton.png"],
      ["image", "backButtonHover", "/menu/credits/backButtonHover.png"],
      ["image", "backButtonPressed", "/menu/credits/backButtonPressed.png"],
      ["image", "credits_barto", "/menu/credits/credits_barto.png"],
      ["image", "credits_clari", "/menu/credits/credits_clari.png"],
      ["image", "credits_hache", "/menu/credits/credits_hache.png"],
      ["image", "credits_jeimi", "/menu/credits/credits_jeimi.png"],
      ["image", "credits_joaco", "/menu/credits/credits_joaco.png"],
      ["image", "credits_lu", "/menu/credits/credits_lu.png"],
      ["image", "credits_mai", "/menu/credits/credits_mai.png"],
      ["image", "credits_nano", "/menu/credits/credits_nano.png"],
      ["image", "creditsTitle", "/menu/credits/creditsTitle.png"],
      // menu credits
      ["image", "creditsButton", "/menu/initial/creditsButton.png"],
      ["image", "creditsButtonHover", "/menu/initial/creeditsButtonHover.png"],
      ["image", "creditsButtonPressed", "/menu/initial/creditsButtonPressed.png"],
      ["image", "gameTitle", "/menu/initial/gameTitle.png"],
      ["image", "logoNoswar", "/menu/initial/logoNoswar.png"],
      ["image", "playButton", "/menu/initial/playButton.png"],
      ["image", "playButtonHover", "/menu/initial/playButtonHover.png"],
      ["image", "playButtonPressed", "/menu/initial/playButtonPressed.png"],
      ["image", "albumButton", "/menu/initial/albumButton.png"],
      ["image", "albumButtonHover", "/menu/initial/albumButtonHover.png"],
      ["image", "albumButtonPressed", "/menu/initial/albumButtonPressed.png"],
      ["image", "scoreButton", "/menu/initial/scoreButton.png"],
      ["image", "scoreButtonHover", "/menu/initial/scoreButtonHover.png"],
      ["image", "scoreButtonPressed", "/menu/initial/scoreButtonPressed.png"],
      ["image", "settingsButton", "/menu/initial/settingsButton.png"],
      ["image", "settingsButtonHover", "/menu/initial/settingsButtonHover.png"],
      ["image", "settingsButtonPressed", "/menu/initial/settingsButtonPressed.png"],
      // menu play
      ["image", "enterCodeButton", "/menu/play/enterCodeButton.png"],
      ["image", "enterCodeButtonHover", "/menu/play/enterCodeButtonHover.png"],
      ["image", "enterCodeButtonPressed", "/menu/play/enterCodeButtonPressed.png"],
      ["image", "newGameButton", "/menu/play/newGameButton.png"],
      ["image", "newGameButtonPressed", "/menu/play/newGameButtonPressed.png"],
      ["image", "newGameButtonHover", "/menu/play/newGameButtonHover.png"],
      ["image", "playBackButton", "/menu/play/playBackButton.png"],
      ["image", "playBackButtonHover", "/menu/play/backHover.png"],
      ["image", "playBackButtonPressed", "/menu/play/backPressed.png"],
      ["image", "menuBackground", "/menu/menuBackground.png"],
    
    ]


  },
  GamePlay1: {
    assets: [
      // AUDIOS
      ["audio", "planet0LoopMusic", "/game/planeta1/loopMusic.mp3"],
      // SVGs
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
      [
        "spritesheet",
        "character",
        "/game/character.png",
        { frameWidth: 330, frameHeight: 450 },
      ],
      [
        "spritesheet",
        "gravityAnim",
        "/game/player/gravityEffect.png",
        { frameWidth: 140, frameHeight: 280 },
      ],
      [
        "spritesheet",
        "player",
        "/game/player/playerSpriteSheet.png",
        { frameWidth: 200, frameHeight: 200 },
      ],
      [
        "spritesheet",
        "meteorito",
        "/game/planeta1/meteoritoSpriteVerde.png",
        { frameWidth: 140, frameHeight: 300 },
      ],
      // IMAGES
      ["image", "plataformaNuevaA", "/game/planeta1/platforms/plataformaNuevaA.png"],
      ["image", "plataformaNuevaLargaA", "/game/planeta1/platforms/newPlatA.png"],
      ["image", "plataformaNuevaLargaB", "/game/planeta1/platforms/newPlatB.png"],
      ["image", "plataformaNuevaLargaC", "/game/planeta1/platforms/newPlatC.png"],
      ["image", "plataformaFinalP1", "/game/planeta1/platforms/plataformaFinal.png"],
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
    ],
  },
  GamePlay2: {
    assets: [
      // AUDIOS
      ["audio", "planet1LoopMusic", "/game/planeta2/loopMusic.mp3"],
      // SVGs
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
      [
        "spritesheet",
        "meteoritop1",
        "/game/planeta2/meteorito.png",
        { frameWidth: 98, frameHeight: 210 },
      ],
      // IMAGES
      ["image", "frontground1p1", "/game/planeta2/frontground1.png"],
      ["image", "frontground2p1", "/game/planeta2/frontground2.png"],
      ["image", "huesoFrontp1", "/game/planeta2/huesoFront.png"],
      ["image", "longFloorLeftp1", "/game/planeta2/longFloorLeft.png"],
      ["image", "longFloorRightp1", "/game/planeta2/longFloorRight.png"],
      ["image", "longFloorMiddleAp1", "/game/planeta2/longFloorMiddleA.png"],
      ["image", "longFloorMiddleBp1", "/game/planeta2/longFloorMiddleB.png"],
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
  GamePlay3: {
    assets: [
      // IMAGES
      ["image", "pSimple1p3", "/game/planeta3/pSimple1.png"],
      ["image", "pSimple2p3", "/game/planeta3/pSimple2.png"],
      ["image", "pDoblep3", "/game/planeta3/pDoblep3.png"],
      ["image", "longFloorLeftp3", "/game/planeta3/longFloorLeft.png"],
      ["image", "longFloorRightp3", "/game/planeta3/longFloorRight.png"],
      ["image", "longFloorMiddlep3", "/game/planeta3/longFloorMiddle.png"],
      ["image", "cuevap3", "/game/planeta3/cuevaA.png"],
      ["image", "background1p3", "/game/planeta3/bg1p3.png"],
      ["image", "background2p3", "/game/planeta3/bg2p3.png"],
      ["image", "background3p3", "/game/planeta3/bg3p3.png"],
      ["image", "montaña1p3", "/game/planeta3/montaña1p3.png"],
      ["image", "montaña2p3", "/game/planeta3/montaña2p3.png"],
      ["image", "montaña3p3", "/game/planeta3/montaña3p3.png"], 
      ["image", "uiItemp3", "/game/planeta3/uiItemP3.png"], 
      ["image", "plantap3", "/game/planeta3/plantaP3.png"], 
      ["image", "plantaVaciap3", "/game/planeta3/plantaVaciaP3.png"], 
      ["image", "brilloPlantap3", "/game/planeta3/brilloPlantaP3.png"], 
      ["image", "burbujap3", "/game/planeta3/burbuja.png"], 
      ["image", "planta1p3", "/game/planeta3/planta1p3.png"], 
      ["image", "planta2p3", "/game/planeta3/planta2p3.png"], 
      ["image", "nube1p3", "/game/planeta3/nube1p3.png"], 
      ["image", "nube2p3", "/game/planeta3/nube2p3.png"], 
      [
        "spritesheet",
        "meteoritop3",
        "/game/planeta3/meteoritop3.png",
        { frameWidth: 98, frameHeight: 210 },
      ],
      [
        "svg",
        "p3Gradiant",
        "/game/planeta3/bgGradiant.svg",
        { scale: 1.4 }
      ],
    ],
  },
  Postales: {
    assets: [
      ["image", "postal1Planeta1", "/postals/planet1/postal1Planet1.png"],
      ["image", "postal2Planeta1", "/postals/planet1/postal2Planet1.png"],
      ["image", "postal1Planeta2", "/postals/planeta2/Postal1.png"],
      ["image", "postal2Planeta2", "/postals/planeta2/Postal2.png"],
    ],
  },
  Cinemato0: {
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
    ]
  },
  Cinemato1: {
    assets: [
      // BASE
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
      // SCENE 2
      [
        "image",
        "aroCondensadorBottom",
        "/movies/cinemato1/scene2/aroCondensadorBottom.png",
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
      ["image", "latScreen1", "/movies/cinemato1/scene4/latScreen1.png"],
      ["image", "latScreen2", "/movies/cinemato1/scene4/latScreen2.png"],
      ["image", "latScreen3", "/movies/cinemato1/scene4/latScreen3.png"],
      ["image", "latScreen4", "/movies/cinemato1/scene4/latScreen4.png"],
      ["image", "latScreen5", "/movies/cinemato1/scene4/latScreen5.png"],
      ["image", "latScreenRight1", "/movies/cinemato1/scene4/latScreenRight1.png"],
      ["image", "latScreenRight2", "/movies/cinemato1/scene4/latScreenRight2.png"],
      ["image", "latScreenRight3", "/movies/cinemato1/scene4/latScreenRight3.png"],
      ["image", "latScreenRight4", "/movies/cinemato1/scene4/latScreenRight4.png"],
      ["image", "innerCircle1", "/movies/cinemato1/scene4/innerCircle1.png"],
      ["image", "innerCircle2", "/movies/cinemato1/scene4/innerCircle2.png"],
      ["image", "innerCircle3", "/movies/cinemato1/scene4/innerCircle3.png"],
      ["image", "innerCircle4", "/movies/cinemato1/scene4/innerCircle4.png"],
      ["image", "circleBottomRight", "/movies/cinemato1/scene4/circleBottomRight.png"],
      ["image", "bottomText", "/movies/cinemato1/scene4/bottomText.png"],
      ["image", "barrasRojas", "/movies/cinemato1/scene4/barrasRojas.png"],
      ["image", "barrasAzules", "/movies/cinemato1/scene4/barrasAzules.png"],

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
  },
  Cinemato2: {
    assets: [
      // BASE
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
      // SCENE 1
      ["image", "arm1", "/movies/cinemato2/scene1/arm1.png"],
      ["image", "arm2", "/movies/cinemato2/scene1/arm2.png"],
      ["image", "astroCine2", "/movies/cinemato2/scene1/astro.png"],
      ["image", "backgroundMountain", "/movies/cinemato2/scene1/backgroundMountain.png"],
      ["image", "bag", "/movies/cinemato2/scene1/bag.png"],
      ["image", "food", "/movies/cinemato2/scene1/food.png"],
      ["image", "skyDay", "/movies/cinemato2/skyDay.png"],
      ["image", "cloudsDay", "/movies/cinemato2/cloudsDay.png"],
      // SCENE 2
      ["image", "destello1", "/movies/cinemato2/scene2/destello1.png"],
      ["image", "destello2", "/movies/cinemato2/scene2/destello2.png"],
      ["image", "destello3", "/movies/cinemato2/scene2/destello3.png"],
      ["image", "luzNaveScene2", "/movies/cinemato2/scene2/luzNaveScene2.png"],
      ["image", "mountainsBackgroundScene2", "/movies/cinemato2/scene2/mountainsBackgroundScene2.png"],
      ["image", "nubesScene2", "/movies/cinemato2/scene2/nubesScene2.png"],
      ["image", "shipCrashed", "/movies/cinemato2/scene2/shipCrashed.png"],
      // SCENE 3
      ["image", "nightSky", "/movies/cinemato2/scene3/nightSky.png"],
      ["image", "nightClouds", "/movies/cinemato2/scene3/nightClouds.png"],
      ["image", "mountainsNight", "/movies/cinemato2/scene3/mountainsNight.png"],
      ["image", "shipLightScene3", "/movies/cinemato2/scene3/shipLightScene3.png"],
      ["image", "welderAstronaut", "/movies/cinemato2/scene3/welderAstronaut.png"],
      ["image", "welderScreen", "/movies/cinemato2/scene3/welderScreen.png"],
      ["image", "weldingShip", "/movies/cinemato2/scene3/weldingShip.png"],
      ["image", "destelloWelder", "/movies/cinemato2/scene3/destello.png"],
      // SCENE 4
      ["image", "oxygen1", "/movies/cinemato2/scene4/oxygen1.png"],
      ["image", "oxygen2", "/movies/cinemato2/scene4/oxygen2.png"],
      ["image", "popUpPlanetBubble", "/movies/cinemato2/scene4/popUpPlanetBubble.png"],
      ["image", "foodC2S4", "/movies/cinemato2/scene4/foodC2S4.png"],
      ["image", "planetC2S4", "/movies/cinemato2/scene4/planetC2S4.png"],

      // SCENE 5
      ["image", "BackgroundMountainScene5", "/movies/cinemato2/scene5/BackgroundMountainScene5.png"],
      ["image", "bubble1", "/movies/cinemato2/scene5/bubble1.png"],
      ["image", "bubble2", "/movies/cinemato2/scene5/bubble2.png"],
      ["image", "bubble3", "/movies/cinemato2/scene5/bubble3.png"],
      ["image", "cloudScene5", "/movies/cinemato2/scene5/cloudsScene5.png"],
      ["image", "frontMountainScene5", "/movies/cinemato2/scene5/frontMountainScene5.png"],
      ["image", "opacityScene5", "/movies/cinemato2/scene5/opacityScene5.png"],
      ["image", "starsScene5", "/movies/cinemato2/scene5/starsScene5.png"],
      ["image", "backgroundScene5", "/movies/cinemato2/scene5/backgroundScene5.png"],
      // SCENE 6
      ["image", "astronautScene6", "/movies/cinemato2/scene6/astronautScene6.png"],
      ["image", "bubblesScene6", "/movies/cinemato2/scene6/bubblesScene6.png"],
      ["image", "mountainFrontScene6", "/movies/cinemato2/scene6/mountainFrontScene6.png"],
      ["image", "mountainsBackgroundScene6", "/movies/cinemato2/scene6/mountainsBackgroundScene6.png"],
      ["image", "neblina", "/movies/cinemato2/scene6/neblina.png"],
      ["image", "nubesScene6", "/movies/cinemato2/scene6/nubesScene6.png"],
      ["image", "opacityScene6", "/movies/cinemato2/scene6/opacityScene6.png"],
      ["image", "shipScene6", "/movies/cinemato2/scene6/shipScene6.png"],
    ]
  },
  Cinemato3: {
    assets: [
      // BASE
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
      // SCENE 1
      ["image", "backgroundC3S1", "/movies/cinemato3/scene1/backgroundC3S1.png"],
      ["image", "bubblesC3S1", "/movies/cinemato3/scene1/bubblesC3S1.png"],
      ["image", "cloud1C3S1", "/movies/cinemato3/scene1/cloud1C3S1.png"],
      ["image", "cloud2C3S1", "/movies/cinemato3/scene1/cloud2C3S1.png"],
      ["image", "shipAndAstro", "/movies/cinemato3/scene1/shipAndAstro.png"],
      ["image", "shipLightsC3S1", "/movies/cinemato3/scene1/shipLightsC3S1.png"],
      ["image", "starsC3S1", "/movies/cinemato3/scene1/starsC3S1.png"],
      ["image", "treeFrontC3S1", "/movies/cinemato3/scene1/treeFrontC3S1.png"],
      // SCENE 2
      ["image", "backgroundC3S2", "/movies/cinemato3/scene2/backgroundC3S2.png"],
      // SCENE 3
      ["image", "speakerBack", "/movies/cinemato3/scene3/speakerBack.png"],
      ["image", "speakerCenter", "/movies/cinemato3/scene3/speakerCenter.png"],
      ["image", "speakerMesh", "/movies/cinemato3/scene3/speakerMesh.png"],
      ["image", "panelC3S3", "/movies/cinemato3/scene3/panelC3S3.png"],
      ["image", "soundBarFullC3S3", "/movies/cinemato3/scene3/soundBarFullC3S3.png"],
      ["image", "soundBarOpacityC3S3", "/movies/cinemato3/scene3/soundBarOpacityC3S3.png"],
      ["image", "soundBarSmallC3S3", "/movies/cinemato3/scene3/soundBarSmallC3S3.png"],
      // SCENE 4
      ["image", "astroC3S4", "/movies/cinemato3/scene4/astroC3S4.png"],
      ["image", "astroFrontC4S4", "/movies/cinemato3/scene4/astroFrontC4S4.png"],
      ["image", "background1C3S4", "/movies/cinemato3/scene4/background1C3S4.png"],
      ["image", "background2C3S4", "/movies/cinemato3/scene4/background2C3S4.png"],
      ["image", "shipC3S4", "/movies/cinemato3/scene4/shipC3S4.png"],
      // SCENE 5
      ["image", "backgroundC3S5", "/movies/cinemato3/scene5/backgroundC3S5.png"],
    ]
  }
};

class AssetsLoader {
  scene: MultiScene | PreLoadScene;
  finished: boolean = false;
  loadKey: SceneKeys[] = ["BaseLoad"];
  constructor(scene: MultiScene | PreLoadScene, loadKey: SceneKeys[] = ["BaseLoad"]) {
    this.scene = scene;
    this.loadKey = loadKey;
  }

  runPreload(callback?: Function) {

    if (!this.finished) {
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
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.finished = true;
        if (callback) callback()
      });

      const scenesTitles: Array<SceneKeys> = this.loadKey
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
      const ArcadeFont = this.scene.add.text(0, 0, " .", {
        fontFamily: "Arcade",
      });
    }
  }

  update() {

  }
}

export default AssetsLoader;
