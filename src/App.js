import React, { useState, useEffect } from "react";
import data from "./data";
import List from "./List";
// import apiData from "./apiData";
let apiPeopleData = {};

const url = "https://celebrity-bucks.p.rapidapi.com/birthdays/JSON";

function App() {
  const [celebrities, setCelebs] = useState([]);

  const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

  const celebrityPeople = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "celebrity-bucks.p.rapidapi.com",
      },
    });
    const celebrities = await response.json();
    setCelebs(celebrities.Birthdays);
  };

  useEffect(() => {
    celebrityPeople();
  }, []);

  return (
    <main>
      <section className="container">
        <h2>Celebrity Birthdays</h2>
        <p>Found {celebrities.length} Today</p>
        <ul className="users">
          {celebrities.map((celeb) => {
            console.log(celeb);
            const { celebId, name, age } = celeb;
            const img = `https://celebritybucks.com/images/celebs/mid/${celebId}.jpg`;
            return (
              <li key={celebId}>
                <img
                  src={img}
                  alt="Avatar"
                  // if no image for celeb
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://celebritybucks.com/images/celebs/mid/default.gif";
                  }}
                />
                <div>
                  <h3>{name}</h3>
                  <p>Age: {age}</p>
                  <a
                    href={`https://en.wikipedia.org/wiki/${name}`}
                    target="_blank"
                  >
                    <button className="btn">More Info</button>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
