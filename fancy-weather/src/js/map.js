import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

export default (cor) => {
    let coordinate = [...cor];
    coordinate.reverse();
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinate,
        zoom: 14
    });

    map.addControl(new mapboxgl.NavigationControl());

    const size = 200;

    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function() {
            let canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        render: function() {
            let duration = 1000;
            let t = (performance.now() % duration) / duration;

            let radius = size / 2 * 0.3;
            let outerRadius = size / 2 * 0.7 * t + radius;
            let context = this.context;

            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();

            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
            this.data = context.getImageData(0, 0, this.width, this.height).data;
            map.triggerRepaint();
            return true;
        }
    };

    map.on('load', function () {

        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinate
                        }
                    }]
                }
            },
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        });
    });
};


