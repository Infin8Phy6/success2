const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend connections
app.use(cors()); 
app.use(express.json()); // Middleware for parsing JSON requests

// Corrected CORS Headers Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins, change * to specific domain if needed
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allowed headers
  next();
});

// Define the Question type
const questions = [
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
      "qid": "q1",
      "question": "Who is considered the father of Behaviorism?",
      "options": ["John Watson", "B.F. Skinner", "Ivan Pavlov", "Edward Thorndike"],
      "correctAnswer": "John Watson",
      "explanation": "John Watson founded the school of Behaviorism, emphasizing observable behaviors over internal processes."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
      "qid": "q2",
      "question": "Which experiment by Ivan Pavlov demonstrated the principle of classical conditioning?",
      "options": ["The Little Albert Experiment", "Operant Conditioning Chamber", "Dog Salivation Experiment", "Trial-and-Error Learning"],
      "correctAnswer": "Dog Salivation Experiment",
      "explanation": "Ivan Pavlov’s Dog Salivation Experiment demonstrated classical conditioning by pairing a neutral stimulus with a natural response."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
      "qid": "q3",
      "question": "What type of reinforcement strengthens a behavior by adding a positive stimulus after the desired behavior?",
      "options": ["Negative Reinforcement", "Positive Reinforcement", "Punishment", "Extinction"],
      "correctAnswer": "Positive Reinforcement",
      "explanation": "Positive reinforcement strengthens behaviors by adding favorable outcomes or stimuli following the behavior."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
      "qid": "q4",
      "question": "How does negative reinforcement differ from punishment in behavior modification?",
      "options": ["Punishment weakens behavior, while negative reinforcement strengthens it.", "Punishment uses positive stimuli, negative reinforcement uses neutral stimuli.", "Negative reinforcement weakens behavior, punishment strengthens it.", "They are the same in effect but vary in application."],
      "correctAnswer": "Punishment weakens behavior, while negative reinforcement strengthens it.",
      "explanation": "Negative reinforcement removes unpleasant stimuli to encourage behavior, whereas punishment seeks to decrease or suppress undesired behavior."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
      "qid": "q5",
      "question": "What role does extinction play in classical conditioning?",
      "options": ["Extinction strengthens the conditioned response.", "Extinction introduces punishment to suppress responses.", "Extinction gradually reduces the conditioned response when reinforcement stops.", "Extinction applies operant conditioning principles."],
      "correctAnswer": "Extinction gradually reduces the conditioned response when reinforcement stops.",
      "explanation": "Extinction occurs when the conditioned stimulus no longer elicits the conditioned response due to a lack of reinforcement."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
      "qid": "q6",
      "question": "Why is the concept of reinforcement significant in operant conditioning?",
      "options": ["It introduces variability into behavior patterns.", "Reinforcement exclusively leads to extinction of behaviors.", "It helps strengthen desired behaviors by using rewards or removing aversive stimuli.", "Reinforcement focuses only on punishment-based systems."],
      "correctAnswer": "It helps strengthen desired behaviors by using rewards or removing aversive stimuli.",
      "explanation": "Reinforcement strengthens behaviors by either adding positive stimuli or removing unpleasant stimuli after the behavior occurs."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
      "qid": "q7",
      "question": "In classical conditioning, what is a neutral stimulus (NS)?",
      "options": ["A stimulus that causes an automatic response.", "A stimulus paired with the unconditioned stimulus.", "A stimulus not associated with any conditioned response initially.", "A stimulus used to punish unwanted behavior."],
      "correctAnswer": "A stimulus not associated with any conditioned response initially.",
      "explanation": "A neutral stimulus does not produce a conditioned response until paired with an unconditioned stimulus."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
      "qid": "q8",
      "question": "What distinguishes primary reinforcers from secondary reinforcers?",
      "options": ["Primary reinforcers lose value over time; secondary reinforcers do not.", "Primary reinforcers satisfy basic needs; secondary reinforcers derive value from association.", "Primary reinforcers are learned; secondary reinforcers are innate.", "Primary reinforcers require conditioning; secondary reinforcers do not."],
      "correctAnswer": "Primary reinforcers satisfy basic needs; secondary reinforcers derive value from association.",
      "explanation": "Primary reinforcers, like food or water, satisfy biological needs; secondary reinforcers acquire value through learned association."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
      "qid": "q9",
      "question": "You want to train a dog to sit using positive reinforcement. What should your process be?",
      "options": ["Provide a treat every time the dog exhibits any behavior.", "Use negative reinforcement by withholding food when the dog does not sit.", "Reward the dog with treats only when it sits on command.", "Apply punishment if the dog disobeys the command."],
      "correctAnswer": "Reward the dog with treats only when it sits on command.",
      "explanation": "Positive reinforcement involves giving a treat to strengthen the sitting behavior whenever the dog follows the command."
    },
    {
      "major": "Prof Ed",
      "subject": "Learning Theory",
      "topic": "Behaviorism",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
      "qid": "q10",
      "question": "In a classroom, a teacher uses a point system to encourage homework completion. What is this an example of?",
      "options": ["Punishment", "Negative Reinforcement", "Token Economy", "Classical Conditioning"],
      "correctAnswer": "Token Economy",
      "explanation": "A token economy uses points or tokens as secondary reinforcers, encouraging desired behavior."
    },
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary focus of early childhood education?",
      "options": [
        "To prepare children for primary education through structured academic learning.",
        "To encourage the development of social, emotional, cognitive, and physical skills.",
        "To teach children specific subject knowledge like math and language.",
        "To focus mainly on play-based learning without structure."
      ],
      "correctAnswer": "To encourage the development of social, emotional, cognitive, and physical skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which stage of development is typically associated with early childhood education?",
      "options": [
        "Infancy",
        "Preschool",
        "Elementary",
        "Adolescence"
      ],
      "correctAnswer": "Preschool"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of play in early childhood education?",
      "options": [
        "It is only a break from learning and not essential.",
        "It helps develop social, cognitive, and physical skills.",
        "It is used only for entertainment and should not be structured.",
        "It is used only for learning academic subjects."
      ],
      "correctAnswer": "It helps develop social, cognitive, and physical skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is social interaction important for children in early childhood education?",
      "options": [
        "It helps children learn academic subjects more quickly.",
        "It aids in the development of communication and social skills.",
        "It is important for preparing children for standardized tests.",
        "It is only important when children reach school age."
      ],
      "correctAnswer": "It aids in the development of communication and social skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does scaffolding benefit young learners in early childhood education?",
      "options": [
        "It provides constant guidance to ensure compliance with the rules.",
        "It offers a structured environment without room for exploration.",
        "It helps children perform tasks just beyond their current abilities with support.",
        "It focuses solely on providing academic challenges to students."
      ],
      "correctAnswer": "It helps children perform tasks just beyond their current abilities with support."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of assessment in early childhood education?",
      "options": [
        "To measure academic achievement and assign grades.",
        "To observe the development of skills and provide support.",
        "To enforce strict discipline among children.",
        "To determine which children should be promoted to the next grade."
      ],
      "correctAnswer": "To observe the development of skills and provide support."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to create a nurturing and safe environment in early childhood education?",
      "options": [
        "To ensure children stay focused on academic tasks only.",
        "To foster emotional security, allowing children to learn and explore.",
        "To prevent children from socializing too much during class.",
        "To ensure that the children learn specific academic subjects more effectively."
      ],
      "correctAnswer": "To foster emotional security, allowing children to learn and explore."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply the concept of 'developmentally appropriate practice' in an early childhood setting?",
      "options": [
        "By providing rigid, age-specific content and structured activities.",
        "By tailoring the curriculum and activities to the individual developmental needs of each child.",
        "By focusing only on academic subjects and ignoring emotional development.",
        "By using standardized tests to measure all children's progress."
      ],
      "correctAnswer": "By tailoring the curriculum and activities to the individual developmental needs of each child."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher incorporate play-based learning into their curriculum?",
      "options": [
        "By setting aside time only for free play with no structure.",
        "By blending structured lessons with activities that encourage exploration and creativity.",
        "By eliminating playtime to focus solely on academic learning.",
        "By using playtime as a reward for completing assignments."
      ],
      "correctAnswer": "By blending structured lessons with activities that encourage exploration and creativity."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher support the development of fine motor skills in young children?",
      "options": [
        "By providing worksheets and exercises focused only on writing.",
        "By offering hands-on activities such as cutting, drawing, and building.",
        "By avoiding activities that require hand-eye coordination.",
        "By focusing only on large motor skill development."
      ],
      "correctAnswer": "By offering hands-on activities such as cutting, drawing, and building."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can you analyze the impact of a child’s family background on their early learning experience?",
      "options": [
        "By considering whether a child’s family is involved in their educational journey.",
        "By assessing the child's social skills only in the classroom.",
        "By focusing exclusively on the academic content they are taught.",
        "By ignoring the child’s home life and family background."
      ],
      "correctAnswer": "By considering whether a child’s family is involved in their educational journey."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the difference between intrinsic and extrinsic motivation in early childhood education?",
      "options": [
        "Intrinsic motivation comes from external rewards, while extrinsic motivation is driven by internal interests.",
        "Intrinsic motivation is driven by curiosity and interest, while extrinsic motivation is driven by external rewards or punishments.",
        "Intrinsic motivation is only relevant for older children, while extrinsic motivation is for younger children.",
        "Both intrinsic and extrinsic motivations are the same and can be used interchangeably."
      ],
      "correctAnswer": "Intrinsic motivation is driven by curiosity and interest, while extrinsic motivation is driven by external rewards or punishments."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the effectiveness of a play-based learning environment for young children?",
      "options": [
        "By observing how well children follow instructions and complete academic tasks.",
        "By assessing children's social interaction, creativity, and problem-solving skills during play.",
        "By measuring children’s ability to memorize facts and complete worksheets.",
        "By focusing only on the teacher’s ability to control the classroom."
      ],
      "correctAnswer": "By assessing children's social interaction, creativity, and problem-solving skills during play."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you integrate sensory play into an early childhood education curriculum?",
      "options": [
        "By including activities that engage multiple senses such as touch, sight, and sound to enhance learning.",
        "By focusing only on activities that require visual and auditory engagement.",
        "By limiting sensory activities to ensure children are focused on reading and writing.",
        "By using only digital devices for sensory experiences."
      ],
      "correctAnswer": "By including activities that engage multiple senses such as touch, sight, and sound to enhance learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Create a lesson plan that incorporates both structured activities and free play to promote social and cognitive development.",
      "options": [
        "A lesson plan that balances teacher-directed activities with time for children to explore materials and collaborate with peers.",
        "A lesson plan that focuses entirely on rote memorization and academic tasks.",
        "A lesson plan that excludes playtime and focuses solely on testing.",
        "A lesson plan that discourages social interactions and focuses only on individual tasks."
      ],
      "correctAnswer": "A lesson plan that balances teacher-directed activities with time for children to explore materials and collaborate with peers."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main focus of early childhood education?",
      "options": [
        "Teaching academic subjects in depth.",
        "Supporting children’s development in various domains: cognitive, social, emotional, and physical.",
        "Preparing children to pass standardized tests.",
        "Focusing on only one area of development, such as language skills."
      ],
      "correctAnswer": "Supporting children’s development in various domains: cognitive, social, emotional, and physical."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key characteristic of developmentally appropriate practices in early childhood education?",
      "options": [
        "Strictly academic-focused learning.",
        "Teaching only the basics of reading and writing.",
        "Adapting teaching methods to the developmental stage of each child.",
        "Focusing on large group activities only."
      ],
      "correctAnswer": "Adapting teaching methods to the developmental stage of each child."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which developmental milestone is typically achieved during early childhood?",
      "options": [
        "Advanced mathematical reasoning.",
        "The ability to form simple sentences and engage in social interactions.",
        "High-level abstract thinking.",
        "Reading at a third-grade level."
      ],
      "correctAnswer": "The ability to form simple sentences and engage in social interactions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is the environment in early childhood education crucial for learning?",
      "options": [
        "A rich learning environment promotes exploration and independence.",
        "It serves only to provide a space for children to play and relax.",
        "A strict environment with lots of rules helps children stay focused.",
        "The environment is not important as long as children are taught the basics."
      ],
      "correctAnswer": "A rich learning environment promotes exploration and independence."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the significance of play in early childhood education?",
      "options": [
        "Play is a way to keep children occupied while teachers work.",
        "Play enhances cognitive, social, emotional, and physical development.",
        "Play should be discouraged in favor of more structured learning activities.",
        "Play only helps develop physical skills, not cognitive skills."
      ],
      "correctAnswer": "Play enhances cognitive, social, emotional, and physical development."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers foster social skills in young children?",
      "options": [
        "By encouraging children to work and play together in groups.",
        "By keeping children focused on individual tasks only.",
        "By using punishment when children misbehave.",
        "By limiting interaction between children to maintain order."
      ],
      "correctAnswer": "By encouraging children to work and play together in groups."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why should early childhood education programs integrate diverse learning materials?",
      "options": [
        "To ensure children experience different cultural perspectives and ideas.",
        "To keep children entertained with various toys and activities.",
        "To make the learning process more competitive.",
        "To focus on one learning method rather than varying strategies."
      ],
      "correctAnswer": "To ensure children experience different cultural perspectives and ideas."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers apply differentiated instruction in an early childhood classroom?",
      "options": [
        "By using the same teaching methods for all children.",
        "By providing different activities to meet the diverse needs of children.",
        "By limiting interactions to children who are at the same developmental level.",
        "By avoiding adjustments to activities, as they could disrupt the classroom."
      ],
      "correctAnswer": "By providing different activities to meet the diverse needs of children."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategies can be used to incorporate motor skills development into early childhood education?",
      "options": [
        "Providing children with worksheets and books to read.",
        "Using interactive games and activities that require physical movement.",
        "Limiting physical activities to ensure children focus on academics.",
        "Forcing children to participate in sports competitions."
      ],
      "correctAnswer": "Using interactive games and activities that require physical movement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a culturally responsive curriculum in an early childhood setting?",
      "options": [
        "By incorporating children’s cultural backgrounds into lessons and activities.",
        "By avoiding the inclusion of diverse cultural perspectives to maintain uniformity.",
        "By focusing only on mainstream culture in educational activities.",
        "By using a single method of teaching across all children."
      ],
      "correctAnswer": "By incorporating children’s cultural backgrounds into lessons and activities."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should a teacher consider when analyzing a child's developmental progress?",
      "options": [
        "Only the child's academic performance and ability to memorize facts.",
        "The child's social, emotional, cognitive, and physical development.",
        "The child’s behavior in structured settings without considering other aspects.",
        "The teacher’s opinion about the child’s potential."
      ],
      "correctAnswer": "The child's social, emotional, cognitive, and physical development."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of a play-based learning activity?",
      "options": [
        "By observing children’s engagement, creativity, and social interactions during the activity.",
        "By testing children’s ability to complete worksheets during the activity.",
        "By controlling the activity to ensure it follows a strict learning schedule.",
        "By limiting children’s freedom during play to keep them focused."
      ],
      "correctAnswer": "By observing children’s engagement, creativity, and social interactions during the activity."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the impact of a bilingual early childhood education program?",
      "options": [
        "By assessing the academic performance of children in both languages.",
        "By measuring children's ability to memorize the alphabet in both languages.",
        "By focusing only on children's behavior and social interactions.",
        "By comparing the performance of children in the bilingual program with those in a monolingual program."
      ],
      "correctAnswer": "By assessing the academic performance of children in both languages."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create an integrated lesson plan that includes language, motor skills, and social-emotional learning?",
      "options": [
        "By incorporating activities that promote verbal communication, physical movement, and group interactions.",
        "By focusing solely on academic lessons and ignoring physical play.",
        "By separating language and motor skills lessons into different periods.",
        "By creating activities that focus only on academic content and behavior management."
      ],
      "correctAnswer": "By incorporating activities that promote verbal communication, physical movement, and group interactions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Create a creative, interdisciplinary lesson plan that integrates art, science, and social studies for early childhood students.",
      "options": [
        "A lesson that uses hands-on activities, discussions, and collaborative projects to explore concepts in art, science, and social studies.",
        "A lesson that focuses only on rote memorization and academic skills.",
        "A lesson that excludes play-based activities and focuses strictly on tests.",
        "A lesson that only emphasizes one area of development, ignoring the others."
      ],
      "correctAnswer": "A lesson that uses hands-on activities, discussions, and collaborative projects to explore concepts in art, science, and social studies."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of early childhood education?",
      "options": [
        "To teach children reading and writing before they enter primary school.",
        "To support the holistic development of young children, focusing on cognitive, social, and emotional growth.",
        "To prepare children for standardized testing.",
        "To help children memorize academic content."
      ],
      "correctAnswer": "To support the holistic development of young children, focusing on cognitive, social, and emotional growth."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a key feature of play-based learning in early childhood education?",
      "options": [
        "It focuses on structured, teacher-led activities.",
        "It encourages free exploration and hands-on learning experiences.",
        "It emphasizes academic skills above social skills.",
        "It limits creativity and emphasizes conformity."
      ],
      "correctAnswer": "It encourages free exploration and hands-on learning experiences."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is one characteristic of developmentally appropriate practices in early childhood education?",
      "options": [
        "Only focusing on teaching academic subjects.",
        "Using age-appropriate activities that promote overall development.",
        "Emphasizing the memorization of facts and figures.",
        "Applying a one-size-fits-all approach to all children."
      ],
      "correctAnswer": "Using age-appropriate activities that promote overall development."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is fostering a child's social-emotional development important in early childhood education?",
      "options": [
        "Because it helps children master academic subjects.",
        "Because it lays the foundation for healthy relationships and emotional well-being.",
        "Because it ensures children perform well in standardized tests.",
        "Because it helps children sit still and follow rules in the classroom."
      ],
      "correctAnswer": "Because it lays the foundation for healthy relationships and emotional well-being."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of the teacher in a play-based learning environment?",
      "options": [
        "To control all activities and ensure strict adherence to the schedule.",
        "To facilitate and guide children’s exploration through purposeful play.",
        "To limit children’s freedom and only allow them to follow instructions.",
        "To focus on only academic skills and leave social-emotional development aside."
      ],
      "correctAnswer": "To facilitate and guide children’s exploration through purposeful play."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher support language development in young children?",
      "options": [
        "By speaking to children only when necessary to ensure a quiet classroom.",
        "By engaging children in meaningful conversations, reading aloud, and encouraging storytelling.",
        "By focusing on grammar and vocabulary without offering opportunities for free expression.",
        "By restricting children from talking until they can speak fluently."
      ],
      "correctAnswer": "By engaging children in meaningful conversations, reading aloud, and encouraging storytelling."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the significance of observing children's play in early childhood education?",
      "options": [
        "It helps the teacher monitor children's behavior for discipline purposes.",
        "It provides insight into children’s interests, abilities, and social development.",
        "It allows the teacher to keep children occupied while focusing on other tasks.",
        "It is only useful to determine which child is the most quiet."
      ],
      "correctAnswer": "It provides insight into children’s interests, abilities, and social development."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply the concept of scaffolding in early childhood education?",
      "options": [
        "By providing a structured environment with no flexibility for children’s needs.",
        "By offering support and guidance while gradually encouraging independence in learning.",
        "By focusing only on one-on-one teaching and avoiding group activities.",
        "By preventing children from exploring independently and following instructions strictly."
      ],
      "correctAnswer": "By offering support and guidance while gradually encouraging independence in learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategies can a teacher use to promote fine motor skills development in early childhood?",
      "options": [
        "By providing children with activities that involve drawing, cutting, and manipulating small objects.",
        "By focusing only on large muscle activities and ignoring fine motor tasks.",
        "By instructing children to sit still and not engage in hands-on activities.",
        "By avoiding arts and crafts activities to prevent messes."
      ],
      "correctAnswer": "By providing children with activities that involve drawing, cutting, and manipulating small objects."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher foster critical thinking skills in young children?",
      "options": [
        "By asking open-ended questions and encouraging children to express their thoughts.",
        "By giving children step-by-step instructions on what to think and say.",
        "By focusing solely on memorization and repetition.",
        "By limiting children’s freedom to make choices during activities."
      ],
      "correctAnswer": "By asking open-ended questions and encouraging children to express their thoughts."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze a child's behavior to understand their developmental stage?",
      "options": [
        "By using standardized tests to assess cognitive skills.",
        "By observing the child’s interactions with peers, responses to challenges, and ability to follow instructions.",
        "By focusing only on the child's academic abilities and ignoring their social interactions.",
        "By using punishment as a way to analyze behavior."
      ],
      "correctAnswer": "By observing the child’s interactions with peers, responses to challenges, and ability to follow instructions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What are some indicators that a child may need additional support in early childhood education?",
      "options": [
        "Struggling with complex academic tasks but succeeding in physical activities.",
        "Difficulty interacting with peers, displaying extreme behaviors, or delayed speech development.",
        "A strong ability to memorize academic content at an early age.",
        "Eager participation in all classroom activities without any challenges."
      ],
      "correctAnswer": "Difficulty interacting with peers, displaying extreme behaviors, or delayed speech development."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the effectiveness of a classroom management strategy in early childhood education?",
      "options": [
        "By observing children's ability to follow instructions and the overall classroom environment.",
        "By focusing on how many rules are enforced during the day.",
        "By evaluating the academic performance of each child in the classroom.",
        "By restricting all child movement and interaction to maintain order."
      ],
      "correctAnswer": "By observing children's ability to follow instructions and the overall classroom environment."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a diverse and inclusive classroom for young children?",
      "options": [
        "By incorporating materials, books, and activities that reflect various cultures and backgrounds.",
        "By focusing only on one culture to create consistency in learning.",
        "By restricting children from interacting with others who are different from them.",
        "By avoiding any discussions about diversity and focusing only on academic skills."
      ],
      "correctAnswer": "By incorporating materials, books, and activities that reflect various cultures and backgrounds."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Early Childhood Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher design a learning activity that encourages creativity in early childhood education?",
      "options": [
        "By providing open-ended materials, allowing children to explore and create freely.",
        "By giving children a specific task to complete with little room for imagination.",
        "By focusing only on structured, teacher-led activities.",
        "By limiting materials to only one choice to avoid distractions."
      ],
      "correctAnswer": "By providing open-ended materials, allowing children to explore and create freely."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of educational technology?",
      "options": [
        "To replace traditional teaching methods with computers.",
        "To enhance the learning experience through technological tools and resources.",
        "To focus solely on academic assessments.",
        "To ensure students only use computers during lessons."
      ],
      "correctAnswer": "To enhance the learning experience through technological tools and resources."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of synchronous learning?",
      "options": [
        "A student completing an online module at their own pace.",
        "A teacher and students engaging in real-time video conferencing.",
        "A student watching pre-recorded lessons.",
        "A student reading a textbook independently."
      ],
      "correctAnswer": "A teacher and students engaging in real-time video conferencing."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which technology is commonly used to create interactive lessons for students?",
      "options": [
        "Projectors and whiteboards.",
        "Smartphones and social media.",
        "Learning management systems (LMS).",
        "Textbooks and printed materials."
      ],
      "correctAnswer": "Learning management systems (LMS)."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does educational technology support personalized learning?",
      "options": [
        "By offering standardized content to all students.",
        "By tracking individual student progress and adapting to their learning needs.",
        "By limiting access to resources for slower learners.",
        "By encouraging all students to follow the same learning path."
      ],
      "correctAnswer": "By tracking individual student progress and adapting to their learning needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the advantage of using multimedia in teaching?",
      "options": [
        "It makes lessons more entertaining, regardless of educational value.",
        "It helps in presenting complex concepts in a more engaging and understandable manner.",
        "It only benefits students who already understand the content.",
        "It is only useful for students in technical subjects."
      ],
      "correctAnswer": "It helps in presenting complex concepts in a more engaging and understandable manner."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of learning analytics in educational technology?",
      "options": [
        "To replace traditional assessments with automated grading.",
        "To track and analyze students' learning patterns and performance for informed decisions.",
        "To limit teachers' interaction with students.",
        "To provide students with an unlimited number of practice tests."
      ],
      "correctAnswer": "To track and analyze students' learning patterns and performance for informed decisions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can gamification be utilized in education?",
      "options": [
        "By incorporating rewards, challenges, and game mechanics to enhance student engagement.",
        "By replacing all formal assessments with games.",
        "By allowing students to create their own lesson plans.",
        "By limiting interaction with teachers and using only automated systems."
      ],
      "correctAnswer": "By incorporating rewards, challenges, and game mechanics to enhance student engagement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is digital literacy important for students in the 21st century?",
      "options": [
        "Because it helps students use technology only for entertainment.",
        "Because it prepares students to navigate, evaluate, and create with digital tools in an increasingly technology-driven world.",
        "Because it is essential for learning history and social studies.",
        "Because it enables students to avoid traditional learning methods."
      ],
      "correctAnswer": "Because it prepares students to navigate, evaluate, and create with digital tools in an increasingly technology-driven world."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can educators effectively integrate technology into the classroom?",
      "options": [
        "By using technology only when students request it.",
        "By aligning technological tools with instructional goals and student learning outcomes.",
        "By avoiding the use of technology to prevent distractions.",
        "By relying solely on digital textbooks."
      ],
      "correctAnswer": "By aligning technological tools with instructional goals and student learning outcomes."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a practical way to apply blended learning in a classroom?",
      "options": [
        "By requiring all students to attend only online classes.",
        "By combining online learning with face-to-face classroom instruction.",
        "By focusing only on traditional in-person instruction.",
        "By eliminating technology in the classroom."
      ],
      "correctAnswer": "By combining online learning with face-to-face classroom instruction."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can mobile learning be applied in educational settings?",
      "options": [
        "By allowing students to use mobile devices for social media only.",
        "By providing students with access to learning materials, activities, and assessments through mobile apps.",
        "By restricting the use of mobile devices in the classroom.",
        "By using mobile devices solely for entertainment purposes."
      ],
      "correctAnswer": "By providing students with access to learning materials, activities, and assessments through mobile apps."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of educational software in the classroom?",
      "options": [
        "By monitoring student engagement and performance improvements over time.",
        "By focusing only on the software's cost.",
        "By using the software for one-time assessments only.",
        "By comparing it to traditional teaching methods without considering context."
      ],
      "correctAnswer": "By monitoring student engagement and performance improvements over time."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What factors should be analyzed when selecting educational technology for a classroom?",
      "options": [
        "The cost and availability of technology.",
        "The compatibility of technology with existing curriculum and student needs.",
        "The popularity of the technology among other schools.",
        "The brand name of the technology."
      ],
      "correctAnswer": "The compatibility of technology with existing curriculum and student needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most effective way to evaluate student progress in an online learning environment?",
      "options": [
        "By using only quizzes and exams.",
        "By integrating formative assessments, peer feedback, and self-reflection.",
        "By evaluating only final exam scores.",
        "By restricting students from interacting with the content after completion."
      ],
      "correctAnswer": "By integrating formative assessments, peer feedback, and self-reflection."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize various technological tools to create an engaging lesson plan?",
      "options": [
        "By using only one tool in every lesson.",
        "By combining interactive activities, multimedia, and assessments to meet diverse learning needs.",
        "By limiting the use of technology to maintain classroom order.",
        "By focusing only on lecture-based teaching."
      ],
      "correctAnswer": "By combining interactive activities, multimedia, and assessments to meet diverse learning needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a collaborative learning environment using technology?",
      "options": [
        "By assigning individual tasks and limiting student interaction.",
        "By encouraging students to work together through online platforms and collaborative tools.",
        "By using technology solely for assessment purposes.",
        "By avoiding student input in the learning process."
      ],
      "correctAnswer": "By encouraging students to work together through online platforms and collaborative tools."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the definition of 'flipped classroom'?",
      "options": [
        "A classroom where students are required to study from home only.",
        "A classroom model where students learn content at home and apply it in class with teacher guidance.",
        "A classroom where teachers deliver lessons through traditional lectures only.",
        "A model that exclusively uses technology for assessments."
      ],
      "correctAnswer": "A classroom model where students learn content at home and apply it in class with teacher guidance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is NOT a characteristic of effective educational technology?",
      "options": [
        "It should enhance learning by supporting engagement and collaboration.",
        "It should limit the amount of interaction between students and the teacher.",
        "It should be accessible and adaptable to different learning styles.",
        "It should improve the efficiency and effectiveness of learning processes."
      ],
      "correctAnswer": "It should limit the amount of interaction between students and the teacher."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which technology is most commonly used for creating and sharing educational videos?",
      "options": [
        "PowerPoint.",
        "YouTube and other video sharing platforms.",
        "Google Docs.",
        "Microsoft Word."
      ],
      "correctAnswer": "YouTube and other video sharing platforms."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is cloud-based technology beneficial for education?",
      "options": [
        "It allows students to download all their course materials to their devices.",
        "It enables real-time collaboration, access to resources, and data storage from anywhere.",
        "It prevents students from accessing online resources.",
        "It replaces the need for teachers to interact with students."
      ],
      "correctAnswer": "It enables real-time collaboration, access to resources, and data storage from anywhere."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can virtual reality (VR) be used in education?",
      "options": [
        "To help students visualize and interact with complex concepts in a 3D environment.",
        "To replace textbooks entirely.",
        "To limit interaction between students and teachers.",
        "To only provide entertainment during free time."
      ],
      "correctAnswer": "To help students visualize and interact with complex concepts in a 3D environment."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does collaborative learning benefit from technology?",
      "options": [
        "It encourages students to work independently.",
        "It allows for real-time interaction and sharing of ideas, fostering teamwork.",
        "It limits students to using only textbooks.",
        "It prevents students from using any digital devices."
      ],
      "correctAnswer": "It allows for real-time interaction and sharing of ideas, fostering teamwork."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main advantage of using adaptive learning technology?",
      "options": [
        "It offers a one-size-fits-all learning experience for all students.",
        "It adjusts the difficulty level and content based on individual student progress and performance.",
        "It eliminates the need for assessments.",
        "It prevents teachers from using traditional teaching methods."
      ],
      "correctAnswer": "It adjusts the difficulty level and content based on individual student progress and performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can interactive whiteboards enhance teaching and learning?",
      "options": [
        "By replacing all textbooks with digital content.",
        "By allowing teachers and students to interact with content in real time, fostering engagement and collaboration.",
        "By preventing students from using any other form of technology.",
        "By solely providing assessments and quizzes."
      ],
      "correctAnswer": "By allowing teachers and students to interact with content in real time, fostering engagement and collaboration."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply digital storytelling in a classroom?",
      "options": [
        "By asking students to write essays and submit them online.",
        "By encouraging students to create multimedia-rich stories to convey concepts and ideas.",
        "By using only written text and avoiding any multimedia.",
        "By limiting student creativity and providing them with a strict structure."
      ],
      "correctAnswer": "By encouraging students to create multimedia-rich stories to convey concepts and ideas."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a practical way to implement flipped learning in a classroom?",
      "options": [
        "By having students watch pre-recorded lessons at home and engage in hands-on activities in class.",
        "By only teaching lessons through lectures and avoiding any online content.",
        "By restricting students from using any digital tools during the lessons.",
        "By requiring students to only do homework during class time."
      ],
      "correctAnswer": "By having students watch pre-recorded lessons at home and engage in hands-on activities in class."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply the use of blogs in their classroom?",
      "options": [
        "By using blogs exclusively for grading purposes.",
        "By allowing students to create and share their reflections and ideas, encouraging creativity and communication.",
        "By restricting students to reading only blogs written by teachers.",
        "By limiting blog usage to administrative tasks only."
      ],
      "correctAnswer": "By allowing students to create and share their reflections and ideas, encouraging creativity and communication."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What factors should a teacher analyze when choosing between different educational software?",
      "options": [
        "The software's cost and the number of features it offers.",
        "The alignment of the software with learning objectives and student needs.",
        "The popularity of the software among other schools.",
        "The design of the software, regardless of its educational value."
      ],
      "correctAnswer": "The alignment of the software with learning objectives and student needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher assess the effectiveness of an online learning platform?",
      "options": [
        "By measuring student engagement, learning outcomes, and feedback from users.",
        "By tracking the number of students using the platform.",
        "By evaluating only the platform's interface design.",
        "By limiting use to only one group of students."
      ],
      "correctAnswer": "By measuring student engagement, learning outcomes, and feedback from users."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most effective way to evaluate the integration of educational technology in a classroom?",
      "options": [
        "By observing students’ interactions with the technology and analyzing its impact on learning outcomes.",
        "By limiting technology use to one lesson per week.",
        "By only focusing on student satisfaction surveys.",
        "By restricting technology to the classroom and avoiding any student feedback."
      ],
      "correctAnswer": "By observing students’ interactions with the technology and analyzing its impact on learning outcomes."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize various technologies to create a comprehensive digital learning environment?",
      "options": [
        "By combining virtual tools, multimedia resources, and interactive platforms that align with learning goals.",
        "By using only one tool and focusing on traditional methods.",
        "By limiting student access to technology.",
        "By only using technologies that are already popular in the market."
      ],
      "correctAnswer": "By combining virtual tools, multimedia resources, and interactive platforms that align with learning goals."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Educational Technology",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a personalized learning experience using technology?",
      "options": [
        "By using adaptive learning software to tailor content to individual student needs and abilities.",
        "By using a single teaching method for all students.",
        "By allowing students to select their own textbooks.",
        "By limiting the use of digital tools to assessments only."
      ],
      "correctAnswer": "By using adaptive learning software to tailor content to individual student needs and abilities."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of a Table of Specifications (TOS) in test construction?",
      "options": [
        "To assess the content and cognitive levels to be tested.",
        "To determine the time allocated for each test item.",
        "To create test questions without considering the learning objectives.",
        "To ensure uniformity in the appearance of the test."
      ],
      "correctAnswer": "To assess the content and cognitive levels to be tested."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is typically included in a Table of Specifications?",
      "options": [
        "The order of questions in the test.",
        "The categories of content and cognitive levels to be tested.",
        "The total number of students in the class.",
        "The grading scale for the test."
      ],
      "correctAnswer": "The categories of content and cognitive levels to be tested."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does the term 'cognitive level' refer to in the context of a Table of Specifications?",
      "options": [
        "The mental complexity required to answer a question.",
        "The amount of time it takes to answer a question.",
        "The total number of items in the test.",
        "The appearance of the test items."
      ],
      "correctAnswer": "The mental complexity required to answer a question."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to align the Table of Specifications with learning objectives?",
      "options": [
        "To ensure that the test measures only factual recall.",
        "To ensure that the test items reflect the goals of the course and promote valid assessment.",
        "To create a long test with more questions.",
        "To ensure the test looks uniform in format."
      ],
      "correctAnswer": "To ensure that the test items reflect the goals of the course and promote valid assessment."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does a Table of Specifications help in ensuring fairness in test construction?",
      "options": [
        "By guaranteeing that all students will receive the same score.",
        "By ensuring that test items are evenly distributed across important topics and cognitive levels.",
        "By making the test shorter.",
        "By making all questions true/false."
      ],
      "correctAnswer": "By ensuring that test items are evenly distributed across important topics and cognitive levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of a blueprint in creating a Table of Specifications?",
      "options": [
        "To list the correct answers for all test items.",
        "To outline the structure and balance of the test, aligning content with cognitive levels.",
        "To create a list of possible topics to avoid repeating questions.",
        "To set the rules for the grading system."
      ],
      "correctAnswer": "To outline the structure and balance of the test, aligning content with cognitive levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What might be a consequence of not including a proper Table of Specifications in a test?",
      "options": [
        "The test will always be easy for students.",
        "The test may not align with the course objectives and might not accurately measure the intended outcomes.",
        "The test will be shorter and easier to grade.",
        "The test will automatically have higher reliability."
      ],
      "correctAnswer": "The test may not align with the course objectives and might not accurately measure the intended outcomes."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you apply a Table of Specifications when designing a test for a history class?",
      "options": [
        "By ensuring the test only includes multiple-choice questions about historical dates.",
        "By balancing questions between different historical periods and cognitive levels, ensuring a range of difficulty.",
        "By asking students to memorize all historical events without considering their understanding.",
        "By using true/false questions exclusively."
      ],
      "correctAnswer": "By balancing questions between different historical periods and cognitive levels, ensuring a range of difficulty."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could a Table of Specifications be used to assess students' problem-solving skills?",
      "options": [
        "By ensuring the test includes open-ended questions that require students to apply knowledge in real-life scenarios.",
        "By focusing only on factual recall questions.",
        "By using a combination of multiple-choice and matching questions.",
        "By limiting the test to short-answer questions."
      ],
      "correctAnswer": "By ensuring the test includes open-ended questions that require students to apply knowledge in real-life scenarios."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategy would you use to apply Bloom's Taxonomy levels in a Table of Specifications for a biology exam?",
      "options": [
        "Ensure each level of Bloom’s Taxonomy is represented with varying difficulty for each content area.",
        "Only include recall-based questions for all content.",
        "Focus on only applying knowledge with case study scenarios.",
        "Limit questions to factual recall and avoid analysis or synthesis."
      ],
      "correctAnswer": "Ensure each level of Bloom’s Taxonomy is represented with varying difficulty for each content area."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can you analyze the effectiveness of a Table of Specifications after the test is administered?",
      "options": [
        "By reviewing whether the content of the test aligns with the course objectives and if the cognitive levels are balanced.",
        "By checking the number of correct answers provided by students.",
        "By counting the number of students who passed the test.",
        "By focusing only on the difficulty level of the questions."
      ],
      "correctAnswer": "By reviewing whether the content of the test aligns with the course objectives and if the cognitive levels are balanced."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would you look for when analyzing whether a test’s content is valid according to the TOS?",
      "options": [
        "If the test covers the content areas identified in the Table of Specifications and if the cognitive levels are properly represented.",
        "If the test is long enough to cover all topics.",
        "If the test uses only multiple-choice questions.",
        "If the answers are evenly distributed between choices."
      ],
      "correctAnswer": "If the test covers the content areas identified in the Table of Specifications and if the cognitive levels are properly represented."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the reliability of a test designed using a Table of Specifications?",
      "options": [
        "By analyzing the consistency of the test’s results across different test administrations.",
        "By counting the number of test items.",
        "By comparing the total scores of students.",
        "By ensuring the test is easy for all students."
      ],
      "correctAnswer": "By analyzing the consistency of the test’s results across different test administrations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design a new Table of Specifications for a course that integrates multiple subjects?",
      "options": [
        "By considering the key content areas from all subjects and aligning them with appropriate cognitive levels.",
        "By including only content from one subject area.",
        "By focusing solely on higher-order thinking questions.",
        "By limiting the cognitive levels to only recall-based questions."
      ],
      "correctAnswer": "By considering the key content areas from all subjects and aligning them with appropriate cognitive levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What steps would you take to create a comprehensive Table of Specifications for a complex exam?",
      "options": [
        "By defining the content areas, cognitive levels, and ensuring a balanced representation of each in the test.",
        "By including all possible content areas regardless of relevance.",
        "By limiting the content to only the most important topics.",
        "By ensuring that all questions are equally difficult."
      ],
      "correctAnswer": "By defining the content areas, cognitive levels, and ensuring a balanced representation of each in the test."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a primary benefit of using a Table of Specifications in test design?",
      "options": [
        "It ensures that the test accurately reflects the course content and learning objectives.",
        "It makes the test shorter and easier to grade.",
        "It only includes factual recall questions.",
        "It guarantees high student performance."
      ],
      "correctAnswer": "It ensures that the test accurately reflects the course content and learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "In the context of a Table of Specifications, what does the term 'validity' refer to?",
      "options": [
        "The degree to which the test measures what it is supposed to measure.",
        "The speed with which the test can be administered.",
        "The amount of time it takes to create the test.",
        "The clarity of the test instructions."
      ],
      "correctAnswer": "The degree to which the test measures what it is supposed to measure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which cognitive level is most commonly assessed by multiple-choice questions?",
      "options": [
        "Knowledge",
        "Comprehension",
        "Analysis",
        "Synthesis"
      ],
      "correctAnswer": "Knowledge"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why would you use a Table of Specifications to ensure a fair representation of topics on a test?",
      "options": [
        "To create a test with the same number of questions from each content area.",
        "To help balance the cognitive levels across content areas so no topic is overemphasized or neglected.",
        "To make sure all the students have the same test experience.",
        "To assign equal importance to each question."
      ],
      "correctAnswer": "To help balance the cognitive levels across content areas so no topic is overemphasized or neglected."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a balanced Table of Specifications ensure when designing a test?",
      "options": [
        "That all students perform equally well.",
        "That the test reflects both the content and cognitive levels necessary for the objectives.",
        "That all test items are equally difficult.",
        "That no content area is excluded from the test."
      ],
      "correctAnswer": "That the test reflects both the content and cognitive levels necessary for the objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can using a Table of Specifications help to improve the reliability of a test?",
      "options": [
        "By ensuring the same test is administered to all students.",
        "By guaranteeing that the test covers all important content areas and aligns with cognitive levels.",
        "By making the test shorter and easier to administer.",
        "By offering different test formats for different students."
      ],
      "correctAnswer": "By guaranteeing that the test covers all important content areas and aligns with cognitive levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role does a Table of Specifications play in avoiding test bias?",
      "options": [
        "It ensures the test questions are equally easy or difficult for all students.",
        "It provides a detailed structure to ensure no content area or cognitive level is overrepresented or underrepresented.",
        "It guarantees that all students perform equally well on the test.",
        "It only focuses on factual recall questions."
      ],
      "correctAnswer": "It provides a detailed structure to ensure no content area or cognitive level is overrepresented or underrepresented."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a Table of Specifications assist in creating a comprehensive test?",
      "options": [
        "By allowing test makers to focus only on one content area at a time.",
        "By balancing the difficulty of questions across multiple content areas and cognitive levels.",
        "By limiting the number of topics covered in the test.",
        "By ensuring all questions are recall-based."
      ],
      "correctAnswer": "By balancing the difficulty of questions across multiple content areas and cognitive levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you apply Bloom’s Taxonomy to ensure a variety of cognitive levels in a Table of Specifications for a language test?",
      "options": [
        "By including questions that require students to recall vocabulary, comprehend grammar rules, apply concepts in real-world contexts, analyze texts, and synthesize ideas.",
        "By limiting the test to grammar and vocabulary questions only.",
        "By focusing only on comprehension questions.",
        "By including only recall-based multiple-choice questions."
      ],
      "correctAnswer": "By including questions that require students to recall vocabulary, comprehend grammar rules, apply concepts in real-world contexts, analyze texts, and synthesize ideas."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a Table of Specifications assist in constructing a test to measure higher-order thinking skills?",
      "options": [
        "By ensuring the inclusion of analysis, synthesis, and evaluation questions in appropriate cognitive levels.",
        "By ensuring all questions are true/false.",
        "By focusing only on lower-level cognitive skills.",
        "By limiting the test to factual recall questions."
      ],
      "correctAnswer": "By ensuring the inclusion of analysis, synthesis, and evaluation questions in appropriate cognitive levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an effective way to analyze whether a Table of Specifications adequately represents course objectives?",
      "options": [
        "By cross-referencing the topics and cognitive levels with the stated learning outcomes and ensuring alignment.",
        "By reviewing the number of questions per topic.",
        "By making sure each topic has an equal number of questions.",
        "By ensuring there are no questions on certain topics."
      ],
      "correctAnswer": "By cross-referencing the topics and cognitive levels with the stated learning outcomes and ensuring alignment."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you analyze the distribution of cognitive levels in a Table of Specifications?",
      "options": [
        "By ensuring that higher-order thinking skills are appropriately represented and aligned with the content being assessed.",
        "By using only recall-based questions.",
        "By including an equal number of questions from each content area.",
        "By ensuring that all test items are of medium difficulty."
      ],
      "correctAnswer": "By ensuring that higher-order thinking skills are appropriately represented and aligned with the content being assessed."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the effectiveness of a Table of Specifications used for a complex subject like mathematics?",
      "options": [
        "By reviewing if the test covers all relevant topics and includes a range of cognitive levels from recall to application and analysis.",
        "By ensuring that all questions are from a single topic.",
        "By counting the number of students who passed the test.",
        "By focusing only on recall questions."
      ],
      "correctAnswer": "By reviewing if the test covers all relevant topics and includes a range of cognitive levels from recall to application and analysis."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could you synthesize a Table of Specifications that balances theory and practice in an engineering exam?",
      "options": [
        "By creating a Table of Specifications that represents both theoretical concepts and real-world problem-solving applications.",
        "By including only theory-based questions.",
        "By focusing on practical applications exclusively.",
        "By ensuring the test is easy to understand."
      ],
      "correctAnswer": "By creating a Table of Specifications that represents both theoretical concepts and real-world problem-solving applications."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Making TOS",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would you consider when creating a Table of Specifications for a new course in a school system?",
      "options": [
        "The course objectives, content areas, cognitive levels, and ensuring balanced question distribution.",
        "Only the most important content areas.",
        "The length of the test and the number of students.",
        "Only the grading criteria."
      ],
      "correctAnswer": "The course objectives, content areas, cognitive levels, and ensuring balanced question distribution."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does item difficulty in item analysis measure?",
      "options": [
        "The proportion of students who answered an item correctly.",
        "The proportion of students who failed to answer an item.",
        "The total score achieved by students on an item.",
        "The number of distractors used in a question."
      ],
      "correctAnswer": "The proportion of students who answered an item correctly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "In item analysis, what is meant by item discrimination?",
      "options": [
        "How well an item differentiates between high and low-performing students.",
        "The ease with which an item is answered.",
        "The clarity of the question stem.",
        "The number of distractors used in the item."
      ],
      "correctAnswer": "How well an item differentiates between high and low-performing students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the typical range of the discrimination index (D) for a well-functioning item?",
      "options": [
        "0 to 1",
        "-1 to 1",
        "-0.5 to 0.5",
        "0 to 0.5"
      ],
      "correctAnswer": "0 to 1"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is item difficulty an important metric in item analysis?",
      "options": [
        "It helps determine how challenging the test is overall.",
        "It indicates how long it takes for students to complete the test.",
        "It helps identify which students have completed the test.",
        "It determines which cognitive levels were targeted in the questions."
      ],
      "correctAnswer": "It helps determine how challenging the test is overall."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a negative item discrimination index suggest about an item?",
      "options": [
        "The item is difficult and may need to be revised.",
        "The item is effective at distinguishing between high and low-performing students.",
        "The item may be biased or flawed, requiring revision.",
        "The item is too easy and needs more challenging distractors."
      ],
      "correctAnswer": "The item may be biased or flawed, requiring revision."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the item-total correlation help in evaluating the quality of an item?",
      "options": [
        "It helps assess how well each item correlates with the overall test score.",
        "It helps determine how many students chose the correct answer.",
        "It helps evaluate how easy the item is.",
        "It measures the proportion of students who answered correctly."
      ],
      "correctAnswer": "It helps assess how well each item correlates with the overall test score."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "In terms of item analysis, what is the significance of distractor analysis?",
      "options": [
        "It evaluates the effectiveness of the incorrect options in a multiple-choice question.",
        "It measures the difficulty of a question.",
        "It calculates the total score of the test.",
        "It ensures that all test items are reliable."
      ],
      "correctAnswer": "It evaluates the effectiveness of the incorrect options in a multiple-choice question."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to have a variety of item difficulties in a test?",
      "options": [
        "To ensure the test measures both lower and higher cognitive abilities.",
        "To make the test easier to grade.",
        "To ensure the test is fair for all students.",
        "To make the test more focused on recall questions."
      ],
      "correctAnswer": "To ensure the test measures both lower and higher cognitive abilities."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you use the discrimination index to revise an item in your test?",
      "options": [
        "By removing items with a low D-index and replacing them with more effective questions.",
        "By lowering the difficulty of items with a low D-index.",
        "By rewording the item to make it more difficult.",
        "By changing the format of the test to include more multiple-choice questions."
      ],
      "correctAnswer": "By removing items with a low D-index and replacing them with more effective questions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can you apply item analysis to improve the reliability of a test?",
      "options": [
        "By removing items with low item-total correlations and revising them for clarity.",
        "By making the test longer with more questions.",
        "By ensuring that all items are of equal difficulty.",
        "By reducing the number of multiple-choice questions."
      ],
      "correctAnswer": "By removing items with low item-total correlations and revising them for clarity."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "If a test item has a very high discrimination index, what should you do?",
      "options": [
        "You can keep the item as it is because it is effectively distinguishing between high and low performers.",
        "You should make the item easier to ensure it discriminates less.",
        "You should change the question to make it more challenging.",
        "You should replace the item with a different type of question."
      ],
      "correctAnswer": "You can keep the item as it is because it is effectively distinguishing between high and low performers."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you analyze the effectiveness of an item with a very low discrimination index?",
      "options": [
        "The item likely needs revision or removal as it does not differentiate well between high and low performers.",
        "The item should be made more difficult to increase discrimination.",
        "The item is working well, and no changes are necessary.",
        "The item should be used more frequently in future tests."
      ],
      "correctAnswer": "The item likely needs revision or removal as it does not differentiate well between high and low performers."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What could you conclude if a question in a test has high difficulty but a low discrimination index?",
      "options": [
        "The item may be too difficult for students, and you may need to revise or replace it.",
        "The item is effective at distinguishing between high and low performers, and no changes are needed.",
        "The item should be kept as is because it is working well.",
        "The difficulty is irrelevant as long as students answer most items correctly."
      ],
      "correctAnswer": "The item may be too difficult for students, and you may need to revise or replace it."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the overall quality of a test based on item analysis?",
      "options": [
        "By analyzing the difficulty, discrimination, and item-total correlations of each question and revising as necessary.",
        "By checking how many students passed the test.",
        "By comparing the number of correct answers for each item.",
        "By counting how many students completed the test."
      ],
      "correctAnswer": "By analyzing the difficulty, discrimination, and item-total correlations of each question and revising as necessary."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you combine item analysis data with student performance data to improve future tests?",
      "options": [
        "By using the analysis to identify poorly performing items and revising or replacing them with more effective ones.",
        "By making the test longer to cover more material.",
        "By ensuring the test focuses only on recall questions.",
        "By ignoring item difficulty and focusing only on content coverage."
      ],
      "correctAnswer": "By using the analysis to identify poorly performing items and revising or replacing them with more effective ones."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design a new test based on item analysis findings to ensure better reliability and validity?",
      "options": [
        "By ensuring a balanced mix of item difficulties and including a variety of question types to assess different cognitive levels.",
        "By making all questions difficult to challenge students.",
        "By using only multiple-choice questions.",
        "By focusing only on true/false questions to reduce complexity."
      ],
      "correctAnswer": "By ensuring a balanced mix of item difficulties and including a variety of question types to assess different cognitive levels."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of item analysis in educational testing?",
      "options": [
        "To evaluate the effectiveness and quality of individual test items.",
        "To assess the overall difficulty of the test.",
        "To calculate the final grade of students.",
        "To ensure all students are equally prepared for the exam."
      ],
      "correctAnswer": "To evaluate the effectiveness and quality of individual test items."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does an item’s p-value represent in item analysis?",
      "options": [
        "The percentage of students who answered the item correctly.",
        "The percentage of students who chose a specific distractor.",
        "The time it took to answer the question.",
        "The cognitive level of the question."
      ],
      "correctAnswer": "The percentage of students who answered the item correctly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an ideal value for item difficulty when evaluating test questions?",
      "options": [
        "Around 0.5, indicating a balance between easy and hard items.",
        "Close to 1.0, indicating an easy question.",
        "Close to 0.0, indicating a very difficult question.",
        "Around 0.3, indicating low difficulty."
      ],
      "correctAnswer": "Around 0.5, indicating a balance between easy and hard items."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How do you interpret an item with a discrimination index of 0.2?",
      "options": [
        "The item is poor at distinguishing between high and low performers.",
        "The item is very effective at distinguishing between high and low performers.",
        "The item should be removed because it is too difficult.",
        "The item is perfectly balanced in difficulty."
      ],
      "correctAnswer": "The item is poor at distinguishing between high and low performers."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to analyze distractors in item analysis?",
      "options": [
        "To determine if the distractors are functioning effectively in distinguishing student knowledge.",
        "To ensure the test is equally challenging for all students.",
        "To calculate the time spent on each question.",
        "To ensure the test follows a specific syllabus."
      ],
      "correctAnswer": "To determine if the distractors are functioning effectively in distinguishing student knowledge."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would a high item-total correlation indicate about a test item?",
      "options": [
        "The item is a good indicator of the overall test performance.",
        "The item is difficult and needs to be replaced.",
        "The item is irrelevant to the overall test content.",
        "The item is unfair to low-performing students."
      ],
      "correctAnswer": "The item is a good indicator of the overall test performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does item analysis help improve the fairness of a test?",
      "options": [
        "By identifying and removing items that favor a certain group of students.",
        "By increasing the number of questions in the test.",
        "By changing the order of questions.",
        "By ensuring all questions are difficult."
      ],
      "correctAnswer": "By identifying and removing items that favor a certain group of students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does the reliability of an item refer to in item analysis?",
      "options": [
        "The consistency of the item in measuring the construct it is intended to assess.",
        "The level of difficulty of the item.",
        "The amount of time students spend on the item.",
        "The clarity of the question stem."
      ],
      "correctAnswer": "The consistency of the item in measuring the construct it is intended to assess."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you address an item with a low discrimination index?",
      "options": [
        "Revise the item to make it clearer or more relevant to the content being assessed.",
        "Remove the item to improve the overall reliability of the test.",
        "Increase the number of distractors.",
        "Make the item more difficult."
      ],
      "correctAnswer": "Revise the item to make it clearer or more relevant to the content being assessed."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the results of item analysis be used to modify future tests?",
      "options": [
        "By identifying common problem areas in the test and revising or eliminating problematic items.",
        "By making the test harder in future assessments.",
        "By ensuring all questions are easy and similar.",
        "By reducing the length of the test."
      ],
      "correctAnswer": "By identifying common problem areas in the test and revising or eliminating problematic items."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would you do if an item has a high p-value but low discrimination?",
      "options": [
        "Revise the item to make it more effective at distinguishing between different levels of student performance.",
        "Keep the item as it is because it is easy.",
        "Remove the item because it is too easy.",
        "Increase the difficulty level of the item."
      ],
      "correctAnswer": "Revise the item to make it more effective at distinguishing between different levels of student performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a high correlation between an item and the total score imply?",
      "options": [
        "The item is measuring the same construct as the overall test.",
        "The item is unrelated to the content of the test.",
        "The item is irrelevant and should be removed.",
        "The item is biased toward a specific group of students."
      ],
      "correctAnswer": "The item is measuring the same construct as the overall test."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you assess an item with a p-value of 0.1?",
      "options": [
        "The item is too difficult, and you should consider revising it.",
        "The item is too easy and should be removed.",
        "The item is effective and should be kept.",
        "The item is irrelevant and should be eliminated."
      ],
      "correctAnswer": "The item is too difficult, and you should consider revising it."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the effectiveness of a test item in differentiating high and low performers?",
      "options": [
        "By analyzing its discrimination index and reviewing its item-total correlation.",
        "By checking the time spent on each item.",
        "By ensuring the item covers a wide range of topics.",
        "By calculating the grade distribution for each question."
      ],
      "correctAnswer": "By analyzing its discrimination index and reviewing its item-total correlation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design a new version of a test based on previous item analysis results?",
      "options": [
        "By revising poorly performing items and ensuring a balanced mix of question difficulty levels.",
        "By making all items more challenging.",
        "By keeping the same items without any changes.",
        "By focusing only on factual recall questions."
      ],
      "correctAnswer": "By revising poorly performing items and ensuring a balanced mix of question difficulty levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you create a set of test items that are reliable and valid?",
      "options": [
        "By ensuring the items align with the intended learning outcomes, have appropriate difficulty, and are free of bias.",
        "By making the items more challenging.",
        "By making all questions multiple-choice.",
        "By creating items that are easy to answer."
      ],
      "correctAnswer": "By ensuring the items align with the intended learning outcomes, have appropriate difficulty, and are free of bias."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an item difficulty index in item analysis?",
      "options": [
        "A numerical representation of how easy or difficult an item is based on student performance.",
        "A measure of how well the item discriminates between high and low performers.",
        "A rating of the item’s clarity and precision.",
        "A classification of items based on their content."
      ],
      "correctAnswer": "A numerical representation of how easy or difficult an item is based on student performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does the discrimination index of an item measure?",
      "options": [
        "How well the item differentiates between high and low-performing students.",
        "The time taken by students to answer the item.",
        "The percentage of students who answered the item correctly.",
        "The complexity of the question."
      ],
      "correctAnswer": "How well the item differentiates between high and low-performing students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a typical range for the discrimination index in item analysis?",
      "options": [
        "0.0 to 1.0, where higher values indicate better discrimination.",
        "0.0 to 5.0, where higher values indicate better discrimination.",
        "0.0 to 10.0, where higher values indicate better discrimination.",
        "0.0 to 0.5, where higher values indicate better discrimination."
      ],
      "correctAnswer": "0.0 to 1.0, where higher values indicate better discrimination."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is item analysis important for improving the quality of a test?",
      "options": [
        "It helps identify poorly performing items and provides insights for improvement.",
        "It ensures the test is not too difficult for students.",
        "It guarantees that the test covers all content areas equally.",
        "It allows the test to be scored automatically."
      ],
      "correctAnswer": "It helps identify poorly performing items and provides insights for improvement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be done if an item has a very high p-value?",
      "options": [
        "It might be too easy and could be revised or replaced with a more challenging item.",
        "It should be removed immediately.",
        "It should be kept because it reflects easy content.",
        "It should be analyzed to ensure it tests the intended learning objective."
      ],
      "correctAnswer": "It might be too easy and could be revised or replaced with a more challenging item."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the effect of including poorly performing items in a test?",
      "options": [
        "It lowers the overall reliability and validity of the test.",
        "It makes the test easier for students.",
        "It improves the fairness of the test.",
        "It helps identify students with high academic ability."
      ],
      "correctAnswer": "It lowers the overall reliability and validity of the test."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role does item-total correlation play in item analysis?",
      "options": [
        "It helps determine how well each item correlates with the total test score.",
        "It shows the individual difficulty of each item.",
        "It measures how long students spend on each item.",
        "It indicates how well the items cover the learning objectives."
      ],
      "correctAnswer": "It helps determine how well each item correlates with the total test score."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can an item analysis report help in test development?",
      "options": [
        "It identifies which questions are too easy or difficult and suggests revisions.",
        "It shows which students need extra help in specific areas.",
        "It automatically grades the test for all students.",
        "It calculates the average score of the class."
      ],
      "correctAnswer": "It identifies which questions are too easy or difficult and suggests revisions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should you do if an item shows both a high p-value and low discrimination index?",
      "options": [
        "Revise the item to ensure it is more challenging and improves discrimination.",
        "Remove the item as it is not useful for the test.",
        "Increase the number of distractors in the item.",
        "Keep the item as it is, assuming it is easy for all students."
      ],
      "correctAnswer": "Revise the item to ensure it is more challenging and improves discrimination."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of revising items based on item analysis results?",
      "options": [
        "To ensure that items are effective at measuring the intended learning objectives.",
        "To make the test easier for students.",
        "To increase the total number of items in the test.",
        "To reduce the overall time required to take the test."
      ],
      "correctAnswer": "To ensure that items are effective at measuring the intended learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What could be a reason for an item’s high p-value but poor discrimination index?",
      "options": [
        "The item might be too easy, or it could be poorly designed, leading to low differentiation.",
        "The item might be very challenging for most students.",
        "The item may be too complex, requiring too much time to solve.",
        "The item could be measuring an irrelevant concept."
      ],
      "correctAnswer": "The item might be too easy, or it could be poorly designed, leading to low differentiation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can item analysis help in identifying bias in test items?",
      "options": [
        "By examining if certain groups of students consistently perform poorly on specific items.",
        "By checking the length of the items and reducing them.",
        "By ensuring that all items are multiple-choice.",
        "By increasing the number of distractors to reduce bias."
      ],
      "correctAnswer": "By examining if certain groups of students consistently perform poorly on specific items."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate a test after conducting item analysis?",
      "options": [
        "By considering the item difficulty, discrimination, and the reliability of the test as a whole.",
        "By calculating the average test score of all students.",
        "By comparing the results with other class tests.",
        "By ensuring that the test is equally challenging for all students."
      ],
      "correctAnswer": "By considering the item difficulty, discrimination, and the reliability of the test as a whole."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you use item analysis results to create a more balanced test for future assessments?",
      "options": [
        "By revising difficult items, improving discrimination, and ensuring a mix of question types.",
        "By focusing only on recall-based items.",
        "By reducing the length of the test significantly.",
        "By making all items equally challenging."
      ],
      "correctAnswer": "By revising difficult items, improving discrimination, and ensuring a mix of question types."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Item Analysis",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you create a test that ensures both reliability and validity using item analysis results?",
      "options": [
        "By analyzing item performance data and adjusting difficulty, content coverage, and question types.",
        "By making the test longer to cover more material.",
        "By keeping all questions of equal difficulty.",
        "By focusing only on true/false items."
      ],
      "correctAnswer": "By analyzing item performance data and adjusting difficulty, content coverage, and question types."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of formative assessment in learning?",
      "options": [
        "To evaluate overall student achievement at the end of the course.",
        "To provide ongoing feedback to improve learning during the course.",
        "To prepare students for standardized tests.",
        "To determine the final grade of a student."
      ],
      "correctAnswer": "To provide ongoing feedback to improve learning during the course."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a summative assessment used for?",
      "options": [
        "To measure student learning during the course.",
        "To determine the final grade or achievement of the student.",
        "To provide feedback for improvement.",
        "To track student progress over time."
      ],
      "correctAnswer": "To determine the final grade or achievement of the student."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a characteristic of a diagnostic assessment?",
      "options": [
        "It is conducted before instruction to identify gaps in prior knowledge.",
        "It is given at the end of a course to assess overall performance.",
        "It is used to evaluate students' understanding of content during instruction.",
        "It is designed to predict future learning outcomes."
      ],
      "correctAnswer": "It is conducted before instruction to identify gaps in prior knowledge."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to use a variety of assessment methods?",
      "options": [
        "To ensure the assessment is equally difficult for all students.",
        "To provide a comprehensive evaluation of students' abilities and learning styles.",
        "To avoid bias in grading.",
        "To make grading easier and more efficient."
      ],
      "correctAnswer": "To provide a comprehensive evaluation of students' abilities and learning styles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does formative assessment benefit both students and teachers?",
      "options": [
        "It allows students to practice and demonstrate knowledge, while providing teachers with feedback on learning progress.",
        "It helps teachers assess final performance at the end of a course.",
        "It helps teachers grade students more easily.",
        "It is used to determine if a student is ready to graduate."
      ],
      "correctAnswer": "It allows students to practice and demonstrate knowledge, while providing teachers with feedback on learning progress."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key feature of authentic assessment?",
      "options": [
        "It involves real-world tasks and application of knowledge.",
        "It is designed solely to measure factual recall.",
        "It uses only multiple-choice questions.",
        "It measures only theoretical knowledge."
      ],
      "correctAnswer": "It involves real-world tasks and application of knowledge."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of rubrics in assessment?",
      "options": [
        "To provide a clear and consistent set of criteria for evaluating student work.",
        "To make grading faster and more automated.",
        "To allow for subjective grading by the teacher.",
        "To ensure that all assessments are multiple-choice."
      ],
      "correctAnswer": "To provide a clear and consistent set of criteria for evaluating student work."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is feedback considered a vital component of assessment?",
      "options": [
        "It helps students understand their strengths and areas for improvement, guiding their learning.",
        "It helps teachers complete grading faster.",
        "It helps students receive a final grade without further work.",
        "It encourages students to focus solely on memorization."
      ],
      "correctAnswer": "It helps students understand their strengths and areas for improvement, guiding their learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers use formative assessment results to improve instruction?",
      "options": [
        "By adjusting teaching methods based on the specific needs of the students as revealed by the assessments.",
        "By focusing on grading assignments faster.",
        "By designing tests only based on the final course content.",
        "By reducing the amount of homework given to students."
      ],
      "correctAnswer": "By adjusting teaching methods based on the specific needs of the students as revealed by the assessments."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can assessment results be used to help students who are struggling?",
      "options": [
        "By identifying areas where they need additional support and providing targeted interventions.",
        "By lowering their grades to match their performance.",
        "By giving them additional time to complete assessments.",
        "By removing them from the course."
      ],
      "correctAnswer": "By identifying areas where they need additional support and providing targeted interventions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can portfolio assessments enhance the evaluation of student progress?",
      "options": [
        "By showcasing a student's work over time, allowing for a comprehensive view of their learning and development.",
        "By reducing the number of assessments required in a course.",
        "By focusing only on students' final projects.",
        "By ensuring that the student's grade is based on a single test score."
      ],
      "correctAnswer": "By showcasing a student's work over time, allowing for a comprehensive view of their learning and development."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What could be the reason if an assessment does not align with the learning objectives?",
      "options": [
        "The test might not adequately measure the skills or knowledge the students were intended to learn.",
        "The assessment was too challenging for students.",
        "The assessment used too many multiple-choice questions.",
        "The teacher did not grade the test properly."
      ],
      "correctAnswer": "The test might not adequately measure the skills or knowledge the students were intended to learn."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you analyze if an assessment was fair to all students?",
      "options": [
        "By reviewing the test for bias and ensuring that it covers content from the curriculum appropriately for all students.",
        "By comparing the students' scores to their peers' scores.",
        "By focusing only on the highest-performing students.",
        "By adjusting the grading scale to ensure everyone passes."
      ],
      "correctAnswer": "By reviewing the test for bias and ensuring that it covers content from the curriculum appropriately for all students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most effective way to evaluate the effectiveness of an assessment tool?",
      "options": [
        "By examining its alignment with learning objectives and analyzing student performance data.",
        "By analyzing the number of questions on the test.",
        "By comparing the scores of different classes.",
        "By ensuring the test is graded quickly."
      ],
      "correctAnswer": "By examining its alignment with learning objectives and analyzing student performance data."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design an assessment strategy that accommodates various learning styles?",
      "options": [
        "By incorporating a mix of assessment methods, including visual, auditory, and hands-on tasks.",
        "By using only written tests to evaluate all students.",
        "By focusing solely on group-based assessments.",
        "By reducing the number of assessments required in the course."
      ],
      "correctAnswer": "By incorporating a mix of assessment methods, including visual, auditory, and hands-on tasks."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you create an assessment plan for a diverse classroom?",
      "options": [
        "By using differentiated assessments that meet the varying needs and abilities of all students.",
        "By making the assessment uniform for all students, regardless of their needs.",
        "By assigning the same test to every student.",
        "By reducing the assessment load for some students."
      ],
      "correctAnswer": "By using differentiated assessments that meet the varying needs and abilities of all students."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary characteristic of criterion-referenced assessments?",
      "options": [
        "They compare a student's performance to that of others.",
        "They measure student performance against predetermined standards or criteria.",
        "They are focused on predicting future performance.",
        "They rely on a student's past performance."
      ],
      "correctAnswer": "They measure student performance against predetermined standards or criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main difference between formative and summative assessments?",
      "options": [
        "Formative assessments are used to evaluate overall learning at the end of the course.",
        "Summative assessments provide feedback for improvement during the course.",
        "Formative assessments provide ongoing feedback to guide learning, while summative assessments evaluate final outcomes.",
        "Summative assessments help improve teaching methods."
      ],
      "correctAnswer": "Formative assessments provide ongoing feedback to guide learning, while summative assessments evaluate final outcomes."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes performance-based assessments?",
      "options": [
        "Assessments that rely on multiple-choice questions to measure knowledge.",
        "Assessments that evaluate students based on their ability to perform tasks or demonstrate skills.",
        "Assessments that only measure students' written abilities.",
        "Assessments that solely focus on the theoretical understanding of concepts."
      ],
      "correctAnswer": "Assessments that evaluate students based on their ability to perform tasks or demonstrate skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to ensure that assessments are reliable?",
      "options": [
        "To make the grading process more subjective.",
        "To ensure that students can guess the correct answers.",
        "To ensure that assessments provide consistent and accurate results over time.",
        "To make assessments easier to complete for students."
      ],
      "correctAnswer": "To ensure that assessments provide consistent and accurate results over time."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does a rubric contribute to the assessment process?",
      "options": [
        "It provides a detailed explanation of how a student's work will be evaluated based on specific criteria.",
        "It focuses only on grading multiple-choice questions.",
        "It ensures that all students receive the same grade.",
        "It eliminates the need for subjective judgment in grading."
      ],
      "correctAnswer": "It provides a detailed explanation of how a student's work will be evaluated based on specific criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does an assessment tool's validity refer to?",
      "options": [
        "It refers to how consistent the tool is in measuring what it is designed to measure.",
        "It refers to how quickly the tool can be graded.",
        "It refers to the ease of understanding the tool.",
        "It refers to the extent to which the tool measures what it intends to measure."
      ],
      "correctAnswer": "It refers to the extent to which the tool measures what it intends to measure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it crucial to align assessments with learning objectives?",
      "options": [
        "To make grading easier for teachers.",
        "To ensure that the assessments are directly related to the content that was taught.",
        "To allow students to choose their own learning objectives.",
        "To ensure that assessments can be completed quickly."
      ],
      "correctAnswer": "To ensure that the assessments are directly related to the content that was taught."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers use assessments to identify students' learning gaps?",
      "options": [
        "By reviewing students' answers to identify where they struggled or made errors.",
        "By grading all students the same way.",
        "By focusing only on the highest-achieving students.",
        "By asking students to redo assignments."
      ],
      "correctAnswer": "By reviewing students' answers to identify where they struggled or made errors."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role do peer assessments play in the learning process?",
      "options": [
        "They allow students to receive feedback from their peers and reflect on their learning.",
        "They only evaluate the teacher's effectiveness.",
        "They reduce the need for teacher involvement in grading.",
        "They ensure that all students perform at the same level."
      ],
      "correctAnswer": "They allow students to receive feedback from their peers and reflect on their learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can rubrics help students understand their grades?",
      "options": [
        "By showing students how their performance is evaluated based on clear, detailed criteria.",
        "By making grading faster for teachers.",
        "By ensuring that students only receive a grade based on attendance.",
        "By reducing the number of assignments students must complete."
      ],
      "correctAnswer": "By showing students how their performance is evaluated based on clear, detailed criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply differentiated assessment in a classroom?",
      "options": [
        "By using varied methods and tools to assess students according to their learning needs and styles.",
        "By giving the same test to all students.",
        "By focusing only on one method of assessment, such as multiple-choice questions.",
        "By simplifying the assessment to a few questions."
      ],
      "correctAnswer": "By using varied methods and tools to assess students according to their learning needs and styles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What could indicate that an assessment is not measuring what it is intended to measure?",
      "options": [
        "If students' scores do not reflect their understanding of the content being taught.",
        "If all students score the same grade.",
        "If the assessment is graded quickly.",
        "If the questions are too easy for the students."
      ],
      "correctAnswer": "If students' scores do not reflect their understanding of the content being taught."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you analyze the effectiveness of an assessment tool?",
      "options": [
        "By reviewing how well it measures the intended learning outcomes and comparing it with student performance data.",
        "By focusing on how quickly it can be administered.",
        "By comparing it to other assessment tools that are easier to grade.",
        "By checking if it is universally applicable to all students."
      ],
      "correctAnswer": "By reviewing how well it measures the intended learning outcomes and comparing it with student performance data."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the best way to evaluate the fairness of an assessment?",
      "options": [
        "By ensuring that all students have the same opportunity to demonstrate their knowledge and skills.",
        "By giving the assessment to only the top-performing students.",
        "By making the assessment as difficult as possible for all students.",
        "By using only multiple-choice questions."
      ],
      "correctAnswer": "By ensuring that all students have the same opportunity to demonstrate their knowledge and skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you integrate peer assessment into an overall assessment strategy?",
      "options": [
        "By using peer assessment alongside teacher evaluations to provide students with a more comprehensive view of their performance.",
        "By replacing teacher assessments with peer assessments entirely.",
        "By using peer assessment only for grading.",
        "By eliminating all other forms of assessment in favor of peer assessment."
      ],
      "correctAnswer": "By using peer assessment alongside teacher evaluations to provide students with a more comprehensive view of their performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you create a balanced assessment plan for diverse learners?",
      "options": [
        "By incorporating a variety of assessment methods that consider different learning styles and abilities.",
        "By using the same type of assessment for every student.",
        "By limiting assessments to written tests only.",
        "By focusing only on group assessments."
      ],
      "correctAnswer": "By incorporating a variety of assessment methods that consider different learning styles and abilities."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an example of a norm-referenced assessment?",
      "options": [
        "A test that compares a student's performance to that of their peers.",
        "A test that measures a student's understanding of the course material.",
        "A test that evaluates a student's ability to perform tasks.",
        "A test that assesses students based on pre-established criteria."
      ],
      "correctAnswer": "A test that compares a student's performance to that of their peers."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which type of assessment is typically used to evaluate students' final achievements in a course?",
      "options": [
        "Formative assessment",
        "Summative assessment",
        "Diagnostic assessment",
        "Peer assessment"
      ],
      "correctAnswer": "Summative assessment"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a formative assessment primarily aim to measure?",
      "options": [
        "Student progress and understanding during the learning process.",
        "The final performance at the end of the course.",
        "The overall learning environment.",
        "Student rankings compared to their peers."
      ],
      "correctAnswer": "Student progress and understanding during the learning process."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to provide feedback to students after an assessment?",
      "options": [
        "To help students understand their strengths and areas for improvement.",
        "To let students know how much they can improve their grades.",
        "To make students feel good about their performance.",
        "To determine whether students should retake the course."
      ],
      "correctAnswer": "To help students understand their strengths and areas for improvement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a valid assessment ensure?",
      "options": [
        "The assessment accurately measures the learning objectives it is designed to evaluate.",
        "The assessment is easy to grade.",
        "The assessment measures a student's speed of completion.",
        "The assessment reflects the content of the textbook."
      ],
      "correctAnswer": "The assessment accurately measures the learning objectives it is designed to evaluate."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it essential to consider cultural diversity when designing assessments?",
      "options": [
        "To ensure assessments are fair and inclusive of all student backgrounds.",
        "To make the assessment process longer.",
        "To allow students to choose the types of questions they will answer.",
        "To ensure assessments only test factual knowledge."
      ],
      "correctAnswer": "To ensure assessments are fair and inclusive of all student backgrounds."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher use formative assessments to adjust teaching methods?",
      "options": [
        "By identifying areas where students need more help and adjusting instruction accordingly.",
        "By assigning students additional homework.",
        "By giving more time to the fastest students.",
        "By focusing solely on the students' final grades."
      ],
      "correctAnswer": "By identifying areas where students need more help and adjusting instruction accordingly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers use rubrics to evaluate student performance?",
      "options": [
        "By applying predefined criteria and providing clear descriptions for various levels of performance.",
        "By evaluating the students' behavior during the assessment.",
        "By focusing on the students' speed in completing the assessment.",
        "By grading students based on their appearance during the test."
      ],
      "correctAnswer": "By applying predefined criteria and providing clear descriptions for various levels of performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher ensure a balanced assessment system?",
      "options": [
        "By using multiple types of assessments that align with different learning outcomes and student needs.",
        "By relying only on written tests.",
        "By only assessing students through quizzes.",
        "By assessing students solely based on group activities."
      ],
      "correctAnswer": "By using multiple types of assessments that align with different learning outcomes and student needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of analyzing assessment data?",
      "options": [
        "To identify trends, gaps, and areas for improvement in teaching and learning.",
        "To determine the best way to grade students.",
        "To find the fastest way to administer tests.",
        "To reduce the number of students who need extra help."
      ],
      "correctAnswer": "To identify trends, gaps, and areas for improvement in teaching and learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "When reviewing student results, what would be a sign of a poorly designed assessment?",
      "options": [
        "If students consistently perform poorly on questions related to the taught material.",
        "If students perform better on one section of the test than others.",
        "If some students do better than others.",
        "If students score similarly across all sections."
      ],
      "correctAnswer": "If students consistently perform poorly on questions related to the taught material."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher evaluate the effectiveness of an assessment tool?",
      "options": [
        "By reviewing how well it measures the intended learning objectives and how well students perform.",
        "By how quickly it can be graded.",
        "By how many students perform well on it.",
        "By comparing it with the performance on other assessments."
      ],
      "correctAnswer": "By reviewing how well it measures the intended learning objectives and how well students perform."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could you synthesize different types of assessments to create a more comprehensive evaluation system?",
      "options": [
        "By combining formative, summative, and peer assessments to cover various aspects of student learning.",
        "By using only one type of assessment for simplicity.",
        "By focusing only on written exams.",
        "By assigning group projects without individual assessments."
      ],
      "correctAnswer": "By combining formative, summative, and peer assessments to cover various aspects of student learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you create a personalized assessment plan for a diverse classroom?",
      "options": [
        "By incorporating different assessment strategies to accommodate various learning styles and abilities.",
        "By using only standardized tests for all students.",
        "By giving the same test to every student, regardless of their learning needs.",
        "By focusing on only one type of assessment for all students."
      ],
      "correctAnswer": "By incorporating different assessment strategies to accommodate various learning styles and abilities."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of a performance-based assessment?",
      "options": [
        "A student demonstrating a scientific experiment in a laboratory.",
        "A student taking a multiple-choice test on historical facts.",
        "A student writing a report on the importance of global warming.",
        "A student completing a worksheet with questions about math concepts."
      ],
      "correctAnswer": "A student demonstrating a scientific experiment in a laboratory."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which type of assessment is usually conducted at the end of a course?",
      "options": [
        "Summative assessment",
        "Formative assessment",
        "Diagnostic assessment",
        "Norm-referenced assessment"
      ],
      "correctAnswer": "Summative assessment"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of a rubric in assessment?",
      "options": [
        "To provide clear criteria for evaluating student performance.",
        "To increase the amount of questions in the assessment.",
        "To make grading subjective and based on personal judgment.",
        "To randomly assign grades to students."
      ],
      "correctAnswer": "To provide clear criteria for evaluating student performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to align assessments with learning objectives?",
      "options": [
        "To ensure that the assessment measures the skills and knowledge students are expected to learn.",
        "To ensure that students perform better on the test.",
        "To make the assessment easier for students to complete.",
        "To avoid any ambiguity in the grading process."
      ],
      "correctAnswer": "To ensure that the assessment measures the skills and knowledge students are expected to learn."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key feature of authentic assessments?",
      "options": [
        "They require students to apply their knowledge and skills in real-world scenarios.",
        "They are designed to be taken in a classroom setting.",
        "They rely on memorization of facts and formulas.",
        "They use a single multiple-choice question to assess student learning."
      ],
      "correctAnswer": "They require students to apply their knowledge and skills in real-world scenarios."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does reliability in assessment refer to?",
      "options": [
        "The consistency of the assessment results when repeated under similar conditions.",
        "The fairness of the assessment for all students.",
        "The number of students who score the same on the test.",
        "The ease of grading the assessment."
      ],
      "correctAnswer": "The consistency of the assessment results when repeated under similar conditions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply the results of an assessment to improve teaching?",
      "options": [
        "By analyzing the results to identify patterns and adjust instructional strategies.",
        "By using the results to punish students who perform poorly.",
        "By ignoring the results and continuing with the same teaching methods.",
        "By giving students more time to study before the next assessment."
      ],
      "correctAnswer": "By analyzing the results to identify patterns and adjust instructional strategies."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher use peer assessment to enhance student learning?",
      "options": [
        "By allowing students to assess each other's work and provide constructive feedback.",
        "By allowing students to grade their own tests.",
        "By selecting students randomly to give feedback on their peers' work.",
        "By allowing students to choose who they want to grade."
      ],
      "correctAnswer": "By allowing students to assess each other's work and provide constructive feedback."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How should a teacher use diagnostic assessments at the beginning of a course?",
      "options": [
        "To assess prior knowledge and identify areas where students may need additional support.",
        "To measure the final learning outcome of the course.",
        "To evaluate the effectiveness of the teaching method after the course ends.",
        "To compare students' performance to that of their peers."
      ],
      "correctAnswer": "To assess prior knowledge and identify areas where students may need additional support."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What can an item analysis reveal about a test?",
      "options": [
        "It can identify which questions are most difficult for students and whether the test was balanced.",
        "It can reveal students' behavior during the test.",
        "It can show how fast students complete the test.",
        "It can identify students' personal biases during testing."
      ],
      "correctAnswer": "It can identify which questions are most difficult for students and whether the test was balanced."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "When analyzing a multiple-choice test, what does a high level of item difficulty suggest?",
      "options": [
        "The question may need to be revised or clarified.",
        "The test was too easy for the students.",
        "The assessment was overly long.",
        "The students performed better than expected."
      ],
      "correctAnswer": "The question may need to be revised or clarified."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would be an effective strategy for evaluating the fairness of an assessment?",
      "options": [
        "Reviewing the assessment to ensure that all students have an equal chance to succeed.",
        "Grading only the students who performed well.",
        "Increasing the length of the test to make it more challenging.",
        "Relying on student feedback alone to evaluate fairness."
      ],
      "correctAnswer": "Reviewing the assessment to ensure that all students have an equal chance to succeed."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize data from multiple assessments to improve student learning?",
      "options": [
        "By identifying patterns across different assessment types and tailoring instruction accordingly.",
        "By comparing students' test scores and ranking them.",
        "By using the results to create a new assessment that mimics previous ones.",
        "By disregarding assessments that yield unexpected results."
      ],
      "correctAnswer": "By identifying patterns across different assessment types and tailoring instruction accordingly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Assessment of Learning",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you create a more effective formative assessment strategy for your students?",
      "options": [
        "By incorporating ongoing feedback, diverse question types, and regular check-ins with students.",
        "By only assessing students at the end of the term.",
        "By focusing on one single type of assessment, such as multiple-choice.",
        "By avoiding any form of feedback to students."
      ],
      "correctAnswer": "By incorporating ongoing feedback, diverse question types, and regular check-ins with students."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main purpose of a rubric in assessment?",
      "options": [
        "To clearly define the criteria for evaluating student work.",
        "To grade all student work the same way.",
        "To make the grading process more subjective.",
        "To offer no feedback to students."
      ],
      "correctAnswer": "To clearly define the criteria for evaluating student work."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which type of rubric provides descriptions of performance at each level of achievement?",
      "options": [
        "Analytic rubric",
        "Holistic rubric",
        "Generic rubric",
        "Rating scale"
      ],
      "correctAnswer": "Analytic rubric"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is NOT typically included in a rubric?",
      "options": [
        "Criteria for evaluation",
        "Performance levels",
        "Instructions for the task",
        "Descriptions of what is expected at each level"
      ],
      "correctAnswer": "Instructions for the task"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to have clear and specific criteria in a rubric?",
      "options": [
        "To ensure consistent grading and provide clear expectations for students.",
        "To make the rubric more complex and harder to understand.",
        "To allow teachers to grade quickly without much thought.",
        "To limit feedback given to students."
      ],
      "correctAnswer": "To ensure consistent grading and provide clear expectations for students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is one advantage of using a rubric for assessment?",
      "options": [
        "It allows for subjective and inconsistent grading.",
        "It helps students understand what is expected in their work.",
        "It eliminates the need for feedback.",
        "It makes grading more random and unpredictable."
      ],
      "correctAnswer": "It helps students understand what is expected in their work."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does a holistic rubric differ from an analytic rubric?",
      "options": [
        "A holistic rubric evaluates the work as a whole rather than breaking it down into components.",
        "A holistic rubric is more detailed and complex.",
        "A holistic rubric is used for self-assessment only.",
        "A holistic rubric includes more performance levels."
      ],
      "correctAnswer": "A holistic rubric evaluates the work as a whole rather than breaking it down into components."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a rubric, how can the descriptions at each performance level benefit students?",
      "options": [
        "By clarifying the expectations and helping students identify areas for improvement.",
        "By making the grading process longer and more complex.",
        "By discouraging students from attempting to improve their work.",
        "By providing vague feedback that cannot be acted upon."
      ],
      "correctAnswer": "By clarifying the expectations and helping students identify areas for improvement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you apply a rubric to assess a student's essay?",
      "options": [
        "By evaluating the essay against each specific criterion listed in the rubric.",
        "By assigning a single grade without referring to the rubric.",
        "By grading only the introduction and conclusion of the essay.",
        "By using the rubric to assess the student's handwriting."
      ],
      "correctAnswer": "By evaluating the essay against each specific criterion listed in the rubric."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "When applying a rubric to grade a group project, how can it be used effectively?",
      "options": [
        "By evaluating each group member's contribution separately and clearly outlining expectations for each role.",
        "By grading the entire project as a whole without differentiating between group members.",
        "By focusing only on the presentation aspect of the project.",
        "By disregarding the rubric and assigning the same grade to every group member."
      ],
      "correctAnswer": "By evaluating each group member's contribution separately and clearly outlining expectations for each role."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would a teacher modify a rubric to make it more applicable to a different type of assignment?",
      "options": [
        "By adjusting the criteria and performance levels to reflect the new assignment's requirements.",
        "By keeping the same rubric and grading all assignments in the same way.",
        "By removing the performance levels to simplify the grading.",
        "By using the rubric without considering the nature of the assignment."
      ],
      "correctAnswer": "By adjusting the criteria and performance levels to reflect the new assignment's requirements."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can analyzing a rubric help improve the assessment process?",
      "options": [
        "By identifying areas of ambiguity and ensuring that the rubric accurately reflects the learning objectives.",
        "By making the rubric more complex and harder to understand.",
        "By using the rubric without any revisions.",
        "By focusing only on the highest performance level."
      ],
      "correctAnswer": "By identifying areas of ambiguity and ensuring that the rubric accurately reflects the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What might it indicate if a rubric's performance levels are not clearly differentiated?",
      "options": [
        "The rubric may need to be revised for clarity and specificity.",
        "The rubric is effective and does not need any changes.",
        "The rubric is too easy to grade.",
        "The rubric is too detailed."
      ],
      "correctAnswer": "The rubric may need to be revised for clarity and specificity."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher evaluate the effectiveness of a rubric after using it?",
      "options": [
        "By reviewing student feedback, consistency in grading, and the clarity of the rubric's criteria.",
        "By disregarding student performance and feedback.",
        "By grading assignments without referring to the rubric.",
        "By making the rubric more complicated."
      ],
      "correctAnswer": "By reviewing student feedback, consistency in grading, and the clarity of the rubric's criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize feedback from multiple rubrics to improve their teaching?",
      "options": [
        "By comparing the feedback from each rubric to identify common trends and adjust teaching strategies.",
        "By focusing on the individual results of each rubric without considering overall patterns.",
        "By disregarding feedback and continuing with the same teaching methods.",
        "By focusing on student complaints rather than rubric data."
      ],
      "correctAnswer": "By comparing the feedback from each rubric to identify common trends and adjust teaching strategies."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a rubric that effectively measures both content and presentation in a project?",
      "options": [
        "By developing criteria that assess both the accuracy of content and the clarity of the presentation.",
        "By focusing only on the content and disregarding the presentation.",
        "By using a generic rubric for all types of assignments.",
        "By focusing only on the presentation aspect."
      ],
      "correctAnswer": "By developing criteria that assess both the accuracy of content and the clarity of the presentation."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What type of rubric would you use to assess the same criteria across multiple assignments?",
      "options": [
        "Generic rubric",
        "Holistic rubric",
        "Analytic rubric",
        "Rating scale"
      ],
      "correctAnswer": "Generic rubric"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an example of a criterion that could be included in a rubric for a writing assignment?",
      "options": [
        "Clarity of argument",
        "Handwriting style",
        "Number of pages written",
        "Time spent writing"
      ],
      "correctAnswer": "Clarity of argument"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be the primary focus of a rubric for a group presentation?",
      "options": [
        "The overall teamwork and group dynamics",
        "The ability of each group member to speak individually",
        "The number of slides used in the presentation",
        "The length of the presentation"
      ],
      "correctAnswer": "The overall teamwork and group dynamics"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does a rubric with clearly defined performance levels help students?",
      "options": [
        "It provides students with a clear understanding of what is expected at each level of performance.",
        "It makes grading subjective and inconsistent.",
        "It encourages students to focus on quantity rather than quality.",
        "It discourages students from improving their work."
      ],
      "correctAnswer": "It provides students with a clear understanding of what is expected at each level of performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why might a teacher choose to use a holistic rubric for grading a research paper?",
      "options": [
        "To assess the paper as a whole and evaluate the overall quality.",
        "To break down the paper into specific sections for grading.",
        "To focus only on the grammar and spelling.",
        "To allow for very detailed feedback on each aspect of the paper."
      ],
      "correctAnswer": "To assess the paper as a whole and evaluate the overall quality."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would using a rubric affect the transparency of the grading process?",
      "options": [
        "By providing students with a clear, consistent framework for understanding how their work is assessed.",
        "By making the grading process subjective and unpredictable.",
        "By allowing the teacher to grade quickly without thinking about expectations.",
        "By making it harder for students to understand the grading criteria."
      ],
      "correctAnswer": "By providing students with a clear, consistent framework for understanding how their work is assessed."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply a rubric to assess a student's project on historical events?",
      "options": [
        "By evaluating the research, analysis, and presentation of the project against the rubric's criteria.",
        "By considering only the student's creativity without reference to the rubric.",
        "By focusing only on the length of the project.",
        "By giving the student a grade without using the rubric."
      ],
      "correctAnswer": "By evaluating the research, analysis, and presentation of the project against the rubric's criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "When applying a rubric for a science experiment, how might the 'accuracy of results' criterion be evaluated?",
      "options": [
        "By comparing the experimental data to expected results and assessing how closely the student followed the procedure.",
        "By focusing only on how well the student explained the results.",
        "By grading based on the appearance of the experiment.",
        "By giving more weight to the student's theoretical understanding."
      ],
      "correctAnswer": "By comparing the experimental data to expected results and assessing how closely the student followed the procedure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a rubric for an oral presentation include a criterion for 'engagement with the audience'?",
      "options": [
        "By assessing how well the speaker maintains eye contact and responds to audience questions.",
        "By evaluating the length of the presentation.",
        "By grading the number of slides used in the presentation.",
        "By focusing only on the speaker's tone of voice."
      ],
      "correctAnswer": "By assessing how well the speaker maintains eye contact and responds to audience questions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would analyzing a rubric help in ensuring consistency in grading across different teachers?",
      "options": [
        "By ensuring all teachers use the same set of criteria and performance levels when assessing student work.",
        "By allowing teachers to grade based on their personal preferences.",
        "By making the grading process more subjective and varied.",
        "By excluding feedback from other teachers."
      ],
      "correctAnswer": "By ensuring all teachers use the same set of criteria and performance levels when assessing student work."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What might be a reason to revise a rubric after its initial use in grading?",
      "options": [
        "To clarify criteria that were misunderstood by students or resulted in inconsistent grading.",
        "To make the rubric more complex and harder to use.",
        "To reduce the number of criteria assessed.",
        "To avoid using the rubric in future assessments."
      ],
      "correctAnswer": "To clarify criteria that were misunderstood by students or resulted in inconsistent grading."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why would a teacher evaluate the clarity of a rubric after it is used?",
      "options": [
        "To ensure that students understood the rubric and that it aligned with the learning objectives.",
        "To make grading faster and easier.",
        "To ensure that no students received any feedback.",
        "To assess only the performance of the students who performed well."
      ],
      "correctAnswer": "To ensure that students understood the rubric and that it aligned with the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a teacher synthesize the use of multiple rubrics to create a more comprehensive grading system?",
      "options": [
        "By combining elements of each rubric to ensure that all aspects of student work are assessed thoroughly.",
        "By using multiple rubrics for the same assignment to increase complexity.",
        "By discarding rubrics and grading based on intuition.",
        "By using a single rubric for all assignments."
      ],
      "correctAnswer": "By combining elements of each rubric to ensure that all aspects of student work are assessed thoroughly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a rubric for a project that includes both individual and group work?",
      "options": [
        "By creating separate criteria for individual contributions and group performance while ensuring clarity for both.",
        "By focusing only on the group's overall performance.",
        "By ignoring individual contributions and grading based on the final project result.",
        "By using the same rubric for all assignments, regardless of group involvement."
      ],
      "correctAnswer": "By creating separate criteria for individual contributions and group performance while ensuring clarity for both."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a well-designed rubric typically include?",
      "options": [
        "Performance levels, criteria, and descriptors.",
        "Only criteria and final grade.",
        "A single criterion for grading.",
        "Only the rubric's final score."
      ],
      "correctAnswer": "Performance levels, criteria, and descriptors."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which type of rubric would be best to assess a student's creative expression in an art class?",
      "options": [
        "Holistic rubric",
        "Analytic rubric",
        "Generic rubric",
        "Rating scale"
      ],
      "correctAnswer": "Holistic rubric"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of providing performance level descriptors in a rubric?",
      "options": [
        "To clearly communicate the expectations for each level of performance.",
        "To make grading faster and easier.",
        "To make the rubric harder for students to understand.",
        "To prevent students from improving their performance."
      ],
      "correctAnswer": "To clearly communicate the expectations for each level of performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a rubric improve student understanding of how their work will be assessed?",
      "options": [
        "By clearly showing how each aspect of their work contributes to the overall grade.",
        "By making grading more random and inconsistent.",
        "By focusing on a single aspect of the work.",
        "By limiting the feedback students receive."
      ],
      "correctAnswer": "By clearly showing how each aspect of their work contributes to the overall grade."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does a rubric allow students to self-assess their own work?",
      "options": [
        "By providing them with clear criteria to evaluate their own progress.",
        "By giving them a single final grade without feedback.",
        "By limiting their understanding of grading criteria.",
        "By avoiding the use of detailed criteria for assessment."
      ],
      "correctAnswer": "By providing them with clear criteria to evaluate their own progress."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why would a teacher use a rubric when assigning a project that requires collaboration?",
      "options": [
        "To assess both the individual contributions and the overall team performance.",
        "To grade each student separately without considering collaboration.",
        "To only assess the final product without individual input.",
        "To focus on the teamwork aspect but ignore individual contributions."
      ],
      "correctAnswer": "To assess both the individual contributions and the overall team performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a teacher apply a rubric for grading a written essay?",
      "options": [
        "By using specific criteria such as grammar, structure, and argument clarity to assess the essay.",
        "By grading the essay based on its length alone.",
        "By ignoring content and focusing only on formatting.",
        "By grading without considering any defined rubric."
      ],
      "correctAnswer": "By using specific criteria such as grammar, structure, and argument clarity to assess the essay."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could a teacher assess a student's oral presentation using a rubric?",
      "options": [
        "By evaluating clarity, engagement, organization, and the speaker's delivery using defined performance levels.",
        "By focusing only on the length of the presentation.",
        "By ignoring the content and focusing on the speaker’s attire.",
        "By evaluating the presentation on personal preferences."
      ],
      "correctAnswer": "By evaluating clarity, engagement, organization, and the speaker's delivery using defined performance levels."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a rubric assessing a project on historical research, how might 'depth of analysis' be assessed?",
      "options": [
        "By evaluating how well the student connects facts, presents multiple perspectives, and interprets historical events.",
        "By counting the number of sources the student used.",
        "By focusing only on how neat the project looks.",
        "By evaluating the length of the project."
      ],
      "correctAnswer": "By evaluating how well the student connects facts, presents multiple perspectives, and interprets historical events."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would analyzing the use of rubrics help improve student learning outcomes?",
      "options": [
        "By ensuring consistent and transparent expectations, providing students with specific feedback to improve.",
        "By making grading less transparent.",
        "By discouraging student feedback.",
        "By focusing only on grading speed and efficiency."
      ],
      "correctAnswer": "By ensuring consistent and transparent expectations, providing students with specific feedback to improve."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a teacher analyze the effectiveness of a rubric after an assessment?",
      "options": [
        "By reviewing student performance against rubric criteria and determining whether the rubric led to consistent and fair grading.",
        "By ignoring student feedback and using the rubric unchanged.",
        "By adjusting the rubric to make it easier to grade.",
        "By focusing on only one criterion and ignoring others."
      ],
      "correctAnswer": "By reviewing student performance against rubric criteria and determining whether the rubric led to consistent and fair grading."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main benefit of using rubrics in assessment?",
      "options": [
        "They provide clear, specific criteria that guide students and make grading more transparent and objective.",
        "They make grading subjective and random.",
        "They remove the need for feedback.",
        "They focus only on the quantity of student work."
      ],
      "correctAnswer": "They provide clear, specific criteria that guide students and make grading more transparent and objective."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize multiple rubrics to create a more inclusive grading system for diverse students?",
      "options": [
        "By integrating various criteria and levels of performance to address a wide range of student abilities and learning styles.",
        "By keeping the rubrics separate and focusing on one rubric per assignment.",
        "By using a single rubric for all students regardless of their abilities.",
        "By disregarding the need for feedback."
      ],
      "correctAnswer": "By integrating various criteria and levels of performance to address a wide range of student abilities and learning styles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Rubrics",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a teacher create a rubric for a collaborative project that includes peer assessment?",
      "options": [
        "By incorporating both individual and group performance criteria, along with peer feedback components for a comprehensive evaluation.",
        "By focusing only on individual work and ignoring the group aspect.",
        "By eliminating peer assessment to avoid bias.",
        "By using the same rubric for all assignments without modification."
      ],
      "correctAnswer": "By incorporating both individual and group performance criteria, along with peer feedback components for a comprehensive evaluation."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main focus of the behaviorist approach to teaching?",
      "options": [
        "Stimulus-response connections and reinforcement.",
        "Student-centered learning and collaboration.",
        "Cognitive development and self-reflection.",
        "Holistic development of the student."
      ],
      "correctAnswer": "Stimulus-response connections and reinforcement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which teaching method is associated with the constructivist theory of learning?",
      "options": [
        "Project-based learning.",
        "Direct instruction.",
        "Lecturing.",
        "Drill and practice."
      ],
      "correctAnswer": "Project-based learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which principle of teaching is based on Vygotsky's zone of proximal development?",
      "options": [
        "Scaffolding.",
        "Punishment and reward.",
        "Repetition.",
        "Individualized instruction."
      ],
      "correctAnswer": "Scaffolding."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does differentiated instruction improve learning outcomes?",
      "options": [
        "By tailoring teaching methods to meet the diverse needs of students.",
        "By using the same method for all students.",
        "By limiting the amount of content covered in class.",
        "By focusing only on higher-level students."
      ],
      "correctAnswer": "By tailoring teaching methods to meet the diverse needs of students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary goal of formative assessment in teaching?",
      "options": [
        "To inform instruction and guide students' learning progress.",
        "To assign a final grade.",
        "To evaluate students at the end of the course.",
        "To motivate students to study harder."
      ],
      "correctAnswer": "To inform instruction and guide students' learning progress."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does active learning benefit students in a classroom setting?",
      "options": [
        "By engaging students directly in the learning process through activities and problem-solving.",
        "By allowing students to passively listen to lectures.",
        "By having students memorize large amounts of content.",
        "By focusing on individual work without collaboration."
      ],
      "correctAnswer": "By engaging students directly in the learning process through activities and problem-solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is student-centered learning considered effective?",
      "options": [
        "Because it encourages active participation and ownership of the learning process.",
        "Because it relies solely on teacher-led lectures.",
        "Because students do not need to take responsibility for their learning.",
        "Because it focuses on memorizing content."
      ],
      "correctAnswer": "Because it encourages active participation and ownership of the learning process."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would a teacher apply scaffolding in a classroom setting?",
      "options": [
        "By providing varying levels of support to students as they work toward independence.",
        "By giving students complete freedom without any guidance.",
        "By only offering assistance after a student has completed the task.",
        "By requiring students to perform tasks without prior instruction."
      ],
      "correctAnswer": "By providing varying levels of support to students as they work toward independence."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "In what way can technology be used to enhance student engagement in the classroom?",
      "options": [
        "By using interactive tools like smartboards and online resources that foster collaboration.",
        "By only using traditional textbooks without additional resources.",
        "By limiting students' access to digital tools during lessons.",
        "By reducing the use of multimedia in class."
      ],
      "correctAnswer": "By using interactive tools like smartboards and online resources that foster collaboration."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would a teacher apply the principles of cooperative learning in group activities?",
      "options": [
        "By assigning specific roles to each student and encouraging collaboration to complete tasks.",
        "By having students work individually without interaction.",
        "By focusing on competition rather than collaboration.",
        "By allowing students to complete tasks without guidance from the teacher."
      ],
      "correctAnswer": "By assigning specific roles to each student and encouraging collaboration to complete tasks."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a teacher analyze the effectiveness of a lesson plan?",
      "options": [
        "By reviewing student feedback and assessment data to identify areas for improvement.",
        "By following the same teaching methods without change.",
        "By focusing only on the teacher’s performance without considering students’ outcomes.",
        "By ignoring feedback from students."
      ],
      "correctAnswer": "By reviewing student feedback and assessment data to identify areas for improvement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the learning progress of students during the course?",
      "options": [
        "By using regular formative assessments and checking for understanding throughout lessons.",
        "By only testing students at the end of the course.",
        "By relying on just the final exam results.",
        "By ignoring continuous feedback and focusing solely on grading."
      ],
      "correctAnswer": "By using regular formative assessments and checking for understanding throughout lessons."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of reflective teaching?",
      "options": [
        "To critically assess and improve one’s teaching practices based on feedback and experience.",
        "To avoid changes to teaching methods.",
        "To only evaluate students, not teaching methods.",
        "To follow a fixed teaching strategy."
      ],
      "correctAnswer": "To critically assess and improve one’s teaching practices based on feedback and experience."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize different teaching strategies to create an inclusive learning environment?",
      "options": [
        "By combining strategies like cooperative learning, differentiated instruction, and inquiry-based learning to meet the diverse needs of students.",
        "By using a single method for all students.",
        "By focusing on one group of students at the expense of others.",
        "By relying solely on technology in the classroom."
      ],
      "correctAnswer": "By combining strategies like cooperative learning, differentiated instruction, and inquiry-based learning to meet the diverse needs of students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How might a teacher create an engaging lesson plan that incorporates student interests?",
      "options": [
        "By integrating real-world examples, interactive activities, and student input to make learning relevant and engaging.",
        "By following a rigid script without deviation.",
        "By focusing only on lecture-based teaching.",
        "By disregarding student interests and preferences."
      ],
      "correctAnswer": "By integrating real-world examples, interactive activities, and student input to make learning relevant and engaging."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary focus of the cognitive approach in teaching?",
      "options": [
        "To enhance students' cognitive development through mental processes like reasoning and problem-solving.",
        "To emphasize memorization and rote learning.",
        "To focus on emotional and social learning.",
        "To rely solely on behavioral reinforcement."
      ],
      "correctAnswer": "To enhance students' cognitive development through mental processes like reasoning and problem-solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which theory emphasizes the role of prior knowledge in constructing new learning?",
      "options": [
        "Constructivist theory.",
        "Behaviorist theory.",
        "Cognitive load theory.",
        "Humanistic theory."
      ],
      "correctAnswer": "Constructivist theory."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key characteristic of an effective lesson plan?",
      "options": [
        "Clear learning objectives, organized content, and strategies for assessment.",
        "Flexible goals and random content coverage.",
        "A focus on the teacher's needs rather than the students.",
        "Only providing a summary of the lesson without activities."
      ],
      "correctAnswer": "Clear learning objectives, organized content, and strategies for assessment."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is metacognition important in the classroom?",
      "options": [
        "It helps students become aware of their own learning processes, improving their ability to monitor and regulate learning.",
        "It limits students' ability to reflect on their learning.",
        "It focuses only on remembering facts.",
        "It encourages passive learning by students."
      ],
      "correctAnswer": "It helps students become aware of their own learning processes, improving their ability to monitor and regulate learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does peer feedback enhance student learning?",
      "options": [
        "It encourages collaboration and helps students understand different perspectives on their work.",
        "It focuses only on the teacher's feedback.",
        "It hinders students from expressing their own opinions.",
        "It allows students to work individually without collaboration."
      ],
      "correctAnswer": "It encourages collaboration and helps students understand different perspectives on their work."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does the concept of formative assessment aim to achieve?",
      "options": [
        "It helps to monitor students' progress and provides ongoing feedback to guide learning.",
        "It provides a final grade after completing the course.",
        "It evaluates students' performance only at the end of the course.",
        "It focuses on grades rather than learning."
      ],
      "correctAnswer": "It helps to monitor students' progress and provides ongoing feedback to guide learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher use questioning techniques to promote higher-order thinking?",
      "options": [
        "By asking open-ended, thought-provoking questions that require analysis, evaluation, and synthesis.",
        "By asking questions with yes/no answers.",
        "By focusing on factual recall only.",
        "By limiting questions to memorization."
      ],
      "correctAnswer": "By asking open-ended, thought-provoking questions that require analysis, evaluation, and synthesis."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply differentiated instruction to meet the needs of diverse learners?",
      "options": [
        "By tailoring content, process, and product based on students' readiness, interests, and learning profiles.",
        "By using a single approach for all students regardless of their needs.",
        "By providing the same assignment for every student.",
        "By focusing on one learning style only."
      ],
      "correctAnswer": "By tailoring content, process, and product based on students' readiness, interests, and learning profiles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "In what way can project-based learning benefit students in a real-world context?",
      "options": [
        "By allowing students to work on authentic tasks that simulate real-world problems and scenarios.",
        "By limiting learning to textbooks and lectures.",
        "By focusing solely on theoretical concepts.",
        "By reducing the amount of group work."
      ],
      "correctAnswer": "By allowing students to work on authentic tasks that simulate real-world problems and scenarios."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers use cooperative learning techniques to foster teamwork and collaboration?",
      "options": [
        "By assigning students to work in diverse groups, allowing them to share knowledge and complete tasks together.",
        "By having students work alone on all assignments.",
        "By creating competitive activities without collaboration.",
        "By focusing on individual performance only."
      ],
      "correctAnswer": "By assigning students to work in diverse groups, allowing them to share knowledge and complete tasks together."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would a teacher analyze when reviewing the results of a standardized test?",
      "options": [
        "The distribution of scores to identify patterns in students' strengths and weaknesses.",
        "Only the highest scores without considering other students' results.",
        "The test format without looking at student performance.",
        "The teacher's personal preferences regarding students' responses."
      ],
      "correctAnswer": "The distribution of scores to identify patterns in students' strengths and weaknesses."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of a classroom management plan?",
      "options": [
        "By observing student behavior and assessing whether the plan encourages positive engagement and reduces disruptions.",
        "By ignoring student behavior and focusing solely on teaching content.",
        "By allowing students to disregard classroom rules.",
        "By using a generic plan without modification."
      ],
      "correctAnswer": "By observing student behavior and assessing whether the plan encourages positive engagement and reduces disruptions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How should a teacher evaluate the effectiveness of a learning strategy?",
      "options": [
        "By considering student performance, engagement, and feedback to determine its success.",
        "By focusing only on the teacher's comfort with the strategy.",
        "By ignoring student feedback and relying only on test scores.",
        "By applying the same strategy to every class without modification."
      ],
      "correctAnswer": "By considering student performance, engagement, and feedback to determine its success."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize various learning theories to design a comprehensive lesson plan?",
      "options": [
        "By integrating strategies from different theories, such as constructivism, behaviorism, and cognitivism, to address diverse learning needs.",
        "By sticking to one theory and ignoring others.",
        "By disregarding learning theories and focusing only on personal teaching preferences.",
        "By focusing solely on rote memorization techniques."
      ],
      "correctAnswer": "By integrating strategies from different theories, such as constructivism, behaviorism, and cognitivism, to address diverse learning needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a lesson plan that caters to a variety of learning styles?",
      "options": [
        "By including visual, auditory, and kinesthetic activities to engage students in multiple ways.",
        "By focusing only on one learning style and ignoring others.",
        "By providing the same activity for all students.",
        "By limiting activities to passive learning."
      ],
      "correctAnswer": "By including visual, auditory, and kinesthetic activities to engage students in multiple ways."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the key feature of differentiated instruction?",
      "options": [
        "Tailoring content, process, and product to meet the diverse needs of students.",
        "Using one method for all students.",
        "Only focusing on high-achieving students.",
        "Teaching only using lectures and exams."
      ],
      "correctAnswer": "Tailoring content, process, and product to meet the diverse needs of students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the focus of Vygotsky's theory of social constructivism?",
      "options": [
        "Learning occurs through social interactions and guided participation.",
        "Learning is primarily an individual endeavor.",
        "Learning is based on rote memorization and repetition.",
        "Learning is passive, based on environmental stimuli."
      ],
      "correctAnswer": "Learning occurs through social interactions and guided participation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which strategy is most effective in fostering student-centered learning?",
      "options": [
        "Encouraging collaboration, inquiry, and problem-solving among students.",
        "Direct instruction and lecturing to students.",
        "Assigning homework without any feedback.",
        "Strictly following a textbook with minimal student involvement."
      ],
      "correctAnswer": "Encouraging collaboration, inquiry, and problem-solving among students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can formative assessments help teachers adjust their teaching strategies?",
      "options": [
        "By providing ongoing feedback that informs instructional decisions.",
        "By assessing students only at the end of a unit.",
        "By offering grades as the primary goal of learning.",
        "By limiting feedback to written exams only."
      ],
      "correctAnswer": "By providing ongoing feedback that informs instructional decisions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role does scaffolding play in the teaching process?",
      "options": [
        "It provides temporary support to students, allowing them to accomplish tasks they cannot complete independently.",
        "It removes all challenges for the students to make learning easier.",
        "It discourages active participation from students.",
        "It focuses solely on rote memorization techniques."
      ],
      "correctAnswer": "It provides temporary support to students, allowing them to accomplish tasks they cannot complete independently."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is active learning important in a classroom environment?",
      "options": [
        "It engages students in the learning process and encourages critical thinking.",
        "It focuses on passive reception of information.",
        "It restricts student participation to following the teacher's instructions.",
        "It emphasizes listening without engaging in discussion."
      ],
      "correctAnswer": "It engages students in the learning process and encourages critical thinking."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does 'constructivism' emphasize about learning?",
      "options": [
        "Learning is an active process where learners construct their own understanding based on experiences.",
        "Learning is a passive process driven solely by teachers.",
        "Learning happens by memorizing facts without considering personal experiences.",
        "Learning is unrelated to social or cultural contexts."
      ],
      "correctAnswer": "Learning is an active process where learners construct their own understanding based on experiences."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply cooperative learning to promote social interaction?",
      "options": [
        "By assigning students to work in groups, allowing them to share ideas and solve problems collaboratively.",
        "By having students work on individual assignments with no interaction.",
        "By encouraging competition among students rather than cooperation.",
        "By lecturing without any group work."
      ],
      "correctAnswer": "By assigning students to work in groups, allowing them to share ideas and solve problems collaboratively."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can project-based learning improve student engagement?",
      "options": [
        "By encouraging students to work on real-world tasks that are meaningful and relevant.",
        "By focusing on theory and abstract concepts without application.",
        "By limiting student choices and enforcing strict guidelines.",
        "By relying on memorization of facts rather than critical thinking."
      ],
      "correctAnswer": "By encouraging students to work on real-world tasks that are meaningful and relevant."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role do problem-solving strategies play in teaching?",
      "options": [
        "They help students develop critical thinking skills and apply knowledge to new situations.",
        "They only focus on memorizing solutions without understanding the reasoning behind them.",
        "They focus on learning only through trial and error.",
        "They discourage students from exploring different approaches."
      ],
      "correctAnswer": "They help students develop critical thinking skills and apply knowledge to new situations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of a lesson plan?",
      "options": [
        "By evaluating student engagement, understanding, and the achievement of learning objectives.",
        "By focusing solely on teacher performance without considering student outcomes.",
        "By only reviewing test scores without looking at overall learning.",
        "By ignoring student feedback and focusing only on the textbook."
      ],
      "correctAnswer": "By evaluating student engagement, understanding, and the achievement of learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze classroom behavior to improve student learning?",
      "options": [
        "By identifying patterns in behavior and adjusting instructional strategies to enhance engagement and participation.",
        "By ignoring behavior and focusing only on the content being taught.",
        "By focusing solely on rewarding good behavior without considering learning needs.",
        "By punishing misbehavior without analyzing its cause."
      ],
      "correctAnswer": "By identifying patterns in behavior and adjusting instructional strategies to enhance engagement and participation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How should a teacher evaluate the impact of different teaching strategies on student learning?",
      "options": [
        "By assessing student performance, engagement, and feedback to determine which strategies are most effective.",
        "By focusing solely on traditional lecture methods and disregarding innovative strategies.",
        "By evaluating teacher satisfaction rather than student learning outcomes.",
        "By using a single strategy for all students, regardless of needs."
      ],
      "correctAnswer": "By assessing student performance, engagement, and feedback to determine which strategies are most effective."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize feedback from students to improve future lessons?",
      "options": [
        "By analyzing feedback to identify common themes and adjusting teaching methods accordingly.",
        "By ignoring student feedback and continuing with the same approach.",
        "By focusing on what the teacher prefers, rather than student needs.",
        "By disregarding the feedback from students who struggled with the lesson."
      ],
      "correctAnswer": "By analyzing feedback to identify common themes and adjusting teaching methods accordingly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create an inclusive classroom environment for all students?",
      "options": [
        "By incorporating diverse teaching methods, materials, and activities that address various learning needs.",
        "By ignoring the diverse backgrounds and needs of students.",
        "By focusing only on high-achieving students.",
        "By using a one-size-fits-all approach to teaching."
      ],
      "correctAnswer": "By incorporating diverse teaching methods, materials, and activities that address various learning needs."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the definition of formative assessment?",
      "options": [
        "An assessment that provides ongoing feedback during the learning process.",
        "An assessment conducted only at the end of a unit or course.",
        "An assessment used to assign final grades.",
        "An assessment that is only multiple-choice questions."
      ],
      "correctAnswer": "An assessment that provides ongoing feedback during the learning process."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which teaching approach focuses on learning through experience and reflection?",
      "options": [
        "Experiential learning.",
        "Direct instruction.",
        "Behaviorism.",
        "Constructivism."
      ],
      "correctAnswer": "Experiential learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an essential characteristic of a growth mindset?",
      "options": [
        "Belief in the ability to improve through effort and perseverance.",
        "Belief that intelligence is fixed and unchangeable.",
        "Avoiding challenges to maintain success.",
        "Assuming failure is a sign of incapacity."
      ],
      "correctAnswer": "Belief in the ability to improve through effort and perseverance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can differentiated instruction cater to diverse student needs?",
      "options": [
        "By offering multiple learning paths, content, and assessments to accommodate different learning styles.",
        "By giving every student the same assignments and assessments.",
        "By focusing on only one method of instruction, regardless of student needs.",
        "By assuming that all students learn the same way."
      ],
      "correctAnswer": "By offering multiple learning paths, content, and assessments to accommodate different learning styles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does active learning differ from passive learning?",
      "options": [
        "Active learning involves student participation and engagement in the learning process, while passive learning focuses on listening and note-taking.",
        "Active learning is only about memorization of facts.",
        "Passive learning requires students to work in groups, whereas active learning does not.",
        "Active learning is a form of traditional lecture-based teaching."
      ],
      "correctAnswer": "Active learning involves student participation and engagement in the learning process, while passive learning focuses on listening and note-taking."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Bloom's Taxonomy aim to achieve in the classroom?",
      "options": [
        "It provides a framework to categorize different levels of cognitive skills and learning objectives.",
        "It is a method to grade students based on their abilities.",
        "It only focuses on memorization of content.",
        "It discourages creative thinking in students."
      ],
      "correctAnswer": "It provides a framework to categorize different levels of cognitive skills and learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers use formative assessments to improve student learning?",
      "options": [
        "By using them to track progress, provide feedback, and adjust instruction accordingly.",
        "By using them only as final tests to assign grades.",
        "By excluding feedback to avoid confusion.",
        "By avoiding any change to teaching methods."
      ],
      "correctAnswer": "By using them to track progress, provide feedback, and adjust instruction accordingly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply the concept of scaffolding in the classroom?",
      "options": [
        "By providing temporary support and gradually removing it as students gain independence.",
        "By giving students no guidance and allowing them to figure things out on their own.",
        "By providing all answers and solutions without student involvement.",
        "By making learning easier by removing all challenges."
      ],
      "correctAnswer": "By providing temporary support and gradually removing it as students gain independence."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher use cooperative learning to enhance student interaction?",
      "options": [
        "By encouraging students to work together in groups to solve problems, share ideas, and achieve common goals.",
        "By keeping students working independently and not collaborating.",
        "By focusing only on competition among students.",
        "By assigning each student an individual task with no group involvement."
      ],
      "correctAnswer": "By encouraging students to work together in groups to solve problems, share ideas, and achieve common goals."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply inquiry-based learning in the classroom?",
      "options": [
        "By encouraging students to ask questions, investigate, and explore topics of interest with guidance from the teacher.",
        "By giving students all the answers without any exploration.",
        "By having students memorize facts without asking questions.",
        "By avoiding any hands-on activities."
      ],
      "correctAnswer": "By encouraging students to ask questions, investigate, and explore topics of interest with guidance from the teacher."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of a teaching strategy?",
      "options": [
        "By collecting and reviewing data from student performance, feedback, and engagement.",
        "By focusing only on student test scores.",
        "By ignoring student feedback and assessing based on personal preference.",
        "By relying on a single method of assessment."
      ],
      "correctAnswer": "By collecting and reviewing data from student performance, feedback, and engagement."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze classroom dynamics to improve student learning outcomes?",
      "options": [
        "By observing patterns of behavior, engagement, and participation, then adjusting instructional strategies accordingly.",
        "By focusing only on students with behavioral issues.",
        "By ignoring classroom behavior and focusing solely on content delivery.",
        "By using standardized tests as the only method of evaluation."
      ],
      "correctAnswer": "By observing patterns of behavior, engagement, and participation, then adjusting instructional strategies accordingly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher evaluate the impact of a new teaching method?",
      "options": [
        "By assessing student learning outcomes, engagement, and feedback to determine the effectiveness of the method.",
        "By using only personal observations without considering student feedback.",
        "By relying on a single student's opinion about the method.",
        "By sticking to traditional methods without evaluating alternatives."
      ],
      "correctAnswer": "By assessing student learning outcomes, engagement, and feedback to determine the effectiveness of the method."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize student feedback to improve instructional practices?",
      "options": [
        "By analyzing trends in student feedback, identifying areas for improvement, and implementing changes in teaching strategies.",
        "By ignoring feedback and continuing with the same methods.",
        "By focusing only on the opinions of a few students.",
        "By using only standardized tests to evaluate teaching effectiveness."
      ],
      "correctAnswer": "By analyzing trends in student feedback, identifying areas for improvement, and implementing changes in teaching strategies."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a student-centered learning environment?",
      "options": [
        "By allowing students to take an active role in their learning through collaboration, inquiry, and decision-making.",
        "By focusing solely on the teacher's lecture without student involvement.",
        "By providing rigid guidelines and limiting student choices.",
        "By maintaining a teacher-centered approach with minimal student input."
      ],
      "correctAnswer": "By allowing students to take an active role in their learning through collaboration, inquiry, and decision-making."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does 'constructivism' emphasize in teaching and learning?",
      "options": [
        "The idea that learners construct their own understanding and knowledge through experiences.",
        "That teachers are the sole source of knowledge in the classroom.",
        "That learning only happens through memorization.",
        "The belief that learning should be standardized across all students."
      ],
      "correctAnswer": "The idea that learners construct their own understanding and knowledge through experiences."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of a nonverbal communication method used in teaching?",
      "options": [
        "Facial expressions and body language.",
        "Giving oral instructions.",
        "Writing on the whiteboard.",
        "Asking students questions."
      ],
      "correctAnswer": "Facial expressions and body language."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of a lesson plan in the context of teaching?",
      "options": [
        "To structure the content and activities in a logical order to achieve learning objectives.",
        "To serve as a strict set of instructions that must be followed at all times.",
        "To record the teacher's personal thoughts during a lesson.",
        "To assess the students' prior knowledge."
      ],
      "correctAnswer": "To structure the content and activities in a logical order to achieve learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does peer teaching enhance student learning?",
      "options": [
        "By encouraging students to explain concepts to each other, reinforcing their own understanding.",
        "By giving students the authority to grade their classmates.",
        "By making the teacher less involved in the learning process.",
        "By limiting the students' participation in the lesson."
      ],
      "correctAnswer": "By encouraging students to explain concepts to each other, reinforcing their own understanding."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role does feedback play in the learning process?",
      "options": [
        "It provides students with information on their performance and helps them improve.",
        "It is only used for grading purposes.",
        "It is not necessary if students have performed well.",
        "It should only come from peers and not from the teacher."
      ],
      "correctAnswer": "It provides students with information on their performance and helps them improve."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can metacognition improve student learning?",
      "options": [
        "By helping students to think about their thinking and reflect on their learning strategies.",
        "By reducing the need for students to think about the material at all.",
        "By limiting students to only one way of learning.",
        "By focusing solely on memorization and recall."
      ],
      "correctAnswer": "By helping students to think about their thinking and reflect on their learning strategies."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does using a variety of teaching methods benefit students?",
      "options": [
        "It accommodates diverse learning styles and engages students in different ways.",
        "It confuses students and makes the material harder to understand.",
        "It is unnecessary, as one method is sufficient for all students.",
        "It only benefits students who are already proficient in the subject."
      ],
      "correctAnswer": "It accommodates diverse learning styles and engages students in different ways."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher implement inquiry-based learning in the classroom?",
      "options": [
        "By encouraging students to ask questions and explore topics in depth with teacher support.",
        "By giving students all the answers upfront to ensure they don't get confused.",
        "By limiting student participation and focusing only on lecture-based teaching.",
        "By having students memorize facts without any critical thinking."
      ],
      "correctAnswer": "By encouraging students to ask questions and explore topics in depth with teacher support."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can active learning be incorporated into a lesson plan?",
      "options": [
        "By having students engage in discussions, group work, or hands-on activities during the lesson.",
        "By focusing only on direct instruction and lectures.",
        "By having students passively take notes throughout the lesson.",
        "By giving students the same work as homework without any in-class engagement."
      ],
      "correctAnswer": "By having students engage in discussions, group work, or hands-on activities during the lesson."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can collaborative learning enhance student engagement?",
      "options": [
        "By encouraging students to work together, share ideas, and solve problems collaboratively.",
        "By isolating students to work individually without any peer interaction.",
        "By focusing solely on competition between students.",
        "By limiting student interaction to avoid distractions."
      ],
      "correctAnswer": "By encouraging students to work together, share ideas, and solve problems collaboratively."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of a lesson?",
      "options": [
        "By examining student performance, participation, and feedback to determine the impact of the lesson.",
        "By focusing only on the teacher's performance and preparation.",
        "By using a single method of assessment without considering diverse learning outcomes.",
        "By relying only on standardized tests to evaluate success."
      ],
      "correctAnswer": "By examining student performance, participation, and feedback to determine the impact of the lesson."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze classroom dynamics to improve instruction?",
      "options": [
        "By observing student interactions, engagement levels, and adjusting teaching methods accordingly.",
        "By sticking to one teaching style and not considering student needs.",
        "By limiting student feedback and focusing solely on lecture material.",
        "By teaching the same way for every group of students."
      ],
      "correctAnswer": "By observing student interactions, engagement levels, and adjusting teaching methods accordingly."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher evaluate the effectiveness of a teaching method?",
      "options": [
        "By assessing student outcomes, engagement, and feedback to determine the method's success.",
        "By using only test scores to evaluate the method's effectiveness.",
        "By ignoring student feedback and focusing on the teacher's preferences.",
        "By evaluating based solely on personal teaching experiences."
      ],
      "correctAnswer": "By assessing student outcomes, engagement, and feedback to determine the method's success."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher synthesize different teaching strategies to improve learning?",
      "options": [
        "By combining various methods to accommodate different learning styles and needs.",
        "By using only one strategy throughout the course.",
        "By avoiding any adaptation to teaching strategies.",
        "By sticking to traditional methods without considering innovation."
      ],
      "correctAnswer": "By combining various methods to accommodate different learning styles and needs."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Principles of Teaching",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create an inclusive classroom environment?",
      "options": [
        "By ensuring that all students feel valued, respected, and able to participate regardless of background or ability.",
        "By excluding students who may not fit into the classroom culture.",
        "By giving preferential treatment to certain students over others.",
        "By limiting resources to only the most advanced students."
      ],
      "correctAnswer": "By ensuring that all students feel valued, respected, and able to participate regardless of background or ability."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is dyslexia?",
      "options": [
        "A reading disorder that affects the ability to recognize letters and words.",
        "A disorder that affects the ability to write letters correctly.",
        "A condition where individuals are unable to perceive numbers.",
        "A condition that causes confusion with spatial awareness."
      ],
      "correctAnswer": "A reading disorder that affects the ability to recognize letters and words."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does ADHD stand for?",
      "options": [
        "Attention Deficit Hyperactivity Disorder.",
        "Attention Deficit Hypersensitivity Disorder.",
        "Age-Related Developmental Hyperactivity Disorder.",
        "Allergic Developmental Hyperactivity Disorder."
      ],
      "correctAnswer": "Attention Deficit Hyperactivity Disorder."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a symptom of autism spectrum disorder (ASD)?",
      "options": [
        "Difficulty with communication and social interactions.",
        "A sudden increase in socializing abilities.",
        "Memory loss.",
        "Consistent increase in verbal fluency."
      ],
      "correctAnswer": "Difficulty with communication and social interactions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does ADHD affect a student's learning?",
      "options": [
        "It makes it difficult for students to maintain focus and follow instructions.",
        "It makes students more motivated to learn.",
        "It improves students' reading comprehension.",
        "It enhances students' ability to retain information."
      ],
      "correctAnswer": "It makes it difficult for students to maintain focus and follow instructions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary challenge for students with dyslexia?",
      "options": [
        "Difficulty in recognizing and decoding written words.",
        "Inability to remember verbal instructions.",
        "Difficulty with attention span.",
        "Struggling with physical coordination."
      ],
      "correctAnswer": "Difficulty in recognizing and decoding written words."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What are the common characteristics of a student with autism spectrum disorder?",
      "options": [
        "Struggles with social interaction, repetitive behaviors, and limited interests.",
        "Extreme levels of verbal communication and outgoing behavior.",
        "A lack of interest in sensory experiences.",
        "Inability to function independently in school."
      ],
      "correctAnswer": "Struggles with social interaction, repetitive behaviors, and limited interests."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is early intervention important for students with learning disorders?",
      "options": [
        "It helps prevent further academic and social challenges.",
        "It allows students to progress at a slower pace.",
        "It makes the disorder easier to manage without professional help.",
        "It leads to permanent cures for learning disorders."
      ],
      "correctAnswer": "It helps prevent further academic and social challenges."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers support students with ADHD in the classroom?",
      "options": [
        "By providing structured routines and minimizing distractions.",
        "By allowing them to work in isolation at all times.",
        "By giving them extra breaks but no other accommodations.",
        "By asking them to sit at the back of the class with minimal interaction."
      ],
      "correctAnswer": "By providing structured routines and minimizing distractions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategy can be used to help a student with dyslexia improve their reading skills?",
      "options": [
        "Using multi-sensory techniques to reinforce word recognition.",
        "Focusing only on memorization of words without context.",
        "Giving extra assignments in isolation.",
        "Focusing exclusively on writing exercises."
      ],
      "correctAnswer": "Using multi-sensory techniques to reinforce word recognition."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create an inclusive classroom for students with autism?",
      "options": [
        "By incorporating visual aids, clear communication, and structured routines.",
        "By giving the student individual work without any group interaction.",
        "By using verbal instructions only without visual support.",
        "By segregating the student from the class to avoid distractions."
      ],
      "correctAnswer": "By incorporating visual aids, clear communication, and structured routines."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What could be an underlying cause of learning disorders?",
      "options": [
        "Genetic factors, brain structure differences, or environmental influences.",
        "Too much screen time and lack of physical activity.",
        "An overly structured classroom environment.",
        "Lack of parental involvement in school activities."
      ],
      "correctAnswer": "Genetic factors, brain structure differences, or environmental influences."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can understanding the strengths of a student with ADHD help improve their learning?",
      "options": [
        "By focusing on their strengths and building upon them to improve weaknesses.",
        "By ignoring the strengths and focusing solely on correcting weaknesses.",
        "By assigning them only tasks that require less attention.",
        "By giving them the same tasks as other students without modification."
      ],
      "correctAnswer": "By focusing on their strengths and building upon them to improve weaknesses."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the effectiveness of a learning intervention for a student with dyslexia be evaluated?",
      "options": [
        "By assessing the student's progress in reading comprehension and word recognition over time.",
        "By checking if the student memorizes all the content perfectly.",
        "By ignoring the student's feedback and focusing on test scores only.",
        "By evaluating the student's performance in one assessment only."
      ],
      "correctAnswer": "By assessing the student's progress in reading comprehension and word recognition over time."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can various support systems be integrated to help a student with learning disorders succeed?",
      "options": [
        "By collaborating with special education professionals, teachers, and family members to create a comprehensive plan.",
        "By focusing only on the teacher's approach without considering other perspectives.",
        "By segregating the student in a separate class without integration into the larger classroom.",
        "By making the student follow a rigid, one-size-fits-all approach to learning."
      ],
      "correctAnswer": "By collaborating with special education professionals, teachers, and family members to create a comprehensive plan."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a personalized learning plan for a student with ADHD?",
      "options": [
        "By using a variety of learning strategies and accommodations to meet the student's individual needs.",
        "By giving the student the same tasks as other students without any modifications.",
        "By requiring the student to follow a fixed set of instructions without flexibility.",
        "By only offering individual assignments without any group interaction."
      ],
      "correctAnswer": "By using a variety of learning strategies and accommodations to meet the student's individual needs."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most common type of learning disorder?",
      "options": [
        "Dyslexia.",
        "Dyscalculia.",
        "Dysgraphia.",
        "Dyspraxia."
      ],
      "correctAnswer": "Dyslexia."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a primary symptom of dyscalculia?",
      "options": [
        "Difficulty with mathematical concepts and number processing.",
        "Inability to recognize spoken words.",
        "Difficulty with writing and spelling.",
        "Problems with social interaction."
      ],
      "correctAnswer": "Difficulty with mathematical concepts and number processing."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the key characteristic of a student with dysgraphia?",
      "options": [
        "Difficulty with writing tasks, such as forming letters or organizing thoughts.",
        "Inability to focus on visual tasks.",
        "Difficulty with verbal expression.",
        "Problems with auditory processing."
      ],
      "correctAnswer": "Difficulty with writing tasks, such as forming letters or organizing thoughts."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does dyslexia affect the reading process?",
      "options": [
        "It causes difficulty in decoding words and recognizing letters and words accurately.",
        "It causes an inability to understand spoken language.",
        "It creates difficulties with basic arithmetic calculations.",
        "It results in difficulty with visual memory and shapes."
      ],
      "correctAnswer": "It causes difficulty in decoding words and recognizing letters and words accurately."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does the concept of 'working memory' relate to students with learning disorders?",
      "options": [
        "Students with learning disorders may have difficulty storing and retrieving information in working memory.",
        "Working memory is not affected by learning disorders.",
        "Learning disorders typically involve an inability to form long-term memory, not working memory.",
        "Working memory helps students with learning disorders to learn faster than their peers."
      ],
      "correctAnswer": "Students with learning disorders may have difficulty storing and retrieving information in working memory."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why might students with ADHD find it difficult to focus in class?",
      "options": [
        "They often struggle with maintaining attention on tasks and may be easily distracted.",
        "They are always highly focused and may overthink every detail.",
        "They are extremely gifted and their minds wander to creative thoughts.",
        "They do not experience challenges in focusing."
      ],
      "correctAnswer": "They often struggle with maintaining attention on tasks and may be easily distracted."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What impact do learning disorders have on academic achievement?",
      "options": [
        "Learning disorders may cause challenges in processing and producing academic content, but they do not determine intelligence.",
        "Students with learning disorders will always perform poorly in academic subjects.",
        "Learning disorders lead to total failure in all academic subjects.",
        "Learning disorders have no impact on academic performance."
      ],
      "correctAnswer": "Learning disorders may cause challenges in processing and producing academic content, but they do not determine intelligence."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategy can be used to help a student with ADHD improve their focus during lessons?",
      "options": [
        "Providing structured routines, visual aids, and short breaks to minimize distractions.",
        "Allowing the student to freely move around the classroom at any time.",
        "Asking the student to complete long assignments without any support.",
        "Giving extra time for tests but no changes to teaching methods."
      ],
      "correctAnswer": "Providing structured routines, visual aids, and short breaks to minimize distractions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which approach could help a student with dyscalculia improve their math skills?",
      "options": [
        "Using visual aids and hands-on activities to reinforce mathematical concepts.",
        "Ignoring the student's challenges and following the regular curriculum.",
        "Focusing only on reading and writing tasks and neglecting math.",
        "Teaching math without incorporating visual or tactile materials."
      ],
      "correctAnswer": "Using visual aids and hands-on activities to reinforce mathematical concepts."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers help students with dysgraphia with their writing tasks?",
      "options": [
        "By offering alternative methods like voice-to-text technology or allowing oral presentations.",
        "By forcing the student to write in cursive at all times.",
        "By providing extra assignments without modifications.",
        "By asking them to write long essays with no additional support."
      ],
      "correctAnswer": "By offering alternative methods like voice-to-text technology or allowing oral presentations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is one of the common misconceptions about students with learning disorders?",
      "options": [
        "That they are less intelligent than their peers.",
        "That they are always lazy and unmotivated.",
        "That they do not need any support or accommodations.",
        "That they cannot succeed in education with the right help."
      ],
      "correctAnswer": "That they are less intelligent than their peers."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How do environmental factors contribute to learning disorders?",
      "options": [
        "Environmental factors such as poor nutrition, exposure to toxins, and lack of early education can exacerbate learning difficulties.",
        "Learning disorders are solely caused by genetic factors and have no link to the environment.",
        "Environmental factors have no effect on the development of learning disorders.",
        "Poor environment can cure learning disorders if the student is motivated."
      ],
      "correctAnswer": "Environmental factors such as poor nutrition, exposure to toxins, and lack of early education can exacerbate learning difficulties."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an effective way to evaluate the progress of a student with ADHD?",
      "options": [
        "By tracking the student's focus, task completion, and behavior over time with clear benchmarks for success.",
        "By evaluating only their test scores.",
        "By not considering the student's progress but comparing them to others.",
        "By assuming that any progress made is solely due to motivation."
      ],
      "correctAnswer": "By tracking the student's focus, task completion, and behavior over time with clear benchmarks for success."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a school-wide approach be implemented to support students with learning disorders?",
      "options": [
        "By integrating individualized education plans (IEPs), offering professional development for staff, and involving families in the process.",
        "By separating students with learning disorders into their own classrooms away from peers.",
        "By giving minimal support and assuming that students will catch up eventually.",
        "By focusing only on academic performance without considering emotional or social needs."
      ],
      "correctAnswer": "By integrating individualized education plans (IEPs), offering professional development for staff, and involving families in the process."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher create a personalized intervention plan for a student with a learning disorder?",
      "options": [
        "By collaborating with other educators, specialists, and the student's family to design tailored goals and strategies.",
        "By providing generic, one-size-fits-all interventions without adjustments.",
        "By focusing only on academic skills and ignoring emotional or behavioral needs.",
        "By asking the student to independently figure out how to overcome challenges."
      ],
      "correctAnswer": "By collaborating with other educators, specialists, and the student's family to design tailored goals and strategies."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What type of learning disorder is characterized by difficulty in reading and decoding words?",
      "options": [
        "Dyslexia.",
        "Dyscalculia.",
        "Dysgraphia.",
        "Dyspraxia."
      ],
      "correctAnswer": "Dyslexia."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main issue for students with dyscalculia?",
      "options": [
        "Difficulty understanding mathematical concepts and number operations.",
        "Difficulty understanding written text.",
        "Difficulty understanding social interactions.",
        "Difficulty performing motor tasks."
      ],
      "correctAnswer": "Difficulty understanding mathematical concepts and number operations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a common treatment strategy for students with dysgraphia?",
      "options": [
        "Providing alternative writing methods, such as using a keyboard or voice-to-text technology.",
        "Teaching them cursive writing techniques only.",
        "Increasing written assignments without support.",
        "Focusing only on mathematics and ignoring writing."
      ],
      "correctAnswer": "Providing alternative writing methods, such as using a keyboard or voice-to-text technology."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is early intervention important for students with learning disorders?",
      "options": [
        "It helps to address learning challenges before they become more severe and widespread.",
        "It is not important; learning disorders can be addressed at any time.",
        "Early intervention only benefits students with ADHD, not other disorders.",
        "It is only important for academic success, not for emotional well-being."
      ],
      "correctAnswer": "It helps to address learning challenges before they become more severe and widespread."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does ADHD impact learning in the classroom?",
      "options": [
        "ADHD students may have difficulty staying focused, following instructions, and completing tasks.",
        "ADHD students are always disruptive and do not participate in class.",
        "ADHD only impacts academic performance in non-structured environments.",
        "ADHD students perform better without any support or interventions."
      ],
      "correctAnswer": "ADHD students may have difficulty staying focused, following instructions, and completing tasks."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is one of the key features of students with auditory processing disorder?",
      "options": [
        "Difficulty processing and understanding sounds, including spoken language.",
        "Difficulty recognizing written symbols and letters.",
        "Difficulty with motor skills and coordination.",
        "No issues with language, but they are highly distracted by visual stimuli."
      ],
      "correctAnswer": "Difficulty processing and understanding sounds, including spoken language."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does dyslexia affect a student's ability to read?",
      "options": [
        "It causes difficulty in decoding written words and recognizing letter patterns.",
        "It causes difficulty in remembering facts and formulas.",
        "It creates visual confusion with spatial reasoning.",
        "It results in complete inability to understand speech."
      ],
      "correctAnswer": "It causes difficulty in decoding written words and recognizing letter patterns."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategy can be applied to assist students with dyscalculia during math lessons?",
      "options": [
        "Providing visual aids, manipulatives, and simplified step-by-step instructions.",
        "Increasing the difficulty level of assignments for quicker mastery.",
        "Excluding math-related activities and focusing only on reading.",
        "Focusing only on conceptual understanding without any practice."
      ],
      "correctAnswer": "Providing visual aids, manipulatives, and simplified step-by-step instructions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which approach can support students with ADHD in staying on task during lessons?",
      "options": [
        "Providing clear and concise instructions with frequent check-ins and task reminders.",
        "Allowing students to talk freely and move around the classroom without boundaries.",
        "Reducing academic workload and eliminating any structured activities.",
        "Avoiding any use of visual aids or assistive technologies."
      ],
      "correctAnswer": "Providing clear and concise instructions with frequent check-ins and task reminders."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can teachers modify assessments for students with learning disorders?",
      "options": [
        "By allowing extra time, reducing complexity, and using alternative formats like oral responses.",
        "By increasing the length of all assessments for a more comprehensive evaluation.",
        "By providing no accommodations and expecting the same performance as peers.",
        "By eliminating assessments altogether to avoid frustration."
      ],
      "correctAnswer": "By allowing extra time, reducing complexity, and using alternative formats like oral responses."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does environmental stress impact the learning ability of students with learning disorders?",
      "options": [
        "Stress can exacerbate existing learning difficulties and hinder academic performance.",
        "Environmental stress has no impact on students with learning disorders.",
        "Stress may help students with learning disorders perform better under pressure.",
        "Only academic stress affects students, not environmental factors."
      ],
      "correctAnswer": "Stress can exacerbate existing learning difficulties and hinder academic performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher assess the progress of a student with a learning disorder?",
      "options": [
        "By evaluating the student's performance over time, including improvements in focus, comprehension, and task completion.",
        "By comparing the student to their peers and expecting the same results.",
        "By solely focusing on standardized test scores without any accommodations.",
        "By excluding any form of assessment to avoid causing stress."
      ],
      "correctAnswer": "By evaluating the student's performance over time, including improvements in focus, comprehension, and task completion."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a valid evaluation method for students with learning disorders?",
      "options": [
        "Using a combination of formal assessments, observations, and input from teachers and parents.",
        "Focusing only on formal tests without considering teacher input or classroom behavior.",
        "Ignoring any accommodations or modifications made for the student.",
        "Evaluating the student based only on their highest performance in one area."
      ],
      "correctAnswer": "Using a combination of formal assessments, observations, and input from teachers and parents."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a school-wide intervention program help students with learning disorders?",
      "options": [
        "By integrating personalized plans, training teachers, and creating a supportive environment across all subjects.",
        "By focusing only on one disorder at a time and ignoring others.",
        "By excluding students from standard lessons and focusing on isolated skill-building.",
        "By limiting student interaction with peers to avoid distractions."
      ],
      "correctAnswer": "By integrating personalized plans, training teachers, and creating a supportive environment across all subjects."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Learning Disorders",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What could a teacher do to create an inclusive classroom for students with learning disorders?",
      "options": [
        "Design lessons with varied teaching methods, flexible accommodations, and opportunities for individualized support.",
        "Adopt a rigid curriculum without adjustments for any students.",
        "Avoid providing accommodations and expect the same level of performance from all students.",
        "Exclude students with learning disorders from certain classroom activities."
      ],
      "correctAnswer": "Design lessons with varied teaching methods, flexible accommodations, and opportunities for individualized support."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is considered the father of modern philosophy in education?",
      "options": [
        "John Dewey.",
        "Aristotle.",
        "Jean-Jacques Rousseau.",
        "Immanuel Kant."
      ],
      "correctAnswer": "John Dewey."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher is known for his work on the 'social contract' in educational philosophy?",
      "options": [
        "Jean-Jacques Rousseau.",
        "Plato.",
        "John Locke.",
        "Friedrich Nietzsche."
      ],
      "correctAnswer": "Jean-Jacques Rousseau."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which educational philosopher emphasized experiential learning?",
      "options": [
        "John Dewey.",
        "Socrates.",
        "Mary Wollstonecraft.",
        "Aristotle."
      ],
      "correctAnswer": "John Dewey."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main idea behind John Dewey's philosophy of education?",
      "options": [
        "Education should focus on experiential learning and problem-solving.",
        "Education should only focus on classical subjects like literature and philosophy.",
        "Education should teach obedience and respect for authority.",
        "Education should be highly structured and rigid."
      ],
      "correctAnswer": "Education should focus on experiential learning and problem-solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher's ideas formed the foundation for progressivism in education?",
      "options": [
        "John Dewey.",
        "Plato.",
        "Aristotle.",
        "Immanuel Kant."
      ],
      "correctAnswer": "John Dewey."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did Plato's philosophy influence educational thought?",
      "options": [
        "He believed in the idea of an ideal education that would create philosopher-kings.",
        "He focused on the development of critical thinking through hands-on learning.",
        "He emphasized the need for vocational training over academic pursuits.",
        "He argued that education should be limited to the elite class."
      ],
      "correctAnswer": "He believed in the idea of an ideal education that would create philosopher-kings."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the core idea of educational pragmatism?",
      "options": [
        "Knowledge should be practical and applicable to real-world situations.",
        "Education should be based purely on abstract theories.",
        "Learning should be passive, with students receiving information from teachers.",
        "Knowledge is static and unchanging."
      ],
      "correctAnswer": "Knowledge should be practical and applicable to real-world situations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher is best known for his work on empiricism in education?",
      "options": [
        "John Locke.",
        "Jean-Jacques Rousseau.",
        "Plato.",
        "Friedrich Nietzsche."
      ],
      "correctAnswer": "John Locke."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply John Dewey's philosophy of experiential learning in the classroom?",
      "options": [
        "By creating projects that involve hands-on activities and problem-solving.",
        "By lecturing students on theoretical knowledge without practical application.",
        "By focusing on memorization and repetition of facts.",
        "By enforcing strict discipline without allowing room for creativity."
      ],
      "correctAnswer": "By creating projects that involve hands-on activities and problem-solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher implement Plato's ideas about education for an ideal society in a modern classroom?",
      "options": [
        "By promoting a curriculum that emphasizes the development of leadership and ethical thinking.",
        "By focusing only on traditional academic subjects with little room for creativity.",
        "By ensuring students follow a rigid and structured set of rules with little flexibility.",
        "By emphasizing vocational training and limiting academic education."
      ],
      "correctAnswer": "By promoting a curriculum that emphasizes the development of leadership and ethical thinking."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What teaching approach aligns with the philosophy of pragmatism in education?",
      "options": [
        "Encouraging students to engage in real-world projects and problem-solving tasks.",
        "Focusing on the memorization of abstract theories without practical application.",
        "Creating a teacher-centered classroom with little student interaction.",
        "Limiting learning to only theoretical content with no practical experience."
      ],
      "correctAnswer": "Encouraging students to engage in real-world projects and problem-solving tasks."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What impact did Rousseau's concept of natural education have on modern educational philosophies?",
      "options": [
        "It emphasized the importance of allowing children to learn in a natural, unstructured environment.",
        "It focused on strict discipline and structure to control children's behavior.",
        "It rejected any form of formal education in favor of purely self-directed learning.",
        "It advocated for children to follow a rigid curriculum from a young age."
      ],
      "correctAnswer": "It emphasized the importance of allowing children to learn in a natural, unstructured environment."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the ideas of Friedrich Nietzsche influence education?",
      "options": [
        "His philosophy emphasized individualism, creativity, and the rejection of traditional structures.",
        "His philosophy promoted collective thinking and obedience to authority.",
        "His philosophy focused exclusively on religious education and spiritual growth.",
        "His philosophy advocated for the elimination of all educational systems."
      ],
      "correctAnswer": "His philosophy emphasized individualism, creativity, and the rejection of traditional structures."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher's educational ideas would most likely support the development of democratic values in schools?",
      "options": [
        "John Dewey.",
        "Immanuel Kant.",
        "Plato.",
        "Aristotle."
      ],
      "correctAnswer": "John Dewey."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could a teacher integrate both Dewey's pragmatism and Rousseau's natural education philosophy in their classroom?",
      "options": [
        "By combining experiential learning with a focus on student-centered, unstructured learning environments.",
        "By focusing only on theoretical knowledge without real-world applications.",
        "By adopting a rigid, teacher-centered approach that eliminates student choice.",
        "By exclusively focusing on memorization and test preparation."
      ],
      "correctAnswer": "By combining experiential learning with a focus on student-centered, unstructured learning environments."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher design a curriculum that incorporates the educational philosophies of Dewey and Plato?",
      "options": [
        "By blending hands-on, problem-solving activities with an emphasis on critical thinking and ethical development.",
        "By focusing solely on traditional lecture-based instruction without student involvement.",
        "By excluding any form of experiential learning or student-led inquiry.",
        "By prioritizing memorization of abstract concepts over practical applications."
      ],
      "correctAnswer": "By blending hands-on, problem-solving activities with an emphasis on critical thinking and ethical development."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is credited with the development of the concept of 'tabula rasa' in educational philosophy?",
      "options": [
        "John Locke.",
        "Jean-Jacques Rousseau.",
        "Friedrich Nietzsche.",
        "Aristotle."
      ],
      "correctAnswer": "John Locke."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher is associated with the idea of the 'ideal state' as a foundation for educational systems?",
      "options": [
        "Plato.",
        "John Dewey.",
        "Immanuel Kant.",
        "Thomas Hobbes."
      ],
      "correctAnswer": "Plato."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary focus of existentialism in education, according to its philosophers?",
      "options": [
        "Individual freedom and choice.",
        "Conformity to societal norms.",
        "Collective responsibility in learning.",
        "Systematic instruction and rote memorization."
      ],
      "correctAnswer": "Individual freedom and choice."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Jean-Jacques Rousseau, what is the key component of an effective education system?",
      "options": [
        "A curriculum focused on the natural development of the child.",
        "Strict discipline and control in the classroom.",
        "Excessive emphasis on academic performance and testing.",
        "A focus on religious instruction."
      ],
      "correctAnswer": "A curriculum focused on the natural development of the child."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the central tenet of behaviorism in educational philosophy?",
      "options": [
        "Learning is a change in behavior resulting from environmental stimuli.",
        "Learning is primarily about intellectual and moral development.",
        "Learning requires students to discover their own meaning and truth.",
        "Learning is a process of internalizing societal values and norms."
      ],
      "correctAnswer": "Learning is a change in behavior resulting from environmental stimuli."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which educational philosophy places importance on the development of the whole child, including emotional and social aspects?",
      "options": [
        "Progressivism.",
        "Perennialism.",
        "Essentialism.",
        "Reconstructionism."
      ],
      "correctAnswer": "Progressivism."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher introduced the concept of 'pedagogical love' in education, emphasizing empathy and care?",
      "options": [
        "Paulo Freire.",
        "John Dewey.",
        "Friedrich Froebel.",
        "Emile Durkheim."
      ],
      "correctAnswer": "Paulo Freire."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to John Dewey, what should be the focus of education for it to be effective?",
      "options": [
        "Student-centered learning with an emphasis on real-world problem-solving.",
        "Teacher-directed learning with strict control over curriculum.",
        "Education focused solely on preparing students for standardized tests.",
        "Strict memorization of facts and passive learning."
      ],
      "correctAnswer": "Student-centered learning with an emphasis on real-world problem-solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply the principles of pragmatism in a modern classroom setting?",
      "options": [
        "By focusing on hands-on projects that address real-world issues and problems.",
        "By using rigid textbooks and following a strict lecture-based approach.",
        "By limiting student interaction and focusing on rote memorization.",
        "By emphasizing uniformity and conformity to societal standards."
      ],
      "correctAnswer": "By focusing on hands-on projects that address real-world issues and problems."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What educational strategies can be used to implement John Dewey's idea of experiential learning?",
      "options": [
        "Hands-on activities, problem-solving tasks, and collaborative learning.",
        "Lecturing without student participation and using standardized tests.",
        "Focusing on abstract theories without practical application.",
        "Strict discipline and minimal student choice in learning activities."
      ],
      "correctAnswer": "Hands-on activities, problem-solving tasks, and collaborative learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which teaching method would be most aligned with Plato's ideas of education for an ideal society?",
      "options": [
        "A curriculum focusing on ethics, leadership, and philosophical thinking.",
        "A curriculum focused solely on vocational training and practical skills.",
        "A curriculum emphasizing memorization of religious texts and traditions.",
        "A rigid, teacher-centered classroom with little room for student inquiry."
      ],
      "correctAnswer": "A curriculum focusing on ethics, leadership, and philosophical thinking."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would a teacher analyze the philosophical contributions of Friedrich Nietzsche to modern education?",
      "options": [
        "Nietzsche’s emphasis on individualism and the rejection of traditional norms would encourage students to challenge societal structures.",
        "Nietzsche’s focus on strict obedience to authority would promote a hierarchical classroom environment.",
        "Nietzsche’s rejection of philosophy in favor of vocational training would prioritize technical education over academic pursuits.",
        "Nietzsche’s emphasis on collectivism would encourage conformity in the classroom."
      ],
      "correctAnswer": "Nietzsche’s emphasis on individualism and the rejection of traditional norms would encourage students to challenge societal structures."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best represents the contrast between the educational philosophies of Plato and John Dewey?",
      "options": [
        "Plato’s focus on idealism and Dewey’s emphasis on pragmatism reflect contrasting views on education’s role in society.",
        "Plato emphasized experiential learning, while Dewey focused on classical education.",
        "Dewey prioritized strict discipline, while Plato advocated for a relaxed approach to teaching.",
        "Plato’s educational ideas were heavily based on natural development, while Dewey rejected any form of structure."
      ],
      "correctAnswer": "Plato’s focus on idealism and Dewey’s emphasis on pragmatism reflect contrasting views on education’s role in society."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher's educational approach would most effectively promote social justice and equity in contemporary education?",
      "options": [
        "Paulo Freire.",
        "John Dewey.",
        "Jean-Jacques Rousseau.",
        "Friedrich Froebel."
      ],
      "correctAnswer": "Paulo Freire."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the principles of existentialism and progressivism be combined to create a more inclusive education system?",
      "options": [
        "By focusing on individualized learning pathways and allowing students to explore their personal interests while addressing societal issues.",
        "By emphasizing the memorization of traditional content and testing for compliance.",
        "By rigidly adhering to a fixed curriculum that excludes student input.",
        "By creating a teacher-centered classroom where students are passive recipients of knowledge."
      ],
      "correctAnswer": "By focusing on individualized learning pathways and allowing students to explore their personal interests while addressing societal issues."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Design a modern educational system that incorporates the principles of constructivism and critical pedagogy.",
      "options": [
        "A system where students actively construct knowledge through problem-solving and dialogue, while being encouraged to critically examine power structures in society.",
        "A system focused on rote memorization and traditional lecturing without student interaction.",
        "A system that prioritizes standardized testing and strict adherence to a predetermined curriculum.",
        "A system that limits student choice and emphasizes obedience to teacher authority."
      ],
      "correctAnswer": "A system where students actively construct knowledge through problem-solving and dialogue, while being encouraged to critically examine power structures in society."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher is known for emphasizing the role of education in forming a just society through the concept of 'the philosopher-king'?",
      "options": [
        "Plato",
        "Aristotle",
        "John Dewey",
        "Friedrich Nietzsche"
      ],
      "correctAnswer": "Plato"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Rousseau, what should be the primary focus of education for young children?",
      "options": [
        "Teaching children how to be successful in society through discipline.",
        "Helping children develop natural instincts through unstructured play.",
        "Fostering competitive spirit and intellectual achievement.",
        "Instilling religious and moral values."
      ],
      "correctAnswer": "Helping children develop natural instincts through unstructured play."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is considered the founder of the philosophy of pragmatism in education?",
      "options": [
        "John Dewey",
        "William James",
        "Jean Piaget",
        "Karl Marx"
      ],
      "correctAnswer": "John Dewey"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What key idea does Paulo Freire’s 'Pedagogy of the Oppressed' emphasize in education?",
      "options": [
        "Education as a tool for personal liberation and social transformation.",
        "Education solely focused on knowledge acquisition and test preparation.",
        "Education should be authoritarian to ensure discipline and compliance.",
        "Education should emphasize rote learning and repetition."
      ],
      "correctAnswer": "Education as a tool for personal liberation and social transformation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Friedrich Nietzsche, what role does education play in the development of the individual?",
      "options": [
        "Education helps individuals conform to social norms and expectations.",
        "Education allows individuals to become self-reliant, critical thinkers and challenge established structures.",
        "Education serves as a method to ensure universal truth and knowledge.",
        "Education should be used to promote religious values and societal stability."
      ],
      "correctAnswer": "Education allows individuals to become self-reliant, critical thinkers and challenge established structures."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the central focus of John Dewey’s philosophy of education?",
      "options": [
        "The importance of social cooperation and problem-solving in an ever-changing world.",
        "Strict adherence to classical forms of teaching and testing.",
        "The belief that education is solely about knowledge transmission from teacher to student.",
        "The need to focus primarily on memorization and recall of facts."
      ],
      "correctAnswer": "The importance of social cooperation and problem-solving in an ever-changing world."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of 'dialogue' in Paulo Freire's educational philosophy?",
      "options": [
        "Dialogue is the process through which teachers impart information to students.",
        "Dialogue is used to create an authoritarian relationship between teacher and student.",
        "Dialogue facilitates critical thinking and encourages the active participation of students in their learning process.",
        "Dialogue should be avoided to maintain teacher authority."
      ],
      "correctAnswer": "Dialogue facilitates critical thinking and encourages the active participation of students in their learning process."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher apply John Dewey's ideas on experiential learning in a classroom?",
      "options": [
        "By emphasizing memorization of abstract concepts and theories.",
        "By encouraging students to learn through hands-on activities and real-world problem solving.",
        "By focusing only on textbook material and standardized tests.",
        "By using a teacher-centered, lecture-based approach to learning."
      ],
      "correctAnswer": "By encouraging students to learn through hands-on activities and real-world problem solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the philosophy of existentialism be applied in contemporary classrooms?",
      "options": [
        "By promoting the importance of individual freedom, choice, and responsibility in learning.",
        "By focusing on uniformity and standardization in education.",
        "By emphasizing obedience and discipline as the central goal of education.",
        "By discouraging student interaction and discussion in the classroom."
      ],
      "correctAnswer": "By promoting the importance of individual freedom, choice, and responsibility in learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would a teacher integrate the concepts of 'praxis' from Paulo Freire's work into lesson plans?",
      "options": [
        "By creating lesson plans that connect theory with real-life situations and encourage critical reflection and action.",
        "By focusing strictly on memorization and factual recall.",
        "By ignoring students' cultural backgrounds and experiences in lesson planning.",
        "By limiting student participation to passive listening and note-taking."
      ],
      "correctAnswer": "By creating lesson plans that connect theory with real-life situations and encourage critical reflection and action."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can one analyze the differences between John Dewey's and Jean Piaget’s theories of learning?",
      "options": [
        "Dewey focuses on social learning and real-world experiences, while Piaget emphasizes cognitive development and stages.",
        "Both Dewey and Piaget emphasize strict teacher control and uniformity in learning.",
        "Dewey promotes rote memorization, whereas Piaget advocates for abstract reasoning.",
        "Piaget focuses on moral education, while Dewey focuses on intellectual education."
      ],
      "correctAnswer": "Dewey focuses on social learning and real-world experiences, while Piaget emphasizes cognitive development and stages."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the contrast between Plato's idea of the 'philosopher-king' and Dewey's idea of democratic education?",
      "options": [
        "Plato advocates for an elitist, top-down system of education, while Dewey promotes democratic participation and problem-solving.",
        "Plato believes in universal education for all, while Dewey focuses only on the elite.",
        "Plato emphasizes student-centered learning, while Dewey believes in teacher-centered approaches.",
        "Plato's system emphasizes rote memorization, while Dewey's focuses on theoretical education."
      ],
      "correctAnswer": "Plato advocates for an elitist, top-down system of education, while Dewey promotes democratic participation and problem-solving."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would be the most effective way to evaluate the educational contributions of Paulo Freire in today's context?",
      "options": [
        "By examining the extent to which his ideas on empowerment and dialogue have been applied in modern pedagogy.",
        "By focusing on his advocacy for memorization and exam-based learning.",
        "By assessing his contributions in terms of increasing standardized test scores.",
        "By evaluating his ideas based solely on their alignment with traditional educational practices."
      ],
      "correctAnswer": "By examining the extent to which his ideas on empowerment and dialogue have been applied in modern pedagogy."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could you synthesize the ideas of existentialism and pragmatism to develop a new teaching method?",
      "options": [
        "By combining student-centered inquiry with the freedom to explore personal meaning while addressing real-world challenges.",
        "By focusing only on memorization and avoiding personal student expression.",
        "By emphasizing the importance of strict teacher-led instruction and passive learning.",
        "By promoting conformity and limiting creative thinking in the classroom."
      ],
      "correctAnswer": "By combining student-centered inquiry with the freedom to explore personal meaning while addressing real-world challenges."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Philosophers and Philosophy in Education",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Design an educational program that incorporates the ideas of both John Dewey and Paulo Freire.",
      "options": [
        "A program that emphasizes experiential learning, problem-solving, and social justice through critical dialogue.",
        "A program that focuses on rote memorization and preparing students for standardized tests.",
        "A program that limits student participation and emphasizes teacher-centered instruction.",
        "A program that excludes discussions on societal issues and focuses only on academic content."
      ],
      "correctAnswer": "A program that emphasizes experiential learning, problem-solving, and social justice through critical dialogue."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is essential in developing a standardized test?",
      "options": [
        "Test items that are based on the teacher's subjective opinion.",
        "A consistent scoring method applied to all test-takers.",
        "Incorporating both easy and difficult questions to ensure fairness.",
        "Allowing test-takers to choose their own answers."
      ],
      "correctAnswer": "A consistent scoring method applied to all test-takers."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of a test blueprint in test construction?",
      "options": [
        "To organize the test content and structure.",
        "To determine the difficulty level of the questions.",
        "To select the grading scale for each test item.",
        "To decide the time allotted for each section of the test."
      ],
      "correctAnswer": "To organize the test content and structure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which test format is most appropriate for assessing factual knowledge?",
      "options": [
        "Essay questions",
        "Multiple-choice questions",
        "Open-ended questions",
        "Project-based assessments"
      ],
      "correctAnswer": "Multiple-choice questions"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to use a variety of question types in a test?",
      "options": [
        "To make the test more difficult for students.",
        "To assess different levels of cognitive ability and learning.",
        "To ensure that students memorize all the content.",
        "To speed up the grading process."
      ],
      "correctAnswer": "To assess different levels of cognitive ability and learning."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does 'face validity' refer to in the context of a test?",
      "options": [
        "The test's ability to predict future performance.",
        "The extent to which the test appears to measure what it is supposed to measure.",
        "The statistical reliability of the test over multiple administrations.",
        "The fairness of the test across different groups of students."
      ],
      "correctAnswer": "The extent to which the test appears to measure what it is supposed to measure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is test reliability crucial for ensuring accurate student assessment?",
      "options": [
        "It guarantees that all students will achieve similar results.",
        "It ensures the consistency of the results when the test is repeated.",
        "It provides the opportunity for subjective grading.",
        "It allows the teacher to select questions based on their preference."
      ],
      "correctAnswer": "It ensures the consistency of the results when the test is repeated."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher avoid bias when constructing a test?",
      "options": [
        "By ensuring all questions are written in a neutral, objective manner.",
        "By making all questions easy for the students to answer.",
        "By choosing questions that align with personal teaching preferences.",
        "By focusing on subjective assessments of student abilities."
      ],
      "correctAnswer": "By ensuring all questions are written in a neutral, objective manner."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "If a teacher notices that students are performing poorly on a specific section of a test, what should be the teacher's first step?",
      "options": [
        "Increase the difficulty level of the test.",
        "Review the section for clarity and alignment with learning objectives.",
        "Blame the students for not studying enough.",
        "Grade that section more leniently."
      ],
      "correctAnswer": "Review the section for clarity and alignment with learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following strategies can a teacher use to ensure test fairness across different student groups?",
      "options": [
        "Design a uniform test that does not vary in difficulty across sections.",
        "Allow students to choose which section of the test they want to take.",
        "Incorporate questions based solely on classroom lectures.",
        "Increase the overall difficulty for stronger students."
      ],
      "correctAnswer": "Design a uniform test that does not vary in difficulty across sections."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher ensure that multiple-choice questions test higher-order thinking?",
      "options": [
        "By making all the questions easy to answer.",
        "By focusing the questions on recall of facts and definitions.",
        "By incorporating questions that require analysis, application, or evaluation.",
        "By providing more options for each question."
      ],
      "correctAnswer": "By incorporating questions that require analysis, application, or evaluation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a sign that a test has good construct validity?",
      "options": [
        "It includes questions on a wide variety of topics.",
        "The questions are directly aligned with the learning objectives.",
        "The test format is consistent with previous tests.",
        "It includes a high percentage of multiple-choice questions."
      ],
      "correctAnswer": "The questions are directly aligned with the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "When analyzing a test's reliability, which of the following data should be examined?",
      "options": [
        "The consistency of students' performance over time.",
        "The total number of questions in the test.",
        "The format of the test questions.",
        "The personal biases of the test designer."
      ],
      "correctAnswer": "The consistency of students' performance over time."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the effectiveness of a test that focuses primarily on recall-based questions?",
      "options": [
        "By determining if students can memorize facts effectively.",
        "By assessing whether it measures higher-order cognitive skills.",
        "By comparing students' recall scores with their grades.",
        "By asking students if they enjoyed taking the test."
      ],
      "correctAnswer": "By assessing whether it measures higher-order cognitive skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "If a teacher needs to redesign a test to assess problem-solving skills, what should be the main change?",
      "options": [
        "Incorporating more multiple-choice questions.",
        "Using more open-ended, application-based questions.",
        "Increasing the length of the test.",
        "Focusing on memorization of facts and definitions."
      ],
      "correctAnswer": "Using more open-ended, application-based questions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design a new test to measure critical thinking and analytical abilities?",
      "options": [
        "By using short-answer questions that require deep analysis of scenarios.",
        "By focusing on true/false questions for simplicity.",
        "By including a wide range of factual recall questions.",
        "By incorporating only multiple-choice questions."
      ],
      "correctAnswer": "By using short-answer questions that require deep analysis of scenarios."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is the most important aspect when constructing a multiple-choice question?",
      "options": [
        "Using obscure language to challenge students.",
        "Ensuring the question has only one correct answer.",
        "Including as many choices as possible.",
        "Making the questions as long as possible to test depth."
      ],
      "correctAnswer": "Ensuring the question has only one correct answer."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of a distractor in multiple-choice questions?",
      "options": [
        "To provide a misleading answer that tests understanding.",
        "To make the question appear more difficult.",
        "To test the memory recall of students.",
        "To provide a second correct answer."
      ],
      "correctAnswer": "To provide a misleading answer that tests understanding."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of 'item analysis' in test construction?",
      "options": [
        "To determine how many questions were missed by students.",
        "To evaluate the effectiveness of each test item in distinguishing between different levels of performance.",
        "To check the overall quality of the test format.",
        "To assess the difficulty of the test."
      ],
      "correctAnswer": "To evaluate the effectiveness of each test item in distinguishing between different levels of performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to vary the difficulty of questions in a test?",
      "options": [
        "To ensure that all students have a chance to perform well.",
        "To make the test challenging for all students.",
        "To assess students across a range of abilities and knowledge.",
        "To provide a fair testing environment for all students."
      ],
      "correctAnswer": "To assess students across a range of abilities and knowledge."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most effective way to test students' application of knowledge?",
      "options": [
        "By asking factual recall questions.",
        "By using case studies or real-world scenarios that require students to apply their knowledge.",
        "By providing multiple-choice questions with several possible answers.",
        "By including multiple-choice questions that test memorization."
      ],
      "correctAnswer": "By using case studies or real-world scenarios that require students to apply their knowledge."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to avoid using 'trick' questions in a test?",
      "options": [
        "It makes the test harder, which helps in grading.",
        "It can confuse students and distort their true understanding of the material.",
        "It makes the test more challenging for students.",
        "It allows teachers to test critical thinking skills."
      ],
      "correctAnswer": "It can confuse students and distort their true understanding of the material."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "If a teacher wants to assess problem-solving skills, which of the following is the most appropriate question type?",
      "options": [
        "Multiple-choice questions with one correct answer.",
        "Essay questions that ask students to explain a solution to a complex problem.",
        "True/false questions about basic facts.",
        "Matching questions that test definitions."
      ],
      "correctAnswer": "Essay questions that ask students to explain a solution to a complex problem."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher use a scoring rubric effectively when grading essays?",
      "options": [
        "By offering bonus points for creativity.",
        "By assessing different levels of performance using specific, clear criteria.",
        "By focusing solely on grammar and spelling.",
        "By grading based on the student's writing style."
      ],
      "correctAnswer": "By assessing different levels of performance using specific, clear criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should a teacher do to ensure fairness when administering a test to a diverse group of students?",
      "options": [
        "Use only multiple-choice questions.",
        "Include a wide range of question types that cater to different learning styles.",
        "Grade all students the same way, regardless of difficulty level.",
        "Make the test longer for students who struggle with the material."
      ],
      "correctAnswer": "Include a wide range of question types that cater to different learning styles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can you identify if a test is biased towards a particular group of students?",
      "options": [
        "By comparing the average scores of different student groups.",
        "By ensuring that the test is not too difficult for any group of students.",
        "By making sure the questions focus on a specific cultural background.",
        "By evaluating if the content disproportionately favors one group over others."
      ],
      "correctAnswer": "By evaluating if the content disproportionately favors one group over others."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "When evaluating a test's validity, which of the following should be considered?",
      "options": [
        "The students' average test scores.",
        "The alignment of the test content with the learning objectives.",
        "The personal preferences of the teacher.",
        "The total number of test questions."
      ],
      "correctAnswer": "The alignment of the test content with the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most important factor when evaluating the effectiveness of a test?",
      "options": [
        "The test's ability to measure students' ability to recall facts.",
        "The fairness and accuracy with which the test evaluates the learning objectives.",
        "The total number of questions in the test.",
        "The time limit set for each question."
      ],
      "correctAnswer": "The fairness and accuracy with which the test evaluates the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design a test to assess both recall and higher-order thinking skills?",
      "options": [
        "By using only multiple-choice questions to test facts.",
        "By including both factual recall questions and application-based questions that require analysis.",
        "By writing long essays that test memory recall only.",
        "By using true/false questions to test basic knowledge."
      ],
      "correctAnswer": "By including both factual recall questions and application-based questions that require analysis."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can you create a test that accurately reflects the depth and breadth of a course's material?",
      "options": [
        "By including as many questions as possible.",
        "By using questions that cover all topics taught during the course.",
        "By focusing only on the most recent lectures.",
        "By designing the test based on the teacher's opinion of the material."
      ],
      "correctAnswer": "By using questions that cover all topics taught during the course."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main purpose of using rubrics in test construction?",
      "options": [
        "To grade tests faster.",
        "To provide a clear and consistent evaluation criteria for students' work.",
        "To make subjective decisions easier for the teacher.",
        "To ensure that students memorize all test content."
      ],
      "correctAnswer": "To provide a clear and consistent evaluation criteria for students' work."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes a formative assessment?",
      "options": [
        "An assessment conducted at the end of a unit to determine students' final grade.",
        "An assessment used throughout the learning process to monitor and support student progress.",
        "An assessment that tests the recall of facts and definitions.",
        "An assessment used only in standardized testing environments."
      ],
      "correctAnswer": "An assessment used throughout the learning process to monitor and support student progress."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is the most important characteristic of a reliable test?",
      "options": [
        "It measures only a student's ability to memorize information.",
        "It provides consistent results over multiple administrations.",
        "It focuses only on the teacher's preferences.",
        "It includes a large number of easy questions."
      ],
      "correctAnswer": "It provides consistent results over multiple administrations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why should a teacher avoid biased language in test questions?",
      "options": [
        "To prevent confusion among students from diverse backgrounds.",
        "To ensure the test is more difficult for all students.",
        "To make the test more challenging.",
        "To encourage students to memorize the material."
      ],
      "correctAnswer": "To prevent confusion among students from diverse backgrounds."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does 'criterion-related validity' refer to in test construction?",
      "options": [
        "The alignment of test content with the learning objectives.",
        "The ability of a test to predict future performance or outcomes.",
        "The accuracy of the test in measuring what it is intended to measure.",
        "The test's ability to distinguish between different student levels."
      ],
      "correctAnswer": "The ability of a test to predict future performance or outcomes."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the significance of including a mix of question types in a test?",
      "options": [
        "To ensure that all students will find some questions easy.",
        "To provide a fair opportunity for students with different learning styles.",
        "To make the test as difficult as possible.",
        "To focus solely on factual recall."
      ],
      "correctAnswer": "To provide a fair opportunity for students with different learning styles."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher assess students' critical thinking skills in a test?",
      "options": [
        "By asking students to memorize and recall facts.",
        "By using questions that require students to analyze, evaluate, and create arguments or solutions.",
        "By asking true/false questions about basic facts.",
        "By focusing on questions that only test recall."
      ],
      "correctAnswer": "By using questions that require students to analyze, evaluate, and create arguments or solutions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which strategy would be effective in ensuring a fair assessment for students with diverse needs?",
      "options": [
        "Only providing multiple-choice questions.",
        "Including a range of question types that cater to different learning preferences.",
        "Providing the same test for all students without modifications.",
        "Increasing the difficulty of the test for stronger students."
      ],
      "correctAnswer": "Including a range of question types that cater to different learning preferences."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can you ensure a test assesses both basic knowledge and higher-order thinking skills?",
      "options": [
        "By including both recall-based questions and problem-solving or analysis questions.",
        "By focusing only on factual recall questions.",
        "By including multiple-choice questions only.",
        "By designing essay questions on basic content only."
      ],
      "correctAnswer": "By including both recall-based questions and problem-solving or analysis questions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "When analyzing a test's reliability, which aspect should be considered?",
      "options": [
        "How well the test measures long-term retention of information.",
        "The consistency of test results across different groups of students.",
        "The accuracy of the teacher's grading system.",
        "The number of difficult questions in the test."
      ],
      "correctAnswer": "The consistency of test results across different groups of students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of a test item with high construct validity?",
      "options": [
        "A multiple-choice question that closely aligns with the learning objectives.",
        "A question that is based on the teacher's personal preferences.",
        "A question that has only one correct answer.",
        "A question that tests memorization of facts."
      ],
      "correctAnswer": "A multiple-choice question that closely aligns with the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What would indicate that a test lacks face validity?",
      "options": [
        "The students are confused about how the test relates to what they were taught.",
        "The test closely matches the learning objectives.",
        "The students understand the purpose of each question.",
        "The test uses clear, objective language."
      ],
      "correctAnswer": "The students are confused about how the test relates to what they were taught."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you redesign a test to better assess students' analytical thinking skills?",
      "options": [
        "By including multiple-choice questions with straightforward facts.",
        "By incorporating more open-ended questions that require students to analyze and solve problems.",
        "By adding more true/false questions.",
        "By focusing only on recall-based questions."
      ],
      "correctAnswer": "By incorporating more open-ended questions that require students to analyze and solve problems."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the best approach when creating a test for a course with diverse content?",
      "options": [
        "Designing the test to cover a broad range of topics with equal weight.",
        "Focusing the test on the most recent lecture material.",
        "Limiting the test to only the most important topics.",
        "Excluding difficult topics to make the test easier."
      ],
      "correctAnswer": "Designing the test to cover a broad range of topics with equal weight."
    }
  ,
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of using a Likert scale in a test?",
      "options": [
        "To assess students' attitudes, opinions, or perceptions.",
        "To measure the recall of factual information.",
        "To assess critical thinking skills.",
        "To evaluate problem-solving abilities."
      ],
      "correctAnswer": "To assess students' attitudes, opinions, or perceptions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key characteristic of a well-constructed true/false question?",
      "options": [
        "The statement should be overly complex to test deep understanding.",
        "The statement should be clear, simple, and unambiguous.",
        "The statement should require the student to recall specific facts.",
        "The statement should encourage critical analysis of a situation."
      ],
      "correctAnswer": "The statement should be clear, simple, and unambiguous."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes 'construct validity' in a test?",
      "options": [
        "The test measures what it intends to measure.",
        "The test has consistent results across different student populations.",
        "The test is easy to understand and answer.",
        "The test reflects students' overall knowledge and performance."
      ],
      "correctAnswer": "The test measures what it intends to measure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of a 'norm-referenced' test?",
      "options": [
        "To compare a student's performance with a specific group of students.",
        "To assess students' ability to apply knowledge in real-world situations.",
        "To evaluate a student's recall of factual information.",
        "To measure a student's ability to work collaboratively."
      ],
      "correctAnswer": "To compare a student's performance with a specific group of students."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be considered when writing an effective multiple-choice question?",
      "options": [
        "The stem should be clear and free of unnecessary information.",
        "The choices should all be equally plausible to ensure difficulty.",
        "The correct answer should always be placed in the first position.",
        "The distractors should be overly complex to challenge students."
      ],
      "correctAnswer": "The stem should be clear and free of unnecessary information."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the best way to balance difficulty and fairness in a test?",
      "options": [
        "By using a variety of question types to assess different skills.",
        "By ensuring the test is long enough to cover all topics.",
        "By increasing the difficulty level for stronger students.",
        "By including only easy questions to ensure high scores."
      ],
      "correctAnswer": "By using a variety of question types to assess different skills."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher assess students' problem-solving ability effectively?",
      "options": [
        "By asking multiple-choice questions that have one correct answer.",
        "By including case studies or scenario-based questions that require students to apply concepts.",
        "By asking students to memorize facts and recall them on the test.",
        "By using only short-answer questions."
      ],
      "correctAnswer": "By including case studies or scenario-based questions that require students to apply concepts."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is an example of an application-based test item?",
      "options": [
        "A multiple-choice question asking about the dates of historical events.",
        "An essay question asking students to apply a concept to a real-world situation.",
        "A true/false question about a mathematical formula.",
        "A matching question about definitions of terms."
      ],
      "correctAnswer": "An essay question asking students to apply a concept to a real-world situation."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher assess students' ability to analyze a complex topic?",
      "options": [
        "By asking students to write an essay that critically evaluates different perspectives.",
        "By asking multiple-choice questions that test recall.",
        "By giving short-answer questions with yes or no answers.",
        "By asking fill-in-the-blank questions."
      ],
      "correctAnswer": "By asking students to write an essay that critically evaluates different perspectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "What method can a teacher use to assess the reliability of a test?",
      "options": [
        "By analyzing how consistent the results are across different test administrations.",
        "By asking students to write reflective essays about the test.",
        "By ensuring the test covers a wide range of topics.",
        "By using true/false questions in the test."
      ],
      "correctAnswer": "By analyzing how consistent the results are across different test administrations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher analyze the effectiveness of a multiple-choice test item?",
      "options": [
        "By reviewing how often students chose the correct answer and whether distractors were plausible.",
        "By checking how many students failed to answer the question.",
        "By ensuring the question is difficult for all students.",
        "By focusing only on the length of the question."
      ],
      "correctAnswer": "By reviewing how often students chose the correct answer and whether distractors were plausible."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following indicates a test lacks criterion-related validity?",
      "options": [
        "The test does not accurately predict students' future performance in similar tasks.",
        "The test aligns with the learning objectives and content.",
        "The test is consistent across different test administrations.",
        "The test has a variety of question types."
      ],
      "correctAnswer": "The test does not accurately predict students' future performance in similar tasks."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you design a test that measures both recall and analysis?",
      "options": [
        "By using a mix of multiple-choice questions and essay questions that require analysis.",
        "By including only multiple-choice questions on the test.",
        "By providing a long essay with no multiple-choice questions.",
        "By limiting the test to true/false questions."
      ],
      "correctAnswer": "By using a mix of multiple-choice questions and essay questions that require analysis."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Creation",
      "ytlink": "To follow",
  "qid": "",
      "question": "What approach would you take to create a test for a course with varying levels of difficulty?",
      "options": [
        "Designing a test that challenges all students equally, regardless of their ability.",
        "Including a range of questions that address both basic and advanced topics.",
        "Focusing on easy questions for all students to ensure high scores.",
        "Designing a test with only advanced questions to challenge the best students."
      ],
      "correctAnswer": "Including a range of questions that address both basic and advanced topics."
    }
  ,
  
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of test construction?",
      "options": [
        "To assess the effectiveness of teaching methods.",
        "To evaluate students' understanding and abilities.",
        "To determine the best learning strategies for students.",
        "To provide feedback on the curriculum design."
      ],
      "correctAnswer": "To evaluate students' understanding and abilities."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a key principle in constructing valid tests?",
      "options": [
        "Consistency in formatting.",
        "Clarity in instructions.",
        "A balance between ease and difficulty.",
        "Ensuring test items align with learning objectives."
      ],
      "correctAnswer": "Ensuring test items align with learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Knowledge",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main function of a rubric in test construction?",
      "options": [
        "To assign grades to students.",
        "To evaluate the clarity of test instructions.",
        "To guide the creation of fair and consistent grading criteria.",
        "To determine the difficulty level of test questions."
      ],
      "correctAnswer": "To guide the creation of fair and consistent grading criteria."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to consider content validity when constructing a test?",
      "options": [
        "It ensures the test is easy to understand.",
        "It guarantees the test has sufficient difficulty.",
        "It ensures the test accurately measures the learning objectives.",
        "It helps in determining how long the test should be."
      ],
      "correctAnswer": "It ensures the test accurately measures the learning objectives."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does reliability impact the effectiveness of a test?",
      "options": [
        "It measures the overall clarity of the test.",
        "It determines how consistent the test results are across different administrations.",
        "It ensures the test covers a broad range of topics.",
        "It establishes the level of difficulty of the test questions."
      ],
      "correctAnswer": "It determines how consistent the test results are across different administrations."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of a pilot test in the test construction process?",
      "options": [
        "To collect data on students' grades.",
        "To test the clarity and effectiveness of the questions.",
        "To determine the best format for the test.",
        "To assess the knowledge of students before the test."
      ],
      "correctAnswer": "To test the clarity and effectiveness of the questions."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Understanding",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes 'construct validity' in test construction?",
      "options": [
        "The degree to which the test measures the content it is supposed to measure.",
        "The degree to which the test is free from errors or biases.",
        "The degree to which the test measures students' intellectual ability.",
        "The degree to which the test matches other similar tests."
      ],
      "correctAnswer": "The degree to which the test measures the content it is supposed to measure."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "If a teacher is designing a multiple-choice question, which of the following should be avoided to ensure fairness?",
      "options": [
        "Having all distractors be equally plausible.",
        "Including one distractor that is obviously incorrect.",
        "Making the correct answer too obvious in the question wording.",
        "Using very long questions that confuse the students."
      ],
      "correctAnswer": "Making the correct answer too obvious in the question wording."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "When constructing a true/false question, how should a teacher ensure clarity?",
      "options": [
        "By making both statements in the question somewhat true.",
        "By avoiding negative terms such as 'not' or 'never'.",
        "By providing complex scenarios in the question stem.",
        "By asking for explanations in the answer choices."
      ],
      "correctAnswer": "By avoiding negative terms such as 'not' or 'never'."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Application",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher design a rubric to ensure consistency when grading essays?",
      "options": [
        "By making the rubric flexible and subjective.",
        "By clearly defining criteria and rating scales for different levels of performance.",
        "By writing brief and vague descriptions of expectations.",
        "By giving students a chance to rewrite their essays before grading."
      ],
      "correctAnswer": "By clearly defining criteria and rating scales for different levels of performance."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an indicator of poor test reliability?",
      "options": [
        "A high correlation between scores from two different forms of the test.",
        "Inconsistent results when the same group of students takes the test multiple times.",
        "Test items that cover all important areas of the subject matter.",
        "A clear alignment between the test and the learning objectives."
      ],
      "correctAnswer": "Inconsistent results when the same group of students takes the test multiple times."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Analysis",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following would best help in analyzing the fairness of a test?",
      "options": [
        "Examining how many students pass the test.",
        "Reviewing whether the test items are culturally biased.",
        "Determining the total score distribution.",
        "Looking at how long it takes to complete the test."
      ],
      "correctAnswer": "Reviewing whether the test items are culturally biased."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Evaluation",
      "ytlink": "To follow",
  "qid": "",
      "question": "How would you evaluate the effectiveness of a test used to assess critical thinking skills?",
      "options": [
        "By determining how many students passed the test.",
        "By comparing the test results with other types of assessments.",
        "By evaluating how many questions were answered correctly.",
        "By assessing if the test is difficult for all students."
      ],
      "correctAnswer": "By comparing the test results with other types of assessments."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "Test Construction",
      "difficulty": "Difficult",
      "bloomstaxonomy": "Synthesis",
      "ytlink": "To follow",
  "qid": "",
      "question": "How could you design a new test format to assess higher-order thinking skills?",
      "options": [
        "By incorporating multiple-choice questions with a focus on recall.",
        "By using essay questions that require students to analyze and synthesize information.",
        "By creating true/false questions to test basic facts.",
        "By using fill-in-the-blank questions with simple facts."
      ],
      "correctAnswer": "By using essay questions that require students to analyze and synthesize information."
    }
  ,
    
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which theory suggests that learners build new knowledge upon the foundation of previous learning?",
      "options": ["Behaviorism", "Constructivism", "Cognitivism", "Connectivism"],
      "correctAnswer": "Constructivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is known for the theory of multiple intelligences?",
      "options": ["Jean Piaget", "Howard Gardner", "Lev Vygotsky", "John Dewey"],
      "correctAnswer": "Howard Gardner"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Vygotsky, what is the term for the difference between what a learner can do without help and what they can do with guidance?",
      "options": ["Operant conditioning", "Zone of Proximal Development", "Scaffolding", "Schema"],
      "correctAnswer": "Zone of Proximal Development"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which learning theory emphasizes the role of reinforcement and punishment in learning?",
      "options": ["Constructivism", "Behaviorism", "Humanism", "Cognitivism"],
      "correctAnswer": "Behaviorism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who developed the stages of cognitive development theory?",
      "options": ["Sigmund Freud", "Erik Erikson", "Jean Piaget", "B.F. Skinner"],
      "correctAnswer": "Jean Piaget"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key element of Bandura's Social Learning Theory?",
      "options": ["Classical conditioning", "Observational learning", "Reinforcement schedules", "Information processing"],
      "correctAnswer": "Observational learning"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which approach in educational psychology focuses on self-actualization and fulfilling individual potential?",
      "options": ["Behaviorism", "Cognitivism", "Humanism", "Constructivism"],
      "correctAnswer": "Humanism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the term for a mental framework that helps organize and interpret information?",
      "options": ["Schema", "Zone of Proximal Development", "Scaffolding", "Cognitive map"],
      "correctAnswer": "Schema"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In which theory is learning seen as an active, constructive process where the learner is an active participant?",
      "options": ["Behaviorism", "Constructivism", "Humanism", "Cognitivism"],
      "correctAnswer": "Constructivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary focus of educational psychology?",
      "options": ["Cognitive development", "Student behavior in learning environments", "History of education", "Physical education"],
      "correctAnswer": "Student behavior in learning environments"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which theory suggests that learners build new knowledge upon the foundation of previous learning?",
      "options": ["Behaviorism", "Constructivism", "Cognitivism", "Connectivism"],
      "correctAnswer": "Constructivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is known for the theory of multiple intelligences?",
      "options": ["Jean Piaget", "Howard Gardner", "Lev Vygotsky", "John Dewey"],
      "correctAnswer": "Howard Gardner"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Vygotsky, what is the term for the difference between what a learner can do without help and what they can do with guidance?",
      "options": ["Operant conditioning", "Zone of Proximal Development", "Scaffolding", "Schema"],
      "correctAnswer": "Zone of Proximal Development"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which learning theory emphasizes the role of reinforcement and punishment in learning?",
      "options": ["Constructivism", "Behaviorism", "Humanism", "Cognitivism"],
      "correctAnswer": "Behaviorism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who developed the stages of cognitive development theory?",
      "options": ["Sigmund Freud", "Erik Erikson", "Jean Piaget", "B.F. Skinner"],
      "correctAnswer": "Jean Piaget"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key element of Bandura's Social Learning Theory?",
      "options": ["Classical conditioning", "Observational learning", "Reinforcement schedules", "Information processing"],
      "correctAnswer": "Observational learning"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which approach in educational psychology focuses on self-actualization and fulfilling individual potential?",
      "options": ["Behaviorism", "Cognitivism", "Humanism", "Constructivism"],
      "correctAnswer": "Humanism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the term for a mental framework that helps organize and interpret information?",
      "options": ["Schema", "Zone of Proximal Development", "Scaffolding", "Cognitive map"],
      "correctAnswer": "Schema"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In which theory is learning seen as an active, constructive process where the learner is an active participant?",
      "options": ["Behaviorism", "Constructivism", "Humanism", "Cognitivism"],
      "correctAnswer": "Constructivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher observes that students from different cultural backgrounds have varied beliefs about group work. Which principle helps the teacher understand these differing perspectives without bias?",
      "options": ["Ethnocentrism", "Cultural Relativism", "Universalism", "Individualism"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a discussion, a student argues that certain cultural practices cannot be judged by the standards of another culture. Which concept does this argument align with?",
      "options": ["Ethnocentrism", "Cultural Relativism", "Moral absolutism", "Globalization"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A researcher studying family structures in various cultures avoids making value judgments about them. Which anthropological approach is the researcher using?",
      "options": ["Ethnocentrism", "Cultural Relativism", "Social Darwinism", "Moral absolutism"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "When teaching about global traditions, a teacher emphasizes that no culture’s practices should be considered superior or inferior. This teaching approach is an example of which concept?",
      "options": ["Ethnocentrism", "Cultural Relativism", "Moral absolutism", "Cultural assimilation"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student questions a cultural practice they find strange and seeks to understand it from that culture's perspective. Which principle best supports this approach?",
      "options": ["Cultural assimilation", "Cultural Relativism", "Ethnocentrism", "Moral universalism"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A museum curator presents artifacts with descriptions that explain their significance within the original culture without comparing them to modern practices. What concept is this an example of?",
      "options": ["Cultural diffusion", "Cultural Relativism", "Ethnocentrism", "Moral relativism"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a history class, a student states that it’s important to study historical events through the lens of the time and culture in which they occurred. This viewpoint aligns with which concept?",
      "options": ["Moral absolutism", "Cultural Relativism", "Ethnocentrism", "Historical determinism"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A professor teaches that understanding different cultural practices requires acknowledging that each culture’s moral code is valid within its own context. This approach is an example of what?",
      "options": ["Ethnocentrism", "Moral absolutism", "Cultural Relativism", "Cultural assimilation"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "An anthropologist avoids imposing their own cultural norms while researching rituals in a remote community. This practice illustrates which key principle?",
      "options": ["Cultural assimilation", "Cultural Relativism", "Ethnocentrism", "Moral universalism"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher explains that certain cultural norms, like eating practices, should be understood based on that culture's beliefs and values. Which concept does this teaching embody?",
      "options": ["Ethnocentrism", "Cultural Relativism", "Moral absolutism", "Cultural integration"],
      "correctAnswer": "Cultural Relativism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher encourages students to engage in hands-on projects and collaborative group activities to learn through experience. Which educational philosophy does this approach align with?",
      "options": ["Traditionalism", "Progressivism", "Essentialism", "Perennialism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "During a lesson, a teacher acts as a facilitator rather than an authoritative figure, guiding students as they explore and discover solutions. Which educational philosophy is demonstrated here?",
      "options": ["Essentialism", "Perennialism", "Progressivism", "Behaviorism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A school implements a curriculum focused on real-world problem-solving and critical thinking skills, emphasizing student interests and needs. What educational approach does this reflect?",
      "options": ["Traditionalism", "Progressivism", "Constructivism", "Essentialism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A classroom emphasizes democratic participation, where students have a voice in their learning and collaborate on decision-making. Which philosophy does this practice support?",
      "options": ["Progressivism", "Essentialism", "Behaviorism", "Perennialism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher designs lessons that encourage students to question ideas and reflect on their experiences to make meaningful connections. Which educational philosophy is being applied?",
      "options": ["Perennialism", "Essentialism", "Progressivism", "Constructivism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In an elementary school, the focus is on teaching students how to learn by doing and adapting to new information rather than memorizing facts. This educational approach is an example of what?",
      "options": ["Traditionalism", "Progressivism", "Essentialism", "Cognitivism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A principal implements project-based learning to help students develop problem-solving and teamwork skills. This is an example of which educational philosophy?",
      "options": ["Behaviorism", "Progressivism", "Essentialism", "Constructivism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which educational philosophy supports the idea that education should focus on developing students' problem-solving and critical-thinking abilities through real-life experiences?",
      "options": ["Essentialism", "Progressivism", "Perennialism", "Behaviorism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher incorporates students' interests into lesson plans to make learning more engaging and relevant. This practice is associated with which educational philosophy?",
      "options": ["Traditionalism", "Progressivism", "Essentialism", "Behaviorism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A high school adopts a flexible curriculum that adapts to students’ evolving needs and incorporates feedback from the students themselves. This approach is aligned with which educational philosophy?",
      "options": ["Essentialism", "Progressivism", "Perennialism", "Constructivism"],
      "correctAnswer": "Progressivism"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A Filipino teacher plans a unit test that includes multiple-choice questions, essays, and performance-based tasks to assess students’ understanding and skills. Which assessment type best describes this approach?",
      "options": ["Summative assessment", "Formative assessment", "Diagnostic assessment", "Peer assessment"],
      "correctAnswer": "Summative assessment"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher in the Philippines uses quizzes and short reflections throughout a lesson to gauge students’ understanding and adjust the lesson accordingly. What type of assessment is being used?",
      "options": ["Summative assessment", "Formative assessment", "Diagnostic assessment", "Norm-referenced assessment"],
      "correctAnswer": "Formative assessment"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A school in the Philippines implements a standardized test at the end of the school year to compare student performance across different regions. What type of test is this?",
      "options": ["Criterion-referenced test", "Formative assessment", "Norm-referenced test", "Diagnostic assessment"],
      "correctAnswer": "Norm-referenced test"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A Filipino teacher prepares a multiple-choice exam and ensures that the test items are aligned with the learning competencies outlined in the DepEd curriculum guide. Which principle of test construction is being followed?",
      "options": ["Objectivity", "Reliability", "Validity", "Practicality"],
      "correctAnswer": "Validity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher in the Philippines includes questions of varying difficulty in a test to cater to students with different levels of ability. What characteristic of a good test does this practice enhance?",
      "options": ["Validity", "Discrimination index", "Objectivity", "Reliability"],
      "correctAnswer": "Discrimination index"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "When constructing test items for a math exam, a Filipino teacher ensures that all questions are clear and specific, with only one correct answer for each question. Which principle is being prioritized?",
      "options": ["Fairness", "Objectivity", "Reliability", "Validity"],
      "correctAnswer": "Objectivity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher uses a rubric with clear criteria for assessing student essays in a social studies class. How does this practice improve the assessment process?",
      "options": ["It ensures objectivity and consistency in grading.", "It increases the difficulty level of the assessment.", "It aligns the assessment with standardized tests.", "It shortens the grading time."],
      "correctAnswer": "It ensures objectivity and consistency in grading."
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a classroom in the Philippines, a teacher administers a pre-test before starting a new unit to identify students’ existing knowledge and potential learning gaps. What type of assessment is this?",
      "options": ["Formative assessment", "Summative assessment", "Diagnostic assessment", "Criterion-referenced test"],
      "correctAnswer": "Diagnostic assessment"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A high school teacher in the Philippines creates a test blueprint to ensure that the content of a unit test covers all learning objectives evenly. What test construction principle does this practice support?",
      "options": ["Practicality", "Objectivity", "Content validity", "Discrimination index"],
      "correctAnswer": "Content validity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher observes that students consistently perform well on class activities but not on written tests. What should the teacher consider to ensure a more comprehensive evaluation of student learning?",
      "options": ["Implementing more norm-referenced tests", "Adding alternative assessments like portfolios and projects", "Increasing the number of written tests", "Focusing solely on performance-based assessments"],
      "correctAnswer": "Adding alternative assessments like portfolios and projects"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher asks students to explain the main idea of a story in their own words. Which level of Bloom's Taxonomy does this question align with?",
      "options": ["Remembering", "Understanding", "Applying", "Analyzing"],
      "correctAnswer": "Understanding"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A Filipino teacher assigns a project where students create a presentation showing how different habitats affect animal behavior. Which level of Bloom's Taxonomy does this activity represent?",
      "options": ["Applying", "Analyzing", "Creating", "Evaluating"],
      "correctAnswer": "Creating"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher gives students a scenario and asks them to predict the outcome based on their knowledge. Which level of Bloom's Taxonomy does this task illustrate?",
      "options": ["Remembering", "Understanding", "Applying", "Analyzing"],
      "correctAnswer": "Applying"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Students are asked to critique the effectiveness of two different teaching strategies. What level of Bloom’s Taxonomy is this activity?",
      "options": ["Analyzing", "Evaluating", "Creating", "Understanding"],
      "correctAnswer": "Evaluating"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher asks students to compare and contrast the themes of two novels. Which level of Bloom’s Taxonomy is demonstrated here?",
      "options": ["Remembering", "Understanding", "Analyzing", "Applying"],
      "correctAnswer": "Analyzing"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A Filipino student is tasked with listing the main events in a historical timeline. What level of Bloom's Taxonomy does this activity fall under?",
      "options": ["Remembering", "Applying", "Analyzing", "Evaluating"],
      "correctAnswer": "Remembering"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher asks students to design an experiment to test a scientific hypothesis. Which level of Bloom's Taxonomy does this task correspond to?",
      "options": ["Applying", "Creating", "Evaluating", "Analyzing"],
      "correctAnswer": "Creating"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A class discussion prompts students to interpret the moral lessons of a folk tale and relate them to real-life situations. This activity aligns with which level of Bloom's Taxonomy?",
      "options": ["Understanding", "Applying", "Analyzing", "Evaluating"],
      "correctAnswer": "Applying"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "During a lesson, students are asked to identify facts and recall definitions. Which level of Bloom’s Taxonomy is involved?",
      "options": ["Remembering", "Understanding", "Applying", "Analyzing"],
      "correctAnswer": "Remembering"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student writes a persuasive essay where they argue for or against a particular policy, using evidence and reasoning. This task represents which level of Bloom's Taxonomy?",
      "options": ["Understanding", "Evaluating", "Analyzing", "Creating"],
      "correctAnswer": "Evaluating"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Piaget, at what stage do children begin to think logically about concrete events but still struggle with abstract concepts?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Concrete operational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher observes that a student can now solve logical problems involving conservation of volume and number. This ability aligns with which stage in Piaget’s theory?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Concrete operational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "During which stage of Piaget’s theory do children develop object permanence?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Sensorimotor stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In which of Piaget’s stages do children typically start engaging in pretend play and begin using language, yet still struggle with understanding others' perspectives?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Preoperational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "At what stage of Piaget’s theory can individuals think abstractly, reason logically, and use deductive reasoning?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Formal operational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher notices that a student believes a tall, narrow glass has more water than a short, wide one, even though they contain the same amount. This observation is typical of which Piagetian stage?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Preoperational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which concept in Piaget's theory involves understanding that objects continue to exist even when they cannot be seen?",
      "options": ["Centration", "Conservation", "Object permanence", "Egocentrism"],
      "correctAnswer": "Object permanence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What cognitive limitation involves a child focusing on one aspect of a situation while ignoring others, commonly seen in Piaget’s preoperational stage?",
      "options": ["Egocentrism", "Centration", "Conservation", "Reversibility"],
      "correctAnswer": "Centration"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which Piagetian stage is characterized by the development of logical thought but limited to tangible, concrete information?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Concrete operational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "During which stage of cognitive development do children begin to understand the concept of conservation (e.g., the quantity of liquid remains the same regardless of the shape of its container)?",
      "options": ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
      "correctAnswer": "Concrete operational stage"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student excels in music class and can easily identify melodies, rhythms, and harmonies. According to Gardner's theory, which type of intelligence does this student demonstrate?",
      "options": ["Linguistic intelligence", "Musical intelligence", "Logical-mathematical intelligence", "Bodily-kinesthetic intelligence"],
      "correctAnswer": "Musical intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher notices a student is highly skilled at understanding and interacting with peers, showing empathy and effective communication. Which type of intelligence best describes this student?",
      "options": ["Intrapersonal intelligence", "Interpersonal intelligence", "Linguistic intelligence", "Naturalist intelligence"],
      "correctAnswer": "Interpersonal intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student enjoys solving puzzles, analyzing problems, and working with numbers. Which intelligence type aligns with these characteristics?",
      "options": ["Logical-mathematical intelligence", "Spatial intelligence", "Bodily-kinesthetic intelligence", "Musical intelligence"],
      "correctAnswer": "Logical-mathematical intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A child prefers drawing and working with colors and shapes, showing a strong sense of visual representation. Which intelligence does this child likely possess?",
      "options": ["Linguistic intelligence", "Spatial intelligence", "Logical-mathematical intelligence", "Musical intelligence"],
      "correctAnswer": "Spatial intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student is particularly skilled at sports and enjoys expressing themselves through dance and physical activity. What type of intelligence does this reflect?",
      "options": ["Bodily-kinesthetic intelligence", "Interpersonal intelligence", "Naturalist intelligence", "Linguistic intelligence"],
      "correctAnswer": "Bodily-kinesthetic intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student who loves reading, writing stories, and engaging in word games is likely to exhibit which type of intelligence?",
      "options": ["Musical intelligence", "Logical-mathematical intelligence", "Linguistic intelligence", "Spatial intelligence"],
      "correctAnswer": "Linguistic intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which type of intelligence involves the ability to understand oneself, including one's own emotions and motivations?",
      "options": ["Interpersonal intelligence", "Intrapersonal intelligence", "Logical-mathematical intelligence", "Spatial intelligence"],
      "correctAnswer": "Intrapersonal intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher observes that a student has a natural ability to connect with nature, enjoy outdoor activities, and identify various plant and animal species. What type of intelligence does this indicate?",
      "options": ["Logical-mathematical intelligence", "Naturalist intelligence", "Interpersonal intelligence", "Linguistic intelligence"],
      "correctAnswer": "Naturalist intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A student shows an ability to guide group projects, work cooperatively, and mediate conflicts effectively. Which intelligence type best describes these qualities?",
      "options": ["Intrapersonal intelligence", "Musical intelligence", "Interpersonal intelligence", "Spatial intelligence"],
      "correctAnswer": "Interpersonal intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "According to Gardner's theory, which type of intelligence involves the ability to learn new languages and use language to achieve specific goals?",
      "options": ["Musical intelligence", "Linguistic intelligence", "Spatial intelligence", "Logical-mathematical intelligence"],
      "correctAnswer": "Linguistic intelligence"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is known for developing the theory of *Cognitive Development* that outlines how children develop logical thinking in four distinct stages?",
      "options": ["Jean Piaget", "Lev Vygotsky", "John Dewey", "Howard Gardner"],
      "correctAnswer": "Jean Piaget"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which theorist is associated with *Social Constructivism*, emphasizing that learning is a social process and that knowledge is constructed through interaction with others?",
      "options": ["Jean Piaget", "Lev Vygotsky", "B.F. Skinner", "Howard Gardner"],
      "correctAnswer": "Lev Vygotsky"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is recognized for introducing the theory of *Experiential Learning* and promoting the idea that education should be based on real-life experiences?",
      "options": ["John Dewey", "Jean Piaget", "B.F. Skinner", "Maria Montessori"],
      "correctAnswer": "John Dewey"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which psychologist is best known for his theory of *Operant Conditioning*, which emphasizes reinforcement and punishment in learning?",
      "options": ["Jean Piaget", "Lev Vygotsky", "B.F. Skinner", "Albert Bandura"],
      "correctAnswer": "B.F. Skinner"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who developed the *Multiple Intelligences Theory*, suggesting that intelligence is not a single general ability but a variety of specific modalities?",
      "options": ["Howard Gardner", "Jean Piaget", "John Dewey", "Lev Vygotsky"],
      "correctAnswer": "Howard Gardner"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which educator and physician founded an educational method that emphasizes independence, hands-on learning, and self-directed activity?",
      "options": ["Jean Piaget", "Maria Montessori", "John Dewey", "Lev Vygotsky"],
      "correctAnswer": "Maria Montessori"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who introduced the concept of the *Zone of Proximal Development (ZPD)*, which explains the range of tasks a child can perform with the help of a more knowledgeable other?",
      "options": ["Jean Piaget", "Lev Vygotsky", "John Dewey", "B.F. Skinner"],
      "correctAnswer": "Lev Vygotsky"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which theorist proposed the *Stages of Moral Development*, explaining how people progress in moral reasoning as they grow?",
      "options": ["Jean Piaget", "Erik Erikson", "Lawrence Kohlberg", "John Dewey"],
      "correctAnswer": "Lawrence Kohlberg"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Who is famous for his *Social Learning Theory*, which emphasizes that learning occurs through observation and imitation?",
      "options": ["Albert Bandura", "B.F. Skinner", "Jean Piaget", "Lev Vygotsky"],
      "correctAnswer": "Albert Bandura"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which theorist is known for the *Eight Stages of Psychosocial Development*, which outlines key stages in a person's psychological and social growth?",
      "options": ["Jean Piaget", "Lawrence Kohlberg", "Erik Erikson", "Howard Gardner"],
      "correctAnswer": "Erik Erikson"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an essential first step in constructing a good test?",
      "options": ["Administering a pilot test", "Defining learning objectives", "Analyzing test results", "Writing the answer key"],
      "correctAnswer": "Defining learning objectives"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of a table of specifications in test construction?",
      "options": ["To list the test questions", "To ensure content validity", "To score the test", "To check student attendance"],
      "correctAnswer": "To ensure content validity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What type of question requires students to select the correct answer from several options?",
      "options": ["Essay", "True/False", "Multiple-choice", "Short answer"],
      "correctAnswer": "Multiple-choice"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which characteristic ensures that a test measures what it is intended to measure?",
      "options": ["Reliability", "Validity", "Objectivity", "Difficulty"],
      "correctAnswer": "Validity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What quality of a test refers to the consistency of test results over time or across different evaluators?",
      "options": ["Validity", "Reliability", "Fairness", "Relevance"],
      "correctAnswer": "Reliability"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher creates a test and ensures that the difficulty level matches the students' abilities. This reflects which principle of test construction?",
      "options": ["Reliability", "Fairness", "Difficulty", "Objectivity"],
      "correctAnswer": "Difficulty"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What type of test item is most effective for assessing higher-order thinking skills?",
      "options": ["Multiple-choice", "True/False", "Matching", "Essay"],
      "correctAnswer": "Essay"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why should test items be aligned with learning objectives?",
      "options": ["To make the test easier to grade", "To ensure fairness and validity", "To simplify test administration", "To keep the test short"],
      "correctAnswer": "To ensure fairness and validity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main drawback of using only multiple-choice items on a test?",
      "options": ["They are easy to grade", "They may not assess complex skills", "They take a long time to write", "They are difficult to administer"],
      "correctAnswer": "They may not assess complex skills"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which practice should be avoided when writing true/false questions?",
      "options": ["Using absolute terms like 'always' and 'never'", "Including only one concept per statement", "Ensuring statements are unambiguous", "Writing questions that are evenly balanced between true and false"],
      "correctAnswer": "Using absolute terms like 'always' and 'never'"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should a well-written multiple-choice question include?",
      "options": ["Only one clearly correct answer", "Multiple correct answers", "Vague options", "Tricky language"],
      "correctAnswer": "Only one clearly correct answer"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the benefit of conducting a pilot test before final administration?",
      "options": ["It saves time during test creation", "It identifies potential issues with questions", "It reduces the number of students taking the actual test", "It increases the test length"],
      "correctAnswer": "It identifies potential issues with questions"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which type of question is best for measuring recall of facts and basic knowledge?",
      "options": ["Essay", "Short answer", "Multiple-choice", "Matching"],
      "correctAnswer": "Multiple-choice"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to use clear and precise language in test questions?",
      "options": ["To increase test length", "To confuse test takers", "To ensure fairness and comprehension", "To reduce grading time"],
      "correctAnswer": "To ensure fairness and comprehension"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What term describes how well test scores are used to make accurate conclusions about students’ knowledge or abilities?",
      "options": ["Objectivity", "Scalability", "Validity", "Reliability"],
      "correctAnswer": "Validity"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "A teacher notices that students consistently perform differently on different forms of the same test. What issue is this an example of?",
      "options": ["Low reliability", "High objectivity", "Low validity", "High fairness"],
      "correctAnswer": "Low reliability"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why should test items be reviewed by other educators before use?",
      "options": ["To ensure objectivity in grading", "To increase the length of the test", "To identify potential biases or ambiguities", "To adjust the test difficulty arbitrarily"],
      "correctAnswer": "To identify potential biases or ambiguities"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a potential problem with using poorly constructed multiple-choice distractors?",
      "options": ["It improves test validity", "It makes the test easier for students", "It can reduce the reliability of the test", "It shortens the test time"],
      "correctAnswer": "It can reduce the reliability of the test"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is essential to include at the end of a multiple-choice question?",
      "options": ["A question mark", "Tricky wording", "Several plausible distractors", "A long explanation"],
      "correctAnswer": "Several plausible distractors"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a common best practice when constructing short answer questions?",
      "options": ["Providing multiple blanks in one question", "Ensuring responses are clear and concise", "Using ambiguous prompts", "Allowing multiple interpretations"],
      "correctAnswer": "Ensuring responses are clear and concise"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does item analysis help determine in test construction?",
      "options": ["Test reliability", "Test validity", "Effectiveness of individual items", "All of the above"],
      "correctAnswer": "All of the above"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which measure is used to assess the difficulty level of a test item?",
      "options": ["Item discrimination", "Item difficulty index", "Reliability coefficient", "Item validity index"],
      "correctAnswer": "Item difficulty index"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "An item with a high discrimination index indicates that the item:",
      "options": ["Is too difficult for most students", "Is easily understood by all students", "Differentiates well between high and low scorers", "Has little value in testing"],
      "correctAnswer": "Differentiates well between high and low scorers"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "The item difficulty index ranges from 0 to 1. What does a value close to 0 indicate?",
      "options": ["Very easy item", "Very difficult item", "Balanced difficulty", "Invalid item"],
      "correctAnswer": "Very difficult item"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In item analysis, what is the purpose of calculating the discrimination index?",
      "options": ["To measure how many students can answer the item correctly", "To assess how well the item distinguishes between high and low scorers", "To calculate the time it takes to answer each item", "To ensure the item is fair to all students"],
      "correctAnswer": "To assess how well the item distinguishes between high and low scorers"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is true about a test item with a low discrimination index?",
      "options": ["It is a good item that can differentiate between high and low scorers", "It does not effectively differentiate between high and low scorers", "It is always an easy item", "It is always a difficult item"],
      "correctAnswer": "It does not effectively differentiate between high and low scorers"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the ideal difficulty index for a test item?",
      "options": ["0.1 to 0.3", "0.5 to 0.7", "0.8 to 1.0", "0"],
      "correctAnswer": "0.5 to 0.7"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following describes an item with a very high difficulty index (close to 1)?",
      "options": ["Most students answer it correctly", "Most students fail to answer it correctly", "The item has high discrimination", "The item is ambiguous"],
      "correctAnswer": "Most students fail to answer it correctly"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does an item with a high positive correlation with the total test score suggest?",
      "options": ["It is a poor item", "It is a discriminating item", "It is irrelevant to the test objectives", "It is too easy"],
      "correctAnswer": "It is a discriminating item"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a benefit of conducting item analysis after administering a test?",
      "options": ["It helps improve the test’s clarity", "It ensures the test measures what it is supposed to measure", "It allows for fair grading", "All of the above"],
      "correctAnswer": "All of the above"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does item analysis help in revising future tests?",
      "options": ["It identifies weak items that need modification", "It ensures the test is error-free", "It helps in grading the test efficiently", "It reduces the number of questions to be answered"],
      "correctAnswer": "It identifies weak items that need modification"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of the point-biserial correlation in item analysis?",
      "options": ["To assess the relationship between item responses and total test scores", "To measure how difficult a question is", "To determine the reliability of the test", "To measure the fairness of an item"],
      "correctAnswer": "To assess the relationship between item responses and total test scores"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does it mean if an item has a low point-biserial correlation?",
      "options": ["The item is easy", "The item is poorly related to overall performance", "The item is very discriminating", "The item is difficult but relevant"],
      "correctAnswer": "The item is poorly related to overall performance"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is true for an item with a high negative point-biserial correlation?",
      "options": ["It is a good item for distinguishing between high and low performers", "It should be reviewed or eliminated as it is poorly related to the overall test score", "It is equally difficult for all students", "It is an irrelevant item for the test"],
      "correctAnswer": "It should be reviewed or eliminated as it is poorly related to the overall test score"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be done if an item shows a very high difficulty index and low discrimination index?",
      "options": ["Keep it as is", "Remove or revise it", "Make it more difficult", "Ensure it is included in the next test"],
      "correctAnswer": "Remove or revise it"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an important consideration when analyzing item performance?",
      "options": ["Item clarity and student feedback", "Test length", "Number of multiple-choice items", "Time allotted for the test"],
      "correctAnswer": "Item clarity and student feedback"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "When conducting item analysis, what does a high percentage of correct answers for all test takers indicate?",
      "options": ["The item is too easy", "The item is well-balanced", "The item is too difficult", "The item is a discriminating item"],
      "correctAnswer": "The item is too easy"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following describes an item with a low difficulty index (close to 0)?",
      "options": ["Most students answer it correctly", "Most students fail to answer it correctly", "It is balanced in difficulty", "It is too difficult for all students"],
      "correctAnswer": "Most students fail to answer it correctly"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main purpose of performing item analysis on a large sample of students?",
      "options": ["To determine if the test is effective in measuring student achievement", "To determine how long the test takes to complete", "To decide on the passing score", "To select the most difficult questions for future tests"],
      "correctAnswer": "To determine if the test is effective in measuring student achievement"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a test with high internal consistency indicate about the test items?",
      "options": ["The items are related and measure the same construct", "The items vary widely in content", "The test is unreliable", "The test is too difficult"],
      "correctAnswer": "The items are related and measure the same construct"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does collaborative learning impact student engagement in a diverse classroom?",
      "options": ["It reduces individual participation", "It fosters teamwork and critical thinking", "It isolates students", "It hinders academic performance"],
      "correctAnswer": "It fosters teamwork and critical thinking"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a group project, how can a teacher promote equitable participation among students?",
      "options": ["Assign specific roles to each member", "Let students work without any supervision", "Encourage one student to lead all discussions", "Limit the group size to reduce complexity"],
      "correctAnswer": "Assign specific roles to each member"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How do peer interactions enhance learning in a constructivist classroom?",
      "options": ["They help students memorize information", "They allow students to learn through observation alone", "They facilitate knowledge construction through discussion and collaboration", "They create competition among students"],
      "correctAnswer": "They facilitate knowledge construction through discussion and collaboration"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which social factor can most influence a student’s academic performance?",
      "options": ["Parental involvement", "School environment", "Peer relationships", "All of the above"],
      "correctAnswer": "All of the above"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to consider cultural diversity when planning group learning activities?",
      "options": ["To avoid group conflicts", "To ensure fair participation for all students", "To integrate students’ perspectives and enrich learning", "To make learning more competitive"],
      "correctAnswer": "To integrate students’ perspectives and enrich learning"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can online discussions foster a sense of community among students in an e-learning environment?",
      "options": ["By allowing only individual assignments", "By enabling open forums for collaborative problem-solving and feedback", "By limiting student interaction", "By focusing solely on individual achievements"],
      "correctAnswer": "By enabling open forums for collaborative problem-solving and feedback"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a multicultural classroom, what strategy helps bridge cultural gaps and promote inclusive learning?",
      "options": ["Encouraging stereotypes", "Fostering mutual respect and understanding", "Restricting discussions about culture", "Ignoring differences between students"],
      "correctAnswer": "Fostering mutual respect and understanding"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does social interaction influence cognitive development in the context of Vygotsky's theory?",
      "options": ["Through solitary study", "Through collaboration with peers and more knowledgeable others", "Through teacher-centered instruction", "Through independent learning activities"],
      "correctAnswer": "Through collaboration with peers and more knowledgeable others"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role does social emotional learning (SEL) play in a student's ability to learn?",
      "options": ["It helps students perform better on standardized tests", "It enhances students' social skills and emotional regulation, supporting learning", "It discourages collaboration", "It prioritizes cognitive skills over social skills"],
      "correctAnswer": "It enhances students' social skills and emotional regulation, supporting learning"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How do collaborative tools, like Google Docs, enhance group learning in the classroom?",
      "options": ["By allowing only one student to edit at a time", "By encouraging collective problem-solving and real-time feedback", "By isolating each student’s work", "By promoting individual work over group effort"],
      "correctAnswer": "By encouraging collective problem-solving and real-time feedback"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the impact of teacher-student relationships on learning outcomes?",
      "options": ["They have little impact", "They influence students' motivation and engagement", "They make students dependent on the teacher", "They hinder student independence"],
      "correctAnswer": "They influence students' motivation and engagement"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a group-based learning environment, what does fostering a growth mindset help students achieve?",
      "options": ["It makes them focus on fixed abilities", "It encourages effort and resilience in the face of challenges", "It decreases collaboration", "It reduces teacher-student interactions"],
      "correctAnswer": "It encourages effort and resilience in the face of challenges"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which social factor is essential in fostering positive peer relationships in a classroom?",
      "options": ["Encouraging competition", "Promoting collaborative activities and mutual respect", "Limiting group activities", "Fostering individual achievements over group success"],
      "correctAnswer": "Promoting collaborative activities and mutual respect"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does involving students in decision-making processes enhance their learning experience?",
      "options": ["It reduces their sense of responsibility", "It fosters ownership and engagement in their learning", "It discourages critical thinking", "It limits their creative input"],
      "correctAnswer": "It fosters ownership and engagement in their learning"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is one of the challenges of social learning in diverse classrooms?",
      "options": ["Increased competition among students", "Difficulty in aligning different communication styles", "Uniform responses to classroom activities", "Reduced need for student interaction"],
      "correctAnswer": "Difficulty in aligning different communication styles"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does social learning theory by Albert Bandura apply to classroom settings?",
      "options": ["Students learn solely through personal experience", "Students learn by observing and imitating others in social contexts", "Students are unaffected by external influences", "Students learn independently from others"],
      "correctAnswer": "Students learn by observing and imitating others in social contexts"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to build a supportive peer network in learning environments?",
      "options": ["To create cliques", "To facilitate knowledge sharing and emotional support", "To discourage independent thinking", "To focus only on individual goals"],
      "correctAnswer": "To facilitate knowledge sharing and emotional support"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What impact does a positive classroom culture have on student learning?",
      "options": ["It decreases collaboration", "It fosters a sense of belonging and encourages engagement", "It discourages risk-taking", "It isolates students from each other"],
      "correctAnswer": "It fosters a sense of belonging and encourages engagement"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How do cultural expectations affect social learning in the classroom?",
      "options": ["They have no impact", "They shape how students interact and learn from one another", "They encourage competition", "They isolate students from different cultures"],
      "correctAnswer": "They shape how students interact and learn from one another"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the relationship between social learning and academic achievement?",
      "options": ["Social learning has no impact on academic achievement", "Social learning fosters cooperation, which can improve academic performance", "Social learning detracts from individual achievement", "Social learning only affects behavior, not academics"],
      "correctAnswer": "Social learning fosters cooperation, which can improve academic performance"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes a SMARTER objective?",
      "options": ["An objective that is vague and general", "An objective that is specific, measurable, and time-bound", "An objective that is broad and qualitative", "An objective that focuses only on the outcome"],
      "correctAnswer": "An objective that is specific, measurable, and time-bound"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which element of SMARTER objectives refers to the goal's ability to be assessed quantitatively?",
      "options": ["Specific", "Measurable", "Achievable", "Relevant"],
      "correctAnswer": "Measurable"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In the SMARTER framework, what does the 'T' for 'Time-bound' ensure?",
      "options": ["The goal is completed within an undefined period", "The goal is achieved without a set deadline", "The goal is achieved by a specific time", "The goal's progress is not tracked"],
      "correctAnswer": "The goal is achieved by a specific time"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important for objectives to be achievable in the SMARTER framework?",
      "options": ["To ensure that they are not too difficult", "To ensure they are realistic and within reach", "To make them easier to complete", "To set minimal expectations"],
      "correctAnswer": "To ensure they are realistic and within reach"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does 'Evaluated' refer to in the SMARTER objective model?",
      "options": ["The ability to review and assess the progress of the objective", "The completion of the objective by any means", "The lack of feedback during the process", "The evaluation of external factors only"],
      "correctAnswer": "The ability to review and assess the progress of the objective"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does making an objective 'Relevant' in the SMARTER model affect its success?",
      "options": ["It ensures that the objective aligns with personal or organizational goals", "It increases the difficulty of achieving the objective", "It makes the objective less important", "It limits the resources required to complete the objective"],
      "correctAnswer": "It ensures that the objective aligns with personal or organizational goals"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of a SMARTER objective for a student?",
      "options": ["Increase test scores", "Improve math test scores by 20% by the end of the semester, evaluated monthly", "Study harder for math tests", "Do better in school"],
      "correctAnswer": "Improve math test scores by 20% by the end of the semester, evaluated monthly"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main purpose of reviewing an objective periodically within the SMARTER framework?",
      "options": ["To increase the difficulty of the goal", "To check progress, adjust the objective if necessary, and ensure it remains relevant", "To complete the objective without further modifications", "To reward completion without assessing the process"],
      "correctAnswer": "To check progress, adjust the objective if necessary, and ensure it remains relevant"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is 'Specific' an important aspect of a SMARTER objective?",
      "options": ["To give a clear and focused goal", "To provide a general guideline", "To make the goal less detailed", "To leave room for uncertainty"],
      "correctAnswer": "To give a clear and focused goal"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a SMARTER objective help in improving project management?",
      "options": ["By offering an unclear goal", "By focusing on broad outcomes", "By setting clear, measurable, and realistic targets with deadlines", "By leaving room for unplanned changes"],
      "correctAnswer": "By setting clear, measurable, and realistic targets with deadlines"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the 'Achievable' aspect of SMARTER objectives be assessed?",
      "options": ["By ensuring the goal is set based on personal experience and external factors", "By measuring it only after completion", "By ensuring it aligns with the company’s annual budget", "By considering resources, skills, and constraints"],
      "correctAnswer": "By considering resources, skills, and constraints"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the impact of having an objective that is not time-bound?",
      "options": ["It leads to indefinite goal pursuit", "It increases the likelihood of goal completion", "It creates clear milestones", "It keeps the goal manageable"],
      "correctAnswer": "It leads to indefinite goal pursuit"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which is an example of a poorly constructed objective based on SMARTER criteria?",
      "options": ["Increase sales by 10% in 3 months, with bi-weekly reviews", "Complete the project by next year without clear steps or milestones", "Improve communication with the team by having weekly meetings", "Increase website traffic by 25% by the end of the quarter, tracked weekly"],
      "correctAnswer": "Complete the project by next year without clear steps or milestones"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can objectives be made more achievable in the SMARTER framework?",
      "options": ["By lowering the standards and making them easier", "By considering the available resources, time, and constraints", "By eliminating deadlines", "By creating an overly ambitious target"],
      "correctAnswer": "By considering the available resources, time, and constraints"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does the 'M' in SMARTER stand for and why is it critical?",
      "options": ["Meaningful, because it provides a sense of purpose", "Measurable, because it allows for progress tracking and assessment", "Manageable, because it reduces complexity", "Monitored, because it ensures continuous oversight"],
      "correctAnswer": "Measurable, because it allows for progress tracking and assessment"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can the 'Evaluated' aspect of SMARTER objectives contribute to continuous improvement?",
      "options": ["By collecting feedback only at the end of the project", "By assessing progress regularly to adjust strategies if needed", "By focusing solely on final results", "By ignoring unforeseen challenges during the process"],
      "correctAnswer": "By assessing progress regularly to adjust strategies if needed"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In an educational setting, how would a SMARTER objective look for a student improving writing skills?",
      "options": ["Write better essays", "Increase writing skills by 30% in the next semester, evaluated through bi-weekly assignments", "Write 1000 words every day", "Write more essays without feedback"],
      "correctAnswer": "Increase writing skills by 30% in the next semester, evaluated through bi-weekly assignments"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Why is it important to review SMARTER objectives periodically?",
      "options": ["To ensure they are still relevant and adjust to changes", "To increase the scope of the goal", "To ignore external feedback", "To lower expectations as time progresses"],
      "correctAnswer": "To ensure they are still relevant and adjust to changes"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which SMARTER principle would be most important when setting a goal for a business to increase customer satisfaction by 15% within six months?",
      "options": ["Specific", "Measurable", "Relevant", "Time-bound"],
      "correctAnswer": "Time-bound"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a SMARTER objective be used to improve team collaboration in a workplace?",
      "options": ["By making the goal too vague", "By setting a measurable, achievable goal with specific deadlines and team responsibilities", "By assigning one person to do all the work", "By not setting a deadline"],
      "correctAnswer": "By setting a measurable, achievable goal with specific deadlines and team responsibilities"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of a rubric in assessment?",
      "options": ["To provide a clear, consistent method for evaluating student work", "To offer subjective feedback without clear criteria", "To confuse students with ambiguous grading systems", "To encourage students to focus on only one aspect of the task"],
      "correctAnswer": "To provide a clear, consistent method for evaluating student work"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the first step in creating an effective rubric?",
      "options": ["Define the assignment or task objectives", "Write detailed feedback for students", "Choose a grading scale", "Decide how many categories will be used"],
      "correctAnswer": "Define the assignment or task objectives"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an essential feature of a rubric?",
      "options": ["Vague descriptions of performance levels", "Specific criteria and performance levels", "Focus on the number of pages written", "Subjective judgments based on personal preference"],
      "correctAnswer": "Specific criteria and performance levels"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can rubrics help reduce grading bias?",
      "options": ["By providing clear, objective criteria for evaluation", "By allowing teachers to grade based on personal judgment", "By assigning random scores", "By focusing on the students' attitude toward the assignment"],
      "correctAnswer": "By providing clear, objective criteria for evaluation"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is NOT typically included in a rubric?",
      "options": ["Performance levels (e.g., Excellent, Satisfactory, Needs Improvement)", "Criteria that will be assessed", "A subjective narrative evaluation", "Descriptions of the characteristics of each performance level"],
      "correctAnswer": "A subjective narrative evaluation"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of descriptors in a rubric?",
      "options": ["To explain what each performance level looks like for each criterion", "To give a general overview without details", "To describe only the best possible outcome", "To focus on negative aspects of the student’s work"],
      "correctAnswer": "To explain what each performance level looks like for each criterion"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does a holistic rubric evaluate?",
      "options": ["The overall quality of the student's work based on broad, general criteria", "Each individual criterion separately", "Only the structure of the work", "The formatting of the document"],
      "correctAnswer": "The overall quality of the student's work based on broad, general criteria"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does a analytic rubric differ from a holistic rubric?",
      "options": ["It breaks down the task into specific criteria and evaluates each separately", "It evaluates the overall work without considering individual components", "It focuses only on the introduction and conclusion", "It provides fewer details on performance levels"],
      "correctAnswer": "It breaks down the task into specific criteria and evaluates each separately"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is a key benefit of using rubrics in education?",
      "options": ["Rubrics provide a standardized way to grade and give feedback", "Rubrics allow for random grading", "Rubrics reduce the teacher’s workload without any effort", "Rubrics focus only on student effort, not outcomes"],
      "correctAnswer": "Rubrics provide a standardized way to grade and give feedback"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What type of rubric is most appropriate for grading subjective, creative projects like art or writing?",
      "options": ["Analytic rubric", "Holistic rubric", "Checklist rubric", "Norm-referenced rubric"],
      "correctAnswer": "Analytic rubric"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of using performance levels like 'Excellent', 'Good', 'Satisfactory', and 'Needs Improvement' in rubrics?",
      "options": ["To clarify the quality of work expected at each level", "To confuse the student with unclear expectations", "To assign grades based only on the highest level", "To emphasize only the completion of the task without considering quality"],
      "correctAnswer": "To clarify the quality of work expected at each level"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can rubrics benefit students in the learning process?",
      "options": ["By providing clear expectations and helping students understand how they will be evaluated", "By focusing only on the final grade", "By discouraging students from improving their work", "By providing no feedback for improvement"],
      "correctAnswer": "By providing clear expectations and helping students understand how they will be evaluated"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is the best example of a rubric criterion for a research paper?",
      "options": ["Grammar", "Creativity", "Use of evidence and sources", "Personal opinions expressed"],
      "correctAnswer": "Use of evidence and sources"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does it mean for a rubric to be 'valid'?",
      "options": ["The rubric accurately assesses the intended learning outcomes or skills", "The rubric is easy to understand but lacks detail", "The rubric includes multiple unrelated criteria", "The rubric focuses only on effort and completion"],
      "correctAnswer": "The rubric accurately assesses the intended learning outcomes or skills"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a rubric be adapted for different levels of students?",
      "options": ["By adjusting the level of detail and expectations for each criterion based on the grade level", "By maintaining the same expectations regardless of the student's ability", "By making the rubric longer and more complicated", "By ignoring individual student needs and skills"],
      "correctAnswer": "By adjusting the level of detail and expectations for each criterion based on the grade level"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the role of feedback in rubrics?",
      "options": ["To provide constructive comments that help students improve based on the rubric's criteria", "To provide vague comments unrelated to the rubric", "To focus only on grading without offering improvement suggestions", "To discourage further work on the assignment"],
      "correctAnswer": "To provide constructive comments that help students improve based on the rubric's criteria"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be considered when creating a rubric for a group project?",
      "options": ["Individual contributions, teamwork, and overall project quality", "Only the final group presentation", "Group members’ attendance and punctuality", "Only the quality of the written report"],
      "correctAnswer": "Individual contributions, teamwork, and overall project quality"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the benefit of creating rubrics before students begin an assignment?",
      "options": ["Students can clearly understand expectations and how their work will be evaluated", "Students will focus only on completing the assignment", "Students will be graded without clear guidelines", "Students will ignore the rubric and do as they wish"],
      "correctAnswer": "Students can clearly understand expectations and how their work will be evaluated"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which rubric type would be best for a highly structured assignment with clear, measurable outcomes?",
      "options": ["Analytic rubric", "Holistic rubric", "Checklist rubric", "Trait rubric"],
      "correctAnswer": "Checklist rubric"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be done if students do not understand the rubric criteria?",
      "options": ["Clarify the descriptions and provide examples before they start", "Ignore the confusion and assume they understand", "Only give the rubric without explanation", "Reduce the detail in the rubric to avoid confusion"],
      "correctAnswer": "Clarify the descriptions and provide examples before they start"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a classroom where students from various cultural backgrounds are present, what should the teacher focus on to ensure an inclusive learning environment?",
      "options": ["Ignoring cultural differences to maintain uniformity", "Encouraging respect for diverse perspectives and integrating multicultural content", "Enforcing a single cultural norm", "Only focusing on the dominant culture's perspective"],
      "correctAnswer": "Encouraging respect for diverse perspectives and integrating multicultural content"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "If a teacher notices that one student consistently struggles with reading comprehension, what should be their first step in addressing this challenge?",
      "options": ["Ignoring the issue to avoid singling out the student", "Assigning additional reading assignments", "Assessing the student's learning style and providing tailored support", "Asking the student to read aloud in front of the class to improve"],
      "correctAnswer": "Assessing the student's learning style and providing tailored support"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the most effective approach when teaching critical thinking skills in a general education course?",
      "options": ["Focusing solely on memorization of facts", "Encouraging open-ended questions and debates", "Limiting discussions to the textbook", "Providing ready-made answers for students to memorize"],
      "correctAnswer": "Encouraging open-ended questions and debates"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "When planning a general education curriculum, how can a teacher ensure that the material is accessible to students with diverse learning needs?",
      "options": ["By offering one-size-fits-all lessons", "By incorporating differentiated instruction and multiple learning modalities", "By simplifying the content to the lowest common denominator", "By providing only oral lectures with no visual aids"],
      "correctAnswer": "By incorporating differentiated instruction and multiple learning modalities"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What strategy can a teacher use to promote student engagement in a general education class?",
      "options": ["Assigning a large amount of homework", "Creating interactive activities and discussions", "Lecturing for the entire class period", "Focusing only on textbook material"],
      "correctAnswer": "Creating interactive activities and discussions"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key factor in developing effective general education assessments?",
      "options": ["Ensuring the assessment only measures memorization", "Aligning the assessment with the course objectives and learning outcomes", "Creating difficult tests to challenge the students", "Focusing only on multiple-choice questions"],
      "correctAnswer": "Aligning the assessment with the course objectives and learning outcomes"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is the best approach to teaching a general education course that includes both auditory and visual learners?",
      "options": ["Using only oral presentations", "Providing written materials along with visual aids like diagrams and videos", "Relying only on group discussions", "Assigning reading assignments without supplementary visuals"],
      "correctAnswer": "Providing written materials along with visual aids like diagrams and videos"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In a general education class, how can a teacher foster collaboration among students from different academic disciplines?",
      "options": ["By assigning group projects that encourage interdisciplinary research", "By keeping students in isolated subject areas", "By focusing only on individual assignments", "By limiting group interactions to a single subject matter"],
      "correctAnswer": "By assigning group projects that encourage interdisciplinary research"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher in a general education classroom assess whether students are mastering core concepts?",
      "options": ["By observing their classroom participation only", "By providing periodic formative assessments and reviewing results", "By assuming that all students understand the material", "By relying on final exams only"],
      "correctAnswer": "By providing periodic formative assessments and reviewing results"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In what situation might project-based learning be most beneficial in a general education course?",
      "options": ["When students need to memorize information quickly", "When students are learning practical applications of concepts", "When students need to focus only on textbook content", "When students are unable to work in groups"],
      "correctAnswer": "When students are learning practical applications of concepts"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of scaffolding in a general education setting?",
      "options": ["Providing complex problems right away", "Breaking down tasks into manageable steps and providing support along the way", "Allowing students to work on their own without any guidance", "Giving students the answer immediately"],
      "correctAnswer": "Breaking down tasks into manageable steps and providing support along the way"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should a teacher do if students are not responding well to a specific teaching method in a general education course?",
      "options": ["Continue using the method despite poor results", "Assess the needs of the students and adapt teaching methods accordingly", "Ignore student feedback", "Stick to the same lesson plan regardless of student engagement"],
      "correctAnswer": "Assess the needs of the students and adapt teaching methods accordingly"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role does feedback play in student learning in a general education course?",
      "options": ["Feedback helps students understand their strengths and areas for improvement", "Feedback only serves as a formality", "Feedback is only necessary at the end of the course", "Feedback should only focus on what students did wrong"],
      "correctAnswer": "Feedback helps students understand their strengths and areas for improvement"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following teaching strategies is best for accommodating students with different learning paces in a general education classroom?",
      "options": ["Using individualized learning plans and offering extensions", "Standardizing the same timeline for all students", "Assigning the same workload to all students", "Ignoring individual student needs and focusing only on group progress"],
      "correctAnswer": "Using individualized learning plans and offering extensions"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can a teacher make general education content more relevant to students' lives?",
      "options": ["By using real-world examples and current events", "By focusing only on theoretical concepts", "By ignoring students' interests and backgrounds", "By teaching only historical content without modern application"],
      "correctAnswer": "By using real-world examples and current events"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the benefit of cooperative learning in general education?",
      "options": ["It encourages students to learn from each other and develop teamwork skills", "It focuses only on individual achievements", "It discourages group work", "It requires students to work without teacher guidance"],
      "correctAnswer": "It encourages students to learn from each other and develop teamwork skills"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What should be the teacher’s focus when working with students who exhibit a variety of learning disabilities in a general education classroom?",
      "options": ["Using differentiated instruction and providing additional resources or accommodations", "Treating all students the same", "Focusing only on students who show no learning difficulties", "Strictly following the textbook without adjustments"],
      "correctAnswer": "Using differentiated instruction and providing additional resources or accommodations"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key strategy for promoting student self-regulation in a general education course?",
      "options": ["Encouraging reflection and goal setting throughout the learning process", "Telling students what to do at every step", "Only providing feedback at the end of the course", "Using a rigid, one-size-fits-all approach"],
      "correctAnswer": "Encouraging reflection and goal setting throughout the learning process"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What can a teacher do to create a positive classroom climate in a general education setting?",
      "options": ["Foster open communication and mutual respect", "Enforce strict discipline without explanation", "Ignore student concerns", "Only focus on academic performance"],
      "correctAnswer": "Foster open communication and mutual respect"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the Copernican revolution challenge the prevailing view of the universe?",
      "options": ["By asserting the Earth is the center of the universe", "By proving that the Earth revolves around the Sun", "By demonstrating the Sun revolves around the Earth", "By suggesting that the Earth does not exist"],
      "correctAnswer": "By proving that the Earth revolves around the Sun"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role did Galileo's telescope play in the development of modern science?",
      "options": ["It provided the first evidence supporting the heliocentric model", "It disproved the idea of the Earth revolving around the Sun", "It was the first tool used for chemical experiments", "It was primarily used for navigation purposes"],
      "correctAnswer": "It provided the first evidence supporting the heliocentric model"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the main impact of Isaac Newton’s 'Principia' on the scientific community?",
      "options": ["It introduced the theory of evolution", "It established the laws of motion and universal gravitation", "It disproved the heliocentric model", "It focused on the chemical properties of elements"],
      "correctAnswer": "It established the laws of motion and universal gravitation"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best reflects the philosophical perspective of logical positivism?",
      "options": ["Science must be based on observable and empirical data", "Science should be based solely on speculation and theory", "Science cannot provide answers to moral questions", "Science is always subject to personal interpretation"],
      "correctAnswer": "Science must be based on observable and empirical data"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "In what way did the works of Charles Darwin revolutionize biology?",
      "options": ["By providing evidence for the theory of spontaneous generation", "By introducing the concept of natural selection as a mechanism of evolution", "By disproving the idea of genetic inheritance", "By proving the Earth is millions of years old"],
      "correctAnswer": "By introducing the concept of natural selection as a mechanism of evolution"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the primary contribution of Thomas Kuhn to the philosophy of science?",
      "options": ["He proposed the idea of scientific progress through gradual accumulation of knowledge", "He introduced the concept of scientific revolutions and paradigm shifts", "He argued that science should only focus on observable phenomena", "He developed the theory of evolution"],
      "correctAnswer": "He introduced the concept of scientific revolutions and paradigm shifts"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the development of quantum mechanics in the 20th century challenge classical physics?",
      "options": ["It proved that atoms cannot be observed directly", "It introduced the idea that particles can exist in multiple states simultaneously", "It demonstrated that all particles are indivisible", "It reinforced the idea that classical Newtonian laws apply universally"],
      "correctAnswer": "It introduced the idea that particles can exist in multiple states simultaneously"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the significance of the scientific method in the development of modern science?",
      "options": ["It emphasizes intuition and personal belief in research", "It encourages rigorous testing, observation, and empirical evidence in research", "It disregards hypotheses in favor of established theories", "It focuses solely on theoretical reasoning without experimentation"],
      "correctAnswer": "It encourages rigorous testing, observation, and empirical evidence in research"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What did Karl Popper mean by the concept of 'falsifiability' in scientific theories?",
      "options": ["A theory should be able to be tested and potentially proven wrong", "A theory must be proven true through repeated experimentation", "A theory must be entirely based on empirical evidence", "A theory should be unchangeable once proposed"],
      "correctAnswer": "A theory should be able to be tested and potentially proven wrong"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the major controversy during the Scopes Trial in 1925?",
      "options": ["Whether evolution should be taught in schools", "Whether the Earth is flat", "Whether electricity should be considered a form of science", "Whether medicine should be based on scientific principles"],
      "correctAnswer": "Whether evolution should be taught in schools"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which philosopher is most associated with the idea of 'scientific realism'?",
      "options": ["Karl Popper", "Thomas Kuhn", "Imre Lakatos", "Pierre Duhem"],
      "correctAnswer": "Imre Lakatos"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the main focus of the Enlightenment in terms of science?",
      "options": ["Emphasis on intuition and mystical thought", "Use of reason, observation, and experimentation to understand nature", "Rejection of scientific knowledge in favor of religious doctrine", "Development of philosophical theories without empirical evidence"],
      "correctAnswer": "Use of reason, observation, and experimentation to understand nature"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What did the works of Louis Pasteur contribute to the history of science?",
      "options": ["The discovery of the theory of relativity", "The development of the germ theory of disease", "The invention of the microscope", "The theory of evolution by natural selection"],
      "correctAnswer": "The development of the germ theory of disease"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the theory of relativity by Albert Einstein alter the way scientists understood the universe?",
      "options": ["It proved that the Earth was the center of the universe", "It showed that time and space are relative and interdependent", "It reinforced the classical Newtonian view of the universe", "It suggested that science can never be fully understood"],
      "correctAnswer": "It showed that time and space are relative and interdependent"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes the concept of 'paradigm shifts' as introduced by Thomas Kuhn?",
      "options": ["A gradual evolution of scientific knowledge through incremental discoveries", "A sudden, revolutionary change in scientific thinking that redefines accepted theories", "A constant cycle of disproving scientific theories", "A repetitive return to past scientific models"],
      "correctAnswer": "A sudden, revolutionary change in scientific thinking that redefines accepted theories"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the role of the Scientific Revolution in shaping modern science?",
      "options": ["It emphasized the importance of religious beliefs in scientific research", "It introduced a systematic approach to scientific inquiry and experimentation", "It rejected the study of the natural world", "It focused exclusively on mathematical theories"],
      "correctAnswer": "It introduced a systematic approach to scientific inquiry and experimentation"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does 'scientific determinism' suggest about the universe?",
      "options": ["Everything in the universe is the result of random events", "The future is predetermined by natural laws and can be predicted with certainty", "Human consciousness is completely separate from the natural world", "Science cannot explain the laws of nature"],
      "correctAnswer": "The future is predetermined by natural laws and can be predicted with certainty"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the discovery of DNA's double helix structure by Watson and Crick impact biology?",
      "options": ["It disproved the theory of evolution", "It provided insight into genetic inheritance and molecular biology", "It introduced the concept of intelligent design", "It showed that all organisms are identical at the molecular level"],
      "correctAnswer": "It provided insight into genetic inheritance and molecular biology"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes the impact of the Industrial Revolution on science?",
      "options": ["It slowed the progress of scientific knowledge", "It provided new tools, technologies, and materials for scientific experimentation", "It rejected the use of science in industry", "It shifted scientific focus away from practical applications"],
      "correctAnswer": "It provided new tools, technologies, and materials for scientific experimentation"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the discovery of the electron by J.J. Thomson change the field of physics?",
      "options": ["It provided evidence for the existence of atoms", "It disproved the atomic model", "It introduced the idea that light is made of waves", "It showed that electrons are the smallest particles in the universe"],
      "correctAnswer": "It provided evidence for the existence of atoms"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the ancient Egyptians contribute to the development of mathematics?",
      "options": ["By developing the concept of zero", "By inventing calculus", "By using geometry for building pyramids", "By creating abstract algebra"],
      "correctAnswer": "By using geometry for building pyramids"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the significance of the ancient Greeks in the history of mathematics?",
      "options": ["They developed the concept of zero", "They formalized geometry and mathematical proofs", "They invented the concept of negative numbers", "They discovered the Pythagorean theorem"],
      "correctAnswer": "They formalized geometry and mathematical proofs"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which ancient mathematician is credited with proving the fundamental theorem of geometry?",
      "options": ["Euclid", "Archimedes", "Pythagoras", "Socrates"],
      "correctAnswer": "Euclid"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role did Arabic mathematicians play during the Middle Ages?",
      "options": ["They invented calculus", "They preserved and advanced Greek mathematical knowledge", "They discovered the concept of irrational numbers", "They proved the Pythagorean theorem"],
      "correctAnswer": "They preserved and advanced Greek mathematical knowledge"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the main contribution of Isaac Newton and Gottfried Wilhelm Leibniz to mathematics?",
      "options": ["They invented algebra", "They developed the theory of calculus independently", "They proved the fundamental theorem of calculus", "They invented number theory"],
      "correctAnswer": "They developed the theory of calculus independently"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the major impact of the development of the number zero in mathematics?",
      "options": ["It led to the invention of negative numbers", "It revolutionized the concept of place value in the decimal system", "It allowed for the development of algebra", "It made addition and subtraction unnecessary"],
      "correctAnswer": "It revolutionized the concept of place value in the decimal system"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the significance of the work of Pierre-Simon Laplace in the history of mathematics?",
      "options": ["He developed probability theory and celestial mechanics", "He invented modern algebra", "He discovered the theory of relativity", "He introduced the concept of imaginary numbers"],
      "correctAnswer": "He developed probability theory and celestial mechanics"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the concept of infinity influence the development of mathematics?",
      "options": ["It introduced the idea of limits and infinitesimal calculus", "It was primarily used to calculate large numbers", "It proved that mathematics is incomplete", "It led to the discovery of irrational numbers"],
      "correctAnswer": "It introduced the idea of limits and infinitesimal calculus"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What did the work of Carl Friedrich Gauss contribute to the field of mathematics?",
      "options": ["He developed the theory of relativity", "He proved the Pythagorean theorem", "He made significant advancements in number theory and geometry", "He introduced the concept of prime numbers"],
      "correctAnswer": "He made significant advancements in number theory and geometry"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What philosophical approach to mathematics did the formalists take?",
      "options": ["They believed mathematics is a construct of the human mind", "They focused on the logical and symbolic manipulation of mathematical expressions", "They emphasized the importance of geometric intuition", "They believed mathematics existed as a discovery in nature"],
      "correctAnswer": "They focused on the logical and symbolic manipulation of mathematical expressions"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which mathematician is known for his work on set theory and the concept of cardinal numbers?",
      "options": ["Georg Cantor", "Euclid", "René Descartes", "Kurt Gödel"],
      "correctAnswer": "Georg Cantor"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the impact of Kurt Gödel's incompleteness theorems on mathematics?",
      "options": ["They proved that all mathematical problems can be solved", "They showed that certain mathematical truths cannot be proven within a formal system", "They established that arithmetic is always consistent", "They proved that mathematics cannot be used to describe reality"],
      "correctAnswer": "They showed that certain mathematical truths cannot be proven within a formal system"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the philosophical position known as Platonism in mathematics?",
      "options": ["Mathematics is a creation of the human mind", "Mathematical truths exist independently of human thought", "Mathematics is just a tool for solving practical problems", "Mathematics is a subjective field with no absolute truths"],
      "correctAnswer": "Mathematical truths exist independently of human thought"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the major contribution of Blaise Pascal to mathematics?",
      "options": ["He developed the theory of probability", "He invented algebra", "He introduced the concept of negative numbers", "He created the first comprehensive mathematical encyclopedia"],
      "correctAnswer": "He developed the theory of probability"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the invention of the printing press affect the development of mathematics?",
      "options": ["It slowed the distribution of mathematical knowledge", "It allowed mathematical knowledge to be spread more widely and rapidly", "It led to the elimination of mathematical errors", "It made mathematics a private pursuit"],
      "correctAnswer": "It allowed mathematical knowledge to be spread more widely and rapidly"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role did mathematics play in the development of science during the Renaissance?",
      "options": ["It was seen as unrelated to scientific inquiry", "It was used to describe the natural world and predict phenomena", "It was primarily used in religious and spiritual contexts", "It focused solely on geometry and architectural design"],
      "correctAnswer": "It was used to describe the natural world and predict phenomena"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which mathematical concept did René Descartes introduce that was foundational for modern algebra?",
      "options": ["Coordinate geometry", "Probability theory", "Infinity", "Set theory"],
      "correctAnswer": "Coordinate geometry"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the primary focus of the ancient Indian mathematicians in the development of mathematics?",
      "options": ["They focused on astronomy and trigonometry", "They created the concept of zero and the decimal system", "They developed algebraic structures", "They invented calculus"],
      "correctAnswer": "They created the concept of zero and the decimal system"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How did the concept of irrational numbers challenge early mathematical thought?",
      "options": ["It contradicted the belief that all numbers could be expressed as ratios of integers", "It led to the rejection of negative numbers", "It suggested that all numbers are irrational", "It proved that mathematics is fundamentally flawed"],
      "correctAnswer": "It contradicted the belief that all numbers could be expressed as ratios of integers"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What was the significance of the Renaissance in terms of mathematics?",
      "options": ["It marked the beginning of algebraic notation", "It saw the end of the development of mathematics", "It led to the rejection of mathematical exploration in favor of philosophy", "It caused a resurgence in the study of ancient Greek and Roman mathematical texts"],
      "correctAnswer": "It caused a resurgence in the study of ancient Greek and Roman mathematical texts"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can virtual reality (VR) enhance the learning experience in a history classroom?",
      "options": ["By allowing students to explore historical sites and events in an immersive way", "By replacing textbooks with digital content", "By enabling students to take online quizzes", "By offering text-to-speech functionality for lectures"],
      "correctAnswer": "By allowing students to explore historical sites and events in an immersive way"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main benefit of using learning management systems (LMS) in education?",
      "options": ["They allow teachers to record lectures", "They provide a centralized platform for course materials, communication, and assessments", "They automate grading for all assignments", "They replace the need for in-person teaching"],
      "correctAnswer": "They provide a centralized platform for course materials, communication, and assessments"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does gamification improve student engagement in a math class?",
      "options": ["By turning math problems into video games", "By making learning more competitive and rewarding through points and badges", "By eliminating the need for textbooks", "By focusing solely on quiz-based learning"],
      "correctAnswer": "By making learning more competitive and rewarding through points and badges"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of using educational technology to support differentiated learning?",
      "options": ["Using adaptive learning software that adjusts the difficulty of tasks based on individual progress", "Requiring all students to work at the same pace", "Providing printed worksheets for every student", "Using traditional lecture methods for all students"],
      "correctAnswer": "Using adaptive learning software that adjusts the difficulty of tasks based on individual progress"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a major advantage of using cloud-based tools for collaborative learning?",
      "options": ["They require high-speed internet access for all students", "They enable real-time collaboration on documents, allowing students to work together from different locations", "They are only accessible through desktop computers", "They replace the need for traditional textbooks"],
      "correctAnswer": "They enable real-time collaboration on documents, allowing students to work together from different locations"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can AI-powered tools improve personalized learning for students?",
      "options": ["By creating one-size-fits-all lesson plans", "By monitoring student progress and adjusting learning materials to meet individual needs", "By eliminating the need for teachers", "By providing instant grades for all assignments"],
      "correctAnswer": "By monitoring student progress and adjusting learning materials to meet individual needs"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following technologies can be used to enhance interactive learning in a classroom?",
      "options": ["Interactive whiteboards", "Projectors that only display text", "Traditional chalkboards", "Printed worksheets"],
      "correctAnswer": "Interactive whiteboards"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is one of the main challenges of integrating technology into the classroom?",
      "options": ["Providing enough textbooks", "Ensuring students have access to devices and the internet", "Limiting student access to devices", "Using outdated software for educational purposes"],
      "correctAnswer": "Ensuring students have access to devices and the internet"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does flipped learning use technology to change traditional classroom structures?",
      "options": ["By having students watch lectures at home and do homework in class", "By replacing teachers with video lessons", "By using only paper-based assessments", "By eliminating in-class discussions and group activities"],
      "correctAnswer": "By having students watch lectures at home and do homework in class"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role do podcasts play in educational technology?",
      "options": ["They provide audio versions of textbooks", "They allow students to listen to expert discussions on various educational topics", "They replace all forms of reading", "They are only useful for language learning"],
      "correctAnswer": "They allow students to listen to expert discussions on various educational topics"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following is an example of using technology to support assessment in education?",
      "options": ["Using an online quiz platform that provides instant feedback to students", "Handwriting all tests and grading them manually", "Using paper exams without any technological support", "Providing only oral exams with no written records"],
      "correctAnswer": "Using an online quiz platform that provides instant feedback to students"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can digital storytelling enhance learning in a literature class?",
      "options": ["By encouraging students to create multimedia projects that combine text, images, and sound", "By replacing textbooks with movies", "By eliminating written assignments", "By offering only traditional lecture-based learning"],
      "correctAnswer": "By encouraging students to create multimedia projects that combine text, images, and sound"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary benefit of using video conferencing tools in education?",
      "options": ["They replace the need for textbooks", "They allow for real-time communication and collaboration between students and teachers, even from remote locations", "They make in-person classes unnecessary", "They only provide recorded lectures"],
      "correctAnswer": "They allow for real-time communication and collaboration between students and teachers, even from remote locations"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What role do educational apps play in student learning?",
      "options": ["They provide interactive, mobile-friendly resources for learning new skills and concepts", "They replace the need for classroom instruction", "They offer only entertainment and no educational value", "They focus solely on visual learning without interactive features"],
      "correctAnswer": "They provide interactive, mobile-friendly resources for learning new skills and concepts"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the potential drawback of using too much technology in the classroom?",
      "options": ["It can lead to decreased physical activity and face-to-face interaction", "It makes learning too interactive", "It eliminates the need for traditional textbooks", "It creates distractions with too many digital tools"],
      "correctAnswer": "It can lead to decreased physical activity and face-to-face interaction"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How does the use of data analytics in education benefit teachers and students?",
      "options": ["By providing insights into student progress and identifying areas for improvement", "By replacing the need for assessments", "By automating all forms of teaching", "By limiting student input and feedback"],
      "correctAnswer": "By providing insights into student progress and identifying areas for improvement"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is a key advantage of using adaptive learning technologies in a classroom setting?",
      "options": ["They help teachers grade assignments automatically", "They adjust content to match the pace and skill level of individual students", "They replace in-person teaching altogether", "They focus only on one subject area"],
      "correctAnswer": "They adjust content to match the pace and skill level of individual students"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which of the following best describes the concept of 'bring your own device' (BYOD) in education?",
      "options": ["Students are allowed to use their personal devices for learning purposes in class", "Teachers provide all devices to students", "Students must leave their devices at home", "Schools prohibit the use of any devices in the classroom"],
      "correctAnswer": "Students are allowed to use their personal devices for learning purposes in class"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "How can social media be effectively used in education?",
      "options": ["By creating online communities where students can collaborate and share resources", "By replacing all forms of teacher-student interaction", "By limiting student access to academic content", "By solely using it for entertainment purposes"],
      "correctAnswer": "By creating online communities where students can collaborate and share resources"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary function of an interactive whiteboard in the classroom?",
      "options": ["To allow students to write on the board using a special pen", "To display digital content and facilitate interactive lessons", "To replace all traditional classroom materials", "To automatically grade student assignments"],
      "correctAnswer": "To display digital content and facilitate interactive lessons"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "profed",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary focus of educational psychology?",
      "options": ["Cognitive development", "Student behavior in learning environments", "History of education", "Physical education"],
      "correctAnswer": "Student behavior in learning environments"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of Republic Act No. 10533, also known as the 'Enhanced Basic Education Act of 2013'?",
      "options": [
        "To provide free education in public schools",
        "To implement the K to 12 program",
        "To promote distance learning",
        "To establish a national student loan program"
      ],
      "correctAnswer": "To implement the K to 12 program"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 7722, also known as the 'Higher Education Act of 1994,' created which agency to oversee higher education in the Philippines?",
      "options": [
        "Department of Education (DepEd)",
        "Commission on Higher Education (CHED)",
        "Technical Education and Skills Development Authority (TESDA)",
        "Department of Science and Technology (DOST)"
      ],
      "correctAnswer": "Commission on Higher Education (CHED)"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law provides for the establishment of a National Literacy Coordinating Council (NLCC)?",
      "options": [
        "Republic Act No. 9155",
        "Republic Act No. 10533",
        "Republic Act No. 9165",
        "Republic Act No. 6826"
      ],
      "correctAnswer": "Republic Act No. 6826"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law mandates the establishment of the 'Universal Access to Quality Tertiary Education Act'?",
      "options": [
        "Republic Act No. 9155",
        "Republic Act No. 10931",
        "Republic Act No. 10069",
        "Republic Act No. 10533"
      ],
      "correctAnswer": "Republic Act No. 10931"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main goal of Republic Act No. 9484, also known as the 'Free and Compulsory Education Act'?",
      "options": [
        "To provide free education for all levels",
        "To ensure all Filipino children attend school",
        "To make education optional for adults",
        "To increase the number of public schools"
      ],
      "correctAnswer": "To ensure all Filipino children attend school"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 9155 is also known as the 'Governance of Basic Education Act.' What does this law primarily focus on?",
      "options": [
        "Strengthening the roles of local governments in education",
        "Providing financial support to students",
        "Establishing national standards for teaching",
        "Ensuring quality control in universities"
      ],
      "correctAnswer": "Strengthening the roles of local governments in education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What law established the National Service Training Program (NSTP) in the Philippines?",
      "options": [
        "Republic Act No. 9163",
        "Republic Act No. 9003",
        "Republic Act No. 10533",
        "Republic Act No. 844"
      ],
      "correctAnswer": "Republic Act No. 9163"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10931 aims to provide free tuition in which level of education?",
      "options": [
        "Elementary",
        "Secondary",
        "Tertiary",
        "Graduate"
      ],
      "correctAnswer": "Tertiary"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the primary purpose of Republic Act No. 9155?",
      "options": [
        "To strengthen the governance of basic education",
        "To regulate tertiary education",
        "To create a scholarship program for college students",
        "To promote inclusive education"
      ],
      "correctAnswer": "To strengthen the governance of basic education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 10687, also known as the 'Unified Financial Assistance System for Tertiary Education' (UniFAST) Law, establish?",
      "options": [
        "A free tuition program for all students",
        "A system of financial assistance for tertiary education",
        "A vocational training program for out-of-school youth",
        "A university-based scholarship program"
      ],
      "correctAnswer": "A system of financial assistance for tertiary education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law mandates that the Department of Education (DepEd) create the national learning curriculum?",
      "options": [
        "Republic Act No. 10533",
        "Republic Act No. 7722",
        "Republic Act No. 8545",
        "Republic Act No. 10157"
      ],
      "correctAnswer": "Republic Act No. 10533"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10742, also known as the 'Sangguniang Kabataan Reform Act of 2015,' encourages youth participation in what?",
      "options": [
        "Community development",
        "Basic education programs",
        "National service programs",
        "Entrepreneurship education"
      ],
      "correctAnswer": "Community development"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10533 requires the integration of what into the Philippine curriculum?",
      "options": [
        "Environmental education",
        "Character education",
        "Health and physical education",
        "Mother tongue-based multilingual education"
      ],
      "correctAnswer": "Mother tongue-based multilingual education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 10650, known as the 'Open Distance Learning Act,' aim to promote?",
      "options": [
        "Free education in rural areas",
        "Distance learning as an alternative education method",
        "Online learning programs for universities",
        "Vocational education for adults"
      ],
      "correctAnswer": "Distance learning as an alternative education method"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 10533 mandate regarding the use of Filipino in schools?",
      "options": [
        "Filipino must be used exclusively for teaching",
        "Filipino must be used in instruction for all subjects",
        "Filipino must be taught as a separate subject in elementary schools",
        "Filipino should be the primary language for instruction in lower grades"
      ],
      "correctAnswer": "Filipino should be the primary language for instruction in lower grades"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 7079, also known as the 'Campus Journalism Act,' focuses on promoting what in schools?",
      "options": [
        "Academic competitions",
        "Student government elections",
        "Campus journalism and media programs",
        "Vocational skills training"
      ],
      "correctAnswer": "Campus journalism and media programs"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of the Magna Carta for Students (Republic Act No. 7610)?",
      "options": [
        "To provide free textbooks for students",
        "To protect students' rights and welfare",
        "To guarantee free public education",
        "To mandate a national student council"
      ],
      "correctAnswer": "To protect students' rights and welfare"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 9492, also known as the 'Rationalization of the National Holidays Act,' address regarding education?",
      "options": [
        "The cancellation of classes during national holidays",
        "The establishment of regional holidays for students",
        "The extension of the school year to accommodate holidays",
        "The reduction of school holidays"
      ],
      "correctAnswer": "The cancellation of classes during national holidays"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the goal of Republic Act No. 10908, known as the 'Technical Education and Skills Development Act'?",
      "options": [
        "To improve technical skills in the workforce",
        "To make all students undergo technical education",
        "To provide financial aid for students pursuing technical courses",
        "To integrate technical education into the elementary curriculum"
      ],
      "correctAnswer": "To improve technical skills in the workforce"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 9262, the 'Anti-Violence Against Women and Their Children Act of 2004,' protects students from what?",
      "options": [
        "Sexual abuse",
        "Discrimination based on gender",
        "Bullying and harassment",
        "Exclusion from school activities"
      ],
      "correctAnswer": "Sexual abuse"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 9470, known as the 'National Archives Act of 2007,' requires the establishment of what in schools?",
      "options": [
        "School libraries",
        "Computer labs",
        "Archives and records centers",
        "Counseling programs"
      ],
      "correctAnswer": "Archives and records centers"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law requires the integration of peace education into the Philippine educational system?",
      "options": [
        "Republic Act No. 10368",
        "Republic Act No. 10648",
        "Republic Act No. 10533",
        "Republic Act No. 7581"
      ],
      "correctAnswer": "Republic Act No. 10533"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10650, the 'Open Distance Learning Act,' aims to expand what type of educational program?",
      "options": [
        "Distance learning programs",
        "Free college education",
        "Scholarship programs for students",
        "Vocational education"
      ],
      "correctAnswer": "Distance learning programs"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the purpose of Republic Act No. 9266, the 'Architecture Act of 2004'?",
      "options": [
        "To regulate the practice of architecture in the Philippines",
        "To create additional architecture schools",
        "To introduce new courses for architecture students",
        "To provide scholarships for architecture students"
      ],
      "correctAnswer": "To regulate the practice of architecture in the Philippines"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 8293, also known as the 'Intellectual Property Code of the Philippines,' protects what in the context of education?",
      "options": [
        "Textbooks and educational resources",
        "Teachers' salaries",
        "Student's academic achievements",
        "Public school infrastructure"
      ],
      "correctAnswer": "Textbooks and educational resources"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10667, the 'Philippine Competition Act,' focuses on what aspect of the education system?",
      "options": [
        "Maintaining fair competition in educational services",
        "Increasing the number of private schools",
        "Regulating public school enrollment",
        "Providing equal access to scholarships"
      ],
      "correctAnswer": "Maintaining fair competition in educational services"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What law provides for the mandatory integration of disaster risk reduction and management in the school curriculum?",
      "options": [
        "Republic Act No. 10121",
        "Republic Act No. 9165",
        "Republic Act No. 10533",
        "Republic Act No. 10174"
      ],
      "correctAnswer": "Republic Act No. 10121"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10688, also known as the 'Student Loan Act of 2015,' provides loans for students pursuing what type of education?",
      "options": [
        "Tertiary education",
        "Vocational education",
        "Kindergarten education",
        "Graduate education"
      ],
      "correctAnswer": "Tertiary education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What is the main purpose of Republic Act No. 10533, the 'Enhanced Basic Education Act of 2013'?",
      "options": [
        "To enhance the basic education curriculum",
        "To create new schools in rural areas",
        "To provide free textbooks for students",
        "To introduce more teachers to schools"
      ],
      "correctAnswer": "To enhance the basic education curriculum"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 1425, the 'Rizal Law,' require for educational institutions?",
      "options": [
        "The teaching of Jose Rizal's life and works",
        "The establishment of national monuments",
        "The promotion of national languages",
        "The study of Philippine history"
      ],
      "correctAnswer": "The teaching of Jose Rizal's life and works"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law allows the Department of Education (DepEd) to establish private schools with government subsidies?",
      "options": [
        "Republic Act No. 10533",
        "Republic Act No. 10931",
        "Republic Act No. 7160",
        "Republic Act No. 7722"
      ],
      "correctAnswer": "Republic Act No. 10931"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10253, the 'Establishment of the Philippine National Youth Commission,' primarily focuses on what?",
      "options": [
        "Promoting youth development programs",
        "Creating educational scholarships",
        "Providing vocational training to youth",
        "Establishing youth service centers"
      ],
      "correctAnswer": "Promoting youth development programs"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 8990 mandates that schools offer what type of education?",
      "options": [
        "Early childhood education",
        "Technical and vocational education",
        "Inclusive education",
        "Religious education"
      ],
      "correctAnswer": "Inclusive education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law mandates that teachers undergo professional development programs throughout their career?",
      "options": [
        "Republic Act No. 4670",
        "Republic Act No. 10533",
        "Republic Act No. 10173",
        "Republic Act No. 9165"
      ],
      "correctAnswer": "Republic Act No. 4670"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 8532, known as the 'Philippine Youth Welfare Act of 1998,' focuses on what aspect of education?",
      "options": [
        "The development of youth programs in schools",
        "Mandatory community service for students",
        "Increased scholarships for youth education",
        "National youth sports programs"
      ],
      "correctAnswer": "The development of youth programs in schools"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 9640, also known as the 'Philippine Qualifications Framework Act,' aims to establish what?",
      "options": [
        "A system for aligning educational qualifications",
        "A program for adult education",
        "A national scholarship system",
        "A public school teacher certification process"
      ],
      "correctAnswer": "A system for aligning educational qualifications"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 9155, the 'Governance of Basic Education Act,' focus on?",
      "options": [
        "Improving governance in schools",
        "Providing school infrastructures",
        "Funding for student scholarships",
        "Creating a new education curriculum"
      ],
      "correctAnswer": "Improving governance in schools"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 8525, the 'Adopt-A-School Act,' encourages partnerships between what two sectors?",
      "options": [
        "Government and private schools",
        "Private sector and public schools",
        "Teachers and students",
        "Local government units and private organizations"
      ],
      "correctAnswer": "Private sector and public schools"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10908, the 'Philippine Education Act of 2016,' aims to promote what in education?",
      "options": [
        "Quality education and national standards",
        "Private sector involvement in schools",
        "Free tuition for students",
        "The use of digital technology in schools"
      ],
      "correctAnswer": "Quality education and national standards"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law is responsible for setting the guidelines for the 'School Building Program' in the Philippines?",
      "options": [
        "Republic Act No. 11314",
        "Republic Act No. 8491",
        "Republic Act No. 9155",
        "Republic Act No. 7722"
      ],
      "correctAnswer": "Republic Act No. 11314"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10675 mandates the establishment of what for the continuous development of teachers?",
      "options": [
        "A National Teachers' Academy",
        "A Professional Development Fund",
        "A Teacher's Certification Program",
        "A Teaching Awards Program"
      ],
      "correctAnswer": "A National Teachers' Academy"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 9147, the 'Wildlife Resources Conservation and Protection Act,' mandates the inclusion of what subject in the curriculum?",
      "options": [
        "Environmental education",
        "Social studies",
        "Life sciences",
        "History of the Philippines"
      ],
      "correctAnswer": "Environmental education"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 11194 mandates the inclusion of what in the school curriculum?",
      "options": [
        "Philippine history and values",
        "Foreign language programs",
        "Religious education",
        "Civic education"
      ],
      "correctAnswer": "Philippine history and values"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Republic Act No. 10929, the 'Free Internet Access Program in Public Places Act,' seeks to provide what to public schools?",
      "options": [
        "Free internet access",
        "Free textbooks",
        "Free school uniforms",
        "Free classroom supplies"
      ],
      "correctAnswer": "Free internet access"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 9184, the 'Government Procurement Reform Act,' regulate?",
      "options": [
        "The procurement process for educational institutions",
        "The distribution of school resources",
        "The funding for private schools",
        "The construction of school infrastructures"
      ],
      "correctAnswer": "The procurement process for educational institutions"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "Which law regulates the establishment of educational institutions for children with special needs?",
      "options": [
        "Republic Act No. 10533",
        "Republic Act No. 7277",
        "Republic Act No. 8980",
        "Republic Act No. 10175"
      ],
      "correctAnswer": "Republic Act No. 7277"
,
"explanation":"To follow: wait for new app release/updates"
},
    {
      "major": "Prof Ed",
      "subject": "EducLaw",
      "difficulty": "",
      "bloomstaxonomy": "",
      "ytlink": "To follow",
  "qid": "",
      "question": "What does Republic Act No. 7784, also known as the 'Establishment of Science High Schools Act,' establish?",
      "options": [
        "Private science colleges",
        "Science high schools across the country",
        "Online science education programs",
        "Science research institutes in universities"
      ],
      "correctAnswer": "Science high schools across the country"
,
"explanation":"To follow: wait for new app release/updates"
}
  ];

// Route to fetch questions
app.get("/api/questions", (req, res) => {
  res.json(questions); // Send the list of questions as the response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
