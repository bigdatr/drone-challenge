import React from 'react'
import './Informations.css'

const processPhotos = (photosDroneOne,photosDroneTwo) => {
    let photos = photosDroneOne.concat(photosDroneTwo)
    let info = ''
    let uniques = [...new Set(photos)].length
    let duplicates = photos.length - uniques

    duplicates >= 1 ? duplicates++:''

    info = `${uniques} differents billboards`
    duplicates > 0 ? info += `, including ${duplicates} photos of the sames billboards`:''

    return info
}

const processLocation = (locationX,locationY) => {
    let info = ''

    locationX > 0 ? info += `${locationX} km north, `: info += `${locationX*-1} km south, `
    locationY > 0 ? info += `${locationY} km east`: info += `${locationY*-1} km west`

    if (locationX == 0 && locationY == 0) info = 'Starting Location'
    
    return info
}

export default props =>
    <div className="informations">
        <span>Location Drone 1: {processLocation(props.data.locationDroneOneX,props.data.locationDroneOneY)}</span><br/>
        <span>Location Drone 2: {processLocation(props.data.locationDroneTwoX,props.data.locationDroneTwoY)}</span><br/>
        <span>Photos: {
            processPhotos(props.data.photosDroneOne,props.data.photosDroneTwo)
        }</span>
    </div>