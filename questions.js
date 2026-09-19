// Trailmarks question bank
// Each rubric row: { criteria, points, keywords[], hint }
// Scoring is a simple keyword-match auto-grader — good enough for practice,
// not a substitute for a teacher's read of the work.

const CURRICULUM = {
  math: {
    label: "Math",
    accent: "#3A5A78",
    accentSoft: "#E7EEF3",
    blurb: "5th Grade Math — SAVVAS scope, 2026–27",
    units: [
      {
        id: "m1",
        title: "Unit 1 — Place Value",
        teks: "5.2(A), 5.2(B)*, 5.2(C)",
        days: 10,
        questions: [
          {
            id: "m1q1",
            prompt: "Compare the decimals 6.208 and 6.28. Write <, >, or = and explain how you know, using place value.",
            rubric: [
              { criteria: "Correct comparison symbol (6.208 < 6.28)", points: 2, keywords: ["<"], hint: "Start your answer with the correct symbol: <, >, or =." },
              { criteria: "Explains using place value (tenths, hundredths, thousandths)", points: 3, keywords: ["tenth", "hundredth", "thousandth", "place value", "digit"], hint: "Compare the digits place by place — start with the tenths, then hundredths." }
            ]
          },
          {
            id: "m1q2",
            prompt: "Round 14.563 to the nearest hundredth. Explain how you decided.",
            rubric: [
              { criteria: "Correct rounded value (14.56)", points: 2, keywords: ["14.56"], hint: "Round to two decimal places — the hundredths digit." },
              { criteria: "Explains using the digit to the right (thousandths)", points: 3, keywords: ["thousandth", "round", "digit"], hint: "Look at the thousandths digit to decide whether the hundredths digit stays the same or goes up." }
            ]
          },
          {
            id: "m1q3",
            prompt: "In the number 372,485.19, what is the value of the digit 4? Explain how you know.",
            rubric: [
              { criteria: "Correct value (4,000 / four thousand)", points: 2, keywords: ["4,000", "4000", "four thousand"], hint: "Find the digit 4, then name its place." },
              { criteria: "Explains using the place-value position", points: 3, keywords: ["thousands place", "place value", "place"], hint: "Name the place the digit sits in, not just the digit itself." }
            ]
          }
        ]
      },
      {
        id: "m2",
        title: "Unit 2 — Fluently Add and Subtract Whole Numbers and Decimals",
        teks: "5.3(A)*, 5.3(K)*",
        days: 12,
        questions: [
          {
            id: "m2q1",
            prompt: "A hiking club records 2.35 inches of rain on Monday and 1.8 inches on Tuesday. How much rain fell in total? Show your work.",
            rubric: [
              { criteria: "Correct total (4.15 inches)", points: 3, keywords: ["4.15"], hint: "Line the decimal points up before adding." },
              { criteria: "Shows how the decimal points were lined up / work shown", points: 2, keywords: ["line up", "align", "decimal point", "regroup"], hint: "Mention how you lined up the decimal points so tenths added to tenths." }
            ]
          },
          {
            id: "m2q2",
            prompt: "You start with $45.50 and spend $18.75 on art supplies. How much money do you have left? Explain your steps.",
            rubric: [
              { criteria: "Correct answer ($26.75)", points: 3, keywords: ["26.75"], hint: "Subtract 18.75 from 45.50 — you may need to regroup." },
              { criteria: "Explains the subtraction steps", points: 2, keywords: ["subtract", "borrow", "regroup", "difference"], hint: "Say what you subtracted from what, and whether you had to regroup." }
            ]
          },
          {
            id: "m2q3",
            prompt: "Estimate 7.82 + 3.46 by rounding each number to the nearest whole number first. Then explain why estimating before finding the exact answer is useful.",
            rubric: [
              { criteria: "Reasonable estimate (11 or 12)", points: 2, keywords: ["11", "12"], hint: "Round 7.82 and 3.46 to whole numbers, then add." },
              { criteria: "Explains the purpose of estimating", points: 3, keywords: ["check", "reasonable", "estimate", "close"], hint: "Explain how an estimate helps you check whether your exact answer makes sense." }
            ]
          }
        ]
      }
    ]
  },

  science: {
    label: "Science",
    accent: "#3F6644",
    accentSoft: "#E9F0E9",
    blurb: "5th Grade Science — 2026–27",
    units: [
      {
        id: "s1",
        title: "Unit 1 — Forces and Motion",
        teks: "5.7A (S), 5.7B (S)",
        days: 14,
        questions: [
          {
            id: "s1q1",
            prompt: "Based on your ramp investigation, which surface helped a toy car travel the farthest? Write a Claim, Evidence, and Reasoning response.",
            rubric: [
              { criteria: "Claim names a surface type (smooth/rough)", points: 2, keywords: ["smooth", "rough", "surface"], hint: "State clearly which surface your claim is about." },
              { criteria: "Evidence includes numeric trial data", points: 3, keywords: ["cm", "in", "trial", "distance"], hint: "Include a distance number from at least one trial." },
              { criteria: "Reasoning explains using friction", points: 3, keywords: ["friction", "force", "rub"], hint: "Explain how friction between the wheels and surface changed the motion." }
            ]
          },
          {
            id: "s1q2",
            prompt: "A soccer ball is sitting still on the field. Explain what must happen for the ball to start moving, using the word 'force' in your answer.",
            rubric: [
              { criteria: "Names a force being applied (push/kick)", points: 3, keywords: ["force", "push", "kick"], hint: "Say what kind of force starts the ball moving." },
              { criteria: "Explains balanced vs. unbalanced forces", points: 2, keywords: ["unbalanced", "balanced"], hint: "A still object needs an unbalanced force to start moving." }
            ]
          },
          {
            id: "s1q3",
            prompt: "How does Newton's Third Law explain what happens when you jump off a skateboard?",
            rubric: [
              { criteria: "States the equal-and-opposite idea", points: 3, keywords: ["equal", "opposite"], hint: "Newton's Third Law is about equal and opposite forces." },
              { criteria: "Connects it to the skateboard moving backward", points: 2, keywords: ["skateboard", "backward", "pushes back", "rolls"], hint: "Explain what happens to the skateboard when your feet push off it." }
            ]
          }
        ]
      },
      {
        id: "s3",
        title: "Unit 3 — Matter and Its Properties",
        teks: "5.6A (READINESS), 5.6B (S), 5.6C (S), 5.6D",
        days: 17,
        questions: [
          {
            id: "s3q1",
            prompt: "You have two clear liquids that look the same. Describe two physical properties you could test to tell them apart.",
            rubric: [
              { criteria: "Names two valid physical properties", points: 4, keywords: ["density", "solubility", "conductivity", "magnetism", "volume"], hint: "Think of testable properties: density, solubility, conductivity..." },
              { criteria: "Describes how you'd test or compare them", points: 2, keywords: ["test", "measure", "compare"], hint: "Say how you'd actually run the test, not just name the property." }
            ]
          },
          {
            id: "s3q2",
            prompt: "A student says, \"When ice melts into water, the matter disappears.\" Do you agree or disagree? Use the idea of conservation of matter to explain.",
            rubric: [
              { criteria: "Disagrees and says the matter still exists", points: 2, keywords: ["disagree", "still matter", "still there"], hint: "Melting is a change of state, not a disappearance." },
              { criteria: "References conservation of matter (same mass/amount)", points: 3, keywords: ["conservation", "same mass", "same amount", "conserved"], hint: "Use the term conservation of matter and explain what stays the same." }
            ]
          },
          {
            id: "s3q3",
            prompt: "Explain the difference between a mixture and the individual substances in it, using an example like trail mix or salt water.",
            rubric: [
              { criteria: "Explains that a mixture's substances keep their own properties", points: 3, keywords: ["mixture", "substances", "combined", "keep their"], hint: "Say what stays true about each substance inside the mixture." },
              { criteria: "Gives a specific example", points: 2, keywords: ["trail mix", "salt water", "example"], hint: "Use a concrete example to show your point." }
            ]
          }
        ]
      }
    ]
  },

  social: {
    label: "Social Studies",
    accent: "#8C3B2E",
    accentSoft: "#F4E9E6",
    blurb: "5th Grade U.S. History — Year at a Glance",
    units: [
      {
        id: "ss1",
        title: "Unit 1 — Exploration and Colonization",
        teks: "1A*, 1B, 6A, 6B, 6C, 6D, 7A, 7B*, 8A*, 9A, 9B, 10A, 12A, 12B, 12C, 13A, 13B",
        days: 18,
        questions: [
          {
            id: "ss1q1",
            prompt: "List two reasons European explorers wanted to sail to the Americas in the 1400s and 1500s.",
            rubric: [
              { criteria: "Gives a valid reason (wealth/trade/gold)", points: 2, keywords: ["gold", "wealth", "trade", "riches"], hint: "Think about what explorers hoped to gain economically." },
              { criteria: "Gives a second, different valid reason (religion/glory/land)", points: 2, keywords: ["religion", "glory", "land", "spices", "faith"], hint: "Explorers also sailed for reasons beyond money — think religion or national glory." }
            ]
          },
          {
            id: "ss1q2",
            prompt: "Name one difference between the New England, Middle, and Southern colonies in how people made a living.",
            rubric: [
              { criteria: "Names a valid economic difference", points: 3, keywords: ["farming", "fishing", "shipbuilding", "plantation", "trade"], hint: "Compare what each region relied on to make money." },
              { criteria: "Connects it to geography or climate", points: 2, keywords: ["climate", "soil", "geography"], hint: "Explain why that region's land or weather led to that economy." }
            ]
          },
          {
            id: "ss1q3",
            prompt: "Why was the 13 colonies' location along the Atlantic coast important for trade with Europe?",
            rubric: [
              { criteria: "Mentions ports/ships/ocean access", points: 3, keywords: ["ports", "ships", "ocean", "atlantic", "harbor"], hint: "Think about how goods actually crossed the ocean." },
              { criteria: "Explains why coastal access made trade easier", points: 2, keywords: ["easier", "access", "transport", "faster"], hint: "Explain the advantage of being right on the coast." }
            ]
          }
        ]
      },
      {
        id: "ss2",
        title: "Unit 2 — American Revolution",
        teks: "2A*, 2B, 2C, 6D, 14A, 16A, 20A, 20B, 21B",
        days: 25,
        questions: [
          {
            id: "ss2q1",
            prompt: "Name one cause of the American Revolution and explain how it made colonists upset with Britain.",
            rubric: [
              { criteria: "Names a valid cause (taxes, Stamp Act, Tea Act, etc.)", points: 3, keywords: ["tax", "stamp act", "tea act", "representation", "boston massacre"], hint: "Think of a specific law or event that angered colonists." },
              { criteria: "Explains why it upset colonists", points: 2, keywords: ["upset", "unfair", "anger", "angry"], hint: "Say why colonists felt it was unfair." }
            ]
          },
          {
            id: "ss2q2",
            prompt: "What was the significance of the Declaration of Independence?",
            rubric: [
              { criteria: "States it declared independence from Britain", points: 3, keywords: ["independence", "freedom", "britain"], hint: "Say what the colonies were declaring." },
              { criteria: "Mentions a key idea it expressed (rights/self-government)", points: 2, keywords: ["rights", "self-government", "liberty", "equal"], hint: "Mention one of the big ideas behind it, like rights or self-government." }
            ]
          },
          {
            id: "ss2q3",
            prompt: "Describe one important event of the American Revolution and its effect on the outcome of the war.",
            rubric: [
              { criteria: "Names a valid event", points: 3, keywords: ["boston tea party", "battle", "yorktown", "lexington", "concord", "valley forge"], hint: "Name a specific battle or event from the war." },
              { criteria: "Explains its effect on the war's outcome", points: 2, keywords: ["victory", "surrender", "turning point", "won", "lost"], hint: "Say how that event changed the direction of the war." }
            ]
          }
        ]
      }
    ]
  }
};
