function getRandomLatLng() {
  const minLat = 36.0;
  const maxLat = 71.0;
  const minLng = -10.0;
  const maxLng = 40.0;

  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  return { lat, lng };
}

function initialize() {
  const sv = new google.maps.StreetViewService();

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: 0, lng: 0 },
    mapTypeId: "roadmap",
    streetViewControl: false,
    disableDefaultUI: true,
  });

  function tryLocation() {
    const location = getRandomLatLng();

    sv.getPanorama({ location, radius: 100 }, (data, status) => {
      if (status === "OK") {
        const panoLoc = data.location.latLng;

        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: panoLoc,
            pov: { heading: 0, pitch: 0 },
            disableDefaultUI: true,
          }
        );

        map.setCenter(panoLoc);
        map.setStreetView(panorama);
      } else {
        tryLocation();
      }
    });
  }

  tryLocation();
}

window.initialize = initialize;
