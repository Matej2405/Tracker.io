TrackerIO
🚀 About the Project  
TrackerIO is a decentralized web application developed on the Solana blockchain for efficient attendance tracking. Designed to simplify team and organizational management, it leverages smart contracts for transparent, secure, and immutable record-keeping. Embrace a playful approach to attendance with a touch of blockchain magic!

🔬 Project Workflow  
1. **Wallet Integration & User Initialization**  
   Start by installing the Solflare Wallet Chrome extension. Once connected, TrackerIO initializes your on-chain user profile, setting the stage for seamless interactions.

2. **Organization Management**  
   Create, update, or remove organizations with ease. The platform uses smart contracts written in Rust (via the Anchor framework) to handle all organization operations on Solana, ensuring data integrity and accountability.

3. **Attendance Tracking**  
   Join or leave organizations to record your attendance in real time. Every interaction is securely logged on-chain, offering an immutable history of your participation.

📙 Structure Explanation  
- **backend**  
  Contains all the smart contracts (written in Rust) that power the blockchain interactions.
  
- **frontend**  
  Houses the web application built with React.js, complete with all UI components.

⚙️ Installation and Setup  
To run TrackerIO locally, ensure you have the following prerequisites:
- **Solflare Wallet Chrome Extension:** [Solflare](https://solflare.com/)
- **Node.js & npm:** For managing and running the frontend.
- **Anchor CLI:** For building and deploying smart contracts (optional).

**Steps to Get Started:**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/trackerio.git
   cd trackerio
