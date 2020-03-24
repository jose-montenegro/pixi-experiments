import { Component } from './Component';

export interface ComponentConstructor {
    new (): Component;
}