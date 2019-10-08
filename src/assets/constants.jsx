export const fetchFrequency = 1000; // every 10 second

export const lookbackPeriod = 60; // (60 seconds / 10 second fetch frequency) * 10 minute viewing window

export const highCpuThreshold = 1; // Anything voer 100% is bad

export const highCpuAlertThreshold = 10; // show high CPU alert after 120 seconds
export const recoveryThreshold = 10; // after 120 seconds, we can say we have recovered

export const stateInitial = 0;
export const stateHighCpu = 1;
export const stateRecovering = 2;
export const stateHasRecovered = 3;
