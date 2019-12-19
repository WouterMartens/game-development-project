export default class Pickup extends Phaser.Physics.Arcade.Sprite{

    constructor (params: any){
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene.add.existing(this);
        this.setScale (0.02)
    }

    protected getHealth (){

    }
    
    

};