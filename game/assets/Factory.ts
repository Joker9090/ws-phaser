import Floor from "./Floor";
import LargeFloorIsland from "./LargeFloorIsland";
import Game from "../Game";
import Collectable from "./Collectable";
import Teleport from "./Teleport";
import Danger from "./Danger";

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
    default:
        break;
  }
}