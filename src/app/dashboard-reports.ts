export interface TopMenuReport {
    totalActiveSurveys: number,
    totalActiveAdherences: number,
    totalSentSMS: number,
    totalUssdMessages: number
}

export interface Surveys {
    name: string,
    total: number,
    stateCount: any
}

export interface Adherence {
    name: string,
    total: number,
    stateCount: any
}
