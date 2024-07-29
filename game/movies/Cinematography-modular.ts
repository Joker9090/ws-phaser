import Phaser from "phaser";
import Ticker, { TickerJob } from './Ticker'
import cineIntro1 from "./Intro/cineInto1";
import cineIntro2 from "./Intro/cineIntro2";
import cineIntro3 from "./Intro/cineIntro3";
import cineIntro4 from "./Intro/cineIntro4";
import cineIntro5 from "./Intro/cineIntro5";
import cineIntro6 from "./Intro/cineIntro6";
import cineIntro7 from "./Intro/cineIntro7";
import MusicManager from "../MusicManager";

class CinematographyModular extends Phaser.Scene {
  ticker: Ticker;
  playingCine: cineIntro1 | any;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: "CinematographyMod" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  // preload(this: Phaser.Scene) {
  //   // audio
  //   this.load.audio("deepSpace1", "/sounds/deepSpace1.mp3")
  //   this.load.audio("deepSpace2", "/sounds/deepSpace2.mp3")
  //   this.load.audio("deepSpace3", "/sounds/deepSpace3.mp3")
  //   //intro scene 1
  //   this.load.image("backgroundStars", "/movies/intro/scene1/fondo1.png")
  //   this.load.image("backgronudClouds", "/movies/intro/scene1/fondo2.png")
  //   this.load.image("backgroundGlow", "/movies/intro/scene1/fondo3.png")
  //   this.load.image("planet", "/movies/intro/scene1/planeta.png")
  //   this.load.image("darkness", "/movies/intro/scene1/viñeta.png")
  //   this.load.image("shipOn", "/movies/intro/scene1/naveOn.png")
  //   this.load.image("shipOff", "/movies/intro/scene1/naveOff.png")
  //   this.load.image("naveZoom", "/movies/intro/scene1/NaveAstro.png")
  //   this.load.image("naveZoomOn", "/movies/intro/scene1/NaveAstroLuces.png")
  //   //intro scene 2
  //   this.load.image("fondo1", "/movies/intro/scene2/FondoCapa1.png")
  //   this.load.image("fondo2", "/movies/intro/scene2/FondoCapa2.png")
  //   this.load.image("fondo3", "/movies/intro/scene2/FondoCapa3.png")
  //   this.load.image("planetScene2", "/movies/intro/scene2/planeta.png")
  //   this.load.image("alarmaRojaOn", "/movies/intro/scene2/AlarmaRoja.png")
  //   this.load.image("alarmaRojaOff", "/movies/intro/scene2/AlarmaRojaApagada.png")
  //   this.load.image("alarmaVerdeOn", "/movies/intro/scene2/AlarmaVerde.png")
  //   this.load.image("alarmaVerdeOff", "/movies/intro/scene2/AlarmaVerdeApagada.png")
  //   this.load.image("luzAlarmaRoja", "/movies/intro/scene2/LuzAlarmaRoja.png")
  //   this.load.image("luzAlarmaVerde", "/movies/intro/scene2/LuzAlarmaVerde.png")
  //   this.load.image("naveCapaTrasera", "/movies/intro/scene2/NaveCapaTrasera.png")
  //   this.load.image("naveCapaDelantera", "/movies/intro/scene2/PanelCapaDelantera.png")
  //   this.load.image("marcoVentana", "/movies/intro/scene2/MarcoVentana.png")
  //   this.load.image("vidrioVentana", "/movies/intro/scene2/VidrioVentana.png")
  //   this.load.image("LuzPanelRojo", "/movies/intro/scene2/LuzPanelRojo.png")
  //   this.load.image("LuzPanelVerde", "/movies/intro/scene2/LuzPanelVerde.png")
  //   //intro scene 3 por ahora no tiene assets

