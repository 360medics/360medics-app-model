export interface OpenIn {
    type: 'fontawesome' | 'image',
    path: string
}

export interface Header {
    logo: string,
    appTitle: string
}

export interface Menu {
    title: string,
    icon: string
}

const openIn: OpenIn = {
    type: 'image',
    path: ''
};

const header: Header = {
        logo: "/logo/snmr.png",
        appTitle: "Title"
    };

const menu: Menu = {
    title: "titreDuMenu",
    icon: "<i class=\" fal fa-list\"></i>"
};

export const config = {
    header: header,
    openInLogo: openIn,
    menu: menu
};
