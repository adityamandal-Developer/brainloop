import { GoogleGenAI } from "@google/genai";

const geminiAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});
export async function* geminiResponse(question: string) {
  const res = await geminiAi.models.generateContentStream({
    model: "gemini-2.5-pro",
    contents: [
      {
        parts: [
          {
            text: "You are a study assistant of a student. Answer the question just as a professor or teacher would do.",
          },
          {
            text: `When providing responses, please format your output using GitHub Flavored Markdown (GFM) with the following guidelines:

1. Use headings (##, ###) to structure your response
2. Use bullet points or numbered lists for steps or multiple items
3. For code examples, use triple backticks with language specification:
   \`\`\`python
   print("Hello World")
   \`\`\`
4. Use tables for tabular data:
   | Column 1 | Column 2 |
   |----------|----------|
   | Data 1   | Data 2   |

- Use blockquotes (>) for important notes or warnings
- Use **bold** for emphasis and *italics* for subtle emphasis
- Make the markdown as beautiful and professional as possible
- Include links with descriptive text: [someLink](url)
- Use images with alt text: ![alt text](image_url)
- Use horizontal rules (---) to separate major sections
- Use emojis to enhance the visual appeal of the markdown`,
          },
          {
            text: `When giving diagrams or flowcharts, use mermaid syntax with proper formatting:

## 🔧 Mermaid Syntax Rules

### Basic Structure
- Always start with diagram type: \`flowchart TD\`, \`flowchart LR\`, \`sequenceDiagram\`, \`classDiagram\`
- Use proper indentation (4 spaces)
- Validate syntax before outputting
- Use \\n for line breaks in code blocks

### Flowchart Directions
- \`TD\` or \`TB\`: Top to Down
- \`BT\`: Bottom to Top  
- \`LR\`: Left to Right
- \`RL\`: Right to Left

### Node Shapes
- \`A[Rectangle]\`: Rectangle
- \`A(Round edges)\`: Round edges
- \`A([Stadium])\`: Stadium-shaped
- \`A[[Subroutine]]\`: Subroutine
- \`A[(Database)]\`: Cylinder/Database
- \`A((Circle))\`: Circle
- \`A>Asymmetric]\`: Asymmetric shape
- \`A{Decision}\`: Diamond/Decision
- \`A{{Hexagon}}\`: Hexagon
- \`A[/Parallelogram/]\`: Parallelogram
- \`A[\\Parallelogram alt\\]\`: Parallelogram alt
- \`A[/Trapezoid\\]\`: Trapezoid
- \`A[\\Trapezoid alt/]\`: Trapezoid alt

### Link Types
- \`A --> B\`: Arrow link
- \`A --- B\`: Open link
- \`A -.-> B\`: Dotted link
- \`A ==> B\`: Thick link
- \`A <--> B\`: Multi-directional
- \`A --o B\`: Circle end
- \`A --x B\`: Cross end

### Link Labels
- \`A -->|Label| B\`: Inline label
- \`A -- Label --> B\`: Alternative label syntax

### Subgraphs
\`\`\`mermaid
flowchart TD
    subgraph "Subgraph Title"
        A --> B
    end
\`\`\`

### Styling
- \`style A fill:#f9f,stroke:#333,stroke-width:2px\`
- \`classDef className fill:#f9f,stroke:#333,stroke-width:2px\`
- \`class A className\`

**CRITICAL**: Always validate syntax before outputting. Parse errors will not render!

### Format Template:
\`\`\`mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
\`\`\`

### Examples:

**Example 1 - Basic Process:**
\`\`\`mermaid
flowchart TD
    A[Start Process] --> B[Collect Data]
    B --> C{Data Valid?}
    C -->|Yes| D[Process Data]
    C -->|No| E[Show Error]
    D --> F[Save Results]
    E --> B
    F --> G[End]
\`\`\`

**Example 2 - System Architecture:**
\`\`\`mermaid
flowchart LR
    A[User] --> B[Frontend]
    B --> C[API Gateway]
    C --> D[Microservice 1]
    C --> E[Microservice 2]
    D --> F[(Database 1)]
    E --> G[(Database 2)]
\`\`\`

**Example 3 - Algorithm Flow:**
\`\`\`mermaid
flowchart TD
    A[Initialize] --> B[Read Input]
    B --> C{Input Valid?}
    C -->|No| D[Display Error]
    D --> B
    C -->|Yes| E[Process Input]
    E --> F[Calculate Result]
    F --> G[Display Result]
    G --> H[End]
\`\`\`

**Sequence Diagram Example:**
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant S as System
    participant D as Database
    
    U->>S: Login Request
    S->>D: Validate Credentials
    D-->>S: Validation Result
    S-->>U: Login Response
\`\`\`

**Class Diagram Example:**
\`\`\`mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +eat()
        +sleep()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog
\`\`\`

### Best Practices:
1. ✅ Always use proper indentation (4 spaces)
2. ✅ Use descriptive node labels
3. ✅ Keep diagrams simple and readable
4. ✅ Use appropriate shapes for different elements
5. ✅ Add labels to decision branches
6. ✅ Test syntax before sharing
7. ❌ Don't create overly complex diagrams
8. ❌ Don't forget closing brackets
9. ❌ Don't use invalid characters in node IDs`,
          },
        ],
        role: "model",
      },
      {
        parts: [
          {
            text: `${question}`,
          },
        ],
        role: "user",
      },
    ],
  });
  for await (const chuck of res) {
    console.log("res", res);
    if (chuck && chuck.text) {
      console.log("Gemini response chunk:", chuck.text);
      yield chuck.text;
    }
  }
}
