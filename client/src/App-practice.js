import logo from './logo.svg';
import './App.css';

function App() {
  const friends = [
    {name: "James", description: "Very friendly", comment: "Loves games", ditched: false},
    {name: "Mary", description: "Quite friendly", comment: "Passed the final exam", ditched: false},
    {name: "Carlos", description: "Not very friendly", comment: "Didnt have breakfast", ditched: true},
    {name: "John", description: "Neutral", comment: "Interesting stories", ditched: false}
  ];
          
  return (
    <>
      <div class="container">

      <h1 class="my-4">Friends</h1>

      <div class="row">
          {friends.map(element => 
            <div class="card m-2 w-25">
            <div class="card-body">
                <h5 class="card-title">{element.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{element.description}</h6>
                <p class="card-text">{element.comment}</p>
                {element.ditched ? <button class="btn btn-danger" disabled>Ditch</button> : <button class="btn btn-danger">Ditch</button>}
            </div>
        </div>)}
      </div>

      </div>
    </>
  );
}

export default App;
