# 📰 NewsForYou

NewsForYou is a personalized news website built using Next.js. It leverages the NewsAPI to fetch news articles and Google Authentication for user login, providing users with a tailored news feed based on their preferences.


## Features

- **Personalized News Feed**: Get news articles tailored to your interests.
- **Google Authentication**: Secure login using Google accounts.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Modern UI**: Clean and modern user interface using Tailwind CSS and Framer Motion for animations.


##Screenshots

###Login Page

![image](https://github.com/user-attachments/assets/f4643bfc-e94d-4815-8468-13c64bb66a96)

###Home Page

![image](https://github.com/user-attachments/assets/1bd80b07-b2ff-4bb2-a73c-f82bfed7fdbf)

###Article Page

![image](https://github.com/user-attachments/assets/7584068f-980b-4f44-9c06-dd05b61ca3ea)


## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animations and transitions.
- **NextAuth.js**: Authentication for Next.js.
- **NewsAPI**: Fetching news articles.


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Slay-MIT/NewsForYou.git
   ```

2. Navigate to the project directory:

   ```bash
   cd NewsForYou
   ```

3. Install the dependencies:

   ```bash
   npm install axios next framer-motion axios google-auth-library 
   ```

### Configuration

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
```

Replace `your_news_api_key`, `your_google_client_id`, and `your_google_client_secret` with your actual API keys and credentials.

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

You can then start the production server:

```bash
npm start
```

## Usage

Upon visiting the application, users can sign in with their Google account to access personalized news. The homepage displays a tailored news feed which updates upon use and users can navigate through different articles and categories.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request. Contributions are welcome and appreciated!

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org/)
- [NewsAPI](https://newsapi.org/)

---

Made with ❤️ by [Shreyash Shubh](https://github.com/Slay-MIT)

