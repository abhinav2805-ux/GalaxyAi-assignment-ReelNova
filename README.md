
# 🎬 ReelNova — AI-Powered Video Transformation Tool

A full-stack Next.js application that enables users to transform videos using the **Hunyuan-Video Model (via Fal API)**. Built with modern tools like Clerk for authentication, ShadCN / V0 for UI/UX, MongoDB for history tracking, Uploadcare + Cloudinary for uploads and NGORK for local webhook testing.

## 🔗Deployed Link : https://galaxy-ai-assignment-reel-nova.vercel.app/

---

## 🔧  Core Capabilities & Highlights

✨ **Next-Gen AI Video Alchemy:** Dive into the future of video editing with our core video-to-video transformation, powered by the sophisticated Fal [Hunyuan-Video API](https://fal.ai/). Reimagine your footage with stunning AI-driven effects.

🔐 **Fortified & Frictionless Authentication:** Enjoy peace of mind with robust user authentication managed by [Clerk](https://clerk.dev). Secure sign-up, login, and session management made easy.

⬆️ **Streamlined Media Pipeline:** Experience an efficient video upload process using Uploadcare, which then seamlessly transfers your files to Cloudinary for reliable storage and advanced processing capabilities
 
📜 **Comprehensive User History:** Never lose track of your creations. Every transformation is meticulously logged with key details (user ID, input/output URLs, parameters, timestamp) in MongoDB, allowing for easy review and management.

🎨 **Intuitive & Adaptive Interface:** built with Tailwind CSS & ShadCN components  

🌍 **Zero-Hassle Vercel Deployment:** The application is primed for effortless, scalable deployment on the Vercel platform.


---

## 📁 Project Structure

```

 web/                     # Next.js app
   ├── src/
   │   ├── app/
   │   │   ├── (root)/      # Landing page
   │   │   ├── transform/
   │   │   ├── history/
   │   ├── api/
   │   │   ├── fal/
   │   │   │   ├── proxy/route.ts
   │   │   ├── hunyuanvideo/route.ts
   │   │   ├── cloudinary/route.ts
   │   │   ├── video/route.ts
   │   │   ├── falhook/route.ts
   │   │   ├── history/
   │   │   │   ├── recent/route.ts
   |   |   |   ├──route.ts
   │   ├── components/      # Reusable UI components
   │   ├── lib/dbConnect.ts # MongoDB connection utility
   │   ├── models/          # Mongoose models
   │   │   └── VideoHistory.ts
   │   ├── app/
   │   │   └── layout.tsx
   │   │   └── globals.css
   │   └── middleware.ts    # Clerk auth protection
   ├── .env                 # Environment variables
   ├── next.config.js
   └── ...
── README.md

```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone 
cd 
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `web/` directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NODE_ENV=development
MONGODB_URI="mongodb://localhost:27017/galaxy"
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_FAL_KEY=your_fal_api_key
NEXT_PUBLIC_BASE_URL=https://...ngrok-free.app
```

> 🔒 Replace all `your_*` values with your actual keys from the respective services.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Run the Ngrok Server

```bash
npx ngrok http 3000
```

Copy the HTTPS URL provided by ngrok and set it as your `NEXT_PUBLIC_BASE_URL` in the `.env` file.

---

## 🔄 Main Flows

### 🎞️ Video Transformation Flow

1. User uploads video via Uploadcare
2. File is transferred to Cloudinary for processing
3. User sets transformation parameters
4. Backend calls [Fal AI](https://fal.ai) to apply Hunyuan model
5. Resulting video delivered via cloudinary and stored in MongoDB

### 🕓 History Management

Each transformation is logged in MongoDB with:
- User ID
- Input video URL
- Output video URL
- Timestamp
- Parameters used

Accessible at `/history` (auth protected).







