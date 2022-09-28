<style scoped>
.map {
  margin: 0 auto;
  height: 50rem;
  width: 50rem;
}
.leaflet-container {
  background: #FFF;
}
</style>

<template>
  <div class="map">
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        :minZoom="minZoom"
        :maxBounds="maxBounds"
        @update:zoom="zoomUpdated"
        :maxBoundsViscosity="1"
        ref="map"
      >
        <l-choropleth-layer
          :data="covidCasesData"
          titleKey="name"
          idKey="ibgeID"
          :value="value"
          :extraValues="extraValues"
          geojsonIdKey="CD_MUN"
          :geojson="brazilCities"
          :colorScale="colorScale"
          :strokeColor="strokeColor"
          :strokeWidth="strokeWidth"
          :currentStrokeColor="currentStrokeColor"
          :currentStrokeWidth="currentStrokeWidth"
        >
          <template slot-scope="props">
            <l-info-control :item="props.currentItem" :unit="props.unit" title="Município" placeholder="Selecione um município"/>
            <l-reference-chart title="Mortes Per Capita" :colorScale="colorScale" :min="props.min" :max="props.max" position="topright"/>
          </template>
        </l-choropleth-layer>
      </l-map>
    </div>
</template>

<script>
import 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet/dist/leaflet.css';
import ChoroplethLayer from './ChoroplethLayer'
import InfoControl from './InfoControl'
import { latLngBounds } from "leaflet";
import ReferenceChart from './ReferenceChart'
import { LMap } from "vue2-leaflet";
import brazilCities from "../assets/brasil_municipios"

export default {
  name: 'Map',
  components: {
    LMap,
    'l-info-control': InfoControl,
    'l-reference-chart': ReferenceChart,
    'l-choropleth-layer': ChoroplethLayer
  },
  props: {
    covidCasesData: Array,
  },
  data() {
    return {
      brazilCities: brazilCities,
      zoom: 4.5,
      center: [-17, -55],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapOptions: {
        zoomSnap: 0.5,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
      },
      maxBounds: latLngBounds([
        [7, -75],
        [-34, -32]
      ]),
      showMap: true,
      minZoom: 4.5,
      colorScale: ["F2DF91", "F8A83F", "F66A0E", "D8382F", "AF1C43", "701447"],
      value: {
        key: "death_per_100k",
        metric: "mortes por 100.000 habitantes"
      },
      extraValues: [
        {
          key: "deaths",
          metric: "mortes"
        }
      ],
      strokeColor: "000",
      currentStrokeColor: "000",
      currentStrokeWidth:1,
      strokeWidth: 0,
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
      const map = this.$refs.map.mapObject;
      if (zoom <= 4.5) {
        map.dragging.disable()
      } else {
        map.dragging.enable();
      }
    },
  }
}
</script>

