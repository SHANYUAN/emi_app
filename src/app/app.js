/**
 * Add all your dependencies here.
 *
 * @require Popup.js
 * @require LayersControl.js
 */

// ========= config section ================================================
//var url = '/geoserver/ows?';
var url = '/geoserver/SPP/wms?';
var featureNS = 'http://census.gov';
var srsName = 'EPSG:900913';
var geometryName = 'the_geom';
var geometryType = 'MultiPolygon';
var fields = ['STATE_NAME', 'STATE_ABBR'];
var layerTitle = 'States';
var infoFormat = 'application/vnd.ogc.gml/3.1.1'; // can also be 'text/html'

var zoom = 3;
// ============ MY SETTINGS ========
var OVERLAY_OPACITY = 0.8;
var center = [20000000, 4000000];
// =========================================================================

// override the axis orientation for WMS GetFeatureInfo
var proj = new ol.proj.Projection({
    code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
    axis: 'enu'
});

ol.proj.addEquivalentProjections([ol.proj.get('EPSG:4326'), proj]);

var emiAttributions = new ol.Attribution({ html: "Global Emissions EDGAR v4.2 FT2010 (October 2013)"});

var emi_2000 = new ol.layer.Tile({
    //xtent: [-13884991, 2870341, -7455066, 6338219],
    title: 'CO2 Emissions 2000',
    source: getSource("SPP:emi_co2_2000"),
    opacity: OVERLAY_OPACITY,
    //attributions: [new ol.Attribution({ html: 'Layer123'})],
    //displayOutsideMaxExtent: true,
    //wrapDateLine: true,
    //displayOutsideMaxExtent: true,
    //maxExtent: [-180, -180, 180, 120],
    wrapDateLine: true,
    visible: false
});

