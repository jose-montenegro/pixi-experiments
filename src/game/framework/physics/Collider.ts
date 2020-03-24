export interface Collider {
    overlaps(other: Collider): boolean;
}