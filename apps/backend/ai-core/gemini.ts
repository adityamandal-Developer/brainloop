import { GoogleGenAI } from "@google/genai";

const geminiAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});
export async function* geminiResponse(question: string) {
  const res = await geminiAi.models.generateContentStream({
    model: "gemini-2.5-flash-lite-preview-06-17",
    contents: [
      {
        parts: [
          {
            text: "You are a study assistant of a student. Answer the question just as a professor or teacher would do.",
          },
          {
            text: `
                When providing responses, please format your output using GitHub Flavored Markdown (GFM) with the following guidelines:

                1. Use headings (##, ###) to structure your response
                2. Use bullet points or numbered lists for steps or multiple items
                3. For code examples, use triple backticks with language specification:
                   \`\`\`python
                   print("Hello World")
                   Use tables for tabular data:
                   | Column 1 | Column 2 |
                   |----------|----------|
                   | Data 1 | Data 2 |

              - Use blockquotes (> ) for important notes or warnings

              - Use bold (text) for emphasis and italics (text) for subtle emphasis
              - make the markdown as beaufiul and professional as possible
              - Include links with descriptive text: someLink
              - Use images with alt text: ![alt text](image_url)
              - Use horizontal rules (---) to separate major sections
              - Use emojis to enhance the visual appeal of the markdown`,
          },
          {
            text: `when giving diagrams or flowcharts, use mermaid syntax, make sure to include the mermaid code block with the language specified as mermaid and with proper indentation and formatting and syntax 
            Always validate syntax before outputting
            give proper spacing using     \n 
            example: 
            \`\`\`mermaid\ngraph LR  \n subgraph Water Molecule 1 \n        O1((O)) -- δ- --- H1a(H)      \n        O1 -- δ- --- H1b(H) \n end \n subgraph Water Molecule 2        \n        O2((O)) -- δ- --- H2a(H)        \n        O2 -- δ- --- H2b(H)    \n end    \n subgraph Water Molecule 3        \n        O3((O)) -- δ- --- H3a(H)        \n        O3 -- δ- --- H3b(H)    \n end    \n H1a -.-> O2    \n H2b -.-> O1    \n H2a -.-> O3    \n style O1 fill:#f9f,stroke:#333,stroke-width:2px    \n style H1a fill:#bbf,stroke:#333,stroke-width:2px    \n style H1b fill:#bbf,stroke:#333,stroke-width:2px    \n style O2 fill:#f9f,stroke:#333,stroke-width:2px    \n style H2a fill:#bbf,stroke:#333,stroke-width:2px    \n style H2b fill:#bbf,stroke:#333,stroke-width:2px    \n style O3 fill:#f9f,stroke:#333,stroke-width:2px    \n style H3a fill:#bbf,stroke:#333,stroke-width:2px    \n style H3b fill:#bbf,stroke:#333,stroke-width:2px\n\`\`\`
            `,
          },
          {
            text: `${question}`,
          },
        ],
        role: "user",
      },
    ],
  });
  for await (const chuck of res) {
    if (chuck && chuck.text) {
      yield chuck.text;
    }
  }
}
