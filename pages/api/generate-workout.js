import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  // const {weight,age,ft,inch,goal} = req.body;  
  const prompt = generatePrompt();
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
      prompt: generatePrompt(),
      temperature: 0.7,
      max_tokens: 200,
    });
    
    res.status(200).json({ result: completion.data.choices[0].text });
    console.log(completion)
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

function generatePrompt() {
  return `
  '3/4 sit-up', 'air bike', 'all fours squad stretch', 'alternate heel touchers', 'ankle circles', 'archer push up',
  'back and forth step', 'back pec stretch',
  'backward jump', 'bear crawl', 'biceps leg concentration curl','body-up', 'bodyweight drop jump squat', 
  'bodyweight incline side plank', 'bodyweight kneeling triceps extension', 'bodyweight side lying biceps curl', 
  'bodyweight standing calf raise', 'bodyweight standing row', 
  'bottoms-up', 'box jump down with one leg stabilization', 'bridge - mountain climber (cross body)', 'burpee', 
  'butt-ups', 'butterfly yoga pose', 'calf push stretch with hands against wall', 'calf stretch with hands against wall', 
  'captains chair straight leg raise','chair leg extended stretch', 'chest and front of shoulder stretch', 
  'circles knee stretch', 'clap push up', 'clock push-up', 'close-grip push-up',
  'close-grip push-up (on knees)', 'cocoons', 'crab twist toe touch', 'cross body crunch', 'crunch (hands overhead)', 'crunch floor',
  'curl-up', 'curtsey squat', 'dead bug', 'decline push-up', 'decline sit-up', 'diamond push-up', 
  'donkey calf raise', 'elbow dips', 'elbow-to-knee', 'elevator', 
  'flexion leg sit up (bent knee)', 'flexion leg sit up (straight arm)', 'flutter kicks', 'forward jump','frog crunch', 
  'frog planche', 'front plank with twist', 'full maltese', 'full planche', 'full planche push-up', 'gironda sternum chin', 
  'glute bridge march','gorilla chin', 'groin crunch', 'hamstring stretch', 'handstand',
  'high knee against wall', 'hip raise (bent knee)', 
  'hug keens to chest', 'hyperextension', 'impossible dips', 'incline close-grip push-up',
  'incline push up depth jump', 'incline push-up', 'incline scapula push up', 'incline twisting sit-up', 'iron cross stretch', 'isometric chest squeeze', 'isometric wipers', 
  'jackknife sit-up', 'jump squat', 'jump squat v. 2', 'kick out sit', 
  'knee touch crunch', 'kneeling lat stretch', 'kneeling ', 'l-sit on floor', 'lean planche',
  'left hook. boxing', 'leg up hamstring stretch', 'low glute bridge on floor', 'lower back curl', 'lunge with jump', 
  'lunge with twist', 'lying (side) quads stretch','lying elbow to knee', 'lying leg-hip raise', 'march sit (wall)',
  'modified push up to lower arms', 'monster walk', 'mountain climber', 'neck side stretch', 'oblique crunch v. 2', 'oblique crunches floor', 
  'one arm against wall', 'one arm dip', 'one leg donkey calf raise', 'one leg floor calf raise', 'one leg squat',
   'outside leg kick push-up', 
  'overhead triceps stretch', 'pelvic tilt', 'pelvic tilt into bridge','pike-to-cobra push-up', 'plyo push up',
  'posterior step to overhead reach', 'potty squat', 'potty squat with support', 'power point plank', 'push to run', 'push-up (wall)', 'push-up (wall) v. 2', 'push-up inside leg kick', 'push-up on lower arms', 'push-up plus', 
  'push-up to side plank', 'quads', 'quarter sit-up', 'quick feet v. 2', 'raise single arm push-up','rear decline bridge', 
  'rear deltoid stretch, 'reverse crunch', 'reverse dip', 'reverse plank with leg lift', 'ring dips', 'rocking frog stretch', 
  'run', 'runners stretch', 'russian twist','scapula dips', 'scapula push-up', 'seated glute stretch', 'seated leg raise', 
  'seated lower back stretch', 'seated piriformis stretch', 'seated side crunch (wall)','seated wide angle pose sequence', 
  'self assisted inverse leg curl', 'self assisted inverse leg curl', 'self assisted inverse leg curl (on floor)', 
  'short stride run', 'shoulder tap', 'shoulder tap push-up', 'side bridge hip abduction', 'side bridge v. 2', 
  'side hip abduction', 'side lying floor stretch', 'side plank hip adduction', 
  'side push neck stretch', 'side push-up', , 'side-to-side chin', 'single arm push-up', 'single leg bridge with outstretched leg', 
  'single leg platform slide', 'sissy squat', 'sit-up v. 2', 'sit-up with arms on chest', 'skater hops', 'ski step', 'skin the cat',
  'sphinx', 'spider crawl push up', 'spine stretch', 'spine twist', 'split squats', 'squat to overhead reach', 
  'squat to overhead reach with twist', 'stalder press', 'standing archer','standing calf raise (on a staircase)','standing calves',
  'standing calves calf stretch', 'standing lateral stretch', 'standing pelvic tilt', 'standing single leg curl',
  'straddle maltese', 'straddle planche', 'straight leg outer hip abductor', 'superman push-up', 'suspended abdominal fallout',
  'suspended push-up', 'suspended row', 'suspended split squat', 'swing 360' , 'triceps stretch','tuck crunch', 'twist hip lift', 'twisted leg raise', 
  'upper back stretch', 'upward facing dog', 'v-sit on floor', 'walking high knees lunge', 
  'walking lunge', 'wheel run', 'wide hand push up', 
  'world greatest stretch', 'wrist circles'
  from the list pick exacly 15 and try to not reapeat any, write them exacly how they are in the list and dont number them
`;
}
