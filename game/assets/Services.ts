export function isTouchDevice(): boolean {
    return (
        'ontouchstart' in window ||
        (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0)
    );
}