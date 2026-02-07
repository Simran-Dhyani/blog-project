import React from "react";
import {container,LogOutBtn,Logo} from "./index"
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(){
    const authStatus=useSelector((state)=>state.Auth.status)
    const navigate=  useNavigate();
    const navItem=[
        {
            name:"Home",
            slug:"/",
            active:true
        },
        {
             name:"Login",
            slug:"/login",
            active:!authStatus
        },
        {
             name:"Signup",
            slug:"/signup",
            active:!authStatus
        },
        {
             name:"Signup",
            slug:"/signup",
            active:!authStatus
        },
        {
             name:"All Posts",
            slug:"/all-posts",
            active:authStatus
        },
        {
             name:"Add Posts",
            slug:"/add-posts",
            active:authStatus
        }
    ]
    return(
       <Header className="py-4 bg-gray-400">
        <Container>
        <nav className="flex">
            <div className="mr-4">
                <Link to="/">
                <Logo width="70px"/>
                </Link>
            </div>
            <ul className="flex ml-auto">
                {navItem.map((item)=>
                item.active?
               (<li key={item.name}>
                <button
                onClick={()=>navigate(item.slug)}
                className="inline-block px-3 py-4 rounded-full hover:bg-blue-100"
                >{item.name}
                </button>
                </li>)
                :null
                )}

                {authStatus && (
                    <li >
                    <LogOutBtn/>
                    </li>
                )}
                
            </ul>

        </nav>
        </Container>
       </Header>
    )
}
export default Header;