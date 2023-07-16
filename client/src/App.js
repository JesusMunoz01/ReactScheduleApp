import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function Courses(info){
  console.log(info)
  const [instructorList, setList] = useState(info.section);
  const [edit, editI] = useState(false);
  const [courseList, setCList] = useState(info.names)

  const deleteInstructor = (val, id, index) => {
    //console.log(val,index,id)
    // let newT = [];
    // console.log(id)
    // instructorList.forEach((element, iterat) => {
    //   if(index !== iterat)
    //     newT[iterat] = element
    // });
    const del = async () => {
      try{
        console.log("...sending delete post");
        const result = await fetch('http://localhost:8080/delete', {method: "POST", headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: id
          })
      });
      const data = await result.json();
      if(data.data.status === 'Ok'){
         console.log("...delete succeeded");
      } else{
         console.log("...delete failed");
      }
        console.log("...delete is done");
      } catch(error){
        console.log("...delete failed", error);
    }
  };
    del();
    let update = instructorList.filter((ele, iterat) => index !== iterat);
    //console.log(result);
    setList(update);
  }

  const changeInstructor = (val, course, index, id) => {
    val = parseInt(val, 10);
    const change = async () => {
      try{
        console.log("...sending change post");
        const result = await fetch('http://localhost:8080/changeInstructor', {method: "POST", headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              instructor: val, id: id
          })
      });
      const data = await result.json();
      if(data.data.status === 'Ok'){
         console.log("...change succeeded");
      } else{
         console.log("...change failed");
      }
        console.log("...change is done");
      } catch(error){
        console.log("...change failed", error);
    }
  };
    change();
    instructorList[index].instructor_id = val;
    editI(!edit);
    setList(instructorList);
  }

  const addInstructor = (target, id) =>{
    let lastId;
    const add = async () => {
      try{
        console.log("...sending add post");
        const result = await fetch('http://localhost:8080/add', {method: "POST", headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              instructor: target, course: id
          })
      });
      const data = await result.json();
      console.log(data);
      if(data.status === 'Ok'){
         console.log("...add succeeded");
         lastId = data.nextID;
      } else{
         console.log("...add failed");
      }
        console.log("...add is done");
      } catch(error){
        console.log("...add failed", error);
    }
  };
    add();
    const newInstructor = {id:lastId, course_id: id, instructor_id:target};
    //console.log([...instructorList, newInstructor]);
    setList([...instructorList, newInstructor]);
  }

  return(
    <>
    {courseList.map( (courses) =>
    <tr>
      <th scope="row">{courses.name}</th>
        <td>
          <div className="row g-2">
            {edit ?
              instructorList.map((data, index) =>
              (data.course_id === courses.id) ?
              <div className="col-auto">
                     <div className="input-group" >
                            <select className="form-select" value={data.instructor_id} onChange={(e) => changeInstructor(e.target.value, data.course_id, index, data.id)}>
                              {info.instructorsDB.map(newData => 
                                <option value={newData.id}>{newData.name}</option>
                              )}
                            </select>
                              <button className="btn btn-danger" value={data.instructor_id} onClick={(e) => deleteInstructor(e.target.value, data.id, index)}>-</button>
                            </div>
              </div> : null
            ):
            instructorList.map((data, index) =>
            (data.course_id === courses.id) ?
            <div className="col-auto">
                   <div className="input-group" >
                          <select className="form-select" value={data.instructor_id} onChange={(e) => changeInstructor(e.target.value, data.course_id, index, data.id)}>
                            {info.instructorsDB.map(newData => 
                              <option value={newData.id}>{newData.name}</option>
                            )}
                          </select>
                            <button className="btn btn-danger" value={data.instructor_id} onClick={(e) => deleteInstructor(e.target.value, data.id, index, courses.id)}>-</button>
                          </div>
            </div> : null
            )
            }
            
            <div className="col-auto">
            <select className="form-select" value={-1} onChange={(e) => addInstructor(e.target.value, courses.id)}>
            <option disabled value="-1">Add Section...</option>
            {info.instructorsDB.map(iData => 
              <option value={iData.id}>{iData.name}</option>
            )}
            </select>
            </div>
          </div>
        </td>
    </tr>
    )}
    </>
  );
}

function App() {
  console.log("App being redrawn");
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newC, setName] = useState(null);
  const [newCourse, addCourse] = useState(null);
 
  useEffect(() => {
    console.log("...calling effect");
      (async () => {
        try{
        setLoading(true);
        console.log("...making fetch call");
        const result = await fetch('http://localhost:8080/getData');
        const data = await result.json();
        console.log("...updating state");
        setLoading(false);
        setCourse(data);
        addCourse(data.course);
      } catch(error){
        setLoading(false);
        setError(true);
      }
    })();
  }, []);


  const addClass = e => {
    setName(e.target.value);
    console.log(newC);
  }

  const confirm = e =>{
      let newID;
      const add = async () => {
        try{
          console.log("...sending add post");
          const result = await fetch('http://localhost:8080/addCourse', {method: "POST", headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newC
            })
        });
        const data = await result.json();
        console.log(data);
        if(data.status === 'Ok'){
          console.log("...add succeeded");
          newID = data.nextID;
        } else{
          console.log("...add failed");
        }
          console.log("...add is done");
        } catch(error){
          console.log("...add failed", error);
      }
    };
      add();
    // course.course = ([...course.course, {name: 1, id:2}])
    // addCourse([...course.course, {id:7, name: newC}]);
  }
  
  return (
    <>
    <body>
    {loading ? 
    <h2>Loading...</h2>
    : error ? 
    <h2>Error</h2>
    :
    <div className="container">

      <h1>Build-A-Schedule</h1>

      <table className="table">
          <thead>
              <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Sections</th>
              </tr>
          </thead>
          <tbody>
            <Courses key={course.course.id} names={course.course} section={course.section} instructorsDB={course.instructor} newNames={newCourse}></Courses>
          </tbody>
      </table>
      <div className="row">
              <div className="col-auto">
                  <div className="input-group mb-3">
                      <form>
                          <input type="text" className="form-control" placeholder="Course Number" name="addCourse" onChange={addClass} />
                          <button type="submit" className="btn btn-primary" id="button-addon2" onClick={confirm}>Add Course</button>
                      </form>
                  </div>
              </div>
          </div>
    </div>
    }
    </body>
    </>
  );
}

export default App;
