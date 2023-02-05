import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";


export default function WorkoutPage() {
  // weight,age,ft,inch,goal
  // const [weight, setWeight] = useState(220);
  // const [age, setAge] = useState(25);
  // const [ft, setFt] = useState(5);
  // const [inch, setInch] = useState(10);
  // const [goal, setGoal] = useState("lose weight");

  const [loading,setLoading]= useState(false)
  const [result, setResult] = useState();
  const [data, setData] = useState([])

  async function generateWorkout(event) {
    event.preventDefault();
    if (loading){
      return;
    }
    setLoading(true)
    try {
      const response = await fetch("/api/generate-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ weight, age, ft, inch, goal }),
      });
      
      const data = await response.json();
      console.log(data)
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.replaceAll('\n',"<br/>"));
      console.log(data)
      //Rapid API calling
      if (data){
        const exercisesJson = await fetch("/api/generate-gif")
        const exercisesData = await exercisesJson.json()
        console.log(exercisesData)
        const foundExercise = exercisesData.filter( e => data.result.includes(e.name))
        console.log(foundExercise);
        const finalExeList = foundExercise.slice(-12)
        setData(finalExeList);
        console.log(finalExeList)
      }
      // setWeight("");
      // setAge("");
      // setFt("");
      // setInch("");
      // setGoal("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally{
      setLoading(false);
    }

    }
    
  

  return (
    <div>
      <Head>
        <title> 7 Minute Workout Generator AI</title>
        <link rel="icon" href="/robot_icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/robot_icon.png" className={styles.icon} />
        <h3> 7 Minute Workout Generator AI </h3>
        <button onClick={generateWorkout}>
        Activate Lasers
        </button>
        {loading && (
          <div>
            <h3> Looking for the perfect 7-Min AI Workout 💡</h3>
            <img src="/workout.gif" className={styles.loading} />
          </div>
        )}
        {
          data && data.map((d)=>{
            return(
              <div key={d.id}>
                <h2>{d.name}</h2>
                <p>{d.gifUrl}</p>
                <Image 
                    src={d.gifUrl} 
                    width={150} 
                    height={150} 
                    alt={d.name}>
                </Image>
              </div>
            )
          })
        }

      </main>
    </div>
  );
}
