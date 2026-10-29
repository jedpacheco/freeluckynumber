import { Route, Routes } from "react-router-dom";
import Seo from "./components/Seo.jsx";
import CookieNotice from "./components/CookieNotice.jsx";
import ToolGuide from "./components/ToolGuide.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import DailyPage from "./pages/DailyPage.jsx";
import GeneratorsPage from "./pages/GeneratorsPage.jsx";
import OddsPage from "./pages/OddsPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import ArticleDetailPage from "./pages/ArticleDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import BirthdayLuckyNumberPage from "./pages/tools/BirthdayLuckyNumberPage.jsx";
import LuckyNamePage from "./pages/tools/LuckyNamePage.jsx";
import DecisionPickerPage from "./pages/tools/DecisionPickerPage.jsx";
import LotteryNumbersPage from "./pages/tools/LotteryNumbersPage.jsx";
import LuckyEggPage from "./pages/tools/LuckyEggPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
      <div className="app-shell">
        <Seo />
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daily" element={<><DailyPage /><ToolGuide id="daily" /></>} />
          <Route path="/generators" element={<GeneratorsPage />} />
          <Route path="/odds" element={<><OddsPage /><ToolGuide id="odds" /></>} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          <Route path="/tools/birthday-lucky-number" element={<><BirthdayLuckyNumberPage /><ToolGuide id="birthday" /></>} />
          <Route path="/tools/lucky-name-calculator" element={<><LuckyNamePage /><ToolGuide id="name" /></>} />
          <Route path="/tools/random-decision-picker" element={<><DecisionPickerPage /><ToolGuide id="decision" /></>} />
          <Route path="/tools/lottery-number-generator" element={<><LotteryNumbersPage /><ToolGuide id="lottery" /></>} />
          <Route path="/tools/lucky-egg-reveal" element={<><LuckyEggPage /><ToolGuide id="egg" /></>} />
          <Route path="/tools/lucky-wish-jar" element={<><LuckyEggPage /><ToolGuide id="egg" /></>} />
          <Route path="/tools/lucky-goal-board" element={<><LuckyEggPage /><ToolGuide id="egg" /></>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
        <CookieNotice />
      </div>
  );
}

export default App;
