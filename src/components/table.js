
import React, { useEffect, } from "react";
import Popup from "reactjs-popup";
import '../styles/table.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getUsers } from "../store/actions/usersaction";
// import { emptyUser } from "../store/reducers/usersReducer";
import { empty } from "../store/actions/usersaction";
import { emptyUser } from "../store/reducers/usersReducer";

function Table() {
  const dispatch = useDispatch();
  const { users, loader } = useSelector((state) => state.users)     //destructuring
  // const api="https://jsonplaceholder.typicode.com/comments"
  // api.company="extern labs"

  console.log(users)
  // const emptyUser=(users.length=0)    
  // for (var prop in users) { if (users.hasOwnProperty(prop)) { delete users[prop]; } }


  let row;
  const start = (e) => {
    console.log("jkhdb", e)
    row = e.target;
  }
  const dragover = (e) => {
    // var e = event;
    console.log("tr", e.target.parentNode)     //tr parentnode
    // console.log("tr-empty",e.target.parentNode.parentNode)  
    // console.log("tr-empty",e.target.parentNode.parentNode.children)

    e.preventDefault();       //cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

    //The Array.from() method returns an array from any object with a length property.
    ////The Array.from() method returns an array from any iterable object.
    let children = Array.from(e.target.parentNode.parentNode.children);   // tbody(parentnode) tr(parentnode) td(text)       

    //console.log("first:",children.indexOf(e.target.parentNode))

    //when we are dropping (putting)  that will show in particular row index[0,1,2]
    //console.log("second:",children.indexOf(row))
    //console.log("whole condition:",children.indexOf(e.target.parentNode)>children.indexOf(row))

    if (children.indexOf(e.target.parentNode) > children.indexOf(row))   //tr indexs --->  tbody indexes    row means any rowin table
      e.target.parentNode.after(row);        //dragiing downwards(movement upward to downward)
    else
      e.target.parentNode.before(row);         //dragging upwards ^ (movement downward to upward)
  }
  // const empty = () => {
  //   dispatch(emptyUser());
  //   // history.push("/");
  // };

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  // useEffect(() => {
  // dispatch(empty())
  // console.log('data',empty)

  //   // let a = users
  //   // a = [];
  //   // console.log("usrs", a)

  // }, [users])



  // console.log("empty",empty)


  return !loader ? <div>
    <table style={{ border: "1px solid black", textAlign: "center" }}>
      <thead>
        <tr >
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>company</th>
        </tr>
      </thead>

      <tbody>
        {users && users?.map((items, index) => (


          <tr key={items.id} draggable="true" onDragStart={(e) => start(e)} onDragOver={(e) => dragover(e)}>
            <td>{items.id}</td>

            <Link to={`/users/${index}`} style={{ textDecoration: "none", color: "black", }}>
          <td>{items.name}</td>
            </Link>

            <td>{items.email}</td>
            <td>{items.company}</td>
            <td>

              <Popup
                trigger={<button className="Hover" style={{ border: "none", backgroundColor: "white", fontSize: "26px" }}>...</button>}
                position="right center"
              >
                <div style={{ border: "1px solid aqua", backgroundColor: "aqua" }}>
                  <div className="hide"
                    style={{
                      height: "80px",
                      width: "200px",
                      overflow: "overlay"
                    }}
                  >
                    <ul>
                      <li>{items.body}</li>
                    </ul>
                  </div>
                </div>

              </Popup>
            </td>
          </tr>


        ))}
      </tbody>
    </table>
  </div> : <div>Loading....</div>

}

export default Table;