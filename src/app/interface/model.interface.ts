export interface AppData {
    headerData: HeaderData;
    searchBarData: SearchBarData;
    footerData: FooterData;
    appColor: string;
    appCopyright: CopyrightData;
}

export interface CopyrightData {
    copyrightShow: boolean;
    copyrightEntreprise: string;
    copyrightYear: string;
    copyrightDescription: string;
}

export interface HeaderData {
    headerLogo: string;
    headerTitle: string;
}

export interface SearchBarData {
    searchBarBgColor: string;
    searchBarTextColor: string;
    searchBarPlaceholder: string;
}

export interface FooterData {
    footerCategory: string;
}

export interface AppEntry {
    appTitle: string;
    appSubtitle: string;
    isExternalLink: string;
    appLink: string;
    appLinkAndroid: string; // pdf link on android
    appCategory: string;
    isHome: boolean; // indicates that this is the data displayed on the homepage
    isInApp: boolean;
    appEntries: AppEntry[];
}

export interface Data {
    appData: AppData;
    appEntries: AppEntry[];
}
