/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

   draw(mvp, modelView, normalMatrix, modelMatrix) {
        var lmmatrix = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
        var LNMATRIX = getNormalMatrix(lmmatrix);
        var LMV = MatrixMult(modelView, this.trs.getTransformationMatrix());
        var localMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());

        if (this.meshDrawer) {
            this.meshDrawer.draw(localMvp, LMV, LNMATRIX, lmmatrix);
        }
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(localMvp, LMV, LNMATRIX, lmmatrix);
        }
    }


    

}