  //   //intro scene 4
  //   this.load.image("NubePolvo1", "/movies/intro/scene5/NubePolvo1.png")
  //   this.load.image("NubePolvo2", "/movies/intro/scene5/NubePolvo2.png")
  //   this.load.image("NubePolvo3", "/movies/intro/scene5/NubePolvo3.png")
  //   this.load.image("NubePolvo4", "/movies/intro/scene5/NubePolvo4.png")
  //   this.load.image("NubePolvo5", "/movies/intro/scene5/NubePolvo5.png")
  //   this.load.image("NaveAbierta", "/movies/intro/scene5/NaveAbierta.png")
  //   this.load.image("NaveAbiertaLuces", "/movies/intro/scene5/NaveAbiertaLuces.png")
  //   this.load.image("NaveCerrada", "/movies/intro/scene5/NaveCerrada.png")
  //   this.load.image("NaveCerradaLuces", "/movies/intro/scene5/NaveCerradaLuces.png")
  //   this.load.image("OpacidadDetrasDeNave", "/movies/intro/scene5/OpacidadDetrasDeNave.png")
  //   this.load.image("PiedrasDelanteras", "/movies/intro/scene5/PiedrasDelanteras.png")
  //   this.load.image("PiedrasNave", "/movies/intro/scene5/PiedrasNave.png")
  //   this.load.image("SuperficiePlaneta", "/movies/intro/scene5/SuperficiePlaneta.png")
  //   //intro scene 5
  //   this.load.image("BrazoDelantero", "/movies/intro/scene6/BrazoDelatero.png")
  //   this.load.image("Cuerpo", "/movies/intro/scene6/Cuerpo.png")
  //   this.load.image("PiernaDelantera", "/movies/intro/scene6/PiernaDelantera.png")
  //   this.load.image("PiernaTrasera", "/movies/intro/scene6/PiernaTrasera.png")
  //   this.load.image("Piso", "/movies/intro/scene6/Piso.png")
  //   //intro scene 6
  //   this.load.image("PisoScene6", "/movies/intro/scene7/Piso.png")
  //   this.load.image("AstroFrenteCorte", "/movies/intro/scene7/AStroFrenteCorte.png")
  //   this.load.image("AstroPerfilCorte", "/movies/intro/scene7/AstroPerfilCorte.png")
  //   this.load.image("VidrioVisor", "/movies/intro/scene7/VidrioVisor.png")
  //   this.load.image("VidrioVisorView", "/movies/intro/scene7/VidrioVisorView.png")
  //   //intro scene 7
  //   this.load.image("mountains", "/movies/intro/scene8/Montañas.png")
  //   this.load.image("Nube1", "/movies/intro/scene8/Nube1.png")
  //   this.load.image("Nube2", "/movies/intro/scene8/Nube2.png")
  //   this.load.image("Nube3", "/movies/intro/scene8/Nube3.png")
  //   this.load.image("PisoNivel8", "/movies/intro/scene8/Piso.png")
  // }

  create(this: CinematographyModular, { keyname }: any) {
    this.cursors = this.input.keyboard?.createCursorKeys();
    /* Audio */
    const getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    ) as MusicManager;
    if (!getMusicManagerScene.scene.isActive()) {
      this.scene.launch("MusicManager").sendToBack();
      // getMusicManagerScene.playMusic("deepSpace1");
    }
    else {
    }

    switch (keyname) {
      case 'cine_intro_1':
        this.playingCine = new cineIntro1(this);
        break;
      case 'cine_intro_2':
        this.playingCine = new cineIntro2(this);
        break;
      case 'cine_intro_3':
        this.playingCine = new cineIntro3(this);
        break;
      case 'cine_intro_4':
        this.playingCine = new cineIntro4(this);
        break;
      case 'cine_intro_5':
        this.playingCine = new cineIntro5(this);
        break;
      case 'cine_intro_6':
        this.playingCine = new cineIntro6(this);
        break;
      case 'cine_intro_7':
        this.playingCine = new cineIntro7(this);
        break;
      default:
        this.playingCine = new cineIntro1(this);
    }
  }

  update(time: number, delta: number) {
    if (this.playingCine.update) this.playingCine.update(this, time, delta);
  }
}

export default CinematographyModular;




