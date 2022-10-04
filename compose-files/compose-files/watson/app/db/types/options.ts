export const LOG_LEVEL = {
    LOW: 'LOW',
    FULL: 'FULL',
};

type LOG_LEVEL =  typeof LOG_LEVEL.LOW | typeof LOG_LEVEL.FULL;

export type OptionsT = {
    logLevel: LOG_LEVEL
}