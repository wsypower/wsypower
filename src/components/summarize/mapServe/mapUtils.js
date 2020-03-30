import { Vector as VectorLayer } from "ol/layer.js";
import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition.js";
import { easeIn } from "ol/easing.js";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import Stroke from "ol/style/Stroke";
import bound from "./data/bound.json";
import daishan from "./data/daishan.json";
let qxLayer;
function hoverStyle(feature) {
  return new Style({
    fill: new Fill({
      //矢量图层填充颜色，以及透明度
      color: "#0118f4"
    }),
    text: new Text({
      text: feature.get("name"),
      font: "16px bold serif",
      fill: new Fill({
        color: "#ffffff"
      })
    }),
    stroke: new Stroke({
      //边界样式
      color: "#48d6fd",
      width: 1
    })
  });
}
function areaStyle(color, width) {
  return new Style({
    stroke: new Stroke({
      //边界样式
      color: color,
      width: width
    })
  });
}
function fillStyle(feature) {
  return new Style({
    fill: new Fill({
      //矢量图层填充颜色，以及透明度
      color: "#0d1593"
    }),
    text: new Text({
      text: feature.get("name"),
      font: "16px bold serif",
      fill: new Fill({
        color: "#fff"
      })
    }),
    stroke: new Stroke({
      //边界样式
      color: "#55DFF4",
      width: 2
    })
  });
}
function getData(data) {
  return new VectorSource({
    features: new GeoJSON().readFeatures(data)
  });
}
function centerTo(map, center, zoom) {
  map.getView().animate({
    center: center,
    zoom: zoom,
    easing: easeIn,
    duration: 200
  });
}
/*
 * 获取填充图层
 * */
export function getFillLayers(fillLayer) {
  qxLayer = new VectorLayer({
    source: getData(fillLayer),
    style: fillStyle
  });
  return qxLayer;
}
/*
 * 获取边界图层
 * */
export function getBoundLayers(bound) {
  let boundLayers = [];
  let boundLayer1 = new VectorLayer({
    source: getData(bound),
    style: areaStyle("rgba(72,214,253,0.1)", 20)
  });
  boundLayers.push(boundLayer1);
  let boundLayer2 = new VectorLayer({
    source: getData(bound),
    style: areaStyle("rgba(72,214,253,0.2)", 10)
  });
  boundLayers.push(boundLayer2);
  return boundLayers;
}
/*
 * 获取鼠标移动事件
 * */
export function getSelectPointerMove(layer) {
  return new Select({
    condition: pointerMove,
    style: hoverStyle,
    layers: [layer]
  });
}
/*
 * 缩放到选中镇图层
 * */
let boundLayers = [];
let fillLayer;
export function locateTo(map) {
  boundLayers.map(layer => {
    map.removeLayer(layer);
  });
  map.removeLayer(fillLayer);
  let pointer;
  centerTo(map, [122.22190299972, 30.26656000004], 10.2);
  boundLayers = getBoundLayers(bound);
  boundLayers.map(layer => {
    map.addLayer(layer);
  });
  fillLayer = getFillLayers(daishan);
  map.addLayer(fillLayer);
  pointer = getSelectPointerMove(fillLayer);
  map.addInteraction(pointer);

  return pointer;
}
