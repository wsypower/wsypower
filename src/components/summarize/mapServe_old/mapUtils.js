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
import ycqData from "./data/330602越城区.json";
import ycqBound from "./data/越城边界.json";
import kqqData from "./data/330603柯桥区.json";
import kqqBound from "./data/柯桥边界.json";
import syqData from "./data/330604上虞区.json";
import syqBound from "./data/上虞边界.json";
import xcxData from "./data/330624新昌县.json";
import xcxBound from "./data/新昌边界.json";
import zjsData from "./data/330681诸暨市.json";
import zjsBound from "./data/诸暨边界.json";
import szsData from "./data/330683嵊州市.json";
import szsBound from "./data/嵊州边界.json";
import bound from "./data/bound.json";
import qxData from "./data/330600.json";
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
      width: 3
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
    style: areaStyle("rgba(72,214,253,0.1)", 40)
  });
  boundLayers.push(boundLayer1);
  let boundLayer2 = new VectorLayer({
    source: getData(bound),
    style: areaStyle("rgba(72,214,253,0.2)", 20)
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
export function locateTo(map, code) {
  boundLayers.map(layer => {
    map.removeLayer(layer);
  });
  map.removeLayer(fillLayer);
  let pointer;
  if (code === "330602") {
    centerTo(map, [120.63468933105469, 30.0067993164062], 11.2);
    boundLayers = getBoundLayers(ycqBound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(ycqData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  } else if (code === "330603") {
    centerTo(map, [120.56877136230469, 30.029067993164062], 10);
    boundLayers = getBoundLayers(kqqBound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(kqqData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  } else if (code === "330604") {
    centerTo(map, [120.87638854980469, 30.001602172851562], 10.2);
    boundLayers = getBoundLayers(syqBound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(syqData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  } else if (code === "330624") {
    centerTo(map, [120.96839904785156, 29.4000382812], 10.7);
    boundLayers = getBoundLayers(xcxBound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(xcxData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  } else if (code === "330681") {
    centerTo(map, [120.2776336669922, 29.667080688476562], 10);
    boundLayers = getBoundLayers(zjsBound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(zjsData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  } else if (code === "330683") {
    centerTo(map, [120.7445526123047, 29.600000688476562], 10.2);
    boundLayers = getBoundLayers(szsBound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(szsData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  } else if (code === "3306") {
    centerTo(map, [120.62850952148439, 29.796295166015625], 9.1);
    boundLayers = getBoundLayers(bound);
    boundLayers.map(layer => {
      map.addLayer(layer);
    });
    fillLayer = getFillLayers(qxData);
    map.addLayer(fillLayer);
    pointer = getSelectPointerMove(fillLayer);
    map.addInteraction(pointer);
  }
  return pointer;
}
