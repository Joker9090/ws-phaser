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
    this.load.audio("cineIntro2_3", "/movies/intro/audios/cineIntro2/cineIntro2_3.mp3")
    this.load.audio("cineIntro2_4", "/movies/intro/audios/cineIntro2/cineIntro2_4.mp3")
    this.load.image("fondo1", "/movies/intro/scene2/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene2/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene2/FondoCapa3.png")
    this.load.image("planetScene2", "/movies/intro/scene2/planeta.png")
    this.load.image("part1SetUp", "/movies/intro/scene2/part1SetUp.png")
    this.load.image("part2SetUp", "/movies/intro/scene2/part2SetUp.png")
    this.load.image("nave2C", "/movies/intro/scene2/nave2C.png")

    this.load.image("backgroundPanel", "/movies/intro/scene2/background.png")
    this.load.image("radarCross", "/movies/intro/scene2/radar/Cruz.png")
    this.load.image("leftScreen", "/movies/intro/scene2/leftScreen.png")
    this.load.image("rightScreen", "/movies/intro/scene2/rightScreen.png")
    this.load.image("arrowEmpty-red", "/movies/intro/scene2/radar/arrowEmpty-red.png")
    this.load.image("arrowFull-red", "/movies/intro/scene2/radar/arrowFull-red.png")
    this.load.image("arrowEmpty", "/movies/intro/scene2/radar/arrowEmpty.png")
    this.load.image("arrowFull", "/movies/intro/scene2/radar/arrowFull.png")
    this.load.image("radarInnerCircle1", "/movies/intro/scene2/radar/inner.png")
    this.load.image("radarInnerCircle2", "/movies/intro/scene2/radar/middle.png")
    this.load.image("radarInnerCircle2B", "/movies/intro/scene2/radar/middlePointed.png")
    this.load.image("radarInnerCircle3", "/movies/intro/scene2/radar/outer.png")
    this.load.image("radarSearcher", "/movies/intro/scene2/radar/searcher.png")
    this.load.image("planetOnRadar", "/movies/intro/scene2/radar/Planetita.png")
    this.load.image("planetOnRadar-red", "/movies/intro/scene2/radar/Planetita-red.png")

    this.load.image("titleTopLeft", "/movies/intro/scene2/text/titleTopLeft.png")
    this.load.image("titleTopRight", "/movies/intro/scene2/text/titleTopRight.png")
    this.load.image("titleBottomLeft", "/movies/intro/scene2/text/titleBottomLeft.png")
    this.load.image("titleBottomRight", "/movies/intro/scene2/text/titleBottomRight.png")

    this.load.image("textSelectorFull", "/movies/intro/scene2/elementsScreen/labelFull.png")
    this.load.image("textSelectorEmpty", "/movies/intro/scene2/elementsScreen/labelEmpty.png")
    this.load.image("subTextTopLeft", "/movies/intro/scene2/text/subTextTopLeft.png")
    this.load.image("subTextTopLeft2", "/movies/intro/scene2/text/subTextTopLeft2.png")
    this.load.image("subTextTopRight", "/movies/intro/scene2/text/subTextTopLeft.png")
    this.load.image("subTextBottomRight", "/movies/intro/scene2/text/subTextBottomRight.png")
    this.load.image("subTextBottomLeft", "/movies/intro/scene2/text/subTextBottomLeft.png")
    this.load.image("barFull", "/movies/intro/scene2/elementsScreen/fullBar.png")
    this.load.image("barEmpty", "/movies/intro/scene2/elementsScreen/emptyBar.png")

    this.load.image("circle1", "/movies/intro/scene2/elementsScreen/circle1.png")
    this.load.image("circle2", "/movies/intro/scene2/elementsScreen/circle2.png")
    this.load.image("circle3", "/movies/intro/scene2/elementsScreen/circle3.png")

    this.load.image("danger1", "/movies/intro/scene2/danger1.png")
    this.load.image("danger2", "/movies/intro/scene2/danger2.png")

    this.load.image("radarCross-red", "/movies/intro/scene2/radar/Cruz-red.png")
    this.load.image("radarInnerCircle1-red", "/movies/intro/scene2/radar/inner-red.png")
    this.load.image("radarInnerCircle2-red", "/movies/intro/scene2/radar/middle-red.png")
    this.load.image("radarInnerCircle2B-red", "/movies/intro/scene2/radar/middlePointed-red.png")
    this.load.image("radarInnerCircle3-red", "/movies/intro/scene2/radar/outer-red.png")
    this.load.image("radarSearcher-red", "/movies/intro/scene2/radar/searcher-red.png")
    this.load.image("planetOnRadar-red", "/movies/intro/scene2/radar/Planetita-red.png")

    this.load.image("titleTopLeft-red", "/movies/intro/scene2/text/titleTopLeft-red.png")
    this.load.image("titleTopRight-red", "/movies/intro/scene2/text/titleTopRight-red.png")
    this.load.image("titleBottomLeft-red", "/movies/intro/scene2/text/titleBottomLeft-red.png")
    this.load.image("titleBottomRight-red", "/movies/intro/scene2/text/titleBottomRight-red.png")

    this.load.image("textSelectorFull-red", "/movies/intro/scene2/elementsScreen/labelFull-red.png")
    this.load.image("textSelectorEmpty-red", "/movies/intro/scene2/elementsScreen/labelEmpty-red.png")
    this.load.image("subTextTopLeft-red", "/movies/intro/scene2/text/subTextTopLeft-red.png")
    this.load.image("subTextTopLeft2-red", "/movies/intro/scene2/text/subTextTopLeft2-red.png")
    this.load.image("subTextBottomRight-red", "/movies/intro/scene2/text/subTextBottomRight-red.png")
    this.load.image("subTextBottomLeft-red", "/movies/intro/scene2/text/subTextBottomLeft-red.png")
    this.load.image("barFull-red", "/movies/intro/scene2/elementsScreen/fullBar-red.png")
    this.load.image("barEmpty-red", "/movies/intro/scene2/elementsScreen/emptyBar-red.png")

    this.load.image("circle1-red", "/movies/intro/scene2/elementsScreen/circle1-red.png")
    this.load.image("circle2-red", "/movies/intro/scene2/elementsScreen/circle2-red.png")
    this.load.image("circle3-red", "/movies/intro/scene2/elementsScreen/circle3-red.png")

    this.load.image("danger1-red", "/movies/intro/scene2/danger1-red.png")
    this.load.image("danger2-red", "/movies/intro/scene2/danger2-red.png")


    //intro scene 3 por ahora no tiene assets
    this.load.audio("spaceshipCrash", "/movies/intro/soundEffects/cineIntro3/spaceshipCrash.mp3")
    //intro scene 4
    this.load.audio("doorOpening", "/movies/intro/soundEffects/cineIntro4/doorOpening.mp3")
    this.load.image("NubePolvo1", "/movies/intro/scene5/NubePolvo1.png")
    this.load.image("NubePolvo2", "/movies/intro/scene5/NubePolvo2.png")
    this.load.image("NubePolvo3", "/movies/intro/scene5/NubePolvo3.png")
    this.load.image("NubePolvo4", "/movies/intro/scene5/NubePolvo4.png")
    this.load.image("NubePolvo5", "/movies/intro/scene5/NubePolvo5.png")
    this.load.image("NaveAbierta", "/movies/intro/scene5/NaveaterrizaOFF.png")
    this.load.image("NaveAbiertaLuces", "/movies/intro/scene5/NaveaterrizaON.png")
    this.load.image("NaveAbiertaB", "/movies/intro/scene5/NaveAterrizaONB.png")
    this.load.image("NaveAbiertaLucesB", "/movies/intro/scene5/NaveAterrizaOFFB.png")
    this.load.image("OpacidadDetrasDeNave", "/movies/intro/scene5/OpacidadDetrasDeNave.png")
    this.load.image("PiedrasDelanteras", "/movies/intro/scene5/PiedrasDelanteras.png")
    this.load.image("PiedrasNave", "/movies/intro/scene5/PiedrasNave.png")
    this.load.image("SuperficiePlaneta", "/movies/intro/scene5/SuperficiePlaneta.png")
    this.load.image("NubePrimerPlano", "/movies/intro/scene5/NubePrimerPlano.png")
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
    this.load.image("meteoritoTest", "/movies/intro/scene7/meteoritoTest.png")
    this.load.image("estrellas", "/movies/intro/scene5/estrellas.png")
    this.load.image("fondoRed", "/movies/intro/scene5/fondoRed.png")
    this.load.image("nubes", "/movies/intro/scene5/nubes.png")
    this.load.image("superficie", "/movies/intro/scene5/superficie.png")
    //intro scene 7
    this.load.audio("cineIntro7_1", "/movies/intro/audios/cineIntro7/cineIntro7_1.mp3")
    this.load.image("mountains", "/movies/intro/scene8/Montañas.png")
    this.load.image("Nube1", "/movies/intro/scene8/Nube1.png")
    this.load.image("Nube2", "/movies/intro/scene8/Nube2.png")
    this.load.image("Nube3", "/movies/intro/scene8/Nube3.png")
    this.load.image("PisoNivel8", "/movies/intro/scene8/Piso.png")
    this.load.image("Piedra1", "/movies/intro/scene8/Piedra1.png")
    this.load.image("piedrita", "/movies/intro/scene8/piedra.png")
    this.load.image("Piedra2", "/movies/intro/scene8/Piedra2.png")
    this.load.image("Piedra3", "/movies/intro/scene8/Piedra3.png")
    this.load.image("Piedra4", "/movies/intro/scene8/Piedra4.png")
    this.load.image("Piedra5", "/movies/intro/scene8/Piedra5.png")
    }

    create(this: startMovie) {

        const startButton = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "startButton").setInteractive()

        const getCinematographyMod = this.game.scene.getScene(
            "CinematographyMod"
          ) as CinematographyModular;

        startButton.on("pointerdown", ()=>{
            getCinematographyMod.scene.start("CinematographyMod", {keyname: "cine_intro_7"}).bringToTop("CinematographyMod")
        })
        startButton.on("pointerup", ()=>{
            this.scene.stop()
        })
    }

    update(this: startMovie) {
    }
}

export default startMovie;
