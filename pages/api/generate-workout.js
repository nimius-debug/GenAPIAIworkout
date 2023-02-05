import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const {weight,age,ft,inch,goal} = req.body;  
  const prompt = generatePrompt(weight,age,ft,inch,goal);
  console.log(prompt)

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(weight,age,ft,inch,goal),
      temperature: 0.7,
      max_tokens: 200,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(weight,age,ft,inch,goal) {
  return `Pick Exactly 12 items from below the ${goal} 
  for a ${age} years old person that weighs ${weight}lb and has a height of ${ft}ft and ${inch}in. 
  only workout names in lowercase,no description or numbers
    "3/4 sit-up",
    "air bike",
    "all fours squad stretch",
    "alternate heel touchers",
    "ankle circles",
    "archer push up",
    "back and forth step",
    "backward jump",
    "bear crawl",
    "body-up",
    "bodyweight drop jump squat",
    "bodyweight kneeling triceps extension",
    "bodyweight side lying biceps curl",
    "bodyweight standing calf raise",
    "bottoms-up",
    "burpee",
    "butt-ups",
    "butterfly yoga pose",
    "calf push stretch with hands against wall",
    "calf stretch with hands against wall",
    "chest and front of shoulder stretch",
    "circles knee stretch",
    "clap push up",
    "clock push-up",
    "close-grip push-up (on knees)",
    "cocoons",
    "crab twist toe touch",
    "cross body crunch",
    "crunch (hands overhead)",
    "crunch floor",
    "curl-up",
    "curtsey squat",
    "dead bug",
    "diamond push-up",
    "drop push up",
    "elbow-to-knee",
    "flexion leg sit up (bent knee)",
    "flexion leg sit up (straight arm)",
    "forward jump",
    "frog crunch",
    "frog planche",
    "front plank with twist",
    "full maltese",
    "full planche",
    "full planche push-up",
    "glute bridge march",
    "gorilla chin",
    "groin crunch",
    "hamstring stretch",
    "handstand",
    "high knee against wall",
    "hip raise (bent knee)",
    "hug keens to chest",
    "inchworm",
    "inchworm v. 2",
    "incline push-up",
    "incline scapula push up",
    "incline twisting sit-up",
    "iron cross stretch",
    "isometric chest squeeze",
    "isometric wipers",
    "jack burpee",
    "jackknife sit-up",
    "janda sit-up",
    "jump squat",
    "jump squat v. 2",
    "kick out sit",
    "knee touch crunch",
    "kneeling lat stretch",
    "l-sit on floor",
    "left hook. boxing",
    "leg up hamstring stretch",
    "low glute bridge on floor",
    "lower back curl",
    "lunge with jump",
    "lunge with twist",
    "lying (side) quads stretch",
    "lying elbow to knee",
    "lying leg-hip raise",
    "march sit (wall)",
    "modified push up to lower arms",
    "monster walk",
    "mountain climber",
    "neck side stretch",
    "oblique crunches floor",
    "one arm against wall",
    "one arm dip",
    "one leg donkey calf raise",
    "one leg floor calf raise",
    "one leg squat",
    "outside leg kick push-up",
    "overhead triceps stretch",
    "pelvic tilt",
    "pelvic tilt into bridge",
    "pike-to-cobra push-up",
    "plyo push up",
    "posterior step to overhead reach",
    "potty squat",
    "power point plank",
    "push-up inside leg kick",
    "push-up on lower arms",
    "push-up plus",
    "push-up to side plank",
    "quarter sit-up",
    "quick feet v. 2",
    "raise single arm push-up",
    "rear decline bridge",
    "rear deltoid stretch",
    "reverse crunch",
    "reverse dip",
    "reverse plank with leg lift",
    "rocking frog stretch",
    "runners stretch",
    "russian twist",
    "scapula push-up",
    "seated side crunch (wall)",
    "seated wide angle pose sequence",
    "short stride run",
    "shoulder tap",
    "side bridge hip abduction",
    "side bridge v. 2",
    "side hip abduction",
    "side lying floor stretch",
    "side push neck stretch",
    "side push-up",
    "side wrist pull stretch",
    "side-to-side toe touch (male)",
    "single leg bridge with outstretched leg",
    "single leg platform slide",
    "single leg squat (pistol) male",
    "sit-up v. 2",
    "sit-up with arms on chest",
    "skater hops",
    "ski step",
    "sphinx",
    "spider crawl push up",
    "spine stretch",
    "spine twist",
    "split squats",
    "squat to overhead reach",
    "squat to overhead reach with twist",
    "stalder press",
    "standing archer",
    "standing calf raise (on a staircase)",
    "standing calves",
    "standing lateral stretch",
    "standing pelvic tilt",
    "standing single leg curl",
    "straddle maltese",
    "straddle planche",
    "straight leg outer hip abductor",
    "superman push-up",
    "triceps dips floor",
    "triceps stretch",
    "tuck crunch",
    "twist hip lift",
    "upper back stretch",
    "upward facing dog",
    "v-sit on floor",
    "walking high knees lunge",
    "walking lunge",
    "wheel run",
    "wide hand push up",
    "wind sprints",
    "world greatest stretch",
    "wrist circles"
`;
}
