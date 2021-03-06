import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { OverlayTrigger, Well } from 'react-bootstrap';
import Control from 'react-leaflet-control';
import ziputils from 'jszip-utils';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import Loadable from 'react-loading-overlay'
import ProjGeoJson from '../components/ProjGeoJson';
import { Marker, Tooltip,Polygon } from 'react-leaflet';

import * as turf from '@turf/turf';
import polylabel from '@mapbox/polylabel'
import proj4 from 'proj4';
import { crs25832, proj4crs25832def } from '../constants/gis';

import * as gisHelpers from '../utils/gisHelper';

// Since this component is simple and static, there's no parent container for it.
const FeatureCollectionDisplay = ({mappingProps, style, labeler, featureClickHandler, mapRef}) => {
    let markers=[];
    let markerPos=[];
    let bbox=[ mappingProps.boundingBox.left,
                    mappingProps.boundingBox.bottom,
                    mappingProps.boundingBox.right,
                    mappingProps.boundingBox.top
                     ];
    let view=turf.bboxPolygon(bbox)
    let selectedMarkers=[];
    if (mappingProps.featureCollection.length>0) {
        for (let currentfeatureIdx in mappingProps.featureCollection) {
            let currentFeature=mappingProps.featureCollection[currentfeatureIdx];
            if (currentFeature.geometry.type==='Polygon' || currentFeature.geometry.type==='MultiPolygon' && currentFeature.geometry.coordinates.length===1) {
                //console.log("Polygon");
                let coordinates=null;
                if (currentFeature.geometry.type==='Polygon' ) {
                    coordinates=currentFeature.geometry.coordinates;
                }
                else {
                    //must currentFeature.geometry.type==='MultiPolygon' && currentFeature.geometry.coordinates.length===1
                    coordinates=currentFeature.geometry.coordinates[0];
                }
                
                let marker=createMarker(currentFeature,"marker."+currentFeature.id,coordinates,view,markerPos, labeler);
                if (currentFeature.selected==true) {
                    selectedMarkers.push(marker);
                }
                else {
                    markers.push(marker);
                }
                
            }
            else {
                //console.log("Multipolygon mit "+currentFeature.geometry.coordinates.length);
                for (let currentsubfeatureIdx in currentFeature.geometry.coordinates) {
                    let coordinates=currentFeature.geometry.coordinates[currentsubfeatureIdx]
                    let marker=createMarker(currentFeature,"marker.subfeature"+currentFeature.id+"."+currentsubfeatureIdx,coordinates,view,markerPos, labeler);
                    if (currentFeature.selected==true) {
                        selectedMarkers.push(marker);
                    }
                    else {
                        markers.push(marker);
                    }                
                }
            }
        }
        for (let midx in selectedMarkers) {
            markers.push(selectedMarkers[midx]);
        }        
    }



  return (
    <div>
         <ProjGeoJson key={JSON.stringify(mappingProps)} mappingProps={mappingProps} style={style}  featureClickHandler={featureClickHandler} mapRef={mapRef}/>
        {markers}         

    </div>
  );
};

function createMarker(currentFeature, key, coordinates, view, markerPos, labeler) {
    //get the subfeature into a polygon                    
    let polygon=turf.polygon(coordinates);

    //intersect it with the bb
    let newPoly=turf.intersect(view,polygon);

    let pointOnPolygon=null
    if (newPoly) {
        pointOnPolygon =gisHelpers.getLabelPosition(newPoly) //if there is a multipolygon created from the boundingbox intersects use the first 
    }
    else {
        pointOnPolygon = polylabel(coordinates)
    }

    if (isNaN(pointOnPolygon[0])) {
        pointOnPolygon = polylabel(coordinates)
    }
    let pointOnPolygonWGS84=proj4(proj4crs25832def,proj4.defs('EPSG:4326'),[pointOnPolygon[0],pointOnPolygon[1]]);

    let offset=null;
    let position=[pointOnPolygonWGS84[1],pointOnPolygonWGS84[0]];
    if (markerPos.includes(position[0]+"-"+position[1])) {
        offset=new L.point(15,15);
    }
    else {
        offset=new L.point(-15,-15);
    }
    markerPos.push(position[0]+"-"+position[1]);                 
    return (
        <Marker key={key} position={[pointOnPolygonWGS84[1],pointOnPolygonWGS84[0]]} opacity={0.0} onClick={labelClick}>
            <Tooltip className={'customGeoJSONFeatureTooltipClass'} permanent={true} direction={'center'} offset={offset} onClick={labelClick}>
                <div>{labeler(currentFeature)}</div>
            </Tooltip>
        </Marker>
    )
}

function labelClick(event) {
    // console.log("TOOOOOOLTIP");
    // console.log(event);
}

export default FeatureCollectionDisplay;
 FeatureCollectionDisplay.propTypes = {
   mappingProps: PropTypes.object.isRequired,
   style: PropTypes.func.isRequired,
   labeler: PropTypes.func.isRequired,
   featureClickHandler: PropTypes.func.isRequired,
   mapRef: PropTypes.object,
 };
 