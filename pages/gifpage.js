// import { useState } from "react"

// function giftPage(){

//     const [exerdb, UseExerdb] = useState([])

//     const fetchgif = async () =>{
//         const response = await fetch('/api/gif')
//         const data = await response.json()
//         UseExerdb(data)

//     }

//     return (
//         <div>
//             <button onClick={fetchgif}> Load comments</button>
//             {
//                 exerdb.map((exe) => {
//                     <div key={exe.id}>  
//                         {exe.id}{exe.gifUrl}

//                     </div>
//                 }
//                 )
//             }

//         </div>
//     )
// }

// export default giftPage