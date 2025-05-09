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
  const sv = new google.maps.StreetViewService(document.getElementById("pano"), {
      StreetViewPanoramaOptions: false,
      disableDefaultUI: true,
      linksControl: true,

  });
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: 0, lng: 0 },
      mapTypeId: "roadmap",
      streetViewControl: false,
      fullscreenControl: false,
      disableDefaultUI: true,
  });

  function tryLocation() {
    const randomLocation = getRandomLatLng();

    sv.getPanorama(
      {
        location: randomLocation,
        radius: 100,
      },
      (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          const panoLocation = data.location.latLng;

          map.setCenter(panoLocation);

          const panorama = new google.maps.StreetViewPanorama(
            document.getElementById("pano"),
            {
              position: panoLocation,
              pov: {
                heading: 34,
                pitch: 10,
              },
            }
          );

          map.setStreetView(panorama);
        } else {
          tryLocation(); //retry
        }
      }
    );
  }

  tryLocation();
}

window.initialize = initialize;