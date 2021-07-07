import React, { Suspense} from "react";
import { Canvas} from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";

import Museum from "./components/museum";
import Exhibit from "./components/exhibits";
import Floor from "./components/floor";

import mona from "./objects/mona.jpg"
import boromir from "./objects/boromir.jpg"
import godzilla from "./objects/van_gough.jpg"
import squid from "./objects/squid.png"

import "./App.css";

const MUS_WIDTH = 50;
const MUS_HEIGHT = 12;
const MUS_POSITION = [0,0,0]
const FLOOR_SIZE = 10;
const EXHIBITS = [mona, boromir, godzilla, squid]
const EXHIBIT_PROPS = [
  [mona,{
    id:1,  
    size:[3.5,5], 
    text:"Mona Lisa | 300 BC", 
    description:"Welcome to the virtual history and science museum."}],
  [boromir, {
      id:2,  
      size:[8,5],   
      text:"Boromir's Warning | 903 AD",
      description:"blah blah blah."}],
  [godzilla,{
      id:3,  
      size:[7,5],   
      text:"Starry Night | 123 AD", 
      description:"testing testing testing"}],
  [squid,{
      id:4,  
      size:[5,5],   
      text:"S. Ward | Unknown", 
      description:"12345647369239487368673984789374892374."}]
];

const setupExhibitItems = () =>{
  const exhibitItems = []

  for (let i = 0, j = -MUS_WIDTH/2; i < EXHIBITS.length; i++, j+= Math.floor((MUS_WIDTH/(EXHIBITS.length-1)))){
    exhibitItems.push(
        <Exhibit 
            key={EXHIBIT_PROPS[i][1].id}
            position={[j, 1, 0.1]} 
            size={EXHIBIT_PROPS[i][1].size} 
            text={EXHIBIT_PROPS[i][1].text}
            image={EXHIBIT_PROPS[i][0]}
            museumParams={[MUS_WIDTH,MUS_HEIGHT,FLOOR_SIZE]}
            description = {EXHIBIT_PROPS[i][1].description}
        />
    );
  }
  return exhibitItems;
}

function App() {

  const items = setupExhibitItems();

  return (
    <>
    <Canvas 
      style={{height:"100vh", width:"100vw"}}
      dpr={Math.max(window.devicePixelRatio, 2)} 
      resize={{scroll: false}}
      camera={{position:[MUS_POSITION[0],MUS_POSITION[1],FLOOR_SIZE+5], fov:95}}>
        <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <Museum position={MUS_POSITION} width={MUS_WIDTH} height={MUS_HEIGHT} floorSize={FLOOR_SIZE}/>
            <Floor position={MUS_POSITION} width={MUS_WIDTH} height={MUS_HEIGHT} floorSize={FLOOR_SIZE}/>
            {items}
            <OrbitControls 
              minDistance={5} maxDistance={FLOOR_SIZE-1}
              minAzimuthAngle ={-Math.PI/2.1} maxAzimuthAngle={Math.PI/2.1}
              minPolarAngle={1} maxPolarAngle={Math.PI/1.5}
              keyPanSpeed={{FLOOR_SIZE}}>
            </OrbitControls>

        </Suspense>
    </Canvas>
    </>
  );
}

export default App;
