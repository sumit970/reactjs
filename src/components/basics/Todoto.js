import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
//get the data from local storage;
const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return[];
  }
};

  const  Todoto=()=> {
  const [inputdata, setinputData] = useState("");
  const [items, setitems] = useState(getLocalData());
  const [isedititems,setedititems] = useState("");
  const [toggleButton,settoggleButton] = useState(false);
  

  // add the items
  const Additem = () => {
    if (!inputdata) {
      alert("please Enter data");
    }
    else if(inputdata && toggleButton )
    {
      setitems(
      items.map((curElem)=>{
        if(curElem.id===isedititems){
          return {...curElem,name:inputdata}
        }
        return curElem;
      })
      );
      setinputData("");
    setedititems(null);
    settoggleButton(false);

    }
    
     else {
      const newitem = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };

      setitems([...items, newitem]);
      setinputData("");
    }
  };
//edit the items
const editItem=(index)=>{
const item_todo_edited=  items.find((currelem)=>{

    return currelem.id===index;

  })
  setinputData(item_todo_edited.name);
  setedititems(index);
  settoggleButton(true);

}
  //function to delete items.
  const deleteitem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setitems(updatedItems);
  };

  //to create delete all buttons
  const DeleteAll=()=>{
       setitems([]);

  }
  // use local data.
  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items))
  }, [items]);


  return (
    <>

      {/* {toggleButton ? (
              <i className="far fa-edit add-btn" ></i>
            ) : (
              <i className="fa fa-plus add-btn" ></i>

            )} */}

      <div className="main-div">
        <div className="child-div">
          <img src="./images/todo.svg" alt="todo logo" />
          <figure>
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍️Add Items"
              className="form-control"
              value={inputdata}
              onChange={(event) => setinputData(event.target.value)}
            />
            {toggleButton ?(
              <i className="fa fa-edit add-btn"onClick={Additem} ></i>
              ) : (
                <i className=" fa fa-plus del-btn" onClick={Additem}></i>

            )}

          </div>
        </div>

        {/* i className=" fa fa-sharp fa-solid fa-trash */}
        {/* to display the added items */}
        <div className="addeditem-container">
          {items.map((currelem) => {
            return (
              <>
                <div className="eachitem">
                  <h3 className="listitems">{currelem.name} </h3>
                  {/* <h3 className="listitems">{currelem.id} </h3> */}
                  <div className="todo-btn">
                    <i className="fa fa-edit add-btn "onClick={()=>editItem(currelem.id)}></i>
                    <i
                       className ="fa fa-solid fa-trash"
                      onClick={() => deleteitem(currelem.id)}
                    ></i>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="eachitem">
          <button class="button-29" role="button" onClick={DeleteAll}>
          Delete All
          </button>

          {/* <h3 className="listitems">{currelem.id} </h3> */}
        </div>
      </div>
    </>
  );
}

export default Todoto;


