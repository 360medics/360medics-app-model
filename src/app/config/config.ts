export interface Icon {
    type: 'fontawesome' | 'image',
    path: string
}

export interface Header {
    logo: string,
    appTitle: string
}

export interface MenuItem {
    title: string,
    icon?: Icon,
    target: string | null
}

// ------------------------------------------- End interface -------------------------------------------------------------------------------

const openInLogo: Icon = {
    type: 'fontawesome',
    path: `<i class="fal fa-link"></i>`
};

const header: Header = {
        logo: "/logo/snmr.png",
        appTitle: "App Title"
    };

const menuItems: Array<MenuItem> = [
    {
        title: 'Tous',
        icon: {
            type: 'fontawesome',
            path: ` <i class="fal fa-list"></i>`
        },
        target: null
    },
    {
        title: 'Activité',
        icon: {
            type: 'fontawesome',
            path: `<i class="fal fa-monitor-heart-rate"></i>`
        },
        target: 'activity'
    },
    {
        title: 'Diagnostic',
        icon: {
            type: 'fontawesome',
            path: `<i class="fal fa-stethoscope"></i>`
        },
        target: 'diagnostic'
    },
];

export const config = {
    header: header,
    openInLogo: openInLogo,
    menu: menuItems
};
