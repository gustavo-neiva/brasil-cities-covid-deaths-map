<template>
  <div>
    <l-geo-json :geojson="geojsonData.geojson" :options="geojsonOptions" ref="geolayer" ></l-geo-json>
    <slot :currentItem="currentItem" :unit="value.metric" :min="min" :max="max" :show="show"></slot>
  </div>
</template>
<script>
import {LGeoJson} from "vue2-leaflet"
import { getMin, getMax, getColor, validNumber } from "../util"
import L from "leaflet";

function mouseover({ target }) {
  target.setStyle({
    weight: this.currentStrokeWidth,
    color: `#${this.currentStrokeColor}`,
    dashArray: ""
  })
  if (!L.Browser.ie && !L.Browser.opera) {
    target.bringToFront()
  }
  let geojsonItem = target.feature.properties
  let item = this.geojsonData.data.find(
    x => x[this.idKey] == geojsonItem[this.geojsonIdKey]
  )
  if (!item) {
    this.currentItem = { name: "", value: 0 }
    return
  }
  let tempItem = { name: item[this.titleKey], value: item[this.value.key] }
  if (this.extraValues) {
    let tempValues = []
    for (let x of this.extraValues) {
      tempValues.push({
        value: item[x.key],
        metric: x.metric
      })
    }
    tempItem = { ...tempItem, extraValues: tempValues }
  }
  this.currentItem = tempItem
}
function mouseout({ target }) {
  target.setStyle({
    weight: this.strokeWidth,
    color: `#${this.strokeColor}`,
    dashArray: ""
  })
  this.currentItem = { name: "", value: 0 }
}
export default {
  name: 'ChoroplethLayer',
  props: {
    geojson: Object,
    data: Array,
    center: Array,
    colorScale: Array,
    titleKey: String,
    idKey: String,
    value: Object,
    extraValues: Array,
    geojsonIdKey: String,
    mapStyle: Object,
    zoom: Number,
    mapOptions: Object,
    strokeColor: {type: String, default: 'fff'},
    currentStrokeColor: {type: String, default:'666'},
    strokeWidth: {type: Number, default: 2},
    currentStrokeWidth: {type: Number, default: 5}
  },
  mounted() {
    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.mapObject)
    }
  },
  data() {
    return {
      currentItem: { name: "", value: 0 },
      geojsonOptions: {
        style: feature => {
          let itemGeoJSONID = feature.properties[this.geojsonIdKey]
          const {data} = this.geojsonData
          let item = data.find(x => x[this.idKey] == itemGeoJSONID)
          if (!item) {
            return {
              color: "white",
              weight: this.strokeWidth
            }
          }
          let valueParam = Number(item[this.value.key])
          if (!validNumber(valueParam)) {
            return {
              color: "white",
              weight: this.strokeWidth
            }
          }
          const { min, max } = this
          return {
            weight: this.strokeWidth,
            opacity: 1,
            color: `#${this.strokeColor}`,
            fillOpacity: 1,
            fillColor: getColor(valueParam, this.colorScale, min, max)
          }
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: mouseover.bind(this),
            mouseout: mouseout.bind(this)
          })
        },
        smoothFactor: "0.1"
      }
    }
  },
  computed: {
    min() {
      return getMin(this.geojsonData.data, this.value.key)
    },
    max() {
      return getMax(this.geojsonData.data, this.value.key)
    },
    show() {
      return this.currentItem.value != 0;
    },
    geojsonData() {
      return {geojson: {...this.geojson}, data: this.data};
    }
  },
  components: {
    LGeoJson
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent
      for (var i = 0; i < this.$children.length; i++) {
        if (typeof this.$children[i].deferredMountedTo === "function") {
          this.$children[i].deferredMountedTo(parent)
        }
      }
    }
  }
}
</script>