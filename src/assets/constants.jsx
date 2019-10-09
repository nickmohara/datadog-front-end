export const fetchFrequency = 10000; // every 10 second

export const lookbackPeriod = 60; // (60 seconds / 10 second fetch frequency) * 10 minute viewing window

export const highCpuThreshold = 1; // Anything voer 100% is bad

export const highCpuAlertThreshold = 120; // show high CPU alert after 120 seconds
export const recoveryThreshold = 120; // after 120 seconds, we can say we have recovered

export const stateInitial = 0; // healthy
export const stateHighCpu = 1; // high cpu
export const stateRecovering = 2; // recovering
export const stateHasRecovered = 3; // successfully recovered and is healthy
