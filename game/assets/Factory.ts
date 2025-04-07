import Floor from "./Floor";
import LargeFloorIsland from "./LargeFloorIsland";
import Game from "../Game";

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
    case "cristal":
        let cristal = new Floor(scene, rest, rest.group);
        if (rest.flipX) cristal.setFlipX(true)
        if (rest.colors) cristal.setTint(rest.colors[0]);
      return cristal
    // case "SmallFloorIslandConfig":
    //   return new SmallFloorIslandConfig(scene, rest);
    default:
        break;
  }
}