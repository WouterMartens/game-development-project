// export default class Boss extends Enemy {
//     constructor(params: any) {
//         super(params.scene, params.x, params.y, params.key, params.frame);
//         this.scene.add.existing(this);
            //@ts-ignore
            //this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(80, 20, this.scene.game.canvas.width - 160, this.scene.game.canvas.height - 120));
//     }
// }

import Enemy from '../objects/Enemy';

export default class Boss extends Enemy {
    constructor(params: any) {
        super({
            scene: params.scene,
            x: params.x,
            y: params.y,
            key: params.key
        });

        this.setScale(0.3);
        this.health = 1000;
        this.isBoss = true;
    }
}