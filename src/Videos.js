import React from "react";
import { useEffect, useState } from "react";
import Tab from "./Tab.js";
export default function Videos() {
   const [dane, setDane] = useState();
   useEffect(() => {
      async function getAPI() {
         const response = await fetch("http://swapi.py4e.com/api/films/");
         const responseJSON = await response.json();

         setDane(responseJSON.results);
      }

      // odpalamy
      getAPI();
   }, []);
   return (
      <div>
         
         {dane
            ? dane.map((dane) => (
                 <Tab title={dane.title} planets={dane.planets}></Tab>
              ))
            : "loading"}
         
      </div>
   );
}
