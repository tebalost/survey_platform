import {Injectable} from '@angular/core';

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'dashboard',
        name: 'DASHBOARD',
        type: 'link',
        icon: 'explore',
        accessRole:'SUPER,ADMIN,NORMAL_USER,SBS'
    },
    {
        state: 'authority',
        name: 'AUTHORITY',
        type: 'sub',
        icon: 'supervised_user_circle',
        accessRole:'SUPER,SBS',
        children: [
            {state: 'clients', name: 'CLIENTS',accessRole:'SUPER,SBS'}
        ]
    },
    {
        state: 'users',
        name: 'USERS',
        type: 'sub',
        icon: 'web',
        accessRole:'SUPER,ADMIN,SBS',
        children: [
            {state: 'userlist', name: 'USER LIST', accessRole:'SUPER,ADMIN,SBS'}
        ]
    },
    {
        state: 'reports',
        name: 'REPORTS',
        type: 'sub',
        icon: 'view_list',
        accessRole:'SUPER,ADMIN,NORMAL_USER,SBS',
        children: [
            {state: 'participantauthorities', name: 'AUTHORITIES', accessRole:'SUPER,SBS'},
            {state: 'participantlist', name: 'PARTICIPANTS', accessRole:'SUPER,ADMIN,NORMAL_USER,SBS'},
            {state: 'detailed-survey', name: 'DETAILED SURVEY', accessRole:'SUPER,ADMIN,NORMAL_USER,SBS'},
            {state: 'detailed-adherence', name: 'DETAILED ADHERENCE', accessRole:'SUPER,ADMIN,NORMAL_USER,SBS'},
            {state: 'SMS', name: 'SMS',accessRole:'SUPER,SBS'}
        ]
    }
    ,
    {
        state: 'manual-imports',
        name: 'MANUAL IMPORTS',
        type: 'sub',
        icon: 'cloud_upload',
        accessRole: 'SUPER,ADMIN,SBS',
        children: [
            {state: 'mhealthfile', name: 'MHEALTH FILE', accessRole:'SUPER,ADMIN,SBS'},
            {state: 'smsfile', name: 'SMS FILE', accessRole:'SUPER,SBS'},
            {state: 'ussdfile', name: 'USSD FILE', accessRole:'SUPER,ADMIN,SBS'}
        ]
    }

];

@Injectable()
export class MenuItems {
    getAll(): Menu[] {
        return MENUITEMS;
    }

    add(menu: any) {
        MENUITEMS.push(menu);
    }
}
