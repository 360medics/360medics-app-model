export interface AppData {
    headerData: HeaderData;
    searchBarData: SearchBarData;
    footerData: FooterData;
}

export interface HeaderData {
    headerBgColor: string;
    headerLogo: string;
    headerTitle: string;
}

export interface SearchBarData {
    searchBarBgColor: string;
    searchBarPlaceholder: string;
}

export interface FooterData {
    footerTitle: string;
    footerIcon: FooterIcon;
    footerCategory: string;
    footerColor: string;
}

export interface FooterIcon {
    footerIconType: string;
    footerIconPath: string;
}

export interface AppEntry {
    appTitle: string;
    appSubtitle: string;
    appLink: string;
    isAnInApp: boolean;
    appCategories: string[];
}

export interface Data {
    appData: AppData;
    appEntries: AppEntry[];
}

