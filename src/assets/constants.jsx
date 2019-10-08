export const datadogColor = '#6c4290';
export const colorDanger = '#dc3545';
export const colorWarning = '#ffc107';
export const colorSafe = '#28a745';
export const colorTextSecondary = '#e8e8e8';

export const fetchFrequency = 1000; // every 10 second

export const lookbackPeriod = 60; // (60 seconds / 10 second fetch frequency) * 10 minute viewing window

export const highCpuThreshold = 2;

export const highCpuAlertThreshold = 10; // show high CPU alert after 10 seconds
export const recoveryThreshold = 10; // after 10 seconds, we can say we have recovered

export const stateInitial = 0;
export const stateHighCpu = 1;
export const stateRecovering = 2;
export const stateHasRecovered = 3;
