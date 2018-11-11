<template>
    <div class="service-right ">
        <h3>零售门店</h3>
        <div class="service-right-section map-content">
            <!-- <img src="../../../../static/images/map.png" alt="" class="map"> -->
			<div id="allmap" class="allmap"></div>
            <p style="margin-top:20px;">(1) 南京思贝丽有限公司；地址：南京市玄武区珠江路汇文里12号；电话：025-84711906/025-84718591；</p>
            <p>(2) 南京思贝丽河图授权门店；地址:</p>
        </div>
    </div>
</template>

<script>
// import BMap from 'BMap'
export default {
  name: "Gmzn",
  data () {
      return {
        type: 'tab',
        address_detail: null,
		center: {lng:118.792969, lat: 32.055357},
		zoom:3
      }
	},
	mounted () {
      this.ready()
	},
	methods: {
      ready () {
        let map = new BMap.Map('allmap')
        let point = new BMap.Point(this.center.lng, this.center.lat)
        map.centerAndZoom(point, 10)
        map.enableScrollWheelZoom(true)
        map.enableDoubleClickZoom(true)
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((r) => {
          if (r.point) {
            this.center.lng = r.longitude
            this.center.lat = r.latitude
            let markers = new BMap.Marker(r.point)
            map.addOverlay(markers)
            map.panTo(r.point)
            map.centerAndZoom(r.point, 16)
          }
        }, { enableHighAccuracy: true })
      }
    }
};
</script>
<style scoped>
#allmap{
    width: 100%;
    height: 500px;
  }
.service-right {
	box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);
  width: 950px;
  padding: 28px 48px 80px;
  margin-bottom: 80px;
}
.service-right h3 {
  border-bottom: 1px solid #dbdbdb;
  font-size: 25px;
  color: #b0b0b0;
  line-height: 80px;
}
.service-right-section {
  padding-top: 40px;
}
.service-right-section p {
  text-indent: 2em;
  font-size: 14px;
}
.map {
  width: 800px;
}
.map-content p {
  line-height: 25px !important;
}
</style>
