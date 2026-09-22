import type { Ref } from "react";
import { LOGO_VIEWBOX, logoPaths, type LogoPathKey } from "./logoPaths";

const NAVY = logoPaths.cRing.fill;
const CREAM = logoPaths.cSilhouette.fill;

/**
 * Versão para fundo escuro: a mesma troca de cores da marca usada no
 * cabeçalho (/marca-corredor61.png). O resto mantém o fill oficial.
 */
const darkFills: Partial<Record<LogoPathKey, string>> = {
  cSilhouette: NAVY,
  cRing: CREAM,
  leftWallNear: CREAM,
  leftWallMid: CREAM,
  oneSilhouette: NAVY,
  oneFace: CREAM,
};

/** Interseção das duas bordas da faixa dourada (floorCream). */
export const VANISHING_POINT = { x: 628.54, y: 671.96 };
/** Topo da faixa dourada, logo abaixo da torre. */
export const ROAD_APEX = { x: 628.25, y: 689.5 };
/** Círculo ajustado ao arco externo do C (cRing). */
export const C_CENTER = { x: 616.17, y: 538.38 };

const SWEEP_RADIUS = 240;
export const SWEEP_LENGTH = 2 * Math.PI * SWEEP_RADIUS;

/**
 * Profundidade de cada peça do corredor: 1 = fundo (torre), 6 = frente.
 * A timeline revela por profundidade, do ponto de fuga para fora.
 */
const depth: Partial<Record<LogoPathKey, number>> = {
  tower: 1,
  towerLeft: 1,
  towerGap: 1,
  leftDeep1: 2,
  leftDeep2: 2,
  leftDeep3: 2,
  leftDeepEdge1: 2,
  leftDeepEdge2: 2,
  leftDeep4: 2,
  rightDeep1: 2,
  rightDeep2: 2,
  leftWallMid: 3,
  rightWallMid: 3,
  rightPillar: 3,
  leftWallNear: 4,
  rightWallBase: 4,
  rightWallNear: 4,
  leftWallBase: 5,
  floorGold: 5,
  floorCream: 5,
  rightFloorStripe: 5,
  oneSilhouette: 6,
  oneFace: 6,
};

function Part({ k, id }: { k: LogoPathKey; id?: string }) {
  const p = logoPaths[k];
  return (
    <path
      id={id}
      d={p.d}
      fill={darkFills[k] ?? p.fill}
      data-depth={depth[k]}
    />
  );
}

function Parts({ keys }: { keys: LogoPathKey[] }) {
  return keys.map((k) => <Part key={k} k={k} />);
}

export function IntroLogo({ ref }: { ref?: Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={ref}
      className="c61-logo"
      viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        {/* Varredura em pizza, sentido horário a partir da base do C */}
        <mask
          id="c61-c-draw"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={LOGO_VIEWBOX}
          height={LOGO_VIEWBOX}
        >
          <circle
            id="c61-c-sweep"
            cx={C_CENTER.x}
            cy={C_CENTER.y}
            r={SWEEP_RADIUS}
            fill="none"
            stroke="#fff"
            strokeWidth={SWEEP_RADIUS * 2}
            strokeDasharray={`${SWEEP_LENGTH} ${SWEEP_LENGTH}`}
            strokeDashoffset={SWEEP_LENGTH}
            transform={`rotate(90 ${C_CENTER.x} ${C_CENTER.y})`}
          />
        </mask>

        {/* Faixa dourada visível = piso dourado menos o piso creme */}
        <mask
          id="c61-road-shape"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={LOGO_VIEWBOX}
          height={LOGO_VIEWBOX}
        >
          <path d={logoPaths.floorGold.d} fill="#fff" />
          <path
            d={logoPaths.floorCream.d}
            fill="#000"
            stroke="#000"
            strokeWidth="2"
          />
        </mask>

        <mask
          id="c61-iris-logo"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={LOGO_VIEWBOX}
          height={LOGO_VIEWBOX}
        >
          <rect width={LOGO_VIEWBOX} height={LOGO_VIEWBOX} fill="#fff" />
          <circle
            id="c61-iris-logo-circle"
            cx={VANISHING_POINT.x}
            cy={VANISHING_POINT.y}
            r="0"
            fill="#000"
          />
        </mask>

        <clipPath id="c61-wordmark-clip" clipPathUnits="userSpaceOnUse">
          <rect id="c61-wordmark-wipe" x="70" y="915" width="1125" height="255" />
        </clipPath>
      </defs>

      <g id="c61-lockup">
        <g id="c61-symbol">
          <g id="c61-c" mask="url(#c61-c-draw)">
            <Parts keys={["cSilhouette", "cRing"]} />
          </g>

          <g id="c61-corridor-left">
            <Parts
              keys={[
                "leftWallBase",
                "leftDeep1",
                "leftDeep2",
                "leftDeep3",
                "leftDeepEdge1",
                "leftDeepEdge2",
                "leftDeep4",
                "leftWallNear",
                "leftWallMid",
              ]}
            />
          </g>

          <g id="c61-one">
            <Parts keys={["oneSilhouette", "oneFace"]} />
          </g>

          <g id="c61-floor">
            <Parts keys={["floorGold", "floorCream"]} />
          </g>

          <path
            id="c61-road"
            d={logoPaths.floorGold.d}
            fill={logoPaths.floorGold.fill}
            mask="url(#c61-road-shape)"
          />

          <g id="c61-corridor-right">
            <Parts
              keys={[
                "rightWallBase",
                "rightWallMid",
                "rightDeep1",
                "rightDeep2",
                "rightPillar",
                "rightFloorStripe",
                "rightWallNear",
              ]}
            />
          </g>

          <g id="c61-tower">
            <Parts keys={["tower", "towerLeft", "towerGap"]} />
          </g>
        </g>

        <g id="c61-wordmark" clipPath="url(#c61-wordmark-clip)">
          <g id="c61-wordmark-inner">
            <g id="c61-wordmark-corredor">
              <Parts
                keys={[
                  "band",
                  "letterO2",
                  "letterO2Hole",
                  "letterO1",
                  "letterO1Hole",
                  "letterD",
                  "letterDHole",
                  "letterR2",
                  "letterR2Hole",
                  "letterR1",
                  "letterR1Hole",
                  "letterR3",
                  "letterR3Hole",
                  "letterE",
                  "letterC",
                ]}
              />
            </g>
            <g id="c61-wordmark-61">
              <Parts keys={["numberBox", "digit6", "digit6Hole", "digit1"]} />
            </g>
            <Part k="barLeft" id="c61-bar-left" />
            <Part k="barRight" id="c61-bar-right" />
          </g>
        </g>
      </g>
    </svg>
  );
}