var emi_2001 = new ol.layer.Tile({
    title: 'CO2 Emissions 2001',
    source: getSource("SPP:emi_co2_2001"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2002 = new ol.layer.Tile({
    title: 'CO2 Emissions 2002',
    source: getSource("SPP:emi_co2_2002"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2003 = new ol.layer.Tile({
    title: 'CO2 Emissions 2003',
    source: getSource("SPP:emi_co2_2003"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2004 = new ol.layer.Tile({
    title: 'CO2 Emissions 2004',
    source: getSource("SPP:emi_co2_2004"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2005 = new ol.layer.Tile({
    title: 'CO2 Emissions 2005',
    source: getSource("SPP:emi_co2_2005"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2006 = new ol.layer.Tile({
    title: 'CO2 Emissions 2006',
    source: getSource("SPP:emi_co2_2006"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2007 = new ol.layer.Tile({
    title: 'CO2 Emissions 2007',
    source: getSource("SPP:emi_co2_2007"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2008 = new ol.layer.Tile({
    title: 'CO2 Emissions 2008',
    source: getSource("SPP:emi_co2_2008"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2009 = new ol.layer.Tile({
    title: 'CO2 Emissions 2009',
    source: getSource("SPP:emi_co2_2009"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var emi_2010 = new ol.layer.Tile({
    title: 'CO2 Emissions 2010',
    source: getSource("SPP:emi_co2_2010"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var difflayer = new ol.layer.Tile({
    //xtent: [-13884991, 2870341, -7455066, 6338219],
    title: 'Difference 2010-2000',
    source: getSource("SPP:diff_2010_2000"),
    opacity: OVERLAY_OPACITY,
    visible: false
});

var layers = [

    // MapQuest imagery
    new ol.layer.Tile({
        title: 'Aerial Imagery',
        group: "background",
        visible: false,
        wrapDateLine: false,
        source: new ol.source.MapQuest({
            layer: 'sat'
        })
    }),

    // simple world borders
    new ol.layer.Tile({
        //xtent: [-13884991, 2870341, -7455066, 6338219],
        title: 'World Borders',
        group: "background",
        source: new ol.source.TileWMS({
            url: '/geoserver/SPP/wms?',
            params: {
                'LAYERS': 'SPP:world_borders_simple',
                'TILED': true
            },
            serverType: 'geoserver'
        }),
        visible: true
    }),

    // overlays
    emi_2000,
    emi_2001,
    emi_2002,
    emi_2003,
    emi_2004,
    emi_2005,
    emi_2006,
    emi_2007,
    emi_2008,
    emi_2009,
    emi_2010,
    difflayer
    /*
    new ol.layer.Tile({
        //xtent: [-13884991, 2870341, -7455066, 6338219],
        title: 'Difference 2010-2000',
        source: new ol.source.TileWMS({
            attributions: [emiAttributions],
            url: '/geoserver/SPP/wms?',
            params: {
                'LAYERS': 'SPP:diff_2010_2000',
                'TILED': true
            },
            serverType: 'geoserver'
        }),
        opacity: OVERLAY_OPACITY,
        visible: false
    })
*/
];

var view = new ol.View({
    //projection: 'EPSG:4326',
    center: [20000000, 4000000],
    minZoom: 2,
    zoom: 3,
    maxZoom: 6
    //maxResolution: 0.703125      
});

var controls = [
    new app.LayersControl({  // layer tree
        groups: {
            background: {
                title: "Base Layers",
                exclusive: true
            },
            'default': {
                title: "Overlays",
                exclusive: false
            }
        }
    }),
    new ol.control.Attribution({  // collpasible icon
        collapsible: true,
        collapsed: true
    }),
    new ol.control.Zoom(),  // basic zoom buttons
    //new ol.control.FullScreen(),
    new ol.control.ScaleLine()

];

// create the OpenLayers Map object
// we add a layer switcher to the map with two groups:
// 1. background, which will use radio buttons
// 2. default (overlays), which will use checkboxes
var map = new ol.Map({

    controls: controls,

    // add the popup as a map overlay
    //overlays: [legendOverlay],
    // render the map in the 'map' div
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: layers,  // defined earlier
    view: view  // defined earlier
});

// TODO: dynamic legend
emi_2000.on("change:visible", function(e) {
    if (emi_2000.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2000");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2001.on("change:visible", function(e) {
    if (emi_2001.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2001");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2002.on("change:visible", function(e) {
    if (emi_2002.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2002");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2003.on("change:visible", function(e) {
    if (emi_2003.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2003");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2004.on("change:visible", function(e) {
    if (emi_2004.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2004");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2005.on("change:visible", function(e) {
    if (emi_2005.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2005");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2006.on("change:visible", function(e) {
    if (emi_2006.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2006");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2007.on("change:visible", function(e) {
    if (emi_2007.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2007");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2008.on("change:visible", function(e) {
    if (emi_2008.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2008");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2009.on("change:visible", function(e) {
    if (emi_2009.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2009");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

emi_2010.on("change:visible", function(e) {
    if (emi_2010.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:emi_co2_2010");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

// switch legend when diff layer is active
difflayer.on("change:visible", function(e) {
    if (difflayer.getVisible() === true) {
        //console.log("diff visible!!!!");
        var legendHTML = getLegend("SPP:diff_2010_2000");
        $("#legend-container").empty();
        $("#legend-container").append(legendHTML);
    }
});

function getLegend(layer_name) {
    html = '<p id="legend-title">tons CO2 per year per grid cell</p>' +
       '<img id="legend" src="http://haefen.i3mainz.hs-mainz.de/geoserver/SPP/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=15&HEIGHT=15&LAYER=' + layer_name + '&LEGEND_OPTIONS=fontName:arial">';
    return html;
}

function getSource(layer_name) {
    var source = new ol.source.TileWMS({
        attributions: [emiAttributions],
        url: '/geoserver/SPP/wms?',
        params: {
            'LAYERS': layer_name,
            'TILED': true
        },
        serverType: 'geoserver'
    });
    return source;
}