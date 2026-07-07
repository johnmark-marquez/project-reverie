export const WATERCOLOR_WASH_FILTER_ID = "watercolor-wash";

export const watercolorWashFilterDef = {
  id: WATERCOLOR_WASH_FILTER_ID,
  x: "-30%",
  y: "-30%",
  width: "160%",
  height: "160%",
} as const;

export function getWatercolorFilterUrl() {
  return `url(#${WATERCOLOR_WASH_FILTER_ID})`;
}
