import Phaser from "phaser";
import CinematographyModular from "./Cinematography-modular";
import { get } from "http";

// Scene in class
class startMovie extends Phaser.Scene {
    constructor() {
        super({ key: "startMovie" });
    }

    preload(this: Phaser.Scene) {
    this.load.image("startButton", "/movies/startButton.png")
    // audio
    this.load.audio("deepSpace1", "/sounds/deepSpace1.mp3")
    this.load.audio("deepSpace2", "/sounds/deepSpace2.mp3")
    this.load.audio("deepSpace3", "/sounds/deepSpace3.mp3")
    //intro scene 1
    this.load.audio("cineIntro1_1", "/movies/intro/audios/cineIntro1/cineIntro1_1.mp3")
    this.load.audio("cineIntro1_2", "/movies/intro/audios/cineIntro1/cineIntro1_2.mp3")
    this.load.audio("cineIntro1_3", "/movies/intro/audios/cineIntro1/cineIntro1_3.mp3")
    this.load.image("backgroundStars", "/movies/intro/scene1/fondo1.png")
    this.load.image("backgronudClouds", "/movies/intro/scene1/fondo2.png")
    this.load.image("backgroundGlow", "/movies/intro/scene1/fondo3.png")
    this.load.image("planet", "/movies/intro/scene1/planeta.png")
    this.load.image("darkness", "/movies/intro/scene1/viñeta.png")
    this.load.image("shipOn", "/movies/intro/scene1/naveOn.png")
    this.load.image("shipOff", "/movies/intro/scene1/naveOff.png")
    this.load.image("naveZoom", "/movies/intro/scene1/NaveAstro.png")
    this.load.image("naveZoomOn", "/movies/intro/scene1/NaveAstroLuces.png")
    //intro scene 2
    this.load.audio("spaceshipAmbient", "/movies/intro/soundEffects/cineIntro2/spaceshipAmbient.mp3")
    this.load.audio("cineIntro2_1", "/movies/intro/audios/cineIntro2/cineIntro2_1.mp3")
    this.load.audio("cineIntro2_2", "/movies/intro/audios/cineIntro2/cineIntro2_2.mp3")
    this.load.image("fondo1", "/movies/intro/scene2/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene2/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene2/FondoCapa3.png")
    this.load.image("planetScene2", "/movies/intro/scene2/planeta.png")
    this.load.image("alarmaRojaOn", "/movies/intro/scene2/AlarmaRoja.png")
    this.load.image("alarmaRojaOff", "/movies/intro/scene2/AlarmaRojaApagada.png")
    this.load.image("alarmaVerdeOn", "/movies/intro/scene2/AlarmaVerde.png")
    this.load.image("alarmaVerdeOff", "/movies/intro/scene2/AlarmaVerdeApagada.png")
    this.load.image("luzAlarmaRoja", "/movies/intro/scene2/LuzAlarmaRoja.png")
    this.load.image("luzAlarmaVerde", "/movies/intro/scene2/LuzAlarmaVerde.png")
    this.load.image("naveCapaTrasera", "/movies/intro/scene2/NaveCapaTrasera.png")
    this.load.image("naveCapaDelantera", "/movies/intro/scene2/PanelCapaDelantera.png")
    this.load.image("marcoVentana", "/movies/intro/scene2/MarcoVentana.png")
    this.load.image("vidrioVentana", "/movies/intro/scene2/VidrioVentana.png")
    this.load.image("LuzPanelRojo", "/movies/intro/scene2/LuzPanelRojo.png")
    this.load.image("LuzPanelVerde", "/movies/intro/scene2/LuzPanelVerde.png")
    //intro scene 3 por ahora no tiene assets
    this.load.audio("spaceshipCrash", "/movies/intro/soundEffects/cineIntro3/spaceshipCrash.mp3")
    //intro scene 4
    this.load.audio("doorOpening", "/movies/intro/soundEffects/cineIntro4/doorOpening.mp3")
    this.load.image("NubePolvo1", "/movies/intro/scene5/NubePolvo1.png")
    this.load.image("NubePolvo2", "/movies/intro/scene5/NubePolvo2.png")
    this.load.image("NubePolvo3", "/movies/intro/scene5/NubePolvo3.png")
    this.load.image("NubePolvo4", "/movies/intro/scene5/NubePolvo4.png")
    this.load.image("NubePolvo5", "/movies/intro/scene5/NubePolvo5.png")
    this.load.image("NaveAbierta", "/movies/intro/scene5/NaveAbierta.png")
    this.load.image("NaveAbiertaLuces", "/movies/intro/scene5/NaveAbiertaLuces.png")
    this.load.image("NaveCerrada", "/movies/intro/scene5/NaveCerrada.png")
    this.load.image("NaveCerradaLuces", "/movies/intro/scene5/NaveCerradaLuces.png")
    this.load.image("OpacidadDetrasDeNave", "/movies/intro/scene5/OpacidadDetrasDeNave.png")
    this.load.image("PiedrasDelanteras", "/movies/intro/scene5/PiedrasDelanteras.png")
    this.load.image("PiedrasNave", "/movies/intro/scene5/PiedrasNave.png")
    this.load.image("SuperficiePlaneta", "/movies/intro/scene5/SuperficiePlaneta.png")
    //intro scene 5
    this.load.image("BrazoDelantero", "/movies/intro/scene6/BrazoDelatero.png")
    this.load.image("Cuerpo", "/movies/intro/scene6/Cuerpo.png")
    this.load.image("PiernaDelantera", "/movies/intro/scene6/PiernaDelantera.png")
    this.load.image("PiernaTrasera", "/movies/intro/scene6/PiernaTrasera.png")
    this.load.image("Piso", "/movies/intro/scene6/Piso.png")
    //intro scene 6
    this.load.audio("cineIntro6_1", "/movies/intro/audios/cineIntro6/cineIntro6_1.mp3")
    this.load.image("PisoScene6", "/movies/intro/scene7/Piso.png")
    this.load.image("AstroFrenteCorte", "/movies/intro/scene7/AStroFrenteCorte.png")
    this.load.image("AstroPerfilCorte", "/movies/intro/scene7/AstroPerfilCorte.png")
    this.load.image("VidrioVisor", "/movies/intro/scene7/VidrioVisor.png")
    this.load.image("VidrioVisorView", "/movies/intro/scene7/VidrioVisorView.png")
    //intro scene 7
    this.load.audio("cineIntro7_1", "/movies/intro/audios/cineIntro7/cineIntro7_1.mp3")
    this.load.image("mountains", "/movies/intro/scene8/Montañas.png")
    this.load.image("Nube1", "/movies/intro/scene8/Nube1.png")
    this.load.image("Nube2", "/movies/intro/scene8/Nube2.png")
    this.load.image("Nube3", "/movies/intro/scene8/Nube3.png")
    this.load.image("PisoNivel8", "/movies/intro/scene8/Piso.png")
    }

    create(this: startMovie) {

        const startButton = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "startButton").setInteractive()

        const getCinematographyMod = this.game.scene.getScene(
            "CinematographyMod"
          ) as CinematographyModular;

        startButton.on("pointerdown", ()=>{
            getCinematographyMod.scene.start("CinematographyMod", {keyname: "cine_intro_4"}).bringToTop("CinematographyMod")
        })
        startButton.on("pointerup", ()=>{
            this.scene.stop()
        })
    }

    update(this: startMovie) {
    }
}

export default startMovie;
