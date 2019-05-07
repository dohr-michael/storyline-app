import { User }  from '@/app/domain/user';
import { Paged } from '@/app/domain/core';

export interface Universe {
    id: string;
    name: string;
    description: string;
    tags: string[];
    picture?: string;
    owner: User;
}


export interface UniversesPaged extends Paged<Universe> {}

export interface CreateCommand {
    name: string;
    description: string;
    tags: string[];
    picture?: string;
}