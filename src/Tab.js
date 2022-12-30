import React from "react";
import { useEffect, useState } from "react";
import './Tab.css';
import arrowUp from "./arrow-to-up.png";
import arrowDown from "./arrow-to-down.png"
export default function (props) {
   const [dane, setDane] = useState();

   useEffect(() => {
      const wynik = [];
      async function getAPI() {
         for (const x of props.planets) {
            const response = await fetch(x);
            const responseJSON = await response.json();
            wynik.push(responseJSON);
         }
         setDane(wynik);
      }
      getAPI();
   }, []);

   const [isShown, setIsShown] = useState(true);

  const handleClick = event => {
    setIsShown(current => !current);
  };
  const sortData = (parameter) => {
   const sorted= [...dane].sort((a,b) => {
   if(parameter!="name"){
      if(parseInt(a[parameter])<parseInt(b[parameter])) return 1;
      if(parseInt(a[parameter])>parseInt(b[parameter])) return -1;
      return 0;
   } else{
      if(a[parameter]<b[parameter]) return -1;
      if(a[parameter]>b[parameter]) return 1;
      return 0;}
   });
   console.log("Dane przed:", dane)
   setDane(sorted)
   console.log("Dane po:", dane)
  }
  const [arrowImg, setArrowImg] = useState(arrowDown);

  const changeArrowImg = () => {
   let value = arrowImg;
   if(value === arrowDown){
      setArrowImg(arrowUp)
   }else{
      setArrowImg(arrowDown)
   }
  }
  const slideVideo = () => {
   handleClick();
   changeArrowImg()
  }
 

   return (
      <div className="main-video-div">
         <div className="title-div">
         <p>{props.title}</p>
         <img src={arrowImg} onClick={slideVideo} className="slideArrow"></img>
         </div>
         {isShown&&(<div className="video-data-div">
         <table>
         
                    <tr>
                     <th>Name <p onClick={() => sortData("name")}>Namee</p></th> 
                     <th>Diameter</th> <p onClick={() => sortData("diameter")}>Diam</p>
                     <th>Orbital Period</th> <p onClick={() => sortData("orbital_period")}>Orb</p>
                    </tr>
         {dane
            ? dane.map((dane) => (
                     <tr>
                        <td>{dane.name}</td>
                        <td>{dane.diameter}</td>
                        <td>{dane.orbital_period}</td>
                     </tr>

              ))
            : null}
            </table>
            </div>)}
      </div>
   );
}
