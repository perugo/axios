export const BREAD = {
  HOME: [{ title: "アレーアンテナ", link: "home" }],
  SETTING: {
    INPUTWAVE: [{ title: "アレーアンテナ", link: "home" }, { title: "アンテナの設定", link: "settingInputWave" }],
  }
}
export const ANTENNA_PRESETS = [
  { antGap: 0.5, phase: 0, N: 2 },
  { antGap: 0.5, phase: 180, N: 2 },
  { antGap: 0.25, phase: 90, N: 2 }
];
export const DEFAULT = {
  ANTENNA: { DomainWidLambda: 15, antGap: 0.5, phase: 0, N: 2 },
  COLOR: {
    colorThreshold: 0.06,
    colorGradientIndex: 1
  },
  VIEW:"wave",
  ANTENNACONFIGTYPE:"default",
  SPATIAL: { lambda: 0.003, deltaXLambda: 20},
  AMPLITUDESCALER: {
    "Select": "SineWave", "simulationNum": 900,
    "SineWave": { "slope": -0.06, "shift": 70 },
    "Pulse": { "peakPosition": 110, "widthFactor": 2.0 }
  }
}