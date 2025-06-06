import Floor from "./Floor";
import LargeFloorIsland from "./LargeFloorIsland";
import Game from "../Game";
import Collectable from "./Collectable";
import Teleport from "./Teleport";
import Danger from "./Danger";
import Fireball from "./Fireball";
import ObstacleFloor from "./ObstacleFloor";
import AsteroidGenerator from "./AsteroidGenerator";

export default function Factory(scene: Game, config: any, floorGroup: Phaser.Physics.Arcade.Group) {
  let { type, ...rest } = config;
  rest.group = rest.group ?? floorGroup
  switch (type) {
    case "largeFloor":
      return new LargeFloorIsland(scene, rest, rest.group);
    case "floor":
        let floor = new Floor(scene, rest, rest.group);
        if (rest.flipY) floor.setFlipY(true)
            if (rest.colors) floor.setTint(rest.colors[0], rest.colors[1], rest.colors[2], rest.colors[3])
            // floor.setBodySize(140, 20)
            floor.setFlipY(rest.flipY ?? false)
      return floor;
    case "collectable":
        let collectable = new Collectable(scene, rest, rest.group);
        if (rest.flipX) collectable.setFlipX(true)
        if (rest.colors) collectable.setTint(rest.colors[0]);

        if(rest.shield){
          scene.UICamera?.ignore(rest.shield)
        }
      return collectable
    case "subPortal":
      let portal = new Teleport(scene, rest);
      console.log(rest, "rest")
      return portal
    case "danger":
        let danger = new Danger(scene, rest, rest.group);
        return danger
    case "finalPortal":
        let finalPortal = new Floor(scene, rest, rest.group);
        if (rest.flipY) finalPortal.setFlipY(true)
            if (rest.colors) finalPortal.setTint(rest.colors[0], rest.colors[1], rest.colors[2], rest.colors[3])
            // finalPortal.setBodySize(140, 20)
            finalPortal.setFlipY(rest.flipY ?? false)
      return finalPortal;  
    case "fireball":
        let fireball = new Fireball(scene, rest, rest.group);
        return fireball;
    case "meteorshower":
      const shower: Fireball[] = [];
        for (let i = 0; i < rest.quantity*10; i++) {
          let newConfig = {...rest};
          newConfig.pos ={x: rest.pos.x + (Math.random()* rest.quantity * 10), y: rest.pos.y};
          newConfig.tween = { duration: 3000, delay: i * 200 * Math.random(),repeat: -1, y: "+=3000"};
          let fireball = new Fireball(scene, newConfig, rest.group);
          shower.push(fireball);
        }
        return shower;
    case "obstacleFloor":
      return new ObstacleFloor(scene, rest, rest.group);
    case "cloudgen":
      const cloudgen: Fireball[] = [];
        for (let i = 0; i < rest.quantity*10; i++) {
          let newConfig = {...rest};
          newConfig.pos ={x: rest.pos.x , y: rest.pos.y - (Math.random()* rest.quantity * 100)};
          newConfig.tween = { duration: 60000, delay: i * 10000, repeat: -1, x: "+=10000"};
          newConfig.texture = newConfig.clouds[Math.random() * newConfig.clouds.length | 0];
          let fireball = new Fireball(scene, newConfig, rest.group);
          fireball.setAlpha(0);
          scene.tweens.add({targets:fireball, alpha:1, duration:200, delay: i * 10000,});
          cloudgen.push(fireball);
        }

      return cloudgen;
      default:
      break;              
  }
}