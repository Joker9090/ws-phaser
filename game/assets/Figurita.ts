class Figuritas extends Phaser.GameObjects.Container {
  postal:string = "";
  constructor(scene: Phaser.Scene, x: number, y: number, postal: string, isUnlocked:boolean) {
      super(scene, x, y);
      this.postal =postal
      const image1 = scene.add.image(0, 0, "modalFiguirita").setScale(0.8).setAlpha(0.8);
      this.add(image1);
      const image2 = scene.add.image(0, 0, postal).setScale(0.1).setAlpha(0.7);
      let clicked = false
      this.add(image2);
      image1.setInteractive()
      image1.setDepth(99)
      if(isUnlocked){
        image1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          scene.tweens.add({
            targets: image1,
            scale: 0.9,
            alpha: 1,
            duration: 300,
            ease: 'Power2'
          });
          scene.tweens.add({
            targets: image2,
            scale: 0.18,
            alpha: 1,
            duration: 300,
            ease: 'Power2'
          });
        });
  
        image1.on("pointerup", ()=>{
          this.download()
        })
  
        image1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          if(!clicked){
            scene.tweens.add({
              targets: image1,
              scale: 0.8,
              alpha: 0.7,
              duration: 300,
              ease: 'Power2'
            });
            scene.tweens.add({
              targets: image2,
              scale: 0.1,
              alpha: 0.7,
              duration: 300,
              ease: 'Power2'
            });
          }
        });
      }else{
        const lock = scene.add.image(0, 0, "lock").setScale(0.1);
        image2.setTint(0x808080)
        this.add(lock);
      }
     
      scene.add.existing(this);
  }

  download(){
    console.log("hol")
    const group:any[] = []
    const background =this.scene.add.rectangle(this.scene.scale.width / 2,this.scene.scale.height /2,this.scene.scale.width,this.scene.scale.height, 0x0000, 0.7)
    const downloadImage = this.scene.add.image(this.scene.scale.width / 2,this.scene.scale.height /4 + 300, this.postal).setScale(0.2)
    const downloadButton = this.scene.add.image(this.scene.scale.width/2 + 300 , this.scene.scale.height/2 + 230, "downloadButton")
    const modal = this.scene.add.image(this.scene.scale.width / 2,this.scene.scale.height /4 + 300, "codeModal").setVisible(false)
    const cross = this.scene.add.image(this.scene.scale.width / 2 - 100,this.scene.scale.height /4 + 450, "settingsCross").setVisible(false)
    const check = this.scene.add.image(this.scene.scale.width / 2 + 100  ,this.scene.scale.height /4 +450, "settingsCheck").setVisible(false)
    const text = this.scene.add.text(this.scene.scale.width / 3 - 60, this.scene.scale.height / 4 + 200, `Are you sure you want\nto download this item?`, {
      color: "#00feff",
      stroke: "#00feff",
      align: "center",
      fontFamily: "Arcade",
      fontSize: 60,
      wordWrap: {
      width: this.width * 0.9,
      },
    }).setVisible(false)
    group.push(background, text, downloadImage, check, cross, downloadButton, modal)
    background.setInteractive()
    background.on("pointerup", () => {
      downloadImage.destroy()
      group.forEach(item => item.destroy());
    })
    cross.setInteractive()
    cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
      cross.setTexture("settingsCrossHover")
    })
    cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
      cross.setTexture("settingsCross")
    })
    cross.on("pointerdown",()=>{
      cross.setTexture("settingsCrossPessed")
    })
    cross.on("pointerup", () => {
      modal.setVisible(false)
      check.setVisible(false)
      cross.setVisible(false)
      text.setVisible(false)
      // downloadImage.setVisible(true)
      downloadButton.setVisible(true)
    })
    check.setInteractive()
    check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
      check.setTexture("settingsCheckHover")
    })
    check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
      check.setTexture("settingsCheck")
    })
    check.on("pointerdown",()=>{
      check.setTexture("settingsCheckPressed")
    })
    check.on("pointerup", ()=>{
      const link = document.createElement('a');
      link.href = this.scene.textures.getBase64(this.postal);
      link.download = `${this.postal}.png`;
      link.click();
      downloadImage.destroy()
      group.forEach(item => item.destroy());
    })
    downloadButton.setInteractive()
    downloadButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
      downloadButton.setTexture("downloadButtonHover")
    })
    downloadButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
      downloadButton.setTexture("downloadButton")
    })
    downloadButton.on("pointerdown",()=>{
      downloadButton.setTexture("downloadButtonClick")
    })
    downloadButton.on("pointerup", () => {
      modal.setVisible(true)
      check.setVisible(true)
      cross.setVisible(true)
      text.setVisible(true)
      // downloadImage.setVisible(false)
      downloadButton.setVisible(false)
   
    })    
  }
}

export default Figuritas