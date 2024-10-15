const isCameraTouchingBoundsY = (camera: Phaser.Cameras.Scene2D.Camera )=> {
    let camLeft = camera.scrollX;
    let camRight = camera.scrollX + camera.width;
    let camTop = camera.scrollY;
    let camBottom = camera.scrollY + camera.height;
    const _bounds = camera.getBounds()
    let isTouchingLeft = camLeft <= _bounds.x;
    let isTouchingRight = camRight >= _bounds.x + _bounds.width;
    let isTouchingTop = camTop <= _bounds.y;
    let isTouchingBottom = camBottom >= _bounds.y + _bounds.height;
    return isTouchingLeft || isTouchingRight || isTouchingTop || isTouchingBottom;
}